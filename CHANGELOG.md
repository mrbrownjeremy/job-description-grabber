# Changelog

## [3.2.0]
- Added Site Matching modal — view and edit which domains/URL patterns activate the script
- Settings panel redesigned with quick-input fields for domain and pattern rules
- Minor UI polish: smaller pill buttons, tighter padding

## [3.1.1]
- Bug fixes and minor extraction improvements

## [3.1.0]
- Replaced hardcoded `@match`/`@include` directives with user-editable domain and URL pattern lists (`DEFAULT_DOMAINS`, `DEFAULT_PATTERNS`)
- Added collapsible sections to the submission modal
- Added eightfold.ai to default domain list

## [3.0.0]
- Switched to universal `@match *://*/*` with runtime site-matching logic
- Improved ld+json parsing: rejects UUIDs and URL paths from job identifier fields
- Cleaner extraction fallback chain

## [2.9.5]
- Fixed Gusto extraction to not overwrite already-extracted employer/position values
- Extended employer name filter to reject "corp" and "inc" as generic values
- Removed overly broad `@include` path patterns that caused false activations

## [2.9.4]
- Expanded site support: BambooHR, Taleo, ADP, JazzHR, Breezy HR, Ashby, Rippling, Recruitee, Paycom, Paylocity, Oracle Cloud, Dayforce, Gusto, Comeet
- Added `@include` regex patterns for generic careers/jobs subdomains and URL paths
- Added scrollable modal body with sticky footer
- Interest slider styling improvements

## [1.9.1]
- Initial version: extract job data from page, copy to clipboard, save as TXT, or POST to Coda database
