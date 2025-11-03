import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isFeatureEnabled } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Retro themed top navigation bar */
  const { user, logout } = useAuth();
  const loc = useLocation();

  return (
    <nav className="retro-navbar">
      <div className="retro-brand">
        <span role="img" aria-label="floppy">💾</span> AI Blog Generator
      </div>
      <div className="retro-links">
        <Link className={loc.pathname === '/' ? 'active' : ''} to="/">Home</Link>
        {user && <Link className={loc.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>}
        {user && <Link className={loc.pathname === '/settings' ? 'active' : ''} to="/settings">Settings</Link>}
        {user && isFeatureEnabled('admin') && user.is_admin && (
          <Link className={loc.pathname === '/admin' ? 'active' : ''} to="/admin">Admin</Link>
        )}
      </div>
      <div className="retro-actions">
        {!user ? (
          <>
            <Link to="/login" className="btn-retro">Login</Link>
            <Link to="/register" className="btn-retro btn-outline">Register</Link>
          </>
        ) : (
          <button className="btn-retro" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
