import { UserRole } from '@/lib/types';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  department: string;
  phoneNumber?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  department: string;
  phoneNumber?: string;
  role: UserRole;
}