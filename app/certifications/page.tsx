import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight, Trophy, Clock, BookOpen, ExternalLink,
  Star, Award, CheckCircle2, ArrowRight, GraduationCap, Zap,
} from 'lucide-react';
import { MODULES, getAllCourses } from '@/lib/courses';

export const metadata = {
  title: 'Certifications professionnelles — Apple, Jamf Pro & Microsoft',
  description:
    'Préparez les certifications officielles Jamf Pro (100, 200, 300, 400), Apple et Microsoft avec des cours structurés, quiz et labs pratiques. Badges numériques Credly.',
};

// ─── Certifications Jamf Pro — données officielles jamf.com ────────────────────

const JAMF_COURSES = [
  {
    number: '100',
    title: 'Jamf 100 Course',
    badge: 'Jamf 100 Course',
    badgeShort: 'Jamf 100',
    badgeImage: '/images/certifications/jamf/jamf-100.png',
    level: 'Débutant',
    levelKey: 'beginner',
    format: 'Self-paced en ligne',
    duration: '6–8 heures',
    price: 'Gratuit',
    available: 'Disponible maintenant',
    description:
      'Introduction autonome et gratuite à Jamf Pro, macOS, iOS et tvOS. Couvre les fondamentaux de la gestion Apple en entreprise. Réussissez le cours et passez l\'examen pour obtenir votre badge numérique Credly.',
    topics: [
      'Architecture & fondamentaux Jamf Pro',
      'Enrôlement macOS & iOS/iPadOS/tvOS',
      'Configuration Profiles — structure & déploiement',
      'Smart Groups dynamiques & ciblage',
      'Policies, Self Service & Apps & Books (VPP)',
      'Apple Business Manager (ABM) & ADE',
    ],
    prereqs: 'Aucun prérequis — accessible à tous',
    certName: 'Jamf 100 Course',
    officialUrl: 'https://www.jamf.com/fr/formation/formation-100/',
    catalogUrl: 'https://learn.jamf.com/en-US/bundle/jamf-100-course-current/page/Welcome.html',
    prepUrl: '/cours/certification-jamf-100',
    examUrl: 'https://training.jamf.com/jamf-certified-associate-exam-english-en',
    credly: true,
    color: {
      border: 'border-violet-500/30',
      bg: 'bg-violet-950/20',
      badge: 'bg-violet-500/15 text-violet-300',
      accent: 'text-violet-400',
      btn: 'bg-violet-600/15 hover:bg-violet-600/30 border-violet-500/30 text-violet-300',
      btnExt: 'bg-violet-600 hover:bg-violet-500 text-white',
      glow: 'hover:shadow-xl hover:shadow-violet-500/15',
      number: 'text-violet-400',
      dot: 'bg-violet-400',
      ring: 'ring-violet-500/30',
      levelColor: 'bg-emerald-500/15 text-emerald-400',
      badgeRing: 'border-violet-500/40',
      priceBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    },
  },
  {
    number: '200',
    title: 'Jamf 200 Course',
    badge: 'Jamf 200 Course',
    badgeShort: 'Jamf 200',
    badgeImage: '/images/certifications/jamf/jamf-200.png',
    level: 'Intermédiaire',
    levelKey: 'intermediate',
    format: '4 jours — virtuel ou présentiel',
    duration: '32 heures',
    price: 'Payant',
    available: 'Sessions planifiées',
    description:
      'Cours centré entreprise avec environnement pratique : administration avancée de Jamf Pro, scripting zsh, packaging, App Installers et gestion macOS/iOS en profondeur. 4 jours intensifs en virtuel ou présentiel.',
    topics: [
      'Administration avancée Jamf Pro',
      'Scripting zsh & automatisation Bash',
      'Packaging PKG, DMG & App Installers',
      'Profils de configuration & déclarations MDM',
      'ADE avancé & Enrollment Customization',
      'Patch Management & sécurité macOS',
    ],
    prereqs: 'Jamf 100 Course recommandé',
    certName: 'Jamf 200 Course',
    officialUrl: 'https://www.jamf.com/fr/formation/formation-200/',
    catalogUrl: 'https://account.jamf.com/training-courses/jamf-200-course/available',
    prepUrl: '/cours/certification-jamf-200',
    examUrl: 'https://training.jamf.com',
    credly: true,
    color: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-950/20',
      badge: 'bg-blue-500/15 text-blue-300',
      accent: 'text-blue-400',
      btn: 'bg-blue-600/15 hover:bg-blue-600/30 border-blue-500/30 text-blue-300',
      btnExt: 'bg-blue-600 hover:bg-blue-500 text-white',
      glow: 'hover:shadow-xl hover:shadow-blue-500/15',
      number: 'text-blue-400',
      dot: 'bg-blue-400',
      ring: 'ring-blue-500/30',
      levelColor: 'bg-blue-500/15 text-blue-400',
      badgeRing: 'border-blue-500/40',
      priceBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    },
  },
  {
    number: '300',
    title: 'Jamf 300 Course',
    badge: 'Jamf 300 Course',
    badgeShort: 'Jamf 300',
    badgeImage: '/images/certifications/jamf/jamf-300.png',
    level: 'Avancé',
    levelKey: 'advanced',
    format: '4 jours — virtuel ou présentiel',
    duration: '32 heures',
    price: 'Payant',
    available: 'Sessions planifiées',
    description:
      'Niveau avancé : API Jamf Pro v2, scripting avancé (zsh/Python), Extension Attributes, workflows Zero-Touch complexes et intégrations LDAP/SSO. Prochaine étape recommandée après le Jamf 200 Course.',
    topics: [
      'API Jamf Pro v2 REST & webhooks',
      'Scripting avancé zsh, Python & Bash',
      'Extension Attributes personnalisés',
      'Smart Groups dynamiques & critères avancés',
      'Workflows Zero-Touch avancés',
      'LDAP, identité & Single Sign-On',
    ],
    prereqs: 'Jamf 200 Course recommandé',
    certName: 'Jamf 300 Course',
    officialUrl: 'https://www.jamf.com/fr/formation/formation-300/',
    catalogUrl: 'https://account.jamf.com/training-courses/jamf-300-course/available',
    prepUrl: '/cours/certification-jamf-170',
    examUrl: 'https://training.jamf.com',
    credly: true,
    color: {
      border: 'border-green-500/30',
      bg: 'bg-green-950/20',
      badge: 'bg-green-500/15 text-green-300',
      accent: 'text-green-400',
      btn: 'bg-green-600/15 hover:bg-green-600/30 border-green-500/30 text-green-300',
      btnExt: 'bg-green-600 hover:bg-green-500 text-white',
      glow: 'hover:shadow-xl hover:shadow-green-500/15',
      number: 'text-green-400',
      dot: 'bg-green-400',
      ring: 'ring-green-500/30',
      levelColor: 'bg-amber-500/15 text-amber-400',
      badgeRing: 'border-green-500/40',
      priceBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    },
  },
  {
    number: '400',
    title: 'Jamf 400 Course',
    badge: 'Jamf 400 Course',
    badgeShort: 'Jamf 400',
    badgeImage: '/images/certifications/jamf/jamf-400.png',
    level: 'Expert',
    levelKey: 'expert',
    format: '4 jours — challenge-based',
    duration: '32 heures',
    price: 'Payant',
    available: 'Sessions planifiées',
    description:
      'Formation graduate-level challenge-based : installation et architecture Jamf Pro, MySQL, API complexe, scripting expert et packaging avancé. Examen challenge-based conçu pour les professionnels Jamf chevronnés.',
    topics: [
      'Installation & architecture Jamf Pro Server',
      'MySQL — administration & reporting avancé',
      'API Jamf Pro & intégrations tierces',
      'Scripting expert & automatisation avancée',
      'LDAP avancé & gestion d\'identité enterprise',
      'Challenge-based exam — scénarios réels',
    ],
    prereqs: 'Jamf 300 Course recommandé',
    certName: 'Jamf 400 Course',
    officialUrl: 'https://www.jamf.com/fr/formation/formation-400/',
    catalogUrl: 'https://account.jamf.com/training-courses/jamf-400-course/available',
    prepUrl: '/cours/certification-jamf-200',
    examUrl: 'https://training.jamf.com',
    credly: true,
    color: {
      border: 'border-orange-500/30',
      bg: 'bg-orange-950/20',
      badge: 'bg-orange-500/15 text-orange-300',
      accent: 'text-orange-400',
      btn: 'bg-orange-600/15 hover:bg-orange-600/30 border-orange-500/30 text-orange-300',
      btnExt: 'bg-orange-600 hover:bg-orange-500 text-white',
      glow: 'hover:shadow-xl hover:shadow-orange-500/15',
      number: 'text-orange-400',
      dot: 'bg-orange-400',
      ring: 'ring-orange-500/30',
      levelColor: 'bg-red-500/15 text-red-400',
      badgeRing: 'border-orange-500/40',
      priceBadge: 'bg-red-500/15 text-red-300 border-red-500/25',
    },
  },
] as const;

