import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

// PUBLIC_INTERFACE
export default function Admin() {
  /** Admin page */
  return (
    <section className="retro-section">
      <h2>Admin</h2>
      <AdminDashboard />
    </section>
  );
}
