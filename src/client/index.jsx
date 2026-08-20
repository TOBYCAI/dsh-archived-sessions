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

export function apply(ctx) {
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      { name: 'settings.section', id: 'archived-sessions', order: 90, label: '归档会话' },
      (props) => <ArchivedPanel {...props} />,
    ),
  )
}
