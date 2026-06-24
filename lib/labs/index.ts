/**
 * Apple MDM Academy — Labs interactifs Bash/Jamf
 * Simulation côté client — aucune exécution réelle
 */

import {
  getJamfProDocPageUrl,
  JAMF_PRO_API_OVERVIEW_URL,
  APPLE_DDM_DOCUMENTATION_URL,
  MODERN_APPLE_FUTURE_MDM_URL,
} from '@/lib/official-links';

export interface LabDocReference {
  title: string;
  url: string;
  summary: string;
}

export interface LabCommand {
  command: string;         // Commande exacte ou pattern (commençant par "regex:")
  output: string;          // Sortie simulée
  isCorrect?: boolean;     // Commande qui résout l'exercice
  hint?: string;           // Indice si la commande est incorrecte
  partial?: boolean;       // Commande partiellement correcte (aide)
}

export interface Lab {
  id: string;
  courseSlug: string;      // Slug du cours associé
  title: string;
  description: string;
  context: string;         // Contexte affiché dans le terminal (hostname, OS...)
  objective: string;       // Ce que l'apprenant doit accomplir
  commands: LabCommand[];  // Commandes acceptées + outputs simulés
  successCommands: string[]; // Commandes qui marquent le lab comme réussi
  xpReward: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  tags: string[];
  docReference?: LabDocReference;
}

// ─── Lab 1 — FileVault ────────────────────────────────────────────────────
export const LAB_FILEVAULT: Lab = {
  id: 'lab-filevault-status',
  courseSlug: 'filevault-gestion-jamf',
  title: 'Vérifier l\'état de FileVault',
  description: 'Utilisez la ligne de commande pour diagnostiquer l\'état du chiffrement FileVault sur un Mac.',
  context: 'MacBook-Pro-RH ~ % ',
  objective: 'Trouver la commande pour vérifier si FileVault est activé sur ce Mac',
  level: 'Débutant',
  tags: ['FileVault', 'macOS', 'Sécurité'],
  xpReward: 50,
  successCommands: ['fdesetup status'],
  commands: [
    {
      command: 'fdesetup status',
      output: 'FileVault is On.',
      isCorrect: true,
    },
    {
      command: 'fdesetup help',
      output: `Usage: fdesetup [OPTIONS] COMMAND ...

Commands:
  enable          Turn on FileVault
  disable         Turn off FileVault
  status          Return current status
  list            List enabled users
  remove          Remove a user from FileVault
  changerecovery  Change personal recovery key
  showrecovery    Show recovery key (if escrowed)
  validaterecovery Validate recovery key

Options:
  -defer <file>   Defer enabling FileVault`,
      partial: true,
      hint: 'Vous avez la bonne commande (fdesetup), essayez maintenant "fdesetup status"',
    },
    {
      command: 'diskutil cs list',
      output: 'No CoreStorage logical volume groups found',
      hint: 'diskutil cs est pour l\'ancien système CoreStorage. Sur APFS (Mac modernes), utilisez "fdesetup status"',
    },
    {
      command: 'system_profiler SPStorageDataType',
      output: `Storage:

    Macintosh HD:
      Capacity: 494.38 GB (494,384,795,648 bytes)
      Mount Point: /
      File System: APFS
      Encrypted: Yes
      BSD Name: disk3s1
      Available: 287.12 GB (287,121,203,200 bytes)`,
      partial: true,
      hint: 'Bonne approche ! Vous pouvez voir "Encrypted: Yes". La commande spécifique pour FileVault est "fdesetup status"',
    },
    {
      command: 'sudo fdesetup status',
      output: 'FileVault is On.',
      isCorrect: true,
    },
    {
      command: 'ls',
      output: 'Desktop   Documents   Downloads   Library   Movies   Music   Pictures',
    },
    {
      command: 'whoami',
      output: 'adm.martin',
    },
    {
      command: 'sw_vers',
      output: `ProductName:		macOS
ProductVersion:		14.5
BuildVersion:		23F79`,
    },
  ],
};

