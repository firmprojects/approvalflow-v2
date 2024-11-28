'use client';

import { usePermissions } from '@/hooks/use-permissions';
import { Permission, User } from '@/lib/types';
import { ReactNode } from 'react';

interface PermissionGateProps {
  user: User;
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({
  user,
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can } = usePermissions(user);

  if (!can(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}