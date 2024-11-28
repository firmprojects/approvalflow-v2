import { pgTable, text, timestamp, uuid, numeric } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { RequestStatus, RequestType } from '@/lib/types';
import { users } from './users';

export const requests = pgTable('requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type', { enum: Object.values(RequestType) }).notNull(),
  status: text('status', { enum: Object.values(RequestStatus) })
    .notNull()
    .default('PENDING'),
  createdById: uuid('created_by_id')
    .references(() => users.id)
    .notNull(),
  currentApproverId: uuid('current_approver_id')
    .references(() => users.id)
    .notNull(),
  department: text('department').notNull(),
  amount: numeric('amount').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertRequestSchema = createInsertSchema(requests);
export const selectRequestSchema = createSelectSchema(requests);

export type Request = z.infer<typeof selectRequestSchema>;
export type NewRequest = z.infer<typeof insertRequestSchema>;