# Base Plan Architects — React Rebuild

A pixel-accurate React rebuild of the original static landing page, plus new **About Us** and
**Contact Us** pages and a shared **Book Appointment** modal — all in the same minimalist design
system (colors, spacing scale, typography) as the source HTML. Pure CSS/SCSS only — no UI
frameworks (no Bootstrap/Tailwind/MUI, etc.).

## Stack

- **Vite + React 19**
- **React Router** for the Landing / About / Contact routes
- **Sass (SCSS)** — pure hand-written styles, organized as partials under `src/styles/`
- No third-party CSS or component libraries

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  assets/
    logo.jpg              # brand mark, extracted from the original page
  components/
    Header.jsx             # capsule nav, scroll-shrink, mobile menu
    Footer.jsx
    Preloader.jsx           # intro loading screen
    BookingModal.jsx        # "Book a Consultation" modal (shared across all pages)
    Reveal.jsx              # scroll-reveal wrapper (IntersectionObserver)
  context/
    BookingModalContext.jsx # global open/close state for the booking modal
  pages/
    Home.jsx                # landing page: hero, projects, problem, services, process, FAQ, CTA
    About.jsx                # story, stats, values, team, timeline
    Contact.jsx               # contact details, inline contact form, studio hours
  styles/
    _variables.scss          # brand colors / fonts / spacing tokens
    _base.scss                # reset, buttons, section shell, reveal animations
    _header.scss               # nav + mobile menu + preloader
    _hero.scss                  # landing hero + inner-page hero
    _sections.scss               # projects / problem / services / process / faq / cta
    _footer.scss
    _modal.scss                   # booking modal
    _about.scss
    _contact.scss
    main.scss                      # entry point, imports all partials
  App.jsx                          # routes, providers, header/footer/modal shell
  main.jsx                          # React root
```

## Design tokens

All colors, fonts and spacing match the original supplied brand spec exactly:

- **Colors:** `--ink #0d0d0d`, `--paper #fbfbfb`, `--stone #acaba9`, `--hairline #eaeaea`
- **Fonts:** Montserrat (headings), Outfit (UI/labels), Manrope (body)
- **Spacing scale:** `8 / 16 / 24 / 32 / 40 / 64 / 80 / 120px` — no ad-hoc values

## Notes on About / Contact pages

The source file only included a landing page and a booking modal — no About or Contact page
existed to copy. Those two pages were newly designed to match the same minimalist system (same
dark page-hero treatment, hairline-bordered cards, spacing scale and type) rather than invented
freely, so the whole site feels like one continuous product. Copy/content on those two pages
(team names, timeline, stats, hours) is placeholder — swap in real studio details before
launch.

## Booking modal

The "Book a Consultation" button/modal is available globally (header, hero, CTA bands) via
`BookingModalContext` — open it from any component with `useBookingModal().openBooking()`.
Submitting the form builds a `mailto:` link (same behavior as the original site) addressed to
`baseplanarchitects@gmail.com`.
