'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { MODULES, getAllCourses, Level, Status, Tool } from '@/lib/courses';
import { LevelBadge, StatusBadge } from '@/components/ui/Badges';
import ModuleIcon from '@/components/icons/ModuleIcon';
import clsx from 'clsx';

const ALL_LEVELS: Level[] = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
const ALL_STATUSES: Status[] = ['À jour', 'À vérifier', 'En cours de mise à jour'];
const ALL_TOOLS: Tool[] = [
  'Apple Business Manager', 'Jamf Pro', 'Jamf School', 'Jamf Protect',
  'Jamf Security Cloud', 'Jamf Connect', 'Microsoft Intune', 'Android Enterprise',
  'macOS', 'iOS', 'iPadOS',
];

export default function ParcoursPage() {
  const [search, setSearch] = useState('');
  const [levels, setLevels] = useState<Level[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(MODULES.map((m) => m.id))
  );

  const allCourses = useMemo(() => getAllCourses(), []);

  const filteredModules = useMemo(() => {
    return MODULES.map((mod) => {
      const filtered = mod.courses.filter((c) => {
        const matchSearch = !search ||
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase());
        const matchLevel = levels.length === 0 || levels.includes(c.level);
        const matchStatus = statuses.length === 0 || statuses.includes(c.status);
        const matchTool = tools.length === 0 || c.tools.some((t) => tools.includes(t));
        return matchSearch && matchLevel && matchStatus && matchTool;
      });
      return { ...mod, courses: filtered };
    }).filter((m) => m.courses.length > 0);
  }, [search, levels, statuses, tools]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const n = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleFilter = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const activeFilterCount = levels.length + statuses.length + tools.length;
  const totalVisible = filteredModules.reduce((sum, m) => sum + m.courses.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-300">Accueil</Link>
          <ChevronRight size={12} />
          <span className="text-gray-300">Parcours</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Parcours de formation
        </h1>
        <p className="text-sm text-gray-400">
          {allCourses.length} cours organisés en {MODULES.length} modules progressifs
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/8 bg-[#161920] text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
              showFilters || activeFilterCount > 0
                ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                : 'border-white/8 bg-[#161920] text-gray-400 hover:text-gray-200'
            )}
          >
            <Filter size={15} />
            Filtres
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="rounded-xl border border-white/8 bg-[#161920] p-4 space-y-4">
            {/* Levels */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Niveau</p>
              <div className="flex flex-wrap gap-2">
                {ALL_LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleFilter(levels, setLevels, l)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                      levels.includes(l)
                        ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                        : 'border-white/8 text-gray-500 hover:border-white/15 hover:text-gray-300'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Statut</p>
              <div className="flex flex-wrap gap-2">
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleFilter(statuses, setStatuses, s)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                      statuses.includes(s)
                        ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                        : 'border-white/8 text-gray-500 hover:border-white/15 hover:text-gray-300'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Tools */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Outil</p>
              <div className="flex flex-wrap gap-2">
                {ALL_TOOLS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleFilter(tools, setTools, t)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                      tools.includes(t)
                        ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                        : 'border-white/8 text-gray-500 hover:border-white/15 hover:text-gray-300'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setLevels([]); setStatuses([]); setTools([]); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Effacer tous les filtres
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {(search || activeFilterCount > 0) && (
          <p className="text-xs text-gray-500">
            {totalVisible} cours trouvé{totalVisible > 1 ? 's' : ''}
            {filteredModules.length > 0 ? ` dans ${filteredModules.length} module${filteredModules.length > 1 ? 's' : ''}` : ''}
          </p>
        )}
      </div>

      {/* Modules list */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={40} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500 text-sm">Aucun cours ne correspond à vos filtres.</p>
          <button
            onClick={() => { setSearch(''); setLevels([]); setStatuses([]); setTools([]); }}
            className="mt-3 text-xs text-indigo-400 hover:text-indigo-300"
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredModules.map((mod) => {
            const isExpanded = expandedModules.has(mod.id);
            return (
              <div key={mod.id} className="rounded-xl border border-white/5 bg-[#131620] overflow-hidden">
                {/* Module header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/2 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <ModuleIcon moduleSlug={mod.slug} size={32} className="h-8 w-8" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 font-mono">
                          Module {String(mod.order).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 className="text-sm font-semibold text-white">{mod.title}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-xs text-gray-600">
                      {mod.courses.length} cours
                    </span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'text-gray-500 transition-transform',
                        isExpanded ? 'rotate-180' : ''
                      )}
                    />
                  </div>
                </button>

                {/* Courses grid */}
                {isExpanded && (
                  <div className="border-t border-white/5 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {mod.courses.map((course) => (
                        <Link
                          key={course.id}
                          href={`/cours/${course.slug}`}
                          className="group flex flex-col p-3.5 rounded-lg border border-white/5 bg-[#161920] hover:border-indigo-500/30 hover:bg-[#1a1d28] transition-all"
                        >
                          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            <LevelBadge level={course.level} />
                            <StatusBadge status={course.status} />
                          </div>
                          <p className="text-xs font-medium text-gray-200 group-hover:text-white leading-snug mb-2 line-clamp-2">
                            {course.title}
                          </p>
                          <div className="mt-auto flex items-center gap-1 text-xs text-gray-600">
                            <Clock size={11} />
                            <span>{course.duration}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
