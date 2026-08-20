// dsh-archived-sessions — browser half (hand-built bundle, ModuleLoader handshake).
// Settings "归档会话" section with an archive logo, workspace tags, session
// dates, and batch multi-select (restore / delete) talking to /archived-sessions/*.
window.__ModuleLoader__.load({ id: 'dsh-archived-sessions', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var React = require('react');
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var h = React.createElement;

exports.inject = ['slots'];

var CSS = "\n.archv{display:flex;flex-direction:column;gap:4px;max-width:820px;padding:8px 2px 28px}\n.archv-head{display:flex;align-items:center;gap:10px;margin:0 0 2px;flex-wrap:wrap}\n.archv-titleIcon{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;color:var(--dsw-alias-label-primary);flex:none}\n.archv-title{font-size:16px;font-weight:650;color:var(--dsw-alias-label-primary);letter-spacing:-0.01em;margin:0}\n.archv-count{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:1px 8px;flex:none}\n.archv-batchBtn{appearance:none;min-height:26px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:8px;font-size:11px;font-weight:500;cursor:pointer;margin-left:auto;transition:background-color .15s ease,border-color .15s ease,color .15s ease}\n.archv-batchBtn:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}\n.archv-batchBtn.archv-on{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}\n.archv-batchBtn:focus-visible,.archv-btn:focus-visible,.archv-errretry:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}\n.archv-toolbar{display:flex;align-items:center;gap:12px;padding:8px 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-fill-subtle);margin-bottom:8px;flex-wrap:wrap}\n.archv-tbSel{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--dsw-alias-label-secondary);cursor:pointer}\n.archv-tbLabel{font-size:12px;color:var(--dsw-alias-label-primary);font-weight:500}\n.archv-tbActions{display:flex;gap:8px;flex-wrap:wrap;margin-left:auto}\n.archv-sub{font-size:12px;line-height:1.55;color:var(--dsw-alias-label-tertiary);margin:0 0 12px;max-width:64ch}\n.archv-err{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);border-radius:10px;color:var(--dsw-alias-state-error-primary);font-size:12px;margin-bottom:10px}\n.archv-errretry{appearance:none;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);background:transparent;color:inherit;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;flex:none}\n.archv-list{display:flex;flex-direction:column;gap:8px}\n.archv-card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-fill-elevated);transition:border-color .15s ease,background-color .15s ease}\n.archv-card:hover{border-color:var(--dsw-alias-border-l4)}\n.archv-card.archv-sel{border-color:var(--dsw-alias-state-business-primary)}\n.archv-cbox{width:16px;height:16px;accent-color:var(--dsw-alias-state-business-primary);cursor:pointer;flex:none;margin:0}\n.archv-main{min-width:0;display:flex;flex-direction:column;gap:4px;flex:1}\n.archv-name{font-size:13px;font-weight:550;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.archv-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:0}\n.archv-wtag{display:inline-flex;align-items:center;gap:4px;max-width:100%;font-size:11px;font-weight:500;line-height:1;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-subtle);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:3px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.archv-wgone{border-style:dashed;color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 7%,transparent)}\n.archv-date{font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none}\n.archv-id{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;color:var(--dsw-alias-label-tertiary);flex:none}\n.archv-dot{color:var(--dsw-alias-border-l3);flex:none}\n.archv-actions{display:flex;gap:8px;flex:none}\n.archv-btn{appearance:none;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}\n.archv-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}\n.archv-btn:disabled{opacity:.5;cursor:default}\n.archv-restore{min-width:62px;justify-content:center}\n.archv-del{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent)}\n.archv-del:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent);color:var(--dsw-alias-state-error-primary)}\n.archv-empty{display:flex;align-items:center;gap:10px;padding:20px 14px;border:1px dashed var(--dsw-alias-border-l3);border-radius:12px;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}\n.archv-skel{display:flex;flex-direction:column;gap:8px}\n.archv-skel-card{height:58px;border-radius:12px;background:var(--dsw-alias-fill-subtle);position:relative;overflow:hidden}\n.archv-skel-card::after{content:'';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--dsw-alias-fill-elevated) 75%,transparent),transparent);animation:archv-shimmer 1.4s infinite}\n.archv-status{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:60;background:var(--dsw-alias-fill-elevated);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);padding:9px 16px;border-radius:999px;font-size:12px;box-shadow:0 8px 24px rgb(0 0 0/.18);display:flex;align-items:center;gap:8px;animation:archv-pop .18s ease-out;max-width:min(90vw,420px)}\n.archv-spin{width:12px;height:12px;border:2px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 35%,transparent);border-top-color:var(--dsw-alias-label-secondary);border-radius:50%;animation:archv-rot .8s linear infinite;flex:none}\n@keyframes archv-shimmer{100%{transform:translateX(100%)}}\n@keyframes archv-rot{to{transform:rotate(360deg)}}\n@keyframes archv-pop{from{opacity:0;transform:translateX(-50%) translateY(10px)}}\n@media (prefers-reduced-motion:reduce){.archv-skel-card::after{animation:none}.archv-card,.archv-btn,.archv-batchBtn{transition:none}.archv-status,.archv-spin{animation:none}}\n@media (max-width:620px){.archv-card{flex-direction:column;align-items:stretch;gap:10px}.archv-actions{justify-content:flex-end}.archv-cbox{width:18px;height:18px}}\n";

function fmtDate(iso) {
  if (!iso) return null;
  var d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  try { return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d); }
  catch (e) { return String(iso); }
}
function pathName(p) {
  if (!p) return null;
  var parts = String(p).replace(/\\+$/, '').split(/[/\\]/);
  return parts[parts.length - 1] || p;
}
function ArchiveIcon() {
  return h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
    h('rect', { x: 3, y: 4, width: 18, height: 4, rx: 1 }),
    h('path', { d: 'M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8' }),
    h('line', { x1: 10, y1: 13, x2: 14, y2: 13 })
  );
}
function postJSON(path, body) {
  return fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body || {}),
  }).then(function (res) {
    return res.json().catch(function () { return null; }).then(function (data) {
      if (!res.ok || !data) throw new Error((data && (data.error || data.message)) || ('request failed (' + res.status + ')'));
      return data;
    });
  });
}

