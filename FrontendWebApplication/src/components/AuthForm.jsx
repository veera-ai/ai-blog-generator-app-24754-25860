import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function AuthForm({ onSubmit, submitLabel = 'Submit', loading = false }) {
  /** Simple email/password form used for login/register */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="retro-panel"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
    >
      <div className="retro-field">
        <label>Email</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="retro-field">
        <label>Password</label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
      </div>
      <button className="btn-retro" type="submit" disabled={loading}>
        {loading ? 'Please wait...' : submitLabel}
      </button>
    </form>
  );
}
