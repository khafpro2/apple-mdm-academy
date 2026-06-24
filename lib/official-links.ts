/**
 * Apple MDM Academy — Liens officiels par module et cours
 * Sources : Apple, Jamf, Microsoft, Google
 */

export interface OfficialLink {
  title: string;
  url: string;
  source: 'Apple' | 'Jamf' | 'Microsoft' | 'Google' | 'CIS' | 'WWDC';
  type: 'documentation' | 'guide' | 'video' | 'certification' | 'tool' | 'community';
  description?: string;
  /** Métadonnées enrichies (sources Jamf) */
  publisher?: string;
  category?: string;
  language?: string;
  relatedCourses?: readonly string[];
}

/** Entrée du registre des sources officielles Jamf */
export interface JamfOfficialSourceEntry {
  id: string;
  title: string;
  publisher: 'Jamf';
  type: OfficialLink['type'];
  category: string;
  language: string;
  url: string;
  version?: string;
  summary: string;
  relatedCourses: readonly string[];
}

/** Documentation Jamf Pro officielle (Jamf Learn, fr-FR) */
export const JAMF_PRO_DOCUMENTATION_URL =
  'https://learn.jamf.com/r/fr-FR/jamf-pro-documentation-current/Jamf_Pro_Documentation';

export const JAMF_PRO_DOCUMENTATION_VERSION = '11.28.0';

export const JAMF_PRO_DOC_NOTE =
  'Source officielle : Documentation Jamf Pro — Jamf Learn';

export const JAMF_PRO_DOCUMENTED_COURSES = [
  'introduction-jamf-pro',
  'configuration-profiles-jamf',
  'policies-jamf-pro',
  'smart-groups-jamf',
  'filevault-gestion-jamf',
  'self-service-jamf',
  'api-jamf-pro',
  'scripting-bash-jamf',
  'remediation-automatique-jamf',
  'reporting-conformite-jamf',
  'patch-management-jamf',
  'packaging-avance-jamf',
  'enrolement-macos-jamf',
  'prestage-enrollment-jamf',
] as const;

export function getJamfProDocPageUrl(page: string): string {
  return `https://learn.jamf.com/r/fr-FR/jamf-pro-documentation-current/${page}.html`;
}

export function isJamfProDocumentedCourse(slug: string): boolean {
  return (JAMF_PRO_DOCUMENTED_COURSES as readonly string[]).includes(slug);
}

export const JAMF_PRO_DOC_HUB_LINK: OfficialLink = {
  title: 'Documentation Jamf Pro (fr-FR)',
  url: JAMF_PRO_DOCUMENTATION_URL,
  source: 'Jamf',
  type: 'documentation',
  description: `Hub officiel Jamf Learn — version ${JAMF_PRO_DOCUMENTATION_VERSION}`,
};

/** Jamf Developer — Jamf Pro API Overview (developer.jamf.com) */
export const JAMF_PRO_API_OVERVIEW_URL =
  'https://developer.jamf.com/jamf-pro/docs/jamf-pro-api-overview';

export const JAMF_PRO_API_VERSION = '11.29.0';

export const JAMF_PRO_API_OVERVIEW_LINK: OfficialLink = {
  title: 'Jamf Pro API Overview',
  url: JAMF_PRO_API_OVERVIEW_URL,
  source: 'Jamf',
  type: 'documentation',
  description: `Documentation développeur officielle — Jamf Pro API v${JAMF_PRO_API_VERSION}`,
};

export const JAMF_PRO_API_COURSES = [
  'api-jamf-pro',
  'scripting-bash-jamf',
  'remediation-automatique-jamf',
  'reporting-conformite-jamf',
  'smart-groups-jamf',
] as const;

export function isJamfProApiCourse(slug: string): boolean {
  return (JAMF_PRO_API_COURSES as readonly string[]).includes(slug);
}

/** Hub Jamf Learn — portail de formation et documentation */
export const JAMF_LEARN_URL = 'https://learn.jamf.com/home';

/** JamfSync — synchronisation de packages entre instances Jamf Pro */
export const JAMF_SYNC_GITHUB_URL = 'https://github.com/jamf/JamfSync';

export const JAMF_SYNC_COURSES = [
  'packaging-avance-jamf',
  'patch-management-jamf',
  'scripting-bash-jamf',
] as const;

export function isJamfSyncCourse(slug: string): boolean {
  return (JAMF_SYNC_COURSES as readonly string[]).includes(slug);
}

/** Cours prioritaires enrichis avec le bloc « Source officielle Jamf » */
export const JAMF_ENRICHED_COURSES = [
  'introduction-jamf-pro',
  'policies-jamf-pro',
  'smart-groups-jamf',
  'api-jamf-pro',
  'scripting-bash-jamf',
  'packaging-avance-jamf',
  'patch-management-jamf',
  'filevault-gestion-jamf',
  'self-service-jamf',
  'enrolement-macos-jamf',
  'prestage-enrollment-jamf',
] as const;

export function isJamfEnrichedCourse(slug: string): boolean {
  return (JAMF_ENRICHED_COURSES as readonly string[]).includes(slug);
}

export const JAMF_LEARN_LINK: OfficialLink = {
  title: 'Jamf Learn',
  url: JAMF_LEARN_URL,
  source: 'Jamf',
  type: 'guide',
  publisher: 'Jamf',
  category: 'Formation & documentation',
  language: 'Multilingue',
  description: 'Portail officiel de formation, certifications et documentation Jamf',
};

