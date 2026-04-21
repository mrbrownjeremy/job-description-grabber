# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Tampermonkey/Greasemonkey userscript that injects a floating action panel into job listing websites. It extracts job data from the page and lets the user copy it to clipboard, save as TXT, or POST it directly to a Coda database via API.

## Deployment

There is no build step. Files are installed directly into Tampermonkey via the browser extension. To update the script, edit the `.js` file and paste it into Tampermonkey (or use the file:// URL method if your browser supports it). Version is tracked only in the `@version` header — the filename does not change.

After every change: bump `@version`, commit to `main`, and push to GitHub. If the session started in a git worktree (a side branch), merge it back to `main` before pushing — changes must land on `main` so the user can access the updated file directly.

## Architecture

The entire script is a single IIFE in one `.js` file following the userscript pattern. There are no modules, imports, or dependencies beyond the GM_* APIs provided by the userscript manager.

**Key sections (in order):**

- **Userscript header** — `@match`/`@include` directives control which sites activate the script; `@grant` declares GM API permissions; `@connect coda.io` allows cross-origin XHR
- **Constants** — `CODA_TOKEN`, `CODA_DOC_ID`, `CODA_TABLE_ID`, `CODA_API`, `COL` (column IDs), `CHANNEL_MAP`, dropdown option arrays
- **Styles** — all CSS injected via `GM_addStyle()`; uses class prefix `jdg-` throughout
- **State helpers** — thin wrappers around `GM_getValue`/`GM_setValue` for panel position, shortcut, Coda token, and industry list
- **Extraction** — `extractJobData()` is the core function; it tries ld+json structured data first, then falls back to DOM selectors, labeled field scraping (`extractLabeledFields()`), and regex on body text. Site-specific overrides (e.g. Gusto) are inline.
- **Inference helpers** — `inferRemotePolicy()`, `inferIndustries()`, `inferCompType()`, `extractShiftHours()` analyze extracted text using regex signal lists
- **UI** — `buildPanel()` creates the floating pill buttons; `doShowCodaModal()` builds the submission form; `doShowSettings()` builds the settings panel. All UI is created imperatively with `document.createElement`.
- **Coda submission** — `sendToCoda()` POSTs via `GM_xmlhttpRequest` to the Coda rows API
- **Init + SPA support** — `MutationObserver` on `document.documentElement` re-injects the panel after client-side navigation (handles LinkedIn, etc.)

## Coda integration

- Doc ID: `UQg1BuWUWh`, Table ID: `grid-Y5qbxGOlS4`
- Column IDs are hardcoded in the `COL` object — if columns are added/removed in the Coda doc, update `COL` and the `sendToCoda()` cells array
- The API token defaults to a hardcoded fallback but is overridable per-user via Settings → Coda API Token (stored in `GM_getValue('codaToken')`)

## Adding support for a new job site

1. Add `@match *://*.newsite.com/*` to the userscript header
2. Add `'newsite.com': 'Channel Name'` to `CHANNEL_MAP`
3. If generic extraction fails, add a site-specific block in `extractJobData()` (see the Gusto block as a pattern)
4. Bump `@version` in the header

## GM API usage

| API | Purpose |
|-----|---------|
| `GM_setValue` / `GM_getValue` | Persistent user settings (token, position, shortcut, industries) |
| `GM_xmlhttpRequest` | Cross-origin POST to `coda.io` |
| `GM_addStyle` | Inject CSS |
| `GM_registerMenuCommand` | (granted but not currently used) |
