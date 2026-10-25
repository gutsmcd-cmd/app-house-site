# M@ Apps · App House

*… a family of TRULY free apps :D* — live at https://gutsmcd-cmd.github.io/app-house-site/

- `public/apps.json` is the single source of truth: rooms, EN/JA names, blurbs, how-to steps, Awesome/Unique tags, `added` dates (New badge for 14 days), `soon` (attic).
- `public/shots/<id>.webp` are preview screenshots.
- Push to `main` → GitHub Actions builds (Vite + Preact) and publishes to `gh-pages`.
- All house art is original SVG (`src/houses.jsx`).
