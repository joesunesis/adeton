import { createContext, useContext, ReactNode } from 'react';
import UseFetch from './Fetch';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types/user';

interface AuthContextProps {
  user: User | null;
  token: string | null;
  authenticate: (phone: string, password: string) => Promise<void>;
  register: (name: string, phone: string, gender: string, password: string, imageUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: any;
  redirect: string;
  setRedirect: (path: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { getData, error, loading } = UseFetch();
  const [user, setUser, removeUser] = useLocalStorage<User | null>('userDetails', null);
  const [token, setToken, removeToken] = useLocalStorage<string | null>('tokenAPI', null);
  const [redirect, setRedirect, removeRedirect] = useLocalStorage<string>('redirect', '/');

  const authenticate = async (phone: string, password: string) => {
    const fetchData = await getData('login', {
        method: 'POST',
        body: JSON.stringify({ phone, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (fetchData) {
        setToken(fetchData.token);
        setUser(fetchData.user);
      } else {
        throw new Error("Authentication failed");
      }
  };
  
  const register = async (name: string, phone: string, gender: string, password: string, imageUrl?: string) => {
    try {
      await getData('register', {
        method: 'POST',
        body: JSON.stringify({ name, phone, imageUrl, password, gender }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (error) throw new Error(`Registration failed: ${error}`);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const logout = async () => {
    try {
      await getData('users/logout', {
        method: 'POST',
        body: JSON.stringify({ phone: user?.phone }),
        headers: { 'Content-Type': 'application/json' }
      });
      removeUser();
      removeRedirect();
      removeToken();
      if (error) throw new Error("Logout failed");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, authenticate, register, logout, loading, error, redirect, setRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
