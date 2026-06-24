import Link from 'next/link';
import {
  BookOpen, GraduationCap, ChevronRight, Clock,
  Trophy, ArrowRight, BarChart2, Terminal
} from 'lucide-react';
import { MODULES, STATS, getFeaturedCourses, getModernAppleModule } from '@/lib/courses';
import { HOMEPAGE_TOOLS } from '@/lib/icons';
import ModuleCard from '@/components/cours/ModuleCard';
import ModuleIcon from '@/components/icons/ModuleIcon';
import PictogramIcon from '@/components/icons/PictogramIcon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MDM Academy — Formation Apple Enterprise, Jamf & Intune',
  description: `Plateforme de formation professionnelle Apple Enterprise : ${STATS.totalCourses} cours, ${STATS.totalModules} modules, du débutant à l'expert. Apple Business Manager, Jamf Pro, Microsoft Intune, Android Enterprise.`,
};

const VALUE_PROPS = [
  {
    icon: GraduationCap,
    title: 'Parcours structuré',
    desc: `${STATS.totalModules} modules progressifs du débutant à l'expert, avec objectifs et prérequis clairement définis.`,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/8 border-indigo-500/15',
  },
  {
    icon: BarChart2,
    title: 'Suivi de progression',
    desc: 'Tableau de bord personnel, points XP, progression par module. Reprenez exactement là où vous en étiez.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8 border-emerald-500/15',
  },
  {
    icon: Terminal,
    title: 'Ressources pratiques',
    desc: 'Scripts Bash, Configuration Profiles, politiques Intune et templates Android Enterprise prêts à l\'emploi.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/8 border-violet-500/15',
  },
  {
    icon: Trophy,
    title: 'Certifications',
    desc: `${STATS.certifications} certifications officielles : Apple Professional Training, Jamf Training et Microsoft Learn.`,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/8 border-yellow-500/15',
  },
];

