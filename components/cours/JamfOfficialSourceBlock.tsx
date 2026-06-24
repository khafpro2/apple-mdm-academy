import { ExternalLink, GraduationCap } from 'lucide-react';
import type { JamfOfficialSourceEntry } from '@/lib/official-links';
import { JAMF_PRO_DOC_NOTE } from '@/lib/official-links';

interface JamfOfficialSourceBlockProps {
  sources: JamfOfficialSourceEntry[];
}

const TYPE_LABELS: Record<JamfOfficialSourceEntry['type'], string> = {
  documentation: 'Documentation',
  guide: 'Formation',
  video: 'Vidéo',
  certification: 'Certification',
  tool: 'Outil',
  community: 'Communauté',
};

export default function JamfOfficialSourceBlock({ sources }: JamfOfficialSourceBlockProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 to-blue-500/5 p-4">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap size={14} className="text-emerald-400" />
        <h3 className="text-[10px] font-semibold text-emerald-400/90 uppercase tracking-widest">
          Source officielle Jamf
        </h3>
      </div>
      <p className="text-[11px] text-emerald-300/60 mb-3 leading-relaxed">
        {JAMF_PRO_DOC_NOTE} — MDM Academy résume ; consultez les sources ci-dessous pour le détail.
      </p>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-white/6 bg-[#0a0d14]/60 px-3 py-2.5 hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all"
            >
              <div className="flex items-start gap-2">
                <ExternalLink
                  size={12}
                  className="shrink-0 mt-0.5 text-emerald-400/50 group-hover:text-emerald-400 transition-colors"
                />
                <div className="min-w-0">
                  <span className="text-xs font-medium text-emerald-100/90 group-hover:text-white transition-colors">
                    {source.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400/80">
                      {TYPE_LABELS[source.type]}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                      {source.category}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                      {source.language}
                    </span>
                    {source.version && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                        v{source.version}
                      </span>
                    )}
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
