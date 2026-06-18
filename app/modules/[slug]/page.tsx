import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';
import { MODULES, getModuleBySlug } from '@/lib/courses';
import CourseCard from '@/components/cours/CourseCard';
import { LevelBadge } from '@/components/ui/Badges';

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  return mod ? { title: mod.title } : { title: 'Module introuvable' };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const levels = [...new Set(mod.courses.map((c) => c.level))];
  const totalDuration = mod.courses.reduce((sum, c) => {
    const match = c.duration.match(/(\d+)h?\s*(\d+)?/);
    if (!match) return sum;
    const hours = parseInt(match[1]) || 0;
    const mins = parseInt(match[2]) || 0;
    return sum + hours * 60 + mins;
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-gray-300">Accueil</Link>
        <ChevronRight size={12} />
        <Link href="/modules" className="hover:text-gray-300">Modules</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">{mod.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <p className="text-xs text-gray-600 font-mono mb-1">Module {String(mod.order).padStart(2, '0')}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{mod.title}</h1>
          </div>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-6">{mod.description}</p>
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <BookOpen size={15} />
            <span>{mod.courses.length} cours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={15} />
            <span>~{Math.floor(totalDuration / 60)}h{totalDuration % 60 > 0 ? ` ${totalDuration % 60}min` : ''}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {levels.map((l) => <LevelBadge key={l} level={l} />)}
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mod.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Navigation between modules */}
      <div className="mt-12 flex justify-between gap-4">
        {MODULES[mod.order - 2] && (
          <Link
            href={`/modules/${MODULES[mod.order - 2].slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/8 bg-[#161920] text-sm text-gray-400 hover:text-white hover:border-white/15 transition-colors"
          >
            ← Module précédent
          </Link>
        )}
        <div className="flex-1" />
        {MODULES[mod.order] && (
          <Link
            href={`/modules/${MODULES[mod.order].slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/8 bg-[#161920] text-sm text-gray-400 hover:text-white hover:border-white/15 transition-colors"
          >
            Module suivant →
          </Link>
        )}
      </div>
    </div>
  );
}
