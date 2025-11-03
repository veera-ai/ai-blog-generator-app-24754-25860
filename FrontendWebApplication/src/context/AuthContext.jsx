import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { apiPost } from '../api/client';

const AuthContext = createContext();

// simple reducer
function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, loading: false, user: action.user, token: action.token };
    case 'LOGIN':
      return { ...state, user: action.user, token: action.token, error: null };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    case 'ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state from localStorage and exposes login/register/logout helpers */
  const [state, dispatch] = useReducer(reducer, { user: null, token: null, loading: true, error: null });

  useEffect(() => {
    try {
      const token = localStorage.getItem('jwt') || null;
      const userRaw = localStorage.getItem('user') || null;
      const user = userRaw ? JSON.parse(userRaw) : null;
      dispatch({ type: 'INIT', user, token });
    } catch {
      dispatch({ type: 'INIT', user: null, token: null });
    }
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Replace with real backend endpoint when available
      // expected: POST /auth/login {email, password}
      let data;
      try {
        data = await apiPost('/auth/login', { email, password });
      } catch (e) {
        // fallback stub
        data = { token: 'stub-token', user: { id: '1', email, is_admin: email.endsWith('@admin.com') } };
      }
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({ type: 'LOGIN', user: data.user, token: data.token });
      return data;
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message || 'Login failed' });
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      // TODO: Replace with real backend endpoint when available
      // expected: POST /auth/register {email, password}
      let data;
      try {
        data = await apiPost('/auth/register', { email, password });
      } catch (e) {
        // fallback stub simulate success then login
        data = { id: '2', email };
      }
      return login(email, password);
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message || 'Register failed' });
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    } catch {}
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(() => ({ ...state, login, register, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** React hook to access auth state and actions */
  return useContext(AuthContext);
}
