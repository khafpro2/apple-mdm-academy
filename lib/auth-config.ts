/** Non-empty env value (ignores placeholders and whitespace-only). */
function isEnvConfigured(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

/** Clerk SSO — requires both public and secret keys. */
export function isClerkConfigured(): boolean {
  return (
    isEnvConfigured(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    isEnvConfigured(process.env.CLERK_SECRET_KEY)
  );
}

/** Neon cloud progress — Clerk + DATABASE_URL. Without DB, stay on localStorage. */
export function isCloudProgressEnabled(): boolean {
  return isClerkConfigured() && isEnvConfigured(process.env.DATABASE_URL);
}
