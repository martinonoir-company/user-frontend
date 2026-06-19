'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { api } from '@/lib/api';

/**
 * Separate auth context for the marketing-agent /agent/* surface.
 *
 * The customer auth context manages mn_access_token; this one manages
 * mn_agent_access_token. Keeping them in different keys means an agent
 * who is also a customer can be signed into both sides of the storefront
 * in different tabs, and a customer signing in never accidentally has
 * their token swapped for an agent token (or vice-versa).
 *
 * Both contexts call api.setToken when their pages run. Whichever
 * provider runs LAST wins for an outbound request from a shared
 * component — but storefront layouts are scoped so /agent/* only ever
 * loads the agent provider and the customer pages only load the
 * customer provider. The cart-context already swaps tokens correctly
 * because it reads localStorage on demand.
 */

interface AgentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'MARKETING_AGENT' | string;
}

interface AgentAuthContextValue {
  user: AgentUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AgentAuthContext = createContext<AgentAuthContextValue | null>(null);

const TOKEN_KEY = 'mn_agent_access_token';
const REFRESH_KEY = 'mn_agent_refresh_token';
const USER_KEY = 'mn_agent_user';

function loadStoredUser(): AgentUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AgentUser;
  } catch {
    return null;
  }
}

export function AgentAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AgentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedRefresh = localStorage.getItem(REFRESH_KEY);
    if (storedToken) {
      api.setToken(storedToken);
      setUser(loadStoredUser());
      setRefreshToken(storedRefresh);
    }
    setIsLoading(false);
  }, []);

  // Refresh loop, mirroring customer-auth-context.
  useEffect(() => {
    if (!refreshToken) return;
    const interval = setInterval(async () => {
      try {
        const result = await api.refreshToken(refreshToken);
        const { accessToken, refreshToken: newRefresh } = result.data;
        api.setToken(accessToken);
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_KEY, newRefresh);
        setRefreshToken(newRefresh);
      } catch {
        logout();
      }
    }, 12 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.agentLogin(email, password);
    const { accessToken, refreshToken: newRefresh, user: u } = res.data;
    api.setToken(accessToken);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, newRefresh);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setRefreshToken(newRefresh);
    setUser({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
    });
  }, []);

  const logout = useCallback(() => {
    const rt = localStorage.getItem(REFRESH_KEY);
    if (rt) api.logout(rt).catch(() => {});
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    // Restore the customer token, if any, so navigating back to the
    // shop area doesn't break the customer's session.
    const customerToken = localStorage.getItem('mn_access_token');
    api.setToken(customerToken ?? null);
    setUser(null);
    setRefreshToken(null);
  }, []);

  return (
    <AgentAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AgentAuthContext.Provider>
  );
}

export function useAgentAuth() {
  const ctx = useContext(AgentAuthContext);
  if (!ctx)
    throw new Error('useAgentAuth must be used within AgentAuthProvider');
  return ctx;
}
