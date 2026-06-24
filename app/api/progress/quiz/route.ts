import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/courses';
import { getCloudProgress, upsertQuizScore } from '@/db/progress';
import { requireProgressUser } from '../_auth';
import { progressError } from '../_response';

export async function POST(req: NextRequest) {
  try {
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { courseSlug, score, maxScore } = (await req.json()) as {
      courseSlug?: string;
      score?: number;
      maxScore?: number;
    };
    if (
      !courseSlug ||
      !getCourseBySlug(courseSlug) ||
      !Number.isInteger(score) ||
      !Number.isInteger(maxScore) ||
      !maxScore ||
      score! < 0 ||
      score! > maxScore
    ) {
      return NextResponse.json({ error: 'Score de quiz invalide' }, { status: 400 });
    }

    await upsertQuizScore(user.userId, courseSlug, score!, maxScore);
    return NextResponse.json({ success: true, progress: await getCloudProgress(user.userId) });
  } catch (error) {
    return progressError(error);
  }
}
