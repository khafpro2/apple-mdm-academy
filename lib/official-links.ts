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
      title: 'Jamf Pro Documentation',
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Jamf_Pro_Documentation.html',
      source: 'Jamf',
      type: 'documentation',
      description: 'Documentation officielle Jamf Pro',
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
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Computer_Enrollment_Methods.html',
      source: 'Jamf',
      type: 'documentation',
    },
    {
      title: 'PreStage Enrollments for Computers',
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/PreStage_Enrollments_for_Computers.html',
      source: 'Jamf',
      type: 'documentation',
    },
  ],

  'configuration-profiles-jamf': [
    {
      title: 'Configuration Profiles Overview — Jamf Pro',
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Computer_Configuration_Profiles.html',
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

  'api-jamf-pro': [
    {
      title: 'Jamf Pro API Documentation',
      url: 'https://developer.jamf.com/jamf-pro/reference/jamf-pro-api',
      source: 'Jamf',
      type: 'documentation',
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
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/Scripts.html',
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
      url: 'https://learn.jamf.com/bundle/jamf-pro-documentation-current/page/FileVault_2.html',
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

  // ─── Module 9 — Certifications ──────────────────────────────────────────
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
      url: 'https://learn.microsoft.com/certifications/exams/md-102',
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
      url: 'https://learn.microsoft.com/certifications/exams/ms-102',
      source: 'Microsoft',
      type: 'certification',
    },
  ],
};

/**
 * Obtenir les liens officiels pour un cours donné
 */
export function getOfficialLinks(slug: string): OfficialLink[] {
  return OFFICIAL_LINKS[slug] ?? [];
}

/**
 * Obtenir les liens par source
 */
export function getLinksBySource(source: OfficialLink['source']): OfficialLink[] {
  return Object.values(OFFICIAL_LINKS)
    .flat()
    .filter(link => link.source === source);
}
