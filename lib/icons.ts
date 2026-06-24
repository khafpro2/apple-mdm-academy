/**
 * Apple MDM Academy — Icon registry
 * Editorial pictograms only — not official certification badges or trademarks.
 */

import type { Tool } from '@/lib/courses';

const CERT_BASE = '/icons/certifications';
const PRODUCT_BASE = '/icons/products';
const MODULE_BASE = '/icons/modules';

// ─── Certifications ─────────────────────────────────────────────────────────

export const CERT_ICONS = {
  apple: {
    provider: `${CERT_BASE}/apple.svg`,
    deviceSupport: `${CERT_BASE}/apple-device-support.svg`,
    supportProfessional: `${CERT_BASE}/apple-certified-support-professional.svg`,
    deploymentManagement: `${CERT_BASE}/apple-deployment-and-management.svg`,
    itProfessional: `${CERT_BASE}/apple-certified-it-professional.svg`,
  },
  jamf: {
    provider: `${CERT_BASE}/jamf.svg`,
    100: `${CERT_BASE}/jamf-100.svg`,
    140: `${CERT_BASE}/jamf-140.svg`,
    170: `${CERT_BASE}/jamf-170.svg`,
    200: `${CERT_BASE}/jamf-200.svg`,
    240: `${CERT_BASE}/jamf-240.svg`,
    270: `${CERT_BASE}/jamf-270.svg`,
    300: `${CERT_BASE}/jamf-300.svg`,
    370: `${CERT_BASE}/jamf-370.svg`,
    400: `${CERT_BASE}/jamf-400.svg`,
  },
  microsoft: {
    provider: `${CERT_BASE}/microsoft.svg`,
    md102: `${CERT_BASE}/md-102.svg`,
    ms102: `${CERT_BASE}/ms-102.svg`,
    sc300: `${CERT_BASE}/sc-300.svg`,
    sc900: `${CERT_BASE}/sc-900.svg`,
  },
} as const;

export const PROVIDER_ICON_PATHS = {
  Apple: CERT_ICONS.apple.provider,
  Jamf: CERT_ICONS.jamf.provider,
  Microsoft: CERT_ICONS.microsoft.provider,
} as const;

// ─── Products ───────────────────────────────────────────────────────────────

export const PRODUCT_ICONS: Record<
  | 'Apple Business Manager'
  | 'Jamf Pro'
  | 'Jamf Protect'
  | 'Jamf Connect'
  | 'Jamf School'
  | 'Jamf Security Cloud'
  | 'Jamf API'
  | 'Apple DDM'
  | 'Microsoft Intune'
  | 'Android Enterprise',
  string
> = {
  'Apple Business Manager': `${PRODUCT_BASE}/apple-business-manager.svg`,
  'Apple DDM': `${PRODUCT_BASE}/apple-ddm.svg`,
  'Jamf Pro': `${PRODUCT_BASE}/jamf-pro.svg`,
  'Jamf Protect': `${PRODUCT_BASE}/jamf-protect.svg`,
  'Jamf Connect': `${PRODUCT_BASE}/jamf-connect.svg`,
  'Jamf School': `${PRODUCT_BASE}/jamf-school.svg`,
  'Jamf Security Cloud': `${PRODUCT_BASE}/jamf-security-cloud.svg`,
  'Jamf API': `${PRODUCT_BASE}/jamf-api.svg`,
  'Microsoft Intune': `${PRODUCT_BASE}/microsoft-intune.svg`,
  'Android Enterprise': `${PRODUCT_BASE}/android-enterprise.svg`,
};

const TOOL_TO_PRODUCT: Partial<Record<Tool, keyof typeof PRODUCT_ICONS>> = {
  'Apple Business Manager': 'Apple Business Manager',
  'Jamf Pro': 'Jamf Pro',
  'Jamf Protect': 'Jamf Protect',
  'Jamf Connect': 'Jamf Connect',
  'Jamf School': 'Jamf School',
  'Jamf Security Cloud': 'Jamf Security Cloud',
  'Microsoft Intune': 'Microsoft Intune',
  'Android Enterprise': 'Android Enterprise',
};

export function getProductIconSrc(product: keyof typeof PRODUCT_ICONS): string {
  return PRODUCT_ICONS[product];
}

export function getToolIconSrc(tool: Tool): string | undefined {
  const key = TOOL_TO_PRODUCT[tool];
  return key ? PRODUCT_ICONS[key] : undefined;
}

// ─── Modules ────────────────────────────────────────────────────────────────

export const MODULE_ICON_PATHS: Record<string, string> = {
  'fondations-apple-enterprise': `${MODULE_BASE}/fondations-apple-enterprise.svg`,
  'administration-macos-jamf-pro': `${MODULE_BASE}/administration-macos-jamf-pro.svg`,
  'automatisation-jamf-pro': `${MODULE_BASE}/automatisation-jamf-pro.svg`,
  'securite-apple-jamf': `${MODULE_BASE}/securite-apple-jamf.svg`,
  'jamf-school': `${MODULE_BASE}/jamf-school.svg`,
  'jamf-connect': `${MODULE_BASE}/jamf-connect.svg`,
  'microsoft-intune-apple': `${MODULE_BASE}/microsoft-intune-apple.svg`,
  'android-enterprise-intune': `${MODULE_BASE}/android-enterprise-intune.svg`,
  certifications: `${MODULE_BASE}/certifications.svg`,
  'gestion-moderne-apple': `${MODULE_BASE}/gestion-moderne-apple.svg`,
};

export function getModuleIconSrc(moduleSlug: string): string {
  return MODULE_ICON_PATHS[moduleSlug] ?? `${MODULE_BASE}/default.svg`;
}

export type ProductIconKey = keyof typeof PRODUCT_ICONS;

/** Homepage technology strip — same products as PRODUCT_ICONS subset */
export const HOMEPAGE_TOOLS = [
  { name: 'Apple Business Manager' as const, short: 'ABM', iconSrc: PRODUCT_ICONS['Apple Business Manager'] },
  { name: 'Jamf Pro' as const, short: 'Jamf Pro', iconSrc: PRODUCT_ICONS['Jamf Pro'] },
  { name: 'Jamf Protect' as const, short: 'Protect', iconSrc: PRODUCT_ICONS['Jamf Protect'] },
  { name: 'Jamf Connect' as const, short: 'Connect', iconSrc: PRODUCT_ICONS['Jamf Connect'] },
  { name: 'Jamf School' as const, short: 'School', iconSrc: PRODUCT_ICONS['Jamf School'] },
  { name: 'Jamf Security Cloud' as const, short: 'JSC', iconSrc: PRODUCT_ICONS['Jamf Security Cloud'] },
  { name: 'Microsoft Intune' as const, short: 'Intune', iconSrc: PRODUCT_ICONS['Microsoft Intune'] },
  { name: 'Android Enterprise' as const, short: 'Android', iconSrc: PRODUCT_ICONS['Android Enterprise'] },
] as const;
