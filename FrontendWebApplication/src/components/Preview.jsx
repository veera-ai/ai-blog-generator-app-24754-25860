import React from 'react';

// PUBLIC_INTERFACE
export default function Preview({ content }) {
  /** Minimal preview of current content */
  return (
    <div className="retro-panel">
      <label>Preview</label>
      <pre className="retro-preview">{content || 'No content yet. Generate to see preview.'}</pre>
    </div>
  );
}
