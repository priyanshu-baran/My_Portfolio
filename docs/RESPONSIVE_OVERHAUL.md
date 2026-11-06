# Responsive + performance overhaul

Branch: `feature/responsive-overhaul`

## What changed (and where)
| Area | Files |
|---|---|
| Removed the "desktop only" block (<1500px) | `public/index.html` |
| Real loading (no fake 5s/2s timers), lazy-loaded main page + globe | `src/App.js`, `src/Home.js`, `src/MainPage.js`, `src/ContactUs.js` |
| Parallax (cover-stage, touch drag / gyro / auto-drift, cleanup, reduced motion) | `src/Home.js`, `src/css/home.css` |
| Redesigned landing headline | `src/Home.js`, `src/css/hero.css` |
| Cursor trail (mouse only, GPU transforms, no leak) + tap ripple on touch | `src/Cursor.js` |
| Dock (no per-icon rAF loops, links not reloads, labels, active section, mobile bar) | `src/Dock.js`, `src/css/responsive.css` |
| Theme (system preference, saved, circular reveal, accessible switch) | `src/App.js`, `src/Main.js`, `src/css/a11y.css` |
| Tablet / phone layouts | `src/css/responsive.css` |
| Accessibility + reduced motion | `src/css/a11y.css`, component markup |
| Assets: 46 MB PNG/JPG -> WebP (+ `-sm` variants), globe textures bundled, 28 MB video removed | `public/img/*` |

## Notes
- Contact form now opens the visitor's mail app (mailto) because there is no backend.
- `public/img/og-preview.jpg` is the link-preview image; replace with a nicer one any time.
- The "Rocher" colour font is still hot-linked from codepen (as before). Consider self-hosting it.
- Tooling (Create React App) was intentionally not migrated in this branch.

---

## Update 2: main-page redesign + faster landing load

### Editing your content (no code changes needed)
Everything on the main page comes from **`src/data/portfolio.js`**: profile, journey, skill groups, projects, contact. The file starts with a "how to add things" guide:
- new skill: add `{ name: 'Docker' }` to a group's `skills`
- new project: copy a block in `projects` (newest first; leave out links you do not have)
- new journey item: copy a block in `journey` (`type`: education | school | achievement | work | project)
Images go in `public/img` and are referred to as `/img/<name>`. If you replace an image, give it a new name (browsers cache `/img/*` for 30 days, see `netlify.toml`).

### Main page structure
`src/Main.js` (shell, theme toggle, share/download) -> `src/sections/{Hero,Journey,Skills,Projects,Contact}.js`.
Styles: `src/css/portfolio.css` (colour tokens for day/night live at the top).

### Landing-page loading
1. `public/index.html` paints an instant loader from HTML alone (no JS needed).
2. `public/preload.js` starts fetching the back scene layers while the JS bundle downloads.
3. Scene images are AVIF (WebP fallback): about 1.2 MB desktop / 1.0 MB phone (was ~5 MB).
4. The intro starts when the small "tier 1" layers are in; near layers (tier 2) arrive afterwards and rise into place one by one.
5. While the intro plays, the main page code and its first images are prefetched, so Explore feels instant.
Tier lists live in `src/landingAssets.js` (keep in sync with `public/preload.js`).
