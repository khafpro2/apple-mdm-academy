import { clerkSetup } from '@clerk/testing/playwright';

export default async function globalSetup() {
  if (process.env.E2E_CLERK_USER_EMAIL) {
    await clerkSetup();
  }
}
