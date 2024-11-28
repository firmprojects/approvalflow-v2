import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { UserRole } from '@/lib/types';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: Object.values(UserRole) }).notNull().default('EMPLOYEE'),
  department: text('department').notNull(),
  phoneNumber: text('phone_number'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([UserRole.ADMIN, UserRole.DIRECTOR, UserRole.MANAGER, UserRole.EMPLOYEE]),
});

export const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;