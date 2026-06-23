import Link from 'next/link';
import { BookOpen, GraduationCap, Trophy, Shield, Terminal } from 'lucide-react';

const FOOTER_NAV = [
  {
    title: 'Formation',
    links: [
      { label: 'Parcours de formation', href: '/parcours' },
      { label: 'Tous les modules',      href: '/modules' },
      { label: 'Labs pratiques',        href: '/labs' },
      { label: 'Ressources',            href: '/ressources' },
    ],
  },
  {
    title: 'Certifications',
    links: [
      { label: 'Jamf 100 Course',         href: '/certifications' },
      { label: 'Jamf 200 Course',         href: '/certifications' },
      { label: 'Apple Deployment & Mgmt', href: '/certifications' },
      { label: 'Microsoft MD-102',        href: '/certifications' },
    ],
  },
  {
    title: 'Technologies',
    links: [
      { label: 'Apple Business Manager', href: '/parcours' },
      { label: 'Jamf Pro',               href: '/parcours' },
      { label: 'Microsoft Intune',       href: '/parcours' },
      { label: 'Android Enterprise',     href: '/parcours' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#080B12] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700">
                <span className="text-xs font-black text-white tracking-tighter">MDM</span>
              </div>
              <span className="text-sm font-bold text-white">Academy</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-[220px]">
              Plateforme de formation professionnelle Apple Enterprise, Jamf, Microsoft Intune et Android Enterprise.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-gray-600">
              {[
                { icon: GraduationCap, text: 'Formation structurée' },
                { icon: Trophy,        text: '7 certifications' },
                { icon: Terminal,      text: 'Labs pratiques' },
                { icon: Shield,        text: 'Contenu à jour' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1">
                  <Icon size={10} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                {section.title}
              </p>
              <ul className="space-y-2.5">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-gray-500 hover:text-gray-200 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-600">
          <p>
            © {new Date().getFullYear()} MDM Academy · Plateforme de formation professionnelle
          </p>
          <div className="flex items-center gap-1.5">
            <BookOpen size={10} />
            <span>Apple · Jamf · Microsoft Intune · Android Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
