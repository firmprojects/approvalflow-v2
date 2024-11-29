'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RequestType, RequestStatus } from '@/lib/types';
import { RequestStatusIcon } from './request-status-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequests } from '@/hooks/use-requests';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Virtuoso } from 'react-virtuoso';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 20;

function RequestListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export function RequestList() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<RequestStatus | undefined>();
  const [type, setType] = useState<RequestType | undefined>();
  const [page, setPage] = useState(1);
  
  const debouncedSearch = useDebounce(search, 300);
  
  const { requests, loading, error, totalCount } = useRequests({
    search: debouncedSearch,
    status,
    type,
    page,
    limit: PAGE_SIZE,
  });

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading requests: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as RequestStatus)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={undefined}>All Statuses</SelectItem>
            {Object.values(RequestStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={type}
          onValueChange={(value) => setType(value as RequestType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={undefined}>All Types</SelectItem>
            {Object.values(RequestType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Request List */}
      {loading ? (
        <RequestListSkeleton />
      ) : requests.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No requests found
        </div>
      ) : (
        <ErrorBoundary>
          <Virtuoso
            style={{ height: 'calc(100vh - 300px)' }}
            totalCount={totalCount}
            itemContent={(index) => {
              const request = requests[index];
              if (!request) return null;

              return (
                <Card key={request.id} className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-xl">{request.title}</CardTitle>
                      <CardDescription>
                        Created on {request.createdAt.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RequestStatusIcon status={request.status} />
                      <span
                        className={`text-sm font-medium ${
                          request.status === RequestStatus.APPROVED
                            ? 'text-green-500'
                            : request.status === RequestStatus.REJECTED
                            ? 'text-red-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Current Approver: {request.currentApprover}
                      </div>
                      <Button asChild variant="outline">
                        <Link href={`/dashboard/requests/${request.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            }}
            endReached={() => {
              if (requests.length < totalCount) {
                setPage((prev) => prev + 1);
              }
            }}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}