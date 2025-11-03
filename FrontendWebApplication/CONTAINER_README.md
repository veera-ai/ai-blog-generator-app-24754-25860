# FrontendWebApplication Container

Ports
- 3000 (development server)

Environment Variables
- REACT_APP_API_BASE (required) e.g., http://localhost:8000
- REACT_APP_FEATURE_FLAGS (optional) e.g., admin,export_pdf

Quick Start Order
1) Database → 2) Backend → 3) Frontend

Commands
- npm install
- npm start

Smoke Tests (manual)
- Register → Login → Generate → Save → Export (MD/HTML and optionally PDF if export_pdf flag is enabled)
