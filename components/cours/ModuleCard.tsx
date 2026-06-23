import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Module } from '@/lib/courses';
import clsx from 'clsx';

const MODULE_COLORS: Record<string, { accent: string; bg: string; border: string; text: string }> = {
  'module-1': { accent: 'from-slate-500 to-slate-700',   bg: 'bg-slate-500/6',   border: 'border-slate-500/20', text: 'text-slate-300' },
  'module-2': { accent: 'from-blue-500 to-blue-700',     bg: 'bg-blue-500/6',    border: 'border-blue-500/20',  text: 'text-blue-300'  },
  'module-3': { accent: 'from-indigo-500 to-indigo-700', bg: 'bg-indigo-500/6',  border: 'border-indigo-500/20',text: 'text-indigo-300'},
  'module-4': { accent: 'from-rose-500 to-rose-700',     bg: 'bg-rose-500/6',    border: 'border-rose-500/20',  text: 'text-rose-300'  },
  'module-5': { accent: 'from-green-500 to-green-700',   bg: 'bg-green-500/6',   border: 'border-green-500/20', text: 'text-green-300' },
  'module-6': { accent: 'from-violet-500 to-violet-700', bg: 'bg-violet-500/6',  border: 'border-violet-500/20',text: 'text-violet-300'},
  'module-7': { accent: 'from-cyan-500 to-cyan-700',     bg: 'bg-cyan-500/6',    border: 'border-cyan-500/20',  text: 'text-cyan-300'  },
  'module-8': { accent: 'from-emerald-500 to-emerald-700',bg:'bg-emerald-500/6', border:'border-emerald-500/20',text:'text-emerald-300' },
  'module-9': { accent: 'from-amber-500 to-amber-700',   bg: 'bg-amber-500/6',   border: 'border-amber-500/20', text: 'text-amber-300' },
};

interface ModuleCardProps {
  module: Module;
  index?: number;
  compact?: boolean;
}

export default function ModuleCard({ module, index, compact = false }: ModuleCardProps) {
  const colors = MODULE_COLORS[module.id] ?? MODULE_COLORS['module-1'];
  const lvls = Array.from(new Set(module.courses.map((c) => c.level)));

  return (
    <Link
      href={`/modules/${module.slug}`}
      className={clsx(
        'group flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden',
        'hover:-translate-y-0.5 hover:shadow-lg',
        colors.bg, colors.border,
        compact ? 'p-4' : 'p-5'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {/* Module number */}
          <div className={clsx(
            'flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black text-white shrink-0',
            `bg-gradient-to-br ${colors.accent}`
          )}>
            {String(index !== undefined ? index + 1 : '').padStart(2, '0')}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
            Module {index !== undefined ? index + 1 : ''}
          </span>
        </div>
        <ChevronRight
          size={15}
          className="text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all shrink-0"
        />
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl" role="img" aria-label={module.title}>{module.icon}</span>
        <h3 className={clsx(
          'font-bold text-gray-100 group-hover:text-white transition-colors leading-snug',
          compact ? 'text-sm' : 'text-[14.5px]'
        )}>
          {module.title}
        </h3>
      </div>

      {/* Description */}
      {!compact && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {module.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <BookOpen size={11} />
          {module.courses.length} cours
        </span>
        {/* Levels */}
        <div className="flex gap-1">
          {lvls.slice(0, 3).map((l) => (
            <span
              key={l}
              className={clsx('text-[9px] px-1.5 py-0.5 rounded-full border font-medium', colors.text, colors.border, colors.bg)}
            >
              {l.slice(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
