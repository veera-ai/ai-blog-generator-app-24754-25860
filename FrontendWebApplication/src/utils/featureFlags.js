const raw = process.env.REACT_APP_FEATURE_FLAGS || '';
let flags = {};
try {
  // allow JSON like {"admin":true}
  if (raw.trim().startsWith('{')) {
    flags = JSON.parse(raw);
  } else {
    // allow comma separated: admin,export_pdf
    raw.split(',').map(s => s.trim()).filter(Boolean).forEach(k => (flags[k] = true));
  }
} catch {
  flags = {};
}

// PUBLIC_INTERFACE
export function isFeatureEnabled(name) {
  /** Returns true if a feature flag is enabled via env REACT_APP_FEATURE_FLAGS */
  return !!flags[name];
}

// PUBLIC_INTERFACE
export function getAllFlags() {
  /** Returns parsed flags object */
  return { ...flags };
}
