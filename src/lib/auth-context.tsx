'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { api, AuthResponse } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  country: string;
  currency: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  currency: string;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; countryCode: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function parseJwt(token: string): Record<string, unknown> {
  try {
    const base64Url = token.split('.')[1]!;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

function tokenToUser(token: string): User {
  const payload = parseJwt(token);
  return {
    id: payload['sub'] as string,
    email: payload['email'] as string,
    firstName: '',
    lastName: '',
    role: payload['role'] as string,
    country: (payload['country'] as string) ?? 'NG',
    currency: (payload['currency'] as string) ?? 'NGN',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('mn_access_token');
    const storedRefresh = localStorage.getItem('mn_refresh_token');

    if (storedToken) {
      api.setToken(storedToken);
      setUser(tokenToUser(storedToken));
      setRefreshToken(storedRefresh);
      // Ensure session cookie is present
      document.cookie = 'mn_session=1; path=/; SameSite=Lax; max-age=604800';
    }
    setIsLoading(false);
  }, []);

  // Token refresh loop (every 12 minutes for 15-min token)
  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(async () => {
      try {
        const result = await api.refreshToken(refreshToken);
        const { accessToken, refreshToken: newRefresh } = result.data;
        api.setToken(accessToken);
        localStorage.setItem('mn_access_token', accessToken);
        localStorage.setItem('mn_refresh_token', newRefresh);
        setRefreshToken(newRefresh);
        setUser(tokenToUser(accessToken));
      } catch {
        // Refresh failed — session expired
        logout();
      }
    }, 12 * 60 * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  const handleAuthResponse = useCallback((data: AuthResponse) => {
    api.setToken(data.accessToken);
    localStorage.setItem('mn_access_token', data.accessToken);
    localStorage.setItem('mn_refresh_token', data.refreshToken);
    // Set a session indicator cookie (not HttpOnly) so middleware can detect auth state
    document.cookie = 'mn_session=1; path=/; SameSite=Lax; max-age=604800';
    setRefreshToken(data.refreshToken);
    setUser(tokenToUser(data.accessToken));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await api.login(email, password);
    handleAuthResponse(result.data);
  }, [handleAuthResponse]);

  const register = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string; countryCode: string }) => {
    const result = await api.register(data);
    handleAuthResponse(result.data);
  }, [handleAuthResponse]);

  const logout = useCallback(() => {
    const rt = localStorage.getItem('mn_refresh_token');
    if (rt) api.logout(rt).catch(() => {});
    api.setToken(null);
    localStorage.removeItem('mn_access_token');
    localStorage.removeItem('mn_refresh_token');
    // Clear session indicator cookie
    document.cookie = 'mn_session=; path=/; SameSite=Lax; max-age=0';
    setUser(null);
    setRefreshToken(null);
  }, []);

  const currency = user?.currency ?? 'NGN';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, currency, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
