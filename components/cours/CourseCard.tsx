'use client';

import Link from 'next/link';
import { Clock, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import { Course } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import { LevelBadge, StatusBadge } from '@/components/ui/Badges';
import clsx from 'clsx';

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

export default function CourseCard({ course, compact = false }: CourseCardProps) {
  const { isCourseComplete } = useProgress();
  const done = isCourseComplete(course.slug);

  return (
    <Link
      href={`/cours/${course.slug}`}
      className={clsx(
        'group relative flex flex-col rounded-2xl border transition-all duration-200',
        'bg-[#0D1117] hover:bg-[#131720]',
        done
          ? 'border-emerald-500/20 hover:border-emerald-500/35'
          : 'border-white/8 hover:border-indigo-500/30',
        'card-hover',
        compact ? 'p-4' : 'p-5'
      )}
    >
      {/* Completion indicator */}
      {done && (
        <div className="absolute top-3 right-3">
          <CheckCircle size={14} className="text-emerald-400" />
        </div>
      )}

      {/* Header badges */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <LevelBadge level={course.level} />
        <StatusBadge status={course.status} />
      </div>

      {/* Title */}
      <h3 className={clsx(
        'font-semibold text-[#F1F3F9] group-hover:text-white transition-colors leading-snug mb-2',
        compact ? 'text-sm' : 'text-[15px]'
      )}>
        {course.title}
      </h3>

      {/* Description */}
      {!compact && (
        <p className="text-xs text-[#5A6478] leading-relaxed mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between text-xs text-[#3A4156]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {course.lessons.length} leçon{course.lessons.length > 1 ? 's' : ''}
          </span>
        </div>
        <ChevronRight
          size={14}
          className={clsx(
            'transition-all group-hover:translate-x-0.5',
            done ? 'text-emerald-500/60' : 'text-[#3A4156] group-hover:text-indigo-400'
          )}
        />
      </div>
    </Link>
  );
}
