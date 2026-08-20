// dsh-archived-sessions — host half.
//
// Serves /archived-sessions/* JSON routes (list / restore / restore-many /
// delete / delete-many) over the host `webServer`. The browser Settings
// section ("归档会话") talks to these. Reads/writes the durable workspace
// archive set (workspaceRegistry + storageDomain), folds titles/dates/workspace
// tags from session persistence, and physically removes a session's log file
// on delete.
import { unlink } from 'node:fs/promises'

export const name = 'dsh-archived-sessions'
export const inject = ['webServer', 'workspaceRegistry', 'sessionPersistence', 'sessionQuery', 'storageDomain']

const MAX_TITLE = 80

function json(res, value, status = 200) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(value))
}

async function readJsonBody(req) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    chunks.push(chunk)
    total += chunk.length
    if (total > 1 << 20) return null
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

function parseIds(body) {
  const raw = body && body.sessionIds
  if (!Array.isArray(raw)) return null
  const ids = []
  for (const v of raw) if (typeof v === 'string' && v) ids.push(v)
  return ids
}

function foldTitle(events) {
  let found = null
  let firstUser = null
  for (const ev of events) {
    if (ev.type === 'session/title' && ev.data && typeof ev.data.title === 'string' && ev.data.title.length) {
      found = ev.data.title
    }
    if (firstUser === null && ev.type === 'user/message' && ev.data && Array.isArray(ev.data.content)) {
      const txt = ev.data.content.filter((b) => b && b.type === 'text').map((b) => b.text).filter(Boolean).join(' ').trim()
      if (txt) firstUser = txt
    }
  }
  return found || firstUser || null
}

