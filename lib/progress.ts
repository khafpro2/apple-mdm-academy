/**
 * Progress System — localStorage based (no auth required)
 * Tracks completed lessons, courses, and module progress.
 */

export interface ProgressData {
  completedCourses: string[];        // course slugs
  completedLessons: Record<string, string[]>; // slug → lesson ids
  quizScores: Record<string, number>; // slug → best score (0–100)
  labsCompleted: Record<string, string[]>; // slug → lab ids
  lastVisited: Record<string, number>; // slug → timestamp
  totalXP: number;
  streakDays: number;
  lastActivityDate: string; // ISO date
}

const STORAGE_KEY = 'mdm_progress_v2';

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function defaultProgress(): ProgressData {
  return {
    completedCourses: [],
    completedLessons: {},
    quizScores: {},
    labsCompleted: {},
    lastVisited: {},
    totalXP: 0,
    streakDays: 0,
    lastActivityDate: '',
  };
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('mdm-progress-update'));
  } catch {
    // storage full or disabled
  }
}

export function markCourseComplete(slug: string): void {
  const p = getProgress();
  if (!p.completedCourses.includes(slug)) {
    p.completedCourses.push(slug);
    p.totalXP += 100;
  }
  p.lastVisited[slug] = Date.now();
  p.lastActivityDate = new Date().toISOString().split('T')[0];
  saveProgress(p);
}

export function markCourseIncomplete(slug: string): void {
  const p = getProgress();
  p.completedCourses = p.completedCourses.filter((s) => s !== slug);
  saveProgress(p);
}

export function toggleCourseComplete(slug: string): boolean {
  const p = getProgress();
  const isDone = p.completedCourses.includes(slug);
  if (isDone) {
    markCourseIncomplete(slug);
    return false;
  } else {
    markCourseComplete(slug);
    return true;
  }
}

export function markLessonComplete(courseSlug: string, lessonId: string): void {
  const p = getProgress();
  if (!p.completedLessons[courseSlug]) p.completedLessons[courseSlug] = [];
  if (!p.completedLessons[courseSlug].includes(lessonId)) {
    p.completedLessons[courseSlug].push(lessonId);
    p.totalXP += 20;
  }
  p.lastVisited[courseSlug] = Date.now();
  p.lastActivityDate = new Date().toISOString().split('T')[0];
  saveProgress(p);
}

export function markLessonIncomplete(courseSlug: string, lessonId: string): void {
  const p = getProgress();
  p.completedLessons[courseSlug] = (p.completedLessons[courseSlug] ?? []).filter(
    (id) => id !== lessonId,
  );
  saveProgress(p);
}

export function saveQuizScore(courseSlug: string, score: number): void {
  const p = getProgress();
  const prev = p.quizScores[courseSlug] ?? 0;
  const best = Math.max(prev, score);
  const previousXP = prev >= 70 ? Math.round((prev / 100) * 50) : 0;
  const bestXP = best >= 70 ? Math.round((best / 100) * 50) : 0;
  p.quizScores[courseSlug] = best;
  p.totalXP += Math.max(0, bestXP - previousXP);
  saveProgress(p);
}

export function recordVisit(slug: string): void {
  const p = getProgress();
  p.lastVisited[slug] = Date.now();
  saveProgress(p);
}

export function isCourseComplete(slug: string): boolean {
  const p = getProgress();
  return p.completedCourses.includes(slug);
}

export function getCompletedLessons(courseSlug: string): string[] {
  return getProgress().completedLessons[courseSlug] ?? [];
}

export function getModuleProgress(courseSlugs: string[]): number {
  if (courseSlugs.length === 0) return 0;
  const p = getProgress();
  const done = courseSlugs.filter((s) => p.completedCourses.includes(s)).length;
  return Math.round((done / courseSlugs.length) * 100);
}

export function getOverallProgress(allSlugs: string[]): number {
  return getModuleProgress(allSlugs);
}

export function getRecentCourses(limit = 5): Array<{ slug: string; timestamp: number }> {
  const p = getProgress();
  return Object.entries(p.lastVisited)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([slug, timestamp]) => ({ slug, timestamp }));
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('mdm-progress-update'));
}

export function getXPLevel(xp: number): { level: number; title: string; nextXP: number; currentXP: number } {
  const levels = [
    { level: 1, title: 'Découvreur',     xp: 0    },
    { level: 2, title: 'Praticien',      xp: 500  },
    { level: 3, title: 'Technicien',     xp: 1500 },
    { level: 4, title: 'Spécialiste',    xp: 3000 },
    { level: 5, title: 'Expert',         xp: 5000 },
    { level: 6, title: 'Architecte MDM', xp: 8000 },
  ];
  const current = [...levels].reverse().find((l) => xp >= l.xp) ?? levels[0];
  const next = levels.find((l) => l.xp > xp);
  return {
    level: current.level,
    title: current.title,
    nextXP: next?.xp ?? current.xp,
    currentXP: xp,
  };
}
