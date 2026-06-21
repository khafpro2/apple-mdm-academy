import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Trophy, Clock, BookOpen, ExternalLink, Star, Award } from 'lucide-react';
import { MODULES, getAllCourses } from '@/lib/courses';

export const metadata = {
  title: 'Certifications professionnelles — Apple, Jamf & Microsoft',
  description:
    'Préparez les certifications Apple, Jamf Pro (100, 200, 300, 400) et Microsoft avec des cours structurés, quiz et labs pratiques.',
};

// ─── Certifications Jamf Pro (catalogue officiel 2024) ────────────────────────

const JAMF_COURSES = [
  {
    number: '100',
    title: 'Jamf 100 Course',
    badge: 'Jamf Certified Associate — Jamf Pro',
    badgeImage: '/images/certifications/jamf/jamf-100.svg',
    level: 'Débutant',
    format: 'Self-paced en ligne',
    duration: '6–8 heures',
    description:
      'Introduction aux fondamentaux de Jamf Pro et aux plateformes Apple. Couvre l\'enrôlement d\'appareils, la gestion de base des Mac et iPhone/iPad, et les concepts Zero-Touch.',
    topics: ['Jamf Pro UI & navigation', 'Enrôlement macOS & iOS', 'Configuration Profiles', 'Smart Groups & Policies', 'Self Service', 'Apps & Books'],
    prereqs: 'Aucun prérequis',
    certName: 'Jamf Certified Associate — Jamf Pro',
    officialUrl: 'https://www.jamf.com/training/100-course/',
    prepUrl: '/cours/certification-jamf-100',
    color: {
      border: 'border-violet-500/30',
      bg: 'bg-violet-950/20',
      badge: 'bg-violet-500/10 text-violet-400',
      accent: 'text-violet-400',
      btn: 'bg-violet-600/20 hover:bg-violet-600/30 border-violet-500/30 text-violet-300',
      btnExt: 'bg-violet-600 hover:bg-violet-700 text-white',
      glow: 'shadow-violet-500/10',
      number: 'text-violet-400',
      dot: 'bg-violet-400',
    },
  },
  {
    number: '200',
    title: 'Jamf 200 Course',
    badge: 'Jamf Certified Tech — Jamf Pro',
    badgeImage: '/images/certifications/jamf/jamf-200.svg',
    level: 'Intermédiaire',
    format: '4 jours présentiel / virtuel',
    duration: '32 heures',
    description:
      'Formation complète sur Jamf Pro en entreprise : déploiement macOS/iOS, gestion avancée des profils, sécurité, packaging et scripting Bash. Inclut l\'examen de certification.',
    topics: ['Enrôlement ADE avancé', 'Packaging & déploiement', 'Scripting Bash', 'Sécurité macOS', 'Patch Management', 'Jamf Pro API'],
    prereqs: 'Jamf 100 recommandé',
    certName: 'Jamf Certified Tech — Jamf Pro',
    officialUrl: 'https://www.jamf.com/training/200-course/',
    prepUrl: '/cours/certification-jamf-200',
    color: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-950/20',
      badge: 'bg-blue-500/10 text-blue-400',
      accent: 'text-blue-400',
      btn: 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30 text-blue-300',
      btnExt: 'bg-blue-600 hover:bg-blue-700 text-white',
      glow: 'shadow-blue-500/10',
      number: 'text-blue-400',
      dot: 'bg-blue-400',
    },
  },
  {
    number: '300',
    title: 'Jamf 300 Course',
    badge: 'Jamf Certified Admin — Jamf Pro',
    badgeImage: '/images/certifications/jamf/jamf-300.svg',
    level: 'Avancé',
    format: '4 jours présentiel / virtuel',
    duration: '32 heures',
    description:
      'Niveau expert en administration Jamf Pro : scripting avancé (zsh), API Jamf Pro v2, workflows automatisés, extension attributes, reporting avancé et gestion multi-site.',
    topics: ['API Jamf Pro v2', 'Scripting avancé (zsh)', 'Extension Attributes', 'Smart Groups dynamiques', 'Workflows Zero-Touch', 'LDAP & identité'],
    prereqs: 'Jamf Certified Tech (200)',
    certName: 'Jamf Certified Admin — Jamf Pro',
    officialUrl: 'https://www.jamf.com/training/300-course/',
    prepUrl: '/cours/certification-jamf-170',
    color: {
      border: 'border-green-500/30',
      bg: 'bg-green-950/20',
      badge: 'bg-green-500/10 text-green-400',
      accent: 'text-green-400',
      btn: 'bg-green-600/20 hover:bg-green-600/30 border-green-500/30 text-green-300',
      btnExt: 'bg-green-600 hover:bg-green-700 text-white',
      glow: 'shadow-green-500/10',
      number: 'text-green-400',
      dot: 'bg-green-400',
    },
  },
  {
    number: '400',
    title: 'Jamf 400 Course',
    badge: 'Jamf Certified Expert — Jamf Pro',
    badgeImage: '/images/certifications/jamf/jamf-400.svg',
    level: 'Expert',
    format: '4 jours — challenge-based',
    duration: '32 heures',
    description:
      'Formation challenge-based graduate-level : installation Jamf Pro, MySQL/API avancé, scripting complexe, LDAP, préférences et packaging expert. Examen challenge-based inclus.',
    topics: ['Installation Jamf Pro', 'MySQL & reporting', 'API avancée', 'Scripting complexe', 'LDAP avancé', 'Challenge-based exam'],
    prereqs: 'Jamf Certified Admin (300)',
    certName: 'Jamf Certified Expert — Jamf Pro',
    officialUrl: 'https://www.jamf.com/training/400-course/',
    prepUrl: '/cours/certification-jamf-200',
    color: {
      border: 'border-orange-500/30',
      bg: 'bg-orange-950/20',
      badge: 'bg-orange-500/10 text-orange-400',
      accent: 'text-orange-400',
      btn: 'bg-orange-600/20 hover:bg-orange-600/30 border-orange-500/30 text-orange-300',
      btnExt: 'bg-orange-600 hover:bg-orange-700 text-white',
      glow: 'shadow-orange-500/10',
      number: 'text-orange-400',
      dot: 'bg-orange-400',
    },
  },
];