export function apply(ctx) {
  const w = ctx.workspaceRegistry
  const sp = ctx.sessionPersistence
  const sq = ctx.sessionQuery
  const dom = () => ctx.storageDomain.get('workspace')

  async function archivedState() {
    const d = dom()
    if (!d) throw new Error('workspace domain is not open')
    return d.global.get()
  }

  async function writeArchived(nextIds) {
    const d = dom()
    if (!d) throw new Error('workspace domain is not open')
    const cur = d.global.get()
    const next = Object.assign({}, cur, { archivedSessionIds: nextIds })
    await d.global.set(next)
    // Keep the registry's in-memory cache in sync so the live sidebar refreshes.
    if (w && 'state' in w) { try { w.state = next } catch (e) { /* best-effort */ } }
    return next
  }

  let wsByPath = {}

  async function resolveOne(id) {
    let title = null, createdAt = null, cwd = null
    try {
      const o = await sq.readTitleSnapshot(id)
      if (o) {
        if (o.title && o.title.title) title = String(o.title.title)
        if (o.session) { cwd = o.session.cwd || null; createdAt = o.session.createdAt || null }
      }
    } catch (e) { /* fall back to raw log */ }
    if (!title || !cwd) {
      try {
        const r = await sp.readFrom(id, 0)
        if (r.meta) {
          if (!cwd) cwd = r.meta.cwd || null
          if (!createdAt) createdAt = r.meta.createdAt || null
        }
        if (!title && Array.isArray(r.events)) title = foldTitle(r.events)
      } catch (e2) { /* keep what we have */ }
    }
    const ws = cwd ? wsByPath[cwd] : undefined
    const workspaceGone = !!(cwd && !ws)
    const display = title ? (String(title).length > MAX_TITLE ? String(title).slice(0, MAX_TITLE) + '…' : String(title)) : null
    return {
      sessionId: id,
      title: display,
      createdAt: createdAt || null,
      workspacePath: cwd || null,
      workspaceTitle: (ws && ws.title) ? ws.title : null,
      workspaceGone: workspaceGone ? true : false,
      hasWorkspace: !!cwd,
    }
  }

  // Restore (unarchive) one session; throws on failure.
  async function restoreOne(sid) {
    const state = await archivedState()
    const list = state.archivedSessionIds.map(String)
    if (!list.includes(sid)) return { ok: true, restored: false }
    await writeArchived(list.filter((x) => x !== sid))
    return { ok: true, restored: true }
  }

  // Physically delete one session log + clear archive/workspace accounting;
  // throws on failure (live sessions are rejected).
  async function deleteOne(sid) {
    const sessions = ctx.get('sessions')
    if (sessions && sessions.get(sid)) {
      throw new Error('该会话当前处于打开状态，请先切换到别的会话再删除。')
    }
    let removedPath = null
    try {
      const headers = await sp.list()
      const header = headers.find((h) => String(h.id) === sid)
      if (header) {
        const loc = sp.locate(header)
        if (loc && typeof loc.path === 'string') removedPath = loc.path
      } else {
        // Session not in the materialized list — use its header cwd to locate the log anyway.
        const r = await sp.readFrom(sid, 0)
        if (r && r.meta && r.meta.cwd) {
          const loc = sp.locate({ id: sid, cwd: r.meta.cwd })
          if (loc && typeof loc.path === 'string') removedPath = loc.path
        }
      }
    } catch (e) { /* best-effort */ }
    if (removedPath) {
      try {
        await unlink(removedPath)
      } catch (e) {
        if (e && e.code !== 'ENOENT') throw new Error('删除日志文件失败：' + String((e && e.message) || e))
      }
    }
    try {
      for (const ent of w.list()) {
        if (ent.sessionIds.includes(sid)) { try { await ent.detachSession(sid) } catch (e) { /* ignore */ } }
      }
    } catch (e) { /* ignore */ }
    try { if (w.sessionPaths && w.sessionPaths.delete) w.sessionPaths.delete(sid) } catch (e) {}
    try { if (w.headers && w.headers.delete) w.headers.delete(sid) } catch (e) {}
    // NOTE: intentionally do NOT unarchive (keep the id in the archive set).
    // Removing it from the archive set would make DSH re-show the session in the
    // sidebar; with its workspace gone it would land in 未分组 until the index
    // rebuilds. Keeping it hidden keeps the deleted session out of every list
    // immediately. The stale hidden id is inert (no log -> no session resolves).
    return { ok: true, deleted: true, removedPath }
  }

  ctx.effect(() => {
    const disposers = []

    disposers.push(ctx.webServer.register({
      kind: 'exact',
      path: '/archived-sessions/list',
      handler: async (req, res) => {
        try {
          const state = await archivedState()
          const ids = state.archivedSessionIds || []
          // Only surface archived ids that still exist (materialized log or live).
          // Deleted sessions keep a hidden archive id but no log, so they drop out here.
          let materialized = new Set()
          let live = ctx.get('sessions')
          try {
            const headers = await sp.list()
            materialized = new Set(headers.map((h) => String(h.id)))
          } catch (e) { /* best-effort */ }
          const idStrs = ids.map(String).filter((id) => materialized.has(id) || (live && live.get(id)))
          wsByPath = {}
          try { for (const ent of w.list()) wsByPath[ent.path] = ent } catch (e) { wsByPath = {} }
          const items = []
          const CHUNK = 6
          for (let i = 0; i < idStrs.length; i += CHUNK) {
            const res2 = await Promise.all(idStrs.slice(i, i + CHUNK).map(resolveOne))
            items.push.apply(items, res2)
          }
          json(res, { items })
        } catch (e) {
          json(res, { error: String((e && e.message) || e) }, 500)
        }
      },
    }))

    disposers.push(ctx.webServer.register({
      kind: 'exact',
      path: '/archived-sessions/restore',
      handler: async (req, res) => {
        try {
          const body = await readJsonBody(req)
          const sid = body && typeof body.sessionId === 'string' ? body.sessionId : null
          if (!sid) return json(res, { ok: false, error: 'missing sessionId' }, 400)
          json(res, await restoreOne(sid))
        } catch (e) {
          json(res, { ok: false, error: String((e && e.message) || e) }, 500)
        }
      },
    }))

    disposers.push(ctx.webServer.register({
      kind: 'exact',
      path: '/archived-sessions/restore-many',
      handler: async (req, res) => {
        try {
          const body = await readJsonBody(req)
          const ids = parseIds(body)
          if (!ids || ids.length === 0) return json(res, { ok: false, error: 'missing sessionIds' }, 400)
          const results = []
          for (const sid of ids) {
            try { results.push({ sessionId: sid, ok: true, ...(await restoreOne(sid)) }) }
            catch (e) { results.push({ sessionId: sid, ok: false, error: String((e && e.message) || e) }) }
          }
          json(res, { ok: true, restored: results.filter((r) => r.ok).length, results })
        } catch (e) {
          json(res, { ok: false, error: String((e && e.message) || e) }, 500)
        }
      },
    }))

    disposers.push(ctx.webServer.register({
      kind: 'exact',
      path: '/archived-sessions/delete',
      handler: async (req, res) => {
        try {
          const body = await readJsonBody(req)
          const sid = body && typeof body.sessionId === 'string' ? body.sessionId : null
          if (!sid) return json(res, { ok: false, error: 'missing sessionId' }, 400)
          json(res, await deleteOne(sid))
        } catch (e) {
          json(res, { ok: false, error: String((e && e.message) || e) }, 500)
        }
      },
    }))

    disposers.push(ctx.webServer.register({
      kind: 'exact',
      path: '/archived-sessions/delete-many',
      handler: async (req, res) => {
        try {
          const body = await readJsonBody(req)
          const ids = parseIds(body)
          if (!ids || ids.length === 0) return json(res, { ok: false, error: 'missing sessionIds' }, 400)
          const results = []
          for (const sid of ids) {
            try { results.push({ sessionId: sid, ok: true, ...(await deleteOne(sid)) }) }
            catch (e) { results.push({ sessionId: sid, ok: false, error: String((e && e.message) || e) }) }
          }
          json(res, { ok: true, deleted: results.filter((r) => r.ok).length, results })
        } catch (e) {
          json(res, { ok: false, error: String((e && e.message) || e) }, 500)
        }
      },
    }))

    return () => { for (const d of disposers) d() }
  }, 'dsh-archived-sessions: routes')
}
