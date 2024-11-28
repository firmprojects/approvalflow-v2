import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { AuditAction, UserRole } from '@/lib/types';
import { users } from './users';
import { requests } from './requests';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  action: text('action', { enum: Object.values(AuditAction) }).notNull(),
  requestId: uuid('request_id').references(() => requests.id),
  requestTitle: text('request_title'),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  userName: text('user_name').notNull(),
  userRole: text('user_role', { enum: Object.values(UserRole) }).notNull(),
  details: text('details').notNull(),
  ipAddress: text('ip_address').notNull(),
  deviceInfo: text('device_info').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const insertAuditLogSchema = createInsertSchema(auditLogs);
export const selectAuditLogSchema = createSelectSchema(auditLogs);

export type AuditLog = z.infer<typeof selectAuditLogSchema>;
export type NewAuditLog = z.infer<typeof insertAuditLogSchema>;