// ─── Autres certifications ─────────────────────────────────────────────────────

const OTHER_CERTS = [
  {
    id: 'Apple Device Support',
    provider: 'Apple',
    emoji: '🍎',
    color: 'border-gray-600/30 bg-gray-900/30',
    badge: 'bg-gray-500/10 text-gray-400',
    description: 'Valide les compétences de support et dépannage des appareils Apple pour les professionnels IT.',
    url: '/cours/certification-apple-device-support',
    officialUrl: 'https://www.apple.com/education/k12/it/training/',
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
    officialUrl: 'https://www.apple.com/education/k12/it/training/',
    level: 'Avancé',
  },
  {
    id: 'Microsoft MD-102',
    provider: 'Microsoft',
    emoji: '🪟',
    color: 'border-cyan-600/30 bg-cyan-950/20',
    badge: 'bg-cyan-500/10 text-cyan-400',
    description: 'Microsoft 365 Certified: Endpoint Administrator Associate — gestion des endpoints avec Intune.',
    url: '/cours/certification-md-102',
    officialUrl: 'https://learn.microsoft.com/certifications/endpoint-administrator/',
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
    officialUrl: 'https://learn.microsoft.com/certifications/microsoft-365-enterprise-adminstrator/',
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
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">Certifications</span>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <Trophy className="text-yellow-400" size={22} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Certifications professionnelles
          </h1>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Préparez les certifications officielles Apple, Jamf Pro et Microsoft reconnues dans l&apos;industrie.
          Chaque parcours de formation est aligné sur le contenu officiel des examens.
        </p>
        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><Award size={13} className="text-yellow-400" />9 certifications couvertes</span>
          <span className="flex items-center gap-1.5"><Star size={13} className="text-violet-400" />4 niveaux Jamf Pro officiels</span>
          <span className="flex items-center gap-1.5"><BookOpen size={13} className="text-blue-400" />Badges Credly officiels</span>
        </div>
      </div>

      {/* ── Section Jamf Pro ─────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-lg font-bold text-white">Jamf Pro — Parcours certifiant officiel</h2>
          <Link
            href="https://trainingcatalog.jamf.com/page/fr-fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={12} />
            Jamf Training Catalog
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-7">
          Progression officielle Jamf — du niveau associé à l&apos;expert, avec badges numériques Credly.
        </p>

        {/* Progression flow — desktop */}
        <div className="hidden lg:flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {JAMF_COURSES.map((course, i) => (
            <div key={course.number} className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${course.color.border} ${course.color.bg} ${course.color.number}`}>
                <span>Jamf {course.number}</span>
                <span className="text-gray-500 font-normal">→ {course.certName.split(' — ')[0].replace('Jamf Certified ', '')}</span>
              </div>
              {i < JAMF_COURSES.length - 1 && (
                <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Cards Jamf */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {JAMF_COURSES.map((course) => {
            const relatedCourses = allCourses.filter((c) =>
              c.certificationRelated.some((cr) => cr.includes(`Jamf ${course.number}`))
            );
            return (
              <div
                key={course.number}
                className={`flex flex-col rounded-2xl border p-5 transition-all hover:shadow-lg ${course.color.border} ${course.color.bg} ${course.color.glow}`}
              >
                {/* Badge + niveau */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${course.color.badge}`}>
                    Jamf {course.number}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[course.level]}`}>
                    {course.level}
                  </span>
                </div>

                {/* Badge image + titre */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border ${course.color.border} bg-black/20 p-1`}>
                    <Image
                      src={course.badgeImage}
                      alt={`Badge ${course.title}`}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{course.title}</h3>
                    <p className={`text-xs mt-0.5 ${course.color.accent}`}>{course.badge.split('Jamf Certified ')[1] || course.badge}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
                  {course.description}
                </p>

                {/* Topics */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2 font-medium uppercase tracking-wider">Sujets couverts</p>
                  <ul className="space-y-1">
                    {course.topics.slice(0, 4).map((topic) => (
                      <li key={topic} className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${course.color.dot}`} />
                        {topic}
                      </li>
                    ))}
                    {course.topics.length > 4 && (
                      <li className="text-xs text-gray-600">+{course.topics.length - 4} autres...</li>
                    )}
                  </ul>
                </div>

                {/* Méta */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-white/5">
                  <span className="flex items-center gap-1"><Clock size={10} />{course.duration}</span>
                  <span className="text-gray-700">·</span>
                  <span>{course.format}</span>
                </div>

                {/* Prérequis */}
                <div className="mb-4">
                  <span className="text-xs text-gray-600">Prérequis : </span>
                  <span className="text-xs text-gray-400">{course.prereqs}</span>
                </div>

                {/* Cours liés */}
                {relatedCourses.length > 0 && (
                  <p className="text-xs text-gray-600 mb-4">
                    {relatedCourses.length} cours préparatoires disponibles
                  </p>
                )}

                {/* Boutons */}
                <div className="space-y-2 mt-auto">
                  <Link
                    href={course.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${course.color.btnExt}`}
                  >
                    <ExternalLink size={12} />
                    Voir la formation officielle
                  </Link>
                  <Link
                    href={course.prepUrl}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl border text-xs transition-colors ${course.color.btn}`}
                  >
                    <span>Cours de préparation</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Autres certifications ─────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-white mb-2">Apple & Microsoft</h2>
        <p className="text-sm text-gray-500 mb-6">
          Certifications complémentaires pour compléter votre profil professionnel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OTHER_CERTS.map((cert) => {
            const relatedCourses = allCourses.filter((c) => c.certificationRelated.includes(cert.id));
            return (
              <div
                key={cert.id}
                className={`flex flex-col rounded-xl border p-5 transition-all hover:border-white/15 ${cert.color}`}
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
                <h3 className="font-semibold text-white text-sm mb-2 leading-tight">{cert.id}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{cert.description}</p>
                <div className="space-y-2 mt-auto">
                  <Link
                    href={cert.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={11} />
                    Voir la certification officielle
                  </Link>
                  <Link
                    href={cert.url}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-white/8 bg-white/3 text-xs text-gray-500 hover:text-white hover:border-white/15 transition-colors"
                  >
                    <span>{relatedCourses.length} cours préparatoires</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Cours de préparation Module 9 ────────────────────────────────── */}
      {certModule && (
        <section>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-lg font-bold text-white">Guides de révision & examens blancs</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Module {certModule.order} — Guides de préparation avec questions d&apos;entraînement pour chaque certification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
