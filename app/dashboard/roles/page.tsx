'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserRole, Permission } from '@/lib/types';
import { RolePermissionDialog } from '@/components/roles/role-permission-dialog';
import { Shield, Users, FileText, CheckSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const rolePermissions = {
  [UserRole.ADMIN]: {
    requests: ['create', 'read', 'update', 'delete', 'approve'],
    users: ['create', 'read', 'update', 'delete'],
    roles: ['manage'],
    audit: ['view', 'export'],
  },
  [UserRole.DIRECTOR]: {
    requests: ['create', 'read', 'approve', 'escalate'],
    users: ['read'],
    audit: ['view'],
  },
  [UserRole.MANAGER]: {
    requests: ['create', 'read', 'approve'],
    users: ['read'],
    audit: ['view'],
  },
  [UserRole.EMPLOYEE]: {
    requests: ['create', 'read'],
    audit: ['view'],
  },
};

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  const handleUpdatePermissions = async (
    role: UserRole,
    permissions: Record<string, string[]>
  ) => {
    // TODO: Implement actual permission update logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Permissions Updated',
      description: `Successfully updated permissions for ${role} role.`,
      duration: 3000,
    });
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="h-4 w-4" />;
      case UserRole.DIRECTOR:
        return <CheckSquare className="h-4 w-4" />;
      case UserRole.MANAGER:
        return <FileText className="h-4 w-4" />;
      case UserRole.EMPLOYEE:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800 border-red-200';
      case UserRole.DIRECTOR:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case UserRole.EMPLOYEE:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
        <p className="text-muted-foreground">
          Configure roles and their associated permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Manage permissions for different user roles in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(UserRole).map((role) => (
                <TableRow key={role}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role)}
                      <Badge className={getRoleBadgeColor(role)}>
                        {role}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {role === UserRole.ADMIN && 'Full system access and control'}
                    {role === UserRole.DIRECTOR &&
                      'Department-wide approval authority'}
                    {role === UserRole.MANAGER &&
                      'Team-level approval capabilities'}
                    {role === UserRole.EMPLOYEE && 'Basic system access'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(rolePermissions[role]).map(
                        ([category, perms]) => (
                          <Badge
                            key={category}
                            variant="outline"
                            className="text-xs"
                          >
                            {category}: {perms.length}
                          </Badge>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRole(role)}
                    >
                      Edit Permissions
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRole && (
        <RolePermissionDialog
          role={selectedRole}
          permissions={rolePermissions[selectedRole]}
          onClose={() => setSelectedRole(null)}
          onUpdate={(permissions) =>
            handleUpdatePermissions(selectedRole, permissions)
          }
        />
      )}
    </div>
  );
}