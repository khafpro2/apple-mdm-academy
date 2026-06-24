import { ExternalLink, GraduationCap } from 'lucide-react';
import { getAllOfficialSources, type OfficialSourceEntry } from '@/lib/official-links';

const PUBLISHER_STYLES: Record<
  OfficialSourceEntry['publisher'],
  { border: string; badge: string; accent: string }
> = {
  Apple: {
    border: 'border-gray-500/15 hover:border-gray-400/30',
    badge: 'border-gray-500/25 bg-gray-500/10 text-gray-400',
    accent: 'group-hover:text-gray-300',
  },
  Jamf: {
    border: 'border-emerald-500/15 hover:border-emerald-500/30',
    badge: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400',
    accent: 'group-hover:text-emerald-300',
  },
  Microsoft: {
    border: 'border-cyan-500/15 hover:border-cyan-500/30',
    badge: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-400',
    accent: 'group-hover:text-cyan-300',
  },
};

const TYPE_LABELS: Record<string, string> = {
  documentation: 'Documentation',
  guide: 'Formation',
  certification: 'Certification',
  tool: 'Outil',
};

const PUBLISHER_ORDER: OfficialSourceEntry['publisher'][] = ['Apple', 'Jamf', 'Microsoft'];

export default function OfficialSourcesSection() {
  const sources = getAllOfficialSources();

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={16} className="text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Sources officielles</h2>
      </div>
      <p className="text-sm text-[#5A6478] mb-6 max-w-3xl">
        Références Apple, Jamf et Microsoft Endpoint Management. MDM Academy résume et oriente
        vers ces sources — sans republier la documentation officielle.
      </p>

      {PUBLISHER_ORDER.map((publisher) => {
        const group = sources.filter((s) => s.publisher === publisher);
        if (group.length === 0) return null;

        return (
          <div key={publisher} className="mb-8 last:mb-0">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {publisher}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.map((source) => {
                const style = PUBLISHER_STYLES[source.publisher];
                return (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group rounded-2xl border bg-gradient-to-br from-[#0D1117] to-white/[0.02] p-5 transition-all ${style.border}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${style.badge}`}
                      >
                        {TYPE_LABELS[source.type] ?? source.type}
                      </span>
                      <ExternalLink
                        size={14}
                        className={`text-gray-600 transition-colors shrink-0 ${style.accent}`}
                      />
                    </div>
                    <h4
                      className={`text-sm font-semibold text-[#F1F3F9] mb-1 transition-colors ${style.accent}`}
                    >
                      {source.title}
                    </h4>
                    <p className="text-xs text-[#5A6478] leading-relaxed mb-3">{source.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
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
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
