import { type QuizQuestion } from '@/components/cours/Quiz';

export const QUIZZES: Record<string, QuizQuestion[]> = {
  'ecosysteme-apple-entreprise': [
    {
      id: 'q1',
      question: 'Quel protocole Apple utilise-t-il pour envoyer des commandes MDM aux appareils ?',
      options: ['HTTP REST', 'APNS (Apple Push Notification Service)', 'SMTP', 'WebSocket'],
      correctIndex: 1,
      explanation: 'Apple MDM repose sur APNS pour transmettre les commandes du serveur MDM vers les appareils. Le serveur envoie une notification push, l\'appareil se connecte ensuite au MDM pour récupérer la commande.',
    },
    {
      id: 'q2',
      question: 'Qu\'est-ce que le Zero-Touch Deployment ?',
      options: [
        'Un appareil qui démarre sans interaction',
        'La capacité à déployer un appareil entièrement configuré sans que l\'IT le touche physiquement',
        'Un système de gestion des mots de passe',
        'Un mode de veille économique',
      ],
      correctIndex: 1,
      explanation: 'Le Zero-Touch Deployment permet à un appareil neuf d\'être configuré automatiquement dès sa première mise en route, sans que l\'équipe IT n\'ait à y accéder physiquement.',
    },
    {
      id: 'q3',
      question: 'Quelle puce Apple est responsable du stockage sécurisé des clés cryptographiques et de Touch ID/Face ID ?',
      options: ['CPU Apple Silicon', 'Neural Engine', 'Secure Enclave', 'T2 Chip uniquement'],
      correctIndex: 2,
      explanation: 'Le Secure Enclave est un processeur dédié intégré dans tous les appareils Apple modernes. Il gère les opérations cryptographiques sensibles de façon isolée du processeur principal.',
    },
    {
      id: 'q4',
      question: 'FileVault 2 utilise quel algorithme de chiffrement ?',
      options: ['AES-256-CBC', 'XTS-AES-128', 'RSA-2048', 'ChaCha20'],
      correctIndex: 1,
      explanation: 'FileVault 2 utilise XTS-AES-128, un mode de chiffrement optimisé pour le stockage sur disque. Sur Apple Silicon, ce chiffrement est implémenté en matériel sans impact sur les performances.',
    },
    {
      id: 'q5',
      question: 'Quel outil Apple permet de déployer des applications en volume sans Apple ID personnel ?',
      options: ['TestFlight', 'Apple Configurator 2', 'Apps & Books (VPP)', 'Xcode Organizer'],
      correctIndex: 2,
      explanation: 'Le programme Apps & Books (Volume Purchase Program) permet d\'acheter des licences en volume dans ABM et de les distribuer via MDM sans nécessiter de compte Apple ID personnel sur les appareils.',
    },
  ],

  'apple-business-manager': [
    {
      id: 'q1',
      question: 'Quelle est l\'URL du portail Apple Business Manager ?',
      options: ['apple.com/business', 'business.apple.com', 'abm.apple.com', 'deploy.apple.com'],
      correctIndex: 1,
      explanation: 'Le portail ABM est accessible à business.apple.com. C\'est le portail central pour gérer les appareils, apps et comptes Apple de votre organisation.',
    },
    {
      id: 'q2',
      question: 'Quel rôle ABM peut créer et modifier les Managed Apple Accounts ?',
      options: ['Gestionnaire de contenus', 'Gestionnaire d\'appareils', 'Gestionnaire de personnes', 'Lecteur seul'],
      correctIndex: 2,
      explanation: 'Le rôle "Gestionnaire de personnes" est spécifiquement dédié à la gestion des Managed Apple Accounts (création, modification, désactivation).',
    },
    {
      id: 'q3',
      question: 'Que signifie ADE ?',
      options: [
        'Apple Device Enrollment',
        'Automated Device Enrollment',
        'Advanced Deployment Engine',
        'Apple Deployment Extension',
      ],
      correctIndex: 1,
      explanation: 'ADE = Automated Device Enrollment. C\'est le mécanisme qui permet l\'enrôlement automatique des appareils dans un MDM dès leur première mise en service.',
    },
    {
      id: 'q4',
      question: 'Quels types d\'appareils sont automatiquement visibles dans ABM lors d\'un achat ?',
      options: [
        'Uniquement les Mac',
        'Appareils achetés directement chez Apple ou chez un revendeur agréé ABM',
        'Tous les appareils Apple, même achetés en grande surface',
        'Uniquement les appareils sous iOS 16+',
      ],
      correctIndex: 1,
      explanation: 'Pour être automatiquement enregistrés dans ABM, les appareils doivent être achetés directement chez Apple ou chez un revendeur agréé ABM. Les appareils achetés en grande surface doivent être ajoutés manuellement via Apple Configurator 2.',
    },
    {
      id: 'q5',
      question: 'Lors de la liaison d\'un MDM Server Jamf Pro à ABM, dans quel format est le token ABM téléchargé ?',
      options: ['.pem', '.p12', '.p7m', '.json'],
      correctIndex: 2,
      explanation: 'Le token ABM est téléchargé au format .p7m (PKCS#7 Message). Ce fichier est ensuite uploadé dans Jamf Pro pour établir la connexion ADE entre ABM et votre instance Jamf.',
    },
  ],

  'enrolement-macos-jamf': [
    {
      id: 'q1',
      question: 'Quelle commande Jamf Pro permet de vérifier l\'état de l\'enrôlement depuis le terminal ?',
      options: ['jamf checkjssconnection', 'jamf policy', 'jamf enroll', 'jamf recon'],
      correctIndex: 0,
      explanation: 'La commande `jamf checkjssconnection` vérifie la connexion entre l\'agent Jamf sur le Mac et le serveur Jamf Pro (JSS = Jamf Server Suite). Elle retourne un code de retour 0 si la connexion est OK.',
    },
    {
      id: 'q2',
      question: 'Qu\'est-ce qu\'un Smart Group dans Jamf Pro ?',
      options: [
        'Un groupe d\'utilisateurs créé manuellement',
        'Un groupe dynamique dont l\'appartenance est calculée automatiquement selon des critères',
        'Un groupe de stratégies groupées',
        'Un groupe de licences Apps & Books',
      ],
      correctIndex: 1,
      explanation: 'Un Smart Group est un groupe dynamique Jamf Pro. Son appartenance est recalculée automatiquement en fonction de critères définis (version macOS, présence d\'un fichier, statut FileVault, etc.). C\'est la base du ciblage dans Jamf Pro.',
    },
  ],
  'managed-apple-accounts': [
    {
      id: 'q1',
      question: 'Quelle est la différence principale entre un Apple ID personnel et un Managed Apple Account ?',
      options: [
        'Il n\'y a aucune différence',
        'Le Managed Apple Account est créé et contrôlé par l\'organisation, le personnel appartient à l\'utilisateur',
        'Le Managed Apple Account est uniquement pour les Mac, pas pour iOS',
        'Le Managed Apple Account ne peut pas accéder à iCloud',
      ],
      correctIndex: 1,
      explanation: 'Les Managed Apple Accounts (anciennement Managed Apple IDs) sont créés et gérés par l\'organisation via Apple Business Manager. L\'organisation contrôle l\'accès, la récupération du compte et les services disponibles.',
    },
    {
      id: 'q2',
      question: 'Quel format prennent généralement les Managed Apple Accounts ?',
      options: [
        'prenom.nom@apple.com',
        'prenom.nom@icloud.com',
        'prenom.nom@k12.etablissement.fr ou prenom.nom@etablissement.com',
        'IDENTIFIANT@managedappleid.com',
      ],
      correctIndex: 2,
      explanation: 'Les Managed Apple Accounts utilisent le domaine de l\'organisation (ex: jean.dupont@entreprise.com) ou un sous-domaine dédié (ex: 2026jean.dupont@k12.ecole.fr pour les établissements scolaires).',
    },
    {
      id: 'q3',
      question: 'Pour créer des Managed Apple Accounts en masse, quelle méthode est la plus efficace ?',
      options: [
        'Les créer manuellement un par un dans ABM',
        'Utiliser la fédération d\'identité avec Azure AD ou Google Workspace pour synchroniser automatiquement les comptes',
        'Demander à chaque utilisateur de créer son propre compte',
        'Importer depuis un fichier Excel via iTunes',
      ],
      correctIndex: 1,
      explanation: 'La fédération d\'identité (Azure AD, Google Workspace, Okta) permet de synchroniser automatiquement les comptes d\'utilisateurs vers ABM. Les Managed Apple Accounts sont créés et mis à jour automatiquement sans intervention manuelle.',
    },
  ],

  'automated-device-enrollment': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que l\'ADE (Automated Device Enrollment) permet d\'obtenir qu\'un enrôlement MDM classique ne permet pas ?',
      options: [
        'L\'installation d\'applications supplémentaires',
        'Un enrôlement supervisé verrouillé au MDM, sans que l\'utilisateur puisse le retirer',
        'L\'accès à iCloud',
        'Une connexion Wi-Fi automatique',
      ],
      correctIndex: 1,
      explanation: 'L\'ADE permet l\'enrôlement supervisé et verrouillé : l\'appareil est lié au MDM au niveau matériel via ABM. L\'utilisateur ne peut pas retirer le profil MDM, contrairement à un enrôlement manuel.',
    },
    {
      id: 'q2',
      question: 'Où faut-il aller pour assigner un appareil Apple à un serveur MDM dans le cadre de l\'ADE ?',
      options: [
        'Directement dans Jamf Pro ou Intune',
        'Dans Apple Business Manager (business.apple.com) → Appareils → Modifier le serveur MDM',
        'Dans les paramètres de l\'appareil → MDM',
        'Dans le portail Apple Developer',
      ],
      correctIndex: 1,
      explanation: 'L\'assignation d\'un appareil à un serveur MDM se fait exclusivement dans Apple Business Manager. Le MDM (Jamf, Intune...) reçoit ensuite l\'appareil lors de la synchronisation.',
    },
    {
      id: 'q3',
      question: 'Un appareil ADE n\'apparaît pas dans le MDM après avoir été allumé. Quelle est la première vérification à effectuer ?',
      options: [
        'Réinstaller le MDM',
        'Vérifier que l\'appareil est assigné au bon serveur MDM dans ABM et forcer une synchronisation dans le MDM',
        'Contacter le support Apple',
        'Effacer et réinitialiser l\'appareil',
      ],
      correctIndex: 1,
      explanation: 'Si un appareil ADE ne s\'enrôle pas, vérifier d\'abord l\'assignation dans ABM (Appareils → voir le serveur MDM associé), puis forcer une synchronisation dans le MDM (Jamf Pro → ABM Tokens → Sync ou Intune → Enrollment Tokens → Sync).',
    },
  ],

  'apps-et-books': [
    {
      id: 'q1',
      question: 'Quelle est la différence entre "Device-based licensing" et "User-based licensing" pour les apps VPP ?',
      options: [
        'Il n\'y a pas de différence pratique',
        'Device-based : la licence est liée à l\'appareil (pas besoin d\'Apple ID actif) ; User-based : liée au compte Apple de l\'utilisateur',
        'Device-based est gratuit, User-based est payant',
        'User-based fonctionne uniquement sur iOS',
      ],
      correctIndex: 1,
      explanation: 'Le Device-based licensing est idéal pour les appareils partagés ou supervisés sans Apple ID utilisateur. Le User-based licensing suit l\'utilisateur sur ses appareils mais nécessite un Managed Apple Account actif.',
    },
    {
      id: 'q2',
      question: 'Comment déployer une application iOS en silence sans intervention de l\'utilisateur ?',
      options: [
        'Envoyer un lien App Store par email',
        'Utiliser ABM + VPP Device-based licensing avec l\'appareil supervisé, via le MDM en mode "Required"',
        'Demander à l\'utilisateur d\'installer depuis l\'App Store',
        'Utiliser Apple Configurator 2 pour chaque appareil',
      ],
      correctIndex: 1,
      explanation: 'L\'installation silencieuse nécessite : appareil supervisé (ADE) + licence VPP Device-based dans ABM + déploiement "Required" dans le MDM. L\'app s\'installe automatiquement sans que l\'utilisateur n\'ait à accepter quoi que ce soit.',
    },
  ],

  'introduction-jamf-pro': [
    {
      id: 'q1',
      question: 'Quelle est la commande pour vérifier la connexion entre un Mac et Jamf Pro ?',
      options: [
        'sudo jamf status',
        'sudo jamf checkJSSConnection',
        'sudo jamf ping',
        'sudo jamf verify',
      ],
      correctIndex: 1,
      explanation: 'La commande `sudo jamf checkJSSConnection` vérifie la connectivité entre l\'agent Jamf sur le Mac et le serveur Jamf Pro (JSS = Jamf Software Server). Elle retourne le statut de la connexion et des informations sur le serveur.',
    },
    {
      id: 'q2',
      question: 'Quelle est la différence entre un Smart Group et un Static Group dans Jamf Pro ?',
      options: [
        'Il n\'y a aucune différence',
        'Un Smart Group se met à jour automatiquement selon des critères dynamiques ; un Static Group est géré manuellement',
        'Les Static Groups sont réservés aux Mac, les Smart Groups aux appareils iOS',
        'Les Smart Groups ne peuvent pas être utilisés comme scope dans les Policies',
      ],
      correctIndex: 1,
      explanation: 'Les Smart Groups sont dynamiques : ils évaluent automatiquement les critères à chaque check-in et ajoutent/retirent les appareils. Les Static Groups sont manuels : un admin ajoute ou retire chaque appareil individuellement.',
    },
  ],

  'configuration-profiles-jamf': [
    {
      id: 'q1',
      question: 'Quel payload de Configuration Profile permet de gérer les autorisations d\'accès aux ressources système des applications (Full Disk Access, Caméra, etc.) sur macOS ?',
      options: [
        'com.apple.applicationaccess',
        'com.apple.security.pkcs1',
        'com.apple.TCC.configuration-profile-policy (PPPC)',
        'com.apple.systempreferences',
      ],
      correctIndex: 2,
      explanation: 'Le payload PPPC (Privacy Preferences Policy Control) avec le domaine com.apple.TCC.configuration-profile-policy permet de configurer les autorisations TCC (Transparency, Consent, and Control) via MDM, notamment Full Disk Access, Caméra, Microphone, etc.',
    },
    {
      id: 'q2',
      question: 'Comment s\'assure-t-on qu\'un profil de configuration s\'applique uniquement aux Mac d\'un département spécifique dans Jamf Pro ?',
      options: [
        'En modifiant le payload du profil pour inclure le nom du département',
        'En configurant le Scope du profil pour cibler un Smart Group basé sur le département',
        'En créant un profil différent pour chaque appareil',
        'En activant l\'option "Department Restriction" dans le profil',
      ],
      correctIndex: 1,
      explanation: 'Le Scope dans Jamf Pro détermine à qui s\'applique le profil. En ciblant un Smart Group dont les critères incluent "Department is Finance", seuls les Mac de ce département recevront le profil.',
    },
  ],

  'policies-jamf-pro': [
    {
      id: 'q1',
      question: 'Quelle est la fréquence d\'exécution appropriée pour une Policy qui installe une application la première fois sur chaque Mac ?',
      options: [
        'Ongoing (à chaque check-in)',
        'Once per computer',
        'Once per user per computer',
        'Once every day',
      ],
      correctIndex: 1,
      explanation: '"Once per computer" garantit que la Policy s\'exécute une seule fois sur chaque Mac, quelle que soit l\'utilisateur connecté. Jamf mémorise que la Policy a été exécutée sur cet appareil et ne la relance pas.',
    },
    {
      id: 'q2',
      question: 'Un utilisateur déclenche manuellement une Policy depuis Self Service. Quel déclencheur (trigger) ce scénario utilise-t-il ?',
      options: [
        'Login',
        'Recurring Checkin',
        'Self Service',
        'Enrollment',
      ],
      correctIndex: 2,
      explanation: 'Le déclencheur "Self Service" s\'active uniquement quand l\'utilisateur clique sur le bouton correspondant dans l\'application Jamf Self Service. C\'est le seul déclencheur initié par l\'utilisateur final.',
    },
  ],

  'smart-groups-jamf': [
    {
      id: 'q1',
      question: 'Quel critère utiliser pour créer un Smart Group contenant tous les Mac n\'ayant pas macOS 14.0 ou supérieur ?',
      options: [
        'Operating System Version > is not > 14.0.0',
        'Operating System Version > is less than > 14.0.0',
        'macOS Version > does not contain > 14',
        'Software > macOS > is missing',
      ],
      correctIndex: 1,
      explanation: 'Le critère "Operating System Version > is less than > 14.0.0" cible tous les Mac avec une version inférieure à 14.0.0. Ce Smart Group se met à jour automatiquement quand les Mac effectuent leur mise à jour.',
    },
  ],

  'filevault-gestion-jamf': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que le "FileVault Key Escrow" dans Jamf Pro ?',
      options: [
        'Un outil pour désactiver FileVault à distance',
        'Le stockage sécurisé de la clé de récupération FileVault dans Jamf Pro, permettant à l\'IT de récupérer l\'accès si l\'utilisateur oublie son mot de passe',
        'Un compte Apple ID de secours pour accéder au Mac',
        'Un mode de chiffrement alternatif à FileVault',
      ],
      correctIndex: 1,
      explanation: 'L\'escrow FileVault stocke la clé de récupération personnelle (PRK) dans Jamf Pro. Si un utilisateur oublie son mot de passe de démarrage, l\'IT peut récupérer la clé depuis Jamf Pro → Computer Record → Security → FileVault 2 Recovery Key.',
    },
  ],

  'jamf-protect-introduction': [
    {
      id: 'q1',
      question: 'Quelle est la principale différence entre Jamf Protect et un antivirus traditionnel ?',
      options: [
        'Jamf Protect fonctionne uniquement sur iOS',
        'Jamf Protect est un EDR qui analyse les comportements en temps réel et s\'intègre nativement avec les APIs de sécurité Apple, tandis qu\'un AV traditionnel se concentre sur les signatures',
        'Jamf Protect remplace complètement XProtect d\'Apple',
        'Il n\'y a aucune différence fonctionnelle',
      ],
      correctIndex: 1,
      explanation: 'Jamf Protect est un EDR (Endpoint Detection and Response) optimisé pour macOS. Il utilise les APIs Apple natives (Endpoint Security Framework) pour une analyse comportementale en temps réel, avec une empreinte minimale sur les performances.',
    },
    {
      id: 'q2',
      question: 'Jamf Protect détecte qu\'un Mac a des paramètres non conformes aux CIS Benchmarks. Quelle action Jamf Protect effectue-t-il par défaut ?',
      options: [
        'Il supprime automatiquement le Mac du MDM',
        'Il alerte et génère un rapport de non-conformité, sans bloquer l\'appareil (la remédiation est configurée séparément)',
        'Il réinitialise le Mac aux paramètres d\'usine',
        'Il désactive automatiquement les paramètres non conformes',
      ],
      correctIndex: 1,
      explanation: 'Jamf Protect génère des alertes et des rapports de conformité. La remédiation automatique (corriger les paramètres) est une action séparée qui peut être configurée via des politiques Jamf Pro déclenchées par les alertes Protect.',
    },
  ],

  'intune-apple-business-manager': [
    {
      id: 'q1',
      question: 'Quelle est la durée de validité d\'un certificat APNs (Apple Push Notification Service) dans Microsoft Intune ?',
      options: [
        '3 mois',
        '6 mois',
        '1 an',
        'Illimitée',
      ],
      correctIndex: 2,
      explanation: 'Le certificat APNs est valide exactement 1 an à partir de sa date de création. Il doit être renouvelé AVANT expiration avec le MÊME Apple ID, sinon tous les appareils gérés perdent leur connexion MDM.',
    },
    {
      id: 'q2',
      question: 'Que se passe-t-il si le certificat APNs Intune est renouvelé avec un Apple ID différent ?',
      options: [
        'Rien, le certificat fonctionne normalement',
        'Seuls les nouveaux appareils sont affectés',
        'Tous les appareils iOS et macOS gérés perdent leur connexion MDM et doivent être réenrôlés',
        'Seuls les appareils iOS sont affectés',
      ],
      correctIndex: 2,
      explanation: 'Chaque certificat APNs est lié à un Apple ID spécifique via un Topic unique. Si vous utilisez un Apple ID différent, le nouveau certificat a un Topic différent et les appareils existants ne peuvent plus communiquer avec Intune.',
    },
  ],

  'introduction-android-enterprise': [
    {
      id: 'q1',
      question: 'Quel mode Android Enterprise faut-il utiliser pour un appareil d\'entreprise dédié à un seul employé sans usage personnel ?',
      options: [
        'Work Profile (BYOD)',
        'Fully Managed (COBO)',
        'Dedicated Device (COSU)',
        'COPE',
      ],
      correctIndex: 1,
      explanation: 'Fully Managed (Corporate Owned Business Only) est le mode pour les appareils d\'entreprise dédiés à un employé avec usage professionnel exclusif. L\'IT a le contrôle total et l\'utilisateur ne peut pas installer d\'apps personnelles.',
    },
    {
      id: 'q2',
      question: 'Quel est l\'avantage clé du Work Profile Android Enterprise pour les utilisateurs BYOD ?',
      options: [
        'L\'IT peut accéder à toutes les données personnelles de l\'employé',
        'La séparation cryptographique des données pro et perso : l\'IT ne peut accéder qu\'à la zone Work Profile et effectuer un wipe sélectif',
        'L\'appareil est automatiquement supervisé',
        'L\'utilisateur perd l\'accès à ses apps personnelles',
      ],
      correctIndex: 1,
      explanation: 'Le Work Profile crée une partition chiffrée séparée sur l\'appareil personnel. L\'IT gère uniquement cette zone pro (apps avec badge valise) et peut effectuer un wipe sélectif sans toucher aux données personnelles.',
    },
  ],

  'introduction-jamf-connect': [
    {
      id: 'q1',
      question: 'Quel problème fondamental Jamf Connect résout-il dans un environnement macOS enterprise ?',
      options: [
        'La gestion des applications macOS',
        'La désynchronisation entre le mot de passe du compte local macOS et l\'identité cloud (Azure AD/Okta)',
        'La connexion Wi-Fi automatique',
        'La gestion des imprimantes',
      ],
      correctIndex: 1,
      explanation: 'Sans Jamf Connect, le compte local macOS et le compte Azure AD sont deux entités distinctes avec des mots de passe indépendants. Jamf Connect synchronise les deux via OIDC, offrant une expérience Single Sign-On cohérente.',
    },
  ],

  'securite-conformite-apple': [
    {
      id: 'q1',
      question: 'Que fait Gatekeeper sur macOS quand un utilisateur tente d\'ouvrir une application téléchargée depuis internet ?',
      options: [
        'Il l\'ouvre directement sans vérification',
        'Il vérifie la signature du développeur et la notarisation Apple, et bloque si l\'app ne satisfait pas aux critères configurés',
        'Il supprime automatiquement l\'application',
        'Il envoie l\'application à Apple pour vérification manuelle',
      ],
      correctIndex: 1,
      explanation: 'Gatekeeper vérifie que les applications ont une signature Developer ID valide et, depuis macOS Catalina, une notarisation Apple (scan automatisé par Apple pour détecter les malwares). Il bloque selon le niveau de politique configuré.',
    },
    {
      id: 'q2',
      question: 'Qu\'est-ce que System Integrity Protection (SIP) sur macOS ?',
      options: [
        'Un antivirus intégré à macOS',
        'Une protection qui empêche les modifications des répertoires système critiques, même en tant que root, sauf depuis macOS Recovery',
        'Un outil de sauvegarde Time Machine',
        'Le pare-feu intégré de macOS',
      ],
      correctIndex: 1,
      explanation: 'SIP protège les dossiers système sensibles (/System, /usr, /bin, /sbin) contre toute modification, même par root. Il ne peut être désactivé qu\'en démarrant en Recovery Mode, ce qui nécessite un accès physique à la machine.',
    },
  ],

};

export function getQuizForCourse(slug: string): QuizQuestion[] {
  return QUIZZES[slug] ?? [];
}


