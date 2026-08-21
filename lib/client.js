window.__ModuleLoader__.load({ id: 'dsh-sessions-manager', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
var inject = ["slots"];
var CSS = `
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
.archv-actions{display:flex;gap:8px;flex:none;flex-wrap:nowrap;justify-content:flex-end}
.archv-btn{appearance:none;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-fill-subtle);color:var(--dsw-alias-label-secondary);border-radius:9px;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s ease,border-color .15s ease,color .15s ease}
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
.dtl-sheet{margin-top:12px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-left:3px solid #4c8dff;border-radius:10px;background:var(--dsw-alias-fill-subtle)}
.dtl-sheet-head{display:flex;align-items:center;justify-content:space-between;gap:10px}
.dtl-sheet-title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.dtl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-top:10px}
.dtl-cell{display:flex;flex-direction:column;gap:2px;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-fill-elevated);min-width:0}
.dtl-k{font-size:11px;color:var(--dsw-alias-label-tertiary)}
.dtl-v{font-size:12px;color:var(--dsw-alias-label-primary);word-break:break-all}
.dtl-sec{margin-top:12px}
.dtl-sec-t{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);text-transform:uppercase;letter-spacing:.03em;margin-bottom:6px}
.dtl-tags{display:flex;flex-wrap:wrap;gap:6px}
.dtl-tag{display:inline-flex;font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-fill-elevated);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:2px 8px}
.dtl-list{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.dtl-list code,.dtl-paths code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;color:var(--dsw-alias-label-primary);word-break:break-all}
.dtl-filetool{color:var(--dsw-alias-label-tertiary)}
.dtl-paths{display:flex;flex-direction:column;gap:4px;font-size:11.5px;color:var(--dsw-alias-label-secondary);word-break:break-all}
`;
function fmtDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  try {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
  } catch {
    return String(iso);
  }
}
function pathName(p) {
  if (!p) return null;
  const parts = String(p).replace(/\\+$/, "").split(/[/\\]/);
  return parts[parts.length - 1] || p;
}
async function postJSON(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body || {})
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data) throw new Error(data && (data.error || data.message) || `request failed (${res.status})`);
  return data;
}
var NAV_CSS = `
[data-dsh-nav-sessions] > svg:first-child { display: none; }
[data-dsh-nav-sessions]::before {
  content: ''; flex: none; width: 16px; height: 16px; background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20width%3D'24'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M21%208v13H3V8'/%3E%3Cpath%20d%3D'M1%203h22v5H1z'/%3E%3Cpath%20d%3D'M10%2012h4'/%3E%3C/svg%3E") center / contain no-repeat;
}
`;
function markSettingsNav() {
  const LABEL = "\u4F1A\u8BDD\u7BA1\u7406";
  let disposed = false;
  const sync = () => {
    if (disposed) return;
    const buttons = document.querySelectorAll('[role="dialog"] nav button');
    for (const b of buttons) {
      const t = (b.textContent || "").trim();
      if (t === LABEL) b.setAttribute("data-dsh-nav-sessions", "");
      else b.removeAttribute("data-dsh-nav-sessions");
    }
  };
  sync();
  const obs = new MutationObserver(sync);
  obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  return () => {
    disposed = true;
    obs.disconnect();
    document.querySelectorAll("[data-dsh-nav-sessions]").forEach((e) => e.removeAttribute("data-dsh-nav-sessions"));
  };
}
function installSettingsNavIcons(ctx) {
  const styleEl = document.createElement("style");
  styleEl.textContent = NAV_CSS;
  document.head.appendChild(styleEl);
  const dispose = markSettingsNav();
  ctx.effect(() => () => {
    dispose();
    if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
  });
}
function SessionPanel({ workspacesSvc }) {
  const [sessions, setSessions] = (0, import_react.useState)(null);
  const [workspaces, setWorkspaces] = (0, import_react.useState)([]);
  const [filter, setFilter] = (0, import_react.useState)("all");
  const [selected, setSelected] = (0, import_react.useState)({});
  const [confirmDel, setConfirmDel] = (0, import_react.useState)(null);
  const [confirmBatch, setConfirmBatch] = (0, import_react.useState)(false);
  const [busy, setBusy] = (0, import_react.useState)(null);
  const [openMove, setOpenMove] = (0, import_react.useState)(null);
  const [moveMode, setMoveMode] = (0, import_react.useState)("existing");
  const [targetWs, setTargetWs] = (0, import_react.useState)("");
  const [newPath, setNewPath] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(null);
  const [toast, setToast] = (0, import_react.useState)(null);
  const [picking, setPicking] = (0, import_react.useState)(false);
  const [details, setDetails] = (0, import_react.useState)({});
  const [openDetails, setOpenDetails] = (0, import_react.useState)(null);
  const [detailsLoading, setDetailsLoading] = (0, import_react.useState)(null);
  const timer = (0, import_react.useRef)(null);
  const showToast = (msg) => {
    if (timer.current) clearTimeout(timer.current);
    setToast(msg);
    timer.current = setTimeout(() => setToast(null), 2400);
  };
  const refresh = () => {
    setError(null);
    Promise.all([
      postJSON("/archived-sessions/sessions", {}),
      postJSON("/archived-sessions/workspaces", {})
    ]).then(([s, works]) => {
      setSessions(s.items || []);
      setWorkspaces(works.items || []);
      setSelected({});
      setConfirmDel(null);
      setConfirmBatch(false);
      if (!targetWs && works.items && works.items.length) setTargetWs(works.items[0].workspaceId);
    }).catch((e) => setError(String(e && e.message || e)));
  };
  (0, import_react.useEffect)(() => {
    refresh();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const wsPath = (id) => {
    const w = workspaces.find((x) => x.workspaceId === id);
    return w ? w.path : "";
  };
  const archivedList = sessions ? sessions.filter((x) => x.archived) : [];
  const activeList = sessions ? sessions.filter((x) => !x.archived) : [];
  const list = filter === "archived" ? archivedList : sessions || [];
  const selIds = Object.keys(selected).filter((k) => selected[k]);
  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const clearSel = () => setSelected({});
  const selectAll = () => {
    const o = {};
    list.forEach((x) => {
      o[x.sessionId] = true;
    });
    setSelected(o);
  };
  const act = (action, it) => {
    if (busy) return;
    if (action === "delete") {
      if (confirmDel !== it.sessionId) {
        setConfirmDel(it.sessionId);
        return;
      }
      setConfirmDel(null);
    }
    setBusy(it.sessionId);
    postJSON("/archived-sessions/" + action, { sessionId: it.sessionId }).then(() => {
      setBusy(null);
      const n = it.title || it.sessionId;
      showToast(action === "archive" ? `\u5DF2\u5F52\u6863\u300C${n}\u300D` : action === "restore" ? `\u5DF2\u6062\u590D\u300C${n}\u300D` : `\u5DF2\u5220\u9664 ${n}`);
      refresh();
    }).catch((e) => {
      setBusy(null);
      setConfirmDel(null);
      setError(String(e && e.message || e));
    });
  };
  const doMove = (it) => {
    const targetPath = moveMode === "new" ? newPath.trim() : wsPath(targetWs);
    if (!targetPath) {
      setError("\u8BF7\u9009\u62E9\u5DF2\u6709\u5DE5\u4F5C\u533A\u6216\u8F93\u5165\u65B0\u7684\u76EE\u6807\u76EE\u5F55\u8DEF\u5F84");
      return;
    }
    setBusy(it.sessionId);
    setError(null);
    postJSON("/archived-sessions/move", { sessionId: it.sessionId, targetPath }).then((r) => {
      setBusy(null);
      setOpenMove(null);
      setMoveMode("existing");
      setNewPath("");
      showToast(`\u5DF2\u628A\u300C${it.title || it.sessionId}\u300D\u79FB\u5230 ${r.workspaceTitle || targetPath}`);
      refresh();
    }).catch((e) => {
      setBusy(null);
      setError(String(e && e.message || e));
    });
  };
  const doBatch = (action) => {
    if (!selIds.length || busy) return;
    if (action === "delete-many") {
      if (!confirmBatch) {
        setConfirmBatch(true);
        return;
      }
      setConfirmBatch(false);
    }
    setBusy("__batch__");
    postJSON("/archived-sessions/" + action, { sessionIds: selIds }).then((r) => {
      setBusy(null);
      const n = r && (r.archived || r.restored || r.deleted) || selIds.length;
      showToast(`\u5DF2\u5904\u7406 ${n} \u4E2A\u4F1A\u8BDD`);
      refresh();
    }).catch((e) => {
      setBusy(null);
      setConfirmBatch(false);
      setError(String(e && e.message || e));
    });
  };
  const openMoveFor = (it) => {
    if (openMove === it.sessionId) {
      setOpenMove(null);
      return;
    }
    setTargetWs(workspaces.length ? targetWs || workspaces[0].workspaceId : "");
    setMoveMode("existing");
    setNewPath("");
    setOpenMove(it.sessionId);
  };
  const pickDirectory = async () => {
    if (!workspacesSvc || picking) return;
    setPicking(true);
    try {
      const p = await workspacesSvc.pickDirectory();
      if (p) {
        setNewPath(p);
        setMoveMode("new");
      }
    } catch (e) {
      setError(String(e && e.message || e));
    } finally {
      setPicking(false);
    }
  };
  const toggleDetails = (it) => {
    if (openDetails === it.sessionId) {
      setOpenDetails(null);
      return;
    }
    if (details[it.sessionId]) {
      setOpenDetails(it.sessionId);
      return;
    }
    setDetailsLoading(it.sessionId);
    postJSON("/archived-sessions/details", { sessionId: it.sessionId }).then((d) => {
      setDetails((m) => ({ ...m, [it.sessionId]: d }));
      setDetailsLoading(null);
      setOpenDetails(it.sessionId);
    }).catch((e) => {
      setDetailsLoading(null);
      setError(String(e && e.message || e));
    });
  };
  const workspaceTag = (it) => {
    if (it.hasWorkspace && it.workspaceGone) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "archv-wtag archv-wgone", title: (it.workspacePath || "") + "\uFF08\u539F\u5DE5\u4F5C\u533A\u5DF2\u5220\u9664\uFF09", children: [
        "\u5DE5\u4F5C\u533A\u5DF2\u5220 \xB7 ",
        pathName(it.workspacePath) || "?"
      ] });
    }
    const wName = it.workspaceTitle || pathName(it.workspacePath);
    if (wName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-wtag", title: it.workspacePath || "", children: wName });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-wtag", children: "\u672A\u5206\u7EC4" });
  };
  const rowActions = (it) => {
    if (it.archived) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-actions", role: "group", "aria-label": "\u4F1A\u8BDD\u64CD\u4F5C", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-go", disabled: busy !== null, onClick: () => act("restore", it), children: "\u6062\u590D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-go", disabled: busy !== null, onClick: () => openMoveFor(it), children: openMove === it.sessionId ? "\u6536\u8D77" : "\u79FB\u52A8\u2026" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: busy !== null, onClick: () => toggleDetails(it), children: openDetails === it.sessionId ? "\u6536\u8D77\u8BE6\u60C5" : "\u8BE6\u60C5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-del", disabled: busy !== null, onClick: () => act("delete", it), children: confirmDel === it.sessionId ? "\u786E\u8BA4\u5220\u9664?" : "\u5220\u9664" })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-actions", role: "group", "aria-label": "\u4F1A\u8BDD\u64CD\u4F5C", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: busy !== null, onClick: () => act("archive", it), children: "\u5F52\u6863" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-go", disabled: busy !== null, onClick: () => openMoveFor(it), children: openMove === it.sessionId ? "\u6536\u8D77" : "\u79FB\u52A8\u2026" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: busy !== null, onClick: () => toggleDetails(it), children: openDetails === it.sessionId ? "\u6536\u8D77\u8BE6\u60C5" : "\u8BE6\u60C5" })
    ] });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv", role: "region", "aria-label": "\u4F1A\u8BDD\u7BA1\u7406", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "archv-title", children: "\u4F1A\u8BDD\u7BA1\u7406" }),
      sessions !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-count", "aria-label": `${sessions.length} \u4E2A\u4F1A\u8BDD`, children: sessions.length })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "archv-sub", children: "\u7EDF\u4E00\u7BA1\u7406\u5168\u90E8\u4F1A\u8BDD\uFF1A\u5F52\u6863 / \u6062\u590D / \u5F7B\u5E95\u5220\u9664 / \u79FB\u52A8\u5230\u5176\u4ED6\u5DE5\u4F5C\u533A\uFF0C\u652F\u6301\u6279\u91CF\u3002\u5F52\u6863\u4F1A\u4ECE\u4FA7\u680F\u9690\u85CF\uFF1B\u5220\u9664\u4F1A\u5F7B\u5E95\u79FB\u9664\u65E5\u5FD7\uFF0C\u4E0D\u53EF\u6062\u590D\u3002" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-err", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-errretry", onClick: refresh, children: "\u91CD\u8BD5" })
    ] }),
    sessions === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-skel", "aria-label": "\u52A0\u8F7D\u4E2D", children: [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-skel-card" }, i)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sess-filter", role: "tablist", "aria-label": "\u4F1A\u8BDD\u7B5B\u9009", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "sess-fbtn" + (filter === "all" ? " sess-fbtn-on" : ""), onClick: () => {
          setFilter("all");
          clearSel();
          setConfirmBatch(false);
        }, children: [
          "\u5168\u90E8 (",
          sessions.length,
          ")"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "sess-fbtn" + (filter === "archived" ? " sess-fbtn-on" : ""), onClick: () => {
          setFilter("archived");
          clearSel();
          setConfirmBatch(false);
        }, children: [
          "\u5DF2\u5F52\u6863 (",
          archivedList.length,
          ")"
        ] })
      ] }),
      list.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sess-batch", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sess-btntext", children: selIds.length ? `\u5DF2\u9009 ${selIds.length} \u9879` : filter === "archived" ? `\u5171 ${archivedList.length} \u4E2A\u5F52\u6863\u4F1A\u8BDD` : `\u5171 ${sessions.length} \u4E2A\u4F1A\u8BDD\uFF08\u6D3B\u52A8 ${activeList.length} / \u5DF2\u5F52\u6863 ${archivedList.length}\uFF09` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: list.length === 0, onClick: selectAll, children: "\u5168\u9009" }),
        selIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          filter === "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: busy !== null, onClick: () => doBatch("restore-many"), children: "\u6062\u590D\u6240\u9009" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-del", disabled: busy !== null, onClick: () => doBatch("delete-many"), children: confirmBatch ? "\u786E\u8BA4\u5220\u9664\u6240\u9009?" : "\u5220\u9664\u6240\u9009" })
          ] }),
          filter === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", disabled: busy !== null, onClick: () => doBatch("archive-many"), children: "\u5F52\u6863\u6240\u9009" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", onClick: clearSel, children: "\u53D6\u6D88\u9009\u62E9" })
        ] })
      ] }),
      list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-empty", children: filter === "archived" ? "\u76EE\u524D\u6CA1\u6709\u5F52\u6863\u4F1A\u8BDD\u3002\u5728\u201C\u5168\u90E8\u201D\u91CC\u9009\u4E2D\u4F1A\u8BDD\u70B9\u201C\u5F52\u6863\u201D\u5373\u53EF\u6536\u7EB3\u8FDB\u6765\u3002" : "\u6682\u65E0\u53EF\u7BA1\u7406\u7684\u4F1A\u8BDD\u3002" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-list", role: "list", children: list.map((it) => {
        const date = fmtDate(it.createdAt);
        const expanded = openMove === it.sessionId;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-card" + (expanded ? " archv-card-exp" : ""), role: "listitem", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                className: "archv-check",
                checked: !!selected[it.sessionId],
                onChange: () => toggle(it.sessionId),
                "aria-label": "\u9009\u62E9 " + (it.title || it.sessionId)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-body", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-main", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-name", title: it.title || "", children: it.title || "(\u65E0\u6807\u9898)" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-meta", children: [
                  it.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-wtag archv-wgone", children: "\u5DF2\u5F52\u6863" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-wtag archv-active", children: "\u6D3B\u52A8" }),
                  workspaceTag(it),
                  date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-dot", children: "\xB7" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-date", children: date })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-id", children: it.sessionId })
                ] })
              ] }),
              rowActions(it)
            ] })
          ] }),
          expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-sheet", role: "region", "aria-label": "\u79FB\u52A8\u5230\u5DE5\u4F5C\u533A", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-sheet-head", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mv-sheet-title", children: "\u79FB\u52A8\u5230\u5DE5\u4F5C\u533A" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "mv-sheet-close", "aria-label": "\u5173\u95ED", onClick: () => setOpenMove(null), children: "\xD7" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-seg", role: "tablist", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "tab", "aria-selected": moveMode === "existing", className: "mv-segbtn" + (moveMode === "existing" ? " mv-segbtn-on" : ""), onClick: () => setMoveMode("existing"), children: "\u5DF2\u6709\u5DE5\u4F5C\u533A" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "tab", "aria-selected": moveMode === "new", className: "mv-segbtn" + (moveMode === "new" ? " mv-segbtn-on" : ""), onClick: () => setMoveMode("new"), children: "\u65B0\u5EFA\u76EE\u5F55" })
            ] }),
            moveMode === "existing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mv-field-label", htmlFor: "mv-target-ws", children: "\u76EE\u6807\u5DE5\u4F5C\u533A" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { id: "mv-target-ws", value: targetWs, onChange: (e) => setTargetWs(e.target.value), children: [
                workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "\uFF08\u6682\u65E0\u5DE5\u4F5C\u533A\uFF09" }),
                workspaces.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: w.workspaceId, children: [
                  w.title,
                  " \xB7 ",
                  w.path
                ] }, w.workspaceId))
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mv-field-label", htmlFor: "mv-new-path", children: "\u65B0\u5DE5\u4F5C\u533A\u76EE\u5F55\u8DEF\u5F84" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-browse-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    id: "mv-new-path",
                    type: "text",
                    value: newPath,
                    onChange: (e) => setNewPath(e.target.value),
                    placeholder: "\u4F8B\u5982 /Users/you/Projects/demo \u6216 ~/demo"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "archv-btn",
                    onClick: pickDirectory,
                    disabled: busy !== null || picking || !workspacesSvc,
                    title: !workspacesSvc ? "\u5F53\u524D\u8FD0\u884C\u73AF\u5883\u4E0D\u652F\u6301\u7CFB\u7EDF\u76EE\u5F55\u9009\u62E9" : "\u6253\u5F00\u7CFB\u7EDF\u76EE\u5F55\u9009\u62E9\u7A97\u53E3",
                    children: picking ? "\u9009\u62E9\u4E2D\u2026" : "\u6D4F\u89C8\u2026"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-foot", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn", onClick: () => setOpenMove(null), children: "\u53D6\u6D88" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "archv-btn archv-go", disabled: busy !== null, onClick: () => doMove(it), children: [
                busy === it.sessionId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-spin", "aria-hidden": "true" }),
                "\u786E\u8BA4\u79FB\u52A8"
              ] })
            ] })
          ] })
        ] }, it.sessionId);
      }) })
    ] }),
    toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-status", role: "status", children: toast })
  ] });
}
function apply(ctx) {
  installSettingsNavIcons(ctx);
  const workspacesSvc = ctx.get("workspaces");
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register(
      { name: "settings.section", id: "session-manager", order: 90, label: "\u4F1A\u8BDD\u7BA1\u7406" },
      (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionPanel, { ...props, workspacesSvc })
    )
  );
}
return module.exports; } });
//# sourceMappingURL=client.js.map
