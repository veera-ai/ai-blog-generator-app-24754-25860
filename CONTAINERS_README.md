# Containers Quick Start

Start Order
1) Database
   - Port: 5000
   - DB_NAME: ai_blog_generator_db
2) Backend
   - Port: 8000
   - CORS: http://localhost:3000
   - Connect to Database above
3) Frontend
   - Port: 3000
   - REACT_APP_API_BASE=http://localhost:8000

Smoke Test
- In the frontend app:
  - Register, Login, Generate content, Save, Export (Markdown/HTML; PDF if enabled via export flag)
