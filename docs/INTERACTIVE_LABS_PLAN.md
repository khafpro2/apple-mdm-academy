# Plan Labs Interactifs — Bash/Jamf V3

## Concept

Chaque cours technique disposera d'un **mini-terminal simulé** permettant  
à l'apprenant de taper des commandes réelles et d'en voir les résultats simulés.

**Pas d'exécution réelle** — simulation côté client avec des réponses pré-définies.

---

## Composant TerminalLab

```typescript
// components/labs/TerminalLab.tsx
interface LabCommand {
  command: string;           // La commande attendue (ou pattern regex)
  output: string;            // La sortie simulée
  isCorrect?: boolean;       // Est-ce la réponse attendue à l'exercice ?
  hint?: string;             // Indice si la commande est incorrecte
}

interface Lab {
  id: string;
  title: string;
  description: string;
  context: string;           // Contexte de l'exercice (nom du Mac, OS, etc.)
  objective: string;         // Objectif pédagogique
  commands: LabCommand[];    // Commandes acceptées + outputs simulés
  successCommand: string;    // La commande qui marque le lab comme réussi
  xpReward: number;          // XP gagnés si réussi
}
```

---

## Labs prioritaires à créer

### Lab 1 — Vérifier FileVault (Cours: filevault-gestion-jamf)

```typescript
// lib/labs/lab-filevault.ts
{
  id: 'lab-filevault-check',
  title: 'Vérifier l\'état de FileVault',
  context: 'MacBook Pro · macOS 14.5 · Terminal',
  objective: 'Utiliser la commande appropriée pour vérifier si FileVault est activé',
  commands: [
    {
      command: 'fdesetup status',
      output: 'FileVault is On.',
      isCorrect: true,
    },
    {
      command: 'fdesetup help',
      output: 'usage: fdesetup <verb> [options]\nVerbs:\n  enable\n  disable\n  status\n  hasinstitutionkey\n  ...',
    },
    {
      command: 'diskutil cs list',
      output: 'No CoreStorage logical volume groups found',
      hint: 'diskutil cs est pour CoreStorage (ancien). Essayez fdesetup status pour APFS',
    },
  ],
  successCommand: 'fdesetup status',
  xpReward: 50,
}
```

### Lab 2 — Vérifier la connexion Jamf Pro (Cours: introduction-jamf-pro)

```typescript
{
  id: 'lab-jamf-connection',
  title: 'Vérifier la connexion Jamf Pro',
  context: 'Mac géré · Jamf Pro 11.x · Terminal',
  objective: 'Diagnostiquer la connexion entre le Mac et le serveur Jamf Pro',
  commands: [
    {
      command: 'sudo jamf checkJSSConnection',
      output: `Checking server connection...
https://jamf.votreentreprise.com:8443
The JSS is available.
Product Version: 11.7.1`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf version',
      output: 'jamf binary version: 11.7.1',
    },
    {
      command: 'sudo jamf recon',
      output: `Recon started...
Gathering application inventory...
Submitting data to https://jamf.votreentreprise.com:8443...
Recon Completed.`,
    },
  ],
  successCommand: 'sudo jamf checkJSSConnection',
  xpReward: 50,
}
```

### Lab 3 — Gatekeeper (Cours: gatekeeper-xprotect-jamf)

```typescript
{
  id: 'lab-gatekeeper',
  title: 'Auditer l\'état de Gatekeeper',
  context: 'MacBook Air · macOS 14.4 · Terminal',
  objective: 'Vérifier et activer Gatekeeper via la ligne de commande',
  commands: [
    {
      command: 'spctl --status',
      output: 'assessments enabled',
      isCorrect: true,
    },
    {
      command: 'spctl --master-enable',
      output: '(aucune sortie — Gatekeeper activé avec succès)',
    },
    {
      command: 'spctl --assess -v /Applications/Safari.app',
      output: '/Applications/Safari.app: accepted\nsource=Apple System',
    },
  ],
  successCommand: 'spctl --status',
  xpReward: 50,
}
```

### Lab 4 — Inventaire Jamf (Cours: reporting-conformite-jamf)

```typescript
{
  id: 'lab-jamf-inventory',
  title: 'Forcer un inventaire Jamf',
  context: 'MacBook Pro · Jamf Pro 11.x · Terminal',
  objective: 'Déclencher une mise à jour de l\'inventaire vers Jamf Pro',
  commands: [
    {
      command: 'sudo jamf recon',
      output: `Recon started...
Gathering hardware inventory...
  Model: MacBook Pro (16-inch, Nov 2023)
  Serial: C02XK2ABCD
  RAM: 32 GB
  Storage: 1 TB
Gathering software inventory (498 applications)...
Submitting data...
Recon Completed successfully.`,
      isCorrect: true,
    },
    {
      command: 'sudo jamf recon -verbose',
      output: `Recon started (verbose mode)...
[DEBUG] Connecting to https://jamf.company.com:8443
[DEBUG] Authentication successful
[INFO] Collecting hardware data...
...`,
    },
  ],
  successCommand: 'sudo jamf recon',
  xpReward: 50,
}
```

---

## Architecture technique

```
lib/
└── labs/
    ├── index.ts              # Export de tous les labs
    ├── lab-filevault.ts
    ├── lab-jamf-connection.ts
    ├── lab-gatekeeper.ts
    ├── lab-jamf-inventory.ts
    ├── lab-api-jamf.ts
    ├── lab-scripting-bash.ts
    └── lab-android-adb.ts

components/
└── labs/
    ├── TerminalLab.tsx       # Composant terminal interactif
    ├── TerminalLine.tsx      # Ligne de commande avec prompt
    └── LabProgress.tsx       # Indicateur de progression du lab
```

---

## UX du terminal simulé

```
┌─────────────────────────────────────────────────────────┐
│ 🖥  Lab : Vérifier l'état de FileVault                   │
│ MacBook-Pro ~ %                                          │
├─────────────────────────────────────────────────────────┤
│ $ fdesetup status                                        │
│ FileVault is On.                                         │
│                                                          │
│ $ _                                                      │
│                                                          │
│ ✅ Commande correcte ! +50 XP                            │
│ Vous savez maintenant vérifier FileVault en CLI.         │
└─────────────────────────────────────────────────────────┘
```

**Fonctionnalités :**
- Prompt Unix réaliste (`Mac-Pro ~ %`)
- Historique des commandes (flèches ↑↓)
- Autocomplétion Tab pour les commandes connues
- Coloration syntaxique (vert = succès, rouge = erreur)
- Animation de frappe (optionnel)
- Compteur XP avec animation

---

## Priorité de développement

```
Sprint 1 (V3.1) :
  ✅ TerminalLab composant de base
  ✅ 4 labs fondamentaux (FileVault, Jamf check, Gatekeeper, recon)
  ✅ Intégration dans les pages de cours

Sprint 2 (V3.2) :
  ○ 8 labs supplémentaires (API, Android, Intune PowerShell)
  ○ Historique de commandes
  ○ Autocomplétion Tab

Sprint 3 (V3.3) :
  ○ Labs Android (adb commands)
  ○ Labs PowerShell (Intune)
  ○ Sandboxing côté serveur optionnel (pour vraie exécution limitée)
```
