import 'server-only';

import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import type { ProgressData } from '@/lib/progress';
import { getDb } from './index';
import { courseProgress, lessonProgress, quizScores, users } from './schema';

const COURSE_XP = 100;
const LESSON_XP = 20;

export interface CloudUser {
  id: string;
  email: string;
  name: string | null;
}

export async function ensureCloudUser(user: CloudUser) {
  const db = getDb();
  const now = new Date();

  await db
    .insert(users)
    .values({ ...user, updatedAt: now })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: user.email, name: user.name, updatedAt: now },
    });
}

export async function upsertCourseProgress(
  userId: string,
  courseSlug: string,
  completed: boolean,
) {
  const db = getDb();
  const now = new Date();

  await db
    .insert(courseProgress)
    .values({
      id: nanoid(),
      userId,
      courseSlug,
      completed,
      completedAt: completed ? now : null,
      xpEarned: completed ? COURSE_XP : 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [courseProgress.userId, courseProgress.courseSlug],
      set: {
        completed,
        completedAt: completed ? now : null,
        xpEarned: completed
          ? sql`greatest(${courseProgress.xpEarned}, ${COURSE_XP})`
          : courseProgress.xpEarned,
        updatedAt: now,
      },
    });
}

export async function upsertLessonProgress(
  userId: string,
  courseSlug: string,
  lessonId: string,
  completed: boolean,
) {
  const db = getDb();
  const now = new Date();

  await db
    .insert(lessonProgress)
    .values({
      id: nanoid(),
      userId,
      courseSlug,
      lessonId,
      completed,
      completedAt: completed ? now : null,
      xpEarned: completed ? LESSON_XP : 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.courseSlug, lessonProgress.lessonId],
      set: {
        completed,
        completedAt: completed ? now : null,
        xpEarned: completed
          ? sql`greatest(${lessonProgress.xpEarned}, ${LESSON_XP})`
          : lessonProgress.xpEarned,
        updatedAt: now,
      },
    });
}

export async function upsertQuizScore(
  userId: string,
  courseSlug: string,
  score: number,
  maxScore: number,
) {
  const db = getDb();
  const percentage = Math.round((score / maxScore) * 100);
  const xpEarned = percentage >= 70 ? Math.round((percentage / 100) * 50) : 0;
  const now = new Date();

  await db
    .insert(quizScores)
    .values({ id: nanoid(), userId, courseSlug, score, maxScore, xpEarned, takenAt: now })
    .onConflictDoUpdate({
      target: [quizScores.userId, quizScores.courseSlug],
      set: {
        score: sql`greatest(${quizScores.score}, ${score})`,
        maxScore,
        xpEarned: sql`greatest(${quizScores.xpEarned}, ${xpEarned})`,
        takenAt: now,
      },
    });
}

export async function getCloudProgress(userId: string): Promise<ProgressData> {
  const db = getDb();
  const [courses, lessons, quizzes] = await Promise.all([
    db.select().from(courseProgress).where(eq(courseProgress.userId, userId)),
    db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)),
    db.select().from(quizScores).where(eq(quizScores.userId, userId)),
  ]);

  const completedLessons: Record<string, string[]> = {};
  for (const lesson of lessons) {
    if (!lesson.completed) continue;
    completedLessons[lesson.courseSlug] ??= [];
    completedLessons[lesson.courseSlug].push(lesson.lessonId);
  }

  return {
    completedCourses: courses.filter((course) => course.completed).map((course) => course.courseSlug),
    completedLessons,
    quizScores: Object.fromEntries(
      quizzes.map((quiz) => [quiz.courseSlug, Math.round((quiz.score / quiz.maxScore) * 100)]),
    ),
    labsCompleted: {},
    lastVisited: {},
    totalXP:
      courses.reduce((total, course) => total + course.xpEarned, 0) +
      lessons.reduce((total, lesson) => total + lesson.xpEarned, 0) +
      quizzes.reduce((total, quiz) => total + quiz.xpEarned, 0),
    streakDays: 0,
    lastActivityDate: '',
  };
}

export async function resetCloudProgress(userId: string) {
  const db = getDb();
  await Promise.all([
    db.delete(courseProgress).where(eq(courseProgress.userId, userId)),
    db.delete(lessonProgress).where(eq(lessonProgress.userId, userId)),
    db.delete(quizScores).where(eq(quizScores.userId, userId)),
  ]);
}
