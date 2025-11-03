import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login screen using AuthForm */
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (email, password) => {
    setLoading(true);
    try {
      await login(email, password);
      nav('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="retro-section">
      <h2>Login</h2>
      {error && <div className="retro-error">{error}</div>}
      <AuthForm onSubmit={onSubmit} submitLabel="Login" loading={loading} />
    </section>
  );
}
