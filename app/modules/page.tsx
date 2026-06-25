import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MODULES, getAllCourses, STATS } from '@/lib/courses';
import ModuleCard from '@/components/cours/ModuleCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modules de formation — MDM Academy',
  description: `Parcourez les ${STATS.totalModules} modules de formation Apple, Jamf et Microsoft Intune — du débutant à l'expert.`,
};

export default function ModulesPage() {
  const allCourses = getAllCourses();
  const totalModules = MODULES.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-600 mb-8" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={11} />
        <span className="text-gray-300">Modules</span>
      </nav>

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Modules de formation
        </h1>
        <p className="text-sm text-gray-400">
          {totalModules} modules progressifs · {allCourses.length} cours · du fondamental à l&apos;expert
        </p>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>

      {/* CTA bottom */}
      <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-300">Prêt à commencer ?</p>
          <p className="text-xs text-gray-500">Démarrez par le Module 1 — aucun prérequis nécessaire.</p>
        </div>
        <Link
          href="/parcours"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors"
        >
          Voir le parcours complet
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