function ArchivedPanel() {
  var _s = useState(null), items = _s[0], setItems = _s[1];
  var _b = useState(null), busy = _b[0], setBusy = _b[1];
  var _cf = useState(null), confirmId = _cf[0], setConfirmId = _cf[1];
  var _er = useState(null), error = _er[0], setError = _er[1];
  var _ts = useState(null), toast = _ts[0], setToast = _ts[1];
  var _sm = useState(false), selectMode = _sm[0], setSelectMode = _sm[1];
  var _tk = useState(0), tick = _tk[0], setTick = _tk[1];
  var selected = useRef(new Set());
  var timer = useRef(null);
  void tick;

  function bump() { setTick(function (x) { return x + 1; }); }

  function showToast(msg) {
    if (timer.current) clearTimeout(timer.current);
    setToast(msg);
    timer.current = setTimeout(function () { setToast(null); }, 2400);
  }
  function refresh() {
    setError(null);
    postJSON('/archived-sessions/list', {}).then(function (r) { setItems(r.items || []); })
      .catch(function (e) { setError(String((e && e.message) || e)); });
  }
  useEffect(function () {
    refresh();
    return function () { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleSelect(sid) {
    var s = selected.current;
    if (s.has(sid)) s.delete(sid); else s.add(sid);
    bump();
  }
  function selectAll() {
    var s = new Set();
    if (!allSelectedFn()) if (items) items.forEach(function (it) { s.add(it.sessionId); });
    selected.current = s;
    bump();
  }
  function allSelectedFn() { return items !== null && items.length > 0 && selected.current.size === items.length; }
  function clearSel() { selected.current = new Set(); bump(); }

  function act(action, it) {
    if (busy) return;
    if (action === 'delete') { if (confirmId !== it.sessionId) { setConfirmId(it.sessionId); return; } setConfirmId(null); }
    else { setConfirmId(null); setError(null); }
    setBusy(it.sessionId);
    postJSON('/archived-sessions/' + action, { sessionId: it.sessionId })
      .then(function () {
        setBusy(null);
        showToast(action === 'restore' ? ('已恢复「' + (it.title || it.sessionId) + '」') : ('已删除 ' + (it.title || it.sessionId)));
        refresh();
      })
      .catch(function (e) { setBusy(null); setConfirmId(null); setError(String((e && e.message) || e)); });
  }

  function runBatch(action) {
    var ids = Array.from(selected.current);
    if (!ids.length || busy) return;
    if (action === 'delete') { if (confirmId !== '__many__') { setConfirmId('__many__'); return; } }
    setConfirmId(null); setError(null); setBusy('__many__');
    postJSON('/archived-sessions/' + action + '-many', { sessionIds: ids })
      .then(function (r) {
        setBusy(null);
        var n = (action === 'restore' ? (r && r.restored) : (r && r.deleted)) || 0;
        showToast(action === 'restore' ? ('已恢复 ' + n + ' 个会话') : ('已删除 ' + n + ' 个会话'));
        refresh(); clearSel(); setSelectMode(false);
      })
      .catch(function (e) { setBusy(null); setConfirmId(null); setError(String((e && e.message) || e)); });
  }

  var workspaceTag = function (it) {
    if (it.hasWorkspace && it.workspaceGone) {
      return h('span', { className: 'archv-wtag archv-wgone', title: (it.workspacePath || '') + '（原工作区已删除）' }, '工作区已删 · ' + (pathName(it.workspacePath) || '?'));
    }
    var wName = it.workspaceTitle || pathName(it.workspacePath);
    if (wName) return h('span', { className: 'archv-wtag', title: it.workspacePath || '' }, wName);
    return null;
  };

  var allSelected = allSelectedFn();
  var rows;
  if (items === null) {
    rows = h('div', { className: 'archv-skel', 'aria-label': '加载中' },
      [0, 1, 2].map(function (i) { return h('div', { key: i, className: 'archv-skel-card' }); }));
  } else if (items.length === 0) {
    rows = h('div', { className: 'archv-empty' }, '目前没有归档会话。在侧栏任一会话的菜单里选择「归档」即可收纳进来。');
  } else {
    rows = h('div', { className: 'archv-list', role: 'list' }, items.map(function (it) {
      var isConfirm = confirmId === it.sessionId;
      var date = fmtDate(it.createdAt);
      var wtag = workspaceTag(it);
      var isSel = selected.current.has(it.sessionId);
      return h('div', { key: it.sessionId, className: 'archv-card' + (isSel ? ' archv-sel' : ''), role: 'listitem', onClick: selectMode ? function () { toggleSelect(it.sessionId); } : undefined }, [
        selectMode ? h('input', { key: 'cb', type: 'checkbox', className: 'archv-cbox', checked: isSel, 'aria-label': '选择 ' + (it.title || it.sessionId), onClick: function (e) { e.stopPropagation(); }, onChange: function () { toggleSelect(it.sessionId); } }) : null,
        h('div', { className: 'archv-main' }, [
          h('div', { className: 'archv-name', title: it.title || '' }, it.title || '(无标题)'),
          h('div', { className: 'archv-meta' }, [
            date ? h('span', { className: 'archv-date' }, date) : null,
            (date && wtag) ? h('span', { className: 'archv-dot' }, '·') : null,
            wtag,
            h('span', { className: 'archv-id' }, it.sessionId),
          ]),
        ]),
        selectMode ? null : h('div', { className: 'archv-actions' }, [
          h('button', { key: 'r', type: 'button', className: 'archv-btn archv-restore', disabled: busy !== null, 'aria-label': '恢复 ' + (it.title || it.sessionId), onClick: function () { act('restore', it); } },
            busy === it.sessionId ? h('span', { className: 'archv-spin', 'aria-hidden': true }) : null, '恢复'),
          h('button', { key: 'd', type: 'button', className: 'archv-btn archv-del', disabled: busy !== null, 'aria-label': (isConfirm ? '确认删除 ' : '删除 ') + (it.title || it.sessionId), onClick: function () { act('delete', it); } },
            isConfirm ? '确认删除?' : '删除'),
        ]),
      ]);
    }));
  }

  return h('div', { className: 'archv', role: 'region', 'aria-label': '归档会话' }, [
    h('style', null, CSS),
    h('div', { className: 'archv-head' }, [
      h('span', { className: 'archv-titleIcon' }, h(ArchiveIcon)),
      h('h2', { className: 'archv-title' }, '归档会话'),
      items !== null ? h('span', { className: 'archv-count', 'aria-label': items.length + ' 个归档会话' }, String(items.length)) : null,
      h('button', { type: 'button', className: 'archv-batchBtn' + (selectMode ? ' archv-on' : ''), onClick: function () { setSelectMode(!selectMode); clearSel(); setConfirmId(null); } },
        selectMode ? '退出批量' : '批量选择'),
    ]),
    selectMode && items !== null && items.length > 0 ? h('div', { className: 'archv-toolbar' }, [
      h('label', { className: 'archv-tbSel' }, [
        h('input', { type: 'checkbox', className: 'archv-cbox', checked: allSelected, onChange: selectAll, 'aria-label': '全选' }),
        h('span', null, '全选'),
      ]),
      h('span', { className: 'archv-tbLabel' }, '已选 ' + selected.current.size + ' 项'),
      h('div', { className: 'archv-tbActions' }, [
        h('button', { key: 'br', type: 'button', className: 'archv-btn archv-restore', disabled: busy !== null || selected.current.size === 0, onClick: function () { runBatch('restore'); } }, '恢复所选'),
        h('button', { key: 'bd', type: 'button', className: 'archv-btn archv-del', disabled: busy !== null || selected.current.size === 0, onClick: function () { runBatch('delete'); } },
          confirmId === '__many__' ? '确认删除所选?' : '删除所选'),
      ]),
    ]) : null,
    h('p', { className: 'archv-sub' }, '被归档（从侧栏隐藏）的会话都在这里。恢复会把会话放回原分组；批量删除会彻底移除所选会话的日志文件，不可恢复。'),
    error ? h('div', { className: 'archv-err', role: 'alert' }, [
      h('span', null, error),
      h('button', { type: 'button', className: 'archv-errretry', onClick: refresh }, '重试'),
    ]) : null,
    rows,
    toast ? h('div', { className: 'archv-status', role: 'status' }, toast) : null,
  ]);
}

exports.apply = function apply(ctx) {
  ctx.slots.inject('settings.section', function () {
    return ctx.slots.register(
      { name: 'settings.section', id: 'archived-sessions', order: 90, label: '归档会话' },
      function (props) { return h(ArchivedPanel, props); }
    );
  });
};

return module.exports; } });
