import { getApiBase } from '../api/client';
import { isFeatureEnabled } from './featureFlags';

// PUBLIC_INTERFACE
export function toMarkdown(content, metadata = {}) {
  /** Create a basic Markdown document from content and metadata */
  const title = metadata.title || 'Generated Blog Post';
  const date = new Date().toISOString();
  return `# ${title}\n\n_Date: ${date}_\n\n${content}\n`;
}

// PUBLIC_INTERFACE
export function toHTML(content, metadata = {}) {
  /** Create simple HTML document */
  const title = metadata.title || 'Generated Blog Post';
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
body { font-family: 'Courier New', monospace; line-height: 1.6; padding: 24px; background:#111; color:#0f0; }
h1 { color:#ff0; }
a { color:#0ff; }
pre, code { background:#000; color:#0f0; padding:4px; }
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<article>${wrapParagraphs(content)}</article>
</body>
</html>`;
}

// PUBLIC_INTERFACE
export function triggerPdfExport(postId) {
  /** Trigger backend PDF export for a given postId. Requires export_pdf feature flag. */
  if (!isFeatureEnabled('export_pdf')) {
    return Promise.reject(new Error('PDF export is disabled by feature flag.'));
  }
  const base = getApiBase();
  // Expected backend route; replace as needed
  const url = `${base}/export/pdf/${encodeURIComponent(postId)}`;
  return fetch(url, { method: 'POST' }).then(r => {
    if (!r.ok) throw new Error('Failed to start PDF export');
    return r.json().catch(() => ({}));
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}
function wrapParagraphs(content) {
  return String(content)
    .split(/\n{2,}/)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}
