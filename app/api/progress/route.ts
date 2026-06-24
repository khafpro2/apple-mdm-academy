import { NextResponse } from 'next/server';
import { isCloudProgressEnabled } from '@/lib/auth-config';
import { getCloudProgress, resetCloudProgress } from '@/db/progress';
import { requireProgressUser } from './_auth';
import { progressError, progressServiceUnavailable } from './_response';

export async function GET() {
  try {
    if (!isCloudProgressEnabled()) return progressServiceUnavailable();
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    return NextResponse.json({
      progress: await getCloudProgress(user.userId),
      user: { name: user.name },
    });
  } catch (error) {
    return progressError(error);
  }
}

export async function DELETE() {
  try {
    if (!isCloudProgressEnabled()) return progressServiceUnavailable();
    const user = await requireProgressUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    await resetCloudProgress(user.userId);
    return NextResponse.json({ progress: await getCloudProgress(user.userId) });
  } catch (error) {
    return progressError(error);
  }
}
