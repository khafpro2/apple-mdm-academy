import { NextRequest, NextResponse } from 'next/server';
import { getCloudProgress, upsertLessonProgress } from '@/db/progress';
import { getCourseBySlug } from '@/lib/courses';
import { requireProgressUser } from '../_auth';
import { progressError } from '../_response';

export async function POST(req: NextRequest) {
  try {
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { courseSlug, lessonId, completed = true } = (await req.json()) as {
      courseSlug?: string;
      lessonId?: string;
      completed?: boolean;
    };
    const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;
    if (
      !course ||
      !lessonId ||
      !course.lessons.some((lesson) => lesson.id === lessonId) ||
      typeof completed !== 'boolean'
    ) {
      return NextResponse.json({ error: 'Progression de leçon invalide' }, { status: 400 });
    }

    await upsertLessonProgress(user.userId, course.slug, lessonId, completed);
    return NextResponse.json({ success: true, progress: await getCloudProgress(user.userId) });
  } catch (error) {
    return progressError(error);
  }
}
