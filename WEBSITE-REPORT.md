# Base Plan Architects: website report

## Tone and visual identity

Modern, minimal, thoughtful and approachable. The website uses an architectural portfolio language: precise grids, generous space, fine rules and large project imagery. Copy explains how a space serves its users and how the studio develops it.

The existing brand palette is maintained: ink `#0d0d0d`, paper `#fbfbfb`, stone `#acaba9`, hairline `#eaeaea`, with `#2c2c2b` and `#f4f3f1` as supporting tones. Montserrat headlines, Outfit navigation and Manrope body text are self-hosted as variable fonts. The original logo is preserved.

The footer follows the requested black background / white text direction, with a larger logo, studio information, a consultation action, and animated navigation links. The rest of the site supports System / Light / Dark themes. Sharp image and form surfaces reflect the architecture; circular controls identify standalone actions.

## Objective

Help homeowners and commercial clients understand the practice, explore real project work, meet its leadership and begin a consultation.

Primary journey: Home → Projects → Project detail → Contact / consultation.

Secondary journeys: Gallery → project detail; About → leadership → consultation; Services → consultation.

The existing inquiry behavior is maintained: forms prepare an email through the visitor’s email application. They do not automatically send a message, save a lead or confirm an appointment.

## Project content supplied by the studio

All four project folders in `src/assets` are included. Descriptions, locations, areas, years and scopes come from their supplied text files. Punctuation has been normalized for the website; project facts have not been invented.

| Project | Location | Area | Year | Scope | Images |
| --- | --- | --- | --- | --- | --- |
| Likhon Apartment | Uttara | 1,200 sq. ft. | 2024 | Interior Design & 3D Visualization | 7 |
| TM International Office | Uttara | 850 sq. ft. | 2024 | Interior Design & 3D Visualization | 9 |
| Riaz Haq Bedroom | Mohammadpur | 220 sq. ft. | 2024 | Interior Design & 3D Visualization | 6 |
| Nazrul Bedroom | Old Dhaka, Dhaka | 150 sq. ft. | 2023 | Interior Design & Execution | 34 |

Nazrul Bedroom includes 7 visualization images, 8 completed-interior photographs, 14 before/after images and 5 construction photographs. These appear in separate selectable groups on its detail page. The main Gallery contains all 56 images and can be filtered by project.

`scripts/prepare-project-assets.py` produces 640px and 1600px WebP delivery copies in `public/projects`, and writes `src/data/project-media.json`. Originals and embedded studio watermarks remain intact. The 112 responsive copies total approximately 7.6 MB; images load on demand rather than all at once. To regenerate after changing originals, run `python scripts/prepare-project-assets.py` (requires Pillow).

The two supplied MOV files remain in the source folders. They are not embedded or downloaded on page load; this request’s project image and description integration includes every JPG and all four descriptions.

## Page and content schema

| Route / section | Content and behavior |
| --- | --- |
| `/` | Scroll hero, studio introduction, four real projects, services, process, visual journal, FAQ |
| `/#projects` | Retained selected-project anchor |
| `/#solution` | Retained services anchor with expandable descriptions |
| `/#process` | Retained process anchor |
| `/projects` | Interior / Exterior tabs; Interior has 3D Design / Built Projects and Residential / Commercial filters; grid/list views |
| `/projects/likhon-apartment` | Studio description, metadata, seven project images |
| `/projects/tm-international-office` | Studio description, metadata, nine project images |
| `/projects/riaz-haq-bedroom` | Studio description, metadata, six project images |
| `/projects/nazrul-bedroom` | Studio description, metadata, four photo groups, 34 images |
| `/gallery` | 56 images, project selection, thumbnails, previous/next, arrow keys, swipe, expanded viewer |
| `/about` | Studio story, values, statistics, team and history; new CEO / Principal Architect portrait section |
| `/contact` | Contact details, original inquiry fields and email handoff |
| Unknown route | Helpful not-found page with a home link |

Project data lives in `src/data/projects.js`; original-file-to-delivery-image mappings live in `src/data/project-media.json`.

## Motion and accessibility

On desktop, the sticky hero holds the composition while the building image moves from the right to the center and grows. The headline fades before the focused image takes priority. On mobile, the image moves upward into the center. Scrolling remains native.

Magnetic buttons use spring motion values for mouse input. Touch targets stay stable. Section reveals use IntersectionObserver. Reduced-motion preferences disable the hero transition and reveal transforms. Native dialogs provide keyboard focus containment and Escape dismissal for the mobile menu, consultation form and expanded images. The website includes visible focus states, a skip link, labeled controls, filter announcements and accessible action targets.

## SEO structured-data schema

`src/components/PageMeta.jsx` sets a distinct title and description for each route and injects JSON-LD with this structure:

