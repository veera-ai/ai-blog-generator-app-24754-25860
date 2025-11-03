/* Simple fetch wrapper that automatically attaches JWT and handles JSON.
   Note: Prefer REACT_APP_API_BASE. REACT_APP_BACKEND_URL is supported as a legacy alias. */

const API_BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';

function getAuthToken() {
  try {
    return localStorage.getItem('jwt') || localStorage.getItem('token') || '';
  } catch {
    return '';
  }
}

function buildHeaders(extra = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...extra,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** Perform GET using API base and Authorization header when available. */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: buildHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  /** Perform POST with JSON body and auth header */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiPut(path, body) {
  /** Perform PUT with JSON body */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export async function apiDelete(path) {
  /** Perform DELETE */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: buildHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the resolved API base URL. */
  return API_BASE;
}
