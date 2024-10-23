import { createContext, useState, useContext, ReactNode } from 'react';
import UseFetch from './Fetch';
import { User } from '../types/user';
import { useLocalStorage } from './useLocalStorage';

interface AuthContextProps {
  authenticate: (phone: string, password: string) => void;
  register: (name: string, email: string, phone: string, gender: string, password: string, imageUrl?: string) => void;
  logout: (phone: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { getData, error, loading } = UseFetch();
  const [userStorage, setUserStorage, removeUserStorage] = useLocalStorage('userDetails');
  const [token, setToken, removeToken] = useLocalStorage('tokenAPI');

  const authenticate = async (phone: string, password: string) => {
    try {
      const loginOpts = {
        method: 'POST',
        body: JSON.stringify({ phone, password }),
        headers: { 'Content-Type': 'application/json' }
      }
      const fetchData = await getData('login', loginOpts);
      setToken(fetchData?.token);
      setUserStorage(fetchData?.user);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  
  const register = async (name: string, email: string, phone: string, gender: string, password: string, imageUrl?: string) => {
    const registerOpts = {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, imageUrl, password, gender }),
      headers: { 'Content-Type': 'application/json' }
    }
    await getData('api/register', registerOpts);
  }
  
  const logout = async (phone: string) => {
    
    try {
      const logoutOpts = {
        method: 'post',
        body: JSON.stringify({"phone": phone}),
        headers: { 'Content-Type': 'application/json' }
      }
      const fetchData = await getData('users/logout', logoutOpts);
      removeUserStorage();
      removeToken();
    } catch (error) {
      console.error("logout failed: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ authenticate, register, logout, loading }}>
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