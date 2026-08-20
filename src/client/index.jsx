/**
 * dsh-archived-sessions — browser half: renders the "归档会话" Settings
 * section (settings.section list slot). It talks to the host half's
 * /archived-sessions/* JSON routes (list / restore / delete) by fetch,
 * showing title, session date, and a workspace tag (handles deleted
 * workspaces). All DOM/runtime wiring failures are logged, never thrown — a
 * thrown plugin apply takes down the whole web-shell boot.
 *
 * @module dsh-archived-sessions/client
 */

import React, { useEffect, useRef, useState } from 'react'

export const inject = ['slots']

const CSS = `
.archv{display:flex;flex-direction:column;gap:4px;max-width:800px;padding:8px 2px 28px}
.archv-head{display:flex;align-items:center;gap:10px;margin:0 0 2px}
.archv-title{font-size:16px;font-weight:650;color:var(--dsw-alias-label-primary);letter-spacing:-0.01em;margin:0}
.archv-count{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:1px 8px;flex:none}
.archv-sub{font-size:12px;line-height:1.55;color:var(--dsw-alias-label-tertiary);margin:0 0 12px;max-width:64ch}
.archv-err{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);border-radius:10px;color:var(--dsw-alias-state-error-primary);font-size:12px;margin-bottom:10px}
.archv-errretry{appearance:none;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);background:transparent;color:inherit;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;flex:none}
.archv-errretry:focus-visible,.archv-btn:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}
.archv-list{display:flex;flex-direction:column;gap:8px}
.archv-card{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-fill-elevated);transition:border-color .15s ease,background-color .15s ease}
.archv-card:hover{border-color:var(--dsw-alias-border-l4)}
.archv-main{min-width:0;display:flex;flex-direction:column;gap:4px}
.archv-name{font-size:13px;font-weight:550;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.archv-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:0}
.archv-wtag{display:inline-flex;align-items:center;gap:4px;max-width:100%;font-size:11px;font-weight:500;line-height:1;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:3px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.archv-wgone{border-style:dashed;color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.archv-date{font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none}
.archv-id{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;color:var(--dsw-alias-label-tertiary);flex:none}
.archv-dot{color:var(--dsw-alias-border-l3);flex:none}
.archv-actions{display:flex;gap:8px;flex:none}
.archv-btn{appearance:none;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}
.archv-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.archv-btn:disabled{opacity:.5;cursor:default}
.archv-restore{min-width:62px;justify-content:center}
.archv-del{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent)}
.archv-del:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent);color:var(--dsw-alias-state-error-primary)}
.archv-empty{display:flex;align-items:center;gap:10px;padding:20px 14px;border:1px dashed var(--dsw-alias-border-l3);border-radius:12px;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}
.archv-skel{display:flex;flex-direction:column;gap:8px}
.archv-skel-card{height:58px;border-radius:12px;background:var(--dsw-alias-fill-subtle);position:relative;overflow:hidden}
.archv-skel-card::after{content:'';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-fill-elevated) 75%,transparent),transparent);animation:archv-shimmer 1.4s infinite}
.archv-status{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:60;background:var(--dsw-alias-fill-elevated);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);padding:9px 16px;border-radius:999px;font-size:12px;box-shadow:0 8px 24px rgb(0 0 0/.18);display:flex;align-items:center;gap:8px;animation:archv-pop .18s ease-out;max-width:min(90vw,420px)}
.archv-spin{width:12px;height:12px;border:2px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 35%,transparent);border-top-color:var(--dsw-alias-label-secondary);border-radius:50%;animation:archv-rot .8s linear infinite;flex:none}
@keyframes archv-shimmer{100%{transform:translateX(100%)}}
@keyframes archv-rot{to{transform:rotate(360deg)}}
@keyframes archv-pop{from{opacity:0;transform:translateX(-50%) translateY(10px)}}
@media (prefers-reduced-motion:reduce){.archv-skel-card::after{animation:none}.archv-card,.archv-btn{transition:none}.archv-status,.archv-spin{animation:none}}
@media (max-width:560px){.archv-card{flex-direction:column;align-items:stretch;gap:10px}.archv-actions{justify-content:flex-end}}
`

function fmtDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  try {
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d)
  } catch {
    return String(iso)
  }
}

function pathName(p) {
  if (!p) return null
  const parts = String(p).replace(/\\+$/, '').split(/[/\\]/)
  return parts[parts.length - 1] || p
}

