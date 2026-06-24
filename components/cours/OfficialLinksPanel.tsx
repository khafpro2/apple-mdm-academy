import { ExternalLink, BookOpen } from 'lucide-react';
import type { OfficialLink } from '@/lib/official-links';
import { JAMF_PRO_DOC_NOTE } from '@/lib/official-links';

interface OfficialLinksPanelProps {
  links: OfficialLink[];
  showJamfNote?: boolean;
}

export default function OfficialLinksPanel({ links, showJamfNote }: OfficialLinksPanelProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={13} className="text-blue-400" />
        <h3 className="text-[10px] font-semibold text-blue-400/80 uppercase tracking-widest">
          Sources officielles
        </h3>
      </div>
      {showJamfNote && (
        <p className="text-[11px] text-blue-300/70 mb-3 leading-relaxed">
          {JAMF_PRO_DOC_NOTE}
        </p>
      )}
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 text-xs text-blue-300/80 hover:text-blue-200 transition-colors"
            >
              <ExternalLink size={12} className="shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
              <span className="leading-snug">
                <span className="font-medium">{link.title}</span>
                {link.description && (
                  <span className="block text-[10px] text-blue-400/50 mt-0.5">{link.description}</span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
