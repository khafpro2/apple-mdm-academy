'use client';

import { useState } from 'react';
import { CheckCircle, Circle, Clock, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { Lesson } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';

interface LessonPlayerProps {
  courseSlug: string;
  lessons: Lesson[];
  onAllComplete?: () => void;
}

export default function LessonPlayer({ courseSlug, lessons, onAllComplete }: LessonPlayerProps) {
  const { getCompletedLessons, markLesson } = useProgress();
  const completed = new Set(getCompletedLessons(courseSlug));
  const [expanded, setExpanded] = useState<string | null>(lessons[0]?.id ?? null);

  const toggle = (id: string) => {
    const willComplete = !completed.has(id);
    markLesson(courseSlug, id, willComplete);
    if (willComplete && completed.size + 1 === lessons.length) onAllComplete?.();
  };

  const completedCount = completed.size;
  const percent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="rounded-2xl border border-white/8 bg-[#131720] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-indigo-400" />
            <span className="text-sm font-semibold text-white">Programme du cours</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">{completedCount}/{lessons.length}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <div className="progress-bar h-full" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="divide-y divide-white/5">
        {lessons.map((lesson, i) => {
          const done = completed.has(lesson.id);
          const isOpen = expanded === lesson.id;

          return (
            <div key={lesson.id} className="group">
              <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/3 transition-colors">
                {/* Completion toggle */}
                <button
                  onClick={() => toggle(lesson.id)}
                  className="shrink-0 transition-transform hover:scale-110"
                  aria-label={done ? 'Marquer comme non complété' : 'Marquer comme complété'}
                >
                  {done
                    ? <CheckCircle size={17} className="text-emerald-400" />
                    : <Circle size={17} className="text-white/20 group-hover:text-white/40 transition-colors" />
                  }
                </button>

                {/* Number */}
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/6 text-[10px] font-bold text-gray-500 flex items-center justify-center font-mono">
                  {i + 1}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setExpanded(isOpen ? null : lesson.id)}
                    className="w-full text-left"
                  >
                    <p className={clsx(
                      'text-sm font-medium leading-snug transition-colors',
                      done ? 'text-gray-500 line-through decoration-gray-600' : 'text-gray-200 group-hover:text-white'
                    )}>
                      {lesson.title}
                    </p>
                  </button>
                </div>

                {/* Duration + expand */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock size={10} />
                    {lesson.duration}
                  </span>
                  <button
                    onClick={() => setExpanded(isOpen ? null : lesson.id)}
                    className="text-gray-700 hover:text-gray-400 transition-colors"
                  >
                    {isOpen
                      ? <ChevronDown size={14} />
                      : <ChevronRight size={14} />}
                  </button>
                </div>
              </div>

              {/* Expanded description */}
              {isOpen && (
                <div className="px-5 pb-3.5 ml-12">
                  <p className="text-xs text-gray-500 leading-relaxed bg-white/3 rounded-xl p-3 border border-white/5">
                    {lesson.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {completedCount === lessons.length && (
        <div className="px-5 py-3.5 bg-emerald-500/8 border-t border-emerald-500/15 flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Toutes les leçons complétées !</span>
        </div>
      )}
    </div>
  );
}