export const JAMF_SYNC_LINK: OfficialLink = {
  title: 'JamfSync — GitHub',
  url: JAMF_SYNC_GITHUB_URL,
  source: 'Jamf',
  type: 'tool',
  publisher: 'Jamf',
  category: 'Distribution & packaging',
  language: 'English',
  description: 'Outil open source pour synchroniser packages et titres entre instances Jamf Pro',
};

export const JAMF_OFFICIAL_SOURCES: JamfOfficialSourceEntry[] = [
  {
    id: 'jamf-learn',
    title: 'Jamf Learn',
    publisher: 'Jamf',
    type: 'guide',
    category: 'Formation & documentation',
    language: 'Multilingue',
    url: JAMF_LEARN_URL,
    summary:
      'Portail officiel Jamf : formations certifiantes (Jamf 100/170/200), guides produit et accès à la documentation technique.',
    relatedCourses: JAMF_ENRICHED_COURSES,
  },
  {
    id: 'jamf-pro-docs',
    title: 'Documentation Jamf Pro',
    publisher: 'Jamf',
    type: 'documentation',
    category: 'Jamf Pro',
    language: 'Français',
    url: JAMF_PRO_DOCUMENTATION_URL,
    version: JAMF_PRO_DOCUMENTATION_VERSION,
    summary:
      'Hub documentation Jamf Pro sur Jamf Learn (fr-FR) — policies, inventaire, enrôlement, Smart Groups, API et administration.',
    relatedCourses: JAMF_PRO_DOCUMENTED_COURSES,
  },
  {
    id: 'jamf-pro-api',
    title: 'Jamf Pro API Overview',
    publisher: 'Jamf',
    type: 'documentation',
    category: 'Jamf Pro API',
    language: 'English',
    url: JAMF_PRO_API_OVERVIEW_URL,
    version: JAMF_PRO_API_VERSION,
    summary:
      'Documentation développeur : Bearer Token, endpoints REST, RSQL, webhooks et coexistence avec la Classic API.',
    relatedCourses: JAMF_PRO_API_COURSES,
  },
  {
    id: 'jamfsync',
    title: 'JamfSync — GitHub',
    publisher: 'Jamf',
    type: 'tool',
    category: 'Distribution & packaging',
    language: 'English',
    url: JAMF_SYNC_GITHUB_URL,
    summary:
      'Outil CLI open source pour synchroniser packages, titres logiciels et Distribution Points entre instances Jamf Pro.',
    relatedCourses: JAMF_SYNC_COURSES,
  },
];

/** Sources Jamf à afficher dans le bloc « Source officielle » d'un cours */
export function getJamfOfficialSourcesForCourse(slug: string): JamfOfficialSourceEntry[] {
  if (!isJamfEnrichedCourse(slug) && !isJamfProDocumentedCourse(slug)) {
    return [];
  }

  const sources: JamfOfficialSourceEntry[] = [];

  const learn = JAMF_OFFICIAL_SOURCES.find((s) => s.id === 'jamf-learn');
  const docs = JAMF_OFFICIAL_SOURCES.find((s) => s.id === 'jamf-pro-docs');
  if (learn) sources.push(learn);
  if (docs) sources.push(docs);

  if (isJamfProApiCourse(slug)) {
    const api = JAMF_OFFICIAL_SOURCES.find((s) => s.id === 'jamf-pro-api');
    if (api) sources.push(api);
  }

  if (isJamfSyncCourse(slug)) {
    const sync = JAMF_OFFICIAL_SOURCES.find((s) => s.id === 'jamfsync');
    if (sync) sources.push(sync);
  }

  return sources;
}

export function getJamfOfficialSources(): JamfOfficialSourceEntry[] {
  return JAMF_OFFICIAL_SOURCES;
}

/** Registre unifié — toutes les sources officielles (Apple, Jamf, Microsoft) */
export interface OfficialSourceEntry {
  id: string;
  title: string;
  publisher: 'Apple' | 'Jamf' | 'Microsoft';
  type: OfficialLink['type'];
  category: string;
  language: string;
  url: string;
  version?: string;
  summary: string;
}

export const APPLE_PROFESSIONAL_TRAINING_URL = 'https://training.apple.com/';
export const APPLE_PLATFORM_DEPLOYMENT_URL =
  'https://support.apple.com/guide/deployment/welcome/web';
export const APPLE_PLATFORM_SECURITY_URL =
  'https://support.apple.com/guide/security/welcome/web';

export const MICROSOFT_MD102_URL =
  'https://learn.microsoft.com/credentials/certifications/exams/md-102/';
export const MICROSOFT_MS102_URL =
  'https://learn.microsoft.com/credentials/certifications/exams/ms-102/';
export const MICROSOFT_SC300_URL =
  'https://learn.microsoft.com/credentials/certifications/exams/sc-300/';

