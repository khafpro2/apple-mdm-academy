import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isClerkConfigured } from '@/lib/auth-config';

// Auth strategy (optional pages, protected APIs):
// - Clerk middleware runs only when both Clerk keys are configured (see lib/auth-config.ts).
// - Pages remain public; /api/progress and /api/user enforce auth or 503 server-side.
// - Without DATABASE_URL, progression stays in localStorage (no cloud sync).
export default isClerkConfigured() ? clerkMiddleware() : () => NextResponse.next();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
