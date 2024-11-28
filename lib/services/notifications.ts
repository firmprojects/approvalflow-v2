import { 
  sendEmail, 
  generateApprovalRequestEmail, 
  generateRequestStatusEmail, 
  generateContractAnalysisEmail 
} from './email';
import { Request, User, ContractAnalysisResult } from '@/lib/types';

export async function notifyApprover(request: Request, approver: User) {
  const { subject, html } = generateApprovalRequestEmail(
    request.title,
    approver.name,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/requests/${request.id}`
  );

  await sendEmail({
    to: approver.email,
    subject,
    html,
  });
}

export async function notifyRequestStatus(request: Request, user: User, status: string, comments?: string) {
  const { subject, html } = generateRequestStatusEmail(
    request.title,
    status,
    user.name,
    comments
  );

  await sendEmail({
    to: user.email,
    subject,
    html,
  });
}

export async function notifyContractAnalysis(analysis: ContractAnalysisResult, user: User) {
  const { subject, html } = generateContractAnalysisEmail(
    analysis.fileName,
    user.name,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/contracts/${analysis.id}`
  );

  await sendEmail({
    to: user.email,
    subject,
    html,
  });
}