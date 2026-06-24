'use client';

import { useProgressContext } from '@/components/providers/ProgressProvider';
import { getXPLevel } from '@/lib/progress';

export function useProgress() {
  const context = useProgressContext();
  const { progress } = context;

  return {
    ...context,
    completedCourses: progress.completedCourses,
    totalXP: progress.totalXP,
    xpInfo: getXPLevel(progress.totalXP),
    isCourseComplete: (slug: string) => progress.completedCourses.includes(slug),
    getCompletedLessons: (slug: string) => progress.completedLessons[slug] ?? [],
    getModuleProgress: (slugs: string[]) => {
      if (slugs.length === 0) return 0;
      const completed = slugs.filter((slug) => progress.completedCourses.includes(slug)).length;
      return Math.round((completed / slugs.length) * 100);
    },
    getRecentCourses: (limit = 5) => Object.entries(progress.lastVisited)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([slug, timestamp]) => ({ slug, timestamp })),
  };
}
