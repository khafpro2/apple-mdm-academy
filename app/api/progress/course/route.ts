import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { courseSlug, xpEarned } = await req.json();
  if (!courseSlug) {
    return NextResponse.json({ error: 'courseSlug requis' }, { status: 400 });
  }

  // TODO V3: db.insert(courseProgress).values({ ... })
  // Pour l'instant, retourner OK (skeleton)
  return NextResponse.json({ 
    success: true, 
    userId,
    courseSlug,
    xpEarned: xpEarned ?? 100,
    message: 'Progression enregistrée (DB non connectée en V3-alpha)'
  });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  // TODO V3: return db.select().from(courseProgress).where(eq(courseProgress.userId, userId))
  return NextResponse.json({ userId, courses: [] });
}
