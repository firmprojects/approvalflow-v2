import { User, UserRole } from '../types';

const roleHierarchy: Record<UserRole, number> = {
  [UserRole.ADMIN]: 4,
  [UserRole.DIRECTOR]: 3,
  [UserRole.MANAGER]: 2,
  [UserRole.EMPLOYEE]: 1,
};

export function getManageableRoles(currentUser: User): UserRole[] {
  const currentRoleLevel = roleHierarchy[currentUser.role];
  
  return Object.entries(roleHierarchy)
    .filter(([_, level]) => level < currentRoleLevel)
    .map(([role]) => role as UserRole);
}