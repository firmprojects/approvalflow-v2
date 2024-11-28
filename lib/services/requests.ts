import { db } from '@/lib/db';
import { requests, approvals } from '@/lib/db/schema';
import { Request, User, RequestStatus } from '@/lib/types';
import { notifyApprover, notifyRequestStatus } from './notifications';
import { eq } from 'drizzle-orm';

export async function createRequest(request: Request, user: User) {
  const [newRequest] = await db.insert(requests).values({
    ...request,
    createdById: user.id,
  }).returning();

  // Create approval chain
  const approvalChain = request.approvalChain.map(step => ({
    requestId: newRequest.id,
    userId: step.userId,
    role: step.role,
    status: RequestStatus.PENDING,
  }));

  await db.insert(approvals).values(approvalChain);

  // Notify first approver
  const firstApprover = await db.query.users.findFirst({
    where: eq(approvals.userId, approvalChain[0].userId),
  });

  if (firstApprover) {
    await notifyApprover(newRequest, firstApprover);
  }

  return newRequest;
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus,
  approver: User,
  comments?: string
) {
  const [updatedRequest] = await db
    .update(requests)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(requests.id, requestId))
    .returning();

  // Update approval step
  await db
    .update(approvals)
    .set({
      status,
      signature: approver.name,
      comments,
      updatedAt: new Date(),
    })
    .where(eq(approvals.requestId, requestId))
    .where(eq(approvals.userId, approver.id));

  // Notify request creator
  const creator = await db.query.users.findFirst({
    where: eq(users.id, updatedRequest.createdById),
  });

  if (creator) {
    await notifyRequestStatus(updatedRequest, creator, status, comments);
  }

  // If approved and there are more approvers, notify next approver
  if (status === RequestStatus.APPROVED) {
    const nextApproval = await db.query.approvals.findFirst({
      where: eq(approvals.requestId, requestId),
      where: eq(approvals.status, RequestStatus.PENDING),
      orderBy: approvals.createdAt,
    });

    if (nextApproval) {
      const nextApprover = await db.query.users.findFirst({
        where: eq(users.id, nextApproval.userId),
      });

      if (nextApprover) {
        await notifyApprover(updatedRequest, nextApprover);
      }
    }
  }

  return updatedRequest;
}