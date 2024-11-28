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
import { RequestType, RequestStatus } from '@/lib/types';
import { Clock } from 'lucide-react';
import { ReviewRequestDialog } from '@/components/requests/review-request-dialog';
import { useToast } from '@/components/ui/use-toast';

interface PendingApproval {
  id: string;
  title: string;
  type: RequestType;
  requestedBy: string;
  department: string;
  submittedDate: Date;
  description: string;
}

const pendingApprovals: PendingApproval[] = [
  {
    id: '1',
    title: 'Marketing Budget Increase',
    type: RequestType.BUDGET,
    requestedBy: 'Alice Johnson',
    department: 'Marketing',
    submittedDate: new Date('2024-01-20'),
    description: 'Request to increase Q1 2024 marketing budget for new campaign.',
  },
  {
    id: '2',
    title: 'New Software Development Project',
    type: RequestType.PROJECT,
    requestedBy: 'Bob Smith',
    department: 'Engineering',
    submittedDate: new Date('2024-01-19'),
    description: 'Proposal for new customer portal development project.',
  },
];

export default function ApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<PendingApproval | null>(null);
  const { toast } = useToast();

  const handleReviewSubmit = async (
    decision: RequestStatus,
    comments: string,
    otp: string
  ) => {
    // TODO: Implement actual review submission logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: `Request ${decision.toLowerCase()}`,
      description: `The request has been successfully ${decision.toLowerCase()}.`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
        <p className="text-muted-foreground">
          Review and manage requests requiring your approval
        </p>
      </div>

      <div className="grid gap-4">
        {pendingApprovals.map((approval) => (
          <Card key={approval.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl">{approval.title}</CardTitle>
                <CardDescription>
                  Submitted on {approval.submittedDate.toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">
                  Awaiting Your Approval
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {approval.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Requested by: {approval.requestedBy}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Department: {approval.department}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/dashboard/requests/${approval.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedRequest(approval)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRequest && (
        <ReviewRequestDialog
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSubmit={handleReviewSubmit}
          requestTitle={selectedRequest.title}
        />
      )}
    </div>
  );
}