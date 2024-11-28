'use client';

import { RoleBasedNav } from '@/components/layout/role-based-nav';
import { UserNav } from '@/components/layout/user-nav';
import { RoleIndicator } from '@/components/layout/role-indicator';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/types';

// TODO: Replace with actual user data from authentication
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.ADMIN,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="text-xl font-bold">ApprovalFlow</div>
          <div className="ml-4">
            <RoleIndicator user={mockUser} />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <UserNav user={mockUser} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background">
          <div className="space-y-4 py-4">
            <RoleBasedNav user={mockUser} />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}