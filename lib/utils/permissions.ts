import { User, UserRole, Request, RequestType } from '../types';

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'escalate';
  resource: 'request' | 'attachment' | 'comment';
}

const roleHierarchy: Record<UserRole, number> = {
  [UserRole.ADMIN]: 4,
  [UserRole.DIRECTOR]: 3,
  [UserRole.MANAGER]: 2,
  [UserRole.EMPLOYEE]: 1,
};

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.EMPLOYEE]: [
    { action: 'create', resource: 'request' },
    { action: 'read', resource: 'request' },
    { action: 'create', resource: 'attachment' },
    { action: 'delete', resource: 'attachment' },
    { action: 'create', resource: 'comment' },
  ],
  [UserRole.MANAGER]: [
    { action: 'create', resource: 'request' },
    { action: 'read', resource: 'request' },
    { action: 'approve', resource: 'request' },
    { action: 'escalate', resource: 'request' },
    { action: 'create', resource: 'attachment' },
    { action: 'delete', resource: 'attachment' },
    { action: 'create', resource: 'comment' },
  ],
  [UserRole.DIRECTOR]: [
    { action: 'create', resource: 'request' },
    { action: 'read', resource: 'request' },
    { action: 'approve', resource: 'request' },
    { action: 'escalate', resource: 'request' },
    { action: 'create', resource: 'attachment' },
    { action: 'delete', resource: 'attachment' },
    { action: 'create', resource: 'comment' },
  ],
  [UserRole.ADMIN]: [
    { action: 'create', resource: 'request' },
    { action: 'read', resource: 'request' },
    { action: 'update', resource: 'request' },
    { action: 'delete', resource: 'request' },
    { action: 'approve', resource: 'request' },
    { action: 'escalate', resource: 'request' },
    { action: 'create', resource: 'attachment' },
    { action: 'delete', resource: 'attachment' },
    { action: 'create', resource: 'comment' },
    { action: 'delete', resource: 'comment' },
  ],
};

const requestTypeApprovalLevels: Record<RequestType, UserRole[]> = {
  [RequestType.BUDGET]: [UserRole.MANAGER, UserRole.DIRECTOR],
  [RequestType.PROJECT]: [UserRole.MANAGER, UserRole.DIRECTOR],
  [RequestType.LEAVE]: [UserRole.MANAGER],
  [RequestType.PURCHASE]: [UserRole.MANAGER, UserRole.DIRECTOR],
};

export function hasPermission(user: User, permission: Permission): boolean {
  const userPermissions = rolePermissions[user.role];
  return userPermissions.some(
    (p) => p.action === permission.action && p.resource === permission.resource
  );
}

export function canApproveRequestType(user: User, requestType: RequestType): boolean {
  const requiredRoles = requestTypeApprovalLevels[requestType];
  const userRoleLevel = roleHierarchy[user.role];
  
  return requiredRoles.some(
    (role) => userRoleLevel >= roleHierarchy[role]
  );
}

export function getRequiredApprovers(requestType: RequestType): UserRole[] {
  return requestTypeApprovalLevels[requestType];
}

export function generateApprovalChain(request: Request, creator: User): UserRole[] {
  const requiredRoles = requestTypeApprovalLevels[request.type];
  
  return requiredRoles.filter(
    (role) => roleHierarchy[role] > roleHierarchy[creator.role]
  );
}

export function isNextApprover(user: User, request: Request): boolean {
  const currentApprovalStep = request.approvalChain.find(
    (step) => !step.signature
  );
  
  if (!currentApprovalStep) return false;
  
  return roleHierarchy[user.role] >= roleHierarchy[currentApprovalStep.role];
}