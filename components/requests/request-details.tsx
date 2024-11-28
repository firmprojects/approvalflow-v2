'use client';

import { ApprovalTimeline } from '@/components/requests/approval-timeline';
import { RequestStatusBadge } from '@/components/requests/request-status-badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Request } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RequestDetailsProps {
  request: Request;
}

export function RequestDetails({ request }: RequestDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard/requests"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {request.title}
          </h2>
          <div className="flex items-center space-x-4">
            <p className="text-muted-foreground">
              Request ID: {request.id}
            </p>
            <Separator orientation="vertical" className="h-4" />
            <p className="text-muted-foreground">
              Created on {request.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <RequestStatusBadge status={request.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>
              Detailed information about this request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {request.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">
                  {request.type}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-muted-foreground">
                  {request.department}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Requested By</p>
                <p className="text-sm text-muted-foreground">
                  {request.createdBy}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Amount</p>
                <p className="text-sm text-muted-foreground">
                  ${request.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Timeline</CardTitle>
            <CardDescription>
              Track the progress of your request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApprovalTimeline steps={request.approvalChain} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Available actions for this request</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Button variant="destructive">Cancel Request</Button>
          <Button variant="outline">Download PDF</Button>
        </CardContent>
      </Card>
    </div>
  );
}