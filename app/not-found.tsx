import Link from 'next/link';
import { Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-white/5 mb-4 select-none">404</div>
        <div className="text-4xl mb-4">🔍</div>
        <h1 className="text-xl font-bold text-white mb-3">Page introuvable</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
          Retournez au parcours pour continuer votre formation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors text-sm"
          >
            <Home size={15} />
            Accueil
          </Link>
          <Link
            href="/parcours"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-sm font-medium"
          >
            <BookOpen size={15} />
            Voir le parcours
          </Link>
        </div>
      </div>
    </div>
  );
}
