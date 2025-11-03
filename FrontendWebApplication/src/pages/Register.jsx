import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Register() {
  /** Register screen using AuthForm */
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (email, password) => {
    setLoading(true);
    try {
      await register(email, password);
      nav('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="retro-section">
      <h2>Create Account</h2>
      {error && <div className="retro-error">{error}</div>}
      <AuthForm onSubmit={onSubmit} submitLabel="Register" loading={loading} />
    </section>
  );
}
