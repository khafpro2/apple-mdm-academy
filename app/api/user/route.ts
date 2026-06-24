import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isClerkConfigured } from '@/lib/auth-config';

export async function GET() {
  try {
    if (!isClerkConfigured()) {
      return NextResponse.json(
        { error: 'Service d\'authentification non configuré.' },
        { status: 503 },
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const user = await currentUser();
    return NextResponse.json({
      id: userId,
      email: user?.emailAddresses[0]?.emailAddress,
      name: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
      imageUrl: user?.imageUrl,
    });
  } catch (error) {
    console.error('User API error', error);
    return NextResponse.json(
      { error: 'Service utilisateur temporairement indisponible.' },
      { status: 503 },
    );
  }
}