export const APPLE_OFFICIAL_SOURCES: OfficialSourceEntry[] = [
  {
    id: 'apple-professional-training',
    title: 'Apple Professional Training',
    publisher: 'Apple',
    type: 'certification',
    category: 'Formation & certifications',
    language: 'English',
    url: APPLE_PROFESSIONAL_TRAINING_URL,
    summary:
      'Parcours officiels Apple Device Support, Deployment and Management et certifications IT Professional.',
  },
  {
    id: 'apple-platform-deployment',
    title: 'Apple Platform Deployment',
    publisher: 'Apple',
    type: 'guide',
    category: 'Déploiement MDM',
    language: 'Multilingue',
    url: APPLE_PLATFORM_DEPLOYMENT_URL,
    summary:
      'Guide de déploiement Apple — ABM, ADE, supervision, profils MDM et gestion des appareils en entreprise.',
  },
  {
    id: 'apple-platform-security',
    title: 'Apple Platform Security',
    publisher: 'Apple',
    type: 'guide',
    category: 'Sécurité',
    language: 'Multilingue',
    url: APPLE_PLATFORM_SECURITY_URL,
    summary:
      'Documentation sécurité Apple — FileVault, SIP, Gatekeeper, TCC, authentification et conformité macOS/iOS.',
  },
];

export const MICROSOFT_OFFICIAL_SOURCES: OfficialSourceEntry[] = [
  {
    id: 'microsoft-md-102',
    title: 'Microsoft Learn — MD-102',
    publisher: 'Microsoft',
    type: 'certification',
    category: 'Endpoint Management',
    language: 'Multilingue',
    url: MICROSOFT_MD102_URL,
    summary:
      'Endpoint Administrator Associate — Intune, gestion macOS/iOS/Android et politiques de conformité.',
  },
  {
    id: 'microsoft-ms-102',
    title: 'Microsoft Learn — MS-102',
    publisher: 'Microsoft',
    type: 'certification',
    category: 'Microsoft 365',
    language: 'Multilingue',
    url: MICROSOFT_MS102_URL,
    summary:
      'Microsoft 365 Administrator Expert — tenant, identité, sécurité et gouvernance M365.',
  },
  {
    id: 'microsoft-sc-300',
    title: 'Microsoft Learn — SC-300',
    publisher: 'Microsoft',
    type: 'certification',
    category: 'Identité & accès',
    language: 'Multilingue',
    url: MICROSOFT_SC300_URL,
    summary:
      'Identity and Access Administrator — Entra ID, SSO, MFA, Conditional Access et gouvernance des identités.',
  },
];

function jamfToOfficialSource(entry: JamfOfficialSourceEntry): OfficialSourceEntry {
  return {
    id: entry.id,
    title: entry.title,
    publisher: 'Jamf',
    type: entry.type,
    category: entry.category,
    language: entry.language,
    url: entry.url,
    version: entry.version,
    summary: entry.summary,
  };
}

/** Livre blanc FR — La gestion moderne : l'avenir des solutions MDM (réf. FR_The_Future_of_MDM_White_Paper) */
export const MODERN_APPLE_FUTURE_MDM_URL =
  'https://www.jamf.com/fr/ressources/livres-blancs/gestion-moderne-mdm/';

export const APPLE_DDM_DOCUMENTATION_URL =
  'https://developer.apple.com/documentation/devicemanagement/declarativedevicemanagement';

export const JAMF_DDM_WHITEPAPER_URL =
  'https://www.jamf.com/fr/ressources/livres-blancs/gestion-declarative-des-appareils/';

export const MODERN_APPLE_MANAGEMENT_COURSES = [
  'histoire-mdm-apple',
  'mdm-classique-vs-ddm',
  'declarative-device-management',
  'cloud-first-management',
  'device-trust-apple',
  'identity-access-management-apple',
  'jamf-connect-gestion-moderne',
  'zero-trust-apple',
  'conformite-moderne-apple',
  'futur-mdm-apple',
] as const;

export interface ModernAppleSourceEntry {
  id: string;
  title: string;
  publisher: 'Apple' | 'Jamf' | 'Microsoft';
  type: OfficialLink['type'];
  category: string;
  language: string;
  url: string;
  summary: string;
}

export const MODERN_APPLE_DOC_NOTE =
  'Source officielle — Gestion moderne Apple. MDM Academy résume ; consultez les références ci-dessous.';

export const MODERN_APPLE_FUTURE_MDM_LINK: OfficialLink = {
  title: 'La gestion moderne : l\'avenir des solutions MDM',
  url: MODERN_APPLE_FUTURE_MDM_URL,
  source: 'Jamf',
  type: 'guide',
  publisher: 'Jamf',
  category: 'Gestion Moderne Apple',
  language: 'Français',
  description: 'Livre blanc Jamf FR — vision stratégique MDM moderne et DDM',
};

export const APPLE_DDM_LINK: OfficialLink = {
  title: 'Declarative Device Management — Apple Developer',
  url: APPLE_DDM_DOCUMENTATION_URL,
  source: 'Apple',
  type: 'documentation',
  publisher: 'Apple',
  category: 'DDM',
  language: 'English',
  description: 'Documentation technique DDM sur developer.apple.com',
};