export default function HomePage() {
  const featured = getFeaturedCourses();
  const modernApple = getModernAppleModule();
  const modernAppleFirstCourse = modernApple?.courses[0];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Background glows */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/8 blur-[120px] rounded-full" />
          <div className="absolute top-32 right-1/4 w-[400px] h-[300px] bg-violet-600/6 blur-[80px] rounded-full" />
          <div className="absolute -top-10 left-1/4 w-[300px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Plateforme de formation Apple Enterprise — v3
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Maîtrisez la gestion{' '}
            <span className="gradient-text">Apple en entreprise</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9AA2B4] max-w-2xl mx-auto mb-8 leading-relaxed">
            De Apple Business Manager à Jamf Pro Expert — {STATS.totalCourses} cours,{' '}
            {STATS.totalModules} modules, {STATS.certifications} certifications professionnelles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/parcours"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 active:bg-indigo-700 transition-colors text-sm shadow-xl shadow-indigo-500/25"
            >
              <GraduationCap size={17} />
              Commencer la formation
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-[#9AA2B4] font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
            >
              <BarChart2 size={17} />
              Mon tableau de bord
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-auto max-w-3xl mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: BookOpen,     value: String(STATS.totalModules), label: 'Modules',       sub: 'progressifs' },
            { icon: GraduationCap,value: String(STATS.totalCourses), label: 'Cours',         sub: 'structurés' },
            { icon: Clock,        value: STATS.totalDuration,        label: 'Contenu',       sub: 'de formation' },
            { icon: Trophy,       value: String(STATS.certifications),label: 'Certifications', sub: 'couvertes' },
          ].map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center p-4 rounded-2xl border border-white/6 bg-white/2 hover:bg-white/4 transition-colors">
              <Icon size={16} className="text-indigo-400 mb-2" />
              <div className="text-2xl font-black text-white leading-none mb-0.5">{value}</div>
              <div className="text-xs font-medium text-gray-400">{label}</div>
              <div className="text-[10px] text-[#3A4156]">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 border-y border-white/5">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-[10px] text-[#3A4156] uppercase tracking-widest mb-6 font-medium">
            Technologies couvertes dans la formation
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {HOMEPAGE_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-[#0D1117] hover:border-white/10 hover:bg-[#131720] transition-all cursor-default"
                title={tool.name}
              >
                <PictogramIcon
                  src={tool.iconSrc}
                  size={24}
                  className="h-6 w-6 group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] text-[#5A6478] group-hover:text-gray-400 text-center leading-tight transition-colors font-medium">
                  {tool.short}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Une vraie plateforme de formation
            </h2>
            <p className="text-sm text-[#5A6478] max-w-xl mx-auto">
              Pas juste de la documentation — une expérience d&apos;apprentissage structurée avec suivi, ressources et certifications.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUE_PROPS.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`rounded-2xl border p-5 ${bg}`}>
                <div className={`mb-3 ${color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-[#5A6478] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODERN APPLE HIGHLIGHT ────────────────────────────────────────── */}
      {modernApple && modernAppleFirstCourse && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-y border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/50 via-[#0D1117] to-[#0D1117] p-8 sm:p-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ModuleIcon moduleSlug={modernApple.slug} size={24} className="h-6 w-6" />
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Nouveau — Module 10</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {modernApple.title}
                  </h2>
                  <p className="text-sm text-[#9AA2B4] max-w-lg mb-3">
                    {modernApple.description} — {modernApple.courses.length} cours, DDM, Zero Trust et gestion cloud-first.
                  </p>
                  <p className="text-xs text-purple-400/70">
                    Inspiré du livre blanc Jamf « La gestion moderne : l&apos;avenir des solutions MDM »
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href={`/modules/${modernApple.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600/25 border border-purple-500/30 text-purple-200 font-semibold hover:bg-purple-600/35 transition-colors text-sm"
                  >
                    Voir le module <ArrowRight size={15} />
                  </Link>
                  <Link
                    href={`/cours/${modernAppleFirstCourse.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#9AA2B4] font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
                  >
                    {modernAppleFirstCourse.title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── MODULES ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Modules de formation</h2>
              <p className="text-sm text-[#5A6478]">{STATS.totalModules} modules du niveau débutant à expert</p>
            </div>
            <Link
              href="/modules"
              className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium shrink-0"
            >
              Voir tous <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS CTA ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl border border-indigo-500/15 bg-gradient-to-br from-indigo-950/60 via-[#0D1117] to-[#0D1117] p-8 sm:p-10 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="text-yellow-400" size={20} />
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Certifications</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Préparez {STATS.certifications} certifications professionnelles
                </h2>
                <p className="text-sm text-[#9AA2B4] max-w-lg">
                  Apple · Jamf 100–400 · Jamf School 140/240 · Microsoft MD-102 · MS-102 · SC-300
                </p>
              </div>
              <Link
                href="/certifications"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/12 text-white font-semibold hover:bg-white/12 transition-colors text-sm"
              >
                Voir les certifications <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Commencer par ici</h2>
              <p className="text-sm text-[#5A6478]">Les cours essentiels pour démarrer votre parcours</p>
            </div>
            <Link
              href="/parcours"
              className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium shrink-0"
            >
              Voir le parcours complet <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((course) => (
              <Link
                key={course.id}
                href={`/cours/${course.slug}`}
                className="group flex flex-col rounded-2xl border border-white/7 bg-[#0D1117] p-5 hover:border-indigo-500/25 hover:bg-[#131720] transition-all card-hover"
              >
                <div className="text-[10px] text-indigo-400 font-medium mb-2 uppercase tracking-wider">{course.moduleTitle}</div>
                <h3 className="font-semibold text-[#F1F3F9] group-hover:text-white text-sm mb-2 leading-snug transition-colors">{course.title}</h3>
                <p className="text-xs text-[#5A6478] line-clamp-2 mb-4 leading-relaxed flex-1">{course.description}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-[#3A4156]">
                  <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                  <span className="text-indigo-400 group-hover:text-indigo-300 flex items-center gap-0.5 font-medium transition-colors">
                    Démarrer <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES CTA ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-violet-500/15 bg-gradient-to-br from-violet-950/40 via-[#0D1117] to-[#0D1117] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="text-violet-400" size={18} />
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Bibliothèque</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Scripts, Profils & Templates prêts à l&apos;emploi
                </h2>
                <p className="text-sm text-[#9AA2B4] max-w-lg">
                  Scripts Bash, Configuration Profiles XML, politiques Intune JSON, checklists de déploiement Android Enterprise.
                </p>
              </div>
              <Link
                href="/ressources"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 font-semibold hover:bg-violet-600/30 transition-colors text-sm"
              >
                Accéder aux ressources <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