// ─── Certifications Apple & Microsoft ─────────────────────────────────────────

const OTHER_CERTS = [
  {
    id: 'apple-device-support',
    name: 'Apple Device Support',
    provider: 'Apple',
    badgeImage: '/images/certifications/apple/apple-device-support.svg',
    badgeBg: 'bg-gray-800/50',
    badgeBorder: 'border-gray-600/40',
    color: 'border-gray-600/30 bg-gray-900/40 hover:border-gray-500/40',
    badge: 'bg-gray-700/40 text-gray-300',
    description:
      'Valide les compétences de support et dépannage des appareils Apple (Mac, iPhone, iPad). Reconnu pour les rôles Help Desk & Support IT. Examen Pearson VUE.',
    url: '/cours/certification-apple-device-support',
    officialUrl: 'https://www.apple.com/education/k12/it/training/',
    level: 'Intermédiaire',
    levelColor: 'bg-blue-500/15 text-blue-400',
    topics: ['Support macOS', 'Support iOS/iPadOS', 'Dépannage', 'Sécurité Apple'],
    duration: '2h — Pearson VUE',
  },
  {
    id: 'apple-deployment',
    name: 'Apple Deployment and Management',
    provider: 'Apple',
    badgeImage: '/images/certifications/apple/apple-deployment.svg',
    badgeBg: 'bg-gray-900/50',
    badgeBorder: 'border-gray-700/40',
    color: 'border-gray-600/30 bg-gray-900/40 hover:border-gray-500/40',
    badge: 'bg-gray-700/40 text-gray-300',
    description:
      'Certifie les compétences en déploiement MDM, Apple Business Manager et gestion des appareils Apple en entreprise. Indispensable pour les administrateurs IT. Examen Pearson VUE.',
    url: '/cours/certification-apple-deployment',
    officialUrl: 'https://www.apple.com/education/k12/it/training/',
    level: 'Avancé',
    levelColor: 'bg-amber-500/15 text-amber-400',
    topics: ['ABM & ADE', 'MDM Configuration', 'Apps & Books', 'Zero-Touch Deployment'],
    duration: '2h — Pearson VUE',
  },
  {
    id: 'md-102',
    name: 'Microsoft MD-102',
    provider: 'Microsoft',
    badgeImage: '/images/certifications/microsoft/md-102.svg',
    badgeBg: 'bg-cyan-950/30',
    badgeBorder: 'border-cyan-600/30',
    color: 'border-cyan-600/25 bg-cyan-950/15 hover:border-cyan-500/35',
    badge: 'bg-cyan-500/10 text-cyan-400',
    description:
      'Microsoft 365 Certified: Endpoint Administrator Associate. Gestion des endpoints Windows, macOS et mobiles avec Microsoft Intune. Inclut la gestion des appareils Apple.',
    url: '/cours/certification-md-102',
    officialUrl: 'https://learn.microsoft.com/certifications/endpoint-administrator/',
    level: 'Avancé',
    levelColor: 'bg-amber-500/15 text-amber-400',
    topics: ['Microsoft Intune', 'Gestion macOS', 'Gestion iOS/iPadOS', 'Conditional Access'],
    duration: '3h — Pearson VUE',
  },
  {
    id: 'ms-102',
    name: 'Microsoft MS-102',
    provider: 'Microsoft',
    badgeImage: '/images/certifications/microsoft/ms-102.svg',
    badgeBg: 'bg-violet-950/30',
    badgeBorder: 'border-violet-600/30',
    color: 'border-violet-600/25 bg-violet-950/15 hover:border-violet-500/35',
    badge: 'bg-violet-500/10 text-violet-400',
    description:
      'Microsoft 365 Certified: Enterprise Administrator Expert. Administration avancée de Microsoft 365, sécurité, conformité, gouvernance et identité avec Entra ID.',
    url: '/cours/certification-ms-102',
    officialUrl: 'https://learn.microsoft.com/certifications/microsoft-365-enterprise-adminstrator/',
    level: 'Expert',
    levelColor: 'bg-red-500/15 text-red-400',
    topics: ['Microsoft 365 Admin', 'Entra ID', 'Sécurité & conformité', 'Gouvernance'],
    duration: '3h — Pearson VUE',
  },
] as const;