// ─── Lab 2 — Connexion Jamf Pro ───────────────────────────────────────────
export const LAB_JAMF_CONNECTION: Lab = {
  id: 'lab-jamf-connection',
  courseSlug: 'introduction-jamf-pro',
  title: 'Vérifier la connexion Jamf Pro',
  description: 'Diagnostiquez la connectivité entre ce Mac et le serveur Jamf Pro de votre organisation.',
  context: 'MacBook-Pro-IT ~ % ',
  objective: 'Vérifier que ce Mac peut communiquer avec le serveur Jamf Pro',
  level: 'Débutant',
  tags: ['Jamf Pro', 'MDM', 'Diagnostic'],
  xpReward: 50,
  successCommands: ['sudo jamf checkJSSConnection', 'jamf checkJSSConnection'],
  docReference: {
    title: 'Documentation Jamf Pro — Jamf Learn',
    url: getJamfProDocPageUrl('Getting_Started_with_Jamf_Pro'),
    summary:
      'Le binaire jamf et la commande checkJSSConnection sont documentés dans la section administration Jamf Pro.',
  },
  commands: [
    {
      command: 'sudo jamf checkJSSConnection',
      output: `Checking server connection...
  URL: https://jamf.votreentreprise.com
  Product Version: 11.8.1-t1716561600
  
The JSS is available.`,
      isCorrect: true,
    },
    {
      command: 'jamf checkJSSConnection',
      output: `Checking server connection...
  URL: https://jamf.votreentreprise.com
  Product Version: 11.8.1-t1716561600
  
The JSS is available.`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf version',
      output: 'jamf binary version: 11.8.1-t1716561600',
      partial: true,
      hint: 'La version est affichée. Pour vérifier la connexion au serveur, utilisez "sudo jamf checkJSSConnection"',
    },
    {
      command: 'sudo jamf help',
      output: `Usage: jamf verb [options]

Verbs:
  checkJSSConnection  Check the connection to the Jamf Pro server
  recon               Update inventory
  policy              Run a policy
  manage              Ensure the device is managed
  removeFramework     Remove Jamf from this computer
  
Use "jamf help <verb>" for more information on a specific command.`,
      partial: true,
      hint: 'Vous avez listé les verbes. La commande de vérification est "sudo jamf checkJSSConnection"',
    },
    {
      command: 'sudo jamf recon',
      output: `Recon started...
  Gathering hardware information...
  Gathering application information (412 apps)...
  Submitting data to https://jamf.votreentreprise.com...
Recon Completed.`,
      partial: true,
      hint: 'Recon fonctionne (le serveur est accessible). Pour une vérification dédiée : "sudo jamf checkJSSConnection"',
    },
    {
      command: 'ls /usr/local/bin/ | grep jamf',
      output: 'jamf',
    },
    {
      command: 'cat /Library/Preferences/com.jamfsoftware.jamf.plist',
      output: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>jss_url</key>
  <string>https://jamf.votreentreprise.com/</string>
</dict>
</plist>`,
      partial: true,
      hint: 'L\'URL du serveur est configurée. Vérifiez la connexion avec "sudo jamf checkJSSConnection"',
    },
  ],
};

// ─── Lab 3 — Gatekeeper ───────────────────────────────────────────────────
export const LAB_GATEKEEPER: Lab = {
  id: 'lab-gatekeeper-status',
  courseSlug: 'gatekeeper-xprotect-jamf',
  title: 'Auditer Gatekeeper',
  description: 'Vérifiez l\'état de Gatekeeper et testez la validation d\'une application sur ce Mac.',
  context: 'MacBook-Air-DEV ~ % ',
  objective: 'Vérifier que Gatekeeper est activé et évaluer une application',
  level: 'Intermédiaire',
  tags: ['Gatekeeper', 'Sécurité', 'macOS'],
  xpReward: 75,
  successCommands: ['spctl --status', 'spctl --assess -v /Applications/Safari.app'],
  commands: [
    {
      command: 'spctl --status',
      output: 'assessments enabled',
      isCorrect: true,
    },
    {
      command: 'spctl --assess -v /Applications/Safari.app',
      output: `/Applications/Safari.app: accepted
source=Apple System`,
      isCorrect: true,
    },
    {
      command: 'spctl --master-enable',
      output: '(aucune sortie — Gatekeeper activé avec succès)',
      partial: true,
      hint: 'Cette commande active Gatekeeper. Pour vérifier son état actuel : "spctl --status"',
    },
    {
      command: 'spctl --master-disable',
      output: '(aucune sortie — Gatekeeper désactivé ! Ce n\'est pas recommandé en production)',
      hint: 'Attention : cette commande désactive Gatekeeper. Réactivez avec "spctl --master-enable"',
    },
    {
      command: 'spctl --help',
      output: `Usage: spctl [--options] [--] [<file> ...]
       spctl --add [--type type] [--path] <file>
       spctl --remove [--type type] [--path] <file>
       spctl --status | --master-enable | --master-disable
       spctl --assess [--type type] [-v] <file>`,
      partial: true,
      hint: 'Voici les options de spctl. Pour vérifier l\'état : "spctl --status"',
    },
    {
      command: 'xattr -l /Applications/Safari.app',
      output: '(pas d\'attributs étendus — application Apple native non marquée)',
    },
    {
      command: 'codesign -dv /Applications/Safari.app',
      output: `Executable=/Applications/Safari.app/Contents/MacOS/Safari
Identifier=com.apple.Safari
Format=app bundle with Mach-O universal (x86_64 arm64)
CodeDirectory v=20400 size=668 flags=0x0(none) hashes=4+7 location=embedded
Signature size=4523
Authority=Software Signing
Authority=Apple Code Signing Certification Authority
Authority=Apple Root CA
Timestamp=20 janv. 2025 à 14:32:18
Info.plist entries=38
TeamIdentifier=not set
Sealed Resources version=2 rules=13 files=2831
Internal requirements count=1 size=68`,
    },
  ],
};

// ─── Lab 4 — Inventaire Jamf ──────────────────────────────────────────────
export const LAB_JAMF_INVENTORY: Lab = {
  id: 'lab-jamf-recon',
  courseSlug: 'reporting-conformite-jamf',
  title: 'Forcer un inventaire Jamf',
  description: 'Déclenchez manuellement une mise à jour de l\'inventaire vers le serveur Jamf Pro.',
  context: 'MacBook-Pro-COMPTA ~ % ',
  objective: 'Forcer la remontée de l\'inventaire de ce Mac vers Jamf Pro',
  level: 'Débutant',
  tags: ['Jamf Pro', 'Inventaire', 'Recon'],
  xpReward: 50,
  successCommands: ['sudo jamf recon', 'sudo jamf recon -verbose'],
  docReference: {
    title: 'Inventory — Jamf Pro',
    url: getJamfProDocPageUrl('Inventory'),
    summary:
      'jamf recon force la collecte d\'inventaire (hardware, apps, EA). Voir la doc officielle pour les champs remontés.',
  },
  commands: [
    {
      command: 'sudo jamf recon',
      output: `Recon started...
  Gathering hardware information...
    Model: MacBook Pro (16-inch, Nov 2023)
    Serial: C02XK2JABCD
    RAM: 36 GB
    Storage: 1 TB SSD
  Gathering OS information...
    macOS 14.5 (23F79)
  Gathering application information (523 apps)...
  Gathering user information...
  Gathering network information...
  Submitting data to https://jamf.votreentreprise.com...
Recon Completed.`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf recon -verbose',
      output: `Recon started (verbose mode)...
[DEBUG] Authenticating with Jamf Pro server...
[DEBUG] Connection established: https://jamf.votreentreprise.com
[INFO]  Collecting hardware data...
[INFO]  Collecting OS data...
[INFO]  Collecting app inventory (scanning /Applications, ~/Applications)...
[INFO]  Found 523 applications
[DEBUG] Submitting XML payload (147 KB) to server...
[INFO]  Server response: 200 OK
[INFO]  Computer record updated successfully (ID: 1847)
Recon Completed.`,
      isCorrect: true,
    },
    {
      command: 'jamf recon',
      output: `Error running recon
This action requires administrator privileges.
Try: sudo jamf recon`,
      hint: 'Vous avez oublié "sudo". Essayez : "sudo jamf recon"',
    },
    {
      command: 'sudo jamf policy',
      output: `Checking for policies triggered by "recurring check-in" for computer "MacBook-Pro-COMPTA"...
Executing Policy Deploy Microsoft Edge
  Checking for existing installations...
  Microsoft Edge 125.0 already installed - policy up to date.
No pending policies.`,
      partial: true,
    },
  ],
};

// ─── Lab 5 — API Jamf Pro ─────────────────────────────────────────────────
export const LAB_JAMF_API: Lab = {
  id: 'lab-jamf-api-token',
  courseSlug: 'api-jamf-pro',
  title: 'Générer un Bearer Token Jamf Pro',
  description: 'Utilisez curl pour obtenir un token d\'authentification Bearer auprès de l\'API Jamf Pro (POST /v1/auth/token).',
  context: 'Terminal ~ % ',
  objective: 'Générer un Bearer Token via POST /v1/auth/token avec vos credentials API',
  level: 'Avancé',
  tags: ['Jamf Pro', 'API', 'Bash', 'Bearer Token'],
  xpReward: 100,
  successCommands: [
    'curl -X POST "https://jamf.example.com/api/v1/auth/token" -u "$JAMF_USER:$JAMF_PASSWORD"',
    "curl -s -X POST https://jamf.example.com/api/v1/auth/token -u admin:password",
    "curl -s -X POST -u admin:password https://jamf.example.com/api/v1/auth/token",
  ],
  docReference: {
    title: 'Jamf Pro API Overview',
    url: JAMF_PRO_API_OVERVIEW_URL,
    summary:
      'L\'authentification Bearer Token (POST /v1/auth/token, expiration 20 min) est documentée sur developer.jamf.com.',
  },
  commands: [
    {
      command: 'curl -X POST "https://jamf.example.com/api/v1/auth/token" -u "$JAMF_USER:$JAMF_PASSWORD"',
      output: `{
  "token": "eyJhbGciOiJSUzI1NiJ9.eyJhdXRoZW50aWNhdGVkLWFwcCI6IkdFTkVSSUMiLCJhdXRoZW50aWNhdGlvbi10eXBlIjoiSlNTIiwiZ3JvdXBzIjpbXSwidXNlcm5hbWUiOiJhZG1pbiIsImlkIjo1LCJleHAiOjE3MTY1NjE2MDB9.signature",
  "expires": "2025-01-20T16:00:00.000+0000"
}`,
      isCorrect: true,
    },
    {
      command: 'curl -s -X POST https://jamf.example.com/api/v1/auth/token -u admin:password',
      output: `{
  "token": "eyJhbGciOiJSUzI1NiJ9.eyJhdXRoZW50aWNhdGVkLWFwcCI6IkdFTkVSSUMiLCJhdXRoZW50aWNhdGlvbi10eXBlIjoiSlNTIiwiZ3JvdXBzIjpbXSwidXNlcm5hbWUiOiJhZG1pbiIsImlkIjo1LCJleHAiOjE3MTY1NjE2MDB9.signature",
  "expires": "2025-01-20T16:00:00.000+0000"
}`,
      isCorrect: true,
    },
    {
      command: 'curl -s -X POST -u admin:password https://jamf.example.com/api/v1/auth/token',
      output: `{
  "token": "eyJhbGciOiJSUzI1NiJ9.eyJhdXRoZW50aWNhdGVkLWFwcCI6IkdFTkVSSUMiLCJhdXRoZW50aWNhdGlvbi10eXBlIjoiSlNTIiwiZ3JvdXBzIjpbXSwidXNlcm5hbWUiOiJhZG1pbiIsImlkIjo1LCJleHAiOjE3MTY1NjE2MDB9.signature",
  "expires": "2025-01-20T16:00:00.000+0000"
}`,
      isCorrect: true,
    },
    {
      command: 'curl https://jamf.example.com/api/v1/auth/token',
      output: `{
  "httpStatus": 401,
  "errors": [
    {
      "code": "INVALID_TOKEN",
      "description": "Unauthorized",
      "id": "0",
      "field": null
    }
  ]
}`,
      hint: 'Vous avez oublié "-X POST" et les credentials "-u admin:password". Les deux sont requis pour l\'authentification.',
    },
    {
      command: 'curl -X POST https://jamf.example.com/api/v1/auth/token',
      output: `{
  "httpStatus": 401,
  "errors": [{ "code": "INVALID_TOKEN", "description": "Unauthorized" }]
}`,
      hint: 'Bonne méthode HTTP ! Il manque les credentials : ajoutez -u admin:password',
    },
    {
      command: 'curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X POST https://jamf.example.com/api/v1/auth/token',
      output: `{
  "token": "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3MTY1NjE2MDB9.sig",
  "expires": "2025-01-20T16:00:00.000+0000"
}`,
      isCorrect: true,
    },
  ],
};

// ─── Lab 6 — Policies Jamf ────────────────────────────────────────────────
export const LAB_JAMF_POLICY: Lab = {
  id: 'lab-jamf-policy',
  courseSlug: 'policies-jamf-pro',
  title: 'Exécuter une policy Jamf',
  description: 'Déclenchez manuellement l\'exécution des policies Jamf Pro sur ce Mac.',
  context: 'MacBook-Pro-IT ~ % ',
  objective: 'Lancer l\'exécution des policies en attente sur ce Mac',
  level: 'Intermédiaire',
  tags: ['Jamf Pro', 'Policies'],
  xpReward: 75,
  successCommands: ['sudo jamf policy'],
  docReference: {
    title: 'Policies — Jamf Pro',
    url: getJamfProDocPageUrl('Policies'),
    summary: 'Les policies combinent déclencheurs, payloads et scripts. Consultez la doc pour les logs et le dépannage.',
  },
  commands: [
    {
      command: 'sudo jamf policy',
      output: `Checking for policies triggered by "Manual" for computer "MacBook-Pro-IT"...
Executing Policy Install Company Wi-Fi Profile
  Installing configuration profile...
  Profile installed successfully.
Executing Policy Deploy Microsoft Edge
  Microsoft Edge 125.0 already installed - policy up to date.
Policy execution completed.`,
      isCorrect: true,
    },
    {
      command: 'jamf policy',
      output: `Error: This action requires administrator privileges.
Try: sudo jamf policy`,
      hint: 'Ajoutez sudo : "sudo jamf policy"',
    },
    {
      command: 'sudo jamf manage',
      output: `Ensuring computer is managed...
Management framework is up to date.`,
      partial: true,
      hint: 'manage vérifie le framework. Pour exécuter les policies : "sudo jamf policy"',
    },
  ],
};

// ─── Lab 7 — Smart Groups (recon) ─────────────────────────────────────────
export const LAB_JAMF_SMART_GROUPS: Lab = {
  id: 'lab-jamf-smart-groups',
  courseSlug: 'smart-groups-jamf',
  title: 'Rafraîchir l\'inventaire pour Smart Groups',
  description: 'Les Smart Groups s\'appuient sur l\'inventaire à jour — forcez un recon.',
  context: 'MacBook-Pro-HR ~ % ',
  objective: 'Mettre à jour l\'inventaire pour recalculer l\'appartenance aux Smart Groups',
  level: 'Intermédiaire',
  tags: ['Jamf Pro', 'Smart Groups', 'Inventaire'],
  xpReward: 75,
  successCommands: ['sudo jamf recon'],
  docReference: {
    title: 'Smart Computer Groups — Jamf Pro',
    url: getJamfProDocPageUrl('Smart_Computer_Groups'),
    summary: 'Les critères Smart Groups utilisent l\'inventaire et les Extension Attributes. Un recon met à jour les données.',
  },
  commands: [
    {
      command: 'sudo jamf recon',
      output: `Recon started...
  Gathering hardware information...
  Gathering application information (412 apps)...
  Submitting data to https://jamf.votreentreprise.com...
Recon Completed.`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf recon -verbose',
      output: `Recon started (verbose mode)...
[INFO]  Smart Group criteria will be re-evaluated on server after submit.
Recon Completed.`,
      isCorrect: true,
    },
  ],
};

// ─── Lab 8 — Self Service ───────────────────────────────────────────────────
export const LAB_JAMF_SELF_SERVICE: Lab = {
  id: 'lab-jamf-self-service',
  courseSlug: 'self-service-jamf',
  title: 'Vérifier Self Service Jamf',
  description: 'Assurez-vous que le framework Jamf et Self Service sont opérationnels.',
  context: 'MacBook-Air-SALES ~ % ',
  objective: 'Vérifier que le framework de gestion Jamf (Self Service) est à jour',
  level: 'Débutant',
  tags: ['Jamf Pro', 'Self Service'],
  xpReward: 50,
  successCommands: ['sudo jamf manage'],
  docReference: {
    title: 'Self Service — Jamf Pro',
    url: getJamfProDocPageUrl('Self_Service'),
    summary: 'Self Service expose le catalogue utilisateur. Le framework se maintient via jamf manage.',
  },
  commands: [
    {
      command: 'sudo jamf manage',
      output: `Ensuring computer is managed...
Checking Self Service app...
Self Service is installed and up to date.
Management framework is up to date.`,
      isCorrect: true,
    },
    {
      command: 'open -a "Self Service"',
      output: '(Self Service.app opened)',
      partial: true,
      hint: 'Self Service s\'ouvre, mais la commande CLI de maintenance est "sudo jamf manage"',
    },
  ],
};

// ─── Lab 9 — PreStage / Enrollment ────────────────────────────────────────
export const LAB_JAMF_PRESTAGE: Lab = {
  id: 'lab-jamf-prestage',
  courseSlug: 'enrolement-macos-jamf',
  title: 'Vérifier le profil d\'enrollment',
  description: 'Contrôlez que le Mac est enrôlé via MDM avec un profil d\'enrollment actif.',
  context: 'MacBook-Pro-NEW ~ % ',
  objective: 'Afficher le profil d\'enrollment MDM installé sur ce Mac',
  level: 'Intermédiaire',
  tags: ['Jamf Pro', 'PreStage', 'Enrollment'],
  xpReward: 75,
  successCommands: ['profiles show -type enrollment'],
  docReference: {
    title: 'PreStage Enrollments — Jamf Pro',
    url: getJamfProDocPageUrl('PreStage_Enrollments_for_Computers'),
    summary: 'PreStage automatise l\'enrollment ADE. Le profil d\'enrollment confirme la relation MDM.',
  },
  commands: [
    {
      command: 'profiles show -type enrollment',
      output: `Enrollment profiles installed:
_computerlevel[1] attribute: com.jamfsoftware.jamf
_computerlevel[1] payload: com.apple.mdm
  Organization: Votre Entreprise
  MDM Server: jamf.votreentreprise.com
  User Approved: YES`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf enroll',
      output: `This computer is already enrolled with Jamf Pro.
Enrollment URL: https://jamf.votreentreprise.com/`,
      partial: true,
      hint: 'Le Mac est déjà enrôlé. Pour voir le profil : "profiles show -type enrollment"',
    },
    {
      command: 'sudo profiles list',
      output: `There are 4 configuration profiles installed`,
      partial: true,
      hint: 'Utilisez le type enrollment : "profiles show -type enrollment"',
    },
  ],
};

