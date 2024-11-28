'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Settings,
  Bell,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Requests', href: '/dashboard/requests', icon: FileText },
  { name: 'Approvals', href: '/dashboard/approvals', icon: CheckSquare },
  { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

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