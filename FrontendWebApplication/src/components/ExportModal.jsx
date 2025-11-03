import React, { useState } from 'react';
import { toMarkdown, toHTML, triggerPdfExport } from '../utils/exporters';
import { isFeatureEnabled } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export default function ExportModal({ open, onClose, content, postId, title = 'Generated Blog Post' }) {
  /** Provides export options: Markdown, HTML, and PDF via backend if enabled */
  const [message, setMessage] = useState('');

  if (!open) return null;

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const exportMD = () => {
    const md = toMarkdown(content, { title });
    download(new Blob([md], { type: 'text/markdown;charset=utf-8' }), 'post.md');
  };

  const exportHTML = () => {
    const html = toHTML(content, { title });
    download(new Blob([html], { type: 'text/html;charset=utf-8' }), 'post.html');
  };

  const exportPDF = async () => {
    try {
      await triggerPdfExport(postId || 'temp');
      setMessage('PDF export started. You will be able to download it from history when ready.');
    } catch (e) {
      setMessage(`PDF export failed: ${e.message || e}`);
    }
  };

  return (
    <div className="retro-modal">
      <div className="retro-modal-content">
        <h3>Export</h3>
        <div className="retro-row">
          <button className="btn-retro" onClick={exportMD}>Markdown</button>
          <button className="btn-retro" onClick={exportHTML}>HTML</button>
          {isFeatureEnabled('export_pdf') && (
            <button className="btn-retro" onClick={exportPDF}>PDF (backend)</button>
          )}
        </div>
        {message && <div className="retro-hint">{message}</div>}
        <button className="btn-retro btn-outline" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
