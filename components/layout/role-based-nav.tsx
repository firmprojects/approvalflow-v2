'use client';

import { usePermissions } from '@/hooks/use-permissions';
import { User, UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Settings,
  History,
  Users,
  Shield,
  ScrollText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RoleBasedNavProps {
  user: User;
}

export function RoleBasedNav({ user }: RoleBasedNavProps) {
  const { can } = usePermissions(user);
  const pathname = usePathname();

  const baseNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Requests', href: '/dashboard/requests', icon: FileText },
    { name: 'Contracts', href: '/dashboard/contracts', icon: ScrollText },
  ];

  const approverNavItems = can({ action: 'approve', resource: 'request' })
    ? [{ name: 'Approvals', href: '/dashboard/approvals', icon: CheckSquare }]
    : [];

  const adminNavItems =
    user.role === UserRole.ADMIN
      ? [
          { name: 'User Management', href: '/dashboard/users', icon: Users },
          { name: 'Role Management', href: '/dashboard/roles', icon: Shield },
        ]
      : [];

  const commonNavItems = [
    { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: History },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const navigation = [...baseNavItems, ...approverNavItems, ...adminNavItems, ...commonNavItems];

  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <item.icon
              className={cn(
                'mr-3 h-5 w-5',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              )}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}