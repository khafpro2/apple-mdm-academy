'use client';

import { useState, useMemo, useId } from 'react';
import Link from 'next/link';
import {
  Search, ChevronRight, ChevronDown, X, SlidersHorizontal,
  BookOpen
} from 'lucide-react';
import { MODULES, getAllCourses, Level, Tool } from '@/lib/courses';
import CourseCard, { CourseCardList } from '@/components/cours/CourseCard';
import clsx from 'clsx';

/* ─── Constants ─────────────────────────────────────────────────────────── */

const ALL_LEVELS: Level[] = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

const ALL_TOOLS: Tool[] = [
  'Apple Business Manager', 'Jamf Pro', 'Jamf School', 'Jamf Protect',
  'Jamf Security Cloud', 'Jamf Connect', 'Microsoft Intune', 'Android Enterprise',
];

const LEVEL_COLORS: Record<Level, string> = {
  'Débutant':      'border-emerald-500/30 bg-emerald-500/8 text-emerald-300 hover:bg-emerald-500/15',
  'Intermédiaire': 'border-blue-500/30 bg-blue-500/8 text-blue-300 hover:bg-blue-500/15',
  'Avancé':        'border-amber-500/30 bg-amber-500/8 text-amber-300 hover:bg-amber-500/15',
  'Expert':        'border-rose-500/30 bg-rose-500/8 text-rose-300 hover:bg-rose-500/15',
};

const LEVEL_COLORS_ACTIVE: Record<Level, string> = {
  'Débutant':      'border-emerald-400 bg-emerald-500/20 text-emerald-200',
  'Intermédiaire': 'border-blue-400 bg-blue-500/20 text-blue-200',
  'Avancé':        'border-amber-400 bg-amber-500/20 text-amber-200',
  'Expert':        'border-rose-400 bg-rose-500/20 text-rose-200',
};

