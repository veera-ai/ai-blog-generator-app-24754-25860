import React from 'react';
import { apiPut, apiPost } from '../api/client';

// PUBLIC_INTERFACE
export default function Editor({ value, setValue, postId, onSaved }) {
  /** Simple textarea editor with Save hooks */
  const save = async () => {
    try {
      // Prefer PUT to /posts/:id else POST /posts
      let data;
      if (postId) {
        try {
          data = await apiPut(`/posts/${postId}`, { content: value });
        } catch {
          data = { id: postId, content: value };
        }
      } else {
        try {
          data = await apiPost('/posts', { content: value });
        } catch {
          data = { id: `local-${Date.now()}`, content: value };
        }
      }
      onSaved && onSaved(data);
    } catch (e) {
      // swallow error; page shows toast in parent ideally
      // For now just alert
      alert(`Save failed: ${e.message || e}`);
    }
  };

  return (
    <div className="retro-panel">
      <label>Editor</label>
      <textarea rows={16} value={value} onChange={e => setValue(e.target.value)} />
      <div className="retro-row end">
        <button className="btn-retro" onClick={save}>Save</button>
      </div>
    </div>
  );
}
