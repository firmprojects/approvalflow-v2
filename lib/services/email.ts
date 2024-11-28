import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ApprovalFlow <no-reply@approvalflow.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

export function generateApprovalRequestEmail(requestTitle: string, approverName: string, requestUrl: string) {
  return {
    subject: `Action Required: New Approval Request - ${requestTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Approval Request</h2>
        <p>Hello ${approverName},</p>
        <p>A new request requires your approval:</p>
        <p><strong>${requestTitle}</strong></p>
        <div style="margin: 24px 0;">
          <a href="${requestUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Review Request
          </a>
        </div>
        <p>Please review and take action on this request at your earliest convenience.</p>
        <p>Best regards,<br>ApprovalFlow Team</p>
      </div>
    `,
  };
}

export function generateRequestStatusEmail(requestTitle: string, status: string, userName: string, comments?: string) {
  return {
    subject: `Request ${status} - ${requestTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Request Status Update</h2>
        <p>Hello ${userName},</p>
        <p>Your request has been <strong>${status.toLowerCase()}</strong>:</p>
        <p><strong>${requestTitle}</strong></p>
        ${comments ? `
        <div style="margin: 16px 0; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
          <p style="margin: 0;"><strong>Comments:</strong></p>
          <p style="margin: 8px 0 0;">${comments}</p>
        </div>
        ` : ''}
        <p>Best regards,<br>ApprovalFlow Team</p>
      </div>
    `,
  };
}

export function generateContractAnalysisEmail(contractName: string, userName: string, analysisUrl: string) {
  return {
    subject: `Contract Analysis Complete - ${contractName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Contract Analysis Results</h2>
        <p>Hello ${userName},</p>
        <p>The analysis of your contract is now complete:</p>
        <p><strong>${contractName}</strong></p>
        <div style="margin: 24px 0;">
          <a href="${analysisUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            View Analysis
          </a>
        </div>
        <p>Please review the analysis results and take any necessary actions.</p>
        <p>Best regards,<br>ApprovalFlow Team</p>
      </div>
    `,
  };
}