export type ResourceType = 'script' | 'profile' | 'policy' | 'template' | 'checklist' | 'reference';
export type ResourcePlatform = 'macOS' | 'iOS' | 'iPadOS' | 'Android' | 'Jamf Pro' | 'Jamf School' | 'Jamf Connect' | 'Intune' | 'ABM' | 'Multi-platform';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  platform: ResourcePlatform;
  tags: string[];
  content: string;        // The actual code / content
  filename: string;       // Suggested filename for download
  lastUpdated: string;
  complexity: 'Basique' | 'Intermédiaire' | 'Avancé';
  author: string;
  usageNotes?: string;
}

export const RESOURCES: Resource[] = [
  // ── Bash Scripts ───────────────────────────────────────────────────────────
  {
    id: 'bash-filevault-status',
    slug: 'filevault-status-check',
    title: 'Vérification statut FileVault',
    description: 'Script Bash qui vérifie le statut FileVault, l\'utilisateur activateur et la clé de récupération.',
    type: 'script',
    platform: 'macOS',
    tags: ['FileVault', 'Sécurité', 'Audit', 'macOS'],
    filename: 'check_filevault.sh',
    lastUpdated: '2025-01-15',
    complexity: 'Basique',
    author: 'MDM Academy',
    usageNotes: 'Exécuter avec les droits administrateur. Compatible macOS 12+.',
    content: `#!/bin/bash
# ─────────────────────────────────────────────────────────────
# FileVault Status Check
# MDM Academy — Bash Script
# Compatible : macOS 12 Monterey, 13 Ventura, 14 Sonoma, 15+
# ─────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_NAME="FileVault Status Check"
VERSION="1.2.0"

echo "┌─────────────────────────────────────────┐"
echo "│  $SCRIPT_NAME v$VERSION"
echo "└─────────────────────────────────────────┘"
echo ""

# Check FileVault status
FV_STATUS=$(fdesetup status 2>&1)
echo "▸ Statut FileVault : $FV_STATUS"

# Check if enabled
if echo "$FV_STATUS" | grep -q "FileVault is On"; then
    echo "  ✅ FileVault activé"
    FV_ENABLED=true
else
    echo "  ❌ FileVault désactivé"
    FV_ENABLED=false
fi

# Get activating user
if $FV_ENABLED; then
    ACTIVATING_USER=$(fdesetup list 2>/dev/null | head -1 | awk -F',' '{print $1}' || echo "N/A")
    echo "▸ Utilisateur activateur : $ACTIVATING_USER"
fi

# Check for personal recovery key
HAS_PRK=$(fdesetup hasinstitutionalrecoverykey 2>/dev/null | grep -c "true" || echo "0")
if [ "$HAS_PRK" = "1" ]; then
    echo "▸ Clé de récupération institutionnelle : ✅ présente"
else
    echo "▸ Clé de récupération institutionnelle : ⚠️  absente"
fi

# macOS version
OS_VER=$(sw_vers -productVersion)
echo "▸ macOS : $OS_VER"

# Hardware model
MODEL=$(system_profiler SPHardwareDataType 2>/dev/null | awk '/Model Name:/{print $NF, $(NF-1)}' || echo "N/A")
echo "▸ Modèle : $MODEL"

# Chip type
CHIP=$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "N/A")
echo "▸ Puce : $CHIP"

echo ""
echo "─────────────────────────────────────────"
if $FV_ENABLED; then
    echo "RÉSULTAT : Conforme ✅"
    exit 0
else
    echo "RÉSULTAT : Non conforme ❌ — Activer FileVault"
    exit 1
fi`,
  },
  {
    id: 'bash-inventory',
    slug: 'mac-inventory-export',
    title: 'Export inventaire Mac',
    description: 'Génère un inventaire complet du Mac au format JSON : matériel, logiciels, réseau, sécurité.',
    type: 'script',
    platform: 'macOS',
    tags: ['Inventaire', 'Audit', 'JSON', 'Reporting'],
    filename: 'mac_inventory.sh',
    lastUpdated: '2025-01-20',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    usageNotes: 'Sortie JSON compatible avec n\'importe quel outil d\'analyse.',
    content: `#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Mac Inventory Export — JSON output
# MDM Academy — Bash Script
# ─────────────────────────────────────────────────────────────

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
HOSTNAME=$(hostname -f)
SERIAL=$(system_profiler SPHardwareDataType 2>/dev/null | awk '/Serial Number/{print $NF}')
MODEL=$(system_profiler SPHardwareDataType 2>/dev/null | awk -F': ' '/Model Name/{print $2}')
OS=$(sw_vers -productVersion)
OS_BUILD=$(sw_vers -buildVersion)
RAM=$(system_profiler SPHardwareDataType 2>/dev/null | awk -F': ' '/Memory/{print $2}')
CPU=$(sysctl -n machdep.cpu.brand_string 2>/dev/null)
DISK_TOTAL=$(diskutil info / | awk -F': ' '/Container Total Space/{print $2}' | xargs)
DISK_FREE=$(diskutil info / | awk -F': ' '/Container Free Space/{print $2}' | xargs)
IP=$(ipconfig getifaddr en0 2>/dev/null || echo "")
MAC_ADDR=$(ifconfig en0 2>/dev/null | awk '/ether/{print $2}')
FV_STATUS=$(fdesetup status 2>/dev/null | head -1)
SIP_STATUS=$(csrutil status 2>/dev/null)
JAMF_VERSION=$(jamf version 2>/dev/null | awk '{print $NF}' || echo "N/A")

cat <<JSON
{
  "timestamp": "$TIMESTAMP",
  "hostname": "$HOSTNAME",
  "hardware": {
    "serial": "$SERIAL",
    "model": "$MODEL",
    "cpu": "$CPU",
    "ram": "$RAM",
    "disk_total": "$DISK_TOTAL",
    "disk_free": "$DISK_FREE"
  },
  "os": {
    "version": "$OS",
    "build": "$OS_BUILD"
  },
  "network": {
    "ip_en0": "$IP",
    "mac_en0": "$MAC_ADDR"
  },
  "security": {
    "filevault": "$FV_STATUS",
    "sip": "$SIP_STATUS"
  },
  "mdm": {
    "jamf_version": "$JAMF_VERSION"
  }
}
JSON`,
  },
  {
    id: 'bash-gatekeeper',
    slug: 'gatekeeper-policy-check',
    title: 'Audit Gatekeeper & XProtect',
    description: 'Vérifie la configuration Gatekeeper, XProtect, les versions de signatures et la conformité.',
    type: 'script',
    platform: 'macOS',
    tags: ['Gatekeeper', 'XProtect', 'Sécurité', 'CIS'],
    filename: 'gatekeeper_audit.sh',
    lastUpdated: '2025-02-01',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    content: `#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Gatekeeper & XProtect Audit
# MDM Academy — Bash Script
# Réf: CIS Apple macOS Benchmark — Controls 2.6.x
# ─────────────────────────────────────────────────────────────

PASS=0; FAIL=0; WARN=0

check() {
    local ctrl="$1" desc="$2" result="$3" expected="$4"
    if [ "$result" = "$expected" ]; then
        echo "✅ [$ctrl] $desc"
        ((PASS++))
    else
        echo "❌ [$ctrl] $desc — Attendu: '$expected', Obtenu: '$result'"
        ((FAIL++))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Gatekeeper & XProtect Audit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Gatekeeper status
GK=$(spctl --status 2>/dev/null | grep -c "assessments enabled" || echo "0")
check "2.6.1" "Gatekeeper activé" "$GK" "1"

# XProtect version
XP_VER=$(system_profiler SPInstallHistoryDataType 2>/dev/null | awk '/XProtectPlistConfigData/{getline; print $NF}' | head -1)
[ -n "$XP_VER" ] && echo "ℹ️  XProtect version : $XP_VER" || ((WARN++))

# MRT version
MRT_VER=$(defaults read /Library/Apple/System/Library/CoreServices/MRT.app/Contents/version.plist CFBundleShortVersionString 2>/dev/null || echo "N/A")
echo "ℹ️  MRT version : $MRT_VER"

# Notarization check (system integrity)
SIP=$(csrutil status 2>/dev/null | grep -c "enabled" || echo "0")
check "1.1" "SIP (System Integrity Protection)" "$SIP" "1"

# Auto-updates
AUTO_DL=$(defaults read /Library/Preferences/com.apple.SoftwareUpdate AutomaticDownload 2>/dev/null || echo "0")
check "1.2" "Téléchargement automatique mises à jour" "$AUTO_DL" "1"

AUTO_SEC=$(defaults read /Library/Preferences/com.apple.SoftwareUpdate ConfigDataInstall 2>/dev/null || echo "0")
check "1.3" "Installation auto données de sécurité" "$AUTO_SEC" "1"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Résultats : ✅ $PASS  ❌ $FAIL  ⚠️  $WARN"
[ "$FAIL" -gt 0 ] && exit 1 || exit 0`,
  },

  // ── Configuration Profiles ─────────────────────────────────────────────────
  {
    id: 'profile-restrictions-ios',
    slug: 'ios-restrictions-profile',
    title: 'Profil de restrictions iOS/iPadOS',
    description: 'Configuration Profile XML pour restreindre les fonctionnalités iOS en entreprise : App Store, iCloud, Siri, etc.',
    type: 'profile',
    platform: 'iOS',
    tags: ['iOS', 'iPadOS', 'Restrictions', 'Configuration Profile'],
    filename: 'iOS_Restrictions_Enterprise.mobileconfig',
    lastUpdated: '2025-01-10',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    usageNotes: 'Remplacez PayloadOrganization et le UUID avant déploiement.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <!-- ── Restrictions payload ── -->
      <key>PayloadType</key>
      <string>com.apple.applicationaccess</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.yourorg.restrictions.ios</string>
      <key>PayloadUUID</key>
      <string>GENERATE-A-UUID-HERE</string>

      <!-- App Store & purchases -->
      <key>allowAppInstallation</key>
      <true/>
      <key>allowInAppPurchases</key>
      <false/>
      <key>ratingRegion</key>
      <string>fr</string>
      <key>ratingMovies</key>
      <integer>1000</integer>
      <key>ratingApps</key>
      <integer>1000</integer>

      <!-- iCloud -->
      <key>allowCloudBackup</key>
      <false/>
      <key>allowCloudDocumentSync</key>
      <false/>
      <key>allowManagedAppsCloudSync</key>
      <true/>

      <!-- Screen capture / recording -->
      <key>allowScreenShot</key>
      <true/>

      <!-- Safari -->
      <key>allowSafari</key>
      <true/>
      <key>safariAllowAutoFill</key>
      <false/>

      <!-- Passcode enforcement -->
      <key>forcePIN</key>
      <true/>
      <key>maxPINAgeInDays</key>
      <integer>90</integer>
      <key>minPINLength</key>
      <integer>6</integer>
      <key>maxFailedAttempts</key>
      <integer>10</integer>

      <!-- AirDrop -->
      <key>allowAirDrop</key>
      <false/>

      <!-- USB / accessories -->
      <key>allowUSBRestrictedMode</key>
      <false/>
    </dict>
  </array>

  <key>PayloadDisplayName</key>
  <string>Restrictions entreprise iOS</string>
  <key>PayloadDescription</key>
  <string>Restrictions de sécurité iOS/iPadOS pour le parc d'entreprise</string>
  <key>PayloadIdentifier</key>
  <string>com.yourorg.profile.ios-restrictions</string>
  <key>PayloadOrganization</key>
  <string>Votre Organisation</string>
  <key>PayloadRemovalDisallowed</key>
  <true/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>GENERATE-A-UUID-HERE</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`,
  },
  {
    id: 'profile-filevault-macos',
    slug: 'filevault-enable-profile',
    title: 'Profil activation FileVault (macOS)',
    description: 'Configuration Profile pour forcer l\'activation de FileVault avec escrow de la clé vers le MDM.',
    type: 'profile',
    platform: 'macOS',
    tags: ['FileVault', 'macOS', 'Chiffrement', 'Configuration Profile'],
    filename: 'FileVault_Enable_Enterprise.mobileconfig',
    lastUpdated: '2025-01-18',
    complexity: 'Avancé',
    author: 'MDM Academy',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.apple.MCX.FileVault2</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.yourorg.filevault</string>
      <key>PayloadUUID</key>
      <string>GENERATE-A-UUID-HERE</string>

      <!-- Enable FileVault -->
      <key>Enable</key>
      <string>On</string>

      <!-- Institutional recovery key (replace with your cert) -->
      <key>UseRecoveryKey</key>
      <true/>
      <key>PayloadCertificateUUID</key>
      <string>YOUR-CERT-PAYLOAD-UUID</string>

      <!-- Escrow personal recovery key to MDM -->
      <key>DeferEnableAtUserLoginOnly</key>
      <true/>
      <key>DeferForceAtUserLoginMaxBypassAttempts</key>
      <integer>-1</integer>
    </dict>
  </array>

  <key>PayloadDisplayName</key>
  <string>FileVault — Activation obligatoire</string>
  <key>PayloadDescription</key>
  <string>Active FileVault et escrow la clé de récupération vers le MDM</string>
  <key>PayloadIdentifier</key>
  <string>com.yourorg.profile.filevault</string>
  <key>PayloadOrganization</key>
  <string>Votre Organisation</string>
  <key>PayloadRemovalDisallowed</key>
  <true/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>GENERATE-A-UUID-HERE</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`,
  },

  // ── Intune Policies ────────────────────────────────────────────────────────
  {
    id: 'intune-compliance-macos',
    slug: 'intune-compliance-macos',
    title: 'Politique de conformité macOS — Intune',
    description: 'JSON de politique de conformité Intune pour macOS : FileVault, Gatekeeper, mot de passe, version OS.',
    type: 'policy',
    platform: 'Intune',
    tags: ['Intune', 'macOS', 'Compliance', 'JSON'],
    filename: 'intune_compliance_macos.json',
    lastUpdated: '2025-02-05',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    usageNotes: 'Importer via Microsoft Intune admin center > Devices > Compliance policies.',
    content: `{
  "displayName": "MDM Academy — macOS Compliance Policy",
  "description": "Politique de conformité macOS standard — FileVault, Gatekeeper, passcode",
  "platform": "macOS",
  "@odata.type": "#microsoft.graph.macOSCompliancePolicy",
  "scheduledActionsForRule": [
    {
      "ruleName": "PasswordRequired",
      "scheduledActionConfigurations": [
        {
          "actionType": "block",
          "gracePeriodHours": 24,
          "notificationTemplateId": ""
        }
      ]
    }
  ],
  "passwordRequired": true,
  "passwordBlockSimple": true,
  "passwordMinimumLength": 8,
  "passwordMinimumCharacterSetCount": 3,
  "passwordRequiredType": "deviceDefault",
  "passwordMinutesOfInactivityBeforeLock": 5,
  "passwordExpirationDays": 90,
  "passwordPreviousPasswordBlockCount": 5,
  "osMinimumVersion": "14.0",
  "osMaximumVersion": null,
  "systemIntegrityProtectionEnabled": true,
  "deviceThreatProtectionEnabled": false,
  "deviceThreatProtectionRequiredSecurityLevel": "unavailable",
  "storageRequireEncryption": true,
  "gatekeeperAllowedAppSource": "macAppStoreAndIdentifiedDevelopers",
  "firewallEnabled": true,
  "firewallBlockAllIncoming": false,
  "firewallEnableStealthMode": true
}`,
  },
  {
    id: 'intune-android-work-profile',
    slug: 'intune-android-work-profile-policy',
    title: 'Politique Android Work Profile — Intune',
    description: 'Configuration JSON pour Android Work Profile avec Intune : restrictions, conformité, chiffrement.',
    type: 'policy',
    platform: 'Android',
    tags: ['Android', 'Work Profile', 'Intune', 'JSON'],
    filename: 'intune_android_work_profile.json',
    lastUpdated: '2025-02-10',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    content: `{
  "displayName": "MDM Academy — Android Work Profile Policy",
  "description": "Configuration Android Enterprise Work Profile standard",
  "@odata.type": "#microsoft.graph.androidWorkProfileGeneralDeviceConfiguration",
  "passwordBlockFingerprintUnlock": false,
  "passwordBlockTrustAgents": true,
  "passwordExpirationDays": 90,
  "passwordMinimumLength": 6,
  "passwordMinutesOfInactivityBeforeScreenTimeout": 5,
  "passwordPreviousPasswordBlockCount": 5,
  "passwordSignInFailureCountBeforeFactoryReset": 10,
  "passwordRequiredType": "deviceDefault",
  "workProfileDataSharingType": "allowPersonalToWork",
  "workProfileBlockNotificationsWhileDeviceLocked": true,
  "workProfileBlockAddingAccounts": false,
  "workProfileBluetoothEnableContactSharing": false,
  "workProfileBlockScreenCapture": false,
  "workProfileBlockCrossProfileCallerId": false,
  "workProfileBlockCamera": false,
  "workProfileBlockCrossProfileContactsSearch": false,
  "workProfileBlockCrossProfileCopyPaste": true,
  "workProfileDefaultAppPermissionPolicy": "deviceDefault",
  "workProfilePasswordBlockFingerprintUnlock": false,
  "workProfilePasswordBlockTrustAgents": true,
  "workProfilePasswordExpirationDays": 90,
  "workProfilePasswordMinimumLength": 6,
  "workProfilePasswordMinNumericCharacters": 1,
  "workProfilePasswordRequiredType": "deviceDefault",
  "workProfilePasswordSignInFailureCountBeforeFactoryReset": 10,
  "workProfileRequirePassword": true
}`,
  },

  // ── Android Enterprise Templates ──────────────────────────────────────────
  {
    id: 'android-ent-fully-managed',
    slug: 'android-fully-managed-checklist',
    title: 'Checklist Android Fully Managed',
    description: 'Checklist complète pour le déploiement d\'appareils Android Fully Managed avec Microsoft Intune.',
    type: 'checklist',
    platform: 'Android',
    tags: ['Android', 'Fully Managed', 'Intune', 'Déploiement'],
    filename: 'android_fully_managed_checklist.md',
    lastUpdated: '2025-01-25',
    complexity: 'Intermédiaire',
    author: 'MDM Academy',
    content: `# Checklist — Android Fully Managed (Intune)

## Prérequis
- [ ] Android Enterprise activé dans Microsoft Intune
- [ ] Managed Google Play lié à Intune
- [ ] Compte Google Workspace ou Google account dédié
- [ ] Appareils Android 8.0+ (recommandé : 10+)

## Enrollment Profile
- [ ] Créer un profil d'enrollment "Fully Managed"
- [ ] Générer le QR code ou token d'enrollment
- [ ] Configurer l'URL Managed Google Play
- [ ] Activer l'enrollment automatique si NFC disponible

## Configuration Profiles
- [ ] Profil Wi-Fi d'entreprise déployé
- [ ] Certificats racine déployés
- [ ] VPN configuré (si nécessaire)
- [ ] Email professionnel configuré

## Applications
- [ ] Applications obligatoires ajoutées au Managed Google Play
- [ ] Kiosque configuré si usage dédié
- [ ] Mise à jour automatique activée
- [ ] Applications personnelles autorisées listées

## Sécurité
- [ ] Politique de mot de passe configurée (min. 6 caractères)
- [ ] Chiffrement de l'appareil vérifié
- [ ] Wipe entreprise testé
- [ ] Compliance policy créée et assignée

## Test final
- [ ] Enrôlement testé sur appareil physique
- [ ] Applications disponibles dans Play Store managé
- [ ] Profil Wi-Fi fonctionnel
- [ ] Conditional Access testé (accès bloqué si non conforme)
- [ ] Unenrollment testé et résultat vérifié
`,
  },

  // ── Jamf Scripts ──────────────────────────────────────────────────────────
  {
    id: 'jamf-api-device-lookup',
    slug: 'jamf-api-device-lookup',
    title: 'Lookup appareil via API Jamf Pro',
    description: 'Script Bash pour interroger l\'API Jamf Pro (Bearer Token) et récupérer les infos d\'un appareil par numéro de série.',
    type: 'script',
    platform: 'Jamf Pro',
    tags: ['Jamf Pro', 'API', 'Bash', 'Automatisation'],
    filename: 'jamf_api_device_lookup.sh',
    lastUpdated: '2025-02-15',
    complexity: 'Avancé',
    author: 'MDM Academy',
    usageNotes: 'Nécessite jq installé. Variables JAMF_URL, API_USER, API_PASS à définir.',
        content: [
      '#!/bin/bash',
      '# ─────────────────────────────────────────────────────────────',
      '# Jamf Pro API — Device Lookup by Serial Number',
      '# MDM Academy — Requires: jq, curl',
      '# API: Jamf Pro 10.35+ (Bearer Token)',
      '# ─────────────────────────────────────────────────────────────',
      '',
      'set -euo pipefail',
      '',
      '# Configuration',
      'JAMF_URL="${JAMF_URL:-https://your-instance.jamfcloud.com}"',
      'API_USER="${API_USER:-api_user}"',
      'API_PASS="${API_PASS:-your_password}"',
      'SERIAL="${1:-}"',
      '',
      'if [ -z "$SERIAL" ]; then',
      '    echo "Usage: $0 <serial_number>"',
      '    exit 1',
      'fi',
      '',
      '# Get Bearer Token',
      'echo "Obtention du token Bearer..."',
      'TOKEN_RESPONSE=$(curl -s -X POST \\',
      '    -u "$API_USER:$API_PASS" \\',
      '    "$JAMF_URL/api/v1/auth/token" \\',
      '    -H "Content-Type: application/json")',
      '',
      'TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r \'.token // empty\')',
      '',
      'if [ -z "$TOKEN" ]; then',
      '    echo "Impossible d obtenir un token."',
      '    exit 1',
      'fi',
      'echo "Token obtenu"',
      '',
      '# Lookup device',
      'echo "Recherche appareil serial: $SERIAL"',
      'DEVICE=$(curl -s \\',
      '    -H "Authorization: Bearer $TOKEN" \\',
      '    -H "Accept: application/json" \\',
      '    "$JAMF_URL/api/v1/computers-preview?filter=hardware.serialNumber==$SERIAL")',
      '',
      'echo "$DEVICE" | jq \'.results[0]\'',
      '',
      '# Invalidate token',
      'curl -s -X DELETE \\',
      '    -H "Authorization: Bearer $TOKEN" \\',
      '    "$JAMF_URL/api/v1/auth/invalidate-token" > /dev/null',
      'echo "Token invalide"',
    ].join('\n'),  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getAllResources(): Resource[] { return RESOURCES; }

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return RESOURCES.filter((r) => r.type === type);
}

export function getResourcesByPlatform(platform: ResourcePlatform): Resource[] {
  return RESOURCES.filter((r) => r.platform === platform);
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  script:    '⚙️ Script Bash',
  profile:   '📋 Config Profile',
  policy:    '🛡️ Politique',
  template:  '📐 Template',
  checklist: '✅ Checklist',
  reference: '📖 Référence',
};

export const RESOURCE_PLATFORMS = [
  'macOS', 'iOS', 'iPadOS', 'Android', 'Jamf Pro', 'Jamf School', 'Intune', 'ABM',
] as const;