// ─── Lab 10 — DDM Status ──────────────────────────────────────────────────
export const LAB_DDM_STATUS: Lab = {
  id: 'lab-ddm-status',
  courseSlug: 'declarative-device-management',
  title: 'Vérifier le statut DDM',
  description: 'Inspectez le canal status DDM et les déclarations actives sur un Mac supervisé.',
  context: 'MacBook-Pro-IT ~ % ',
  objective: 'Afficher le statut enrollment incluant les déclarations DDM actives',
  level: 'Intermédiaire',
  tags: ['DDM', 'Apple', 'MDM'],
  xpReward: 75,
  successCommands: ['profiles status -type enrollment'],
  docReference: {
    title: 'Declarative Device Management — Apple Developer',
    url: APPLE_DDM_DOCUMENTATION_URL,
    summary:
      'Le canal status DDM remonte l\'état des déclarations. Utilisez profiles status -type enrollment pour l\'inspecter.',
  },
  commands: [
    {
      command: 'profiles status -type enrollment',
      output: `Enrollment profile status:
  MDM Server: jamf.votreentreprise.com
  User Approved: YES
  Declarative Management: Enabled
  Active Declarations: 3
    - com.apple.configuration.softwareupdate.enforcement
    - com.apple.configuration.passcode.settings
    - com.apple.configuration.management.status-subscriptions
  Last Status Report: 2025-06-21T14:32:00Z`,
      isCorrect: true,
    },
    {
      command: 'profiles show -type enrollment',
      output: `Enrollment profiles installed:
_computerlevel[1] payload: com.apple.mdm
  Organization: Votre Entreprise
  MDM Server: jamf.votreentreprise.com`,
      partial: true,
      hint: 'show affiche le profil. Pour le canal status DDM : "profiles status -type enrollment"',
    },
    {
      command: 'sudo jamf manage',
      output: `Ensuring computer is managed...
Management framework is up to date.`,
      partial: true,
      hint: 'jamf manage vérifie le framework. Pour DDM : "profiles status -type enrollment"',
    },
  ],
};

