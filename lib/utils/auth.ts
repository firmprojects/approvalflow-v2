import { User, UserRole } from '../types';

export function canApproveRequest(user: User, currentApproverRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.ADMIN]: 4,
    [UserRole.DIRECTOR]: 3,
    [UserRole.MANAGER]: 2,
    [UserRole.EMPLOYEE]: 1,
  };

  return roleHierarchy[user.role] >= roleHierarchy[currentApproverRole];
}