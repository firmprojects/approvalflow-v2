import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { RequestStatus, UserRole } from '@/lib/types';
import { users } from './users';
import { requests } from './requests';

export const approvals = pgTable('approvals', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id')
    .references(() => requests.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  role: text('role', { enum: Object.values(UserRole) }).notNull(),
  status: text('status', { enum: Object.values(RequestStatus) })
    .notNull()
    .default('PENDING'),
  signature: text('signature'),
  comments: text('comments'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertApprovalSchema = createInsertSchema(approvals);
export const selectApprovalSchema = createSelectSchema(approvals);

export type Approval = z.infer<typeof selectApprovalSchema>;
export type NewApproval = z.infer<typeof insertApprovalSchema>;