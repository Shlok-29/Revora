import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, unwrap } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('revora_user') || 'null'); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('revora_token'));

  const persist = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('revora_user', JSON.stringify(payload.user));
    localStorage.setItem('revora_token', payload.token);
  };

  const login = async (credentials) => persist(await unwrap(api.post('/auth/login', credentials)));
  const signup = async (details) => persist(await unwrap(api.post('/auth/signup', details)));
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('revora_user');
    localStorage.removeItem('revora_token');
  };

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('revora:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('revora:unauthorized', handleUnauthorized);
  }, []);

  const value = useMemo(() => ({ user, token, login, signup, logout, isAuthenticated: Boolean(user && token) }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
