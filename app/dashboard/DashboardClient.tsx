'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Trophy, Flame, BookOpen, Target, ChevronRight,
  Clock, BarChart2, Zap, Award, RotateCcw, GraduationCap
} from 'lucide-react';
import { MODULES, getAllCourses, getCourseBySlug } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import { getXPLevel, resetProgress } from '@/lib/progress';
import ProgressRing from '@/components/ui/ProgressRing';
import { LevelBadge } from '@/components/ui/Badges';
import clsx from 'clsx';

const MODULE_COLORS: Record<string, string> = {
  blue: '#3B82F6', orange: '#F97316', purple: '#A855F7', red: '#EF4444',
  green: '#10B981', indigo: '#6366F1', cyan: '#06B6D4', emerald: '#10B981', yellow: '#EAB308',
};

export default function DashboardClient() {
  const { progress, getModuleProgress, getRecentCourses, totalXP } = useProgress();
  const allCourses = getAllCourses();
  const allSlugs = allCourses.map((c) => c.slug);
  const overallPercent = getModuleProgress(allSlugs);
  const xpInfo = getXPLevel(totalXP);
  const recentList = getRecentCourses(4);

  const completedCount = progress.completedCourses.length;
  const totalCount = allCourses.length;

  const handleReset = () => {
    if (confirm('Réinitialiser toute votre progression ? Cette action est irréversible.')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-[#5A6478] mb-4">
          <Link href="/" className="hover:text-gray-400">Accueil</Link>
          <ChevronRight size={11} />
          <span className="text-gray-400">Tableau de bord</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Votre progression
        </h1>
        <p className="text-sm text-[#5A6478]">
          Suivez votre parcours de formation Apple Enterprise en temps réel.
        </p>
      </div>

      {/* Top stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Overall progress */}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-4 rounded-2xl border border-white/8 bg-[#0D1117] p-5">
          <ProgressRing percent={overallPercent} size={64} stroke={4} color="#5E6AD2" />
          <div>
            <p className="text-xs text-[#5A6478] mb-0.5">Progression globale</p>
            <p className="text-xl font-bold text-white">{overallPercent}%</p>
            <p className="text-xs text-[#3A4156]">{completedCount}/{totalCount} cours</p>
          </div>
        </div>

        {/* XP / Level */}
        <div className="rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-5 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/15">
            <Zap size={18} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-yellow-500/60 mb-0.5">Niveau {xpInfo.level}</p>
            <p className="text-base font-bold text-white">{xpInfo.title}</p>
            <p className="text-xs text-yellow-500/50">{totalXP.toLocaleString()} XP</p>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15">
            <Award size={18} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-emerald-500/60 mb-0.5">Cours terminés</p>
            <p className="text-2xl font-bold text-white">{completedCount}</p>
            <p className="text-xs text-emerald-500/50">sur {totalCount}</p>
          </div>
        </div>

        {/* Modules started */}
        <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/5 p-5 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/15">
            <BookOpen size={18} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-indigo-500/60 mb-0.5">Modules démarrés</p>
            <p className="text-2xl font-bold text-white">
              {MODULES.filter((m) => m.courses.some((c) => progress.completedCourses.includes(c.slug))).length}
            </p>
            <p className="text-xs text-indigo-500/50">sur {MODULES.length}</p>
          </div>
        </div>
      </div>

      {/* XP Progress bar */}
      {xpInfo.nextXP > xpInfo.currentXP && (
        <div className="mb-8 rounded-2xl border border-white/8 bg-[#0D1117] p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap size={13} className="text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Niveau {xpInfo.level} → {xpInfo.level + 1}</span>
            </div>
            <span className="text-xs text-gray-500">
              {totalXP.toLocaleString()} / {xpInfo.nextXP.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2 bg-white/6 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
              style={{ width: `${Math.round((totalXP / xpInfo.nextXP) * 100)}%`, transition: 'width 0.8s ease' }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {(xpInfo.nextXP - totalXP).toLocaleString()} XP pour atteindre &quot;{
              ['', 'Praticien', 'Technicien', 'Spécialiste', 'Expert', 'Architecte MDM'][xpInfo.level] ?? 'Max'
            }&quot;
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module progress */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <BarChart2 size={16} className="text-indigo-400" />
              Progression par module
            </h2>
            <Link href="/parcours" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Reprendre <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {MODULES.map((mod) => {
              const slugs = mod.courses.map((c) => c.slug);
              const pct = getModuleProgress(slugs);
              const done = slugs.filter((s) => progress.completedCourses.includes(s)).length;
              const color = MODULE_COLORS[mod.color] ?? '#6366F1';

              return (
                <Link
                  key={mod.id}
                  href={`/modules/${mod.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-white/6 bg-[#0D1117] px-4 py-3 hover:border-white/12 hover:bg-[#131720] transition-all group"
                >
                  <span className="text-xl shrink-0">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-medium text-gray-300 truncate group-hover:text-white transition-colors">
                        {mod.title}
                      </p>
                      <span className="text-xs text-gray-600 ml-2 shrink-0">{done}/{slugs.length}</span>
                    </div>
                    <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold shrink-0" style={{ color: pct > 0 ? color : '#3A4156' }}>
                    {pct}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent + Actions sidebar */}
        <div className="space-y-5">
          {/* Recent courses */}
          <div className="rounded-2xl border border-white/8 bg-[#0D1117] overflow-hidden">
            <div className="px-4 py-3.5 border-b border-white/6 flex items-center gap-2">
              <Clock size={13} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Récemment visités</span>
            </div>
            {recentList.length > 0 ? (
              <div className="divide-y divide-white/4">
                {recentList.map(({ slug, timestamp }) => {
                  const course = getCourseBySlug(slug);
                  if (!course) return null;
                  const done = progress.completedCourses.includes(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/cours/${slug}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors group"
                    >
                      <div className={clsx(
                        'w-1.5 h-1.5 rounded-full mt-1.5 shrink-0',
                        done ? 'bg-emerald-400' : 'bg-indigo-400/50'
                      )} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                          {course.title}
                        </p>
                        <p className="text-[10px] text-gray-600 mt-0.5">
                          {new Date(timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-xs text-gray-600">Aucun cours visité</p>
                <Link href="/parcours" className="mt-2 inline-block text-xs text-indigo-400 hover:text-indigo-300">
                  Commencer →
                </Link>
              </div>
            )}
          </div>

          {/* Next suggested course */}
          {(() => {
            const next = getAllCourses().find((c) => !progress.completedCourses.includes(c.slug));
            if (!next) return null;
            return (
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={13} className="text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-400">Prochaine étape</span>
                </div>
                <p className="text-sm font-medium text-white mb-1">{next.title}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{next.description}</p>
                <Link
                  href={`/cours/${next.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  <GraduationCap size={13} />
                  Continuer la formation
                </Link>
              </div>
            );
          })()}

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-[#3A4156] hover:text-gray-500 transition-colors mx-auto"
          >
            <RotateCcw size={11} />
            Réinitialiser ma progression
          </button>
        </div>
      </div>
    </div>
  );
}
