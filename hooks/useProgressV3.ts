'use client';

/**
 * Hook useProgress V3 — Hybride localStorage + Cloud (Clerk + Neon)
 * Status: Skeleton V3-alpha — API routes prêtes, DB à connecter
 */

import { useState, useEffect, useCallback } from 'react';

interface ProgressState {
  completedCourses: string[];
  xp: number;
  level: number;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const DEFAULT_STATE: ProgressState = {
  completedCourses: [],
  xp: 0,
  level: 1,
  isAuthenticated: false,
  isLoading: true,
};

export function useProgressV3(userId?: string) {
  const [progress, setProgress] = useState<ProgressState>({
    ...DEFAULT_STATE,
    isAuthenticated: !!userId,
  });

  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      if (userId) {
        // Mode cloud — charger depuis l'API
        try {
          const res = await fetch('/api/progress/course');
          const data = await res.json();
          if (mounted) {
            setProgress({
              completedCourses: data.courses?.map((c: { courseSlug: string }) => c.courseSlug) ?? [],
              xp: 0,
              level: 1,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch {
          if (mounted) setProgress({ ...DEFAULT_STATE, isAuthenticated: true, isLoading: false });
        }
      } else {
        // Mode local — localStorage (V2 behavior)
        try {
          const stored = localStorage.getItem('mdm-progress');
          const data = stored ? JSON.parse(stored) : {};
          if (mounted) {
            setProgress({
              completedCourses: data.completedCourses ?? [],
              xp: data.xp ?? 0,
              level: data.level ?? 1,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch {
          if (mounted) setProgress({ ...DEFAULT_STATE, isLoading: false });
        }
      }
    }

    loadProgress();
    return () => { mounted = false; };
  }, [userId]);

  const markCourseComplete = useCallback(async (courseSlug: string, xpEarned = 100) => {
    if (userId) {
      // Cloud
      await fetch('/api/progress/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, xpEarned }),
      });
      setProgress(prev => ({
        ...prev,
        completedCourses: [...new Set([...prev.completedCourses, courseSlug])],
      }));
    } else {
      // Local
      setProgress(prev => {
        const next = {
          ...prev,
          completedCourses: [...new Set([...prev.completedCourses, courseSlug])],
          xp: prev.xp + xpEarned,
        };
        localStorage.setItem('mdm-progress', JSON.stringify(next));
        return next;
      });
    }
  }, [userId]);

  return { progress, markCourseComplete };
}
