import Link from 'next/link';
import { ChevronRight, Trophy, Clock, BookOpen } from 'lucide-react';
import { MODULES, getAllCourses } from '@/lib/courses';

export const metadata = { title: 'Certifications professionnelles' };

const CERT_INFO = [
  {
    id: 'Apple Device Support',
    provider: 'Apple',
    emoji: '🍎',
    color: 'border-gray-600/30 bg-gray-900/30',
    badge: 'bg-gray-500/10 text-gray-400',
    description: 'Valide les compétences de support et dépannage des appareils Apple pour les professionnels IT.',
    url: '/cours/certification-apple-device-support',
    level: 'Intermédiaire',
  },
  {
    id: 'Apple Deployment and Management',
    provider: 'Apple',
    emoji: '🍎',
    color: 'border-gray-600/30 bg-gray-900/30',
    badge: 'bg-gray-500/10 text-gray-400',
    description: 'Certifie les compétences en déploiement, gestion MDM et Apple Business Manager.',
    url: '/cours/certification-apple-deployment',
    level: 'Avancé',
  },
  {
    id: 'Jamf 100',
    provider: 'Jamf',
    emoji: '🔵',
    color: 'border-blue-600/30 bg-blue-950/20',
    badge: 'bg-blue-500/10 text-blue-400',
    description: 'Jamf Certified Tech — certification fondamentale Jamf Pro pour les administrateurs débutants.',
    url: '/cours/certification-jamf-100',
    level: 'Débutant',
  },
  {
    id: 'Jamf 170',
    provider: 'Jamf',
    emoji: '🔵',
    color: 'border-blue-600/30 bg-blue-950/20',
    badge: 'bg-blue-500/10 text-blue-400',
    description: 'Jamf Certified Admin — maîtrise de l\'automatisation, scripting et API Jamf Pro.',
    url: '/cours/certification-jamf-170',
    level: 'Avancé',
  },
  {
    id: 'Jamf 200',
    provider: 'Jamf',
    emoji: '🔵',
    color: 'border-blue-600/30 bg-blue-950/20',
    badge: 'bg-blue-500/10 text-blue-400',
    description: 'Jamf Certified Expert — niveau expert : architecture, sécurité, Jamf Protect et Jamf Connect.',
    url: '/cours/certification-jamf-200',
    level: 'Expert',
  },
  {
    id: 'Microsoft MD-102',
    provider: 'Microsoft',
    emoji: '🪟',
    color: 'border-cyan-600/30 bg-cyan-950/20',
    badge: 'bg-cyan-500/10 text-cyan-400',
    description: 'Microsoft 365 Certified: Endpoint Administrator Associate — gestion des endpoints avec Intune.',
    url: '/cours/certification-md-102',
    level: 'Avancé',
  },
  {
    id: 'Microsoft MS-102',
    provider: 'Microsoft',
    emoji: '🪟',
    color: 'border-cyan-600/30 bg-cyan-950/20',
    badge: 'bg-cyan-500/10 text-cyan-400',
    description: 'Microsoft 365 Certified: Enterprise Administrator Expert — administration Microsoft 365.',
    url: '/cours/certification-ms-102',
    level: 'Expert',
  },
];

const LEVEL_COLORS: Record<string, string> = {
  'Débutant': 'bg-emerald-500/15 text-emerald-400',
  'Intermédiaire': 'bg-blue-500/15 text-blue-400',
  'Avancé': 'bg-amber-500/15 text-amber-400',
  'Expert': 'bg-red-500/15 text-red-400',
};

export default function CertificationsPage() {
  const certModule = MODULES.find((m) => m.id === 'module-9');
  const allCourses = getAllCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">Certifications</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-yellow-400" size={22} />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Certifications professionnelles</h1>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Préparez 7 certifications reconnues dans l&apos;industrie — Apple, Jamf et Microsoft.
          Chaque module de formation prépare à une ou plusieurs certifications spécifiques.
        </p>
      </div>

      {/* Certifications grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {CERT_INFO.map((cert) => {
          const relatedCourses = allCourses.filter((c) => c.certificationRelated.includes(cert.id));
          return (
            <div
              key={cert.id}
              className={`flex flex-col rounded-xl border p-5 transition-all ${cert.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cert.emoji}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cert.badge}`}>
                    {cert.provider}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[cert.level]}`}>
                  {cert.level}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{cert.id}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{cert.description}</p>
              <div className="space-y-3">
                <p className="text-xs text-gray-600">
                  {relatedCourses.length} cours préparatoires
                </p>
                <Link
                  href={cert.url}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-white/8 bg-white/3 text-xs text-gray-400 hover:text-white hover:border-white/15 transition-colors"
                >
                  <span>Voir le cours de préparation</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preparation courses from module 9 */}
      {certModule && (
        <section>
          <h2 className="text-lg font-bold text-white mb-2">Cours de préparation aux examens</h2>
          <p className="text-sm text-gray-500 mb-6">
            Module {certModule.order} — guides de révision et entraînements pour chaque certification
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certModule.courses.map((course) => (
              <Link
                key={course.id}
                href={`/cours/${course.slug}`}
                className="group flex flex-col p-4 rounded-xl border border-white/5 bg-[#161920] hover:border-yellow-500/30 hover:bg-[#1a1d28] transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={14} className="text-yellow-400" />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[course.level]}`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{course.description}</p>
                <div className="mt-auto flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessons.length} leçons</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
