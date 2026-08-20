# dsh-archived-sessions

> English | [中文](./README.md)

> Manage your **archived sessions** in DSH — view, restore, and permanently delete them.
> Archive logo, session dates, workspace tags, and **batch multi-select** (restore / delete selected).

A persistent DSH plugin (host + browser halves). Manage every session that has been archived (hidden from the sidebar) under **Settings → 归档会话 (Archived Sessions)**.

## Features

- **View**: list all archived sessions — each row shows the title (falls back to the first user message), the **session date** (`createdAt`, localized), and a **workspace tag** (title or directory name; a dashed "原工作区已删除 / workspace deleted" tag when the original workspace is gone).
- **Restore**: unarchive and put the session back into its group.
- **Permanently delete**: physically removes the session log file + detaches workspace accounting — **irreversible** (asks for confirmation first).
- **Batch multi-select**: one-click batch mode — select-all, restore selected, delete selected (single confirmation for batch delete).
- **Adaptive UI**: follows the theme tokens (light/dark), stacks vertically on narrow screens; loading / empty / error / busy states, keyboard focus and `prefers-reduced-motion` support.

## Install

```sh
# Option 1: install as a Git dependency (recommended — no local clone; restart DSH to apply)
dsh plugin --profile desktop add "github:TOBYCAI/dsh-archived-sessions"

# For the web UI (if you also use dsh web):
dsh plugin --profile web add "github:TOBYCAI/dsh-archived-sessions"

# Option 2: local link (for development)
git clone https://github.com/TOBYCAI/dsh-archived-sessions.git
dsh plugin --profile desktop add link:/path/to/dsh-archived-sessions
```

> After installing, **restart DSH** (or refresh the page to reload the bundle). Then Settings → Archived Sessions becomes available.

## Uninstall

```sh
dsh plugin --profile desktop remove dsh-archived-sessions
dsh plugin --profile web remove dsh-archived-sessions
```

## Structure

```
package.json       npm metadata + dsh.bundle.patch + dsh.client (browser-half registration)
cordis.patch.yml   inserts this plugin's row into the profile bundle
src/index.js       host source (/archived-sessions/* JSON routes)
src/client/index.jsx  client source (React, settings.section)
build.mjs          esbuild build script (regenerates lib/)
lib/index.js       pre-built host (ESM)
lib/client.js      pre-built client (ModuleLoader CJS handshake)
```

`lib/` is pre-built, so cloning and using it needs no esbuild. To modify the source, run `npm i -D esbuild && npm run build` to regenerate `lib/`.

## Host routes

| Method | Path | Description |
|---|---|---|
| POST | `/archived-sessions/list` | List archived sessions (skips deleted / non-existent ones) |
| POST | `/archived-sessions/restore` | Unarchive a single session |
| POST | `/archived-sessions/restore-many` | Unarchive many |
| POST | `/archived-sessions/delete` | Permanently delete a single session (physically removes log, keeps hidden) |
| POST | `/archived-sessions/delete-many` | Permanently delete many |

> On delete the session **stays archived** (is not unarchived), so it won't pop back into the sidebar / "ungrouped"; entries whose log is already gone are skipped.
> DSH has no official session-delete API; this plugin implements "physically remove log + detach ownership + keep hidden".

## Compatibility

- Works in both DSH Desktop and DSH web (same host + client halves).
- Peer dependencies are listed in `package.json`; `react` and `@deepseek-ai/*` are provided by the DSH runtime.

## License

[MIT](./LICENSE) © TOBYCAI
