import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
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
}
