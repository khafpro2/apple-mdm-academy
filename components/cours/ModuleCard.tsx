'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Module } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import ProgressRing from '@/components/ui/ProgressRing';
import clsx from 'clsx';

const COLOR_CONFIG: Record<string, {
  border: string; accent: string; ring: string; badge: string; glow: string;
}> = {
  blue:    { border: 'hover:border-blue-500/35',    accent: 'text-blue-400',    ring: '#3B82F6', badge: 'bg-blue-500/10 text-blue-400',    glow: 'hover:shadow-blue-500/10' },
  orange:  { border: 'hover:border-orange-500/35',  accent: 'text-orange-400',  ring: '#F97316', badge: 'bg-orange-500/10 text-orange-400',  glow: 'hover:shadow-orange-500/10' },
  purple:  { border: 'hover:border-purple-500/35',  accent: 'text-purple-400',  ring: '#A855F7', badge: 'bg-purple-500/10 text-purple-400',  glow: 'hover:shadow-purple-500/10' },
  red:     { border: 'hover:border-red-500/35',     accent: 'text-red-400',     ring: '#EF4444', badge: 'bg-red-500/10 text-red-400',        glow: 'hover:shadow-red-500/10' },
  green:   { border: 'hover:border-green-500/35',   accent: 'text-green-400',   ring: '#10B981', badge: 'bg-green-500/10 text-green-400',    glow: 'hover:shadow-green-500/10' },
  indigo:  { border: 'hover:border-indigo-500/35',  accent: 'text-indigo-400',  ring: '#6366F1', badge: 'bg-indigo-500/10 text-indigo-400',  glow: 'hover:shadow-indigo-500/10' },
  cyan:    { border: 'hover:border-cyan-500/35',    accent: 'text-cyan-400',    ring: '#06B6D4', badge: 'bg-cyan-500/10 text-cyan-400',      glow: 'hover:shadow-cyan-500/10' },
  emerald: { border: 'hover:border-emerald-500/35', accent: 'text-emerald-400', ring: '#10B981', badge: 'bg-emerald-500/10 text-emerald-400', glow: 'hover:shadow-emerald-500/10' },
  yellow:  { border: 'hover:border-yellow-500/35',  accent: 'text-yellow-400',  ring: '#EAB308', badge: 'bg-yellow-500/10 text-yellow-400',  glow: 'hover:shadow-yellow-500/10' },
};

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const cfg = COLOR_CONFIG[module.color] ?? COLOR_CONFIG.indigo;
  const { getModuleProgress } = useProgress();
  const slugs = module.courses.map((c) => c.slug);
  const progress = getModuleProgress(slugs);
  const levels = [...new Set(module.courses.map((c) => c.level))];

  return (
    <Link
      href={`/modules/${module.slug}`}
      className={clsx(
        'group flex flex-col rounded-2xl border border-white/8 bg-[#0D1117] p-5 transition-all duration-200',
        'hover:bg-[#131720] hover:shadow-xl',
        cfg.border, cfg.glow,
        'card-hover'
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl select-none">{module.icon}</div>
          <div>
            <p className="text-[10px] text-gray-600 font-mono mb-0.5">
              Module {String(module.order).padStart(2, '0')}
            </p>
            {progress > 0 && (
              <div className="flex items-center gap-1">
                <div className="h-1 w-16 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${progress}%`, background: cfg.ring }}
                  />
                </div>
                <span className="text-[10px] font-medium" style={{ color: cfg.ring }}>
                  {progress}%
                </span>
              </div>
            )}
          </div>
        </div>
        {progress > 0 && (
          <ProgressRing
            percent={progress}
            size={40}
            stroke={3}
            color={cfg.ring}
            showLabel={false}
          />
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[#F1F3F9] group-hover:text-white transition-colors text-sm leading-snug mb-2">
        {module.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#5A6478] leading-relaxed mb-4 line-clamp-2 flex-1">
        {module.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={clsx('flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium', cfg.badge)}>
            <BookOpen size={9} />
            {module.courses.length} cours
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {levels.slice(0, 3).map((l) => (
            <span key={l} className="w-1.5 h-1.5 rounded-full bg-gray-600" title={l} />
          ))}
          <ChevronRight
            size={14}
            className={clsx('transition-all group-hover:translate-x-0.5', cfg.accent)}
          />
        </div>
      </div>
    </Link>
  );
}
