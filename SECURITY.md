# Security policy

## Supported version

Security updates are applied to the version currently deployed from the `main` branch. Staging/demo content is in scope only when it is served from `picodavi.com`.

## Reporting a vulnerability

Please report suspected vulnerabilities privately to **picoiudavid@gmail.com** with the subject `Security report — Picodavi`.

Include, when possible:

- affected URL and browser/device;
- a clear description of the impact;
- minimal, non-destructive reproduction steps;
- screenshots or request/response details with personal data and credentials removed;
- a safe way to contact you for follow-up.

Please do not open a public GitHub issue containing exploit details, credentials or personal data. Do not send real customer data in a report.

## Response targets

- Acknowledgement: within 3 working days.
- Initial triage: within 7 working days.
- Remediation target: based on severity and exploitability; critical issues are prioritised immediately.

These are good-faith targets, not a bug-bounty promise or contractual SLA.

## Safe research boundaries

Good-faith, low-impact research is welcome when it:

- uses only accounts/data you own or have explicit permission to use;
- avoids denial of service, automated high-volume scanning and social engineering;
- does not access, alter, retain or disclose another person's data;
- stops as soon as sensitive data or a credible exploit path is found;
- gives reasonable time to investigate before public disclosure.

The following are out of scope without prior written authorisation: Hostinger/GitHub/Meta/Google infrastructure, physical attacks, phishing, credential stuffing, destructive payloads and tests against third-party sites linked from Picodavi.

## Current architecture and controls

Picodavi is exported as a static Next.js site. It has no own login, session, database, payment endpoint, file upload or contact-form backend. The contact form prepares a WhatsApp message in the browser.

Controls include:

- HTTPS redirection and HSTS;
- Content Security Policy and restrictive permissions/referrer headers;
- framing denied by header and CSP;
- no third-party analytics or advertising scripts by default;
- dependency lockfile, automated tests and `npm audit`;
- GitHub Actions pinned to exact commits;
- deployment credentials stored as GitHub Secrets, not in the repository;
- automated checks for external-tab isolation, input limits, legal routes and browser behaviour.

## Secrets and operational access

- Never commit `.env` files, tokens, private keys, FTP credentials or recovery codes.
- Use unique credentials and 2FA for GitHub, Hostinger, domain registrar, email and Google Business Profile.
- Rotate a credential immediately if it may have been copied into chat, logs, screenshots or an untrusted device.
- Give collaborators the minimum access needed and remove access when work ends.

## Incident handling

For a credible incident:

1. preserve relevant logs and timestamps without copying unnecessary personal data;
2. contain the issue by rotating/revoking affected credentials or pausing deployment;
3. restore from a known-good version and verify hashes/tests;
4. assess personal-data impact and obtain legal advice on notification duties;
5. document root cause, remediation and prevention;
6. communicate with affected people and the reporter when appropriate.

The branch `codex/pre-audit-360-2026-07-21` is a pre-audit code restore point; it is not a substitute for hosting and account backups.
