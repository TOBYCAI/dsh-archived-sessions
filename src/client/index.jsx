/**
 * dsh-sessions-manager — browser half: renders a single "会话管理" settings
 * section (settings.section list slot) that unifies archived-session
 * management and cross-workspace moving. It talks to the host half's
 * /archived-sessions/* JSON routes by fetch, showing every conversation with
 * its archive state and offering archive / restore / delete / move (and batch)
 * actions. All DOM/runtime wiring failures are logged, never thrown — a thrown
 * plugin apply takes down the whole web-shell boot.
 *
 * @module dsh-sessions-manager/client
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
.sess-filter{display:flex;align-items:center;gap:6px;margin:0 0 12px}
.sess-fbtn{appearance:none;min-height:30px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:999px;font-size:12px;font-weight:500;cursor:pointer}
.sess-fbtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.sess-fbtn-on{background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3)}
.sess-batch{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 2px 4px;margin-bottom:4px}
.sess-btntext{font-size:12px;color:var(--dsw-alias-label-tertiary);flex:none}
.archv-list{display:flex;flex-direction:column;gap:8px}
.archv-card{display:flex;flex-direction:column;align-items:stretch;gap:0;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-fill-elevated);transition:border-color .15s ease,background-color .15s ease}
.archv-card:hover{border-color:var(--dsw-alias-border-l4)}
.archv-card-exp{border-color:var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-1)}
.archv-row{display:flex;align-items:center;gap:14px;width:100%;min-width:0}
.archv-main{min-width:0;display:flex;flex-direction:column;gap:4px}
.archv-name{font-size:13px;font-weight:550;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.archv-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:0}
.archv-wtag{display:inline-flex;align-items:center;gap:4px;max-width:100%;font-size:11px;font-weight:500;line-height:1;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:3px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.archv-wgone{border-style:dashed;color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}
.archv-active{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 45%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
.archv-date{font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none}
.archv-id{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;color:var(--dsw-alias-label-tertiary);flex:none}
.archv-dot{color:var(--dsw-alias-border-l3);flex:none}
.archv-check{width:15px;height:15px;accent-color:var(--dsw-alias-state-business-primary);flex:none;cursor:pointer}
.archv-body{flex:1;min-width:0;display:flex;align-items:center;gap:12px}
.archv-actions{display:flex;gap:8px;flex:none;flex-wrap:wrap;justify-content:flex-end}
.archv-btn{appearance:none;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}
.archv-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.archv-btn:disabled{opacity:.5;cursor:default}
.archv-del{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent)}
.archv-del:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent);color:var(--dsw-alias-state-error-primary)}
.archv-go{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent)}
.archv-go:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);color:var(--dsw-alias-state-business-primary)}
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
@media (max-width:640px){.archv-card{flex-direction:column;align-items:stretch;gap:10px}.archv-actions{justify-content:flex-end}}
.mv-sheet{width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;margin-top:12px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-left:3px solid var(--dsw-alias-state-business-primary);border-radius:10px;background:var(--dsw-alias-fill-subtle)}
.mv-sheet-head{display:flex;align-items:center;justify-content:space-between;gap:10px}
.mv-sheet-title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.mv-sheet-close{appearance:none;width:26px;height:26px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:16px;line-height:1}
.mv-sheet-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.mv-seg{display:flex;gap:2px;padding:2px;background:var(--dsw-alias-fill-elevated);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;width:100%}
.mv-segbtn{appearance:none;flex:1;min-height:30px;padding:0 12px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.mv-segbtn:hover:not(:disabled){color:var(--dsw-alias-label-primary)}
.mv-segbtn-on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);box-shadow:0 1px 2px rgb(0 0 0/.08)}
.mv-field{display:flex;flex-direction:column;gap:6px}
.mv-field label.mv-field-label{font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary)}
.mv-field select,.mv-field input[type=text]{box-sizing:border-box;appearance:none;width:100%;min-height:34px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:var(--dsw-alias-fill-elevated);color:var(--dsw-alias-label-primary);font-size:12px;font-family:inherit}
.mv-field select:focus-visible,.mv-field input[type=text]:focus-visible,.mv-sheet-close:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.mv-browse-row{display:flex;align-items:center;gap:8px}
.mv-browse-row input[type=text]{flex:1;min-width:0}
.mv-foot{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:2px}
@media (max-width:640px){.archv-row{flex-wrap:wrap}.mv-sheet{padding:12px}}
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

// Left-nav icon swap: DSH's settings shell renders a shared fallback gear for
// every custom section and settings.section has no per-section icon field.
// Like dsh-better-sidebar, we mark our own row by matching its visible label
// text, then CSS swaps the gear for an archive-box glyph. The marker owns no
// shell structure and is removed on fiber disposal (HMR-safe, ships with the
// plugin).
const NAV_CSS = `
[data-dsh-nav-sessions] > svg:first-child { display: none; }
[data-dsh-nav-sessions]::before {
  content: ''; flex: none; width: 16px; height: 16px; background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
`

function markSettingsNav() {
  const LABEL = '会话管理'
  let disposed = false
  const sync = () => {
    if (disposed) return
    const buttons = document.querySelectorAll('[role="dialog"] nav button')
    for (const b of buttons) {
      const t = (b.textContent || '').trim()
      if (t === LABEL) b.setAttribute('data-dsh-nav-sessions', '')
      else b.removeAttribute('data-dsh-nav-sessions')
    }
  }
  sync()
  const obs = new MutationObserver(sync)
  obs.observe(document.body, { childList: true, subtree: true, characterData: true })
  return () => {
    disposed = true
    obs.disconnect()
    document.querySelectorAll('[data-dsh-nav-sessions]').forEach((e) => e.removeAttribute('data-dsh-nav-sessions'))
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

function SessionPanel({ workspacesSvc }) {
  const [sessions, setSessions] = useState(null)
  const [workspaces, setWorkspaces] = useState([])
  const [filter, setFilter] = useState('all') // 'all' | 'archived'
  const [selected, setSelected] = useState({})
  const [confirmDel, setConfirmDel] = useState(null)
  const [confirmBatch, setConfirmBatch] = useState(false)
  const [busy, setBusy] = useState(null)
  const [openMove, setOpenMove] = useState(null)
  const [moveMode, setMoveMode] = useState('existing')
  const [targetWs, setTargetWs] = useState('')
  const [newPath, setNewPath] = useState('')
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [picking, setPicking] = useState(false)
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
        setSelected({})
        setConfirmDel(null)
        setConfirmBatch(false)
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

  const archivedList = sessions ? sessions.filter((x) => x.archived) : []
  const activeList = sessions ? sessions.filter((x) => !x.archived) : []
  const list = filter === 'archived' ? archivedList : sessions || []
  const selIds = Object.keys(selected).filter((k) => selected[k])

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }))
  const clearSel = () => setSelected({})
  const selectAll = () => {
    const o = {}
    list.forEach((x) => { o[x.sessionId] = true })
    setSelected(o)
  }

  const act = (action, it) => {
    if (busy) return
    if (action === 'delete') {
      if (confirmDel !== it.sessionId) { setConfirmDel(it.sessionId); return }
      setConfirmDel(null)
    }
    setBusy(it.sessionId)
    postJSON('/archived-sessions/' + action, { sessionId: it.sessionId })
      .then(() => {
        setBusy(null)
        const n = it.title || it.sessionId
        showToast(action === 'archive' ? `已归档「${n}」` : action === 'restore' ? `已恢复「${n}」` : `已删除 ${n}`)
        refresh()
      })
      .catch((e) => { setBusy(null); setConfirmDel(null); setError(String((e && e.message) || e)) })
  }

  const doMove = (it) => {
    const targetPath = moveMode === 'new' ? newPath.trim() : wsPath(targetWs)
    if (!targetPath) { setError('请选择已有工作区或输入新的目标目录路径'); return }
    setBusy(it.sessionId)
    setError(null)
    postJSON('/archived-sessions/move', { sessionId: it.sessionId, targetPath })
      .then((r) => {
        setBusy(null)
        setOpenMove(null)
        setMoveMode('existing')
        setNewPath('')
        showToast(`已把「${it.title || it.sessionId}」移到 ${r.workspaceTitle || targetPath}`)
        refresh()
      })
      .catch((e) => { setBusy(null); setError(String((e && e.message) || e)) })
  }

  const doBatch = (action) => {
    if (!selIds.length || busy) return
    if (action === 'delete-many') {
      if (!confirmBatch) { setConfirmBatch(true); return }
      setConfirmBatch(false)
    }
    setBusy('__batch__')
    postJSON('/archived-sessions/' + action, { sessionIds: selIds })
      .then((r) => {
        setBusy(null)
        const n = (r && (r.archived || r.restored || r.deleted)) || selIds.length
        showToast(`已处理 ${n} 个会话`)
        refresh()
      })
      .catch((e) => { setBusy(null); setConfirmBatch(false); setError(String((e && e.message) || e)) })
  }

  const openMoveFor = (it) => {
    if (openMove === it.sessionId) { setOpenMove(null); return }
    setTargetWs(workspaces.length ? (targetWs || workspaces[0].workspaceId) : '')
    setMoveMode('existing')
    setNewPath('')
    setOpenMove(it.sessionId)
  }

  const pickDirectory = async () => {
    if (!workspacesSvc || picking) return
    setPicking(true)
    try {
      const p = await workspacesSvc.pickDirectory()
      if (p) { setNewPath(p); setMoveMode('new') }
    } catch (e) {
      setError(String((e && e.message) || e))
    } finally {
      setPicking(false)
    }
  }

  const workspaceTag = (it) => {
    if (it.hasWorkspace && it.workspaceGone) {
      return <span className="archv-wtag archv-wgone" title={(it.workspacePath || '') + '（原工作区已删除）'}>工作区已删 · {pathName(it.workspacePath) || '?'}</span>
    }
    const wName = it.workspaceTitle || pathName(it.workspacePath)
    if (wName) return <span className="archv-wtag" title={it.workspacePath || ''}>{wName}</span>
    return <span className="archv-wtag">未分组</span>
  }

  const rowActions = (it) => {
    if (it.archived) {
      return (
        <div className="archv-actions">
          <button type="button" className="archv-btn archv-go" disabled={busy !== null} onClick={() => act('restore', it)}>恢复</button>
          <button type="button" className="archv-btn archv-go" disabled={busy !== null} onClick={() => openMoveFor(it)}>{openMove === it.sessionId ? '收起' : '移动…'}</button>
          <button type="button" className="archv-btn archv-del" disabled={busy !== null} onClick={() => act('delete', it)}>{confirmDel === it.sessionId ? '确认删除?' : '删除'}</button>
        </div>
      )
    }
    return (
      <div className="archv-actions">
        <button type="button" className="archv-btn" disabled={busy !== null} onClick={() => act('archive', it)}>归档</button>
        <button type="button" className="archv-btn archv-go" disabled={busy !== null} onClick={() => openMoveFor(it)}>{openMove === it.sessionId ? '收起' : '移动…'}</button>
      </div>
    )
  }

  return (
    <div className="archv" role="region" aria-label="会话管理">
      <style>{CSS}</style>
      <div className="archv-head">
        <h2 className="archv-title">会话管理</h2>
        {sessions !== null && <span className="archv-count" aria-label={`${sessions.length} 个会话`}>{sessions.length}</span>}
      </div>
      <p className="archv-sub">
        统一管理全部会话：归档 / 恢复 / 彻底删除 / 移动到其他工作区，支持批量。归档会从侧栏隐藏；删除会彻底移除日志，不可恢复。
      </p>
      {error && (
        <div className="archv-err" role="alert">
          <span>{error}</span>
          <button type="button" className="archv-errretry" onClick={refresh}>重试</button>
        </div>
      )}
      {sessions === null ? (
        <div className="archv-skel" aria-label="加载中">
          {[0, 1, 2].map((i) => <div key={i} className="archv-skel-card" />)}
        </div>
      ) : (
        <>
          <div className="sess-filter" role="tablist" aria-label="会话筛选">
            <button type="button" className={'sess-fbtn' + (filter === 'all' ? ' sess-fbtn-on' : '')} onClick={() => { setFilter('all'); clearSel(); setConfirmBatch(false) }}>全部 ({sessions.length})</button>
            <button type="button" className={'sess-fbtn' + (filter === 'archived' ? ' sess-fbtn-on' : '')} onClick={() => { setFilter('archived'); clearSel(); setConfirmBatch(false) }}>已归档 ({archivedList.length})</button>
          </div>

          {list.length > 0 && (
            <div className="sess-batch">
              <span className="sess-btntext">{selIds.length ? `已选 ${selIds.length} 项` : (filter === 'archived' ? `共 ${archivedList.length} 个归档会话` : `共 ${sessions.length} 个会话（活动 ${activeList.length} / 已归档 ${archivedList.length}）`)}</span>
              <button type="button" className="archv-btn" disabled={list.length === 0} onClick={selectAll}>全选</button>
              {selIds.length > 0 && (
                <>
                  {filter === 'archived' && (
                    <>
                      <button type="button" className="archv-btn" disabled={busy !== null} onClick={() => doBatch('restore-many')}>恢复所选</button>
                      <button type="button" className="archv-btn archv-del" disabled={busy !== null} onClick={() => doBatch('delete-many')}>{confirmBatch ? '确认删除所选?' : '删除所选'}</button>
                    </>
                  )}
                  {filter === 'all' && (
                    <button type="button" className="archv-btn" disabled={busy !== null} onClick={() => doBatch('archive-many')}>归档所选</button>
                  )}
                  <button type="button" className="archv-btn" onClick={clearSel}>取消选择</button>
                </>
              )}
            </div>
          )}

          {list.length === 0 ? (
            <div className="archv-empty">{filter === 'archived' ? '目前没有归档会话。在“全部”里选中会话点“归档”即可收纳进来。' : '暂无可管理的会话。'}</div>
          ) : (
            <div className="archv-list" role="list">
              {list.map((it) => {
                const date = fmtDate(it.createdAt)
                const expanded = openMove === it.sessionId
                return (
                  <div key={it.sessionId} className={'archv-card' + (expanded ? ' archv-card-exp' : '')} role="listitem">
                    <div className="archv-row">
                      <input
                        type="checkbox"
                        className="archv-check"
                        checked={!!selected[it.sessionId]}
                        onChange={() => toggle(it.sessionId)}
                        aria-label={'选择 ' + (it.title || it.sessionId)}
                      />
                      <div className="archv-body">
                        <div className="archv-main">
                          <div className="archv-name" title={it.title || ''}>{it.title || '(无标题)'}</div>
                          <div className="archv-meta">
                            {it.archived ? <span className="archv-wtag archv-wgone">已归档</span> : <span className="archv-wtag archv-active">活动</span>}
                            {workspaceTag(it)}
                            {date && <><span className="archv-dot">·</span><span className="archv-date">{date}</span></>}
                            <span className="archv-id">{it.sessionId}</span>
                          </div>
                        </div>
                        {rowActions(it)}
                      </div>
                    </div>
                    {expanded && (
                      <div className="mv-sheet" role="region" aria-label="移动到工作区">
                        <div className="mv-sheet-head">
                          <h3 className="mv-sheet-title">移动到工作区</h3>
                          <button type="button" className="mv-sheet-close" aria-label="关闭" onClick={() => setOpenMove(null)}>×</button>
                        </div>
                        <div className="mv-seg" role="tablist">
                          <button type="button" role="tab" aria-selected={moveMode === 'existing'} className={'mv-segbtn' + (moveMode === 'existing' ? ' mv-segbtn-on' : '')} onClick={() => setMoveMode('existing')}>已有工作区</button>
                          <button type="button" role="tab" aria-selected={moveMode === 'new'} className={'mv-segbtn' + (moveMode === 'new' ? ' mv-segbtn-on' : '')} onClick={() => setMoveMode('new')}>新建目录</button>
                        </div>
                        {moveMode === 'existing' ? (
                          <div className="mv-field">
                            <label className="mv-field-label" htmlFor="mv-target-ws">目标工作区</label>
                            <select id="mv-target-ws" value={targetWs} onChange={(e) => setTargetWs(e.target.value)}>
                              {workspaces.length === 0 && <option value="">（暂无工作区）</option>}
                              {workspaces.map((w) => (
                                <option key={w.workspaceId} value={w.workspaceId}>{w.title} · {w.path}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="mv-field">
                            <label className="mv-field-label" htmlFor="mv-new-path">新工作区目录路径</label>
                            <div className="mv-browse-row">
                              <input
                                id="mv-new-path"
                                type="text"
                                value={newPath}
                                onChange={(e) => setNewPath(e.target.value)}
                                placeholder="例如 /Users/you/Projects/demo 或 ~/demo"
                              />
                              <button
                                type="button"
                                className="archv-btn"
                                onClick={pickDirectory}
                                disabled={busy !== null || picking || !workspacesSvc}
                                title={!workspacesSvc ? '当前运行环境不支持系统目录选择' : '打开系统目录选择窗口'}
                              >
                                {picking ? '选择中…' : '浏览…'}
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mv-foot">
                          <button type="button" className="archv-btn" onClick={() => setOpenMove(null)}>取消</button>
                          <button type="button" className="archv-btn archv-go" disabled={busy !== null} onClick={() => doMove(it)}>
                            {busy === it.sessionId && <span className="archv-spin" aria-hidden="true" />}确认移动
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
      {toast && <div className="archv-status" role="status">{toast}</div>}
    </div>
  )
}

export function apply(ctx) {
  installSettingsNavIcons(ctx)
  const workspacesSvc = ctx.get('workspaces')
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      { name: 'settings.section', id: 'session-manager', order: 90, label: '会话管理' },
      (props) => <SessionPanel {...props} workspacesSvc={workspacesSvc} />,
    ),
  )
}
