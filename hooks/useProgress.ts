'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProgress,
  getModuleProgress, toggleCourseComplete as _toggle,
  markLessonComplete as _markLesson, saveQuizScore as _saveQuiz,
  recordVisit as _recordVisit, getRecentCourses, getXPLevel,
  ProgressData,
} from '@/lib/progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === 'undefined') return {
      completedCourses: [], completedLessons: {}, quizScores: {},
      labsCompleted: {}, lastVisited: {}, totalXP: 0, streakDays: 0, lastActivityDate: '',
    };
    return getProgress();
  });

  const refresh = useCallback(() => setProgress(getProgress()), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    window.addEventListener('mdm-progress-update', refresh);
    return () => window.removeEventListener('mdm-progress-update', refresh);
  }, [refresh]);

  const toggleCourse = useCallback((slug: string) => {
    _toggle(slug);
  }, []);

  const markLesson = useCallback((courseSlug: string, lessonId: string) => {
    _markLesson(courseSlug, lessonId);
  }, []);

  const saveQuiz = useCallback((courseSlug: string, score: number) => {
    _saveQuiz(courseSlug, score);
  }, []);

  const recordVisit = useCallback((slug: string) => {
    _recordVisit(slug);
  }, []);

  return {
    progress,
    completedCourses: progress.completedCourses,
    totalXP: progress.totalXP,
    xpInfo: getXPLevel(progress.totalXP),
    isCourseComplete: (slug: string) => progress.completedCourses.includes(slug),
    getCompletedLessons: (slug: string) => progress.completedLessons[slug] ?? [],
    getModuleProgress: (slugs: string[]) => getModuleProgress(slugs),
    getRecentCourses: (limit?: number) => getRecentCourses(limit),
    toggleCourse,
    markLesson,
    saveQuiz,
    recordVisit,
  };
}
