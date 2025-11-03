import React, { useEffect, useState } from 'react';
import { apiGet } from '../api/client';

// PUBLIC_INTERFACE
export default function HistoryList({ onSelect }) {
  /** Shows previously generated posts; selectable */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // TODO: Replace with real backend endpoint
        // expected GET /posts
        let data;
        try {
          data = await apiGet('/posts');
        } catch {
          data = { items: [] };
        }
        if (!cancelled) setItems(Array.isArray(data) ? data : data.items || []);
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed loading history');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="retro-loading">Loading history...</div>;
  if (err) return <div className="retro-error">{err}</div>;

  if (!items.length) return <div className="retro-hint">No history yet.</div>;

  return (
    <div className="retro-list">
      {items.map((it) => (
        <div key={it.id} className="retro-list-item" onClick={() => onSelect && onSelect(it)}>
          <div className="retro-list-title">{it.title || `Post ${it.id}`}</div>
          <div className="retro-list-sub">Updated: {it.updated_at || 'n/a'}</div>
        </div>
      ))}
    </div>
  );
}
