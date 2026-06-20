/**
 * Apple MDM Academy — Labs interactifs Bash/Jamf
 * Simulation côté client — aucune exécution réelle
 */

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
  title: 'Obtenir un Bearer Token API Jamf',
  description: 'Utilisez curl pour obtenir un token d\'authentification Bearer auprès de l\'API Jamf Pro.',
  context: 'Terminal ~ % ',
  objective: 'Obtenir un Bearer Token via l\'API Jamf Pro avec les credentials fournis',
  level: 'Avancé',
  tags: ['Jamf Pro', 'API', 'Bash', 'Bearer Token'],
  xpReward: 100,
  successCommands: [
    "curl -s -X POST https://jamf.example.com/api/v1/auth/token -u admin:password",
    "curl -s -X POST -u admin:password https://jamf.example.com/api/v1/auth/token",
  ],
  commands: [
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

// ─── Exports ──────────────────────────────────────────────────────────────
export const ALL_LABS: Lab[] = [
  LAB_FILEVAULT,
  LAB_JAMF_CONNECTION,
  LAB_GATEKEEPER,
  LAB_JAMF_INVENTORY,
  LAB_JAMF_API,
];

export function getLabForCourse(courseSlug: string): Lab | undefined {
  return ALL_LABS.find(lab => lab.courseSlug === courseSlug);
}

export function getLabById(id: string): Lab | undefined {
  return ALL_LABS.find(lab => lab.id === id);
}
