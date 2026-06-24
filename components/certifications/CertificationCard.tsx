import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';
import { getCertificationStyles, type Certification } from '@/lib/certifications';
import CertificationIcon from '@/components/certifications/CertificationIcon';

interface CertificationCardProps {
  cert: Certification;
  relatedCourseCount: number;
}

export default function CertificationCard({ cert, relatedCourseCount }: CertificationCardProps) {
  const styles = getCertificationStyles(cert.provider);

  return (
    <article
      id={cert.slug}
      className={`flex flex-col rounded-2xl border p-5 transition-all hover:border-white/15 scroll-mt-24 ${styles.color}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <CertificationIcon src={cert.iconSrc} size={32} className="h-8 w-8" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles.badge}`}>
              {cert.provider}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
              {cert.level}
            </span>
            {cert.examCode && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                {cert.examCode}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-100 leading-snug">{cert.id}</h3>
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-3">{cert.description}</p>

      {cert.prerequisites && cert.prerequisites.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Prérequis
          </p>
          <ul className="space-y-1">
            {cert.prerequisites.map((req) => (
              <li key={req} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                <span className="text-gray-600 mt-0.5">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cert.officialResources && cert.officialResources.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Ressources officielles
          </p>
          <ul className="space-y-1">
            {cert.officialResources.map((res) => (
              <li key={res.url}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400/80 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={10} />
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
        <a
          href={cert.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] text-gray-300 hover:text-white hover:border-white/20 transition-all"
        >
          <ExternalLink size={11} />
          Site officiel
        </a>
        {cert.prepCourseUrl && (
          <Link
            href={cert.prepCourseUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 border border-indigo-500/40 text-[11px] text-white hover:bg-indigo-600 transition-all"
          >
            <BookOpen size={11} />
            Préparation MDM Academy
          </Link>
        )}
        {relatedCourseCount > 0 && (
          <span className="text-[10px] text-gray-600 ml-auto">
            {relatedCourseCount} cours lié{relatedCourseCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </article>
  );
}
