import Link from 'next/link';
import { MODULES, STATS } from '@/lib/courses';
import { GraduationCap, Shield, BookOpen, Trophy, Heart } from 'lucide-react';

const CERT_LINKS = [
  { label: 'Apple Device Support', href: '/certifications#apple-device-support' },
  { label: 'Apple Deployment & Mgmt', href: '/certifications#apple-deployment' },
  { label: 'Jamf 100', href: '/certifications#jamf-100' },
  { label: 'Jamf 200', href: '/certifications#jamf-200' },
  { label: 'Microsoft MD-102', href: '/certifications#md-102' },
  { label: 'Microsoft MS-102', href: '/certifications#ms-102' },
];

const QUICK_LINKS = [
  { label: 'Parcours de formation', href: '/parcours' },
  { label: 'Tous les modules', href: '/modules' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Bibliothèque de ressources', href: '/ressources' },
  { label: 'Tableau de bord', href: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/6 bg-[#080B12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/25">
                <span className="text-[10px] font-black text-white">MDM</span>
              </div>
              <span className="font-bold text-white text-sm">Academy</span>
            </Link>
            <p className="text-xs text-[#5A6478] leading-relaxed mb-5">
              Plateforme de formation professionnelle Apple Enterprise, Jamf, Microsoft Intune et Android Enterprise.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#3A4156]">
              <span className="flex items-center gap-1"><BookOpen size={10} />{STATS.totalModules} modules</span>
              <span className="flex items-center gap-1"><GraduationCap size={10} />{STATS.totalCourses} cours</span>
              <span className="flex items-center gap-1"><Trophy size={10} />{STATS.certifications} certifs</span>
            </div>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA2B4] uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Shield size={11} />
              Modules
            </h3>
            <ul className="space-y-2">
              {MODULES.slice(0, 6).map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/modules/${m.slug}`}
                    className="flex items-center gap-1.5 text-xs text-[#5A6478] hover:text-[#9AA2B4] transition-colors group"
                  >
                    <span className="opacity-60">{m.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{m.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA2B4] uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Trophy size={11} />
              Certifications
            </h3>
            <ul className="space-y-2">
              {CERT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#5A6478] hover:text-[#9AA2B4] transition-colors block hover:translate-x-0.5 transform"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold text-[#9AA2B4] uppercase tracking-widest mb-4">
              Plateforme
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#5A6478] hover:text-[#9AA2B4] transition-colors block hover:translate-x-0.5 transform"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3A4156]">
            © 2025–2026 MDM Academy — Ressources pédagogiques professionnelles
          </p>
          <p className="text-xs text-[#3A4156] flex items-center gap-1">
            Construit avec <Heart size={10} className="text-rose-600/60" /> pour les équipes IT Apple
          </p>
        </div>
      </div>
    </footer>
  );
}
