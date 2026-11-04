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
