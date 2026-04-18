# Job Description Grabber

A userscript (Tampermonkey, Violentmonkey, etc.) that injects a floating action panel into job listing pages. Extract job data and send it to your clipboard, save as a TXT file, or POST directly to a Coda database.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Open the [raw script URL](https://raw.githubusercontent.com/mrbrownjeremy/job-description-grabber/main/Job%20Description%20Grabber.user.js) — your userscript manager will intercept and prompt you to install

## Features

- Extracts employer, position, location, salary, remote policy, employment type, and full job description
- Tries structured data (ld+json) first, falls back to DOM scraping
- Infers remote policy, industry, comp type, and shift hours from job text
- Copies extracted data to clipboard or saves as a formatted TXT file
- Posts directly to a Coda database with a single click
- Floating panel with draggable position, keyboard shortcut, and persistent settings
- User-configurable site matching: edit which domains and URL patterns activate the script

## Supported Sites

Works on LinkedIn, Indeed, Glassdoor, Greenhouse, Lever, Workable, Workday, iCIMS, SmartRecruiters, Jobvite, BambooHR, Taleo, ADP, JazzHR, Breezy HR, Ashby, Rippling, Recruitee, Paycom, Paylocity, Oracle Cloud, Dayforce, Gusto, Comeet, Eightfold, and any site matching configurable domain/URL patterns.

## Coda Integration

Requires a Coda API token. Set it once via **Settings → Coda API Token** — it's stored locally in your userscript manager and never sent anywhere except the Coda API.
