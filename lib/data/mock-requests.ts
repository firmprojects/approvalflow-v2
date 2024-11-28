import { Request, RequestStatus, RequestType, UserRole } from '../types';

export const mockRequests: Record<string, Request> = {
  '1': {
    id: '1',
    title: 'Annual Budget Review',
    description:
      'Request for approval of the annual budget allocation for Q1 2024. This includes departmental budgets, project allocations, and contingency funds.',
    type: RequestType.BUDGET,
    status: RequestStatus.PENDING,
    createdBy: 'Alice Johnson',
    createdAt: new Date('2024-01-15'),
    currentApprover: 'Sarah Wilson',
    department: 'Finance',
    amount: 150000,
    attachments: [],
    approvalChain: [
      {
        userId: '2',
        role: UserRole.MANAGER,
        status: RequestStatus.APPROVED,
        signature: 'John Smith',
        timestamp: new Date('2024-01-16'),
        comments: 'Approved based on department performance and growth projections.',
      },
      {
        userId: '3',
        role: UserRole.DIRECTOR,
        status: RequestStatus.PENDING,
        userId: 'sarah.wilson',
      },
      {
        userId: '4',
        role: UserRole.ADMIN,
        status: RequestStatus.PENDING,
        userId: 'admin',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'New Project Proposal',
    description: 'Proposal for new software development project.',
    type: RequestType.PROJECT,
    status: RequestStatus.APPROVED,
    createdBy: 'Bob Smith',
    createdAt: new Date('2024-01-10'),
    currentApprover: 'John Smith',
    department: 'Engineering',
    amount: 75000,
    attachments: [],
    approvalChain: [
      {
        userId: '5',
        role: UserRole.MANAGER,
        status: RequestStatus.APPROVED,
        signature: 'Jane Doe',
        timestamp: new Date('2024-01-11'),
        comments: 'Project aligns with our technical roadmap.',
      },
    ],
  },
};