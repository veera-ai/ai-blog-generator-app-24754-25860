# AI Blog Generator - Frontend (React)

Retro-themed React app with routing, auth scaffolding, generator/editor/export flows, and API client integration.

## Quick Start
1. Copy `.env.example` to `.env` and configure:
   - `REACT_APP_API_BASE` (backend base URL)
   - `REACT_APP_FEATURE_FLAGS` (e.g., `admin,export_pdf`)

2. Install dependencies:
   - `npm install`

3. Run:
   - `npm start` (dev)
   - `npm run build` (prod)

## Routes
- `/` Home
- `/login`, `/register`
- `/dashboard` (auth required)
- `/settings` (auth required)
- `/admin` (auth + `admin` flag + `user.is_admin`)

## Feature Flags
See `FEATURE_FLAGS.md`.

## Notes
- Auth, generation, posts, admin stats, and PDF export call the backend with TODO stubs if endpoints are not available yet.
- Retro styles are in `public/retro-styles.css` and linked in `public/index.html`.
