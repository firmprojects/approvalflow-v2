'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReviewRequestDialog } from './review-request-dialog';
import { usePermissions } from '@/hooks/use-permissions';
import { Request, RequestStatus, User } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

interface ApprovalActionsProps {
  request: Request;
  currentUser: User;
  onStatusChange?: (newStatus: RequestStatus) => void;
}

export function ApprovalActions({
  request,
  currentUser,
  onStatusChange,
}: ApprovalActionsProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const { isNextApprover } = usePermissions(currentUser);
  const { toast } = useToast();

  const canReview = request.status === RequestStatus.PENDING && isNextApprover(request);

  const handleReviewSubmit = async (
    decision: RequestStatus,
    comments: string,
    otp: string
  ) => {
    try {
      // TODO: Implement actual review submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: `Request ${decision.toLowerCase()}`,
        description: `The request has been successfully ${decision.toLowerCase()}.`,
        duration: 5000,
      });

      onStatusChange?.(decision);
      setShowReviewDialog(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process the review. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!canReview) return null;

  return (
    <>
      <Button onClick={() => setShowReviewDialog(true)}>
        Review Request
      </Button>

      {showReviewDialog && (
        <ReviewRequestDialog
          isOpen={showReviewDialog}
          onClose={() => setShowReviewDialog(false)}
          onSubmit={handleReviewSubmit}
          requestTitle={request.title}
        />
      )}
    </>
  );
}