'use client';

import { UserList } from '@/components/users/user-list';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { AddUserDialog } from '@/components/users/add-user-dialog';

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage users and their roles in the system
          </p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UserList />

      <AddUserDialog
        open={showAddUser}
        onOpenChange={setShowAddUser}
      />
    </div>
  );
}