```text
ProfessionalService
├── name: Base Plan Architects
├── description
├── telephone / email
├── address: PostalAddress
│   ├── streetAddress
│   ├── addressLocality: Dhaka
│   ├── postalCode: 1229
│   └── addressCountry: BD
├── areaServed: Dhaka, Bangladesh
└── hasOfferCatalog: OfferCatalog
    └── Offer → Service
        ├── Interior Design
        ├── Interior Construction
        ├── Building Design
        └── Architectural Consultancy
```

No invented reviews, ratings, credentials or awards are included. `robots.txt` allows crawling. A production domain was not supplied, so canonical URLs, sitemap URLs, absolute social-preview URLs and organization IDs have not been guessed. Add these when the deployment domain is known. The host must return `index.html` for client-side routes. Metadata is rendered by React; prerendering or SSR would improve crawler and social-preview reliability.

## Remaining content inputs

The CEO’s name, biography and real portrait were not supplied. Rafiul Karim’s Principal Architect name is retained from the original code. Both leadership portraits visibly say “Sample portrait” and require the studio’s official replacements.

The homepage exterior-building image remains a labeled architectural reference because the supplied projects are interiors. Actual portfolio, project-detail, service and gallery imagery now comes from the studio’s assets. Existing studio statistics and timeline claims were retained from the original code and should be confirmed by the owner before public launch.

## Reference interpretation

- [Heron](https://heronaiapp.com/): monochrome architectural framing and precise typography.
- [The Watch](https://thewatch.60fps.fr/): the requested scroll-to-focus idea. Its WebGL experience remained on a loading screen during inspection; this implementation uses an original image-based transition.
- [Kononenko Work](https://kononenkogroup.com/work/): staggered imagery, negative space and grid/list browsing.
- [Michael Gatt](https://michaelgatt.com/): cinematic visual exploration. Loading limited deeper inspection; this gallery uses accessible image controls.

Only the exterior reference and two sample portraits use Unsplash photos (`photo-1600585154340-be6161a56a0c`, `photo-1560250097-0b93528c311a`, `photo-1500648767791-00dcc994a43e`).

## Validation and delivery

Production build passes. Lint has no errors and retains one pre-existing Fast Refresh warning in `BookingModalContext.jsx` for exporting a provider and hook from the same file.

Browser checks cover desktop and 390px mobile layouts, light/dark mode, scroll centering, project filters/grid/list, gallery navigation and fullscreen/Escape, native mobile navigation and the consultation dialog. Real Nazrul project metadata and photo-group counts were verified in the production preview. Inquiry messages were not sent during testing.

Final Lighthouse mobile audit on the local production build: Performance **83**, Accessibility **100**, Best Practices **100**, SEO **100**. Largest Contentful Paint: **4.3 seconds** under simulated mobile throttling; Total Blocking Time: **60 milliseconds**; Cumulative Layout Shift: **0**. These are local lab results, not a guarantee of public-host performance. Responsive WebP delivery improved the earlier production performance score from 75 to 83. The audit still identifies image-delivery and render-blocking opportunities. Raw results are in `lighthouse-production.json`.

Local preview: `http://127.0.0.1:5181/`. The site has not been publicly published.

## Client review updates

- Home is included in the desktop navigation, mobile menu and footer.
- The service order is Interior Design, Interior Construction, Building Design, Architectural Consultancy. Homepage copy, consultation options and structured data share `src/data/services.js`.
- The homepage portfolio and Projects page share the same Interior / Exterior navigation. Interior offers 3D Design / Built Projects, then All / Residential / Commercial filters.
- Supplied assets provide three residential and one commercial 3D design projects. Nazrul Bedroom also appears under Built Projects with its completed-interior cover. Built Commercial and Exterior show clear empty states until relevant projects are supplied.
- Project definitions can explicitly specify `discipline: 'Exterior'` for future exterior work.
- Desktop and 390px mobile navigation, filter combinations, empty states and keyboard tab navigation were checked. Production build passes; lint retains the existing BookingModalContext Fast Refresh warning.
- Earlier Lighthouse results in this report predate these client-review updates; no new Lighthouse score is claimed.

## Admin UI and dark background update

- Login UI: `/base-plan-architect-admin-login`. Dashboard sample workspace: `/admin-preview/home`, with Leads, Clients, Invoice and Workorder sections.
- Per owner instruction, authentication is deferred. Login does not authenticate, store passwords or unlock records. Sample records are clearly labelled; search filters the sample tables. `/admin` routes redirect to login. No backend authorization or live record management is claimed.
- Admin routes have noindex/nofollow metadata. This is indexing guidance, not an access control mechanism.
- Public website and admin UI now use the approved black background and original studio fonts, with a restrained dot pattern and mouse-follow grid illumination. The overlay cannot intercept clicks. Touch and reduced-motion users receive a static background; existing magnetic buttons and portrait hover remain available on desktop.
- Desktop navigation and all five dashboard pages were reviewed; sample search and its empty state were verified. Build passes; the existing BookingModalContext Fast Refresh lint warning remains.
