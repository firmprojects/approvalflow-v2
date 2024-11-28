'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserRole } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface RolePermissionDialogProps {
  role: UserRole;
  permissions: Record<string, string[]>;
  onClose: () => void;
  onUpdate: (permissions: Record<string, string[]>) => Promise<void>;
}

const availablePermissions = {
  requests: [
    'create',
    'read',
    'update',
    'delete',
    'approve',
    'escalate',
  ],
  users: ['create', 'read', 'update', 'delete'],
  roles: ['manage'],
  audit: ['view', 'export'],
};

export function RolePermissionDialog({
  role,
  permissions,
  onClose,
  onUpdate,
}: RolePermissionDialogProps) {
  const [currentPermissions, setCurrentPermissions] = useState(permissions);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePermissionChange = (category: string, permission: string) => {
    setCurrentPermissions((prev) => {
      const categoryPermissions = prev[category] || [];
      const updated = categoryPermissions.includes(permission)
        ? categoryPermissions.filter((p) => p !== permission)
        : [...categoryPermissions, permission];

      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(currentPermissions);
      onClose();
    } catch (error) {
      console.error('Failed to update permissions:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit {role} Permissions</DialogTitle>
          <DialogDescription>
            Configure the permissions for this role. Changes will affect all users
            with this role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(availablePermissions).map(([category, perms]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-medium capitalize">{category}</h4>
              <div className="grid grid-cols-2 gap-4">
                {perms.map((permission) => (
                  <div
                    key={`${category}-${permission}`}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${category}-${permission}`}
                      checked={(currentPermissions[category] || []).includes(
                        permission
                      )}
                      onCheckedChange={() =>
                        handlePermissionChange(category, permission)
                      }
                      disabled={role === UserRole.ADMIN}
                    />
                    <Label
                      htmlFor={`${category}-${permission}`}
                      className="capitalize"
                    >
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}