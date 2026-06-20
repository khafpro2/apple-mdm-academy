import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { courseSlug, score, maxScore } = await req.json();
  if (!courseSlug || score === undefined || !maxScore) {
    return NextResponse.json({ error: 'courseSlug, score, maxScore requis' }, { status: 400 });
  }

  // TODO V3: db.insert(quizScores).values({ ... })
  return NextResponse.json({ 
    success: true, 
    userId, 
    courseSlug, 
    score, 
    maxScore,
    percentage: Math.round((score / maxScore) * 100)
  });
}
