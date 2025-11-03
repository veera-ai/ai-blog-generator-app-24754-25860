# AI Blog Generator - Repository Overview

This repository contains a multi-container application:
- FrontendWebApplication (React, port 3000)
- BackendAPIService (FastAPI, port 8000)
- Database (PostgreSQL, port 5000; database name: ai_blog_generator_db)

Quick Start (Local)
1) Start Database
   - Ensure PostgreSQL is running on localhost:5000 with DB_NAME=ai_blog_generator_db
   - Create the DB if needed and note connection env vars for the backend
2) Start Backend
   - Configure backend to connect to the database above
   - Ensure CORS allows http://localhost:3000
   - Start FastAPI on http://localhost:8000
3) Start Frontend
   - cd ai-blog-generator-app-24754-25860/FrontendWebApplication
   - cp .env.example .env (ensure REACT_APP_API_BASE=http://localhost:8000)
   - npm install && npm start (http://localhost:3000)

Environment Variables Summary
- Frontend:
  - REACT_APP_API_BASE (required) e.g., http://localhost:8000
  - REACT_APP_FEATURE_FLAGS (optional) e.g., admin,export_pdf
- Backend:
  - Must include DB connection variables and CORS origin(s) (e.g., http://localhost:3000)
- Database:
  - DB_NAME=ai_blog_generator_db
  - Port 5000 (for local development)

For detailed container-specific instructions, see each container's README.
