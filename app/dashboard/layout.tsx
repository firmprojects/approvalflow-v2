'use client';

import { RoleBasedNav } from '@/components/layout/role-based-nav';
import { UserNav } from '@/components/layout/user-nav';
import { RoleIndicator } from '@/components/layout/role-indicator';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/use-notifications';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { UserRole } from '@/lib/types';

// TODO: Replace with actual user data from authentication
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.ADMIN,
  department: 'Engineering',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    notifications,
    loading,
    error,
    markAsRead,
    unreadCount,
  } = useNotifications();

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4">
            <div className="text-xl font-bold">ApprovalFlow</div>
            <div className="ml-4">
              <RoleIndicator user={mockUser} />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <ScrollArea className="h-80">
                    {loading ? (
                      <div className="space-y-2 p-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[150px]" />
                              <Skeleton className="h-4 w-[100px]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                      </div>
                    ) : (
                      <div className="grid gap-2 p-2">
                        {notifications.map((notification) => (
                          <Button
                            key={notification.id}
                            variant="ghost"
                            className={cn(
                              'w-full justify-start gap-2 p-3',
                              !notification.read && 'bg-muted/50'
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="grid gap-1 text-left">
                              <div className="font-semibold">
                                {notification.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {notification.message}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(notification.createdAt, {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
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

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </div>
      </ErrorBoundary>
    </div>
  );
}