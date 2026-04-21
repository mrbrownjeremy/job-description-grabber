// ==UserScript==
// @name         Job Description Grabber
// @namespace    https://github.com/mrbrownjeremy
// @version      3.12.1
// @description  Grab job descriptions from job sites and send to clipboard, TXT, or Coda DB Job Applications
// @author       Jeremy Brown
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2YxNzMyNDt9LmNscy0ye2ZpbGw6IzQyNDZkMTt9LmNscy0ze2ZpbGw6I2IzZmZlMzt9LmNscy0zLC5jbHMtNHtzdHJva2U6I2IzZmZlMztzdHJva2Utd2lkdGg6MzBweDt9LmNscy00e2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9IjQzMy41MSAyMzAuOTUgNDMzLjUxIDQyNS44NSA3OC42IDQyNS44NSA3OC42IDcwLjkzIDMwNS42MSA3MC45MyA0MzMuNTEgMjMwLjk1Ii8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNNDI5Ljc1LDMwMC41N2MtMTcuNDQsMC0zMS41OCwxNC4xNC0zMS41OCwzMS41OHY2OS41NkgxMDYuNzRWMTEwLjI5aDE4MC45M2MxNy40NCwwLDMxLjU4LTE0LjE0LDMxLjU4LTMxLjU4cy0xNC4xNC0zMS41OC0zMS41OC0zMS41OEgxMDAuNjdjLTMxLjQ4LDAtNTcuMDksMjUuNjEtNTcuMDksNTcuMDl2MzAzLjU3YzAsMzEuNDgsMjUuNjEsNTcuMDksNTcuMDksNTcuMDloMzAzLjU3YzMxLjQ4LDAsNTcuMDktMjUuNjEsNTcuMDktNTcuMDl2LTc1LjY0YzAtMTcuNDQtMTQuMTQtMzEuNTgtMzEuNTgtMzEuNThaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNNDg3LjE5LDE3Ni4zMmwtMTA5LjE4LTgyLjVjLTEzLjUzLTEwLjIyLTMyLjkxLS41Ny0zMi45MSwxNi4zOHY0OS44aC04NS41MmMtNDQuMDgsMC03OS45NCwzNS44Ni03OS45NCw3OS45NHYxMDAuNzZjMCwxNy40NCwxNC4xNCwzMS41OCwzMS41OCwzMS41OHMzMS41OC0xNC4xNCwzMS41OC0zMS41OHYtMTAwLjc2YzAtOS4yNiw3LjUzLTE2Ljc5LDE2Ljc5LTE2Ljc5aDg1LjUydjUyLjA1YzAsMTYuOTUsMTkuMzksMjYuNiwzMi45MSwxNi4zOGwxMDkuMTgtODIuNWMxMC44Ny04LjIyLDEwLjg3LTI0LjU1LDAtMzIuNzZaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDI5Ljc1LDMwMC41N2MtMTcuNDQsMC0zMS41OCwxNC4xNC0zMS41OCwzMS41OHY2OS41NkgxMDYuNzRWMTEwLjI5aDE4MC45M2MxNy40NCwwLDMxLjU4LTE0LjE0LDMxLjU4LTMxLjU4cy0xNC4xNC0zMS41OC0zMS41OC0zMS41OEgxMDAuNjdjLTMxLjQ4LDAtNTcuMDksMjUuNjEtNTcuMDksNTcuMDl2MzAzLjU3YzAsMzEuNDgsMjUuNjEsNTcuMDksNTcuMDksNTcuMDloMzAzLjU3YzMxLjQ4LDAsNTcuMDktMjUuNjEsNTcuMDktNTcuMDl2LTc1LjY0YzAtMTcuNDQtMTQuMTQtMzEuNTgtMzEuNTgtMzEuNThaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDg3LjE5LDE3Ni4zMmwtMTA5LjE4LTgyLjVjLTEzLjUzLTEwLjIyLTMyLjkxLS41Ny0zMi45MSwxNi4zOHY0OS44aC04NS41MmMtNDQuMDgsMC03OS45NCwzNS44Ni03OS45NCw3OS45NHYxMDAuNzZjMCwxNy40NCwxNC4xNCwzMS41OCwzMS41OCwzMS41OHMzMS41OC0xNC4xNCwzMS41OC0zMS41OHYtMTAwLjc2YzAtOS4yNiw3LjUzLTE2Ljc5LDE2Ljc5LTE2Ljc5aDg1LjUydjUyLjA1YzAsMTYuOTUsMTkuMzksMjYuNiwzMi45MSwxNi4zOGwxMDkuMTgtODIuNWMxMC44Ny04LjIyLDEwLjg3LTI0LjU1LDAtMzIuNzZaIi8+PC9zdmc+
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @connect      coda.io
// @tm-id        0dd9fae7-4f77-4a03-9202-ed5eb107137c
// ==/UserScript==

// TODO
// - add compatibility with Google Sheets and Notion
// - add import/export for different lists

