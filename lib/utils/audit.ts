import { AuditAction, AuditLog, Request, User } from '../types';

export function createAuditLog(
  action: AuditAction,
  request: Request,
  user: User,
  details: string
): AuditLog {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    action,
    requestId: request.id,
    requestTitle: request.title,
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    details,
    ipAddress: '127.0.0.1', // In a real app, get from request context
    deviceInfo: 'Web Browser', // In a real app, get from user agent
  };
}

export function formatAuditAction(action: AuditAction): string {
  return action.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
}