export const MODERN_APPLE_OFFICIAL_SOURCES: OfficialSourceEntry[] = [
  {
    id: 'modern-mdm-whitepaper',
    title: 'La gestion moderne : l\'avenir des solutions MDM',
    publisher: 'Jamf',
    type: 'guide',
    category: 'Gestion Moderne Apple',
    language: 'Français',
    url: MODERN_APPLE_FUTURE_MDM_URL,
    summary:
      'Livre blanc Jamf (FR) sur la gestion moderne Apple — stratégie MDM, cloud-first et évolution vers la DDM.',
  },
  {
    id: 'apple-ddm-docs',
    title: 'Declarative Device Management — Apple Developer',
    publisher: 'Apple',
    type: 'documentation',
    category: 'DDM',
    language: 'English',
    url: APPLE_DDM_DOCUMENTATION_URL,
    summary:
      'Documentation technique Apple sur DDM : déclarations, status channel et extensibilité du protocole MDM.',
  },
  {
    id: 'jamf-ddm-whitepaper',
    title: 'Gestion déclarative des appareils (DDM)',
    publisher: 'Jamf',
    type: 'guide',
    category: 'Gestion Moderne Apple',
    language: 'Français',
    url: JAMF_DDM_WHITEPAPER_URL,
    summary:
      'Livre blanc Jamf sur DDM — appareils autonomes, gestion proactive et impact sur la gestion moderne.',
  },
];

export function isModernAppleManagementCourse(slug: string): boolean {
  return (MODERN_APPLE_MANAGEMENT_COURSES as readonly string[]).includes(slug);
}

export function getModernAppleSourcesForCourse(slug: string): ModernAppleSourceEntry[] {
  if (!isModernAppleManagementCourse(slug)) {
    return [];
  }

  const sources: ModernAppleSourceEntry[] = [
    {
      id: 'modern-mdm-whitepaper',
      title: 'La gestion moderne : l\'avenir des solutions MDM',
      publisher: 'Jamf',
      type: 'guide',
      category: 'Livre blanc',
      language: 'Français',
      url: MODERN_APPLE_FUTURE_MDM_URL,
      summary:
        'Vision stratégique de la gestion moderne Apple — référence conceptuelle pour ce parcours (inspiré du livre blanc Jamf FR).',
    },
    {
      id: 'apple-platform-deployment',
      title: 'Apple Platform Deployment',
      publisher: 'Apple',
      type: 'guide',
      category: 'Déploiement',
      language: 'Multilingue',
      url: APPLE_PLATFORM_DEPLOYMENT_URL,
      summary: 'Guide officiel déploiement Apple — ABM, ADE, supervision et MDM.',
    },
  ];

  const ddmSlugs = [
    'mdm-classique-vs-ddm',
    'declarative-device-management',
    'cloud-first-management',
    'futur-mdm-apple',
  ];
  if (ddmSlugs.includes(slug)) {
    sources.push({
      id: 'apple-ddm-docs',
      title: 'Declarative Device Management',
      publisher: 'Apple',
      type: 'documentation',
      category: 'DDM',
      language: 'English',
      url: APPLE_DDM_DOCUMENTATION_URL,
      summary: 'Documentation développeur Apple sur le protocole DDM.',
    });
    sources.push({
      id: 'jamf-ddm-whitepaper',
      title: 'Gestion déclarative des appareils (DDM)',
      publisher: 'Jamf',
      type: 'guide',
      category: 'Livre blanc',
      language: 'Français',
      url: JAMF_DDM_WHITEPAPER_URL,
      summary: 'Livre blanc Jamf — DDM et gestion moderne.',
    });
  }

  if (slug === 'device-trust-apple' || slug === 'zero-trust-apple') {
    sources.push({
      id: 'apple-platform-security',
      title: 'Apple Platform Security',
      publisher: 'Apple',
      type: 'guide',
      category: 'Sécurité',
      language: 'Multilingue',
      url: APPLE_PLATFORM_SECURITY_URL,
      summary: 'Architecture sécurité Apple — fondation de la confiance appareil.',
    });
  }

  if (
    slug === 'identity-access-management-apple' ||
    slug === 'jamf-connect-gestion-moderne' ||
    slug === 'zero-trust-apple'
  ) {
    sources.push({
      id: 'microsoft-sc-300',
      title: 'Microsoft Learn — SC-300',
      publisher: 'Microsoft',
      type: 'certification',
      category: 'Identité & accès',
      language: 'Multilingue',
      url: MICROSOFT_SC300_URL,
      summary: 'Identité et accès — Entra ID, SSO et Conditional Access.',
    });
  }

  if (slug === 'jamf-connect-gestion-moderne') {
    sources.push({
      id: 'jamf-connect-docs',
      title: 'Jamf Connect Documentation',
      publisher: 'Jamf',
      type: 'documentation',
      category: 'Jamf Connect',
      language: 'English',
      url: 'https://learn.jamf.com/bundle/jamf-connect-documentation-current/page/Jamf_Connect_Documentation.html',
      summary: 'Documentation officielle Jamf Connect — login cloud et identité macOS.',
    });
  }

  return sources;
}

export function getAllOfficialSources(): OfficialSourceEntry[] {
  return [
    ...APPLE_OFFICIAL_SOURCES,
    ...MODERN_APPLE_OFFICIAL_SOURCES,
    ...JAMF_OFFICIAL_SOURCES.map(jamfToOfficialSource),
    ...MICROSOFT_OFFICIAL_SOURCES,
  ];
}

