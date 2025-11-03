import React, { useEffect, useState } from 'react';
import { apiGet } from '../api/client';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Minimal admin stats panel */
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // TODO: replace with real backend /admin/stats
        let data;
        try {
          data = await apiGet('/admin/stats');
        } catch {
          data = { users: 5, posts: 12, generation_requests: 34, uptime: '1d 3h' };
        }
        setStats(data);
      } catch (e) {
        setErr(e.message || 'Failed to load stats');
      }
    })();
  }, []);

  if (err) return <div className="retro-error">{err}</div>;
  if (!stats) return <div className="retro-loading">Loading stats...</div>;

  return (
    <div className="retro-grid">
      {Object.entries(stats).map(([k, v]) => (
        <div key={k} className="retro-card">
          <div className="retro-card-key">{k}</div>
          <div className="retro-card-val">{String(v)}</div>
        </div>
      ))}
    </div>
  );
}
