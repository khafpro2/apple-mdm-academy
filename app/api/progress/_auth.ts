import 'server-only';

import { auth, currentUser } from '@clerk/nextjs/server';
import { isCloudProgressEnabled } from '@/lib/auth-config';
import { ensureCloudUser } from '@/db/progress';
import { ProgressServiceUnavailable } from './_response';

export async function requireProgressUser() {
  if (!isCloudProgressEnabled()) {
    throw new ProgressServiceUnavailable();
  }

  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error('Authenticated Clerk user has no primary email address');
  }

  await ensureCloudUser({
    id: userId,
    email,
    name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null,
  });

  return { userId, name: clerkUser.fullName ?? clerkUser.firstName ?? email };
}
