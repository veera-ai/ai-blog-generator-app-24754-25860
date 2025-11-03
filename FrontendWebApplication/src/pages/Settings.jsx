import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllFlags } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export default function Settings() {
  /** Settings page with user details and flags */
  const { user } = useAuth();
  const flags = getAllFlags();

  return (
    <section className="retro-section">
      <h2>Settings</h2>
      <div className="retro-panel">
        <div className="retro-grid">
          <div className="retro-card">
            <div className="retro-card-key">Email</div>
            <div className="retro-card-val">{user?.email || 'n/a'}</div>
          </div>
          <div className="retro-card">
            <div className="retro-card-key">Admin</div>
            <div className="retro-card-val">{user?.is_admin ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
      <div className="retro-panel">
        <h3>Feature Flags</h3>
        {!Object.keys(flags).length && <div className="retro-hint">No feature flags enabled.</div>}
        <ul className="retro-ul">
          {Object.entries(flags).map(([k, v]) => (
            <li key={k}><code>{k}</code>: {String(v)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
