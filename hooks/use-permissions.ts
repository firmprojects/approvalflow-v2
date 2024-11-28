'use client';

import { useCallback } from 'react';
import { User, Request, RequestType } from '@/lib/types';
import {
  Permission,
  hasPermission,
  canApproveRequestType,
  isNextApprover,
} from '@/lib/utils/permissions';

export function usePermissions(user: User) {
  const checkPermission = useCallback(
    (permission: Permission) => hasPermission(user, permission),
    [user]
  );

  const checkRequestApproval = useCallback(
    (requestType: RequestType) => canApproveRequestType(user, requestType),
    [user]
  );

  const checkNextApprover = useCallback(
    (request: Request) => isNextApprover(user, request),
    [user]
  );

  return {
    can: checkPermission,
    canApprove: checkRequestApproval,
    isNextApprover: checkNextApprover,
  };
}