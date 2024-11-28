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
import { Textarea } from '@/components/ui/textarea';
import { RequestStatus } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ReviewRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (decision: RequestStatus, comments: string, otp: string) => Promise<void>;
  requestTitle: string;
}

export function ReviewRequestDialog({
  isOpen,
  onClose,
  onSubmit,
  requestTitle,
}: ReviewRequestDialogProps) {
  const [decision, setDecision] = useState<RequestStatus | null>(null);
  const [comments, setComments] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async () => {
    if (!decision || !comments) return;

    if (!showOtpInput) {
      // TODO: Implement actual OTP sending logic
      setShowOtpInput(true);
      return;
    }

    if (!otp) return;

    setIsSubmitting(true);
    try {
      await onSubmit(decision, comments, otp);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Request</DialogTitle>
          <DialogDescription>
            {requestTitle}
          </DialogDescription>
        </DialogHeader>
        
        {!showOtpInput ? (
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={decision === RequestStatus.APPROVED ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setDecision(RequestStatus.APPROVED)}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  variant={decision === RequestStatus.REJECTED ? "destructive" : "outline"}
                  className="flex-1"
                  onClick={() => setDecision(RequestStatus.REJECTED)}
                >
                  Reject
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Comments</Label>
                <Textarea
                  placeholder="Add your review comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Enter OTP</Label>
              <Input
                type="text"
                placeholder="Enter the OTP sent to your phone"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={(!decision || !comments) || (showOtpInput && !otp) || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {showOtpInput ? 'Submit Review' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}