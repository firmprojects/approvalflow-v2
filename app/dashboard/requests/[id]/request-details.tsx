'use client';

import { useState } from 'react';
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
import { Request, RequestStatus, User } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReviewRequestDialog } from '@/components/requests/review-request-dialog';
import { useToast } from '@/components/ui/use-toast';
import { canApproveRequest } from '@/lib/utils/auth';
import { FileUpload } from '@/components/requests/file-upload';
import { AttachmentsList } from '@/components/requests/attachments-list';

interface RequestDetailsProps {
  request: Request;
  currentUser: User;
}

export function RequestDetails({ request, currentUser }: RequestDetailsProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const { toast } = useToast();

  const currentApprovalStep = request.approvalChain.find(
    (step) => step.status === RequestStatus.PENDING
  );

  const canReview = currentApprovalStep && canApproveRequest(currentUser, currentApprovalStep.role);

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

  const handleFileUpload = async (files: File[]) => {
    // TODO: Implement actual file upload logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: 'Files uploaded',
      description: `Successfully uploaded ${files.length} file(s)`,
      duration: 5000,
    });
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    // TODO: Implement actual attachment deletion logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Attachment deleted',
      description: 'The attachment has been removed from the request',
      duration: 5000,
    });
  };

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
          <CardTitle>Attachments</CardTitle>
          <CardDescription>
            Supporting documents and files for this request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {request.attachments.length > 0 ? (
            <AttachmentsList
              attachments={request.attachments}
              onDelete={handleDeleteAttachment}
              showDelete={request.createdBy === currentUser.name}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No attachments have been added to this request.
            </p>
          )}
          
          {request.status === RequestStatus.PENDING && (
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium mb-4">Add Attachments</h4>
              <FileUpload
                onUpload={handleFileUpload}
                maxSize={10}
                maxFiles={5}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Available actions for this request</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4">
          {canReview && request.status === RequestStatus.PENDING && (
            <Button onClick={() => setShowReviewDialog(true)}>
              Review Request
            </Button>
          )}
          <Button variant="destructive">Cancel Request</Button>
          <Button variant="outline">Download PDF</Button>
        </CardContent>
      </Card>

      {showReviewDialog && (
        <ReviewRequestDialog
          isOpen={showReviewDialog}
          onClose={() => setShowReviewDialog(false)}
          onSubmit={handleReviewSubmit}
          requestTitle={request.title}
        />
      )}
    </div>
  );
}