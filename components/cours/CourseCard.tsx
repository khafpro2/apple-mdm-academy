'use client';

import Link from 'next/link';
import { Clock, ChevronRight, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import { LevelBadge, StatusBadge } from '@/components/ui/Badges';
import clsx from 'clsx';

interface CourseCardProps {
  course: Course;
  compact?: boolean;
  showModule?: boolean;
}

export default function CourseCard({ course, compact = false, showModule = false }: CourseCardProps) {
  const { isCourseComplete } = useProgress();
  const done = isCourseComplete(course.slug);

  return (
    <Link
      href={`/cours/${course.slug}`}
      className={clsx(
        'group relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden',
        done
          ? 'bg-emerald-500/4 border-emerald-500/25 hover:border-emerald-500/45 hover:bg-emerald-500/8'
          : 'bg-white/[0.02] border-white/8 hover:border-indigo-500/35 hover:bg-white/[0.04]',
        compact ? 'p-4 gap-2' : 'p-5 gap-3'
      )}
    >
      {/* Completion tick */}
      {done && (
        <span className="absolute top-3.5 right-3.5">
          <CheckCircle size={13} className="text-emerald-400" />
        </span>
      )}

      {/* Module label — optional */}
      {showModule && (
        <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest truncate">
          {course.moduleTitle}
        </p>
      )}

      {/* Level + Status */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <LevelBadge level={course.level} />
        <StatusBadge status={course.status} />
      </div>

      {/* Title */}
      <h3 className={clsx(
        'font-semibold leading-snug text-gray-100 group-hover:text-white transition-colors',
        compact ? 'text-sm' : 'text-[14.5px]'
      )}>
        {course.title}
      </h3>

      {/* Description */}
      {!compact && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {course.description}
        </p>
      )}

      {/* Certif tags */}
      {!compact && course.certificationRelated.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {course.certificationRelated.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/6"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={10} className="text-gray-600" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={10} className="text-gray-600" />
            {course.lessons.length} leçon{course.lessons.length !== 1 ? 's' : ''}
          </span>
        </div>
        <span className={clsx(
          'flex items-center gap-0.5 text-[10px] font-medium transition-all',
          done
            ? 'text-emerald-500/70'
            : 'text-gray-700 group-hover:text-indigo-400 group-hover:translate-x-0.5'
        )}>
          {done ? 'Terminé' : 'Voir'}
          <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Variante liste (pour la page parcours mobile) ─────────────────────── */
export function CourseCardList({ course }: { course: Course }) {
  const { isCourseComplete } = useProgress();
  const done = isCourseComplete(course.slug);

  return (
    <Link
      href={`/cours/${course.slug}`}
      className={clsx(
        'group flex items-center gap-3 p-3.5 rounded-xl border transition-all',
        done
          ? 'border-emerald-500/20 bg-emerald-500/4 hover:bg-emerald-500/8'
          : 'border-white/6 bg-white/[0.015] hover:border-indigo-500/25 hover:bg-white/[0.03]'
      )}
    >
      {/* Indicator */}
      <div className={clsx(
        'w-1.5 h-8 rounded-full shrink-0',
        done ? 'bg-emerald-500' : 'bg-white/10 group-hover:bg-indigo-500/50'
      )} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <LevelBadge level={course.level} />
          {done && <CheckCircle size={11} className="text-emerald-400" />}
        </div>
        <p className="text-sm font-medium text-gray-200 group-hover:text-white truncate transition-colors">
          {course.title}
        </p>
        <p className="text-[11px] text-gray-600 mt-0.5">
          {course.duration} · {course.lessons.length} leçon{course.lessons.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ArrowRight size={14} className="text-gray-700 group-hover:text-indigo-400 shrink-0 transition-colors" />
    </Link>
  );
}
