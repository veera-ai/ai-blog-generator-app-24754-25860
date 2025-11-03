Feature Flags

Set REACT_APP_FEATURE_FLAGS in your .env as either:
- Comma separated list: admin,export_pdf
- JSON object: {"admin": true, "export_pdf": true}

Flags used:
- admin: enables access to /admin and shows link for users with user.is_admin = true
- export_pdf: shows the "PDF (backend)" export button which triggers POST {API_BASE}/export/pdf/:postId
