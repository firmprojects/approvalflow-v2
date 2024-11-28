import { User, UserRole } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface RoleIndicatorProps {
  user: User;
}

export function RoleIndicator({ user }: RoleIndicatorProps) {
  const roleConfig = {
    [UserRole.ADMIN]: {
      label: 'Admin',
      icon: ShieldAlert,
      variant: 'destructive' as const,
    },
    [UserRole.DIRECTOR]: {
      label: 'Director',
      icon: ShieldCheck,
      variant: 'default' as const,
    },
    [UserRole.MANAGER]: {
      label: 'Manager',
      icon: Shield,
      variant: 'secondary' as const,
    },
    [UserRole.EMPLOYEE]: {
      label: 'Employee',
      icon: Shield,
      variant: 'outline' as const,
    },
  };

  const config = roleConfig[user.role];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}