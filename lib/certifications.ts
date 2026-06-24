import { CERT_ICONS, PROVIDER_ICON_PATHS } from '@/lib/icons';

export type CertificationProvider = 'Apple' | 'Jamf' | 'Microsoft';
export type CertificationLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface CertificationResource {
  title: string;
  url: string;
}

export interface Certification {
  /** Official certification / course name — used in certificationRelated */
  id: string;
  slug: string;
  provider: CertificationProvider;
  /** Original editorial pictogram; never an official certification badge. */
  iconSrc: string;
  level: CertificationLevel;
  description: string;
  prerequisites?: string[];
  officialResources?: CertificationResource[];
  examCode?: string;
  prepCourseUrl?: string;
  externalUrl: string;
}

export const CERTIFICATIONS: Certification[] = [
  // ─── Apple Professional Training ───────────────────────────────────────────
  {
    id: 'Apple Device Support',
    slug: 'apple-device-support',
    provider: 'Apple',
    iconSrc: CERT_ICONS.apple.deviceSupport,
    level: 'Intermédiaire',
    description:
      'Valide le support et l\'administration quotidienne des appareils Apple (macOS, iOS, iPadOS) en entreprise.',
    prerequisites: [
      'Expérience de base en support informatique',
      'Familiarité avec macOS et iOS',
    ],
    officialResources: [
      { title: 'Apple Professional Training', url: 'https://training.apple.com/' },
      { title: 'Apple Device Support', url: 'https://training.apple.com/apple-device-support' },
      { title: 'Apple Platform Deployment', url: 'https://support.apple.com/guide/deployment/welcome/web' },
    ],
    prepCourseUrl: '/cours/certification-apple-device-support',
    externalUrl: 'https://training.apple.com/apple-device-support',
  },
  {
    id: 'Apple Certified Support Professional',
    slug: 'apple-certified-support-professional',
    provider: 'Apple',
    iconSrc: CERT_ICONS.apple.supportProfessional,
    level: 'Intermédiaire',
    description:
      'Certification Apple pour le dépannage avancé, le support utilisateur et la résolution d\'incidents sur l\'écosystème Apple.',
    prerequisites: [
      'Apple Device Support (recommandé)',
      'Expérience pratique en support macOS/iOS',
    ],
    officialResources: [
      { title: 'Apple Professional Training', url: 'https://training.apple.com/' },
      { title: 'Certifications Apple', url: 'https://training.apple.com/certification' },
    ],
    prepCourseUrl: '/cours/certification-apple-device-support',
    externalUrl: 'https://training.apple.com/certification',
  },
  {
    id: 'Apple Deployment and Management',
    slug: 'apple-deployment-and-management',
    provider: 'Apple',
    iconSrc: CERT_ICONS.apple.deploymentManagement,
    level: 'Avancé',
    description:
      'Certifie le déploiement MDM, Apple Business Manager, ADE et la gestion à grande échelle des parcs Apple.',
    prerequisites: [
      'Apple Device Support ou équivalent',
      'Expérience MDM (Jamf, Intune ou autre)',
      'Connaissance d\'Apple Business Manager',
    ],
    officialResources: [
      { title: 'Apple Deployment and Management', url: 'https://training.apple.com/apple-deployment-and-management' },
      { title: 'Apple Platform Deployment Guide', url: 'https://support.apple.com/guide/deployment/welcome/web' },
      { title: 'Apple Platform Security', url: 'https://support.apple.com/guide/security/welcome/web' },
    ],
    prepCourseUrl: '/cours/certification-apple-deployment',
    externalUrl: 'https://training.apple.com/apple-deployment-and-management',
  },
  {
    id: 'Apple Certified IT Professional',
    slug: 'apple-certified-it-professional',
    provider: 'Apple',
    iconSrc: CERT_ICONS.apple.itProfessional,
    level: 'Expert',
    description:
      'Niveau expert pour les architectes IT gérant l\'infrastructure Apple enterprise de bout en bout.',
    prerequisites: [
      'Apple Deployment and Management (recommandé)',
      'Expérience significative en administration MDM',
    ],
    officialResources: [
      { title: 'Apple Professional Training', url: 'https://training.apple.com/' },
      { title: 'Apple Platform Security', url: 'https://support.apple.com/guide/security/welcome/web' },
    ],
    externalUrl: 'https://training.apple.com/certification',
  },

  // ─── Jamf Training ───────────────────────────────────────────────────────
  {
    id: 'Jamf 100 Course',
    slug: 'jamf-100-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-100.svg',
    level: 'Débutant',
    description:
      'Fondamentaux Jamf Pro — enrôlement, Smart Groups, Configuration Profiles et Policies.',
    prerequisites: ['Connaissance de base macOS', 'Notions MDM Apple (recommandé)'],
    officialResources: [
      { title: 'Jamf Learn', url: 'https://learn.jamf.com/home' },
      { title: 'Jamf 100 Course', url: 'https://training.jamf.com/details/jamf-100-course' },
      { title: 'Documentation Jamf Pro', url: 'https://learn.jamf.com/r/fr-FR/jamf-pro-documentation-current/Jamf_Pro_Documentation' },
    ],
    prepCourseUrl: '/cours/certification-jamf-100',
    externalUrl: 'https://training.jamf.com/details/jamf-100-course',
  },
  {
    id: 'Jamf 140 Course',
    slug: 'jamf-140-course',
    provider: 'Jamf',
    iconSrc: CERT_ICONS.jamf[140],
    level: 'Intermédiaire',
    description:
      'Fondamentaux Jamf School — gestion des iPad, classes, applications et workflows éducatifs.',
    prerequisites: ['Connaissance de base iPadOS', 'Notions MDM Apple (recommandé)'],
    officialResources: [
      { title: 'Jamf 140 Course', url: 'https://training.jamf.com/details/jamf-140-course' },
      { title: 'Jamf School Documentation', url: 'https://learn.jamf.com/bundle/jamf-school-documentation-current/page/Jamf_School_Documentation.html' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-140-course',
  },
  {
    id: 'Jamf 170 Course',
    slug: 'jamf-170-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-170.svg',
    level: 'Avancé',
    description:
      'Scripting Bash, API REST, automatisation et workflows avancés avec Jamf Pro.',
    prerequisites: ['Jamf 100 Course (recommandé)', 'Bases Bash et curl'],
    officialResources: [
      { title: 'Jamf 170 Course', url: 'https://training.jamf.com/details/jamf-170-course' },
      { title: 'Jamf Pro API Overview', url: 'https://developer.jamf.com/jamf-pro/docs/jamf-pro-api-overview' },
    ],
    prepCourseUrl: '/cours/certification-jamf-170',
    externalUrl: 'https://training.jamf.com/details/jamf-170-course',
  },
  {
    id: 'Jamf 200 Course',
    slug: 'jamf-200-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-200.svg',
    level: 'Intermédiaire',
    description:
      'Administration Jamf Pro approfondie — packaging, patch management, reporting et déploiement.',
    prerequisites: ['Jamf 100 Course', 'Expérience administration Jamf Pro'],
    officialResources: [
      { title: 'Jamf 200 Course', url: 'https://training.jamf.com/details/jamf-200-course' },
      { title: 'Jamf Learn', url: 'https://learn.jamf.com/home' },
    ],
    prepCourseUrl: '/cours/certification-jamf-200',
    externalUrl: 'https://training.jamf.com/details/jamf-200-course',
  },
  {
    id: 'Jamf 240 Course',
    slug: 'jamf-240-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-240.svg',
    level: 'Intermédiaire',
    description:
      'Administration avancée Jamf School — déploiement iPad, classes et workflows éducatifs.',
    prerequisites: ['Jamf 140 Course ou expérience MDM éducation'],
    officialResources: [
      { title: 'Jamf 240 Course', url: 'https://training.jamf.com/details/jamf-240-course' },
      { title: 'Jamf School Documentation', url: 'https://learn.jamf.com/bundle/jamf-school-documentation-current/page/Jamf_School_Documentation.html' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-240-course',
  },
  {
    id: 'Jamf 270 Course',
    slug: 'jamf-270-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-270.svg',
    level: 'Avancé',
    description:
      'Jamf Protect — détection de menaces, analytics Unified Logs et remédiation sur macOS.',
    prerequisites: ['Jamf 200 Course (recommandé)', 'Bases sécurité macOS'],
    officialResources: [
      { title: 'Jamf 270 Course', url: 'https://training.jamf.com/details/jamf-270-course' },
      { title: 'Jamf Protect Documentation', url: 'https://learn.jamf.com/bundle/jamf-protect-documentation-current/page/Jamf_Protect_Documentation.html' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-270-course',
  },
  {
    id: 'Jamf 300 Course',
    slug: 'jamf-300-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-300.svg',
    level: 'Avancé',
    description:
      'Administration enterprise Jamf Pro — architecture multi-instances, haute disponibilité et gouvernance.',
    prerequisites: ['Jamf 200 Course', 'Expérience environnement enterprise (500+ appareils)'],
    officialResources: [
      { title: 'Jamf 300 Course', url: 'https://training.jamf.com/details/jamf-300-course' },
      { title: 'Documentation Jamf Pro', url: 'https://learn.jamf.com/r/fr-FR/jamf-pro-documentation-current/Jamf_Pro_Documentation' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-300-course',
  },
  {
    id: 'Jamf 370 Course',
    slug: 'jamf-370-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-370.svg',
    level: 'Expert',
    description:
      'Jamf Security Cloud — écosystème sécurité Jamf, intégrations SIEM et posture management.',
    prerequisites: ['Jamf 270 Course (recommandé)', 'Jamf 300 Course (recommandé)'],
    officialResources: [
      { title: 'Jamf 370 Course', url: 'https://training.jamf.com/details/jamf-370-course' },
      { title: 'Jamf Security Cloud', url: 'https://www.jamf.com/products/jamf-security-cloud/' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-370-course',
  },
  {
    id: 'Jamf 400 Course',
    slug: 'jamf-400-course',
    provider: 'Jamf',
    iconSrc: '/icons/certifications/jamf-400.svg',
    level: 'Expert',
    description:
      'Niveau expert Jamf Pro — architecture de solutions, intégrations API et conception MDM à grande échelle.',
    prerequisites: ['Jamf 300 Course', 'Maîtrise API Jamf Pro et scripting avancé'],
    officialResources: [
      { title: 'Jamf 400 Course', url: 'https://training.jamf.com/details/jamf-400-course' },
      { title: 'Jamf Pro API Overview', url: 'https://developer.jamf.com/jamf-pro/docs/jamf-pro-api-overview' },
    ],
    externalUrl: 'https://training.jamf.com/details/jamf-400-course',
  },

  // ─── Microsoft Learn ─────────────────────────────────────────────────────
  {
    id: 'Microsoft 365 Certified: Endpoint Administrator Associate',
    slug: 'md-102-endpoint-administrator',
    provider: 'Microsoft',
    iconSrc: '/icons/certifications/md-102.svg',
    level: 'Avancé',
    description:
      'Gestion des endpoints Windows, macOS, iOS et Android avec Microsoft Intune et Endpoint Manager.',
    examCode: 'MD-102',
    prerequisites: [
      'Expérience administration Microsoft 365',
      'Notions Azure AD / Entra ID',
      'Familiarité macOS ou iOS en entreprise',
    ],
    officialResources: [
      { title: 'Microsoft Learn — MD-102', url: 'https://learn.microsoft.com/credentials/certifications/exams/md-102/' },
      { title: 'Parcours Endpoint Administrator', url: 'https://learn.microsoft.com/training/paths/modernize-your-workplace-with-microsoft-365' },
    ],
    prepCourseUrl: '/cours/certification-md-102',
    externalUrl: 'https://learn.microsoft.com/credentials/certifications/exams/md-102/',
  },
  {
    id: 'Microsoft 365 Certified: Administrator Expert',
    slug: 'ms-102-administrator-expert',
    provider: 'Microsoft',
    iconSrc: '/icons/certifications/ms-102.svg',
    level: 'Expert',
    description:
      'Administration expert Microsoft 365 — tenant, identité, sécurité, conformité et gouvernance.',
    examCode: 'MS-102',
    prerequisites: [
      'Certification MS-700 ou équivalent (recommandé)',
      'Expérience administration M365 multi-services',
    ],
    officialResources: [
      { title: 'Microsoft Learn — MS-102', url: 'https://learn.microsoft.com/credentials/certifications/exams/ms-102/' },
      { title: 'Microsoft 365 Administrator Expert', url: 'https://learn.microsoft.com/credentials/certifications/m365-enterprise-administrator-expert/' },
    ],
    prepCourseUrl: '/cours/certification-ms-102',
    externalUrl: 'https://learn.microsoft.com/credentials/certifications/exams/ms-102/',
  },
  {
    id: 'Microsoft Certified: Identity and Access Administrator Associate',
    slug: 'sc-300-identity-access',
    provider: 'Microsoft',
    iconSrc: '/icons/certifications/sc-300.svg',
    level: 'Avancé',
    description:
      'Gestion des identités et accès avec Microsoft Entra ID — SSO, MFA, Conditional Access et PIM.',
    examCode: 'SC-300',
    prerequisites: [
      'Expérience Azure AD / Entra ID',
      'Notions Conditional Access et MFA',
    ],
    officialResources: [
      { title: 'Microsoft Learn — SC-300', url: 'https://learn.microsoft.com/credentials/certifications/exams/sc-300/' },
      { title: 'Parcours Identity Administrator', url: 'https://learn.microsoft.com/training/paths/sc-300-identity-access-administrator' },
    ],
    externalUrl: 'https://learn.microsoft.com/credentials/certifications/exams/sc-300/',
  },
  {
    id: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
    slug: 'sc-900-fundamentals',
    provider: 'Microsoft',
    iconSrc: CERT_ICONS.microsoft.sc900,
    level: 'Débutant',
    description:
      'Fondamentaux sécurité, conformité et identité Microsoft — entrée vers SC-300 et l\'écosystème Zero Trust.',
    examCode: 'SC-900',
    prerequisites: ['Aucun prérequis formel', 'Notions cloud computing (recommandé)'],
    officialResources: [
      { title: 'Microsoft Learn — SC-900', url: 'https://learn.microsoft.com/credentials/certifications/exams/sc-900/' },
      { title: 'Parcours SC-900', url: 'https://learn.microsoft.com/training/paths/describe-capabilities-of-microsoft-security-compliance-identity-solutions' },
    ],
    externalUrl: 'https://learn.microsoft.com/credentials/certifications/exams/sc-900/',
  },
];

export const CERTIFICATION_COUNT = CERTIFICATIONS.length;

const PROVIDER_STYLES: Record<
  CertificationProvider,
  { color: string; badge: string }
> = {
  Apple: {
    color: 'border-gray-600/30 bg-gray-900/30',
    badge: 'bg-gray-500/10 text-gray-400',
  },
  Jamf: {
    color: 'border-blue-600/30 bg-blue-950/20',
    badge: 'bg-blue-500/10 text-blue-400',
  },
  Microsoft: {
    color: 'border-cyan-600/30 bg-cyan-950/20',
    badge: 'bg-cyan-500/10 text-cyan-400',
  },
};

export function getCertificationStyles(provider: CertificationProvider) {
  return PROVIDER_STYLES[provider];
}

export function getCertificationById(id: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.id === id);
}

export function getCertificationBySlug(slug: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.slug === slug);
}

/** Prep courses only — certifications with an internal preparation course */
export const CERTIFICATIONS_WITH_PREP = CERTIFICATIONS.filter((c) => c.prepCourseUrl);

/** Provider-level editorial pictograms (not official trademarks). */
export const PROVIDER_ICONS = PROVIDER_ICON_PATHS;

/** Icon for module-9 prep course cards keyed by course slug. */
export const PREP_COURSE_ICONS: Record<string, string> = {
  'certification-apple-device-support': CERT_ICONS.apple.deviceSupport,
  'certification-apple-deployment': CERT_ICONS.apple.deploymentManagement,
  'certification-jamf-100': CERT_ICONS.jamf[100],
  'certification-jamf-170': CERT_ICONS.jamf[170],
  'certification-jamf-200': CERT_ICONS.jamf[200],
  'certification-md-102': CERT_ICONS.microsoft.md102,
  'certification-ms-102': CERT_ICONS.microsoft.ms102,
};

export function getCertificationIconSrc(id: string): string {
  return getCertificationById(id)?.iconSrc ?? PROVIDER_ICONS.Apple;
}

export function getPrepCourseIcon(slug: string): string {
  return PREP_COURSE_ICONS[slug] ?? CERT_ICONS.apple.provider;
}