/* ─── Pill toggle ────────────────────────────────────────────────────────── */
function Pill({
  label, active, onClick, colorClass, activeClass
}: { label: string; active: boolean; onClick: () => void; colorClass: string; activeClass: string }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap',
        active ? activeClass : colorClass
      )}
    >
      {label}
    </button>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function ParcoursPage() {
  const [query, setQuery] = useState('');
  const [levels, setLevels]   = useState<Level[]>([]);
  const [tools, setTools]     = useState<Tool[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedMods, setExpandedMods] = useState<Set<string>>(
    new Set(MODULES.map((m) => m.id))
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const searchId = useId();

  const allCourses = useMemo(() => getAllCourses(), []);

  /* Filter logic */
  const filteredModules = useMemo(() => {
    return MODULES.map((mod) => {
      const courses = mod.courses.filter((c) => {
        const q = query.toLowerCase();
        const matchQ = !q ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tools.some((t) => t.toLowerCase().includes(q));
        const matchL = levels.length === 0 || levels.includes(c.level);
        const matchT = tools.length === 0 || c.tools.some((t) => tools.includes(t));
        return matchQ && matchL && matchT;
      });
      return { ...mod, courses };
    }).filter((m) => m.courses.length > 0);
  }, [query, levels, tools]);

  const visibleCount = filteredModules.reduce((s, m) => s + m.courses.length, 0);
  const activeFilters = levels.length + tools.length;

  const toggleLevel = (l: Level) =>
    setLevels((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);
  const toggleTool = (t: Tool) =>
    setTools((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  const resetFilters = () => { setQuery(''); setLevels([]); setTools([]); };
  const toggleModule = (id: string) =>
    setExpandedMods((prev) => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); } else { n.add(id); }
      return n;
    });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-600 mb-8" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={11} />
        <span className="text-gray-300">Parcours</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Parcours de formation</h1>
        <p className="text-sm text-gray-400">
          {allCourses.length} cours · {MODULES.length} modules · Apple, Jamf, Microsoft Intune &amp; Android Enterprise
        </p>
      </div>

      {/* ── Search + filter bar ── */}
      <div className="mb-6 space-y-3">

        {/* Search row */}
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <label htmlFor={searchId} className="sr-only">Rechercher un cours</label>
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            <input
              id={searchId}
              type="search"
              placeholder="Rechercher un cours, module, outil…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
                aria-label="Effacer"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={clsx(
              'flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all whitespace-nowrap',
              filtersOpen || activeFilters > 0
                ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                : 'border-white/10 bg-white/[0.03] text-gray-400 hover:text-gray-200 hover:border-white/15'
            )}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filtres</span>
            {activeFilters > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold">
                {activeFilters}
              </span>
            )}
          </button>

          {/* View mode — desktop only */}
          <div className="hidden sm:flex rounded-xl border border-white/10 overflow-hidden">
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={clsx(
                  'px-3 py-2 text-xs font-medium transition-all',
                  viewMode === mode
                    ? 'bg-white/10 text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                )}
                title={mode === 'grid' ? 'Vue grille' : 'Vue liste'}
              >
                {mode === 'grid' ? '⊞' : '≡'}
              </button>
            ))}
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">

            {/* Levels */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Niveau</p>
              <div className="flex flex-wrap gap-2">
                {ALL_LEVELS.map((l) => (
                  <Pill
                    key={l} label={l} active={levels.includes(l)}
                    onClick={() => toggleLevel(l)}
                    colorClass={LEVEL_COLORS[l]}
                    activeClass={LEVEL_COLORS_ACTIVE[l]}
                  />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Outil / Technologie</p>
              <div className="flex flex-wrap gap-2">
                {ALL_TOOLS.map((t) => (
                  <Pill
                    key={t} label={t} active={tools.includes(t)}
                    onClick={() => toggleTool(t)}
                    colorClass="border-white/12 bg-white/4 text-gray-400 hover:bg-white/8 hover:text-gray-200"
                    activeClass="border-indigo-400 bg-indigo-500/20 text-indigo-200"
                  />
                ))}
              </div>
            </div>

            {/* Reset */}
            {activeFilters > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
              >
                <X size={11} /> Réinitialiser les filtres
              </button>
            )}
          </div>
        )}

        {/* Results summary */}
        <div className="flex items-center justify-between text-xs text-gray-500 min-h-[1.25rem]">
          <span>
            {visibleCount < allCourses.length
              ? `${visibleCount} cours sur ${allCourses.length}`
              : `${allCourses.length} cours`}
            {' '}· {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''}
          </span>
          {activeFilters > 0 && (
            <button onClick={resetFilters} className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Tout afficher
            </button>
          )}
        </div>
      </div>

      {/* ── Modules list ── */}
      {filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-2xl mb-3">🔍</p>
          <p className="text-gray-300 font-medium mb-1">Aucun cours trouvé</p>
          <p className="text-sm text-gray-500 mb-6">Essayez d&apos;autres termes ou réinitialisez les filtres.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            Tout afficher
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredModules.map((mod) => {
            const isExpanded = expandedMods.has(mod.id);
            return (
              <section key={mod.id} className="rounded-2xl border border-white/6 bg-white/[0.015] overflow-hidden">

                {/* Module header — cliquable pour réduire */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-white/[0.03] transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="text-xl shrink-0">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        Module {String(mod.order).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-base font-bold text-gray-100 truncate">
                      {mod.title}
                    </h2>
                  </div>
                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600 shrink-0">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {mod.courses.length} cours
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={clsx(
                      'text-gray-600 shrink-0 transition-transform duration-200',
                      isExpanded ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {/* Courses */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    {/* Mobile: toujours liste */}
                    <div className="sm:hidden space-y-2">
                      {mod.courses.map((course) => (
                        <CourseCardList key={course.id} course={course} />
                      ))}
                    </div>

                    {/* Desktop: grid ou liste selon viewMode */}
                    <div className={clsx(
                      'hidden sm:block',
                      viewMode === 'grid'
                        ? 'grid grid-cols-2 lg:grid-cols-3 gap-3'
                        : 'space-y-2'
                    )}>
                      {mod.courses.map((course) =>
                        viewMode === 'grid'
                          ? <CourseCard key={course.id} course={course} />
                          : <CourseCardList key={course.id} course={course} />
                      )}
                    </div>

                    {/* Module CTA */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        {mod.courses.length} cours · {mod.description.slice(0, 60)}…
                      </span>
                      <Link
                        href={`/modules/${mod.slug}`}
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Voir le module <ChevronRight size={11} />
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
