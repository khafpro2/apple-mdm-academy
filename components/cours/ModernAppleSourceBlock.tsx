import { ExternalLink, Rocket } from 'lucide-react';
import type { ModernAppleSourceEntry } from '@/lib/official-links';
import { MODERN_APPLE_DOC_NOTE } from '@/lib/official-links';

interface ModernAppleSourceBlockProps {
  sources: ModernAppleSourceEntry[];
}

const TYPE_LABELS: Record<ModernAppleSourceEntry['type'], string> = {
  documentation: 'Documentation',
  guide: 'Livre blanc / Guide',
  video: 'Vidéo',
  certification: 'Certification',
  tool: 'Outil',
  community: 'Communauté',
};

const PUBLISHER_COLORS: Record<ModernAppleSourceEntry['publisher'], string> = {
  Apple: 'text-gray-400',
  Jamf: 'text-emerald-400',
  Microsoft: 'text-cyan-400',
};

export default function ModernAppleSourceBlock({ sources }: ModernAppleSourceBlockProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/8 to-indigo-500/5 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Rocket size={14} className="text-violet-400" />
        <h3 className="text-[10px] font-semibold text-violet-400/90 uppercase tracking-widest">
          Source officielle — Gestion Moderne Apple
        </h3>
      </div>
      <p className="text-[11px] text-violet-300/60 mb-3 leading-relaxed">
        {MODERN_APPLE_DOC_NOTE}
      </p>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-white/6 bg-[#0a0d14]/60 px-3 py-2.5 hover:border-violet-500/25 hover:bg-violet-500/5 transition-all"
            >
              <div className="flex items-start gap-2">
                <ExternalLink
                  size={12}
                  className={`shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 ${PUBLISHER_COLORS[source.publisher]}`}
                />
                <div className="min-w-0">
                  <span className="text-xs font-medium text-violet-100/90 group-hover:text-white transition-colors">
                    {source.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400/80">
                      {TYPE_LABELS[source.type]}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 ${PUBLISHER_COLORS[source.publisher]}`}>
                      {source.publisher}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                      {source.language}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{source.summary}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
