import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types/user';
import { supabase } from '../../lib/supabase';
import { AuthError } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  authenticate: (phone: string, password: string) => Promise<void>;
  register: (phone: string, password: string, userData: Omit<User, 'id' | 'phone'>) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: AuthError | null;
  redirect: string;
  setRedirect: (path: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser, removeUser] = useLocalStorage<User | null>('userDetails', null);
  const [loading, setLoading] = useLocalStorage<boolean>('loading', false);
  const [error, setError] = useLocalStorage<AuthError | null>('authError', null);
  const [redirect, setRedirect, removeRedirect] = useLocalStorage<string>('redirect', '/');

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userData) {
            setUser(userData as User);
          } else if (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          removeUser();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [removeUser, setUser]);

  const authenticate = async (phone: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;
        setUser(userData as User);
      }
    } catch (err) {
      setError(err as AuthError);
      console.error('Authentication failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (phone: string, password: string, userData: Omit<User, 'id' | 'phone'>) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Create auth user
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // 2. Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            phone,
            ...userData,
          },
        ]);

      if (profileError) throw profileError;

      // 3. Fetch complete user data
      const { data: newUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (fetchError) throw fetchError;
      setUser(newUser as User);
    } catch (err) {
      setError(err as AuthError);
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      removeUser();
      removeRedirect();
    } catch (err) {
      setError(err as AuthError);
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, register, logout, loading, error, redirect, setRedirect }}>
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