async function postJSON(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body || {}),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) throw new Error((data && (data.error || data.message)) || `request failed (${res.status})`)
  return data
}

function ArchivedPanel() {
  const [items, setItems] = useState(null)
  const [busy, setBusy] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const showToast = (msg) => {
    if (timer.current) clearTimeout(timer.current)
    setToast(msg)
    timer.current = setTimeout(() => setToast(null), 2400)
  }

  const refresh = () => {
    setError(null)
    postJSON('/archived-sessions/list', {})
      .then((r) => setItems(r.items || []))
      .catch((e) => setError(String((e && e.message) || e)))
  }

  useEffect(() => {
    refresh()
    return () => { if (timer.current) clearTimeout(timer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const act = (action, it) => {
    if (busy) return
    if (action === 'delete') {
      if (confirmId !== it.sessionId) { setConfirmId(it.sessionId); return }
      setConfirmId(null)
    } else { setConfirmId(null); setError(null) }
    setBusy(it.sessionId)
    postJSON('/archived-sessions/' + action, { sessionId: it.sessionId })
      .then(() => {
        setBusy(null)
        showToast(action === 'restore' ? `已恢复「${it.title || it.sessionId}」` : `已删除 ${it.title || it.sessionId}`)
        refresh()
      })
      .catch((e) => { setBusy(null); setConfirmId(null); setError(String((e && e.message) || e)) })
  }

  const workspaceTag = (it) => {
    if (it.hasWorkspace && it.workspaceGone) {
      return (
        <span className="archv-wtag archv-wgone" title={(it.workspacePath || '') + '（原工作区已删除）'}>
          工作区已删 · {pathName(it.workspacePath) || '?'}
        </span>
      )
    }
    const wName = it.workspaceTitle || pathName(it.workspacePath)
    if (wName) return <span className="archv-wtag" title={it.workspacePath || ''}>{wName}</span>
    return null
  }

  return (
    <div className="archv" role="region" aria-label="归档会话">
      <style>{CSS}</style>
      <div className="archv-head">
        <h2 className="archv-title">归档会话</h2>
        {items !== null && <span className="archv-count" aria-label={`${items.length} 个归档会话`}>{items.length}</span>}
      </div>
      <p className="archv-sub">
        被归档（从侧栏隐藏）的会话都在这里。恢复会把会话放回原分组；删除会彻底移除日志文件，不可恢复。
      </p>
      {error && (
        <div className="archv-err" role="alert">
          <span>{error}</span>
          <button type="button" className="archv-errretry" onClick={refresh}>重试</button>
        </div>
      )}
      {items === null ? (
        <div className="archv-skel" aria-label="加载中">
          {[0, 1, 2].map((i) => <div key={i} className="archv-skel-card" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="archv-empty">目前没有归档会话。在侧栏任一会话的菜单里选择「归档」即可收纳进来。</div>
      ) : (
        <div className="archv-list" role="list">
          {items.map((it) => {
            const isConfirm = confirmId === it.sessionId
            const date = fmtDate(it.createdAt)
            const wtag = workspaceTag(it)
            return (
              <div key={it.sessionId} className="archv-card" role="listitem">
                <div className="archv-main">
                  <div className="archv-name" title={it.title || ''}>{it.title || '(无标题)'}</div>
                  <div className="archv-meta">
                    {date && <span className="archv-date">{date}</span>}
                    {date && wtag && <span className="archv-dot">·</span>}
                    {wtag}
                    <span className="archv-id">{it.sessionId}</span>
                  </div>
                </div>
                <div className="archv-actions">
                  <button type="button" className="archv-btn archv-restore" disabled={busy !== null} aria-label={'恢复 ' + (it.title || it.sessionId)} onClick={() => act('restore', it)}>
                    {busy === it.sessionId && <span className="archv-spin" aria-hidden="true" />}恢复
                  </button>
                  <button type="button" className="archv-btn archv-del" disabled={busy !== null} aria-label={(isConfirm ? '确认删除 ' : '删除 ') + (it.title || it.sessionId)} onClick={() => act('delete', it)}>
                    {isConfirm ? '确认删除?' : '删除'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {toast && <div className="archv-status" role="status">{toast}</div>}
    </div>
  )
}

const MOVE_CSS = `
.mv{display:flex;flex-direction:column;gap:4px;max-width:800px;padding:8px 2px 28px}
.mv-head{display:flex;align-items:center;gap:10px;margin:0 0 2px}
.mv-title{font-size:16px;font-weight:650;color:var(--dsw-alias-label-primary);letter-spacing:-0.01em;margin:0}
.mv-count{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:1px 8px;flex:none}
.mv-sub{font-size:12px;line-height:1.55;color:var(--dsw-alias-label-tertiary);margin:0 0 12px;max-width:64ch}
.mv-err{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);border-radius:10px;color:var(--dsw-alias-state-error-primary);font-size:12px;margin-bottom:10px}
.mv-errretry{appearance:none;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);background:transparent;color:inherit;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;flex:none}
.mv-list{display:flex;flex-direction:column;gap:8px}
.mv-card{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-fill-elevated);transition:border-color .15s ease}
.mv-card:hover{border-color:var(--dsw-alias-border-l4)}
.mv-main{min-width:0;display:flex;flex-direction:column;gap:4px}
.mv-name{font-size:13px;font-weight:550;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mv-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:0}
.mv-wtag{display:inline-flex;align-items:center;gap:4px;max-width:100%;font-size:11px;font-weight:500;line-height:1;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:3px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mv-archived{color:var(--dsw-alias-state-warning-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warning-primary) 50%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warning-primary) 8%,transparent)}
.mv-date{font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none}
.mv-id{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;color:var(--dsw-alias-label-tertiary);flex:none}
.mv-dot{color:var(--dsw-alias-border-l3);flex:none}
.mv-actions{display:flex;gap:8px;flex:none}
.mv-btn{appearance:none;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}
.mv-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.mv-btn:disabled{opacity:.5;cursor:default}
.mv-go{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent)}
.mv-go:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);color:var(--dsw-alias-state-business-primary)}
.mv-sheet{display:flex;flex-direction:column;gap:10px;margin-top:10px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-fill-subtle)}
.mv-sheet-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--dsw-alias-label-secondary)}
.mv-sheet-row input[type=radio]{accent-color:var(--dsw-alias-state-business-primary)}
.mv-sheet select,.mv-sheet input[type=text]{appearance:none;min-height:32px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:var(--dsw-alias-fill-elevated);color:var(--dsw-alias-label-primary);font-size:12px;font-family:inherit}
.mv-sheet input[type=text]{flex:1;min-width:220px}
.mv-sheet select:focus-visible,.mv-sheet input[type=text]:focus-visible,.mv-go:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}
.mv-empty{display:flex;align-items:center;gap:10px;padding:20px 14px;border:1px dashed var(--dsw-alias-border-l3);border-radius:12px;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}
.mv-skel{display:flex;flex-direction:column;gap:8px}
.mv-skel-card{height:58px;border-radius:12px;background:var(--dsw-alias-fill-subtle);position:relative;overflow:hidden}
.mv-skel-card::after{content:'';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-fill-elevated) 75%,transparent),transparent);animation:mv-shimmer 1.4s infinite}
@keyframes mv-shimmer{100%{transform:translateX(100%)}}
@keyframes mv-pop{from{opacity:0;transform:translateX(-50%) translateY(10px)}}
.mv-status{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:60;background:var(--dsw-alias-fill-elevated);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);padding:9px 16px;border-radius:999px;font-size:12px;box-shadow:0 8px 24px rgb(0 0 0/.18);display:flex;align-items:center;gap:8px;animation:mv-pop .18s ease-out;max-width:min(90vw,420px)}
.mv-spin{width:12px;height:12px;border:2px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 35%,transparent);border-top-color:var(--dsw-alias-label-secondary);border-radius:50%;animation:archv-rot .8s linear infinite;flex:none}
@media (prefers-reduced-motion:reduce){.mv-skel-card::after{animation:none}.mv-card,.mv-btn{transition:none}.mv-status,.mv-spin{animation:none}}
@media (max-width:560px){.mv-card{flex-direction:column;align-items:stretch;gap:10px}.mv-actions{justify-content:flex-end}.mv-sheet input[type=text]{min-width:0}}
`

function MovePanel() {
  const [sessions, setSessions] = useState(null)
  const [workspaces, setWorkspaces] = useState([])
  const [busy, setBusy] = useState(null)
  const [open, setOpen] = useState(null)
  const [mode, setMode] = useState('existing')
  const [targetWs, setTargetWs] = useState('')
  const [newPath, setNewPath] = useState('')
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const showToast = (msg) => {
    if (timer.current) clearTimeout(timer.current)
    setToast(msg)
    timer.current = setTimeout(() => setToast(null), 2400)
  }

  const refresh = () => {
    setError(null)
    Promise.all([
      postJSON('/archived-sessions/sessions', {}),
      postJSON('/archived-sessions/workspaces', {}),
    ])
      .then(([s, works]) => {
        setSessions(s.items || [])
        setWorkspaces(works.items || [])
        if (!targetWs && works.items && works.items.length) setTargetWs(works.items[0].workspaceId)
      })
      .catch((e) => setError(String((e && e.message) || e)))
  }

  useEffect(() => {
    refresh()
    return () => { if (timer.current) clearTimeout(timer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const wsPath = (id) => {
    const w = workspaces.find((x) => x.workspaceId === id)
    return w ? w.path : ''
  }

  const doMove = (it) => {
    const targetPath = mode === 'new' ? newPath.trim() : wsPath(targetWs)
    if (!targetPath) { setError('请选择已有工作区或输入新的目标目录路径'); return }
    setBusy(it.sessionId)
    setError(null)
    postJSON('/archived-sessions/move', { sessionId: it.sessionId, targetPath })
      .then((r) => {
        setBusy(null)
        setOpen(null)
        setMode('existing')
        setNewPath('')
        showToast(`已把「${it.title || it.sessionId}」移到 ${r.workspaceTitle || targetPath}`)
        refresh()
      })
      .catch((e) => { setBusy(null); setError(String((e && e.message) || e)) })
  }

  const wtag = (it) => {
    if (it.workspacePath) {
      return <span className="mv-wtag" title={it.workspacePath}>{it.workspaceTitle || pathName(it.workspacePath)}</span>
    }
    return <span className="mv-wtag">未分组</span>
  }

  return (
    <div className="mv" role="region" aria-label="移动会话">
      <style>{MOVE_CSS}</style>
      <div className="mv-head">
        <h2 className="mv-title">移动会话到工作区</h2>
        {sessions !== null && <span className="mv-count" aria-label={`${sessions.length} 个会话`}>{sessions.length}</span>}
      </div>
      <p className="mv-sub">
        把任意会话移动到某个工作区目录（可选用现有工作区或输入新目录，自动创建）。移动会改写会话的工作目录并把日志迁移过去；
        会话当前处于打开状态时需先在侧栏切走才能移动。
      </p>
      {error && (
        <div className="mv-err" role="alert">
          <span>{error}</span>
          <button type="button" className="mv-errretry" onClick={refresh}>重试</button>
        </div>
      )}
      {sessions === null ? (
        <div className="mv-skel" aria-label="加载中">
          {[0, 1, 2].map((i) => <div key={i} className="mv-skel-card" />)}
        </div>
      ) : sessions.length === 0 ? (
        <div className="mv-empty">暂无可移动的会话。</div>
      ) : (
        <div className="mv-list" role="list">
          {sessions.map((it) => {
            const date = fmtDate(it.createdAt)
            const expanded = open === it.sessionId
            return (
              <div key={it.sessionId} className="mv-card" role="listitem">
                <div className="mv-main">
                  <div className="mv-name" title={it.title || ''}>{it.title || '(无标题)'}</div>
                  <div className="mv-meta">
                    {it.archived && <span className="mv-wtag mv-archived">已归档</span>}
                    {wtag(it)}
                    {date && <><span className="mv-dot">·</span><span className="mv-date">{date}</span></>}
                    <span className="mv-id">{it.sessionId}</span>
                  </div>
                  {expanded && (
                    <div className="mv-sheet">
                      <label className="mv-sheet-row">
                        <input type="radio" name="mv-target" checked={mode === 'existing'} onChange={() => setMode('existing')} />
                        已有工作区
                      </label>
                      {mode === 'existing' && (
                        <div className="mv-sheet-row">
                          <select value={targetWs} onChange={(e) => setTargetWs(e.target.value)} aria-label="目标工作区">
                            {workspaces.length === 0 && <option value="">（暂无工作区）</option>}
                            {workspaces.map((w) => (
                              <option key={w.workspaceId} value={w.workspaceId}>{w.title} · {w.path}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <label className="mv-sheet-row">
                        <input type="radio" name="mv-target" checked={mode === 'new'} onChange={() => setMode('new')} />
                        新建工作区目录
                      </label>
                      {mode === 'new' && (
                        <div className="mv-sheet-row">
                          <input
                            type="text"
                            value={newPath}
                            onChange={(e) => setNewPath(e.target.value)}
                            placeholder="例如 /Users/you/Projects/demo 或 ~/demo"
                            aria-label="新工作区目录路径"
                          />
                        </div>
                      )}
                      <div className="mv-sheet-row">
                        <button type="button" className="mv-btn mv-go" disabled={busy !== null} onClick={() => doMove(it)}>
                          {busy === it.sessionId && <span className="mv-spin" aria-hidden="true" />}确认移动
                        </button>
                        <button type="button" className="mv-btn" disabled={busy !== null} onClick={() => { setOpen(null); setMode('existing'); setNewPath(''); }}>取消</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mv-actions">
                  <button
                    type="button"
                    className="mv-btn mv-go"
                    disabled={busy !== null}
                    aria-label={'移动 ' + (it.title || it.sessionId)}
                    onClick={() => { if (expanded) { setOpen(null) } else { setTargetWs(workspaces.length ? (targetWs || workspaces[0].workspaceId) : ''); setMode('existing'); setNewPath(''); setOpen(it.sessionId) } }}
                  >
                    {expanded ? '收起' : '移动到…'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {toast && <div className="mv-status" role="status">{toast}</div>}
    </div>
  )
}

// Left-nav icon swap for the two plugin settings sections.
//
// DSH's settings shell renders a *shared* fallback gear for every custom
// section (its internal navIcon() only differentiates 模型/插件/Agent预设), and
// settings.section has no per-section icon field. So — exactly like
// dsh-better-sidebar — we mark our own rows by matching their visible label
// text against the shell DOM, then let CSS swap the gear for a distinct glyph.
// The marker owns no shell structure and is removed on fiber disposal, so the
// adaptation stays HMR-safe and ships with the plugin.
const NAV_CSS = `
[data-dsh-nav-archived] > svg:first-child,
[data-dsh-nav-move] > svg:first-child { display: none; }
[data-dsh-nav-archived]::before,
[data-dsh-nav-move]::before {
  content: ''; flex: none; width: 16px; height: 16px; background: currentColor;
  -webkit-mask: center / contain no-repeat; mask: center / contain no-repeat;
}
[data-dsh-nav-archived]::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E");
}
[data-dsh-nav-move]::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M22%2019a2%202%200%200%201-2%202H4a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h5l2%203h9a2%202%200%200%201%202%202z'/%3E%3Cpath%20d%3D'M12%2010v6'/%3E%3Cpath%20d%3D'm15%2013-3%203-3-3'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M22%2019a2%202%200%200%201-2%202H4a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h5l2%203h9a2%202%200%200%201%202%202z'/%3E%3Cpath%20d%3D'M12%2010v6'/%3E%3Cpath%20d%3D'm15%2013-3%203-3-3'/%3E%3C/svg%3E");
}
`

function markSettingsNav() {
  const ARCHIVED_LABEL = '归档会话'
  const MOVE_LABEL = '移动会话'
  let disposed = false
  const sync = () => {
    if (disposed) return
    const buttons = document.querySelectorAll('[role="dialog"] nav button')
    for (const b of buttons) {
      const t = (b.textContent || '').trim()
      if (t === ARCHIVED_LABEL) b.setAttribute('data-dsh-nav-archived', '')
      else b.removeAttribute('data-dsh-nav-archived')
      if (t === MOVE_LABEL) b.setAttribute('data-dsh-nav-move', '')
      else b.removeAttribute('data-dsh-nav-move')
    }
  }
  sync()
  const obs = new MutationObserver(sync)
  obs.observe(document.body, { childList: true, subtree: true, characterData: true })
  return () => {
    disposed = true
    obs.disconnect()
    document.querySelectorAll('[data-dsh-nav-archived]').forEach((e) => e.removeAttribute('data-dsh-nav-archived'))
    document.querySelectorAll('[data-dsh-nav-move]').forEach((e) => e.removeAttribute('data-dsh-nav-move'))
  }
}

function installSettingsNavIcons(ctx) {
  const styleEl = document.createElement('style')
  styleEl.textContent = NAV_CSS
  document.head.appendChild(styleEl)
  const dispose = markSettingsNav()
  ctx.effect(() => () => {
    dispose()
    if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl)
  })
}

export function apply(ctx) {
  installSettingsNavIcons(ctx)
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      { name: 'settings.section', id: 'archived-sessions', order: 90, label: '归档会话' },
      (props) => <ArchivedPanel {...props} />,
    ),
  )
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      { name: 'settings.section', id: 'move-sessions', order: 91, label: '移动会话' },
      (props) => <MovePanel {...props} />,
    ),
  )
}
