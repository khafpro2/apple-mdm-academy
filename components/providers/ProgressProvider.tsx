'use client';

import { useUser } from '@clerk/nextjs';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  defaultProgress,
  getProgress,
  markCourseComplete,
  markCourseIncomplete,
  markLessonComplete,
  markLessonIncomplete,
  recordVisit,
  resetProgress,
  saveProgress,
  saveQuizScore,
  type ProgressData,
} from '@/lib/progress';

type SyncStatus = 'local' | 'syncing' | 'cloud' | 'error';

interface ProgressContextValue {
  progress: ProgressData;
  isAuthenticated: boolean;
  isLoading: boolean;
  syncStatus: SyncStatus;
  userName: string | null;
  toggleCourse: (slug: string) => void;
  markLesson: (courseSlug: string, lessonId: string, completed?: boolean) => void;
  saveQuiz: (courseSlug: string, score: number) => void;
  recordVisit: (slug: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function mergeCloudProgress(cloud: ProgressData, local: ProgressData): ProgressData {
  return {
    ...cloud,
    labsCompleted: local.labsCompleted,
    lastVisited: local.lastVisited,
    streakDays: local.streakDays,
    lastActivityDate: local.lastActivityDate,
  };
}

function ProgressProviderCore({
  children,
  userId,
  userName,
  authLoaded = true,
}: {
  children: React.ReactNode;
  userId?: string;
  userName?: string | null;
  authLoaded?: boolean;
}) {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(userId ? 'syncing' : 'local');
  const [isLoading, setIsLoading] = useState(true);

  const refreshLocal = useCallback(() => setProgress(getProgress()), []);

  const applyCloudResponse = useCallback(async (response: Response) => {
    if (response.status === 503) {
      refreshLocal();
      setSyncStatus('local');
      return;
    }
    if (!response.ok) throw new Error(`Progress API returned ${response.status}`);
    const data = (await response.json()) as { progress: ProgressData };
    const merged = mergeCloudProgress(data.progress, getProgress());
    saveProgress(merged);
    setProgress(merged);
    setSyncStatus('cloud');
  }, [refreshLocal]);

  useEffect(() => {
    let active = true;

    const handleLocalUpdate = () => {
      if (active) refreshLocal();
    };
    window.addEventListener('mdm-progress-update', handleLocalUpdate);

    async function load() {
      if (!authLoaded) return;
      if (!userId) {
        refreshLocal();
        setSyncStatus('local');
        setIsLoading(false);
        return;
      }

      setSyncStatus('syncing');
      try {
        const response = await fetch('/api/progress/migrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ progress: getProgress() }),
        });
        if (active) await applyCloudResponse(response);
      } catch {
        if (active) {
          refreshLocal();
          setSyncStatus('local');
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
      window.removeEventListener('mdm-progress-update', handleLocalUpdate);
    };
  }, [applyCloudResponse, authLoaded, refreshLocal, userId]);

  const syncMutation = useCallback(async (url: string, body: object) => {
    if (!userId) return;
    setSyncStatus('syncing');
    try {
      await applyCloudResponse(await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }));
    } catch {
      refreshLocal();
      setSyncStatus('local');
    }
  }, [applyCloudResponse, refreshLocal, userId]);

  const toggleCourse = useCallback((slug: string) => {
    const completed = !getProgress().completedCourses.includes(slug);
    if (completed) markCourseComplete(slug);
    else markCourseIncomplete(slug);
    void syncMutation('/api/progress/course', { courseSlug: slug, completed });
  }, [syncMutation]);

  const markLesson = useCallback((courseSlug: string, lessonId: string, completed = true) => {
    if (completed) markLessonComplete(courseSlug, lessonId);
    else markLessonIncomplete(courseSlug, lessonId);
    void syncMutation('/api/progress/lesson', { courseSlug, lessonId, completed });
  }, [syncMutation]);

  const saveQuiz = useCallback((courseSlug: string, score: number) => {
    saveQuizScore(courseSlug, score);
    void syncMutation('/api/progress/quiz', { courseSlug, score, maxScore: 100 });
  }, [syncMutation]);

  const visit = useCallback((slug: string) => recordVisit(slug), []);

  const reset = useCallback(() => {
    resetProgress();
    setProgress(defaultProgress());
    if (userId) {
      void fetch('/api/progress', { method: 'DELETE' })
        .then((response) => applyCloudResponse(response))
        .catch(() => {
          refreshLocal();
          setSyncStatus('local');
        });
    }
  }, [applyCloudResponse, refreshLocal, userId]);

  const value = useMemo<ProgressContextValue>(() => ({
    progress,
    isAuthenticated: Boolean(userId),
    isLoading: !authLoaded || isLoading,
    syncStatus,
    userName: userName ?? null,
    toggleCourse,
    markLesson,
    saveQuiz,
    recordVisit: visit,
    reset,
  }), [
    authLoaded,
    isLoading,
    markLesson,
    progress,
    reset,
    saveQuiz,
    syncStatus,
    toggleCourse,
    userId,
    userName,
    visit,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function LocalProgressProvider({ children }: { children: React.ReactNode }) {
  return <ProgressProviderCore>{children}</ProgressProviderCore>;
}

export function CloudProgressProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  return (
    <ProgressProviderCore
      userId={user?.id}
      userName={user?.fullName ?? user?.firstName ?? user?.primaryEmailAddress?.emailAddress}
      authLoaded={isLoaded}
    >
      {children}
    </ProgressProviderCore>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
