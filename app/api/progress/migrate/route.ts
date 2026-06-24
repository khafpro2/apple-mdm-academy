import { NextRequest, NextResponse } from 'next/server';
import {
  getCloudProgress,
  upsertCourseProgress,
  upsertLessonProgress,
  upsertQuizScore,
} from '@/db/progress';
import { getCourseBySlug } from '@/lib/courses';
import type { ProgressData } from '@/lib/progress';
import { requireProgressUser } from '../_auth';
import { progressError } from '../_response';

export async function POST(req: NextRequest) {
  try {
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { progress } = (await req.json()) as { progress?: Partial<ProgressData> };
    if (!progress) return NextResponse.json({ error: 'Progression locale requise' }, { status: 400 });

    for (const courseSlug of new Set(progress.completedCourses ?? [])) {
      if (getCourseBySlug(courseSlug)) await upsertCourseProgress(user.userId, courseSlug, true);
    }

    for (const [courseSlug, lessonIds] of Object.entries(progress.completedLessons ?? {})) {
      const course = getCourseBySlug(courseSlug);
      if (!course || !Array.isArray(lessonIds)) continue;
      for (const lessonId of new Set(lessonIds)) {
        if (course.lessons.some((lesson) => lesson.id === lessonId)) {
          await upsertLessonProgress(user.userId, courseSlug, lessonId, true);
        }
      }
    }

    for (const [courseSlug, score] of Object.entries(progress.quizScores ?? {})) {
      if (getCourseBySlug(courseSlug) && Number.isFinite(score)) {
        const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
        await upsertQuizScore(user.userId, courseSlug, normalizedScore, 100);
      }
    }

    return NextResponse.json({
      success: true,
      progress: await getCloudProgress(user.userId),
    });
  } catch (error) {
    return progressError(error);
  }
}
