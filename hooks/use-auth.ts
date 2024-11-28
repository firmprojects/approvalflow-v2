import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/lib/services/auth/types';
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  updatePassword,
  resetPassword,
} from '@/lib/services/auth';
import { RegisterData } from '@/lib/services/auth/types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user } = await signIn(email, password);
      setUser(user);
      router.push('/dashboard');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [router]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const user = await signUp(data);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, [router]);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    try {
      await updatePassword(oldPassword, newPassword);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
  };
}