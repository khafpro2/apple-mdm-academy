import clsx from 'clsx';
import { type Level, type Status, type Tool } from '@/lib/courses';

// ── Level Badge ──────────────────────────────────────────────────────────────
const LEVEL_STYLES: Record<Level, string> = {
  'Débutant':      'bg-emerald-500/12 text-emerald-400 border-emerald-500/25',
  'Intermédiaire': 'bg-blue-500/12 text-blue-400 border-blue-500/25',
  'Avancé':        'bg-amber-500/12 text-amber-400 border-amber-500/25',
  'Expert':        'bg-rose-500/12 text-rose-400 border-rose-500/25',
};

const LEVEL_DOTS: Record<Level, number> = {
  'Débutant': 1, 'Intermédiaire': 2, 'Avancé': 3, 'Expert': 4,
};

interface BadgeProps { size?: 'sm' | 'md' }

export function LevelBadge({ level, size = 'sm' }: { level: Level } & BadgeProps) {
  const dots = LEVEL_DOTS[level] ?? 1;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 rounded-full border font-medium',
      size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]',
      LEVEL_STYLES[level] ?? 'bg-gray-500/12 text-gray-400 border-gray-500/25'
    )}>
      <span className="flex gap-0.5">
        {[1,2,3,4].map((d) => (
          <span
            key={d}
            className={clsx('w-1 h-1 rounded-full', d <= dots ? 'opacity-100' : 'opacity-20')}
            style={{ background: 'currentColor' }}
          />
        ))}
      </span>
      {level}
    </span>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<Status, string> = {
  'À jour':                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'À vérifier':              'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'En cours de mise à jour': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const STATUS_ICONS: Record<Status, string> = {
  'À jour': '✓', 'À vérifier': '!', 'En cours de mise à jour': '↻',
};

export function StatusBadge({ status, size = 'sm' }: { status: Status } & BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 rounded-full border font-medium',
      size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]',
      STATUS_STYLES[status] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    )}>
      <span className="text-[9px] font-bold">{STATUS_ICONS[status]}</span>
      {status}
    </span>
  );
}

// ── Tool Badge ───────────────────────────────────────────────────────────────
const TOOL_COLORS: Partial<Record<Tool, string>> = {
  'Apple Business Manager': 'bg-gray-500/12 text-gray-300 border-gray-500/20',
  'Jamf Pro':               'bg-blue-500/12 text-blue-400 border-blue-500/20',
  'Jamf School':            'bg-green-500/12 text-green-400 border-green-500/20',
  'Jamf Protect':           'bg-red-500/12 text-red-400 border-red-500/20',
  'Jamf Security Cloud':    'bg-purple-500/12 text-purple-400 border-purple-500/20',
  'Jamf Connect':           'bg-indigo-500/12 text-indigo-400 border-indigo-500/20',
  'Microsoft Intune':       'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',
  'Android Enterprise':     'bg-emerald-500/12 text-emerald-400 border-emerald-500/20',
  'macOS':                  'bg-gray-500/12 text-gray-300 border-gray-500/20',
  'iOS':                    'bg-sky-500/12 text-sky-400 border-sky-500/20',
  'iPadOS':                 'bg-violet-500/12 text-violet-400 border-violet-500/20',
};

export function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium',
      TOOL_COLORS[tool] ?? 'bg-gray-500/12 text-gray-400 border-gray-500/20'
    )}>
      {tool}
    </span>
  );
}

// ── XP Badge ─────────────────────────────────────────────────────────────────
export function XPBadge({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/12 border border-yellow-500/25 text-yellow-400 text-[11px] font-bold">
      ⚡ {xp.toLocaleString()} XP
    </span>
  );
}
