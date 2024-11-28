import { ApprovalStep, UserRole } from '@/lib/types';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ApprovalTimelineProps {
  steps: ApprovalStep[];
}

export function ApprovalTimeline({ steps }: ApprovalTimelineProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {steps.map((step, stepIdx) => (
          <li key={stepIdx}>
            <div className="relative pb-8">
              {stepIdx !== steps.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-muted"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-background ${
                      step.status === 'APPROVED'
                        ? 'bg-green-500'
                        : step.status === 'REJECTED'
                        ? 'bg-red-500'
                        : 'bg-muted'
                    }`}
                  >
                    {step.status === 'APPROVED' ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : step.status === 'REJECTED' ? (
                      <XCircle className="h-5 w-5 text-white" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium">
                      {UserRole[step.role]} Approval
                    </p>
                    {step.comments && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.comments}
                      </p>
                    )}
                  </div>
                  {step.timestamp && (
                    <div className="whitespace-nowrap text-right text-sm text-muted-foreground">
                      {new Date(step.timestamp).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}