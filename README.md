# P K Das College of Physiotherapy — Website

A fully static marketing website for P K Das College of Physiotherapy
(Vaniyamkulam, Ottapalam, Palakkad), built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**. No backend, no database — pure
frontend, exported as static HTML/CSS/JS.
## Design

- **Signature motif:** a goniometer (the angle-measuring tool used in every
  physiotherapy assessment) drives the hero graphic, section dividers
  (tick-rule), and numbered highlight cards — tying the visual language
  directly to the discipline instead of generic medical-cross iconography.
- **Palette:** Deep Clinical Navy `#0E2A47`, Vital Green `#2F9E6E` (drawn
  from the college logo), Recovery Amber `#E8963C` for calls to action, on a
  cool paper background `#F5F7F6`.
- **Type:** Fraunces (display/serif) for warmth and authority, IBM Plex Sans
  for body copy, IBM Plex Mono for labels/eyebrows/stats — a clinical,
  precise accent.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building the static export

```bash
npm run build
```

`next.config.js` is set to `output: 'export'`, so the build produces a fully
static site in the `out/` folder — upload that folder's contents to any
static host (Netlify, Vercel, GitHub Pages, cPanel, S3, etc.). No Node
server is required to run the site in production.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Assembles all sections
  globals.css         Tailwind + custom utility classes
components/
  Navbar.tsx          Sticky header + utility bar
  Hero.tsx            Hero + goniometer signature graphic
  About.tsx           Welcome / about copy
  MissionVision.tsx    Mission, vision, highlight strip
  Departments.tsx      9 department/lab cards
  AdmissionsCTA.tsx    Apply Now / Enquire Now banner
  Contact.tsx          Contact cards + Google Map preview
  Footer.tsx           Footer
  DeptIcons.tsx         Hand-drawn line icons for each department
  Reveal.tsx            Scroll-reveal animation wrapper (client component)
lib/
  content.ts            All editable site copy: contact info, departments,
                          highlights — edit this file to update content
                          without touching layout code
public/
  logo.png              College logo
```

## Editing content

Almost all text (contact details, department names/descriptions, mission &
vision, highlight cards) lives in **`lib/content.ts`** — update it there and
it flows through the whole site.

## Notes

- The Google Map is an embed pointed at the campus address; the "Open in
  Google Maps" button deep-links to Google Maps search for driving
  directions. No API key is required.
- "Apply Now" links to a pre-filled `mailto:` to the admissions inbox by
  default — swap in a real application-form URL when one exists.
- Motion respects `prefers-reduced-motion`.
- Fully responsive from small mobile widths through tablet and desktop
  breakpoints.
