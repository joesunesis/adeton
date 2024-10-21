import { createContext, useState, useContext, ReactNode } from 'react';
import UseFetch from './Fetch';

interface AuthContextProps {
  user: null;
  data: null;
  authenticate: (phone: string, password: string) => void;
  register: (name: string, email: string, phone: string, gender: string, password: string, imageUrl?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data, getData, error, loading } = UseFetch();
  const [user, authorize] = useState(null);

  const authenticate = async (phone: string, password: string) => {
    const loginOpts = {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
      headers: { 'Content-Type': 'application/json' }
    }
    await getData('login', loginOpts);
    data ? authorize(data) : console.error("Login failed: ", error);
    data && localStorage.setItem('userDetails', JSON.stringify(user))
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

  const logout = async () => {
    await getData('user/logout');
    data ? authorize(null) : console.error("Logout failed: ", error);
    data && localStorage.removeItem('userDetails')
  }

  return (
    <AuthContext.Provider value={{ user, data, authenticate, register, logout, loading }}>
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