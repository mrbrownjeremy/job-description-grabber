// ==UserScript==
// @name         Job Description Grabber
// @namespace    https://github.com/jeremybrown
// @version      1.9.1
// @description  Grab job descriptions from job sites and send to clipboard, TXT, or Coda DB Job Applications
// @author       Jeremy Brown
// @icon         https://www.google.com/s2/favicons?sz=64&domain=coda.io
// @match        *://*.linkedin.com/*
// @match        *://*.indeed.com/*
// @match        *://*.greenhouse.io/*
// @match        *://*.lever.co/*
// @match        *://*.workable.com/*
// @match        *://*.myworkdayjobs.com/*
// @match        *://*.icims.com/*
// @match        *://*.smartrecruiters.com/*
// @match        *://*.jobvite.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @connect      coda.io
// ==/UserScript==

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
  };

  const DEFAULT_INDUSTRIES = [
    'Accounting','Arts & Culture','Creative & Design','Education','Finance',
    'Government','Healthcare','Hospitality','Legal','Manufacturing',
    'Marketing','Media & Communications','Nonprofit','Other',
    'Real Estate','Retail','Technology'
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
      border: none;
      border-radius: 20px;
      padding: 6px 10px;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      transition: background 0.15s, transform 0.1s;
      line-height: 1;
      position: relative;
    }
    .jdg-pill:hover { background: #2d2d5e; transform: scale(1.08); }
    .jdg-pill:active { transform: scale(0.96); }
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
      overflow-y: auto;
      padding: 24px 28px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      color: #1a1a1a;
      position: relative;
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
    .jdg-interest-wrap input[type=range] { flex: 1; accent-color: #4a4adf; }
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
      margin-top: 20px; padding-top: 16px;
      border-top: 1px solid #eee;
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
  `);

  // ─── State ───────────────────────────────────────────────────────────────────
  function getIndustries() {
    const stored = GM_getValue('industries', null);
    return stored ? JSON.parse(stored) : [...DEFAULT_INDUSTRIES];
  }
  function saveIndustries(arr) { GM_setValue('industries', JSON.stringify(arr)); }
  function getPosition() { return GM_getValue('panelPosition', 'top-right'); }
  function getShortcut() { return GM_getValue('shortcut', ''); }
  function getToken() { return GM_getValue('codaToken', '86235ca7-568d-48d4-9ee9-2cf4787859b4'); }

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
    };

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
              : data.description;
          }
        }
      } catch (e) {}
    }

    // DOM fallback / augmentation
    if (!data.position) {
      data.position = getText(['h1', '[class*="job-title"]', '[class*="jobtitle"]', '[data-testid*="title"]', '.posting-headline h2']);
    }
    if (!data.employer) {
      data.employer = getText(['[class*="company-name"]', '[class*="companyName"]', '[data-testid*="company"]', '.employer-name', '[class*="employer"]']);
    }
    if (!data.location) {
      data.location = getText(['[class*="location"]', '[data-testid*="location"]', '.job-location', '[class*="jobLocation"]']);
    }
    if (!data.description) {
      const descEl = document.querySelector([
        '[class*="job-description"]','[class*="jobDescription"]',
        '[class*="description__text"]','[id*="job-description"]',
        '.posting-description','.job-details',
        '[data-testid*="description"]'
      ].join(','));
      if (descEl) data.description = stripHtml(descEl.innerHTML || descEl.textContent);
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

    // Shift / Hours extraction
    data.shiftHours = extractShiftHours(data.description) ||
                      extractShiftHours(document.body.innerText || '');

    // Industry inference
    data.industries = inferIndustries(data.position, data.employer, data.description);

    // Comp Type inference
    data.compType = inferCompType(data.description);

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
    ];

    // On-site signals
    const onSiteSignals = [
      /\bon[\s-]?site\s+(only|required|position|role)\b/,
      /\bin[\s-]?person\s+(only|required|position|role)\b/,
      /\b(must|required to|expected to)\s+(be\s+)?(work|report|come)\s+(in|on[\s-]?site|to\s+the\s+office)\b/,
      /\bno\s+remote\s*(work|option)\b/,
      /\bthis\s+role\s+is\s+(not\s+)?eligible\s+for\s+remote\b/,
    ];

    // Negative context — "not remote", "not eligible for remote"
    const negRemote = [
      /\bnot\s+(eligible\s+for\s+)?remote\b/,
      /\bno\s+remote\b/,
    ];

    for (const re of negRemote)   { if (re.test(t)) return 'On-Site'; }
    for (const re of fullyRemote) { if (re.test(t)) return 'Remote'; }
    for (const re of hybridSignals){ if (re.test(t)) return 'Hybrid'; }
    for (const re of onSiteSignals){ if (re.test(t)) return 'On-Site'; }

    // Loose "remote" mention with no stronger signal → Hybrid (most common ambiguous case)
    if (/\bremote\b/.test(t)) return 'Hybrid';

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
  function inferIndustries(title, employer, description) {
    // Combine all text; weight title+employer more heavily by repeating them
    const corpus = [
      title, title, title,
      employer, employer,
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
        threshold: 4,
        patterns: [
          /\bpatient(s| care)\b/, /\bclinical\b/, /\bmedical\b/, /\bhospital\b/,
          /\bnurse|nursing\b/, /\bphysician\b/, /\bhipaa\b/, /\behr\b/, /\bhealth system\b/,
          /\bhealth(care)? provider\b/, /\bpharma(ceutical)?\b/, /\bbiotech\b/,
          /\bmedical device\b/, /\bdiagnostic\b/, /\btherapist\b/, /\bclinician\b/,
          /\bbehavioral health\b/, /\btelemedicine\b/,
          /\bpublic health\b/, /\bepidemi/,
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
        threshold: 3,
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
      /\bdiscretionary\s+bonus\b/.test(t)
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
    if (s.includes('FULL')) return 'Full-Time';
    if (s.includes('PART')) return 'Part-Time';
    if (s.includes('CONTRACT') || s.includes('CONTRACTOR')) return 'Contract';
    if (s.includes('TEMP')) return 'Temporary';
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
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    // Replace block elements with newlines
    tmp.querySelectorAll('p,br,li,div,h1,h2,h3,h4,h5,h6').forEach(el => {
      el.insertAdjacentText('beforebegin', '\n');
    });
    return tmp.textContent.replace(/\n{3,}/g, '\n\n').trim();
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
      { emoji: '⚙️', label: 'Settings',           action: doShowSettings },
    ];

    buttons.forEach(({ emoji, label, action }) => {
      const btn = document.createElement('button');
      btn.className = 'jdg-pill';
      btn.innerHTML = `${emoji}<span class="jdg-tooltip">${label}</span>`;
      btn.addEventListener('click', action);
      panel.appendChild(btn);
    });

    document.body.appendChild(panel);
    registerShortcut();
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
      if (!['meta','control','alt','shift'].includes(key)) parts.push(key);
      if (parts.length > 1) {
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
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      flashPill(0, '✅');
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
  }

  function flashPill(index, symbol) {
    const pills = document.querySelectorAll('.jdg-pill');
    if (!pills[index]) return;
    const orig = pills[index].childNodes[0].textContent;
    pills[index].childNodes[0].textContent = symbol;
    setTimeout(() => { pills[index].childNodes[0].textContent = orig; }, 1500);
  }

  // ─── Coda Modal ───────────────────────────────────────────────────────────────
  function doShowCodaModal() {
    const data = extractJobData();
    const industries = getIndustries();

    const overlay = document.createElement('div');
    overlay.id = 'jdg-overlay';

    const modal = document.createElement('div');
    modal.id = 'jdg-modal';

    modal.innerHTML = `
      <button class="jdg-close-btn" id="jdg-modal-close">✕</button>
      <div class="jdg-grid">

        <div class="jdg-group"><span class="jdg-group-label">Role</span><span class="jdg-group-line"></span></div>
        ${field('position',     'Position',      'input', data.position)}
        ${field('employer',     'Employer',      'input', data.employer)}
        ${field('location',     'Location',      'input', data.location)}
        ${selectField('remotePolicy', 'Remote Policy', REMOTE_OPTIONS, data.remotePolicy)}
        ${selectField('ftPtCT', 'FT/PT/C/T',    FTPT_OPTIONS, data.ftPtCT)}
        ${field('shiftHours',   'Shift / Hours', 'input', data.shiftHours)}
        ${field('salaryRange',  'Salary Range',  'input', data.salaryRange)}
        ${selectField('compType', 'Comp Type',   COMPTYPE_OPTIONS, data.compType)}
        ${field('hrsWk',        'Hrs/Wk',        'input', data.hrsWk, 'number')}
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

        <div class="jdg-group"><span class="jdg-group-label">Description</span><span class="jdg-group-line"></span></div>
        <div class="jdg-field full">
          <div class="jdg-desc-preview" id="jdg-desc-preview" style="max-height:1.6em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${escHtml(data.description.slice(0, 200))}</div>
        </div>

      </div>
      <div class="jdg-modal-footer">
        <span class="jdg-status-msg" id="jdg-status"></span>
        <button class="jdg-btn jdg-btn-cancel" id="jdg-cancel">Cancel</button>
        <button class="jdg-btn jdg-btn-send" id="jdg-send">Send to Coda</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Multi-select industries
    const selectedIndustries = [...data.industries];
    buildMultiSelect(
      modal.querySelector('#jdg-multisel'),
      industries,
      selectedIndustries,
      modal
    );

    // Interest slider
    const slider = modal.querySelector('#jdg-interest');
    const sliderVal = modal.querySelector('#jdg-interest-val');
    slider.addEventListener('input', () => { sliderVal.textContent = slider.value; });

    // Close
    modal.querySelector('#jdg-modal-close').addEventListener('click', () => overlay.remove());
    modal.querySelector('#jdg-cancel').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    // Send
    modal.querySelector('#jdg-send').addEventListener('click', () => {
      const payload = gatherModalData(modal, data.description, selectedIndustries);
      sendToCoda(payload, modal.querySelector('#jdg-status'), modal.querySelector('#jdg-send'), overlay);
    });
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

  // Multi-select widget
  function buildMultiSelect(container, allOptions, selectedArr, modalEl) {
    function render() {
      container.innerHTML = '';
      selectedArr.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'jdg-chip';
        chip.innerHTML = `${escHtml(item)}<span class="jdg-chip-x" data-item="${escHtml(item)}">×</span>`;
        chip.querySelector('.jdg-chip-x').addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = selectedArr.indexOf(item);
          if (idx > -1) selectedArr.splice(idx, 1);
          render();
        });
        container.appendChild(chip);
      });
    }

    render();

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-chip-x')) return;
      document.querySelectorAll('.jdg-multisel-dropdown').forEach(d => d.remove());

      const dropdown = document.createElement('div');
      dropdown.className = 'jdg-multisel-dropdown';
      const rect = container.getBoundingClientRect();
      // Use fixed positioning so dropdown escapes modal overflow clipping
      dropdown.style.top  = `${rect.bottom + 2}px`;
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.width = `${rect.width}px`;

      allOptions.forEach(opt => {
        const item = document.createElement('div');
        item.className = 'jdg-multisel-option' + (selectedArr.includes(opt) ? ' selected' : '');
        item.textContent = opt;
        item.addEventListener('click', () => {
          const idx = selectedArr.indexOf(opt);
          if (idx > -1) selectedArr.splice(idx, 1);
          else selectedArr.push(opt);
          render();
          dropdown.remove();
        });
        dropdown.appendChild(item);
      });

      document.body.appendChild(dropdown);
      setTimeout(() => {
        document.addEventListener('click', function closer(ev) {
          if (!dropdown.contains(ev.target)) { dropdown.remove(); document.removeEventListener('click', closer); }
        });
      }, 0);
    });
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
      description:       fullDescription,
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
      { column: COL.connectionStr, value: data.connectionStrength },
      { column: COL.shiftHours,    value: data.shiftHours },
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

  // ─── Settings Modal ───────────────────────────────────────────────────────────
  function doShowSettings() {
    const overlay = document.createElement('div');
    overlay.id = 'jdg-overlay';

    const modal = document.createElement('div');
    modal.id = 'jdg-modal';
    modal.style.maxWidth = '480px';

    const industries = getIndustries();
    const currentPos = getPosition();
    const currentSc  = getShortcut();
    const currentTok = getToken();

    modal.innerHTML = `
      <button class="jdg-close-btn" id="jdg-settings-close">✕</button>
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
          <h3>Industry Options</h3>
          <ul class="jdg-industry-list" id="jdg-ind-list">
            ${industries.map((ind, i) => industryItem(ind, i)).join('')}
          </ul>
          <div class="jdg-add-industry">
            <input type="text" id="jdg-ind-new" placeholder="Add new industry…">
            <button class="jdg-btn-sm jdg-btn-add" id="jdg-ind-add">Add</button>
          </div>
        </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Token save
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

    // Industry list
    const listEl = modal.querySelector('#jdg-ind-list');
    listEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('jdg-btn-remove')) {
        const idx = parseInt(e.target.dataset.idx);
        industries.splice(idx, 1);
        saveIndustries(industries);
        e.target.closest('li').remove();
        // re-index
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

    // Close
    modal.querySelector('#jdg-settings-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  function industryItem(name, idx) {
    return `<li class="jdg-industry-item">
      <span class="jdg-drag-handle">⠿</span>
      <span class="jdg-ind-name">${escHtml(name)}</span>
      <button class="jdg-btn-remove" data-idx="${idx}" title="Remove">✕</button>
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
    buildPanel();
  }

  // Wait for DOM, then use MutationObserver to handle SPAs
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Re-check panel exists after SPA navigation
  const navObserver = new MutationObserver(() => {
    if (!document.getElementById('jdg-panel')) {
      buildPanel();
    }
  });
  navObserver.observe(document.documentElement, { childList: true, subtree: true });

})();