// ─── Lab 11 — MDM vs DDM enrollment ───────────────────────────────────────
export const LAB_MDM_ENROLLMENT: Lab = {
  id: 'lab-mdm-enrollment-profile',
  courseSlug: 'mdm-classique-vs-ddm',
  title: 'Inspecter le profil MDM classique',
  description: 'Comparez la relation MDM push classique avec les capacités DDM sur le même appareil.',
  context: 'MacBook-Air-SALES ~ % ',
  objective: 'Afficher le profil d\'enrollment MDM installé (base du modèle classique)',
  level: 'Débutant',
  tags: ['MDM', 'DDM', 'Enrollment'],
  xpReward: 50,
  successCommands: ['profiles show -type enrollment'],
  docReference: {
    title: 'La gestion moderne : l\'avenir des solutions MDM',
    url: MODERN_APPLE_FUTURE_MDM_URL,
    summary:
      'Le MDM classique repose sur le profil d\'enrollment push. La DDM l\'étend via déclarations et status channel.',
  },
  commands: [
    {
      command: 'profiles show -type enrollment',
      output: `Enrollment profiles installed:
_computerlevel[1] attribute: com.jamfsoftware.jamf
_computerlevel[1] payload: com.apple.mdm
  Organization: Votre Entreprise
  MDM Server: jamf.votreentreprise.com
  User Approved: YES
  Declarative Management: Enabled`,
      isCorrect: true,
    },
    {
      command: 'profiles status -type enrollment',
      output: `Enrollment profile status:
  Declarative Management: Enabled
  Active Declarations: 2`,
      partial: true,
      hint: 'Le status montre DDM. Pour le profil MDM de base : "profiles show -type enrollment"',
    },
  ],
};

