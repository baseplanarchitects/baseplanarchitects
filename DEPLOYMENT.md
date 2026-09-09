# Deployment readiness

## Current status
The static marketing frontend builds successfully. It is not a complete production admin/CRM system.

## Build and host
- Use Node.js 22.12 or newer compatible version; run `npm ci`, then `npm run build`.
- Publish the contents of `dist/`, not `src/` or the whole repository.
- Configure SPA fallback: requests for page routes such as `/about`, `/projects/likhon-apartment` and `/base-plan-architect-admin-login` must serve `/index.html` with status 200. Serve existing assets normally.
- Enable HTTPS. Verify direct navigation and refresh on nested routes on the chosen hosting provider.
- Do not use the Vite development or preview server as the public production server.

## Limits to approve before launch
- Authentication is deliberately deferred. `/admin-preview/*` contains public sample records; it is not protected administration. No real private client information should be placed in these frontend records.
- Contact and booking forms prepare an email using the visitor's email application. They do not submit to a backend or save leads. Sending and delivery depend on the visitor completing the email.
- Confirm retained studio names, statistics, timeline and service claims with the owner. The hero building is labelled as a reference image.
- Final domain-specific canonical/social sharing URLs and server-level indexing rules depend on the deployment domain and host.

## Checks for this revision
- Production build: passed.
- Lint: existing BookingModalContext Fast Refresh warning only.
- Dependency security audit: not completed; npm registry audit endpoint failed. Run `npm audit --omit=dev` with network access before release.
- Updated desktop/mobile navigation shares Home, About, Projects, Services, Process, Gallery, Contact order. Mobile menu uses the studio logo.
- Initial loader has geometric shapes, brand text fill, reduced-motion support and bounded dismissal. It does not repeat on client-side navigation.
- Earlier Lighthouse scores are historical, not a certification of this revision. Recheck performance and forms on the final host.
