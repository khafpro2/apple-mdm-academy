import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/courses';
import { getCloudProgress, upsertCourseProgress } from '@/db/progress';
import { requireProgressUser } from '../_auth';
import { progressError } from '../_response';

export async function POST(req: NextRequest) {
  try {
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { courseSlug, completed = true } = (await req.json()) as {
      courseSlug?: string;
      completed?: boolean;
    };
    if (!courseSlug || !getCourseBySlug(courseSlug) || typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Progression de cours invalide' }, { status: 400 });
    }

    await upsertCourseProgress(user.userId, courseSlug, completed);
    return NextResponse.json({ success: true, progress: await getCloudProgress(user.userId) });
  } catch (error) {
    return progressError(error);
  }
}

export async function GET() {
  try {
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const progress = await getCloudProgress(user.userId);
    return NextResponse.json({
      courses: progress.completedCourses.map((courseSlug) => ({ courseSlug, completed: true })),
      progress,
    });
  } catch (error) {
    return progressError(error);
  }
}
