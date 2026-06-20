import { pgTable, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const courseProgress = pgTable('course_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseSlug: text('course_slug').notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  xpEarned: integer('xp_earned').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const lessonProgress = pgTable('lesson_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseSlug: text('course_slug').notNull(),
  lessonId: text('lesson_id').notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
});

export const quizScores = pgTable('quiz_scores', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseSlug: text('course_slug').notNull(),
  score: integer('score').notNull(),
  maxScore: integer('max_score').notNull(),
  takenAt: timestamp('taken_at').defaultNow().notNull(),
});

// Types exportés pour TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CourseProgress = typeof courseProgress.$inferSelect;
export type QuizScore = typeof quizScores.$inferSelect;
