window.__ModuleLoader__.load({ id: 'dsh-archived-sessions', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
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
function ArchivedPanel() {
  const [items, setItems] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(null);
  const [confirmId, setConfirmId] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [toast, setToast] = (0, import_react.useState)(null);
  const timer = (0, import_react.useRef)(null);
  const showToast = (msg) => {
    if (timer.current) clearTimeout(timer.current);
    setToast(msg);
    timer.current = setTimeout(() => setToast(null), 2400);
  };
  const refresh = () => {
    setError(null);
    postJSON("/archived-sessions/list", {}).then((r) => setItems(r.items || [])).catch((e) => setError(String(e && e.message || e)));
  };
  (0, import_react.useEffect)(() => {
    refresh();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const act = (action, it) => {
    if (busy) return;
    if (action === "delete") {
      if (confirmId !== it.sessionId) {
        setConfirmId(it.sessionId);
        return;
      }
      setConfirmId(null);
    } else {
      setConfirmId(null);
      setError(null);
    }
    setBusy(it.sessionId);
    postJSON("/archived-sessions/" + action, { sessionId: it.sessionId }).then(() => {
      setBusy(null);
      showToast(action === "restore" ? `\u5DF2\u6062\u590D\u300C${it.title || it.sessionId}\u300D` : `\u5DF2\u5220\u9664 ${it.title || it.sessionId}`);
      refresh();
    }).catch((e) => {
      setBusy(null);
      setConfirmId(null);
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
    return null;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv", role: "region", "aria-label": "\u5F52\u6863\u4F1A\u8BDD", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "archv-title", children: "\u5F52\u6863\u4F1A\u8BDD" }),
      items !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-count", "aria-label": `${items.length} \u4E2A\u5F52\u6863\u4F1A\u8BDD`, children: items.length })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "archv-sub", children: "\u88AB\u5F52\u6863\uFF08\u4ECE\u4FA7\u680F\u9690\u85CF\uFF09\u7684\u4F1A\u8BDD\u90FD\u5728\u8FD9\u91CC\u3002\u6062\u590D\u4F1A\u628A\u4F1A\u8BDD\u653E\u56DE\u539F\u5206\u7EC4\uFF1B\u5220\u9664\u4F1A\u5F7B\u5E95\u79FB\u9664\u65E5\u5FD7\u6587\u4EF6\uFF0C\u4E0D\u53EF\u6062\u590D\u3002" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-err", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-errretry", onClick: refresh, children: "\u91CD\u8BD5" })
    ] }),
    items === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-skel", "aria-label": "\u52A0\u8F7D\u4E2D", children: [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-skel-card" }, i)) }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-empty", children: "\u76EE\u524D\u6CA1\u6709\u5F52\u6863\u4F1A\u8BDD\u3002\u5728\u4FA7\u680F\u4EFB\u4E00\u4F1A\u8BDD\u7684\u83DC\u5355\u91CC\u9009\u62E9\u300C\u5F52\u6863\u300D\u5373\u53EF\u6536\u7EB3\u8FDB\u6765\u3002" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-list", role: "list", children: items.map((it) => {
      const isConfirm = confirmId === it.sessionId;
      const date = fmtDate(it.createdAt);
      const wtag = workspaceTag(it);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-card", role: "listitem", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-name", title: it.title || "", children: it.title || "(\u65E0\u6807\u9898)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-meta", children: [
            date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-date", children: date }),
            date && wtag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-dot", children: "\xB7" }),
            wtag,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-id", children: it.sessionId })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "archv-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "archv-btn archv-restore", disabled: busy !== null, "aria-label": "\u6062\u590D " + (it.title || it.sessionId), onClick: () => act("restore", it), children: [
            busy === it.sessionId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "archv-spin", "aria-hidden": "true" }),
            "\u6062\u590D"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "archv-btn archv-del", disabled: busy !== null, "aria-label": (isConfirm ? "\u786E\u8BA4\u5220\u9664 " : "\u5220\u9664 ") + (it.title || it.sessionId), onClick: () => act("delete", it), children: isConfirm ? "\u786E\u8BA4\u5220\u9664?" : "\u5220\u9664" })
        ] })
      ] }, it.sessionId);
    }) }),
    toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "archv-status", role: "status", children: toast })
  ] });
}
var MOVE_CSS = `
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
`;
function MovePanel() {
  const [sessions, setSessions] = (0, import_react.useState)(null);
  const [workspaces, setWorkspaces] = (0, import_react.useState)([]);
  const [busy, setBusy] = (0, import_react.useState)(null);
  const [open, setOpen] = (0, import_react.useState)(null);
  const [mode, setMode] = (0, import_react.useState)("existing");
  const [targetWs, setTargetWs] = (0, import_react.useState)("");
  const [newPath, setNewPath] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(null);
  const [toast, setToast] = (0, import_react.useState)(null);
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
  const doMove = (it) => {
    const targetPath = mode === "new" ? newPath.trim() : wsPath(targetWs);
    if (!targetPath) {
      setError("\u8BF7\u9009\u62E9\u5DF2\u6709\u5DE5\u4F5C\u533A\u6216\u8F93\u5165\u65B0\u7684\u76EE\u6807\u76EE\u5F55\u8DEF\u5F84");
      return;
    }
    setBusy(it.sessionId);
    setError(null);
    postJSON("/archived-sessions/move", { sessionId: it.sessionId, targetPath }).then((r) => {
      setBusy(null);
      setOpen(null);
      setMode("existing");
      setNewPath("");
      showToast(`\u5DF2\u628A\u300C${it.title || it.sessionId}\u300D\u79FB\u5230 ${r.workspaceTitle || targetPath}`);
      refresh();
    }).catch((e) => {
      setBusy(null);
      setError(String(e && e.message || e));
    });
  };
  const wtag = (it) => {
    if (it.workspacePath) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-wtag", title: it.workspacePath, children: it.workspaceTitle || pathName(it.workspacePath) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-wtag", children: "\u672A\u5206\u7EC4" });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv", role: "region", "aria-label": "\u79FB\u52A8\u4F1A\u8BDD", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: MOVE_CSS }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "mv-title", children: "\u79FB\u52A8\u4F1A\u8BDD\u5230\u5DE5\u4F5C\u533A" }),
      sessions !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-count", "aria-label": `${sessions.length} \u4E2A\u4F1A\u8BDD`, children: sessions.length })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mv-sub", children: "\u628A\u4EFB\u610F\u4F1A\u8BDD\u79FB\u52A8\u5230\u67D0\u4E2A\u5DE5\u4F5C\u533A\u76EE\u5F55\uFF08\u53EF\u9009\u7528\u73B0\u6709\u5DE5\u4F5C\u533A\u6216\u8F93\u5165\u65B0\u76EE\u5F55\uFF0C\u81EA\u52A8\u521B\u5EFA\uFF09\u3002\u79FB\u52A8\u4F1A\u6539\u5199\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u5E76\u628A\u65E5\u5FD7\u8FC1\u79FB\u8FC7\u53BB\uFF1B \u4F1A\u8BDD\u5F53\u524D\u5904\u4E8E\u6253\u5F00\u72B6\u6001\u65F6\u9700\u5148\u5728\u4FA7\u680F\u5207\u8D70\u624D\u80FD\u79FB\u52A8\u3002" }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-err", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "mv-errretry", onClick: refresh, children: "\u91CD\u8BD5" })
    ] }),
    sessions === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-skel", "aria-label": "\u52A0\u8F7D\u4E2D", children: [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-skel-card" }, i)) }) : sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-empty", children: "\u6682\u65E0\u53EF\u79FB\u52A8\u7684\u4F1A\u8BDD\u3002" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-list", role: "list", children: sessions.map((it) => {
      const date = fmtDate(it.createdAt);
      const expanded = open === it.sessionId;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-card", role: "listitem", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-name", title: it.title || "", children: it.title || "(\u65E0\u6807\u9898)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-meta", children: [
            it.archived && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-wtag mv-archived", children: "\u5DF2\u5F52\u6863" }),
            wtag(it),
            date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-dot", children: "\xB7" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-date", children: date })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-id", children: it.sessionId })
          ] }),
          expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-sheet", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "mv-sheet-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "mv-target", checked: mode === "existing", onChange: () => setMode("existing") }),
              "\u5DF2\u6709\u5DE5\u4F5C\u533A"
            ] }),
            mode === "existing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-sheet-row", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: targetWs, onChange: (e) => setTargetWs(e.target.value), "aria-label": "\u76EE\u6807\u5DE5\u4F5C\u533A", children: [
              workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "\uFF08\u6682\u65E0\u5DE5\u4F5C\u533A\uFF09" }),
              workspaces.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: w.workspaceId, children: [
                w.title,
                " \xB7 ",
                w.path
              ] }, w.workspaceId))
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "mv-sheet-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "mv-target", checked: mode === "new", onChange: () => setMode("new") }),
              "\u65B0\u5EFA\u5DE5\u4F5C\u533A\u76EE\u5F55"
            ] }),
            mode === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-sheet-row", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "text",
                value: newPath,
                onChange: (e) => setNewPath(e.target.value),
                placeholder: "\u4F8B\u5982 /Users/you/Projects/demo \u6216 ~/demo",
                "aria-label": "\u65B0\u5DE5\u4F5C\u533A\u76EE\u5F55\u8DEF\u5F84"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mv-sheet-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "mv-btn mv-go", disabled: busy !== null, onClick: () => doMove(it), children: [
                busy === it.sessionId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mv-spin", "aria-hidden": "true" }),
                "\u786E\u8BA4\u79FB\u52A8"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "mv-btn", disabled: busy !== null, onClick: () => {
                setOpen(null);
                setMode("existing");
                setNewPath("");
              }, children: "\u53D6\u6D88" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "mv-btn mv-go",
            disabled: busy !== null,
            "aria-label": "\u79FB\u52A8 " + (it.title || it.sessionId),
            onClick: () => {
              if (expanded) {
                setOpen(null);
              } else {
                setTargetWs(workspaces.length ? targetWs || workspaces[0].workspaceId : "");
                setMode("existing");
                setNewPath("");
                setOpen(it.sessionId);
              }
            },
            children: expanded ? "\u6536\u8D77" : "\u79FB\u52A8\u5230\u2026"
          }
        ) })
      ] }, it.sessionId);
    }) }),
    toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mv-status", role: "status", children: toast })
  ] });
}
var NAV_CSS = `
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
`;
function markSettingsNav() {
  const ARCHIVED_LABEL = "\u5F52\u6863\u4F1A\u8BDD";
  const MOVE_LABEL = "\u79FB\u52A8\u4F1A\u8BDD";
  let disposed = false;
  const sync = () => {
    if (disposed) return;
    const buttons = document.querySelectorAll('[role="dialog"] nav button');
    for (const b of buttons) {
      const t = (b.textContent || "").trim();
      if (t === ARCHIVED_LABEL) b.setAttribute("data-dsh-nav-archived", "");
      else b.removeAttribute("data-dsh-nav-archived");
      if (t === MOVE_LABEL) b.setAttribute("data-dsh-nav-move", "");
      else b.removeAttribute("data-dsh-nav-move");
    }
  };
  sync();
  const obs = new MutationObserver(sync);
  obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  return () => {
    disposed = true;
    obs.disconnect();
    document.querySelectorAll("[data-dsh-nav-archived]").forEach((e) => e.removeAttribute("data-dsh-nav-archived"));
    document.querySelectorAll("[data-dsh-nav-move]").forEach((e) => e.removeAttribute("data-dsh-nav-move"));
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
function apply(ctx) {
  installSettingsNavIcons(ctx);
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register(
      { name: "settings.section", id: "archived-sessions", order: 90, label: "\u5F52\u6863\u4F1A\u8BDD" },
      (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivedPanel, { ...props })
    )
  );
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register(
      { name: "settings.section", id: "move-sessions", order: 91, label: "\u79FB\u52A8\u4F1A\u8BDD" },
      (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovePanel, { ...props })
    )
  );
}
return module.exports; } });
//# sourceMappingURL=client.js.map
