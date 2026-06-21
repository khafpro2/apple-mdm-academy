'use client';

import Link from 'next/link';
import {
  BookOpen, Target, ChevronRight,
  Clock, BarChart2, Zap, Award, RotateCcw, GraduationCap,
  Cloud, HardDrive
} from 'lucide-react';
import { MODULES, getAllCourses, getCourseBySlug } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import { getXPLevel, resetProgress } from '@/lib/progress';
import ProgressRing from '@/components/ui/ProgressRing';
import { useUser } from '@clerk/nextjs';

const MODULE_COLORS: Record<string, string> = {
  blue: '#3B82F6', orange: '#F97316', purple: '#A855F7', red: '#EF4444',
  green: '#10B981', indigo: '#6366F1', cyan: '#06B6D4', emerald: '#10B981', yellow: '#EAB308',
};

export default function DashboardClient() {
  const { progress, getModuleProgress, getRecentCourses, totalXP } = useProgress();
  const { user, isLoaded } = useUser();

  const allCourses = getAllCourses();
  const allSlugs = allCourses.map((c) => c.slug);
  const overallPercent = getModuleProgress(allSlugs);
  const xpInfo = getXPLevel(totalXP);

  // getRecentCourses retourne { slug, timestamp }[] — on enrichit avec les données du cours
  const recentSlugs = getRecentCourses(4);
  const recentCourses = recentSlugs
    .map(({ slug }) => getCourseBySlug(slug))
    .filter(Boolean);

  const completedCount = progress.completedCourses.length;
  const totalCount = allCourses.length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header avec infos utilisateur */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {isLoaded && user
              ? `Bonjour, ${user.firstName ?? user.emailAddresses[0]?.emailAddress.split('@')[0]} 👋`
              : 'Votre progression'}
          </h1>
          <p className="text-sm text-[#5A6478] mt-1">
            Suivez votre parcours de formation Apple Enterprise en temps réel.
          </p>
        </div>

        {/* Indicateur stockage */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/3">
          {isLoaded && user ? (
            <>
              <Cloud size={14} className="text-indigo-400" />
              <span className="text-xs text-[#9AA2B4]">Progression cloud</span>
            </>
          ) : (
            <>
              <HardDrive size={14} className="text-amber-400" />
              <span className="text-xs text-[#9AA2B4]">Sauvegardé localement</span>
            </>
          )}
        </div>
      </div>

      {/* Cartes de stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Progression globale */}
        <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl border border-white/8 bg-[#0D1117] flex items-center gap-4">
          <ProgressRing
            percent={overallPercent}
            size={56}
            className="shrink-0"
          />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#5A6478] mb-0.5">Progression</p>
            <p className="text-xl font-black text-white">{overallPercent}%</p>
            <p className="text-xs text-[#5A6478]">{completedCount}/{totalCount} cours</p>
          </div>
        </div>

        {/* Niveau XP */}
        <div className="p-5 rounded-2xl border border-white/8 bg-[#0D1117]">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-400" />
            <span className="text-[10px] uppercase tracking-widest text-[#5A6478]">Niveau {xpInfo.level}</span>
          </div>
          <p className="text-2xl font-black text-white">{xpInfo.title}</p>
          <p className="text-xs text-[#5A6478] mt-0.5">{totalXP} XP gagnés</p>
        </div>

        {/* Cours terminés */}
        <div className="p-5 rounded-2xl border border-white/8 bg-[#0D1117]">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-[#5A6478]">Terminés</span>
          </div>
          <p className="text-2xl font-black text-white">{completedCount}</p>
          <p className="text-xs text-[#5A6478] mt-0.5">sur {totalCount}</p>
        </div>

        {/* Modules démarrés */}
        <div className="p-5 rounded-2xl border border-white/8 bg-[#0D1117]">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-indigo-400" />
            <span className="text-[10px] uppercase tracking-widest text-[#5A6478]">Modules</span>
          </div>
          <p className="text-2xl font-black text-white">
            {MODULES.filter(m =>
              m.courses.some(c => progress.completedCourses.includes(c.slug))
            ).length}
          </p>
          <p className="text-xs text-[#5A6478] mt-0.5">sur {MODULES.length}</p>
        </div>
      </div>

      {/* Barre XP vers prochain niveau */}
      <div className="p-4 rounded-2xl border border-white/8 bg-[#0D1117]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#5A6478]">
            Niveau {xpInfo.level} → {xpInfo.level + 1}
          </span>
          <span className="text-xs text-[#9AA2B4] font-medium">
            {totalXP} / {xpInfo.nextXP} XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${Math.min(100, xpInfo.nextXP > 0 ? (totalXP / xpInfo.nextXP) * 100 : 100)}%` }}
          />
        </div>
        <p className="text-xs text-[#5A6478] mt-1.5">
          {Math.max(0, xpInfo.nextXP - totalXP)} XP pour atteindre le niveau suivant
        </p>
      </div>

      {/* Cours récents */}
      {recentCourses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-indigo-400" />
              <h2 className="text-sm font-semibold text-white">Continuer où vous en étiez</h2>
            </div>
            <Link href="/parcours" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={11} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {recentCourses.map((c) => c && (
              <Link
                key={c.slug}
                href={`/cours/${c.slug}`}
                className="p-4 rounded-xl border border-white/8 bg-[#0D1117] hover:border-white/15 hover:bg-[#131720] transition-all group"
              >
                <p className="text-xs text-indigo-400 mb-1 font-medium">{c.moduleTitle}</p>
                <p className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">{c.title}</p>
                <p className="text-xs text-[#5A6478] mt-1 flex items-center gap-1">
                  <Clock size={10} />{c.duration}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Progression par module */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={15} className="text-indigo-400" />
          <h2 className="text-sm font-semibold text-white">Progression par module</h2>
          <Link
            href="/parcours"
            className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            Reprendre <ChevronRight size={11} />
          </Link>
        </div>
        <div className="space-y-2">
          {MODULES.map((mod) => {
            const slugs = mod.courses.map((c) => c.slug);
            const pct = getModuleProgress(slugs);
            const color = MODULE_COLORS[mod.color] ?? '#6366F1';
            return (
              <Link
                key={mod.slug}
                href={`/modules/${mod.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/2 transition-all group"
              >
                <span className="text-xl w-7 text-center shrink-0">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-[#9AA2B4] group-hover:text-white transition-colors truncate pr-2">
                      {mod.title}
                    </p>
                    <span className="text-xs text-[#5A6478] shrink-0">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA si débutant */}
      {completedCount === 0 && (
        <div className="p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center">
          <GraduationCap size={24} className="mx-auto text-indigo-400 mb-3" />
          <p className="text-sm font-semibold text-white mb-1">Commencez votre formation</p>
          <p className="text-xs text-[#5A6478] mb-4">9 modules, 60 cours, 7 certifications professionnelles</p>
          <Link
            href="/parcours"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            <Target size={14} /> Voir le parcours
          </Link>
        </div>
      )}

      {/* Reset progression */}
      {completedCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm('Réinitialiser toute votre progression ? Cette action est irréversible.')) {
                resetProgress();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-[#5A6478] hover:text-red-400 transition-colors py-1"
          >
            <RotateCcw size={11} />
            Réinitialiser la progression
          </button>
        </div>
      )}
    </div>
  );
}