(function () {
  'use strict';

  // ─── Constants ───────────────────────────────────────────────────────────────
  const CODA_TOKEN = GM_getValue('codaToken', '86235ca7-568d-48d4-9ee9-2cf4787859b4');
  const CODA_DOC_ID = 'UQg1BuWUWh';
  const CODA_TABLE_ID = 'grid-Y5qbxGOlS4';
  const CODA_API = `https://coda.io/apis/v1/docs/${CODA_DOC_ID}/tables/${CODA_TABLE_ID}/rows`;

  const COL = {
    employer:          'c-BUMT4oE5Js',
    position:          'c-Gz_YiStzWr',
    contact:           'c-iFD3vbLJfq',
    phoneEmail:        'c-tNLjrNgCgp',
    location:          'c-NU04RYg343',
    url:               'c-8lfGFj3PXA',
    description:       'c-vjGbfsjN8S',
    jobRefNum:         'c-K0nRo9s82L',
    contactTitle:      'c-DvApQGMWuV',
    remotePolicy:      'c-gT1HyewidQ',
    ftPtCT:            'c-JDbYpA2X2A',
    salaryRange:       'c-6QMm4YwVv7',
    compType:          'c-_-wa35uvDV',
    industries:        'c-ArUEnZKoae',
    hrsWk:             'c-meup2LuBaL',
    channel:           'c-_HmGqngVnz',
    status:            'c-YEKP7-PrH_',
    interest:          'c-qi6YJ4B1xe',
    connectionStr:     'c-9Q7lbjLlik',
    shiftHours:        'c-_byXWDGtc5',
    responsibilities:  'c-A1t75QAb6Z',
    requirements:      'c-zVRbjcYT8V',
    benefits:          'c-mbBX99xWN8',
  };

  const DEFAULT_INDUSTRIES = [
    'Accounting','Arts & Culture','Creative & Design','Education','Finance',
    'Games','Government','Healthcare','Hospitality','Legal','Manufacturing',
    'Marketing','Media & Communications','Nonprofit','Other',
    'Real Estate','Retail','Technology'
  ];

  // Domains: matched against hostname (contains)
  const DEFAULT_DOMAINS = [
    'indeed.com','greenhouse.io','lever.co','workable.com','myworkdayjobs.com',
    'icims.com','smartrecruiters.com','jobvite.com','bamboohr.com','taleo.net',
    'adp.com','jazzhr.com','breezy.hr','ashbyhq.com','rippling.com',
    'recruitee.com','pinpointhq.com','paycom.com','paylocity.com',
    'oraclecloud.com','dayforcehcm.com','nyfa.org','pacareerlink.pa.gov',
    'gusto.com','comeet.com','eightfold.ai',
  ];

  // Patterns: matched against full URL (contains) — supports path-scoped entries
  const DEFAULT_PATTERNS = [
    'linkedin.com/jobs',
    'glassdoor.com/job',
    'careers.',
    'jobs.',
    'job.',
    'apply.',
    'hiring.',
    'hire.',
    'talent.',
    '/jobs/',
    '/job/',
    '/careers/',
    '/career/',
    '/positions/',
    '/openings/',
    '/postings/',
    '/requisitions/',
  ];

  const CHANNEL_MAP = {
    'linkedin.com':         'LinkedIn',
    'indeed.com':           'Indeed',
    'greenhouse.io':        'Company Website',
    'lever.co':             'Company Website',
    'workable.com':         'Company Website',
    'myworkdayjobs.com':    'Company Website',
    'icims.com':            'Company Website',
    'smartrecruiters.com':  'Company Website',
    'jobvite.com':          'Company Website',
    'bamboohr.com':         'Company Website',
    'taleo.net':            'Company Website',
    'adp.com':              'Company Website',
    'jazzhr.com':           'Company Website',
    'breezy.hr':            'Company Website',
    'ashbyhq.com':          'Company Website',
    'rippling.com':         'Company Website',
    'recruitee.com':        'Company Website',
    'pinpointhq.com':       'Company Website',
    'paycom.com':           'Company Website',
    'paylocity.com':        'Company Website',
    'comeet.com':           'Company Website',
    'oraclecloud.com':      'Company Website',
    'gusto.com':            'Company Website',
    'glassdoor.com':        'Glassdoor',
    'ziprecruiter.com':     'ZipRecruiter',
    'builtin.com':          'BuiltIn.com',
    'wellfound.com':        'Wellfound (AngelList Talent)',
    'angel.co':             'Wellfound (AngelList Talent)',
  };

  const REMOTE_OPTIONS    = ['Remote', 'Hybrid', 'On-Site'];
  const FTPT_OPTIONS      = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];
  const COMPTYPE_OPTIONS  = ['Base', 'Base+Bonus', 'OTE', 'Hourly', 'Flat Fee', 'Milestone', 'Retainer', 'Per Diem'];
  const STATUS_OPTIONS    = ['Applied', 'Screening', 'Interviewing', 'Offer Received', 'Rejected', 'Withdrawn', 'Ghosted', 'Archived'];
  const CONNSTR_OPTIONS   = ['None', 'Weak', 'Strong', 'Referred'];
  const POSITION_OPTIONS  = [
    { value: 'top-left',     label: '↖ Top Left'     },
    { value: 'top-right',    label: 'Top Right ↗'    },
    { value: 'bottom-left',  label: '↙ Bottom Left'  },
    { value: 'bottom-right', label: 'Bottom Right ↘' },
  ];

  // ─── Styles ──────────────────────────────────────────────────────────────────
  GM_addStyle(`
    #jdg-panel {
      position: fixed;
      z-index: 2147483647;
      display: flex;
      gap: 6px;
      transition: opacity 0.2s;
    }
    #jdg-panel.pos-top-right    { top: 16px; right: 16px; flex-direction: row; }
    #jdg-panel.pos-top-left     { top: 16px; left: 16px;  flex-direction: row; }
    #jdg-panel.pos-bottom-right { bottom: 16px; right: 16px; flex-direction: row; }
    #jdg-panel.pos-bottom-left  { bottom: 16px; left: 16px;  flex-direction: row; }

    .jdg-pill {
      background: #1a1a2e;
      color: #fff;
      border: 1px solid rgba(255,255,255,0.6);
      border-radius: 20px;
      padding: 5px 8px;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35), 0 0 6px rgba(255,255,255,0.15);
      transition: background 0.15s, transform 0.1s;
      line-height: 1;
      position: relative;
    }
    .jdg-pill:hover { background: #2d2d5e; transform: scale(1.08); }
    .jdg-pill:active { transform: scale(0.96); }
    .jdg-grab-indicator {
      font-size: 15px; line-height: 1;
      display: flex; align-items: center;
      opacity: 0.85; cursor: default;
      position: relative;
    }
    .jdg-grab-indicator .jdg-tooltip { display: none; }
    .jdg-grab-indicator:hover .jdg-tooltip { display: block; }
    .jdg-pill .jdg-tooltip {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: #111;
      color: #fff;
      font-size: 11px;
      white-space: nowrap;
      padding: 3px 8px;
      border-radius: 4px;
      pointer-events: none;
    }
    #jdg-panel.pos-bottom-right .jdg-tooltip,
    #jdg-panel.pos-bottom-left  .jdg-tooltip { bottom: auto; top: calc(100% + 6px); }
    #jdg-panel.pos-top-right .jdg-tooltip,
    #jdg-panel.pos-top-left  .jdg-tooltip { bottom: auto; top: calc(100% + 6px); }
    .jdg-pill:hover .jdg-tooltip { display: block; }

    /* ── Overlay & Modal ── */
    #jdg-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.55);
      z-index: 2147483646;
      display: flex; align-items: center; justify-content: center;
    }
    #jdg-modal {
      background: #fff;
      border-radius: 12px;
      width: min(680px, 94vw);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      color: #1a1a1a;
      position: relative;
      overflow: hidden;
    }
    #jdg-modal-body {
      overflow-y: auto;
      padding: 24px 28px 8px;
      flex: 1;
    }
    #jdg-modal h2 {
      margin: 0 0 18px;
      font-size: 16px;
      font-weight: 700;
      color: #1a1a2e;
    }
    .jdg-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 16px;
    }
    .jdg-field { display: flex; flex-direction: column; gap: 3px; }
    .jdg-field.full { grid-column: 1 / -1; }
    .jdg-field label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #666;
    }
    .jdg-field input,
    .jdg-field select,
    .jdg-field textarea {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 13px;
      font-family: inherit;
      color: #1a1a1a;
      background: #fafafa;
      outline: none;
      transition: border-color 0.15s;
    }
    .jdg-field input:focus,
    .jdg-field select:focus,
    .jdg-field textarea:focus { border-color: #4a4adf; background: #fff; }
    .jdg-field textarea { resize: vertical; min-height: 80px; }

    .jdg-interest-wrap { display: flex; align-items: center; gap: 8px; }
    .jdg-interest-wrap input[type=range] { flex: 1; accent-color: #4a4adf !important; appearance: auto !important; -webkit-appearance: auto !important; height: auto !important; width: auto !important; }
    .jdg-interest-val {
      width: 22px; text-align: center;
      font-weight: 700; color: #4a4adf;
    }

    .jdg-multisel {
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fafafa;
      padding: 4px;
      display: flex; flex-wrap: wrap; gap: 4px;
      min-height: 36px;
      cursor: pointer;
    }
    .jdg-multisel:focus-within { border-color: #4a4adf; }
    .jdg-chip {
      background: #4a4adf;
      color: #fff;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 11px;
      display: flex; align-items: center; gap: 4px;
      cursor: default;
    }
    .jdg-chip-x { cursor: pointer; opacity: 0.7; font-size: 13px; line-height: 1; }
    .jdg-chip-x:hover { opacity: 1; }
    .jdg-multisel-dropdown {
      position: fixed;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      z-index: 2147483648;
      max-height: 180px;
      overflow-y: auto;
      padding: 4px 0;
      min-width: 200px;
    }
    .jdg-multisel-option {
      padding: 6px 12px;
      cursor: pointer;
      font-size: 13px;
    }
    .jdg-multisel-option:hover { background: #f0f0ff; }
    .jdg-multisel-option.selected { color: #4a4adf; font-weight: 600; }
    .jdg-multisel-option.focused { background: #e8e8ff; }

    .jdg-desc-preview {
      background: #f5f5f5;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 12px;
      color: #444;
      max-height: 90px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .jdg-modal-footer {
      display: flex; justify-content: flex-end; gap: 8px;
      padding: 12px 28px;
      border-top: 1px solid #eee;
      background: #fff;
      border-radius: 0 0 12px 12px;
      flex-shrink: 0;
    }
    .jdg-btn {
      padding: 7px 18px;
      border-radius: 7px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: background 0.15s, opacity 0.15s;
    }
    .jdg-btn-cancel { background: #eee; color: #333; }
    .jdg-btn-cancel:hover { background: #ddd; }
    .jdg-btn-send { background: #4a4adf; color: #fff; }
    .jdg-btn-send:hover { background: #3535b5; }
    .jdg-btn-send:disabled { opacity: 0.5; cursor: not-allowed; }
    .jdg-status-msg {
      font-size: 12px; color: #666;
      align-self: center; margin-right: auto;
    }
    .jdg-status-msg.error { color: #c0392b; }
    .jdg-status-msg.success { color: #27ae60; }

    /* ── Settings Modal ── */
    #jdg-settings { }
    #jdg-settings h2 { margin: 0 0 18px; font-size: 16px; font-weight: 700; color: #1a1a2e; }
    .jdg-settings-section { margin-bottom: 20px; }
    .jdg-settings-section h3 {
      font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; color: #888; margin: 0 0 10px;
    }
    .jdg-pos-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 6px; max-width: 260px;
    }
    .jdg-pos-btn {
      padding: 6px; border-radius: 6px; border: 2px solid #ddd;
      background: #fafafa; cursor: pointer; font-size: 12px;
      text-align: center; transition: border-color 0.15s, background 0.15s;
    }
    .jdg-pos-btn.active { border-color: #4a4adf; background: #f0f0ff; font-weight: 700; }
    .jdg-shortcut-wrap { display: flex; align-items: center; gap: 8px; }
    .jdg-shortcut-input {
      border: 1px solid #ddd; border-radius: 6px;
      padding: 5px 10px; font-size: 13px; min-width: 160px;
      background: #fafafa; color: #1a1a1a; cursor: pointer;
    }
    .jdg-shortcut-input.recording {
      border-color: #e74c3c; background: #fff5f5;
      animation: jdg-pulse 1s infinite;
    }
    @keyframes jdg-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
    .jdg-btn-sm {
      padding: 4px 10px; font-size: 12px; border-radius: 5px;
      border: none; cursor: pointer; font-weight: 600;
    }
    .jdg-btn-clear { background: #eee; color: #555; }
    .jdg-btn-clear:hover { background: #ddd; }
    .jdg-industry-list { list-style: none; padding: 0; margin: 0 0 8px; }
    .jdg-industry-item {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 0; border-bottom: 1px solid #f0f0f0;
      font-size: 13px;
    }
    .jdg-industry-item .jdg-drag-handle {
      cursor: grab; color: #bbb; font-size: 14px; user-select: none;
    }
    .jdg-industry-item .jdg-ind-name { flex: 1; }
    .jdg-industry-item .jdg-btn-remove {
      background: none; border: none; color: #c0392b;
      cursor: pointer; font-size: 14px; padding: 0 2px;
      line-height: 1;
    }
    .jdg-add-industry { display: flex; gap: 6px; }
    .jdg-add-industry input {
      flex: 1; border: 1px solid #ddd; border-radius: 6px;
      padding: 5px 8px; font-size: 13px; background: #fafafa;
    }
    .jdg-btn-add { background: #4a4adf; color: #fff; }
    .jdg-btn-add:hover { background: #3535b5; }
    .jdg-token-wrap { display: flex; gap: 6px; align-items: center; }
    .jdg-token-wrap input {
      flex: 1; border: 1px solid #ddd; border-radius: 6px;
      padding: 5px 8px; font-size: 12px; font-family: monospace;
      background: #fafafa;
    }
    .jdg-close-btn {
      position: absolute; top: 14px; right: 16px;
      background: none; border: none; font-size: 20px;
      cursor: pointer; color: #aaa; line-height: 1;
    }
    .jdg-close-btn:hover { color: #333; }

    .jdg-collapsible-header {
      display: flex; align-items: center; justify-content: space-between;
      cursor: pointer; user-select: none;
      margin: 0 0 0;
    }
    .jdg-collapsible-header h3 { margin: 0; }
    .jdg-collapsible-arrow {
      font-size: 10px; color: #aaa; transition: transform 0.2s;
    }
    .jdg-collapsible-arrow.open { transform: rotate(180deg); }
    .jdg-collapsible-body { overflow: hidden; }
    .jdg-collapsible-body.collapsed { display: none; }
    .jdg-subsection { margin-top: 10px; }
    .jdg-subsection h4 {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; color: #bbb; margin: 0 0 6px;
    }
    .jdg-site-header {
      padding: 36px 28px 10px;
      border-bottom: 1px solid #eee;
      background: #fff;
      flex-shrink: 0;
    }
    .jdg-site-header-row {
      display: flex; align-items: center; gap: 6px;
    }
    .jdg-site-header-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; color: #888; white-space: nowrap; min-width: 64px;
    }
    .jdg-site-quick-input {
      flex: 1; border: 1px solid #ddd !important; border-radius: 6px !important;
      padding: 5px 8px !important; font-size: 12px !important;
      font-family: monospace !important; line-height: normal !important;
      background: #fafafa !important; color: #1a1a1a !important; outline: none !important;
      box-sizing: border-box !important;
    }
    .jdg-site-quick-input:focus { border-color: #4a4adf; background: #fff; }
    .jdg-site-quick-select {
      flex: 1; border: 1px solid #ddd; border-radius: 6px;
      padding: 5px 8px; font-size: 12px; background: #fafafa;
      color: #1a1a1a; outline: none; cursor: pointer;
    }
    .jdg-site-quick-select:focus { border-color: #4a4adf; background: #fff; }
    .jdg-di-item-url { font-family: monospace; font-size: 11px; color: #555; }
    .jdg-di-item-sep { font-size: 11px; color: #bbb; margin: 0 2px; }
    .jdg-di-item-ind { font-size: 12px; color: #1a1a1a; flex: 1; }

    .jdg-group {
      grid-column: 1 / -1;
      display: flex; align-items: center; gap: 10px;
      margin: 10px 0 2px;
    }
    .jdg-group:first-child { margin-top: 0; }
    .jdg-group-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: #aaa; white-space: nowrap;
    }
    .jdg-group-line {
      flex: 1; height: 1px; background: #eee;
    }

    /* ── Page highlights ── */
    .jdg-hl {
      border-radius: 2px;
      padding: 0 1px;
      font: inherit !important;
      color: inherit !important;
      text-decoration: inherit !important;
    }
    .jdg-hl-yellow { background: var(--jdg-hl-yellow, #fff59d) !important; }
    .jdg-hl-green  { background: var(--jdg-hl-green,  #c8e6c9) !important; }
  `);

  // ─── State ───────────────────────────────────────────────────────────────────
  function getIndustries() {
    const stored = GM_getValue('industries', null);
    return stored ? JSON.parse(stored) : [...DEFAULT_INDUSTRIES];
  }
  function saveIndustries(arr) { GM_setValue('industries', JSON.stringify(arr)); }
  function getDomains() {
    const stored = GM_getValue('domainList', null);
    if (!stored) return [...DEFAULT_DOMAINS];
    const arr = JSON.parse(stored);
    return arr.length > 0 ? arr : [...DEFAULT_DOMAINS];
  }
  function saveDomains(arr) { GM_setValue('domainList', JSON.stringify(arr)); }
  function getPatterns() {
    const stored = GM_getValue('patternList', null);
    if (!stored) return [...DEFAULT_PATTERNS];
    const arr = JSON.parse(stored);
    return arr.length > 0 ? arr : [...DEFAULT_PATTERNS];
  }
  function savePatterns(arr) { GM_setValue('patternList', JSON.stringify(arr)); }
  function getDomainIndustries() {
    try { return JSON.parse(GM_getValue('domainIndustries', '[]')); }
    catch { return []; }
  }
  function saveDomainIndustries(arr) { GM_setValue('domainIndustries', JSON.stringify(arr)); }
  function getHighlightEnabled() { return GM_getValue('highlightEnabled', true); }
  function getHighlightYellow()  { return GM_getValue('highlightYellow', '#fff59d'); }
  function getHighlightGreen()   { return GM_getValue('highlightGreen',  '#c8e6c9'); }
  function applyHighlightColors() {
    document.documentElement.style.setProperty('--jdg-hl-yellow', getHighlightYellow());
    document.documentElement.style.setProperty('--jdg-hl-green',  getHighlightGreen());
  }
  function getPosition() { return GM_getValue('panelPosition', 'top-right'); }
  function getShortcut() { return GM_getValue('shortcut', ''); }
  function getToken() { return GM_getValue('codaToken', '86235ca7-568d-48d4-9ee9-2cf4787859b4'); }
  function getGrabbedUrls() {
    try { return new Set(JSON.parse(GM_getValue('grabbedUrls', '[]'))); }
    catch { return new Set(); }
  }
  function markUrlGrabbed() {
    const urls = getGrabbedUrls();
    urls.add(location.href);
    const arr = [...urls].slice(-1000);
    GM_setValue('grabbedUrls', JSON.stringify(arr));
    updateGrabIndicator();
  }
  function updateGrabIndicator() {
    const panel = document.getElementById('jdg-panel');
    if (!panel) return;
    const existing = document.getElementById('jdg-grab-indicator');
    if (existing) existing.remove();
    if (!getGrabbedUrls().has(location.href)) return;
    const indicator = document.createElement('span');
    indicator.id = 'jdg-grab-indicator';
    indicator.className = 'jdg-grab-indicator';
    indicator.innerHTML = '✅<span class="jdg-tooltip">Already grabbed</span>';
    const isLeft = getPosition().includes('left');
    if (isLeft) {
      panel.appendChild(indicator);
    } else {
      panel.insertBefore(indicator, panel.firstChild);
    }
  }

  // ─── URL matching ─────────────────────────────────────────────────────────────
  function pageMatchesAllowlist() {
    const url  = location.href.toLowerCase();
    const host = location.hostname.toLowerCase().replace(/^www\./, '');
    const domains = getDomains();
    const patterns = getPatterns();
    if (domains.some(d => host.includes(d.toLowerCase()))) return true;
    if (patterns.some(p => url.includes(p.toLowerCase()))) return true;
    return false;
  }

  // ─── Channel detection ───────────────────────────────────────────────────────
  function detectChannel() {
    const host = location.hostname.replace(/^www\./, '');
    for (const [domain, channel] of Object.entries(CHANNEL_MAP)) {
      if (host.includes(domain)) return channel;
    }
    return '';
  }

  // ─── Extraction ──────────────────────────────────────────────────────────────
  function extractJobData() {
    const data = {
      position: '', employer: '', location: '', url: window.location.href,
      description: '', jobRefNum: '', remotePolicy: '', ftPtCT: '',
      salaryRange: '', compType: '', industries: [], hrsWk: '',
      channel: detectChannel(), contact: '', contactTitle: '',
      phoneEmail: '', status: 'Considering', interest: 3,
      connectionStrength: 'None', shiftHours: '',
      responsibilities: '', requirements: '', benefits: '',
    };

    const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    const badEmployerValue = (s) => /^(company|employer|organization|business|corp|inc)$/i.test(clean(s));
    const isGusto = location.hostname.includes('gusto.com');

    // Try ld+json first
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const s of scripts) {
      try {
        const json = JSON.parse(s.textContent);
        const jobs = Array.isArray(json) ? json : [json];
        for (const j of jobs) {
          const type = j['@type'];
          if (type === 'JobPosting' || (Array.isArray(type) && type.includes('JobPosting'))) {
            data.position    = j.title || data.position;
            data.employer    = (j.hiringOrganization && j.hiringOrganization.name) || data.employer;
            data.jobRefNum   = j.identifier?.value || j.identifier || data.jobRefNum;
            // Reject UUIDs and URL paths from ld+json identifier
            if (data.jobRefNum && /[\/\\]|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(data.jobRefNum)) {
              data.jobRefNum = '';
            }
            data.salaryRange = extractSalaryFromLD(j);

            if (j.jobLocation) {
              const loc = Array.isArray(j.jobLocation) ? j.jobLocation[0] : j.jobLocation;
              const addr = loc.address;
              if (addr) {
                const parts = [addr.addressLocality, addr.addressRegion, addr.addressCountry].filter(Boolean);
                data.location = parts.join(', ') || data.location;
              }
            }

            // ld+json remote type (explicit schema)
            const ldRemote = (j.jobLocationType || '').toLowerCase();
            if (ldRemote.includes('telecommute') || ldRemote.includes('remote')) {
              data.remotePolicy = 'Remote';
            }

            const empType = Array.isArray(j.employmentType) ? j.employmentType[0] : (j.employmentType || '');
            data.ftPtCT = mapEmploymentType(empType);

            data.description = j.description
              ? stripHtml(j.description)
              : data.description;          }
        }
      } catch (e) {}
    }

    // Reject generic employer values that came from ld+json
    if (badEmployerValue(data.employer)) data.employer = '';

    // ── Gusto-specific extraction ──
    if (isGusto) {
      const h1 = document.querySelector('h1');
      if (h1) {
        const spans = [...h1.querySelectorAll('span')].map(el => ({
          el, text: clean(el.textContent), cls: String(el.className || ''),
        })).filter(x => x.text);

        const employerSpan = spans.find(x =>
          /uppercase/i.test(x.cls) && (/font-semibold/i.test(x.cls) || /tracking-wide/i.test(x.cls))
        );
        if (employerSpan && !data.employer) data.employer = employerSpan.text;

        const titleSpan = spans.find(x => /text-3xl|text-4xl/i.test(x.cls));
        if (titleSpan && !data.position) data.position = titleSpan.text;

        const subtitleSpan = spans.find(x =>
          x.text.includes('·') && /full\s*time|part\s*time|contract|temporary/i.test(x.text)
        );
        if (subtitleSpan) {
          const parts = subtitleSpan.text.split('·').map(clean).filter(Boolean);
          if (parts[0] && !data.location) data.location = parts[0];
          if (parts[1] && !data.ftPtCT) data.ftPtCT = mapEmploymentType(parts[1]) || data.ftPtCT;
        }
      }

      if (!data.employer) {
        const crumb = [...document.querySelectorAll('nav[aria-label="Breadcrumb"] a')]
          .find(a => /careers\s+at\s+/i.test(a.textContent));
        if (crumb) {
          const m = clean(crumb.textContent).match(/(?:careers|jobs)\s+at\s+(.+)/i);
          if (m) data.employer = m[1].trim();
        }
      }

      if (!data.description) {
        const descHeading = [...document.querySelectorAll('h1,h2,h3,h4')]
          .find(el => clean(el.textContent).toLowerCase() === 'description');
        if (descHeading) {
          const richText = descHeading.parentElement?.querySelector('.rich-text-container');
          if (richText) data.description = stripHtml(richText.innerHTML);
        }
      }
    }

    // ── Comeet-specific extraction ──
    if (location.hostname.includes('comeet.com')) {
      const titleEl = document.querySelector('[data-qa="positionTitle"]');
      if (titleEl) {
        // First span is the real title; second (ng-hide) contains " @ CompanyName"
        const spans = [...titleEl.querySelectorAll('span')];
        if (spans.length >= 1) data.position = clean(spans[0].textContent);
        if (!data.employer && spans.length >= 2) {
          const m = clean(spans[1].textContent).match(/^@\s*(.+)/);
          if (m) data.employer = m[1].trim();
        }
      }
      if (!data.location) {
        const locEl = document.querySelector('[data-qa="headerLocation"]');
        if (locEl) data.location = clean(locEl.textContent).replace(/,?\s*US\s*$/i, '').trim();
      }
      if (!data.ftPtCT) {
        const etEl = document.querySelector('[data-qa="headerEmploymentType"]');
        if (etEl) data.ftPtCT = mapEmploymentType(clean(etEl.textContent)) || data.ftPtCT;
      }
    }

    // DOM fallback / augmentation
    if (!data.position) {
      data.position = getText([
        '[class*="job-title"]', '[class*="jobtitle"]',
        '[data-testid*="title"]', '.posting-headline h2',
        'h1 span[class*="text-3xl"]', 'h1 span[class*="text-4xl"]',
        'h1',
      ]);
    }
    if (!data.employer) {
      data.employer = getText(['[class*="company-name"]', '[class*="companyName"]', '[data-testid*="company"]', '.employer-name', '[class*="employer"]']);
    }
    if (!data.location) {
      data.location = getText([
        '[class*="location"]', '[data-testid*="location"]', '.job-location', '[class*="jobLocation"]',
        '[data-qa="positionDetailLocation"]',
      ]);
      // Strip map marker icon text if present
      if (data.location) data.location = data.location.replace(/^\s*\uf041\s*/, '').trim();
    }
    const DESC_SELECTORS = [
      '[data-automation-id="jobPostingDescription"]',
      '[class*="job-description"]','[class*="jobDescription"]',
      '[class*="job__description"]',
      '[class*="description__text"]','[id*="job-description"]',
      '.posting-description','.job-details',
      '[data-testid*="description"]',
      '[data-qa="requirementFieldContent"]',
      '.jd-info',
      '[data-ph-at-id="jobdescription-text"]',
      '.rich-text-container',
      '.entry-content',
    ].join(',');
    if (!data.description) {
      const descEl = document.querySelector(DESC_SELECTORS);
      if (descEl) data.description = stripHtml(descEl.innerHTML);
    }

    // Also fix ld+json description if it came through as raw HTML
    if (data.description && data.description.trim().startsWith('<')) {
      data.description = stripHtml(data.description);
      if (data.description.trim().startsWith('<')) {
        data.description = data.description.replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim();
      }
    }

    // Employer fallback strategies
    if (!data.employer) {
      // 1. Logo alt text: "Figma Logo" → "Figma", but reject generic values
      const GENERIC_ALT = /^(company[\s-]logo|logo|company|organization|employer|corp|inc)$/i;
      const logoImg = document.querySelector('img[alt*=" Logo"], img[alt*=" logo"], img[alt*="-logo"], img[alt*="-Logo"]');
      if (logoImg && !GENERIC_ALT.test(logoImg.alt.trim())) {
        data.employer = logoImg.alt.replace(/[\s\-_]*(logo|Logo)\s*$/i, '').trim();
      }
    }
    if (!data.employer) {
      // 2. Gusto-style: prominent uppercase/colored span near the job title
      // e.g. <span class="...text-indigo-600...uppercase...">Commonplace Coffee</span>
      const brandSpan = document.querySelector('[class*="uppercase"][class*="font-semibold"], [class*="uppercase"][class*="tracking-wide"]');
      if (brandSpan && brandSpan.textContent.trim().length < 60) {
        data.employer = brandSpan.textContent.trim();
      }
    }
    if (!data.employer) {
      // 3. Breadcrumb "Careers at Company" pattern
      const breadcrumb = document.querySelector('[aria-label="Breadcrumb"] a, nav[aria-label="Back"] + nav a');
      if (breadcrumb) {
        const m = breadcrumb.textContent.match(/(?:careers|jobs)\s+at\s+(.+)/i);
        if (m) data.employer = m[1].trim();
      }
    }
    if (!data.employer) {
      // 4. Page title: "Job Title - Company Name" or "Company Name | Job Title"
      const title = document.title;
      const m = title.match(/[-–|]\s*([^-–|]+?)\s*(?:[-–|]|$)/);
      if (m) data.employer = m[1].trim();
    }
    if (!data.employer) {
      // 5. "Back to jobs/careers" link href domain
      const backLink = document.querySelector('a[href*="/careers/"], a[href*="/jobs/"], a[href*="/boards/"]');
      if (backLink) {
        try {
          const host = new URL(backLink.href).hostname.replace(/^www\./, '');
          const company = host.split('.')[0];
          data.employer = company.charAt(0).toUpperCase() + company.slice(1);
        } catch (e) {}
      }
    }

    // Subtitle span: location and FT/PT from "Pittsburgh, PA · Full time" pattern (non-Gusto)
    if (!isGusto && (!data.location || !data.ftPtCT)) {
      const subtitleSpan = document.querySelector('h1 span[class*="text-gray"], h1 span[class*="text-base"]');
      if (subtitleSpan) {
        const parts = subtitleSpan.textContent.split('·').map(s => s.trim()).filter(Boolean);
        if (parts.length >= 1 && !data.location) data.location = parts[0];
        if (parts.length >= 2 && !data.ftPtCT) data.ftPtCT = mapEmploymentType(parts[1]) || data.ftPtCT;
      }
    }

    // data-qa specific field targeting (Comeet and similar Angular/NG apps)
    if (!data.ftPtCT) {
      const raw = getText(['[data-qa="positionDetailEmploymentType"]']);
      if (raw) data.ftPtCT = mapEmploymentType(raw);
    }
    if (!data.jobRefNum) {
      // "ID: VDT27326" pattern in positionDetailId
      const raw = getText(['[data-qa="positionDetailId"]', '[data-qa="positionId"]']);
      if (raw) {
        const m = raw.match(/(?:id|ref|#)\s*[:\-]?\s*([A-Z0-9\-]{3,20})/i);
        data.jobRefNum = m ? m[1] : raw.trim();
      }
    }

    // Page title fallback for position
    if (!data.position) {
      const title = document.title;
      const sep = title.search(/[-|@–]/);
      data.position = sep > 0 ? title.slice(0, sep).trim() : title.trim();
    }

    // Remote policy: regex on description text if not already set from ld+json
    if (!data.remotePolicy && data.description) {
      data.remotePolicy = inferRemotePolicy(data.description);
    }
    // Also try page text if description still empty
    if (!data.remotePolicy) {
      data.remotePolicy = inferRemotePolicy(document.body.innerText || '');
    }

    // ── Structured label scanner ──────────────────────────────────────────────
    // Handles three common patterns:
    //   1. <strong>Label:</strong> text node  (UPMC-style)
    //   2. <dt>Label</dt><dd>Value</dd>        (definition lists)
    //   3. [class*="label"] + sibling value   (Greenhouse/Lever style)
    const labeledFields = extractLabeledFields();

    const lf = (keys) => {
      for (const k of keys) {
        const val = labeledFields[k.toLowerCase()];
        if (val) return val.trim();
      }
      return '';
    };

    if (!data.ftPtCT) {
      const raw = lf(['status', 'employment type', 'job type', 'type', 'employment', 'position type']);
      if (raw) data.ftPtCT = mapEmploymentType(raw) || data.ftPtCT;
    }
    if (!data.jobRefNum) {
      data.jobRefNum = lf(['job id', 'job #', 'job ref', 'req id', 'requisition id', 'requisition #', 'reference #']);
    }
    // Reject UUIDs, URL paths, and other non-human-readable ref numbers
    if (data.jobRefNum && /[\/\\]|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(data.jobRefNum)) {
      data.jobRefNum = lf(['job id', 'job #', 'job ref', 'req id', 'requisition id', 'requisition #', 'reference #'].filter(k => {
        const v = labeledFields[k];
        return v && !/[\/\\]|[0-9a-f]{8}-[0-9a-f]{4}/.test(v);
      })) || '';
    }

    // Always prefer labeled field salary over ld+json (labeled is more precise)
    const lfSalary = lf(['salary range', 'salary', 'pay range', 'compensation', 'wage range', 'hourly range']);
    if (lfSalary) data.salaryRange = lfSalary;

    // Always prefer labeled field shift over extractShiftHours (more reliable)
    const lfShift = lf(['shift', 'hours', 'schedule', 'work hours', 'working hours']);
    if (lfShift) data.shiftHours = lfShift;

    if (!data.remotePolicy) {
      const raw = lf(['role type', 'work arrangement', 'remote', 'work type', 'location type', 'workplace type']);
      if (raw) data.remotePolicy = inferRemotePolicy(raw) || data.remotePolicy;
    }

    // Always prefer labeled field location — it's more specific than ld+json city/region
    const lfLocation = lf(['location', 'job location', 'work location', 'office location']);
    if (lfLocation) data.location = lfLocation;

    // Fallback: bodyText regex for salary and job ref if still missing
    // Clone body and strip input/select values to avoid slider artifacts
    if (!data.salaryRange || !data.jobRefNum) {
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll('input, select, textarea').forEach(el => el.remove());
      const bodyText = clone.innerText || clone.textContent || '';
      if (!data.salaryRange) {
        // Patterns in priority order:
        // 1. "$X/unit to $Y/unit" (e.g. "$162,000/year to $227,000/year")
        // 2. "between $X and $Y"
        // 3. "$X - $Y" or "$X – $Y"
        // 4. Single "$X/unit"
        // Optionally followed by "+ bonus", "+ equity", etc.
        const trailer = /(?:\s*\+\s*(?:bonus|equity|benefits|commission|incentive))*/.source;
        const cur = '[$£€¥￥₩₹]';
        const salMatch =
          bodyText.match(new RegExp(`${cur}[\\d,]+(?:\\.\\d+)?(?:\\/(?:yr|year|hr|hour|wk|week|mo|month))?\\s+to\\s+${cur}[\\d,]+(?:\\.\\d+)?(?:\\/(?:yr|year|hr|hour|wk|week|mo|month))?${trailer}`, 'i')) ||
          bodyText.match(new RegExp(`between\\s+${cur}[\\d,]+(?:\\.\\d+)?\\s+and\\s+${cur}[\\d,]+(?:\\.\\d+)?`, 'i')) ||
          bodyText.match(new RegExp(`${cur}[\\d,]+(?:\\.\\d+)?(?:\\/(?:yr|year|hr|hour|wk|week|mo|month))?\\s*[-–—]\\s*${cur}?[\\d,]+(?:\\.\\d+)?(?:\\/(?:yr|year|hr|hour|wk|week|mo|month))?${trailer}`, 'i')) ||
          bodyText.match(new RegExp(`${cur}[\\d,]+(?:\\.\\d+)?(?:\\/(?:yr|year|hr|hour|wk|week|mo|month))?`, 'i'));
        if (salMatch) data.salaryRange = salMatch[0].trim();
      }
      if (!data.jobRefNum) {
        const refMatch = bodyText.match(/\b(?:job\s*(?:id|ref|number|#)|requisition\s*(?:id|#))\s*[:\-]?\s*([A-Z0-9\-]{4,20})\b/i);
        if (refMatch) data.jobRefNum = refMatch[1].trim();
      }
    }

    // URL-based job ref fallback — extract numeric/alphanumeric ID from URL path
    // Prefers purely numeric IDs or short alphanumeric codes, skips long word-based slugs
    if (!data.jobRefNum) {
      const urlPath = window.location.pathname;
      const segments = urlPath.split('/').filter(Boolean);
      // Look for a segment that looks like a job ID (numeric, or short alphanum like VDT27326)
      // after a jobs/careers/posting keyword segment
      const keywordIdx = segments.findIndex(s => /^(jobs?|careers?|postings?|positions?|openings?|requisitions?)$/i.test(s));
      if (keywordIdx >= 0) {
        // Check segments after the keyword for an ID-like value
        for (let i = keywordIdx + 1; i < segments.length; i++) {
          const seg = segments[i].split('?')[0];
          // Accept: purely numeric, or short alphanumeric codes (3-12 chars, not all lowercase words)
          if (/^\d+$/.test(seg) || /^[A-Z0-9][A-Z0-9\-]{2,11}$/i.test(seg) && !/^[a-z\-]+$/.test(seg)) {
            data.jobRefNum = seg;
            break;
          }
        }
      }
    }

    // Channel: fall back to "Company Website" if still blank and we're on a careers/jobs subdomain
    if (!data.channel) {
      const host = location.hostname;
      if (/^(careers|jobs|job|apply|hiring|hire|talent|work)\./i.test(host)) {
        data.channel = 'Company Website';
      }
    }

    // Shift / Hours: fall back to regex extraction if labeled field didn't find anything
    if (!data.shiftHours) {
      data.shiftHours = extractShiftHours(data.description);
    }

    // Industry inference — include department label in corpus for better signal
    const department = lf(['department', 'dept', 'team', 'division', 'function']);
    data.industries = inferIndustries(data.position, data.employer, data.description, department);

    // Merge domain-pinned industries — match against full URL so path-based
    // patterns like "/figma/" work for ATS-hosted jobs (e.g. greenhouse.io/figma)
    const fullUrl = location.href.toLowerCase();
    const pinned = getDomainIndustries()
      .filter(e => fullUrl.includes(e.url.toLowerCase()))
      .map(e => e.industry);
    if (pinned.length) data.industries = [...new Set([...data.industries, ...pinned])];

    // Comp Type inference — check labeled fields first, then description
    const lfComp = lf(['compensation', 'comp type', 'pay type', 'salary type']);
    if (lfComp) {
      data.compType = inferCompType(lfComp) || inferCompType(data.description);
    } else {
      data.compType = inferCompType(data.description);
    }

    // Section extraction — prefer DOM HTML when ld+json gave a flat (no-newline) blob
    let sectionSource = data.description;
    if (sectionSource && !sectionSource.includes('\n')) {
      const descEl = document.querySelector(DESC_SELECTORS);
      if (descEl) sectionSource = stripHtml(descEl.innerHTML);
    }
    const sections = extractDescriptionSections(sectionSource);
    data.responsibilities = sections.responsibilities;
    data.requirements     = sections.requirements;
    data.benefits         = sections.benefits;

    return data;
  }

  // Infer Remote / Hybrid / On-Site from free text using weighted signals
  function inferRemotePolicy(text) {
    const t = text.toLowerCase();

    // Strong "fully remote" signals
    const fullyRemote = [
      /\b100%\s*remote\b/,
      /\bfully\s*remote\b/,
      /\bremote[\s-]only\b/,
      /\bwork\s*(fully\s*)?remotely\b/,
      /\bthis\s+(is\s+a\s+)?remote\s+(position|role|job|opportunity)\b/,
      /\bposition\s+is\s+remote\b/,
      /\bremote\s+position\b/,
      /\bno\s+office\s+required\b/,
    ];

    // Hybrid signals
    const hybridSignals = [
      /\bhybrid\b/,
      /\bremote\s*\/\s*(on[\s-]?site|office|in[\s-]?office)\b/,
      /\b(on[\s-]?site|office)\s*\/\s*remote\b/,
      /\bpartially\s*remote\b/,
      /\bremote\s+as\s+needed\b/,
      /\bremote\s+(when\s+)?as\s+required\b/,
      /\bflexible\s+(work\s+)?(schedule|arrangement|option)\b/,
      /\boption\s+to\s+work\s+remotely\b/,
      /\bwork\s+(from\s+)?home\s+(option|when|as|occasionally|sometimes)\b/,
      /\bsome\s+remote\b/,
      /\boccasionally\s+remote\b/,
      /\bblended\s+(work|office)\b/,
      /\bin[\s-]?office\b.*\bremote\b/s,
      /\bremote\b.*\bin[\s-]?office\b/s,
      /\bor\s+remotely\b/,
      /\bremotely\s+or\b/,
      /\bcan\s+be\s+(?:held|done|performed|completed|based)(?:\s+\w+)?\s+remotely\b/,
      /\b(?:hubs?|offices?|locations?)\s+or\s+remotely\b/,
    ];

    // On-site signals
    const onSiteSignals = [
      /\bon[\s-]?site\s+(only|required|position|role)\b/,
      /\bin[\s-]?office\s+(only|required|position|role|job)\b/,
      /\bthis\s+is\s+an?\s+in[\s-]?office\s+(position|role|job)\b/,
      /\bin[\s-]?person\s+(only|required|position|role)\b/,
      /\b(must|required to|expected to)\s+(be\s+)?(work|report|come)\s+(in|on[\s-]?site|to\s+the\s+office)\b/,
      /\bno\s+remote\s*(work|option)\b/,
      /\bthis\s+role\s+is\s+(not\s+)?eligible\s+for\s+remote\b/,
    ];

    // Strip sentences that negate remote/hybrid — handles the broad class of
    // "not a remote role", "hybrid not available", "no remote work", etc.
    // Safeguard: keep sentences that also contain a strong affirmative so we
    // don't over-strip unusual phrasings like "not your average remote job".
    const negationRe     = /\b(not|no|never|isn'?t|are?n'?t|doesn'?t|don'?t|won'?t|without|non-)\b/;
    const remHybridRe    = /\b(remote|hybrid|work\s+from\s+home|wfh)\b/;
    const strongAffirmRe = /\b(fully\s+remote|100%\s*remote|remote[\s-]only)\b/;

    const neutralised = t
      .split(/(?<=[.!?])\s+|[\r\n]+/)
      .map(s => (negationRe.test(s) && remHybridRe.test(s) && !strongAffirmRe.test(s)) ? '' : s)
      .join(' ');

    // Strong "fully on-site" signals — checked before hybrid to avoid false positives
    const fullyOnSite = [
      /\bfully\s+on[\s-]?site\b/,
      /\b100%\s*on[\s-]?site\b/,
      /\bon[\s-]?site[\s-]only\b/,
      /\bthis\s+(is\s+a\s+)?(?:fully\s+)?on[\s-]?site\s+(position|role|job)\b/,
    ];

    for (const re of fullyOnSite)  { if (re.test(t))           return 'On-Site'; }
    for (const re of fullyRemote)  { if (re.test(neutralised)) return 'Remote'; }
    for (const re of hybridSignals){ if (re.test(neutralised)) return 'Hybrid'; }
    for (const re of onSiteSignals){ if (re.test(t))           return 'On-Site'; }

    // Loose "remote"/"remotely" mention with no stronger signal → Hybrid (most common ambiguous case)
    if (/\bremote(ly)?\b/.test(neutralised)) return 'Hybrid';

    return '';
  }

  // Extract shift/hours string from free text
  // Returns a trimmed snippet like "8:00 a.m. – 5:00 p.m. EST" or "9am–5pm Mon–Fri"
  function extractShiftHours(text) {
    if (!text) return '';

    // Time range pattern: matches things like
    //   8:00 a.m. – 5:00 p.m. EST
    //   9am - 5pm
    //   7:30 AM to 3:30 PM CST
    //   8:00–17:00
    const timeRangeRe = /\b(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)\s*(?:–|-|to)\s*(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?(?:\s*[A-Z]{2,4})?)\b/gi;

    // Shift name patterns: "Red Shift", "Day Shift", "Night Shift", "Morning Shift"
    const shiftNameRe = /\b((?:red|blue|green|day|night|morning|evening|overnight|first|second|third|swing|mid)\s+shift)\b/gi;

    const matches = [];

    // Find time ranges and grab surrounding context (up to 80 chars)
    let m;
    while ((m = timeRangeRe.exec(text)) !== null) {
      const start = Math.max(0, m.index - 20);
      const end   = Math.min(text.length, m.index + m[0].length + 20);
      let snippet = text.slice(start, end).replace(/\s+/g, ' ').trim();
      // Strip leading/trailing partial words at boundaries
      snippet = snippet.replace(/^\S*\s/, '').replace(/\s\S*$/, '');
      matches.push(snippet);
    }

    if (matches.length > 0) return matches[0];

    // Fall back to shift name alone
    const sn = shiftNameRe.exec(text);
    if (sn) return sn[0].trim();

    return '';
  }

  // Infer industries from job title, employer name, and description
  function inferIndustries(title, employer, description, department = '') {
    // Combine all text; weight title+employer more heavily by repeating them
    const corpus = [
      title, title, title,
      employer, employer,
      department, department,
      description,
    ].join(' ').toLowerCase();

    const INDUSTRY_SIGNALS = {
      'Technology': {
        threshold: 2,
        patterns: [
          /\bsoftware\b/, /\bdeveloper\b/, /\bengineer(ing)?\b/, /\bsaas\b/,
          /\bcloud\b/, /\bdevops\b/, /\bcybersecurity\b/, /\binfosec\b/,
          /\bsoc\b/, /\bsiem\b/, /\bedr\b/, /\bnetwork security\b/,
          /\bpenetration test/, /\bmalware\b/, /\bthreat intel/, /\bincident response\b/,
          /\bit (support|operations|infrastructure|services)\b/, /\bsysadmin\b/,
          /\bdata (science|engineer|analyst)\b/, /\bmachine learning\b/, /\bartificial intelligence\b/,
          /\bai\/ml\b/, /\bfull.?stack\b/, /\bback.?end\b/, /\bfront.?end\b/,
          /\bmobile (app|development)\b/, /\bios developer\b/, /\bandroid developer\b/,
          /\bscrum\b/, /\bagile\b/, /\btech(nology)? company\b/,
          /\bstartup\b/, /\bplatform\b/, /\bpython\b/, /\bjavascript\b/,
        ],
      },
      'Healthcare': {
        threshold: 3,
        patterns: [
          /\bpatient(s| care)\b/, /\bclinical\b/, /\bmedical\b/, /\bhospital\b/,
          /\bnurse|nursing\b/, /\bphysician\b/, /\bhipaa\b/, /\behr\b/, /\bhealth system\b/,
          /\bhealth(care)? provider\b/, /\bpharma(ceutical)?\b/, /\bbiotech\b/,
          /\bmedical device\b/, /\bdiagnostic\b/, /\btherapist\b/, /\bclinician\b/,
          /\bbehavioral health\b/, /\btelemedicine\b/,
          /\bpublic health\b/, /\bepidemi/, /\bcredential(ing|s)?\b/,
          /\bncqa\b/, /\bmalpractice\b/, /\bhealth plan\b/,
        ],
      },
      'Education': {
        threshold: 4,
        patterns: [
          /\bstudent(s)?\b/, /\bteach(er|ing)\b/, /\bcurriculum\b/, /\bclassroom\b/,
          /\buniversity\b/, /\bcollege\b/, /\bacademic\b/, /\bfaculty\b/,
          /\bk.?12\b/, /\bhigher ed\b/, /\beducation(al)?\b/, /\blearning (management|platform)\b/,
          /\bedtech\b/, /\binstructional design\b/, /\bschool district\b/,
          /\bprofessor\b/, /\blecture\b/, /\bsyllabus\b/,
        ],
      },
      'Nonprofit': {
        threshold: 3,
        patterns: [
          /\bnonprofit\b/, /\bnon-profit\b/, /\b501\(c\)\b/, /\bmission.?driven\b/,
          /\bcommunity (impact|outreach|organization)\b/, /\bdonor(s)?\b/, /\bfundraising\b/,
          /\bgrant(s| writing)\b/, /\badvocacy\b/, /\bcharity\b/,
          /\bphilanthrop/, /\bsocial (services|impact|enterprise)\b/, /\bngo\b/,
        ],
      },
      'Finance': {
        threshold: 3,
        patterns: [
          /\bfinance\b/, /\bfinancial (services|planning|analyst)\b/, /\binvestment\b/,
          /\bbanking\b/, /\bwealth management\b/, /\bhedge fund\b/, /\bprivate equity\b/,
          /\bventure capital\b/, /\btrading\b/, /\bportfolio\b/, /\bcfo\b/,
          /\bfintech\b/, /\binsurance\b/, /\bunderwriting\b/,
          /\brisk (management|analyst)\b/, /\baudit\b/,
        ],
      },
      'Accounting': {
        threshold: 2,
        patterns: [
          /\baccounting\b/, /\baccountant\b/, /\bcpa\b/, /\bbookkeep/, /\bpayroll\b/,
          /\baccounts (payable|receivable)\b/, /\bgeneral ledger\b/, /\bquickbooks\b/,
          /\bfiscal\b/, /\bbalance sheet\b/, /\bfinancial statement\b/,
          /\bfp&a\b/, /\bcontroller\b/,
        ],
      },
      'Marketing': {
        threshold: 2,
        patterns: [
          /\bmarketing\b/, /\bcampaign\b/, /\bseo\b/, /\bsem\b/, /\bppc\b/,
          /\bcontent (marketing|strategy|creation)\b/, /\bbrand(ing)?\b/,
          /\bsocial media (manager|marketing|strategy)\b/, /\bgrowth (hacking|marketing)\b/,
          /\bemail marketing\b/, /\bmarketing automation\b/, /\bhubspot\b/,
          /\bmarketo\b/, /\bdemand generation\b/, /\bproduct marketing\b/,
          /\bcmo\b/, /\bgo.?to.?market\b/, /\bcustomer acquisition\b/,
        ],
      },
      'Creative & Design': {
        threshold: 2,
        patterns: [
          /\bgraphic design\b/, /\bart direct/, /\bux\b/, /\bui\b/, /\buser experience\b/,
          /\buser interface\b/, /\bvisual design\b/, /\bmotion (design|graphic)\b/,
          /\billustrat/, /\bphotograph/, /\bvideograph/, /\bvideo (production|editing)\b/,
          /\bcreative direct/, /\bbrand design\b/, /\btypography\b/, /\bfigma\b/,
          /\badobe (creative|photoshop|illustrator|indesign|premiere)\b/,
          /\bafter effects\b/, /\banimati/,
        ],
      },
      'Media & Communications': {
        threshold: 3,
        patterns: [
          /\bjournalism\b/, /\breport(er|ing)\b/, /\bnews(room)?\b/, /\bbroad?cast\b/,
          /\bpublic relations\b/, /\bpr manager\b/, /\bcopywriting\b/,
          /\bcopywriter\b/, /\beditorial\b/, /\bpublish(ing|er)\b/, /\bmedia (company|relations)\b/,
          /\bpodcast\b/, /\bstreaming\b/, /\bdigital media\b/, /\bcontent (producer|writer)\b/,
        ],
      },
      'Arts & Culture': {
        threshold: 2,
        patterns: [
          /\bmuseum\b/, /\bgallery\b/, /\bperforming arts\b/, /\btheat(er|re)\b/,
          /\borchestra\b/, /\barts (organization|council|center)\b/, /\bcurator\b/,
          /\bexhibit\b/, /\bcultural (institution|center)\b/, /\bfilm (festival|industry)\b/,
          /\bmusic (industry|production|venue)\b/, /\bdance company\b/, /\bopera\b/,
        ],
      },
      'Government': {
        threshold: 2,
        patterns: [
          /\bgovernment\b/, /\bfederal (agency|government|contractor)\b/, /\bstate agency\b/,
          /\bmunicipal\b/, /\bpublic sector\b/, /\bcivil service\b/, /\bsecurity clearance\b/,
          /\bdepartment of\b/, /\blaw enforcement\b/, /\bmilitary\b/, /\bdefense (contractor|industry)\b/,
          /\bintelligence (agency|community)\b/, /\bnsa\b/, /\bdod\b/, /\bfbi\b/,
        ],
      },
      'Legal': {
        threshold: 2,
        patterns: [
          /\battorney\b/, /\blawyer\b/, /\blaw firm\b/, /\bparalegal\b/,
          /\blegal (counsel|services|affairs|operations)\b/, /\bcompliance (officer|manager)\b/,
          /\bregulatory (affairs|compliance)\b/, /\bintellectual property\b/,
          /\bcontract (law|review|management)\b/,
          /\blitigat/, /\bjuris\b/, /\bbar (exam|association|admitted)\b/,
        ],
      },
      'Retail': {
        threshold: 2,
        patterns: [
          /\bretail\b/, /\bstore (manager|associate|operations)\b/, /\bmerchandis/,
          /\binventory management\b/, /\bpoint of sale\b/, /\bpos system\b/, /\be.?commerce\b/,
          /\bsales associate\b/, /\bvisual merchandis/, /\bbuyer\b/, /\bcategory management\b/,
        ],
      },
      'Hospitality': {
        threshold: 2,
        patterns: [
          /\bhotel\b/, /\brestaurant\b/, /\bhospitality\b/, /\bfood (and|&) beverage\b/,
          /\bculinary\b/, /\bchef\b/, /\bcatering\b/, /\bfront desk\b/,
          /\bguest (services|experience)\b/,
          /\bevents? (management|coordinator|planning)\b/, /\btourism\b/,
        ],
      },
      'Manufacturing': {
        threshold: 2,
        patterns: [
          /\bmanufacturing\b/, /\bproduction (line|floor|manager)\b/, /\bassembly\b/,
          /\bquality (assurance|control|engineer)\b/, /\blean (manufacturing|six sigma)\b/,
          /\bsupply chain\b/, /\blogistic\b/, /\bwarehouse\b/,
          /\bindustrial engineer/, /\bcnc\b/, /\bfabrication\b/,
        ],
      },
      'Games': {
        threshold: 2,
        patterns: [
          // Publishers & studios — user-specified
          /\bnintendo\b/, /\bcapcom\b/, /\bsquare[\s-]enix\b/, /\bkonami\b/,
          /\bdevolver( digital)?\b/, /\bmega cat\b/, /\bubisoft\b/,
          /\belectronic arts\b/, /\bea (games|sports|mobile)\b/,
          /\bunity technologies\b/,  /\bvalve\b/,
          // Major western publishers & studios
          /\bactivision\b/, /\bblizzard\b/, /\btake.?two\b/, /\b2k games\b/,
          /\brockstar games\b/, /\bbethesda\b/, /\bid software\b/,
          /\bcd projekt\b/, /\bparadox interactive\b/, /\bgearbox\b/,
          /\brespawn\b/, /\bobsidian( entertainment)?\b/, /\bdouble fine\b/,
          /\binsomniac games\b/, /\bnaughty dog\b/, /\btreyarch\b/,
          /\binfinity ward\b/, /\bharmonix\b/, /\bschell games\b/,
          /\biron galaxy\b/, /\bpeople can fly\b/, /\b11 bit studios\b/,
          // Japanese publishers & studios
          /\bbandai[\s-]namco\b/, /\bsega\b/, /\batlus\b/, /\bfromsoftware\b/,
          /\bncsoft\b/, /\bhoyo(verse)?\b/, /\bmihoyo\b/,
          // Online / platform
          /\briot games\b/, /\bepic games\b/, /\bbungie\b/,
          // Notable indie publishers & studios
          /\bannapurna interactive\b/, /\braw fury\b/, /\bteam17\b/,
          /\bchucklefish\b/, /\btinybuild\b/, /\bprivate division\b/,
          /\bdevolver\b/, /\blarian( studios)?\b/, /\bsupergiant\b/,
          /\bklei( entertainment)?\b/, /\byacht club games\b/,
          /\bteam cherry\b/, /\binnersloth\b/, /\bhopoo\b/,
          /\bfocus (home|entertainment)\b/, /\bnacon\b/, /\bthq nordic\b/,
          /\bwarhorse studios\b/, /\bfatshark\b/,
          // Generic game industry terms
          /\bvideo\s*game(s)?\b/, /\bgame\s*develop(er|ment)\b/,
          /\bgame\s*design(er)?\b/, /\blevel\s*design(er)?\b/,
          /\bgame\s*(studio|studios|publisher)\b/, /\bgame\s*engine\b/,
          /\bgameplay\b/, /\besports?\b/, /\bindie\s*game(s|dev)?\b/,
          /\bunreal\s*engine\b/, /\bgodot\b/, /\bgame\s*(qa|tester|testing)\b/,
          /\bnarrative\s*design(er)?\b/, /\bgames\b/,
        ],
      },
      'Real Estate': {
        threshold: 2,
        patterns: [
          /\breal estate\b/, /\bproperty (management|manager|developer)\b/,
          /\bleasing\b/, /\bmortgage\b/,
          /\bcommercial (real estate|property)\b/, /\bresidential (real estate|sales)\b/,
          /\bbroker(age)?\b/, /\bappraisal\b/, /\bproptech\b/,
        ],
      },
    };

    const matched = [];
    for (const [industry, { threshold, patterns }] of Object.entries(INDUSTRY_SIGNALS)) {
      const score = patterns.reduce((n, re) => n + (re.test(corpus) ? 1 : 0), 0);
      if (score >= threshold) matched.push({ industry, score });
    }

    // Sort by score descending, cap at 3 to avoid noise
    matched.sort((a, b) => b.score - a.score);
    return matched.slice(0, 3).map(m => m.industry);
  }

  // Infer Comp Type from description text
  function inferCompType(description) {
    if (!description) return 'Base';
    const t = description.toLowerCase();
    // Hourly — check first since hourly roles sometimes mention bonuses too
    if (
      /\$[\d,.]+\s*\/\s*h(r|our)/.test(t) ||
      /\bper\s+hour\b/.test(t) ||
      /\bhourly\s+(rate|pay|wage|compensation)\b/.test(t) ||
      /\bhourly\b/.test(t)
    ) return 'Hourly';

    // OTE — on-target earnings / variable-heavy
    if (
      /\bote\b/.test(t) ||
      /\bon.?target\s+earnings\b/.test(t) ||
      /\bvariable\s+comp(ensation)?\b/.test(t) ||
      /\bcommission.based\b/.test(t) ||
      /\buncapped\s+(commission|earning)\b/.test(t)
    ) return 'OTE';

    // Base+Bonus
    if (
      /\bbase\s+(salary\s+)?(\+|plus|and)\s+bonus\b/.test(t) ||
      /\bbonus\s+(eligible|potential|opportunity|plan)\b/.test(t) ||
      /\bannual\s+(performance\s+)?bonus\b/.test(t) ||
      /\bperformance[\s-]based\s+bonus\b/.test(t) ||
      /\bdiscretionary\s+bonus\b/.test(t) ||
      /\+\s*bonus\b/.test(t) ||
      /\+\s*equity\b/.test(t)
    ) return 'Base+Bonus';

    // Per Diem
    if (/\bper\s+diem\b/.test(t)) return 'Per Diem';

    // Default
    return 'Base';
  }

  function extractSalaryFromLD(j) {
    const base = j.baseSalary || j.estimatedSalary;
    if (!base) return '';
    const val = base.value;
    if (!val) return '';
    if (val.minValue && val.maxValue) return `${val.minValue}–${val.maxValue}`;
    if (val.value) return String(val.value);
    return '';
  }

  function mapEmploymentType(raw) {
    const s = raw.toUpperCase();
    // Check for Temporary/Contract first since they may appear alongside Full-Time
    if (s.includes('TEMP')) return 'Temporary';
    if (s.includes('CONTRACT') || s.includes('CONTRACTOR')) return 'Contract';
    if (s.includes('FULL')) return 'Full-Time';
    if (s.includes('PART')) return 'Part-Time';
    return '';
  }

  function getText(selectors) {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.textContent.trim()) return el.textContent.trim();
    }
    return '';
  }

  function stripHtml(html) {
    if (!html || typeof html !== 'string') return '';
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      // Convert ordered lists to "1. " numbered items
      doc.querySelectorAll('ol').forEach(ol => {
        let n = 1;
        ol.querySelectorAll(':scope > li').forEach(li => {
          li.insertAdjacentText('beforebegin', '\n');
          li.insertAdjacentText('afterbegin', `${n++}. `);
        });
      });
      // Convert unordered lists to "• " bullet items
      doc.querySelectorAll('ul').forEach(ul => {
        ul.querySelectorAll(':scope > li').forEach(li => {
          li.insertAdjacentText('beforebegin', '\n');
          li.insertAdjacentText('afterbegin', '• ');
        });
      });
      // Unwrap <p> directly inside <li> so the bullet prefix stays on the same line as content
      // (some sites wrap each <li>'s text in a <p>, which would otherwise split "• " onto its own line)
      doc.querySelectorAll('li > p').forEach(p => {
        while (p.firstChild) p.parentNode.insertBefore(p.firstChild, p);
        p.remove();
      });
      // Insert newlines before remaining block elements
      doc.querySelectorAll('p,br,div,h1,h2,h3,h4,h5,h6').forEach(el => {
        el.insertAdjacentText('beforebegin', '\n');
      });
      return doc.body.textContent.replace(/\n{3,}/g, '\n\n').trim();
    } catch (e) {
      return html.replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    }
  }

  // Extract key→value pairs from common labeled field patterns on job pages
  function extractLabeledFields() {
    const fields = {};

    const set = (key, val, overwrite = false) => {
      const k = key.replace(/[:\s]+$/, '').trim().toLowerCase();
      const v = val.trim();
      if (k && v && (overwrite || !fields[k])) fields[k] = v;
    };

    // Pattern 2: <dt>Label</dt><dd>Value</dd> definition lists
    document.querySelectorAll('dt').forEach(dt => {
      const dd = dt.nextElementSibling;
      if (dd && dd.tagName.toLowerCase() === 'dd') {
        set(dt.textContent, dd.textContent);
      }
    });

    // Pattern 3: elements with label-like classes paired with value siblings
    document.querySelectorAll('[class*="label"],[class*="Label"],[class*="field-name"],[class*="fieldName"]').forEach(el => {
      const sibling = el.nextElementSibling;
      if (sibling) set(el.textContent, sibling.textContent);
    });

    // Pattern 3b: <h3>Label</h3><span>Value</span> siblings (Nintendo/Phenom-style)
    document.querySelectorAll('h3').forEach(h3 => {
      const key = h3.textContent.trim();
      if (!key || key.length > 40) return;
      const next = h3.nextElementSibling;
      if (next && ['span', 'p', 'div'].includes(next.tagName.toLowerCase())) {
        set(key, next.textContent);
      }
    });

    // Pattern 4: data-* attribute labels (some React-based pages)
    document.querySelectorAll('[data-label],[data-field-label]').forEach(el => {
      const key = el.getAttribute('data-label') || el.getAttribute('data-field-label');
      if (key) set(key, el.textContent);
    });

    // Pattern 5: two sibling <p> elements inside a flex container (BambooHR)
    // Structure: <div><div><p>Label</p></div><div><p>Value</p></div></div>
    document.querySelectorAll('p[data-fabric-component="BodyText"], p[class*="fabric-v3bc9l"]').forEach(labelEl => {
      const labelBox = labelEl.parentElement;
      if (!labelBox) return;
      const valueBox = labelBox.nextElementSibling;
      if (!valueBox) return;
      const valueEl = valueBox.querySelector('p');
      if (valueEl) set(labelEl.textContent, valueEl.textContent, true);
    });
    document.querySelectorAll('strong, b').forEach(el => {
      const key = el.textContent.replace(/:$/, '').trim();
      if (!key || key.length > 40) return;
      let value = '';
      let node = el.nextSibling;
      while (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          value += node.textContent;
          break;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName.toLowerCase();
          if (['strong', 'b', 'br', 'p', 'div', 'li'].includes(tag)) break;
          value += node.textContent;
          break;
        }
        node = node.nextSibling;
      }
      if (value.trim()) set(key, value, true); // overwrite = true
    });

    return fields;
  }

  // ─── Page Highlighting ───────────────────────────────────────────────────────
  // Each entry: { src: regex source string, flags: string, cls: CSS class }
  // Using src+flags (not /regex/ literals) avoids stale lastIndex across calls.
  const HIGHLIGHT_RULES = [
    // Yellow — Salary Range  ($£€¥￥₩₹)
    { src: String.raw`[$£€¥￥₩₹][\d,]+(?:\.\d+)?(?:\/(?:yr|year|hr|hour|wk|week|mo|month))?\s*(?:–|-|—|to)\s*[$£€¥￥₩₹]?[\d,]+(?:\.\d+)?(?:\/(?:yr|year|hr|hour|wk|week|mo|month))?`, flags: 'gi', cls: 'jdg-hl-yellow' },
    { src: String.raw`\bbetween\s+[$£€¥￥₩₹][\d,]+(?:\.\d+)?\s+and\s+[$£€¥￥₩₹][\d,]+(?:\.\d+)?`, flags: 'gi', cls: 'jdg-hl-yellow' },
    { src: String.raw`[$£€¥￥₩₹][\d,]+(?:\.\d+)?\/(?:yr|year|hr|hour|wk|week|mo|month)\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    // Yellow — Remote Policy
    { src: String.raw`\b(?:fully\s+remote|100%\s*remote|remote[\s-]only|work\s+(?:fully\s+)?remotely)\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    { src: String.raw`\bhybrid\s*(?:work|schedule|model|role|position|arrangement)?\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    { src: String.raw`\b(?:on[\s-]?site|in[\s-]?office)\s*(?:only|required)?\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    // Yellow — FT/PT/C/T
    { src: String.raw`\bfull[- ]?time\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    { src: String.raw`\bpart[- ]?time\b`, flags: 'gi', cls: 'jdg-hl-yellow' },
    // Green — Hrs/Wk
    { src: String.raw`\b\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*(?:hours?|hrs?)\s*(?:per\s*week|\/\s*(?:week|wk))\b`, flags: 'gi', cls: 'jdg-hl-green' },
    // Green — Comp Type
    { src: String.raw`\b(?:on[\s-]?target\s+earnings?|ote)\b`, flags: 'gi', cls: 'jdg-hl-green' },
    { src: String.raw`\b(?:commission[\s-]?based|uncapped\s+commission)\b`, flags: 'gi', cls: 'jdg-hl-green' },
    { src: String.raw`\bper\s+diem\b`, flags: 'gi', cls: 'jdg-hl-green' },
    { src: String.raw`\bhourly\s+(?:rate|pay|wage|compensation)\b`, flags: 'gi', cls: 'jdg-hl-green' },
    { src: String.raw`\bbase\s+(?:salary\s+)?(?:\+|plus|and)\s+(?:bonus|equity)\b`, flags: 'gi', cls: 'jdg-hl-green' },
    // Green — Shift / Hours
    { src: String.raw`\b\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)\s*(?:–|-|to)\s*\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)`, flags: 'gi', cls: 'jdg-hl-green' },
    { src: String.raw`\b(?:day|night|morning|evening|overnight|first|second|third|swing)\s+shift\b`, flags: 'gi', cls: 'jdg-hl-green' },
  ];

  function _highlightInTextNode(textNode) {
    const text = textNode.textContent;
    const matches = [];

    for (const { src, flags, cls } of HIGHLIGHT_RULES) {
      const re = new RegExp(src, flags);
      let m;
      while ((m = re.exec(text)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, cls });
      }
    }

    if (!matches.length) return;

    matches.sort((a, b) => a.start - b.start);
    // Remove overlapping matches (keep first)
    const kept = [];
    let lastEnd = 0;
    for (const m of matches) {
      if (m.start >= lastEnd) { kept.push(m); lastEnd = m.end; }
    }

    const frag = document.createDocumentFragment();
    let pos = 0;
    for (const m of kept) {
      if (m.start > pos) frag.appendChild(document.createTextNode(text.slice(pos, m.start)));
      const span = document.createElement('mark');
      span.className = `jdg-hl ${m.cls}`;
      span.textContent = text.slice(m.start, m.end);
      frag.appendChild(span);
      pos = m.end;
    }
    if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));

    textNode.parentNode.replaceChild(frag, textNode);
  }

  function applyHighlights() {
    applyHighlightColors();
    removeHighlights();
    if (!getHighlightEnabled()) return;

    const JDG_IDS = new Set(['jdg-panel','jdg-overlay','jdg-site-overlay','jdg-settings-overlay']);
    const SKIP_TAGS = new Set(['script','style','noscript','input','textarea','select','mark']);

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const el = node.parentElement;
          if (!el) return NodeFilter.FILTER_REJECT;
          if (SKIP_TAGS.has(el.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
          // Skip any JDG UI element
          if (el.closest('[id^="jdg-"]')) return NodeFilter.FILTER_REJECT;
          if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const node of nodes) _highlightInTextNode(node);
  }

  function removeHighlights() {
    document.querySelectorAll('mark.jdg-hl').forEach(span => {
      span.replaceWith(document.createTextNode(span.textContent));
    });
  }

  // ─── Section Extraction ───────────────────────────────────────────────────────
  // Parses Responsibilities and Requirements bullet lists from plain-text description.
  // Education bullets are prepended to Requirements.
  function extractDescriptionSections(text) {
    if (!text) return { responsibilities: '', requirements: '' };

    // Normalize smart/curly apostrophes and quotes to plain ASCII so regexes match reliably
    const norm = s => s.replace(/[\u2018\u2019\u201b\u02bc]/g, "'").replace(/[\u201c\u201d]/g, '"');

    // A bullet line starts with a recognized bullet character or a digit-dot/paren list marker.
    // Includes plain hyphen (-) for markdown-style lists from ld+json descriptions.
    const isBulletLine = s => /^[•·*–—▪▸►✓✗✦◦-]\s/.test(s) || /^\d+[.)]\s/.test(s);

    // A heading-like line is short, not a bullet, not sentence-ending, not a quantity phrase.
    const isHeading = s =>
      s.length <= 80 &&
      !isBulletLine(s) &&
      !/[.!?,;]$/.test(s) &&
      s.split(/\s+/).length <= 8 &&
      !/\d+\+?\s*(years?|months?|yrs?)\b/i.test(s);

    const RESP_RE = /^(responsibilities|what (you('ll|'d| will) do|you('re)? ?(going to )?doing|you'd be doing)|your (role|responsibilities)|key responsibilities|day[\s-]to[\s-]day|job duties|job description|duties( (and|&) responsibilities)?|about the role|in this role( you will)?|role overview|(primary|core|essential|main|key) (responsibilities|duties|functions)|position responsibilities|you will be responsible for|what does the job involve|the role|role (and|&) responsibilities)[\s:]*$/i;

    const REQ_RE = /^(requirements|qualifications|what (we('re| are) looking for|you('ll| will) (need|bring|offer)|you need|you('ll| will)? (bring|offer)|you should have|you have)|must.?haves?|(minimum|basic|required|preferred|desired|nice.to.have) (qualifications|skills|requirements)|preferred skills|about you|skills (and|&) experience|required skills|experience required|we('d| would) love to hear from you.*|work experience|what you should have|who you are|your background|(the )?ideal candidate.*|you bring|what you bring|technical (requirements|skills|qualifications)|we('re| are) looking for|knowledge (and|&) skills|education (and|&) experience)[\s:]*$/i;

    const EDU_RE = /^(education(al)?( requirements| background| qualifications| experience)?|degree (requirements|preferred|required|qualifications)|academic (requirements|background|qualifications)|certifications? (and|&) education)[\s:]*$/i;

    const BEN_RE = /^(benefits?( (and|&) (compensation|perks?))?|perks?( (and|&) benefits?)?|compensation (and|&) benefits?|what (we('re| are) offering|we offer|you('ll| will) get|to expect)|we('re| are)? offering|we offer|our benefits?|our perks?|total rewards?|employee benefits?|why (work here|work with us|join us|us))[\s:]*$/i;

    const stripBullet = s => s.replace(/^[•·*–—▪▸►✓✗✦◦-]\s*/, '').replace(/^\d+[.)]\s*/, '').trim();

    const lines = text.split('\n').map(l => norm(l.trim()));
    let section = null;
    let pendingBullet = false;
    const resp = [], req = [], edu = [], ben = [];

    const pushItem = (item) => {
      if (!item || !section) return;
      if (section === 'resp') resp.push(item);
      else if (section === 'req') req.push(item);
      else if (section === 'edu') edu.push(item);
      else if (section === 'ben') ben.push(item);
    };

    for (const line of lines) {
      if (!line) continue;
      if (RESP_RE.test(line)) { section = 'resp'; pendingBullet = false; continue; }
      if (REQ_RE.test(line))  { section = 'req';  pendingBullet = false; continue; }
      if (EDU_RE.test(line))  { section = 'edu';  pendingBullet = false; continue; }
      if (BEN_RE.test(line))  { section = 'ben';  pendingBullet = false; continue; }
      // Any unrecognized heading-like line ends the current section
      if (isHeading(line))    { section = null;   pendingBullet = false; continue; }
      if (!section) { pendingBullet = false; continue; }
      // Standalone bullet marker on its own line (e.g. "•" with no content following)
      if (/^[•·*–—▪▸►✓✗✦◦-]$/.test(line)) { pendingBullet = true; continue; }
      // Standard bullet + content on same line
      if (isBulletLine(line)) {
        pendingBullet = false;
        pushItem(stripBullet(line));
        continue;
      }
      // Content line following a standalone bullet marker
      if (pendingBullet) {
        pendingBullet = false;
        pushItem(line);
        continue;
      }
    }

    const fmt = arr => arr.map(s => `• ${s}`).join('\n');
    return {
      responsibilities: fmt(resp),
      requirements:     fmt([...edu, ...req]),
      benefits:         fmt(ben),
    };
  }

  function formatAsText(data) {
    return [
      `Position:    ${data.position}`,
      `Employer:    ${data.employer}`,
      `Location:    ${data.location}`,
      `Remote:      ${data.remotePolicy}`,
      `Type:        ${data.ftPtCT}`,
      `Salary:      ${data.salaryRange}`,
      `Comp Type:   ${data.compType}`,
      `Hrs/Wk:      ${data.hrsWk}`,
      `Industry:    ${data.industries.join(', ')}`,
      `Channel:     ${data.channel}`,
      `Job Ref #:   ${data.jobRefNum}`,
      `Contact:     ${data.contact}`,
      `Title:       ${data.contactTitle}`,
      `Phone/Email: ${data.phoneEmail}`,
      `Status:      ${data.status}`,
      `URL:         ${data.url}`,
      ``,
      `── Description ──`,
      ``,
      data.description,
      ``,
      ...(data.responsibilities ? [`── Responsibilities ──`, ``, data.responsibilities, ``] : []),
      ...(data.requirements     ? [`── Requirements ──`,     ``, data.requirements,     ``] : []),
      ...(data.benefits         ? [`── Benefits ──`,         ``, data.benefits,         ``] : []),
    ].join('\n');
  }

  // ─── Floating Panel ───────────────────────────────────────────────────────────
  function buildPanel() {
    const existing = document.getElementById('jdg-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'jdg-panel';
    const pos = getPosition();
    panel.className = `pos-${pos}`;

    const buttons = [
      { emoji: '📋', label: 'Copy to Clipboard', action: doCopy },
      { emoji: '🗄️', label: 'Save to TXT',       action: doSaveTxt },
      { emoji: '🧩', label: 'Send to Coda',       action: doShowCodaModal },
      { emoji: '🌐', label: 'Site Matching',      action: doShowSiteModal },
      { emoji: '⚙️', label: 'Settings',           action: doShowSettings },
    ];

    const isLeft = pos.includes('left');
    const orderedButtons = isLeft ? [...buttons].reverse() : buttons;

    orderedButtons.forEach(({ emoji, label, action }) => {
      const btn = document.createElement('button');
      btn.className = 'jdg-pill';
      btn.innerHTML = `${emoji}<span class="jdg-tooltip">${label}</span>`;
      btn.addEventListener('click', action);
      panel.appendChild(btn);
    });

    document.body.appendChild(panel);
    updateGrabIndicator();
    registerShortcut();
    applyHighlights();
    // Re-apply after delays to catch content that loads dynamically after panel init
    setTimeout(() => { if (getHighlightEnabled()) applyHighlights(); }, 1200);
    setTimeout(() => { if (getHighlightEnabled()) applyHighlights(); }, 3000);
  }

  // ─── Shortcut ─────────────────────────────────────────────────────────────────
  let shortcutHandler = null;
  function registerShortcut() {
    if (shortcutHandler) document.removeEventListener('keydown', shortcutHandler);
    const sc = getShortcut();
    if (!sc) return;
    shortcutHandler = (e) => {
      if (matchesShortcut(e, sc)) {
        e.preventDefault();
        doShowCodaModal();
      }
    };
    document.addEventListener('keydown', shortcutHandler);
  }

  function matchesShortcut(e, sc) {
    const parts = sc.toLowerCase().split('+');
    const key = parts[parts.length - 1];
    const ctrl  = parts.includes('ctrl')  === e.ctrlKey;
    const alt   = parts.includes('alt')   === e.altKey;
    const shift = parts.includes('shift') === e.shiftKey;
    const meta  = parts.includes('meta')  === e.metaKey;
    return ctrl && alt && shift && meta && e.key.toLowerCase() === key;
  }

  function recordShortcut(inputEl) {
    inputEl.value = 'Press keys…';
    inputEl.classList.add('recording');
    inputEl.readOnly = true;

    const handler = (e) => {
      e.preventDefault();
      const parts = [];
      if (e.metaKey)  parts.push('meta');
      if (e.ctrlKey)  parts.push('ctrl');
      if (e.altKey)   parts.push('alt');
      if (e.shiftKey) parts.push('shift');
      const key = e.key.toLowerCase();
      const isModifier = ['meta','control','alt','shift'].includes(key);
      if (!isModifier) parts.push(key);
      if (!isModifier && parts.length > 1) {
        const combo = parts.join('+');
        inputEl.value = combo;
        inputEl.classList.remove('recording');
        GM_setValue('shortcut', combo);
        registerShortcut();
        document.removeEventListener('keydown', handler);
        inputEl.readOnly = false;
      }
    };
    document.addEventListener('keydown', handler);
  }

  // ─── Copy ─────────────────────────────────────────────────────────────────────
  function doCopy() {
    const data = extractJobData();
    const text = formatAsText(data);
    navigator.clipboard.writeText(text).then(() => {
      flashPill(0, '✅');
      markUrlGrabbed();
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      flashPill(0, '✅');
      markUrlGrabbed();
    });
  }

  // ─── Save TXT ─────────────────────────────────────────────────────────────────
  function doSaveTxt() {
    const data = extractJobData();
    const text = formatAsText(data);
    const slug = (data.position || 'job').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 40);
    const filename = `${slug}-${Date.now()}.txt`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    flashPill(1, '✅');
    markUrlGrabbed();
  }

  function flashPill(logicalIndex, symbol) {
    const pills = [...document.querySelectorAll('.jdg-pill:not(.jdg-grab-indicator)')];
    const isLeft = getPosition().includes('left');
    const actualIndex = isLeft ? (pills.length - 1 - logicalIndex) : logicalIndex;
    if (!pills[actualIndex]) return;
    const orig = pills[actualIndex].childNodes[0].textContent;
    pills[actualIndex].childNodes[0].textContent = symbol;
    setTimeout(() => { pills[actualIndex].childNodes[0].textContent = orig; }, 1500);
  }

  // ─── Coda Modal ───────────────────────────────────────────────────────────────
  // Persist last extracted data so reopening restores state
  let _lastExtractedData = null;
  let _lastModalState    = null; // preserves user edits across accidental dismissals

  // For SPA pages, attempt a delayed re-extraction and refresh modal if data improved
  function tryDelayedExtraction(onImproved) {
    setTimeout(() => {
      const fresh = extractJobData();
      const current = _lastExtractedData;
      // Check if the fresh extraction has meaningfully more data
      const score = (d) => [d.ftPtCT, d.salaryRange, d.compType, d.shiftHours, d.jobRefNum, d.location]
        .filter(v => v && v.trim()).length;
      if (score(fresh) > score(current)) {
        _lastExtractedData = fresh;
        onImproved(fresh);
      }
    }, 1200);
  }

  function doShowCodaModal() {
    // If modal already open, just focus it
    if (document.getElementById('jdg-overlay')) return;

    // Prefer saved modal edits, then cached extraction, then fresh extraction
    const usedSavedState = !!_lastModalState;
    const data = _lastModalState || _lastExtractedData || extractJobData();
    if (!usedSavedState) _lastExtractedData = data;

    const industries = getIndustries();

    const overlay = document.createElement('div');
    overlay.id = 'jdg-overlay';
    // No background dim — modal floats freely over the page
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;';

    const modal = document.createElement('div');
    modal.id = 'jdg-modal';
    // Position top-right by default, pointer-events re-enabled on modal itself
    modal.style.cssText = 'position:fixed;top:60px;right:24px;pointer-events:all;cursor:default;';

    modal.innerHTML = `
      <button class="jdg-close-btn" id="jdg-modal-close">✕</button>
      <button class="jdg-refresh-btn" id="jdg-modal-refresh" title="Re-extract from page" style="position:absolute;top:14px;right:40px;background:none;border:none;font-size:14px;cursor:pointer;color:#aaa;line-height:1;">↺</button>
      <div class="jdg-drag-handle" id="jdg-drag-handle" style="position:absolute;top:0;left:0;right:48px;height:36px;cursor:grab;border-radius:12px 0 0 0;"></div>
      <div id="jdg-modal-body">
      <div class="jdg-grid">

        <div class="jdg-group"><span class="jdg-group-label">Role</span><span class="jdg-group-line"></span></div>
        ${field('position',     'Position',      'input', data.position)}
        ${field('employer',     'Employer',      'input', data.employer)}
        ${field('location',     'Location',      'input', data.location)}
        ${selectField('remotePolicy', 'Remote Policy', REMOTE_OPTIONS, data.remotePolicy)}
        ${selectField('ftPtCT', 'FT/PT/C/T',    FTPT_OPTIONS, data.ftPtCT)}
        ${field('hrsWk',        'Hrs/Wk',        'input', data.hrsWk, 'number')}
        ${field('salaryRange',  'Salary Range',  'input', data.salaryRange)}
        ${selectField('compType', 'Comp Type',   COMPTYPE_OPTIONS, data.compType)}
        ${field('shiftHours',   'Shift',         'input', data.shiftHours)}
        <div class="jdg-field" id="jdg-industries-wrap">
          <label>Industry(s)</label>
          <div id="jdg-multisel" class="jdg-multisel" tabindex="0"></div>
        </div>

        <div class="jdg-group"><span class="jdg-group-label">Listing</span><span class="jdg-group-line"></span></div>
        <div class="jdg-field full"><label>URL</label><input id="jdg-f-url" type="text" value="${escHtml(data.url)}"></div>
        ${selectField('channel', 'Channel',      getChannelOptions(), data.channel)}
        ${field('jobRefNum',    'Job Ref #',     'input', data.jobRefNum)}

        <div class="jdg-group"><span class="jdg-group-label">Addt'l Info</span><span class="jdg-group-line"></span></div>
        ${field('contact',      'Contact',       'input', data.contact)}
        ${field('phoneEmail',   'Phone/Email',   'input', data.phoneEmail)}

        <div class="jdg-field">
          <label>Interest (1–5)</label>
          <div class="jdg-interest-wrap">
            <input type="range" id="jdg-interest" min="1" max="5" step="1" value="${data.interest}">
            <span class="jdg-interest-val" id="jdg-interest-val">${data.interest}</span>
          </div>
        </div>
        ${selectField('connectionStrength', 'Connection Strength', CONNSTR_OPTIONS, data.connectionStrength)}

        <div class="jdg-group"><span class="jdg-group-label">Description</span><span class="jdg-group-line"></span><button id="jdg-desc-edit-btn" style="margin-left:8px;padding:1px 8px;font-size:11px;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;color:#555;flex-shrink:0;">Edit</button></div>
        <div class="jdg-field full">
          <div class="jdg-desc-preview" id="jdg-desc-preview" style="max-height:1.6em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${escHtml(data.description.slice(0, 200))}</div>
          <textarea id="jdg-f-description" style="display:none;width:100%;min-height:180px;font-size:12px;font-family:inherit;border:1px solid #ccc;border-radius:6px;padding:8px 10px;box-sizing:border-box;resize:vertical;">${escHtml(data.description)}</textarea>
        </div>
        <div class="jdg-field full"><label>Responsibilities</label><textarea id="jdg-f-responsibilities" style="min-height:80px;font-size:12px;font-family:inherit;white-space:pre-wrap;">${escHtml(data.responsibilities)}</textarea></div>
        <div class="jdg-field full"><label>Requirements</label><textarea id="jdg-f-requirements" style="min-height:80px;font-size:12px;font-family:inherit;white-space:pre-wrap;">${escHtml(data.requirements)}</textarea></div>
        <div class="jdg-field full"><label>Benefits</label><textarea id="jdg-f-benefits" style="min-height:80px;font-size:12px;font-family:inherit;white-space:pre-wrap;">${escHtml(data.benefits)}</textarea></div>

      </div>
      </div>
      <div class="jdg-modal-footer">
        <span class="jdg-status-msg" id="jdg-status"></span>
        <button class="jdg-btn jdg-btn-cancel" id="jdg-cancel">Cancel</button>
        <button class="jdg-btn jdg-btn-send" id="jdg-send">Send to Coda <span style="opacity:0.7;font-size:0.85em;">⌘⏎</span></button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // ── Draggable ──
    const handle = modal.querySelector('#jdg-drag-handle');
    let dragOffsetX = 0, dragOffsetY = 0, dragging = false;

    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      const rect = modal.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      handle.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const x = Math.max(0, Math.min(window.innerWidth  - modal.offsetWidth,  e.clientX - dragOffsetX));
      const y = Math.max(0, Math.min(window.innerHeight - modal.offsetHeight, e.clientY - dragOffsetY));
      modal.style.left  = `${x}px`;
      modal.style.top   = `${y}px`;
      modal.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => {
      dragging = false;
      handle.style.cursor = 'grab';
    });

    // ── Multi-select industries ──
    const selectedIndustries = [...data.industries];
    buildMultiSelect(
      modal.querySelector('#jdg-multisel'),
      industries,
      selectedIndustries,
      modal
    );

    // ── Preserve edits on dismiss ──
    const saveState = () => {
      _lastModalState = { ...gatherModalData(modal, data.description, selectedIndustries) };
    };
    overlay._jdgSave = saveState;

    // ── Interest slider ──
    const slider = modal.querySelector('#jdg-interest');
    const sliderVal = modal.querySelector('#jdg-interest-val');
    slider.addEventListener('input', () => { sliderVal.textContent = slider.value; });

    // ── Description edit toggle ──
    modal.querySelector('#jdg-desc-edit-btn').addEventListener('click', () => {
      const preview = modal.querySelector('#jdg-desc-preview');
      const textarea = modal.querySelector('#jdg-f-description');
      const btn = modal.querySelector('#jdg-desc-edit-btn');
      if (textarea.style.display === 'none') {
        preview.style.display = 'none';
        textarea.style.display = '';
        btn.textContent = 'Done';
        btn.style.cssText = 'margin-left:8px;padding:1px 8px;font-size:11px;border:1px solid #4a4adf;border-radius:4px;background:#4a4adf;cursor:pointer;color:#fff;flex-shrink:0;';
      } else {
        preview.style.display = '';
        textarea.style.display = 'none';
        btn.textContent = 'Edit';
        btn.style.cssText = 'margin-left:8px;padding:1px 8px;font-size:11px;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;color:#555;flex-shrink:0;';
      }
    });

    // ── Refresh button — re-extract fresh data ──
    modal.querySelector('#jdg-modal-refresh').addEventListener('click', () => {
      _lastExtractedData = null;
      _lastModalState = null;
      overlay.remove();
      applyHighlights();
      doShowCodaModal();
    });

    // ── SPA delayed re-extraction — fires after React/etc renders ──
    // Skip if restoring saved edits or re-using cached data
    if (!usedSavedState && (!_lastExtractedData || _lastExtractedData === data)) {
      tryDelayedExtraction((fresh) => {
        // Silently update fields that were blank and now have data
        const update = (id, val) => {
          if (!val) return;
          const el = modal.querySelector(`#jdg-f-${id}`);
          if (el && !el.value) el.value = val;
        };
        update('ftPtCT', fresh.ftPtCT);
        update('salaryRange', fresh.salaryRange);
        update('shiftHours', fresh.shiftHours);
        update('jobRefNum', fresh.jobRefNum);
        update('location', fresh.location);
        update('responsibilities', fresh.responsibilities);
        update('requirements', fresh.requirements);
        update('benefits', fresh.benefits);
        // Comp type select
        const compEl = modal.querySelector('#jdg-f-compType');
        if (compEl && !compEl.value && fresh.compType) compEl.value = fresh.compType;
        // FT/PT/C/T select
        const ftEl = modal.querySelector('#jdg-f-ftPtCT');
        if (ftEl && !ftEl.value && fresh.ftPtCT) ftEl.value = fresh.ftPtCT;
      });
    }

    // ── Close — save edits so reopening restores them ──
    const closeModal = () => { saveState(); overlay.remove(); };
    modal.querySelector('#jdg-modal-close').addEventListener('click', closeModal);
    modal.querySelector('#jdg-cancel').addEventListener('click', closeModal);
    // No overlay click-to-close — modal is now freely draggable over the page

    // ── Send ──
    const doSend = () => {
      const payload = gatherModalData(modal, data.description, selectedIndustries);
      sendToCoda(payload, modal.querySelector('#jdg-status'), modal.querySelector('#jdg-send'), overlay);
    };
    modal.querySelector('#jdg-send').addEventListener('click', doSend);

    // ⌘Enter submits when the modal is open; cleaned up whenever overlay leaves the DOM
    const cmdEnterHandler = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'Enter' || e.key === 'Return')) {
        e.preventDefault();
        doSend();
      }
    };
    document.addEventListener('keydown', cmdEnterHandler);
    new MutationObserver((_, obs) => {
      if (!document.getElementById('jdg-overlay')) {
        document.removeEventListener('keydown', cmdEnterHandler);
        obs.disconnect();
      }
    }).observe(document.body, { childList: true });
  }

  function field(id, label, tag, value = '', type = 'text') {
    if (tag === 'textarea') {
      return `<div class="jdg-field full"><label>${label}</label><textarea id="jdg-f-${id}">${escHtml(value)}</textarea></div>`;
    }
    return `<div class="jdg-field"><label>${label}</label><input id="jdg-f-${id}" type="${type}" value="${escHtml(value)}"></div>`;
  }

  function selectField(id, label, options, selected = '') {
    const opts = options.map(o =>
      `<option value="${escHtml(o)}"${o === selected ? ' selected' : ''}>${escHtml(o)}</option>`
    ).join('');
    return `<div class="jdg-field"><label>${label}</label><select id="jdg-f-${id}"><option value=""></option>${opts}</select></div>`;
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function getChannelOptions() {
    return ["LinkedIn","Indeed","Company Website","Glassdoor","ZipRecruiter",
      "Craigslist","Monster","CareerBuilder","Google Jobs","BuiltIn.com","Dice",
      "Wellfound (AngelList Talent)","Hired","Ladders","FlexJobs","We Work Remotely",
      "Remote OK","Remotive","Working Nomads","Authentic Jobs","Dribbble","Behance",
      "USAJOBS","GovernmentJobs","HigherEdJobs","Handshake","Idealist","Mediabistro",
      "CareerLink","PGH Works","PGH Tech Council","Referral","Recruiter","Networking",
      "Event / Career Fair","Cold Outreach","Alumni Network","Internal",
      "Previous Employer","Agency / Staffing Firm","Freelance / Contract Platform",
      "Discord","Slack","Email List","Social Media","GitHub","Portfolio"];
  }

  // Multi-select widget with typeahead filtering
  function buildMultiSelect(container, allOptions, selectedArr, modalEl) {
    // Build wrapper: input on top, chips below
    container.innerHTML = '';
    container.style.cursor = 'default';

    let focusedIdx = -1;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '';
    input.style.cssText = 'width:100%;border:none;outline:none;background:transparent;font-size:13px;font-family:inherit;padding:2px 4px;margin-bottom:2px;';
    container.appendChild(input);

    const chipsWrap = document.createElement('div');
    chipsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    container.appendChild(chipsWrap);

    function renderChips() {
      chipsWrap.innerHTML = '';
      selectedArr.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'jdg-chip';
        chip.innerHTML = `${escHtml(item)}<span class="jdg-chip-x" data-item="${escHtml(item)}">×</span>`;
        chip.querySelector('.jdg-chip-x').addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = selectedArr.indexOf(item);
          if (idx > -1) selectedArr.splice(idx, 1);
          renderChips();
        });
        chipsWrap.appendChild(chip);
      });
    }

    function showDropdown(filter = '') {
      document.querySelectorAll('.jdg-multisel-dropdown').forEach(d => d.remove());
      focusedIdx = -1;
      const filtered = allOptions.filter(o =>
        o.toLowerCase().includes(filter.toLowerCase())
      );
      if (!filtered.length) return;

      const dropdown = document.createElement('div');
      dropdown.className = 'jdg-multisel-dropdown';
      const rect = container.getBoundingClientRect();
      dropdown.style.top   = `${rect.bottom + 2}px`;
      dropdown.style.left  = `${rect.left}px`;
      dropdown.style.width = `${rect.width}px`;

      filtered.forEach(opt => {
        const item = document.createElement('div');
        item.className = 'jdg-multisel-option' + (selectedArr.includes(opt) ? ' selected' : '');
        item.textContent = opt;
        item.addEventListener('mousedown', (e) => {
          e.preventDefault(); // prevent input blur
          const idx = selectedArr.indexOf(opt);
          if (idx > -1) selectedArr.splice(idx, 1);
          else selectedArr.push(opt);
          renderChips();
          input.value = '';
          dropdown.remove();
          input.focus();
        });
        dropdown.appendChild(item);
      });

      document.body.appendChild(dropdown);
    }

    function moveFocus(delta) {
      const dropdown = document.querySelector('.jdg-multisel-dropdown');
      if (!dropdown) { showDropdown(input.value); return; }
      const items = dropdown.querySelectorAll('.jdg-multisel-option');
      if (!items.length) return;
      if (focusedIdx >= 0) items[focusedIdx].classList.remove('focused');
      focusedIdx = focusedIdx === -1
        ? (delta > 0 ? 0 : items.length - 1)
        : Math.max(0, Math.min(items.length - 1, focusedIdx + delta));
      items[focusedIdx].classList.add('focused');
      items[focusedIdx].scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveFocus(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === 'Enter') {
        const dropdown = document.querySelector('.jdg-multisel-dropdown');
        if (dropdown && focusedIdx >= 0) {
          e.preventDefault();
          dropdown.querySelectorAll('.jdg-multisel-option')[focusedIdx]
            ?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        }
      } else if (e.key === 'Escape') {
        document.querySelectorAll('.jdg-multisel-dropdown').forEach(d => d.remove());
      }
    });

    input.addEventListener('focus', () => showDropdown(input.value));
    input.addEventListener('input', () => showDropdown(input.value));
    input.addEventListener('blur', () => {
      setTimeout(() => document.querySelectorAll('.jdg-multisel-dropdown').forEach(d => d.remove()), 150);
    });

    renderChips();
  }

  function gatherModalData(modal, fullDescription, selectedIndustries) {
    const v = (id) => modal.querySelector(`#jdg-f-${id}`)?.value?.trim() || '';
    return {
      position:          v('position'),
      employer:          v('employer'),
      location:          v('location'),
      url:               v('url'),
      remotePolicy:      v('remotePolicy'),
      ftPtCT:            v('ftPtCT'),
      salaryRange:       v('salaryRange'),
      compType:          v('compType'),
      hrsWk:             v('hrsWk'),
      jobRefNum:         v('jobRefNum'),
      contact:           v('contact'),
      contactTitle:      v('contactTitle'),
      phoneEmail:        v('phoneEmail'),
      channel:           v('channel'),
      status:            'Considering',
      industries:        selectedIndustries,
      interest:          parseInt(modal.querySelector('#jdg-interest')?.value || '3'),
      connectionStrength: v('connectionStrength'),
      shiftHours:         v('shiftHours'),
      description:        modal.querySelector('#jdg-f-description')?.value ?? fullDescription,
      responsibilities:   v('responsibilities'),
      requirements:       v('requirements'),
      benefits:           v('benefits'),
    };
  }

  function sendToCoda(data, statusEl, sendBtn, overlay) {
    statusEl.className = 'jdg-status-msg';
    statusEl.textContent = 'Sending…';
    sendBtn.disabled = true;

    const cells = [
      { column: COL.position,      value: data.position },
      { column: COL.employer,      value: data.employer },
      { column: COL.location,      value: data.location },
      { column: COL.url,           value: data.url },
      { column: COL.description,   value: data.description },
      { column: COL.jobRefNum,     value: data.jobRefNum },
      { column: COL.contact,       value: data.contact },
      { column: COL.contactTitle,  value: data.contactTitle },
      { column: COL.phoneEmail,    value: data.phoneEmail },
      { column: COL.remotePolicy,  value: data.remotePolicy },
      { column: COL.ftPtCT,        value: data.ftPtCT },
      { column: COL.salaryRange,   value: data.salaryRange },
      { column: COL.compType,      value: data.compType },
      { column: COL.hrsWk,         value: data.hrsWk ? Number(data.hrsWk) : null },
      { column: COL.channel,       value: data.channel },
      { column: COL.status,        value: data.status },
      { column: COL.interest,      value: data.interest },
      { column: COL.connectionStr,    value: data.connectionStrength },
      { column: COL.shiftHours,       value: data.shiftHours },
      { column: COL.responsibilities, value: data.responsibilities },
      { column: COL.requirements,     value: data.requirements },
      { column: COL.benefits,         value: data.benefits },
    ];

    if (data.industries && data.industries.length > 0) {
      cells.push({ column: COL.industries, value: data.industries });
    }

    const body = JSON.stringify({ rows: [{ cells: cells.filter(c => c.value !== null && c.value !== '') }] });

    GM_xmlhttpRequest({
      method: 'POST',
      url: CODA_API,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      data: body,
      onload: (res) => {
        if (res.status === 202 || res.status === 200) {
          statusEl.className = 'jdg-status-msg success';
          statusEl.textContent = '✓ Added to Coda!';
          flashPill(2, '✅');
          markUrlGrabbed();
          _lastModalState = null;
          setTimeout(() => overlay.remove(), 1200);
        } else {
          statusEl.className = 'jdg-status-msg error';
          statusEl.textContent = `Error ${res.status}: ${res.responseText.slice(0, 80)}`;
          sendBtn.disabled = false;
        }
      },
      onerror: () => {
        statusEl.className = 'jdg-status-msg error';
        statusEl.textContent = 'Network error. Check token and connection.';
        sendBtn.disabled = false;
      },
    });
  }

  // ─── Site Matching Modal ─────────────────────────────────────────────────────
  function doShowSiteModal() {
    if (document.getElementById('jdg-site-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'jdg-site-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;';

    const modal = document.createElement('div');
    modal.id = 'jdg-modal';
    modal.style.cssText = 'position:fixed;top:60px;right:24px;pointer-events:all;max-width:480px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;cursor:default;';

    const domains       = getDomains();
    const patterns      = getPatterns();
    const domainInds    = getDomainIndustries();
    const industries    = getIndustries();
    const suggestedDomain = location.hostname.replace(/^www\./, '');

    const indOptions = industries.map(i => `<option value="${escHtml(i)}">${escHtml(i)}</option>`).join('');

    modal.innerHTML = `
      <button class="jdg-close-btn" id="jdg-site-close" style="pointer-events:all;z-index:1;">✕</button>
      <div class="jdg-site-header">
        <div class="jdg-site-header-row">
          <span class="jdg-site-header-label">+ Domain</span>
          <input type="text" id="jdg-domain-quick" value="${escHtml(suggestedDomain)}" placeholder="e.g. bamboohr.com" class="jdg-site-quick-input">
          <button class="jdg-btn-sm jdg-btn-add" id="jdg-domain-quick-add">Add</button>
        </div>
        <div class="jdg-site-header-row" style="margin-top:6px;">
          <span class="jdg-site-header-label">+ Pattern</span>
          <input type="text" id="jdg-pattern-quick" placeholder="/path/ or subdomain." class="jdg-site-quick-input" title="Matches anywhere in the full URL. Examples: /careers/, jobs., linkedin.com/jobs">
          <button class="jdg-btn-sm jdg-btn-add" id="jdg-pattern-quick-add">Add</button>
        </div>
        <div class="jdg-site-header-row" style="margin-top:6px;align-items:flex-start;">
          <span class="jdg-site-header-label" style="padding-top:5px;">+ URL→Ind</span>
          <div style="display:flex;flex-direction:column;flex:1;gap:4px;">
            <div style="display:flex;gap:6px;">
              <input type="text" id="jdg-di-url-quick" placeholder="e.g. /figma/ or figma.com" class="jdg-site-quick-input" title="Matched against the full URL — use /path/ style to catch company pages on shared ATS sites like greenhouse.io">
              <button class="jdg-btn-sm jdg-btn-add" style="visibility:hidden;pointer-events:none;" aria-hidden="true">Add</button>
            </div>
            <div style="display:flex;gap:6px;">
              <select id="jdg-di-ind-quick" class="jdg-site-quick-select">${indOptions}</select>
              <button class="jdg-btn-sm jdg-btn-add" id="jdg-di-quick-add">Add</button>
            </div>
          </div>
        </div>
      </div>
      <div id="jdg-modal-body">
        <div class="jdg-subsection">
          <div class="jdg-collapsible-header" id="jdg-domains-toggle">
            <h4 style="margin:0;">Domains</h4>
            <span class="jdg-collapsible-arrow" id="jdg-domains-arrow">▼</span>
          </div>
          <div class="jdg-collapsible-body collapsed" id="jdg-domains-body">
            <ul class="jdg-industry-list" id="jdg-site-domain-list">
              ${domains.map((d, i) => matchItem(d, i, 'domain')).join('')}
            </ul>
          </div>
        </div>
        <div class="jdg-subsection">
          <div class="jdg-collapsible-header" id="jdg-patterns-toggle">
            <h4 style="margin:0;">URL Patterns</h4>
            <span class="jdg-collapsible-arrow" id="jdg-patterns-arrow">▼</span>
          </div>
          <div class="jdg-collapsible-body collapsed" id="jdg-patterns-body">
            <ul class="jdg-industry-list" id="jdg-site-pattern-list">
              ${patterns.map((p, i) => matchItem(p, i, 'pattern')).join('')}
            </ul>
          </div>
        </div>
        <div class="jdg-subsection">
          <div class="jdg-collapsible-header" id="jdg-di-toggle">
            <h4 style="margin:0;">URL → Industry</h4>
            <span class="jdg-collapsible-arrow" id="jdg-di-arrow">▼</span>
          </div>
          <div class="jdg-collapsible-body collapsed" id="jdg-di-body">
            <ul class="jdg-industry-list" id="jdg-site-di-list">
              ${domainInds.map((e, i) => domainIndustryItem(e, i)).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('jdg-site-close').addEventListener('click', () => overlay.remove());

    // Collapsible toggles
    [['jdg-domains-toggle', 'jdg-domains-body', 'jdg-domains-arrow'],
     ['jdg-patterns-toggle', 'jdg-patterns-body', 'jdg-patterns-arrow'],
     ['jdg-di-toggle', 'jdg-di-body', 'jdg-di-arrow']].forEach(([tog, bod, arr]) => {
      modal.querySelector(`#${tog}`).addEventListener('click', () => {
        modal.querySelector(`#${bod}`).classList.toggle('collapsed');
        modal.querySelector(`#${arr}`).classList.toggle('open');
      });
    });

    // Quick-add domain
    const domainListEl = modal.querySelector('#jdg-site-domain-list');
    modal.querySelector('#jdg-domain-quick-add').addEventListener('click', () => {
      const input = modal.querySelector('#jdg-domain-quick');
      const val = input.value.trim();
      if (!val || domains.includes(val)) { input.select(); return; }
      domains.push(val);
      saveDomains(domains);
      const li = document.createElement('li');
      li.className = 'jdg-industry-item';
      li.innerHTML = matchItem(val, domains.length - 1, 'domain');
      domainListEl.appendChild(li);
      input.value = '';
      flashSiteMsg(modal, `✓ "${val}" added to domains`);
    });

    // Quick-add pattern
    const patternListEl = modal.querySelector('#jdg-site-pattern-list');
    modal.querySelector('#jdg-pattern-quick-add').addEventListener('click', () => {
      const input = modal.querySelector('#jdg-pattern-quick');
      const val = input.value.trim();
      if (!val || patterns.includes(val)) { input.select(); return; }
      patterns.push(val);
      savePatterns(patterns);
      const li = document.createElement('li');
      li.className = 'jdg-industry-item';
      li.innerHTML = matchItem(val, patterns.length - 1, 'pattern');
      patternListEl.appendChild(li);
      input.value = '';
      flashSiteMsg(modal, `✓ "${val}" added to patterns`);
    });

    // Quick-add URL→Industry
    const diListEl = modal.querySelector('#jdg-site-di-list');
    modal.querySelector('#jdg-di-quick-add').addEventListener('click', () => {
      const urlInput = modal.querySelector('#jdg-di-url-quick');
      const indSel   = modal.querySelector('#jdg-di-ind-quick');
      const url = urlInput.value.trim();
      const industry = indSel.value;
      if (!url || !industry) { urlInput.select(); return; }
      if (domainInds.some(e => e.url === url && e.industry === industry)) { urlInput.select(); return; }
      domainInds.push({ url, industry });
      saveDomainIndustries(domainInds);
      const li = document.createElement('li');
      li.className = 'jdg-industry-item';
      li.innerHTML = domainIndustryItem({ url, industry }, domainInds.length - 1);
      diListEl.appendChild(li);
      urlInput.value = '';
      flashSiteMsg(modal, `✓ "${url}" → "${industry}" added`);
    });

    // Remove from domain list
    domainListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-btn-remove')) {
        const idx = parseInt(e.target.dataset.idx);
        domains.splice(idx, 1);
        saveDomains(domains);
        e.target.closest('li').remove();
        domainListEl.querySelectorAll('.jdg-btn-remove').forEach((btn, i) => { btn.dataset.idx = i; });
      }
    });

    // Remove from pattern list
    patternListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-btn-remove')) {
        const idx = parseInt(e.target.dataset.idx);
        patterns.splice(idx, 1);
        savePatterns(patterns);
        e.target.closest('li').remove();
        patternListEl.querySelectorAll('.jdg-btn-remove').forEach((btn, i) => { btn.dataset.idx = i; });
      }
    });

    // Remove from URL→Industry list
    diListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-btn-remove')) {
        const idx = parseInt(e.target.dataset.idx);
        domainInds.splice(idx, 1);
        saveDomainIndustries(domainInds);
        e.target.closest('li').remove();
        diListEl.querySelectorAll('.jdg-btn-remove').forEach((btn, i) => { btn.dataset.idx = i; });
      }
    });
  }

  function domainIndustryItem(entry, idx) {
    return `<li class="jdg-industry-item">
      <span class="jdg-di-item-url">${escHtml(entry.url)}</span>
      <span class="jdg-di-item-sep">→</span>
      <span class="jdg-di-item-ind">${escHtml(entry.industry)}</span>
      <button class="jdg-btn-remove" data-idx="${idx}" title="Remove">✕</button>
    </li>`;
  }

  function flashSiteMsg(modal, msg) {
    let el = modal.querySelector('#jdg-site-flash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'jdg-site-flash';
      el.style.cssText = 'font-size:11px;color:#27ae60;padding:4px 28px 0;';
      modal.querySelector('.jdg-site-header').after(el);
    }
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 2000);
  }

  // ─── Settings Modal ───────────────────────────────────────────────────────────
  function doShowSettings() {
    if (document.getElementById('jdg-settings-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'jdg-settings-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;';

    const modal = document.createElement('div');
    modal.id = 'jdg-modal';
    modal.style.cssText = 'position:fixed;top:60px;right:24px;pointer-events:all;max-width:480px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;cursor:default;';

    const industries = getIndustries();
    const currentPos = getPosition();
    const currentSc  = getShortcut();
    const currentTok = getToken();

    modal.innerHTML = `
      <button class="jdg-close-btn" id="jdg-settings-close" style="pointer-events:all;z-index:1;">✕</button>
      <div id="jdg-modal-body" style="padding-top:20px;">
      <div id="jdg-settings">
        <h2>⚙️ Settings</h2>

        <div class="jdg-settings-section">
          <h3>Coda API Token</h3>
          <div class="jdg-token-wrap">
            <input type="password" id="jdg-token-input" value="${escHtml(currentTok)}" placeholder="Paste token here">
            <button class="jdg-btn-sm jdg-btn-add" id="jdg-token-save">Save</button>
          </div>
        </div>

        <div class="jdg-settings-section">
          <h3>Panel Position</h3>
          <div class="jdg-pos-grid">
            ${POSITION_OPTIONS.map(p => `<button class="jdg-pos-btn${p.value === currentPos ? ' active' : ''}" data-pos="${p.value}">${p.label}</button>`).join('')}
          </div>
        </div>

        <div class="jdg-settings-section">
          <h3>Keyboard Shortcut (opens Coda modal)</h3>
          <div class="jdg-shortcut-wrap">
            <input type="text" class="jdg-shortcut-input" id="jdg-shortcut-input"
              value="${escHtml(currentSc)}" placeholder="Click Record to set" readonly>
            <button class="jdg-btn-sm jdg-btn-add" id="jdg-shortcut-record">Record</button>
            <button class="jdg-btn-sm jdg-btn-clear" id="jdg-shortcut-clear">Clear</button>
          </div>
        </div>

        <div class="jdg-settings-section">
          <h3>Page Highlighting</h3>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:10px;">
            <input type="checkbox" id="jdg-highlight-toggle" ${getHighlightEnabled() ? 'checked' : ''}>
            <span style="font-size:13px;">Highlight matched fields on page</span>
          </label>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <input type="color" id="jdg-hl-color-yellow" value="${getHighlightYellow()}" style="width:32px;height:24px;padding:1px 2px;border:1px solid #ddd;border-radius:4px;cursor:pointer;background:#fafafa;">
            <span id="jdg-hl-swatch-yellow" style="background:${getHighlightYellow()};padding:2px 8px;border-radius:3px;font-size:11px;border:1px solid rgba(0,0,0,0.08);">Yellow</span>
            <span style="font-size:11px;color:#888;">Salary · Remote Policy · FT/PT/C/T</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <input type="color" id="jdg-hl-color-green" value="${getHighlightGreen()}" style="width:32px;height:24px;padding:1px 2px;border:1px solid #ddd;border-radius:4px;cursor:pointer;background:#fafafa;">
            <span id="jdg-hl-swatch-green" style="background:${getHighlightGreen()};padding:2px 8px;border-radius:3px;font-size:11px;border:1px solid rgba(0,0,0,0.08);">Green</span>
            <span style="font-size:11px;color:#888;">Hrs/Wk · Comp Type · Shift</span>
          </div>
        </div>

        <div class="jdg-settings-section">
          <div class="jdg-collapsible-header" id="jdg-ind-toggle">
            <h3>Industry Options</h3>
            <span class="jdg-collapsible-arrow" id="jdg-ind-arrow">▼</span>
          </div>
          <div class="jdg-collapsible-body collapsed" id="jdg-ind-body">
            <ul class="jdg-industry-list" id="jdg-ind-list">
              ${industries.map((ind, i) => industryItem(ind, i)).join('')}
            </ul>
            <div class="jdg-add-industry">
              <input type="text" id="jdg-ind-new" placeholder="Add new industry…">
              <button class="jdg-btn-sm jdg-btn-add" id="jdg-ind-add">Add</button>
            </div>
          </div>
        </div>

      </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close button — attach after DOM insertion to ensure element is live
    document.getElementById('jdg-settings-close').addEventListener('click', () => overlay.remove());

    // Highlight toggle
    modal.querySelector('#jdg-highlight-toggle').addEventListener('change', (e) => {
      GM_setValue('highlightEnabled', e.target.checked);
      if (e.target.checked) applyHighlights(); else removeHighlights();
    });

    // Highlight color pickers
    modal.querySelector('#jdg-hl-color-yellow').addEventListener('input', (e) => {
      GM_setValue('highlightYellow', e.target.value);
      modal.querySelector('#jdg-hl-swatch-yellow').style.background = e.target.value;
      applyHighlightColors();
    });
    modal.querySelector('#jdg-hl-color-green').addEventListener('input', (e) => {
      GM_setValue('highlightGreen', e.target.value);
      modal.querySelector('#jdg-hl-swatch-green').style.background = e.target.value;
      applyHighlightColors();
    });
    modal.querySelector('#jdg-token-save').addEventListener('click', () => {
      const tok = modal.querySelector('#jdg-token-input').value.trim();
      GM_setValue('codaToken', tok);
      flashSettingsMsg(modal, 'Token saved');
    });

    // Position buttons
    modal.querySelectorAll('.jdg-pos-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.jdg-pos-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        GM_setValue('panelPosition', btn.dataset.pos);
        const panel = document.getElementById('jdg-panel');
        if (panel) {
          panel.className = `pos-${btn.dataset.pos}`;
        }
      });
    });

    // Shortcut
    modal.querySelector('#jdg-shortcut-record').addEventListener('click', () => {
      recordShortcut(modal.querySelector('#jdg-shortcut-input'));
    });
    modal.querySelector('#jdg-shortcut-clear').addEventListener('click', () => {
      GM_setValue('shortcut', '');
      modal.querySelector('#jdg-shortcut-input').value = '';
      registerShortcut();
    });

    // Collapsible toggle
    modal.querySelector('#jdg-ind-toggle').addEventListener('click', () => {
      modal.querySelector('#jdg-ind-body').classList.toggle('collapsed');
      modal.querySelector('#jdg-ind-arrow').classList.toggle('open');
    });

    // Industry list
    const listEl = modal.querySelector('#jdg-ind-list');
    listEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-btn-remove')) {
        const idx = parseInt(e.target.dataset.idx);
        industries.splice(idx, 1);
        saveIndustries(industries);
        e.target.closest('li').remove();
        listEl.querySelectorAll('.jdg-btn-remove').forEach((btn, i) => { btn.dataset.idx = i; });
      }
    });
    modal.querySelector('#jdg-ind-add').addEventListener('click', () => {
      const input = modal.querySelector('#jdg-ind-new');
      const val = input.value.trim();
      if (!val || industries.includes(val)) return;
      industries.push(val);
      saveIndustries(industries);
      const li = document.createElement('li');
      li.className = 'jdg-industry-item';
      li.innerHTML = industryItem(val, industries.length - 1);
      listEl.appendChild(li);
      input.value = '';
    });
  }

  function industryItem(name, idx) {
    return `<li class="jdg-industry-item">
      <span class="jdg-drag-handle">⠿</span>
      <span class="jdg-ind-name">${escHtml(name)}</span>
      <button class="jdg-btn-remove" data-idx="${idx}" title="Remove">✕</button>
    </li>`;
  }

  function matchItem(val, idx, type) {
    return `<li class="jdg-industry-item">
      <span class="jdg-drag-handle">⠿</span>
      <span class="jdg-ind-name" style="font-family:monospace;font-size:12px;">${escHtml(val)}</span>
      <button class="jdg-btn-remove" data-idx="${idx}" data-type="${type}" title="Remove">✕</button>
    </li>`;
  }

  function flashSettingsMsg(modal, msg) {
    let el = modal.querySelector('#jdg-settings-flash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'jdg-settings-flash';
      el.style.cssText = 'font-size:12px;color:#27ae60;margin-top:4px;';
      modal.querySelector('.jdg-token-wrap').after(el);
    }
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 2000);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    if (!pageMatchesAllowlist()) return;
    buildPanel();
  }

  // Tampermonkey menu command — works on any page regardless of allowlist
  GM_registerMenuCommand('🌐 Add current site to Job Description Grabber', () => {
    doShowSiteModal();
  });

  // Wait for DOM, then use MutationObserver to handle SPAs
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Re-check panel exists after SPA navigation (debounced to avoid firing on every DOM mutation)
  let _navTimer = null;
  const navObserver = new MutationObserver(() => {
    if (document.getElementById('jdg-panel')) return;
    clearTimeout(_navTimer);
    _navTimer = setTimeout(() => {
      if (!document.getElementById('jdg-panel')) {
        _lastExtractedData = null;
        _lastModalState = null;
        if (pageMatchesAllowlist()) buildPanel();
      }
    }, 300);
  });
  navObserver.observe(document.documentElement, { childList: true, subtree: true });

  // Dismiss any open JDG modal on Escape (save Coda modal edits first)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const overlay = document.getElementById('jdg-overlay') ||
                    document.getElementById('jdg-site-overlay') ||
                    document.getElementById('jdg-settings-overlay');
    if (overlay) {
      e.stopPropagation();
      if (typeof overlay._jdgSave === 'function') overlay._jdgSave();
      overlay.remove();
    }
  });

})();