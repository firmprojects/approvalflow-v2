import { User, UserRole } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.ADMIN,
    department: 'Engineering',
    phoneNumber: '+1 234 567 890',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: UserRole.DIRECTOR,
    department: 'Finance',
    phoneNumber: '+1 234 567 891',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: UserRole.MANAGER,
    department: 'Marketing',
    phoneNumber: '+1 234 567 892',
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: UserRole.EMPLOYEE,
    department: 'Human Resources',
    phoneNumber: '+1 234 567 893',
  },
  {
    id: '5',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    role: UserRole.MANAGER,
    department: 'Engineering',
    phoneNumber: '+1 234 567 894',
  },
];