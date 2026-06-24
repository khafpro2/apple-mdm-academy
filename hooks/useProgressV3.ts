'use client';

import { useProgress } from './useProgress';

/** @deprecated Use useProgress; it now handles local and cloud persistence. */
export function useProgressV3() {
  const { progress, isAuthenticated, isLoading, toggleCourse } = useProgress();
  return {
    progress: {
      completedCourses: progress.completedCourses,
      xp: progress.totalXP,
      level: 1,
      isAuthenticated,
      isLoading,
    },
    markCourseComplete: (courseSlug: string) => {
      if (!progress.completedCourses.includes(courseSlug)) toggleCourse(courseSlug);
    },
  };
}
