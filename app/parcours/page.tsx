'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ChevronRight, ChevronDown, X,
  BookOpen, SlidersHorizontal, LayoutGrid, List
} from 'lucide-react';
import { MODULES, getAllCourses, Level, Tool } from '@/lib/courses';
import CourseCard, { CourseCardList } from '@/components/cours/CourseCard';
import clsx from 'clsx';

/* ─── Constantes ─────────────────────────────────────────────────────────── */

const LEVELS: Level[] = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

const TOOLS: Tool[] = [
  'Apple Business Manager', 'Jamf Pro', 'Jamf School', 'Jamf Protect',
  'Jamf Security Cloud', 'Jamf Connect', 'Microsoft Intune', 'Android Enterprise',
];

const LEVEL_COLORS: Record<Level, { idle: string; active: string }> = {
  'Débutant':      { idle: 'border-emerald-500/30 bg-emerald-500/6 text-emerald-400 hover:bg-emerald-500/12',  active: 'border-emerald-400 bg-emerald-500/20 text-emerald-200' },
  'Intermédiaire': { idle: 'border-blue-500/30 bg-blue-500/6 text-blue-400 hover:bg-blue-500/12',              active: 'border-blue-400 bg-blue-500/20 text-blue-200' },
  'Avancé':        { idle: 'border-amber-500/30 bg-amber-500/6 text-amber-400 hover:bg-amber-500/12',          active: 'border-amber-400 bg-amber-500/20 text-amber-200' },
  'Expert':        { idle: 'border-rose-500/30 bg-rose-500/6 text-rose-400 hover:bg-rose-500/12',              active: 'border-rose-400 bg-rose-500/20 text-rose-200' },
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ParcoursPage() {
  const [query, setQuery]           = useState('');
  const [levels, setLevels]         = useState<Level[]>([]);
  const [tools, setTools]           = useState<Tool[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode]     = useState<'grid' | 'list'>('grid');
  const [expandedMods, setExpandedMods] = useState<Set<string>>(
    new Set(MODULES.map((m) => m.id))
  );

  const allCourses = useMemo(() => getAllCourses(), []);

  const filteredModules = useMemo(() => {
    return MODULES.map((mod) => ({
      ...mod,
      courses: mod.courses.filter((c) => {
        const q = query.toLowerCase();
        const matchQ = !q ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tools.some((t) => t.toLowerCase().includes(q));
        const matchL = levels.length === 0 || levels.includes(c.level);
        const matchT = tools.length === 0 || c.tools.some((t) => tools.includes(t));
        return matchQ && matchL && matchT;
      }),
    })).filter((m) => m.courses.length > 0);
  }, [query, levels, tools]);

  const visibleCount  = filteredModules.reduce((s, m) => s + m.courses.length, 0);
  const activeFilters = levels.length + tools.length + (query ? 1 : 0);

  const toggleLevel  = (l: Level) => setLevels((p) => p.includes(l) ? p.filter((x) => x !== l) : [...p, l]);
  const toggleTool   = (t: Tool)  => setTools((p)  => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const resetFilters = () => { setQuery(''); setLevels([]); setTools([]); };
  const toggleMod    = (id: string) => setExpandedMods((p) => { const n = new Set(p); if (n.has(id)) { n.delete(id); } else { n.add(id); } return n; });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* ── En-tête ──────────────────────────────────────────────────────── */}
      <div className="mb-8 sm:mb-10">
        <nav className="flex items-center gap-1.5 text-xs text-gray-600 mb-5">
          <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
          <ChevronRight size={11} />
          <span className="text-gray-400">Parcours</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Parcours de formation</h1>
        <p className="text-sm text-gray-500">
          {allCourses.length} cours · {MODULES.length} modules · Apple, Jamf Pro, Microsoft Intune & Android Enterprise
        </p>
      </div>

      {/* ── Barre de recherche + filtres ──────────────────────────────────── */}
      <div className="space-y-3 mb-8">

        {/* Ligne 1 : recherche + boutons */}
        <div className="flex gap-2">
          {/* Champ recherche */}
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un cours, un outil…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Bouton filtres */}
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

          {/* Vue grille/liste — sm+ */}
          <div className="hidden sm:flex rounded-xl border border-white/10 overflow-hidden">
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                title={mode === 'grid' ? 'Vue grille' : 'Vue liste'}
                className={clsx(
                  'px-3 py-2 text-xs font-medium transition-all',
                  viewMode === mode ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                )}
              >
                {mode === 'grid' ? <LayoutGrid size={14} /> : <List size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres rapides niveau — toujours visibles sur sm+ */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mr-1 shrink-0">Niveau :</span>
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => toggleLevel(l)}
              className={clsx(
                'px-3 py-1 rounded-full border text-xs font-medium transition-all',
                levels.includes(l) ? LEVEL_COLORS[l].active : LEVEL_COLORS[l].idle
              )}
            >
              {l}
            </button>
          ))}
          {levels.length > 0 && (
            <button
              onClick={() => setLevels([])}
              className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-0.5 ml-1 transition-colors"
            >
              <X size={10} /> Effacer
            </button>
          )}
        </div>

        {/* Panel filtres complet (accordion) */}
        {filtersOpen && (
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
            {/* Niveau (mobile) */}
            <div className="sm:hidden">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Niveau</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleLevel(l)}
                    className={clsx(
                      'px-3 py-1.5 rounded-full border text-xs font-medium transition-all',
                      levels.includes(l) ? LEVEL_COLORS[l].active : LEVEL_COLORS[l].idle
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Outils */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Outil / Technologie</p>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTool(t)}
                    className={clsx(
                      'px-3 py-1.5 rounded-full border text-xs font-medium transition-all',
                      tools.includes(t)
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200'
                        : 'border-white/12 bg-white/4 text-gray-400 hover:bg-white/8 hover:text-gray-200 hover:border-white/20'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {activeFilters > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
              >
                <X size={11} /> Réinitialiser tous les filtres
              </button>
            )}
          </div>
        )}

        {/* Résumé résultats */}
        <div className="flex items-center justify-between text-xs text-gray-500 min-h-[1.25rem]">
          <span>
            {visibleCount < allCourses.length
              ? <><span className="text-gray-300 font-medium">{visibleCount}</span> cours sur {allCourses.length}</>
              : <><span className="text-gray-300 font-medium">{allCourses.length}</span> cours</>
            }
            {' '}· {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''}
          </span>
          {activeFilters > 0 && (
            <button onClick={resetFilters} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              Tout afficher
            </button>
          )}
        </div>
      </div>

      {/* ── Liste des modules ──────────────────────────────────────────────── */}
      {filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl border border-white/8 bg-white/[0.02] flex items-center justify-center mb-4">
            <Search size={20} className="text-gray-600" />
          </div>
          <p className="text-gray-300 font-semibold mb-1.5">Aucun cours trouvé</p>
          <p className="text-sm text-gray-600 mb-6">Essayez d&apos;autres termes ou réinitialisez les filtres.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredModules.map((mod) => {
            const isExpanded = expandedMods.has(mod.id);
            return (
              <section
                key={mod.id}
                className="rounded-2xl border border-white/6 bg-white/[0.015] overflow-hidden"
              >
                {/* En-tête module */}
                <button
                  onClick={() => toggleMod(mod.id)}
                  className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-white/[0.025] transition-colors"
                  aria-expanded={isExpanded}
                >
                  {/* Icône */}
                  <span className="text-xl sm:text-2xl shrink-0 leading-none">{mod.icon}</span>

                  {/* Titre + description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                        Module {String(mod.order).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-[15px] font-bold text-gray-100 truncate">
                      {mod.title}
                    </h2>
                    <p className="text-xs text-gray-600 truncate mt-0.5 hidden sm:block">
                      {mod.description}
                    </p>
                  </div>

                  {/* Stats desktop */}
                  <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600 shrink-0">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {mod.courses.length} cours
                    </span>
                  </div>

                  {/* Compte mobile */}
                  <span className="sm:hidden text-[10px] text-gray-600 shrink-0">
                    {mod.courses.length} cours
                  </span>

                  <ChevronDown
                    size={15}
                    className={clsx(
                      'text-gray-600 shrink-0 transition-transform duration-200',
                      isExpanded ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {/* Cours du module */}
                {isExpanded && (
                  <div className="px-3 pb-3 sm:px-5 sm:pb-5 border-t border-white/4">
                    <div className="pt-3 sm:pt-4">
                      {/* Mobile : toujours liste */}
                      <div className="sm:hidden space-y-2">
                        {mod.courses.map((course) => (
                          <CourseCardList key={course.id} course={course} />
                        ))}
                      </div>

                      {/* Desktop : grille ou liste */}
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

                      {/* Footer module */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
                        <Link
                          href={`/modules/${mod.slug}`}
                          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Voir le module complet <ChevronRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* ── CTA bas de page ────────────────────────────────────────────────── */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-300 mb-1">Formation complète & gratuite</p>
          <p className="text-xs text-gray-600">
            {allCourses.length} cours · Labs interactifs · Quiz d&apos;évaluation · Guides de certification
          </p>
        </div>
        <Link
          href="/modules"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors shrink-0"
        >
          Vue par modules <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
