import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { getLabById, ALL_LABS } from '@/lib/labs';
import TerminalLabWrapper from './TerminalLabWrapper';

export async function generateStaticParams() {
  return ALL_LABS.map(lab => ({ id: lab.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lab = getLabById(id);
  if (!lab) return {};
  return {
    title: `${lab.title} — Labs MDM Academy`,
    description: lab.description,
  };
}

export default async function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lab = getLabById(id);
  if (!lab) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A6478] mb-8 flex-wrap">
        <Link href="/" className="hover:text-gray-400">Accueil</Link>
        <ChevronRight size={11} />
        <Link href="/labs" className="hover:text-gray-400">Labs pratiques</Link>
        <ChevronRight size={11} />
        <span className="text-gray-400 truncate max-w-[200px]">{lab.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{lab.title}</h1>
        <p className="text-sm text-[#9AA2B4] leading-relaxed mb-4">{lab.description}</p>
        <div className="flex flex-wrap gap-3">
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            Niveau : {lab.level}
          </span>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            +{lab.xpReward} XP
          </span>
        </div>
      </div>

      {/* Terminal interactif */}
      <TerminalLabWrapper lab={lab} />

      {/* Lien vers le cours */}
      <div className="mt-6 p-4 rounded-xl border border-white/8 bg-white/2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-indigo-400" />
            <span className="text-xs text-[#9AA2B4]">Cours associé à ce lab</span>
          </div>
          <Link
            href={`/cours/${lab.courseSlug}`}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            Voir le cours
            <ChevronRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
