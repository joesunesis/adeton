import { createContext, useState, useContext, ReactNode } from 'react';
import UseFetch from './Fetch';
import { User } from '../types/user';

interface AuthContextProps {
  data: null;
  authenticate: (phone: string, password: string) => void;
  register: (name: string, email: string, phone: string, gender: string, password: string, imageUrl?: string) => void;
  logout: (phone: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data, getData, error, loading } = UseFetch();
  const [user, authorize] = useState<User | null>();

  const authenticate = async (phone: string, password: string) => {
    const loginOpts = {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
      headers: { 'Content-Type': 'application/json' }
    }
    await getData('login', loginOpts);
    if (!data) {
      console.error("login failed: ", error);
      return;
    }
    authorize(data?.user);
    localStorage.setItem('tokenAPI', data?.token)
    localStorage.setItem('userDetails', JSON.stringify(user))
  };

  const register = async (name: string, email: string, phone: string, gender: string, password: string, imageUrl?: string) => {
    const registerOpts = {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, imageUrl, password, gender }),
      headers: { 'Content-Type': 'application/json' }
    }
    await getData('api/register', registerOpts);
    (!data) && console.error("Register failed", error); 
  }

  const logout = async (phone: string) => {
    const logoutOpts = {
      method: 'post',
      body: {phone},
      headers: { 'Content-Type': 'application/json' }
    }
    await getData('user/logout', logoutOpts);
    if (!data) {
      console.error("logout failed: ", error);
      return;
    }
    authorize(null);
    localStorage.removeItem('userDetails')
    localStorage.setItem('tokenAPI', data?.token)
  }

  return (
    <AuthContext.Provider value={{ data, authenticate, register, logout, loading }}>
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