'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    try {
      // TODO: Implement your sign in logic here
      // For now, we'll just simulate a successful sign in
      const user: User = {
        id: '1',
        email,
        name: 'Test User',
        role: UserRole.ADMIN,
        department: 'Engineering',
        phoneNumber: '+1234567890',
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast({
        title: 'Success',
        description: 'Successfully signed in!',
      });
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: (err as Error).message,
        variant: 'destructive',
      });
      throw err;
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      // TODO: Implement your sign up logic here
      // For now, we'll just simulate a successful sign up
      const user: User = {
        id: '1',
        email,
        name,
        role: UserRole.EMPLOYEE, // New users start as employees
        department: 'Engineering',
        phoneNumber: '+1234567890',
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: (err as Error).message,
        variant: 'destructive',
      });
      throw err;
    }
  }

  async function signOut() {
    try {
      // Remove user from local storage
      localStorage.removeItem('user');
      setUser(null);
      toast({
        title: 'Success',
        description: 'Successfully signed out!',
      });
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: (err as Error).message,
        variant: 'destructive',
      });
      throw err;
    }
  }

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
