export enum UserRole {
  ADMIN = 'ADMIN',
  DIRECTOR = 'DIRECTOR',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum RequestType {
  BUDGET = 'BUDGET',
  PROJECT = 'PROJECT',
  LEAVE = 'LEAVE',
  PURCHASE = 'PURCHASE',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ESCALATED = 'ESCALATED',
}

export enum AuditAction {
  REQUEST_CREATED = 'REQUEST_CREATED',
  REQUEST_APPROVED = 'REQUEST_APPROVED',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  REQUEST_ESCALATED = 'REQUEST_ESCALATED',
  OTP_REQUESTED = 'OTP_REQUESTED',
  OTP_VERIFIED = 'OTP_VERIFIED',
  CONTRACT_UPLOADED = 'CONTRACT_UPLOADED',
  CONTRACT_ANALYZED = 'CONTRACT_ANALYZED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phoneNumber?: string;
}

export interface ApprovalStep {
  userId: string;
  role: UserRole;
  status: RequestStatus;
  signature?: string;
  timestamp?: Date;
  comments?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  status: RequestStatus;
  createdBy: string;
  createdAt: Date;
  currentApprover: string;
  department: string;
  amount: number;
  attachments: Attachment[];
  approvalChain: ApprovalStep[];
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: AuditAction;
  requestId: string;
  requestTitle: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  details: string;
  ipAddress: string;
  deviceInfo: string;
}

export * from './types/contract';