import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Clock, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { MODULES, getModuleBySlug } from '@/lib/courses';
import CourseCard from '@/components/cours/CourseCard';
import { LevelBadge } from '@/components/ui/Badges';

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  return mod
    ? { title: `${mod.title} — MDM Academy`, description: mod.description }
    : { title: 'Module introuvable' };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const levels = [...new Set(mod.courses.map((c) => c.level))];
  const totalMins = mod.courses.reduce((sum, c) => {
    const m = c.duration.match(/(\d+)h\s*(\d+)?|(\d+)\s*min/);
    if (!m) return sum;
    if (m[3]) return sum + parseInt(m[3]);
    return sum + parseInt(m[1] || '0') * 60 + parseInt(m[2] || '0');
  }, 0);

  const prevMod = MODULES[mod.order - 2];
  const nextMod = MODULES[mod.order];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-600 mb-8 flex-wrap" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={11} />
        <Link href="/modules" className="hover:text-gray-300 transition-colors">Modules</Link>
        <ChevronRight size={11} />
        <span className="text-gray-300 truncate">{mod.title}</span>
      </nav>

      {/* Module header */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/6 border border-white/10 text-3xl shrink-0">
            {mod.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-1">
              Module {String(mod.order).padStart(2, '0')}
            </p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
              {mod.title}
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-5">
          {mod.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-5 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={13} />
            {mod.courses.length} cours
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            ~{Math.floor(totalMins / 60)}h{totalMins % 60 > 0 ? ` ${totalMins % 60}min` : ''}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {levels.map((l) => <LevelBadge key={l} level={l} />)}
          </div>
        </div>
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mod.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Module navigation */}
      <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {prevMod ? (
          <Link
            href={`/modules/${prevMod.slug}`}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] text-sm text-gray-400 hover:text-white hover:border-white/15 hover:bg-white/[0.04] transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left min-w-0">
              <p className="text-[10px] text-gray-600 mb-0.5">Module précédent</p>
              <p className="font-medium text-gray-300 group-hover:text-white truncate">{prevMod.title}</p>
            </div>
          </Link>
        ) : <div />}

        {nextMod ? (
          <Link
            href={`/modules/${nextMod.slug}`}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] text-sm text-gray-400 hover:text-white hover:border-white/15 hover:bg-white/[0.04] transition-all group sm:ml-auto"
          >
            <div className="text-right min-w-0">
              <p className="text-[10px] text-gray-600 mb-0.5">Module suivant</p>
              <p className="font-medium text-gray-300 group-hover:text-white truncate">{nextMod.title}</p>
            </div>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
