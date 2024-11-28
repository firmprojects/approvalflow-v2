import { RequestStatus } from '@/lib/types';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const statusConfig = {
    [RequestStatus.PENDING]: {
      icon: Clock,
      color: 'text-yellow-500',
    },
    [RequestStatus.APPROVED]: {
      icon: CheckCircle,
      color: 'text-green-500',
    },
    [RequestStatus.REJECTED]: {
      icon: XCircle,
      color: 'text-red-500',
    },
    [RequestStatus.ESCALATED]: {
      icon: AlertCircle,
      color: 'text-orange-500',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-2">
      <Icon className={cn('h-4 w-4', config.color)} />
      <span className={cn('text-sm font-medium', config.color)}>{status}</span>
    </div>
  );
}