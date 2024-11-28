import { pgTable, text, timestamp, uuid, numeric, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './users';

export const contracts = pgTable('contracts', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  analyzedAt: timestamp('analyzed_at').notNull(),
  contractType: text('contract_type').notNull(),
  status: text('status', { enum: ['PROCESSING', 'COMPLETED', 'FAILED'] })
    .notNull()
    .default('PROCESSING'),
  summary: text('summary').notNull(),
  parties: jsonb('parties').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  value: numeric('value').notNull(),
  currency: text('currency').notNull(),
  obligations: jsonb('obligations').notNull(),
  terms: jsonb('terms').notNull(),
  risks: jsonb('risks').notNull(),
  metadata: jsonb('metadata').notNull(),
  uploadedById: uuid('uploaded_by_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertContractSchema = createInsertSchema(contracts);
export const selectContractSchema = createSelectSchema(contracts);

export type Contract = z.infer<typeof selectContractSchema>;
export type NewContract = z.infer<typeof insertContractSchema>;