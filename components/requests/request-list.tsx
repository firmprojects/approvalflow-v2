'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RequestType, RequestStatus } from '@/lib/types';
import { RequestStatusIcon } from './request-status-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const mockRequests = [
  {
    id: '1',
    title: 'Annual Budget Review',
    type: RequestType.BUDGET,
    status: RequestStatus.PENDING,
    createdAt: new Date('2024-01-15'),
    currentApprover: 'Sarah Wilson',
  },
  {
    id: '2',
    title: 'New Project Proposal',
    type: RequestType.PROJECT,
    status: RequestStatus.APPROVED,
    createdAt: new Date('2024-01-10'),
    currentApprover: 'John Smith',
  },
];

export function RequestList() {
  return (
    <div className="grid gap-4">
      {mockRequests.map((request) => (
        <Card key={request.id}>
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
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/requests/${request.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}