export const OFFICIAL_LINKS: Record<string, OfficialLink[]> = {

  // ─── Module 1 — Fondations Apple Enterprise ──────────────────────────────
  'ecosysteme-apple-entreprise': [
    {
      title: 'Apple Platform Deployment Guide',
      url: 'https://support.apple.com/guide/deployment/welcome/web',
      source: 'Apple',
      type: 'guide',
      description: 'Guide officiel de déploiement Apple — la référence absolue',
    },
    {
      title: "What's new in device management (WWDC)",
      url: 'https://developer.apple.com/videos/play/wwdc2024/10183/',
      source: 'WWDC',
      type: 'video',
      description: 'Nouveautés MDM iOS 18 / macOS 15 Sequoia',
    },
    {
      title: 'Apple MDM Protocol Reference',
      url: 'https://developer.apple.com/documentation/devicemanagement',
      source: 'Apple',
      type: 'documentation',
      description: 'Documentation technique du protocole MDM Apple',
    },
  ],

  'apple-business-manager': [
    {
      title: 'Apple Business Manager User Guide',
      url: 'https://support.apple.com/guide/apple-business-manager/welcome/web',
      source: 'Apple',
      type: 'guide',
      description: 'Guide officiel Apple Business Manager',
    },
    {
      title: 'ABM — Configurer les serveurs MDM',
      url: 'https://support.apple.com/guide/apple-business-manager/configure-mdm-servers-axmedd2b0bb/web',
      source: 'Apple',
      type: 'documentation',
    },
    {
      title: 'Automated Device Enrollment — Gestion des appareils',
      url: 'https://support.apple.com/en-us/101617',
      source: 'Apple',
      type: 'documentation',
    },
  ],

  'managed-apple-accounts': [
    {
      title: 'Managed Apple Accounts Overview',
      url: 'https://support.apple.com/guide/apple-business-manager/managed-apple-accounts-tes78b477c81/web',
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Federation with Azure AD',
      url: 'https://support.apple.com/guide/apple-business-manager/link-to-microsoft-entra-id-apd6400d2193/web',
      source: 'Apple',
      type: 'guide',
      description: 'Fédérer ABM avec Microsoft Entra ID (Azure AD)',
    },
  ],

  'automated-device-enrollment': [
    {
      title: 'Automated Device Enrollment — Apple Support',
      url: 'https://support.apple.com/en-us/101617',
      source: 'Apple',
      type: 'documentation',
    },
    {
      title: 'Apple Configurator 2 — User Guide',
      url: 'https://support.apple.com/guide/apple-configurator-2/welcome/mac',
      source: 'Apple',
      type: 'guide',
    },
  ],

  // ─── Module 2 — Administration macOS Jamf Pro ───────────────────────────
  'introduction-jamf-pro': [
    {
      title: 'Jamf Pro — Getting Started',
      url: getJamfProDocPageUrl('Getting_Started_with_Jamf_Pro'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Premiers pas avec Jamf Pro (Jamf Learn)',
    },
    {
      title: 'Jamf 100 Course — Jamf Training',
      url: 'https://training.jamf.com/details/jamf-100-course',
      source: 'Jamf',
      type: 'certification',
    },
    {
      title: 'Jamf Nation Community',
      url: 'https://community.jamf.com/',
      source: 'Jamf',
      type: 'community',
      description: 'Forum communautaire Jamf — questions, scripts, ressources',
    },
  ],

  'enrolement-macos-jamf': [
    {
      title: 'Computer Enrollment Methods — Jamf Pro',
      url: getJamfProDocPageUrl('Computer_Enrollment_Methods'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'PreStage Enrollments for Computers',
      url: getJamfProDocPageUrl('PreStage_Enrollments_for_Computers'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Configuration ADE / PreStage dans Jamf Pro',
    },
  ],

  'prestage-enrollment-jamf': [
    {
      title: 'PreStage Enrollments for Computers',
      url: getJamfProDocPageUrl('PreStage_Enrollments_for_Computers'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Computer Enrollment Methods — Jamf Pro',
      url: getJamfProDocPageUrl('Computer_Enrollment_Methods'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'configuration-profiles-jamf': [
    {
      title: 'Configuration Profiles Overview — Jamf Pro',
      url: getJamfProDocPageUrl('Computer_Configuration_Profiles'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Apple Configuration Profile Reference',
      url: 'https://developer.apple.com/documentation/devicemanagement/profile-specific_payload_keys',
      source: 'Apple',
      type: 'documentation',
      description: 'Référence complète de tous les payloads MDM Apple',
    },
  ],

  'policies-jamf-pro': [
    {
      title: 'Policies — Jamf Pro',
      url: getJamfProDocPageUrl('Policies'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Création, déclencheurs et exécution des policies',
    },
    {
      title: 'Policy Logs — Jamf Pro',
      url: getJamfProDocPageUrl('Policy_Logs'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'smart-groups-jamf': [
    {
      title: 'Smart Computer Groups — Jamf Pro',
      url: getJamfProDocPageUrl('Smart_Computer_Groups'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Critères dynamiques et Extension Attributes',
    },
    {
      title: 'Static Computer Groups — Jamf Pro',
      url: getJamfProDocPageUrl('Static_Computer_Groups'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'self-service-jamf': [
    {
      title: 'Self Service — Jamf Pro',
      url: getJamfProDocPageUrl('Self_Service'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Catalogue, branding et policies Self Service',
    },
    {
      title: 'Self Service for macOS — Jamf Pro',
      url: getJamfProDocPageUrl('Self_Service_for_macOS'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'patch-management-jamf': [
    {
      title: 'Patch Management — Jamf Pro',
      url: getJamfProDocPageUrl('Patch_Management'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Software Update — Jamf Pro',
      url: getJamfProDocPageUrl('Software_Update'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'reporting-conformite-jamf': [
    {
      title: 'Inventory — Jamf Pro',
      url: getJamfProDocPageUrl('Inventory'),
      source: 'Jamf',
      type: 'documentation',
      description: 'Inventaire, Extension Attributes et recon',
    },
    {
      title: 'Reports — Jamf Pro',
      url: getJamfProDocPageUrl('Reports'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'api-jamf-pro': [
    {
      title: 'Jamf Pro API Reference',
      url: 'https://developer.jamf.com/jamf-pro/reference/jamf-pro-api',
      source: 'Jamf',
      type: 'documentation',
      description: 'Référence interactive des endpoints REST',
    },
    {
      title: 'Jamf Developer Portal',
      url: 'https://developer.jamf.com/',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'scripting-bash-jamf': [
    {
      title: 'Jamf Pro Scripts Documentation',
      url: getJamfProDocPageUrl('Scripts'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Jamf Nation — Scripts Repository',
      url: 'https://community.jamf.com/t5/jamf-pro/ct-p/jamf-pro',
      source: 'Jamf',
      type: 'community',
    },
  ],

  'remediation-automatique-jamf': [
    {
      title: 'Policies — Jamf Pro',
      url: getJamfProDocPageUrl('Policies'),
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Smart Computer Groups — Jamf Pro',
      url: getJamfProDocPageUrl('Smart_Computer_Groups'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'workflows-zero-touch': [
    {
      title: 'Zero-Touch Deployment — Jamf',
      url: 'https://www.jamf.com/solutions/zero-touch-deployment/',
      source: 'Jamf',
      type: 'guide',
    },
  ],

  // ─── Module 4 — Sécurité Apple avec Jamf ────────────────────────────────
  'jamf-protect-introduction': [
    {
      title: 'Jamf Protect Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-protect-documentation-current/page/Jamf_Protect_Documentation.html',
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Jamf Protect — Product Page',
      url: 'https://www.jamf.com/products/jamf-protect/',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'jamf-security-cloud': [
    {
      title: 'Jamf Security Cloud Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-security-cloud-documentation-current/page/Jamf_Security_Cloud.html',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'filevault-gestion-jamf': [
    {
      title: 'FileVault — Apple Support',
      url: 'https://support.apple.com/guide/deployment/filevault-dep82064ec40/web',
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Managing FileVault with Jamf Pro',
      url: getJamfProDocPageUrl('FileVault_2'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'cis-benchmarks-macos': [
    {
      title: 'CIS Benchmark for macOS',
      url: 'https://www.cisecurity.org/benchmark/apple_os',
      source: 'CIS',
      type: 'guide',
      description: 'Benchmark CIS officiel pour macOS',
    },
    {
      title: 'CIS Compliance with Jamf Protect',
      url: 'https://learn.jamf.com/bundle/jamf-protect-documentation-current/page/CIS_Compliance.html',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  // ─── Module 5 — Jamf School ─────────────────────────────────────────────
  'presentation-jamf-school': [
    {
      title: 'Jamf School Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-school-documentation-current/page/Jamf_School_Documentation.html',
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Apple School Manager User Guide',
      url: 'https://support.apple.com/guide/apple-school-manager/welcome/web',
      source: 'Apple',
      type: 'guide',
    },
  ],

  'shared-ipad-jamf-school': [
    {
      title: 'Shared iPad Overview — Apple',
      url: 'https://support.apple.com/guide/deployment/shared-ipad-overview-dep9b4e0b899/web',
      source: 'Apple',
      type: 'guide',
    },
  ],

  // ─── Module 6 — Jamf Connect ────────────────────────────────────────────
  'introduction-jamf-connect': [
    {
      title: 'Jamf Connect Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-connect-documentation-current/page/Jamf_Connect_Documentation.html',
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'Jamf Connect — Product Page',
      url: 'https://www.jamf.com/products/jamf-connect/',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'jamf-connect-microsoft-entra': [
    {
      title: 'Configure Jamf Connect with Microsoft Entra ID',
      url: 'https://learn.jamf.com/bundle/jamf-connect-documentation-current/page/Microsoft_Azure_AD.html',
      source: 'Jamf',
      type: 'guide',
    },
  ],

  'single-sign-on-jamf-connect': [
    {
      title: 'Platform SSO — Apple Deployment Guide',
      url: 'https://support.apple.com/guide/deployment/platform-single-sign-on-dep7bbb3f2e9/web',
      source: 'Apple',
      type: 'guide',
    },
  ],

  // ─── Module 7 — Microsoft Intune pour Apple ─────────────────────────────
  'intune-apple-business-manager': [
    {
      title: 'Set up Apple Business Manager — Microsoft Learn',
      url: 'https://learn.microsoft.com/intune/intune-apple-device-management',
      source: 'Microsoft',
      type: 'documentation',
    },
    {
      title: 'Apple MDM push certificate — Intune',
      url: 'https://learn.microsoft.com/mem/intune/enrollment/apple-mdm-push-certificate-get',
      source: 'Microsoft',
      type: 'documentation',
    },
  ],

  'enrolement-ade-intune': [
    {
      title: 'Automated Device Enrollment with Intune',
      url: 'https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-macos',
      source: 'Microsoft',
      type: 'documentation',
    },
    {
      title: 'ADE iOS with Intune',
      url: 'https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios',
      source: 'Microsoft',
      type: 'documentation',
    },
  ],

  'gestion-macos-intune': [
    {
      title: 'macOS device management — Microsoft Learn',
      url: 'https://learn.microsoft.com/mem/intune/fundamentals/deployment-guide-platform-macos',
      source: 'Microsoft',
      type: 'guide',
    },
    {
      title: 'Settings Catalog for macOS',
      url: 'https://learn.microsoft.com/mem/intune/configuration/settings-catalog',
      source: 'Microsoft',
      type: 'documentation',
    },
  ],

  'microsoft-defender-apple': [
    {
      title: 'Microsoft Defender for Endpoint on macOS',
      url: 'https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-endpoint-mac',
      source: 'Microsoft',
      type: 'documentation',
    },
    {
      title: 'Deploy Defender for Endpoint on macOS via Intune',
      url: 'https://learn.microsoft.com/microsoft-365/security/defender-endpoint/mac-install-with-intune',
      source: 'Microsoft',
      type: 'guide',
    },
  ],

  'conditional-access-apple-intune': [
    {
      title: 'Conditional Access — Microsoft Learn',
      url: 'https://learn.microsoft.com/entra/identity/conditional-access/overview',
      source: 'Microsoft',
      type: 'documentation',
    },
    {
      title: 'Require device compliance with CA',
      url: 'https://learn.microsoft.com/entra/identity/conditional-access/howto-conditional-access-policy-compliant-device',
      source: 'Microsoft',
      type: 'guide',
    },
  ],

  // ─── Module 8 — Android Enterprise avec Intune ──────────────────────────
  'introduction-android-enterprise': [
    {
      title: 'Android Enterprise Overview — Google',
      url: 'https://developer.android.com/work/overview',
      source: 'Google',
      type: 'documentation',
    },
    {
      title: 'Android Enterprise — Microsoft Learn',
      url: 'https://learn.microsoft.com/mem/intune/enrollment/android-enroll',
      source: 'Microsoft',
      type: 'documentation',
    },
  ],

  'android-work-profile': [
    {
      title: 'Work Profile — Google Android Enterprise',
      url: 'https://developer.android.com/work/managed-profiles',
      source: 'Google',
      type: 'documentation',
    },
    {
      title: 'Enroll Android Work Profile in Intune',
      url: 'https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll',
      source: 'Microsoft',
      type: 'documentation',
    },
  ],

  // ─── Module 10 — Gestion Moderne Apple ──────────────────────────────────
  'histoire-mdm-apple': [
    {
      title: 'Apple Platform Deployment',
      url: APPLE_PLATFORM_DEPLOYMENT_URL,
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Device Management — Apple Developer',
      url: 'https://developer.apple.com/documentation/devicemanagement',
      source: 'Apple',
      type: 'documentation',
    },
  ],

  'mdm-classique-vs-ddm': [
    APPLE_DDM_LINK,
    {
      title: 'Gestion déclarative des appareils (DDM)',
      url: JAMF_DDM_WHITEPAPER_URL,
      source: 'Jamf',
      type: 'guide',
    },
  ],

  'declarative-device-management': [
    APPLE_DDM_LINK,
    {
      title: 'Gestion déclarative des appareils (DDM)',
      url: JAMF_DDM_WHITEPAPER_URL,
      source: 'Jamf',
      type: 'guide',
    },
  ],

  'cloud-first-management': [
    {
      title: 'Apple Platform Deployment',
      url: APPLE_PLATFORM_DEPLOYMENT_URL,
      source: 'Apple',
      type: 'guide',
    },
    MODERN_APPLE_FUTURE_MDM_LINK,
  ],

  'device-trust-apple': [
    {
      title: 'Apple Platform Security',
      url: APPLE_PLATFORM_SECURITY_URL,
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Device Management — Apple Developer',
      url: 'https://developer.apple.com/documentation/devicemanagement',
      source: 'Apple',
      type: 'documentation',
    },
  ],

  'identity-access-management-apple': [
    {
      title: 'Managed Apple Accounts — Apple Support',
      url: 'https://support.apple.com/guide/apple-business-manager/welcome/web',
      source: 'Apple',
      type: 'documentation',
    },
    {
      title: 'Microsoft Learn — SC-300',
      url: MICROSOFT_SC300_URL,
      source: 'Microsoft',
      type: 'certification',
    },
  ],

  'jamf-connect-gestion-moderne': [
    {
      title: 'Jamf Connect Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-connect-documentation-current/page/Jamf_Connect_Documentation.html',
      source: 'Jamf',
      type: 'documentation',
    },
    MODERN_APPLE_FUTURE_MDM_LINK,
  ],

  'zero-trust-apple': [
    {
      title: 'Apple Platform Security',
      url: APPLE_PLATFORM_SECURITY_URL,
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Microsoft Learn — SC-300',
      url: MICROSOFT_SC300_URL,
      source: 'Microsoft',
      type: 'certification',
    },
  ],

  'conformite-moderne-apple': [
    {
      title: 'CIS Apple macOS Benchmarks',
      url: 'https://www.cisecurity.org/benchmark/apple_os',
      source: 'Apple',
      type: 'guide',
    },
    {
      title: 'Reporting & Compliance — Jamf Pro',
      url: getJamfProDocPageUrl('Reporting_and_Compliance'),
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'futur-mdm-apple': [
    MODERN_APPLE_FUTURE_MDM_LINK,
    APPLE_DDM_LINK,
  ],

  // ─── Module 9 — Certifications ──────────────────────────────────────────
  // Editorial pictograms live in public/icons/certifications/ (not official badges).
  'certification-apple-device-support': [
    {
      title: 'Apple Certifications — Training',
      url: 'https://training.apple.com/certification',
      source: 'Apple',
      type: 'certification',
    },
    {
      title: 'Pearson VUE — Apple Exams',
      url: 'https://home.pearsonvue.com/apple',
      source: 'Apple',
      type: 'certification',
    },
  ],

  'certification-apple-deployment': [
    {
      title: 'Apple Deployment and Management',
      url: 'https://training.apple.com/apple-deployment-and-management',
      source: 'Apple',
      type: 'certification',
    },
    {
      title: 'Pearson VUE — Apple Exams',
      url: 'https://home.pearsonvue.com/apple',
      source: 'Apple',
      type: 'certification',
    },
  ],

  'certification-jamf-170': [
    {
      title: 'Jamf 170 Course',
      url: 'https://training.jamf.com/details/jamf-170-course',
      source: 'Jamf',
      type: 'certification',
    },
    {
      title: 'Jamf Certifications Overview',
      url: 'https://www.jamf.com/training/certifications/',
      source: 'Jamf',
      type: 'certification',
    },
  ],

  'certification-jamf-100': [
    {
      title: 'Jamf 100 Course',
      url: 'https://training.jamf.com/details/jamf-100-course',
      source: 'Jamf',
      type: 'certification',
    },
    {
      title: 'Jamf Certifications Overview',
      url: 'https://www.jamf.com/training/certifications/',
      source: 'Jamf',
      type: 'certification',
    },
  ],

  'certification-jamf-200': [
    {
      title: 'Jamf 200 Course',
      url: 'https://training.jamf.com/details/jamf-200-course',
      source: 'Jamf',
      type: 'certification',
    },
  ],

  'certification-md-102': [
    {
      title: 'MD-102 Exam — Microsoft Learn',
      url: 'https://learn.microsoft.com/credentials/certifications/exams/md-102/',
      source: 'Microsoft',
      type: 'certification',
    },
    {
      title: 'MD-102 Study Guide',
      url: 'https://learn.microsoft.com/credentials/certifications/resources/study-guides/md-102',
      source: 'Microsoft',
      type: 'guide',
    },
  ],

  'certification-ms-102': [
    {
      title: 'MS-102 Exam — Microsoft Learn',
      url: 'https://learn.microsoft.com/credentials/certifications/exams/ms-102/',
      source: 'Microsoft',
      type: 'certification',
    },
    {
      title: 'Microsoft 365 Certified: Administrator Expert',
      url: 'https://learn.microsoft.com/credentials/certifications/m365-enterprise-administrator-expert/',
      source: 'Microsoft',
      type: 'certification',
    },
  ],
};

/**
 * Obtenir les liens officiels pour un cours donné
 */
export function getOfficialLinks(slug: string): OfficialLink[] {
  let links = OFFICIAL_LINKS[slug] ?? [];

  if (
    (isJamfProDocumentedCourse(slug) || isJamfEnrichedCourse(slug)) &&
    !links.some((link) => link.url === JAMF_LEARN_URL)
  ) {
    links = [JAMF_LEARN_LINK, ...links];
  }

  if (isJamfProDocumentedCourse(slug) && !links.some((link) => link.url === JAMF_PRO_DOCUMENTATION_URL)) {
    links = [JAMF_PRO_DOC_HUB_LINK, ...links];
  }

  if (isJamfProApiCourse(slug) && !links.some((link) => link.url === JAMF_PRO_API_OVERVIEW_URL)) {
    const docIndex = links.findIndex((link) => link.url === JAMF_PRO_DOCUMENTATION_URL);
    if (docIndex >= 0) {
      links = [
        ...links.slice(0, docIndex + 1),
        JAMF_PRO_API_OVERVIEW_LINK,
        ...links.slice(docIndex + 1),
      ];
    } else {
      links = [JAMF_PRO_API_OVERVIEW_LINK, ...links];
    }
  }

  if (isJamfSyncCourse(slug) && !links.some((link) => link.url === JAMF_SYNC_GITHUB_URL)) {
    links = [...links, JAMF_SYNC_LINK];
  }

  if (isModernAppleManagementCourse(slug) && !links.some((link) => link.url === MODERN_APPLE_FUTURE_MDM_URL)) {
    links = [MODERN_APPLE_FUTURE_MDM_LINK, ...links];
  }

  return links;
}

/**
 * Obtenir les liens par source
 */
export function getLinksBySource(source: OfficialLink['source']): OfficialLink[] {
  return Object.values(OFFICIAL_LINKS)
    .flat()
    .filter(link => link.source === source);
}
