import { ExternalLink, GraduationCap } from 'lucide-react';
import { getJamfOfficialSources } from '@/lib/official-links';

const TYPE_LABELS: Record<string, string> = {
  documentation: 'Documentation officielle',
  guide: 'Portail formation',
  tool: 'Outil open source',
};

export default function JamfOfficialSourcesSection() {
  const sources = getJamfOfficialSources();

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={16} className="text-emerald-400" />
        <h2 className="text-lg font-semibold text-white">Sources officielles Jamf</h2>
      </div>
      <p className="text-sm text-[#5A6478] mb-5 max-w-3xl">
        Liens vers Jamf Learn, la documentation Jamf Pro, l&apos;API développeur et JamfSync.
        MDM Academy s&apos;appuie sur ces sources sans republier leur contenu.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-[#0D1117] to-emerald-500/5 p-5 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                {TYPE_LABELS[source.type] ?? source.type}
              </span>
              <ExternalLink
                size={14}
                className="text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0"
              />
            </div>
            <h3 className="text-sm font-semibold text-[#F1F3F9] mb-1 group-hover:text-white transition-colors">
              {source.title}
            </h3>
            <p className="text-xs text-[#5A6478] leading-relaxed mb-3">{source.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                {source.publisher}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                {source.category}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                {source.language}
              </span>
              {source.version && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                  v{source.version}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
