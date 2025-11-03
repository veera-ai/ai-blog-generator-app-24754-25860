# AI Blog Generator - Frontend (React)

Retro-themed React app with routing, auth scaffolding, generator/editor/export flows, and API client integration.

## Quick Start
Recommended container start order:
1) Database → 2) Backend → 3) Frontend

1. Copy `.env.example` to `.env` and configure:
   - `REACT_APP_API_BASE` (backend base URL, default http://localhost:8000)
   - `REACT_APP_FEATURE_FLAGS` (e.g., `admin,export_pdf`)

2. Ensure Backend is running at the URL in `REACT_APP_API_BASE`:
   - Default local backend URL: `http://localhost:8000`
   - CORS must allow `http://localhost:3000`

3. Install dependencies:
   - `npm install`

4. Run:
   - `npm start` (dev, runs on http://localhost:3000)
   - `npm run build` (prod)

## Backend URL
- This frontend reads `process.env.REACT_APP_API_BASE` to reach the backend (FastAPI).
- A legacy alias `REACT_APP_BACKEND_URL` is supported by the API client, but `REACT_APP_API_BASE` is the preferred variable.
- Ensure the backend CORS includes `http://localhost:3000`.

## Routes
- `/` Home
- `/login`, `/register`
- `/dashboard` (auth required)
- `/settings` (auth required)
- `/admin` (auth + `admin` flag + `user.is_admin`)

## Feature Flags
See `FEATURE_FLAGS.md`.

## SMOKE_TESTS
Perform this quick flow to validate end-to-end:
1. Register:
   - Go to `/register`
   - Create an account with email and password
2. Login:
   - After register, you should be redirected/logged in
   - If not, go to `/login` and sign in
3. Generate:
   - Navigate to `/dashboard`
   - In Generator, enter a Topic and (optionally) Keywords, choose Tone/Length, click Generate
   - You should see content appear in the Editor/Preview
4. Save:
   - Click Save in the Editor (will call POST/PUT to the backend)
   - Confirm no error appears
5. Export:
   - Click Export
   - Download as Markdown and HTML
   - If `export_pdf` flag is enabled, click "PDF (backend)" to trigger a backend PDF export

## Notes
- Auth, generation, posts, admin stats, and PDF export call the backend with TODO stubs if endpoints are not available yet.
- Retro styles are in `public/retro-styles.css` and linked in `public/index.html`.
