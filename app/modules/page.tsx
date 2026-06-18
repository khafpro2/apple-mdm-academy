import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MODULES } from '@/lib/courses';
import ModuleCard from '@/components/cours/ModuleCard';

export const metadata = { title: 'Modules de formation' };

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">Modules</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Modules de formation</h1>
      <p className="text-sm text-gray-400 mb-10">
        {MODULES.length} modules progressifs — du fondamental à l&apos;expert
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}
