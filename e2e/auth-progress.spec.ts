import { clerk } from '@clerk/testing/playwright';
import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'mdm_progress_v2';
const COURSE_SLUG = 'ecosysteme-apple-entreprise';

test.describe('progression anonyme', () => {
  test('conserve la progression dans localStorage sans connexion', async ({ page }) => {
    await page.goto(`/cours/${COURSE_SLUG}`);

    const lessonToggle = page.getByRole('button', { name: 'Marquer comme complété' }).first();
    await lessonToggle.click();

    await expect.poll(async () => page.evaluate((key) => {
      const progress = JSON.parse(localStorage.getItem(key) ?? '{}');
      return progress.completedLessons?.['ecosysteme-apple-entreprise']?.length ?? 0;
    }, STORAGE_KEY)).toBe(1);

    const xpBeforeReload = await page.evaluate((key) => {
      const progress = JSON.parse(localStorage.getItem(key) ?? '{}');
      return progress.totalXP;
    }, STORAGE_KEY);

    await page.reload();
    await expect(page.getByRole('button', { name: 'Marquer comme non complété' }).first()).toBeVisible();
    await expect.poll(async () => page.evaluate((key) => {
      const progress = JSON.parse(localStorage.getItem(key) ?? '{}');
      return progress.totalXP;
    }, STORAGE_KEY)).toBe(xpBeforeReload);
  });

  test('la page inscription expose Clerk ou son fallback explicite', async ({ page }) => {
    await page.goto('/sign-up');
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    } else {
      await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
      await expect(page.getByText("Clerk n'est pas configuré localement.")).toBeVisible();
    }
  });

  test('un lab reste entièrement simulé et fonctionnel', async ({ page }) => {
    await page.goto('/labs/lab-filevault-status');
    const terminal = page.getByPlaceholder('Tapez une commande...');
    await terminal.fill('fdesetup status');
    await terminal.press('Enter');
    await expect(page.getByText('Lab terminé ! +50 XP gagnés')).toBeVisible();
  });
});

test.describe('progression Clerk + Neon', () => {
  test.describe.configure({ mode: 'serial' });

  test.skip(!process.env.E2E_CLERK_USER_EMAIL, 'E2E_CLERK_USER_EMAIL est requis');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clerk.signIn({ page, emailAddress: process.env.E2E_CLERK_USER_EMAIL! });
  });

  test('affiche le UserButton et un dashboard personnalisé', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('.cl-userButtonTrigger')).toBeVisible();
    await expect(page.getByText('Progression synchronisée avec votre compte.')).toBeVisible();
  });

  test('migre localStorage puis refuse le double XP', async ({ page }) => {
    await page.evaluate(({ key, courseSlug }) => {
      localStorage.setItem(key, JSON.stringify({
        completedCourses: [courseSlug],
        completedLessons: {},
        quizScores: {},
        labsCompleted: {},
        lastVisited: {},
        totalXP: 100,
        streakDays: 0,
        lastActivityDate: '',
      }));
    }, { key: STORAGE_KEY, courseSlug: COURSE_SLUG });

    await page.reload();
    await expect(page.getByText('Progression synchronisée avec votre compte.')).toBeVisible();

    const before = await page.evaluate(async () => {
      const response = await fetch('/api/progress');
      return (await response.json()).progress.totalXP as number;
    });

    await page.evaluate(async (courseSlug) => {
      await fetch('/api/progress/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, completed: true }),
      });
      await fetch('/api/progress/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, completed: true }),
      });
    }, COURSE_SLUG);

    const after = await page.evaluate(async () => {
      const response = await fetch('/api/progress');
      return (await response.json()).progress.totalXP as number;
    });

    expect(after).toBe(before);
  });
});