// ─── Composant badge niveau ────────────────────────────────────────────────────

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    'Débutant':     'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    'Intermédiaire':'bg-blue-500/15 text-blue-400 border-blue-500/20',
    'Avancé':       'bg-amber-500/15 text-amber-400 border-amber-500/20',
    'Expert':       'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${map[level] ?? 'bg-gray-500/15 text-gray-400 border-gray-500/20'}`}>
      {level}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  const certModule = MODULES.find((m) => m.id === 'module-9');
  const allCourses = getAllCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">Certifications</span>
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <Trophy className="text-yellow-400" size={22} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Certifications professionnelles
          </h1>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-6">
          Préparez les certifications officielles Jamf Pro, Apple et Microsoft reconnues dans l&apos;industrie.
          Chaque parcours est aligné sur le contenu officiel des examens avec quiz et labs pratiques.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 sm:gap-6">
          {[
            { icon: <Award size={13} className="text-yellow-400" />, label: '8 certifications couvertes' },
            { icon: <Star size={13} className="text-violet-400" />, label: '4 niveaux Jamf Pro officiels' },
            { icon: <BookOpen size={13} className="text-blue-400" />, label: 'Badges numériques Credly' },
            { icon: <Zap size={13} className="text-green-400" />, label: 'Aligné sur le catalogue officiel' },
          ].map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section Jamf Pro ─────────────────────────────────────────────────── */}
      <section className="mb-16">

        {/* En-tête section */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-lg font-bold text-white">Jamf Pro — Parcours certifiant officiel</h2>
          <Link
            href="https://trainingcatalog.jamf.com/page/fr-fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={11} />
            Catalogue officiel Jamf
          </Link>
        </div>
        <p className="text-xs text-gray-500 mb-8">
          Progression officielle Jamf — du Jamf 100 Course au Jamf 400 Course, avec badges numériques Credly.
          Cours disponibles en anglais, allemand, espagnol, français, japonais et chinois traditionnel.
        </p>

        {/* Barre de progression — desktop */}
        <div className="hidden md:flex items-center gap-0 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {JAMF_COURSES.map((course, i) => (
            <div key={course.number} className="flex items-center flex-shrink-0">
              <Link
                href={course.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all ${course.color.border} ${course.color.bg} ${course.color.number} hover:opacity-80 hover:scale-105`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${course.color.badge}`}>
                  {i + 1}
                </span>
                <span>Jamf {course.number}</span>
                <span className="text-gray-500 font-normal hidden lg:inline">→ {course.badgeShort}</span>
                <ExternalLink size={9} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </Link>
              {i < JAMF_COURSES.length - 1 && (
                <div className="flex items-center mx-1.5 flex-shrink-0">
                  <div className="w-6 h-px bg-gray-700"/>
                  <ChevronRight size={12} className="text-gray-700 -ml-1" />
                </div>
              )}
            </div>
          ))}
          <Link
            href="https://trainingcatalog.jamf.com/page/fr-fr"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/8 bg-white/3 text-xs text-gray-500 hover:text-white hover:border-white/15 transition-all flex-shrink-0"
          >
            <ExternalLink size={10} />
            Voir le catalogue complet
          </Link>
        </div>

        {/* Grille cartes Jamf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {JAMF_COURSES.map((course) => {
            const relatedCourses = allCourses.filter((c) =>
              c.certificationRelated.some((cr) => cr.includes(`Jamf ${course.number}`))
            );
            return (
              <article
                key={course.number}
                className={`group flex flex-col rounded-2xl border p-5 transition-all duration-200 ${course.color.border} ${course.color.bg} ${course.color.glow}`}
              >
                {/* Header : numéro + niveau */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${course.color.badge}`}>
                    Jamf {course.number}
                  </span>
                  <LevelBadge level={course.level} />
                </div>

                {/* Badge image PNG centré + nom certification */}
                <div className="flex flex-col items-center text-center mb-4">
                  <div className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 ${course.color.badgeRing} bg-black/20 p-1.5 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1`}>
                    <Image
                      src={course.badgeImage}
                      alt={`Badge officiel ${course.title}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain drop-shadow-xl"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{course.title}</h3>
                    <Link
                      href={course.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-xs mt-1 font-medium ${course.color.accent} hover:underline underline-offset-2`}
                    >
                      <ExternalLink size={9} />
                      jamf.com/training
                    </Link>
                    {course.credly && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-gray-600">
                        <GraduationCap size={9} />
                        Badge Credly numérique
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
                  {course.description}
                </p>

                {/* Topics */}
                <div className="mb-4">
                  <p className="text-[10px] text-gray-600 mb-2 font-semibold uppercase tracking-widest">
                    Sujets couverts
                  </p>
                  <ul className="space-y-1.5">
                    {course.topics.slice(0, 4).map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${course.color.dot}`} />
                        {topic}
                      </li>
                    ))}
                    {course.topics.length > 4 && (
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-700" />
                        +{course.topics.length - 4} sujets supplémentaires
                      </li>
                    )}
                  </ul>
                </div>

                {/* Méta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mb-3 pb-3 border-b border-white/5">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {course.duration}
                  </span>
                  <span className="hidden sm:inline text-gray-700">·</span>
                  <span className="truncate">{course.format}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold border ${course.color.priceBadge}`}>
                    {course.price}
                  </span>
                </div>

                {/* Prérequis */}
                <div className="mb-3">
                  <span className="text-xs text-gray-600">Prérequis : </span>
                  <span className="text-xs text-gray-400">{course.prereqs}</span>
                </div>

                {/* Cours liés */}
                {relatedCourses.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <CheckCircle2 size={11} className={course.color.accent} />
                    <p className="text-xs text-gray-500">
                      {relatedCourses.length} cours préparatoires disponibles
                    </p>
                  </div>
                )}

                {/* Boutons */}
                <div className="space-y-2 mt-auto">
                  <Link
                    href={course.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${course.color.btnExt}`}
                  >
                    <ExternalLink size={12} />
                    Voir la formation officielle
                  </Link>
                  <Link
                    href={course.prepUrl}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl border text-xs transition-all ${course.color.btn}`}
                  >
                    <span>Cours de préparation MDM Academy</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Note Credly */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
          <GraduationCap size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="text-gray-300 font-medium">Badges numériques Credly</span> — À la réussite de l&apos;examen,
            Jamf délivre un badge numérique Credly partageable sur LinkedIn, votre CV et vos profils professionnels.
            Les certifications sont valables 3 ans.{' '}
            <Link
              href="https://trainingcatalog.jamf.com/page/fr-fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Consulter le catalogue complet Jamf →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Apple & Microsoft ─────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-white mb-2">Apple & Microsoft</h2>
        <p className="text-sm text-gray-500 mb-7">
          Certifications complémentaires pour compléter votre profil IT professionnel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OTHER_CERTS.map((cert) => {
            const relatedCourses = allCourses.filter((c) =>
              c.certificationRelated.includes(cert.name)
            );
            return (
              <article
                key={cert.id}
                className={`flex flex-col rounded-xl border p-5 transition-all ${cert.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cert.badge}`}>
                    {cert.provider}
                  </span>
                  <LevelBadge level={cert.level} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border ${cert.badgeBorder} ${cert.badgeBg} p-0.5`}>
                    <Image
                      src={cert.badgeImage}
                      alt={`Badge ${cert.name}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight">{cert.name}</h3>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{cert.description}</p>

                <ul className="space-y-1 mb-4">
                  {cert.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-4 pb-3 border-b border-white/5">
                  <Clock size={10} />
                  {cert.duration}
                </div>

                <div className="space-y-2 mt-auto">
                  <Link
                    href={cert.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-gray-300 hover:text-white transition-all font-medium"
                  >
                    <ExternalLink size={11} />
                    Voir la certification officielle
                  </Link>
                  <Link
                    href={cert.url}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-white/6 bg-white/3 text-xs text-gray-500 hover:text-white hover:border-white/12 transition-all"
                  >
                    <span>
                      {relatedCourses.length > 0
                        ? `${relatedCourses.length} cours préparatoires`
                        : 'Cours de préparation'}
                    </span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Guides de révision Module 9 ──────────────────────────────────────── */}
      {certModule && (
        <section>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-lg font-bold text-white">Guides de révision & examens blancs</h2>
            <span className="text-xs text-gray-600 px-2 py-0.5 rounded-full bg-white/5 border border-white/8">
              Module {certModule.order}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-7">
            Guides de préparation avec questions d&apos;entraînement alignées sur les domaines officiels de chaque examen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {certModule.courses.map((course) => (
              <Link
                key={course.id}
                href={`/cours/${course.slug}`}
                className="group flex flex-col p-4 rounded-xl border border-white/5 bg-[#161920] hover:border-yellow-500/30 hover:bg-[#1a1d28] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Trophy size={14} className="text-yellow-400 flex-shrink-0" />
                  <LevelBadge level={course.level} />
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed flex-1">
                  {course.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
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
