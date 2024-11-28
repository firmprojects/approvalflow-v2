'use client';

import { Button } from '@/components/ui/button';
import { RequestList } from '@/components/requests/request-list';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Requests</h2>
          <p className="text-muted-foreground">
            Manage and track your approval requests
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/requests/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      <RequestList />
    </div>
  );
}