// ─── Lab 12 — API Inventory ───────────────────────────────────────────────
export const LAB_JAMF_API_INVENTORY: Lab = {
  id: 'lab-jamf-api-inventory',
  courseSlug: 'api-jamf-pro',
  title: 'Inventaire Mac via API Jamf Pro',
  description: 'Interrogez l\'endpoint computers-inventory avec un Bearer Token valide.',
  context: 'Terminal ~ % ',
  objective: 'Lister les ordinateurs via GET /api/v1/computers-inventory avec Authorization Bearer',
  level: 'Avancé',
  tags: ['Jamf Pro', 'API', 'Inventory'],
  xpReward: 100,
  successCommands: [
    'curl -s -H "Authorization: Bearer $JAMF_TOKEN" "https://jamf.example.com/api/v1/computers-inventory?page=0&page-size=1"',
    'curl -H "Authorization: Bearer eyJhbG..." "https://jamf.example.com/api/v1/computers-inventory?page=0&page-size=1"',
  ],
  docReference: {
    title: 'Jamf Pro API Overview',
    url: JAMF_PRO_API_OVERVIEW_URL,
    summary:
      'Après POST /v1/auth/token, utilisez le Bearer token sur les endpoints REST v1 comme computers-inventory.',
  },
  commands: [
    {
      command: 'curl -s -H "Authorization: Bearer $JAMF_TOKEN" "https://jamf.example.com/api/v1/computers-inventory?page=0&page-size=1"',
      output: `{
  "totalCount": 142,
  "results": [
    {
      "id": "1",
      "udid": "A1B2C3D4-E5F6-7890-ABCD-EF1234567890",
      "general": {
        "name": "MacBook-Pro-IT",
        "lastReportedIp": "10.0.1.42",
        "lastContactTime": "2025-06-21T14:00:00.000+0000"
      }
    }
  ]
}`,
      isCorrect: true,
    },
    {
      command: 'curl https://jamf.example.com/api/v1/computers-inventory',
      output: `{
  "httpStatus": 401,
  "errors": [{ "code": "INVALID_TOKEN", "description": "Unauthorized" }]
}`,
      hint: 'L\'API requiert un Bearer Token : curl -H "Authorization: Bearer $JAMF_TOKEN" ...',
    },
    {
      command: 'sudo jamf recon',
      output: `Submitting inventory to Jamf Pro...
Inventory submitted successfully.`,
      partial: true,
      hint: 'jamf recon envoie l\'inventaire au serveur. Pour l\'API REST : curl avec Bearer token.',
    },
  ],
};

// ─── Exports ──────────────────────────────────────────────────────────────
export const ALL_LABS: Lab[] = [
  LAB_FILEVAULT,
  LAB_JAMF_CONNECTION,
  LAB_GATEKEEPER,
  LAB_JAMF_INVENTORY,
  LAB_JAMF_API,
  LAB_JAMF_POLICY,
  LAB_JAMF_SMART_GROUPS,
  LAB_JAMF_SELF_SERVICE,
  LAB_JAMF_PRESTAGE,
  LAB_DDM_STATUS,
  LAB_MDM_ENROLLMENT,
  LAB_JAMF_API_INVENTORY,
];

export function getLabForCourse(courseSlug: string): Lab | undefined {
  return ALL_LABS.find(lab => lab.courseSlug === courseSlug);
}

export function getLabsForCourse(courseSlug: string): Lab[] {
  return ALL_LABS.filter(lab => lab.courseSlug === courseSlug);
}

export function getLabById(id: string): Lab | undefined {
  return ALL_LABS.find(lab => lab.id === id);
}
