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
    {
      id: 'q3',
      question: 'Quel est le rôle d\'un PreStage Enrollment dans un déploiement Zero-Touch ?',
      options: [
        'Créer des comptes utilisateur locaux avant la livraison',
        'Automatiser l\'enrôlement ADE et appliquer profils, policies et packages dès le premier démarrage',
        'Remplacer Apple Business Manager',
        'Désactiver la supervision MDM',
      ],
      correctIndex: 1,
      explanation: 'Un PreStage Enrollment lie un flux ADE (Automated Device Enrollment) à des actions Jamf : profils, policies, packages et scripts s\'appliquent automatiquement au premier setup, sans intervention IT sur chaque Mac.',
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
    {
      id: 'q3',
      question: 'Une Policy ne s\'exécute pas sur un Mac ciblé. Quelle vérification est la plus pertinente en premier ?',
      options: [
        'Réinstaller macOS sur le Mac',
        'Vérifier le scope (Smart Group), le trigger, la fréquence d\'exécution et les logs jamf.log',
        'Supprimer et recréer le compte utilisateur macOS',
        'Désactiver SIP sur le Mac',
      ],
      correctIndex: 1,
      explanation: 'Le diagnostic d\'une Policy commence par le scope (le Mac est-il dans le groupe ?), le trigger (événement déclenché ?), la fréquence (Once per computer déjà exécutée ?) et les logs `/var/log/jamf.log` pour voir si Jamf a tenté l\'exécution.',
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
    {
      id: 'q2',
      question: 'Un Smart Group affiche 0 appareil alors que des Mac devraient correspondre. Quelle est la première cause à vérifier ?',
      options: [
        'Le serveur Jamf Pro est en maintenance planifiée',
        'Les critères utilisent un opérateur incorrect ou une Extension Attribute non collectée (recon manquant)',
        'Les Smart Groups ne fonctionnent que sur les appareils iOS',
        'Il faut redémarrer le Mac pour recalculer le groupe',
      ],
      correctIndex: 1,
      explanation: 'Les Smart Groups s\'appuient sur l\'inventaire Jamf. Si un Extension Attribute n\'a jamais été collecté (recon absent) ou si l\'opérateur/critère est mal formulé, le groupe restera vide. Vérifiez l\'inventaire du Mac et les critères AND/OR.',
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
    {
      id: 'q2',
      question: 'Un Mac affiche FileVault activé mais aucune clé de récupération dans Jamf Pro. Quelle cause est la plus probable ?',
      options: [
        'FileVault a été activé manuellement par l\'utilisateur sans profil MDM d\'escrow',
        'Le Mac n\'est pas supervisé',
        'Jamf Pro ne supporte pas FileVault sur Apple Silicon',
        'La clé est stockée uniquement dans iCloud',
      ],
      correctIndex: 0,
      explanation: 'L\'escrow nécessite un Configuration Profile FileVault avec la redirection de clé vers Jamf. Si FileVault a été activé hors MDM ou sans payload d\'escrow, Jamf ne recevra jamais la PRK — d\'où l\'importance d\'un déploiement centralisé via profil.',
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

  'self-service-jamf': [
    {
      id: 'q1',
      question: 'Quel est l\'avantage principal de Jamf Self Service pour les utilisateurs finaux ?',
      options: [
        'Il remplace complètement le Mac App Store',
        'Il permet aux utilisateurs d\'installer des apps et scripts approuvés par l\'IT sans intervention du helpdesk',
        'Il synchronise automatiquement les fichiers iCloud',
        'Il gère les licences Microsoft 365',
      ],
      correctIndex: 1,
      explanation: 'Self Service est un portail d\'installation en libre-service. L\'utilisateur peut y trouver les applications, scripts et profils approuvés par l\'IT et les installer lui-même, réduisant les tickets helpdesk.',
    },
    {
      id: 'q2',
      question: 'Comment restreindre l\'accès à une Policy Self Service uniquement aux Mac du département Finance ?',
      options: [
        'En ajoutant une restriction dans le payload de la Policy',
        'En définissant le Scope de la Policy sur un Smart Group "Department is Finance"',
        'En modifiant les droits utilisateur dans macOS',
        'En créant un profil de restriction spécifique au département',
      ],
      correctIndex: 1,
      explanation: 'Le Scope d\'une Policy détermine qui peut voir et exécuter l\'action dans Self Service. En ciblant un Smart Group basé sur le département, seuls les Mac concernés verront la Policy.',
    },
    {
      id: 'q3',
      question: 'Quel trigger Jamf Pro est utilisé lorsqu\'un utilisateur lance une action depuis Self Service ?',
      options: ['Login', 'Recurring Check-in', 'Self Service', 'Enrollment Complete'],
      correctIndex: 2,
      explanation: 'Le trigger "Self Service" ne s\'active que lorsque l\'utilisateur déclenche volontairement une Policy depuis l\'application Jamf Self Service — distinct du check-in récurrent ou du login.',
    },
  ],

  'patch-management-jamf': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qu\'un "Patch Title" dans Jamf Pro ?',
      options: [
        'Le titre d\'un rapport de sécurité',
        'Une définition d\'application avec son historique de versions et les critères de détection de conformité',
        'Le nom donné à une Policy de mise à jour',
        'Un alias pour les Smart Groups de patch',
      ],
      correctIndex: 1,
      explanation: 'Un Patch Title dans Jamf Pro est une définition pour une application spécifique qui contient les versions disponibles, les critères de détection d\'installation, et les métadonnées. Il sert de base aux Patch Policies.',
    },
    {
      id: 'q2',
      question: 'Comment forcer la mise à jour d\'une application sur les Mac non conformes avec Jamf Patch Management ?',
      options: [
        'Envoyer un email manuel à chaque utilisateur',
        'Créer une Patch Policy avec une deadline et un grace period, en ciblant le Smart Group des Mac non conformes',
        'Modifier le Patch Title directement sur chaque Mac',
        'Utiliser Apple Remote Desktop',
      ],
      correctIndex: 1,
      explanation: 'Une Patch Policy permet d\'automatiser les mises à jour avec une deadline (date limite) et un grace period (délai accordé à l\'utilisateur pour choisir le moment). Elle cible automatiquement les Mac ayant une version obsolète.',
    },
    {
      id: 'q3',
      question: 'Quel outil Jamf open source permet de synchroniser des titres logiciels et packages entre plusieurs instances Jamf Pro ?',
      options: ['Jamf Composer', 'JamfSync', 'Jamf Connect', 'Jamf Protect'],
      correctIndex: 1,
      explanation: 'JamfSync (github.com/jamf/JamfSync) est l\'outil CLI officiel pour répliquer packages, titres et Distribution Points entre instances — utile pour les environnements dev/staging/prod ou multi-régions.',
    },
  ],

  'reporting-conformite-jamf': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qu\'un Extension Attribute (EA) dans Jamf Pro ?',
      options: [
        'Une extension du navigateur Safari gérée par MDM',
        'Un script ou une valeur personnalisée qui enrichit l\'inventaire Jamf avec des données non collectées nativement',
        'Un attribut de certificat X.509',
        'Une métadonnée de package PKG',
      ],
      correctIndex: 1,
      explanation: 'Les Extension Attributes permettent de collecter des données personnalisées sur les Mac via des scripts Shell (ex: état d\'un logiciel spécifique, configuration réseau, valeur d\'un plist). Ces données apparaissent dans l\'inventaire et peuvent être utilisées dans les Smart Groups.',
    },
  ],

  'api-jamf-pro': [
    {
      id: 'q1',
      question: 'Quelle est la différence entre la Classic API et la Jamf Pro API (v1) ?',
      options: [
        'Il n\'y a aucune différence, ce sont les mêmes endpoints',
        'La Classic API utilise XML et Basic Auth ; la Jamf Pro API utilise JSON et Bearer Token',
        'La Classic API est plus récente et recommandée',
        'La Jamf Pro API ne supporte pas les opérations en écriture (POST/PUT)',
      ],
      correctIndex: 1,
      explanation: 'La Classic API (port /JSSResource/) utilise XML et Basic Auth — elle est ancienne mais couvre tous les objets. La Jamf Pro API (port /api/v1/) utilise JSON et Bearer Token — elle est moderne, RESTful et progressivement remplace la Classic API.',
    },
    {
      id: 'q2',
      question: 'Quelle est la durée de vie par défaut d\'un Bearer Token Jamf Pro API ?',
      options: [
        '20 minutes',
        '30 minutes',
        '2 heures',
        '24 heures',
      ],
      correctIndex: 0,
      explanation: 'Les Bearer Tokens Jamf Pro API expirent après 20 minutes. Pour les scripts longue durée, prolongez le token via POST /v1/auth/keep-alive ou régénérez un nouveau token avant expiration.',
    },
    {
      id: 'q3',
      question: 'Quelle URL permet d\'accéder à la documentation API intégrée dans une instance Jamf Pro ?',
      options: [
        '/JSSResource/doc',
        '/api/doc',
        '/api/v1/swagger',
        '/developer/doc',
      ],
      correctIndex: 1,
      explanation: 'Chaque instance Jamf Pro expose la documentation Swagger UI à /api/doc. La base URL de l\'API REST est /api ; la doc intégrée permet de tester les endpoints directement depuis le navigateur.',
    },
  ],

  'scripting-bash-jamf': [
    {
      id: 'q1',
      question: 'Quel paramètre Jamf Pro correspond au 5ème paramètre passé à un script dans une Policy ?',
      options: [
        '$1',
        '$4',
        '$5',
        '$9',
      ],
      correctIndex: 2,
      explanation: 'Dans Jamf Pro, les paramètres $1, $2, $3 sont réservés (mount point, computer name, username). Les paramètres configurables dans une Policy commencent à $4 (Parameter 4) jusqu\'à $11 (Parameter 8 dans l\'UI Jamf).',
    },
    {
      id: 'q2',
      question: 'Quelle commande Bash permet de lire une valeur depuis un fichier plist macOS ?',
      options: [
        'cat /path/to/file.plist | grep "key"',
        'defaults read /path/to/file key',
        'plist -read /path/to/file key',
        'plutil -get key /path/to/file.plist',
      ],
      correctIndex: 1,
      explanation: 'La commande `defaults read /path/to/file key` permet de lire une valeur spécifique depuis un plist. Par exemple : `defaults read /Library/Preferences/com.jamfsoftware.jamf.plist jss_url` pour lire l\'URL du JSS.',
    },
  ],

  'packaging-avance-jamf': [
    {
      id: 'q1',
      question: 'Quelle commande permet de créer un package PKG plat depuis un dossier payload/ ?',
      options: [
        'pkgutil --create payload/ output.pkg',
        'pkgbuild --root payload/ --identifier com.company.app --version 1.0 output.pkg',
        'productbuild --distribution dist.xml output.pkg',
        'zip -r output.pkg payload/',
      ],
      correctIndex: 1,
      explanation: 'pkgbuild est l\'outil Apple pour créer des composants de package PKG. L\'option --root spécifie le dossier payload, --identifier donne l\'identifiant bundle et --version la version. Pour des packages multi-composants, on utilise ensuite productbuild.',
    },
    {
      id: 'q2',
      question: 'À quoi sert un Distribution Point dans Jamf Pro ?',
      options: [
        'Héberger les packages et fichiers distribués aux Mac gérés via les Policies',
        'Stocker les clés FileVault escrow',
        'Gérer les certificats APNs Apple',
        'Synchroniser les comptes Azure AD',
      ],
      correctIndex: 0,
      explanation: 'Un Distribution Point (DP) est le dépôt de fichiers (packages, scripts, ressources) que les Mac téléchargent lors de l\'exécution des Policies. Il peut être local au JSS ou externe (CDN, cloud storage).',
    },
    {
      id: 'q3',
      question: 'JamfSync est principalement utilisé pour :',
      options: [
        'Synchroniser les mots de passe utilisateur avec Active Directory',
        'Répliquer packages et titres logiciels entre instances Jamf Pro',
        'Chiffrer les disques macOS à distance',
        'Gérer les profils de configuration iOS',
      ],
      correctIndex: 1,
      explanation: 'JamfSync automatise la réplication de contenu (packages, patch titles, Distribution Points) entre plusieurs serveurs Jamf Pro — évite la saisie manuelle dans chaque instance.',
    },
  ],

  'workflows-zero-touch': [
    {
      id: 'q1',
      question: 'Dans un workflow Zero-Touch avec Jamf Pro, quel trigger est automatiquement déclenché à la fin de l\'enrôlement d\'un Mac ?',
      options: [
        'login',
        'startup',
        'enrollment',
        'Enrollment Complete (personnalisé)',
      ],
      correctIndex: 2,
      explanation: 'Le trigger "enrollment" est déclenché automatiquement quand l\'enrôlement MDM est terminé. C\'est le point de départ naturel d\'un workflow Zero-Touch pour déployer les configurations et applications initiales.',
    },
    {
      id: 'q2',
      question: 'Quel outil permet d\'afficher une barre de progression à l\'utilisateur pendant un déploiement Zero-Touch sur macOS ?',
      options: [
        'Spotlight',
        'DEPNotify ou IBM Notifier',
        'Activity Monitor',
        'Console.app',
      ],
      correctIndex: 1,
      explanation: 'DEPNotify et IBM Notifier sont des outils open-source populaires pour afficher une fenêtre de progression pendant le déploiement Zero-Touch. Ils permettent d\'afficher un message, une barre de progression et d\'informer l\'utilisateur des étapes en cours.',
    },
  ],

  'remediation-automatique-jamf': [
    {
      id: 'q1',
      question: 'Quel est le pattern "Detect → Remediate" dans Jamf Pro ?',
      options: [
        'Détecter les menaces avec Jamf Protect puis supprimer les fichiers malveillants',
        'Extension Attribute détecte la non-conformité → Smart Group se met à jour → Policy de remédiation s\'exécute automatiquement',
        'Analyser les logs de la console et corriger manuellement les erreurs',
        'Utiliser l\'API pour forcer un recon sur les Mac non conformes',
      ],
      correctIndex: 1,
      explanation: 'Le pattern Detect → Remediate utilise : un EA (script qui retourne Conformant/Non-conformant), un Smart Group dynamique basé sur le résultat de l\'EA, et une Policy ciblant ce Smart Group avec le trigger "Recurring Checkin" pour corriger automatiquement.',
    },
  ],

  'gestion-mises-a-jour-macos': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que Declarative Device Management (DDM) apporte pour les mises à jour macOS ?',
      options: [
        'DDM permet uniquement de gérer les profils de configuration',
        'DDM permet à l\'appareil de gérer lui-même les mises à jour de façon autonome avec des déclarations d\'état, sans polling constant du MDM',
        'DDM est une alternative à ADE pour l\'enrôlement',
        'DDM nécessite un serveur MDM on-premise',
      ],
      correctIndex: 1,
      explanation: 'DDM (macOS 13+, iOS 16+) introduit un modèle déclaratif : le MDM envoie des déclarations (configurations souhaitées) et l\'appareil les applique de façon autonome. Pour les updates, DDM permet de définir une version cible que l\'appareil installera sans polling MDM répété.',
    },
  ],

  'jamf-security-cloud': [
    {
      id: 'q1',
      question: 'Quel mécanisme Jamf Security Cloud utilise-t-il pour filtrer le trafic web sur les appareils iOS ?',
      options: [
        'Un proxy HTTP transparent',
        'Un profil VPN intégré (DNS over HTTPS ou VPN système) qui intercepte le trafic DNS/réseau',
        'Une extension Safari',
        'Un certificat de Root CA installé sur l\'appareil',
      ],
      correctIndex: 1,
      explanation: 'Jamf Security Cloud déploie un profil VPN intégré (basé sur le Network Extension Framework d\'Apple) qui filtre le trafic DNS et réseau sans accès à l\'intégralité du trafic. Cela permet le filtrage web tout en respectant la vie privée des utilisateurs.',
    },
  ],

  'gatekeeper-xprotect-jamf': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que PPPC (Privacy Preferences Policy Control) dans macOS ?',
      options: [
        'Un protocole de chiffrement Apple propriétaire',
        'Un mécanisme MDM permettant de pré-autoriser l\'accès des applications aux ressources système (Full Disk Access, Caméra, Microphone) via un profil de configuration',
        'Un outil de contrôle parental macOS',
        'Un système de gestion des préférences utilisateur dans Jamf Pro',
      ],
      correctIndex: 1,
      explanation: 'PPPC (payload com.apple.TCC.configuration-profile-policy) permet aux administrateurs MDM de pré-approuver l\'accès des applications aux ressources protégées TCC (Transparency, Consent, and Control) sans que l\'utilisateur ait à cliquer sur "Autoriser". Essentiel pour les agents EDR, AV et outils d\'administration.',
    },
  ],

  'cis-benchmarks-macos': [
    {
      id: 'q1',
      question: 'Quelle est la différence entre les contrôles CIS Level 1 et Level 2 ?',
      options: [
        'Level 1 est pour macOS, Level 2 pour iOS',
        'Level 1 : recommandations à impact minimal sur les opérations ; Level 2 : recommandations plus strictes pouvant impacter l\'utilisabilité',
        'Level 1 concerne les serveurs, Level 2 les postes clients',
        'Level 2 est uniquement applicable aux environnements gouvernementaux',
      ],
      correctIndex: 1,
      explanation: 'Les CIS Benchmarks Level 1 contiennent des contrôles "scored" appliquables à tout environnement avec un impact minimal. Level 2 ajoute des contrôles plus restrictifs qui peuvent affecter les fonctionnalités — recommandés pour les environnements hautement sécurisés.',
    },
  ],

  'threat-detection-compliance': [
    {
      id: 'q1',
      question: 'Quelle technologie macOS Jamf Protect utilise-t-il pour analyser les événements système en temps réel ?',
      options: [
        'kext (Kernel Extension) signature Apple',
        'Endpoint Security Framework (ESF) — API Apple officiellement supportée depuis macOS 10.15',
        'OpenBSM audit trail',
        'Syslog daemon',
      ],
      correctIndex: 1,
      explanation: 'Jamf Protect utilise l\'Endpoint Security Framework (ESF), l\'API Apple officielle pour les solutions de sécurité système. ESF offre une visibilité en temps réel sur les processus, fichiers, réseau et appels système, avec une empreinte minimale et sans nécessiter de Kernel Extension (KEXT).',
    },
  ],

  'presentation-jamf-school': [
    {
      id: 'q1',
      question: 'Quelle est la principale différence entre Jamf School et Jamf Pro ?',
      options: [
        'Jamf School est uniquement pour les Mac, Jamf Pro uniquement pour iOS',
        'Jamf School est optimisé pour l\'éducation avec une interface simplifiée et des fonctionnalités pédagogiques (classes, Teacher app) ; Jamf Pro est l\'outil enterprise complet',
        'Jamf Pro est gratuit, Jamf School est payant',
        'Jamf School ne supporte pas l\'intégration ABM',
      ],
      correctIndex: 1,
      explanation: 'Jamf School est une solution MDM dédiée aux établissements scolaires. Elle offre une interface plus simple, la gestion des classes, l\'app Teacher pour contrôler les iPad en classe et des fonctionnalités adaptées à l\'environnement pédagogique. Jamf Pro est l\'outil enterprise complet, plus puissant mais plus complexe.',
    },
  ],

  'gestion-ipad-jamf-school': [
    {
      id: 'q1',
      question: 'Comment déployer une application iPad en silence pour tous les élèves d\'une classe dans Jamf School ?',
      options: [
        'Envoyer un lien App Store par email aux élèves',
        'Acheter des licences VPP dans ABM et pousser l\'app via une politique Jamf School ciblant la classe, avec installation silencieuse (device-based)',
        'Demander aux élèves de l\'installer depuis l\'App Store avec leur Apple ID personnel',
        'Utiliser Apple Configurator 2 physiquement sur chaque iPad',
      ],
      correctIndex: 1,
      explanation: 'Pour un déploiement silencieux : acheter des licences Apps & Books dans ABM (VPP device-based), synchroniser dans Jamf School, créer une politique d\'installation ciblant la classe ou le groupe d\'appareils. L\'app s\'installe sans intervention utilisateur sur les iPad supervisés.',
    },
  ],

  'classes-utilisateurs-jamf-school': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que l\'app Teacher permet à un enseignant de faire dans Jamf School ?',
      options: [
        'Gérer les notes et les absences des élèves',
        'Contrôler en temps réel les iPad de la classe : verrouiller les écrans, forcer l\'ouverture d\'une app, bloquer les sites web, voir les écrans des élèves',
        'Installer des applications sur les iPad',
        'Modifier les profils MDM des appareils',
      ],
      correctIndex: 1,
      explanation: 'L\'app Apple Classroom (intégrée à Jamf School via les classes) permet à l\'enseignant de : verrouiller tous les iPad simultanément, forcer l\'ouverture d\'une application ou page web, bloquer internet, partager l\'écran d\'un élève sur l\'Apple TV, et plus.',
    },
  ],

  'shared-ipad-jamf-school': [
    {
      id: 'q1',
      question: 'Combien de sessions utilisateurs simultanées un Shared iPad peut-il gérer ?',
      options: [
        '1 seule à la fois (une session active)',
        'Plusieurs sessions sont stockées localement — chaque utilisateur retrouve son environnement personnel en se connectant',
        'Illimitées, le stockage est dans iCloud',
        '5 sessions maximum, configurable via MDM',
      ],
      correctIndex: 1,
      explanation: 'Shared iPad stocke plusieurs profils utilisateurs localement sur l\'appareil. Le nombre dépend du quota configuré par session et de la capacité de stockage. Quand l\'espace manque, les sessions les moins récentes sont supprimées. Chaque utilisateur retrouve son environnement en se connectant avec son Managed Apple Account.',
    },
  ],

  'apps-pedagogiques-jamf-school': [
    {
      id: 'q1',
      question: 'Quelle suite d\'applications Apple est incluse gratuitement sur tous les iPad pour l\'éducation ?',
      options: [
        'Microsoft 365 (Word, Excel, PowerPoint)',
        'iWork (Pages, Numbers, Keynote) + iMovie + GarageBand + Clips',
        'Adobe Creative Suite',
        'Scratch et Swift Playgrounds uniquement',
      ],
      correctIndex: 1,
      explanation: 'Apple inclut gratuitement sur iPad : Pages, Numbers, Keynote (iWork), iMovie, GarageBand et Clips. Swift Playgrounds et d\'autres apps éducatives sont disponibles gratuitement sur l\'App Store. Ces apps couvrent la productivité, la création musicale, vidéo et la programmation.',
    },
  ],

  'securite-milieu-scolaire': [
    {
      id: 'q1',
      question: 'Quelle réglementation encadre la protection des données personnelles des élèves en France ?',
      options: [
        'La loi FERPA américaine',
        'Le RGPD (Règlement Général sur la Protection des Données) et la loi Informatique et Libertés',
        'Le COPPA (Children\'s Online Privacy Protection Act)',
        'La directive NIS2',
      ],
      correctIndex: 1,
      explanation: 'En France, le traitement des données personnelles des élèves mineurs est encadré par le RGPD européen et la loi Informatique et Libertés française. Les établissements scolaires doivent minimiser les données collectées, informer les parents, et ne pas transférer les données en dehors de l\'UE sans garanties.',
    },
  ],

  'jamf-connect-microsoft-entra': [
    {
      id: 'q1',
      question: 'Quel protocole Jamf Connect utilise pour s\'authentifier auprès de Microsoft Entra ID ?',
      options: [
        'SAML 2.0',
        'LDAP',
        'OpenID Connect (OIDC)',
        'Kerberos V5',
      ],
      correctIndex: 2,
      explanation: 'Jamf Connect utilise OpenID Connect (OIDC), une couche d\'identité au-dessus d\'OAuth 2.0. Lors de l\'inscription dans Entra ID, on crée une "App Registration" avec les scopes OIDC appropriés (openid, profile, email) et Jamf Connect utilise ces credentials pour authentifier les utilisateurs.',
    },
  ],

  'single-sign-on-jamf-connect': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que Platform SSO (PSSO) apporte par rapport à l\'extension Kerberos classique ?',
      options: [
        'PSSO est moins sécurisé que Kerberos',
        'PSSO intègre directement l\'authentification macOS (login window et déverrouillage) avec l\'IdP cloud (Entra ID, Okta) via OIDC, unifiant le mot de passe local et cloud',
        'PSSO est uniquement disponible sur les Mac Apple Silicon',
        'PSSO nécessite un Active Directory on-premise',
      ],
      correctIndex: 1,
      explanation: 'Platform SSO (macOS 13+) va au-delà de Kerberos : il permet à l\'IdP cloud de devenir l\'autorité d\'authentification principale du Mac. Le mot de passe macOS se synchronise avec Entra ID/Okta, et la session macOS utilise les tokens OIDC pour le SSO vers les applications cloud.',
    },
  ],

  'synchronisation-mots-de-passe': [
    {
      id: 'q1',
      question: 'Que se passe-t-il quand un utilisateur change son mot de passe Azure AD depuis un autre appareil et revient sur son Mac avec Jamf Connect ?',
      options: [
        'Le Mac refuse la connexion et doit être réenrôlé',
        'Jamf Connect Menu Bar détecte la désynchronisation et invite l\'utilisateur à entrer son nouveau mot de passe cloud pour mettre à jour le mot de passe local macOS',
        'Le mot de passe local est automatiquement mis à jour en arrière-plan',
        'L\'utilisateur doit contacter l\'IT pour réinitialiser son compte local',
      ],
      correctIndex: 1,
      explanation: 'Jamf Connect Sync (dans la barre de menu) détecte la désynchronisation entre le mot de passe cloud et local. Il affiche une notification invitant l\'utilisateur à s\'authentifier avec le nouveau mot de passe cloud, qui met ensuite à jour le mot de passe du compte local macOS de façon transparente.',
    },
  ],

  'zero-trust-jamf-connect': [
    {
      id: 'q1',
      question: 'Comment Jamf Pro communique-t-il la conformité d\'un Mac à Microsoft Entra ID pour le Conditional Access ?',
      options: [
        'Via un agent Microsoft installé sur le Mac',
        'Via le "Compliance Token" Jamf — un JWT signé échangé entre Jamf Pro et Entra ID via l\'intégration partenaire Jamf',
        'Via un profil VPN qui reporte l\'état de conformité',
        'Via les logs FileVault envoyés à Entra ID',
      ],
      correctIndex: 1,
      explanation: 'L\'intégration Jamf Pro + Microsoft Entra ID utilise un "Compliance Token" : un JWT cryptographiquement signé que Jamf Pro émet et envoie à Entra ID. Entra ID fait confiance à ce token pour déterminer si le Mac est conforme et accorder ou bloquer l\'accès conditionnel.',
    },
  ],

  'enrolement-ade-intune': [
    {
      id: 'q1',
      question: 'Quelle action doit être effectuée dans Apple Business Manager après avoir créé un profil ADE dans Microsoft Intune ?',
      options: [
        'Redémarrer le serveur MDM Intune',
        'Assigner le profil ADE Intune aux appareils concernés dans ABM (Appareils → Modifier le serveur MDM)',
        'Reconfigurer le certificat APNs',
        'Synchroniser manuellement ABM depuis le portail Azure',
      ],
      correctIndex: 1,
      explanation: 'Le profil ADE est créé dans Intune mais l\'assignation se fait dans ABM. Il faut aller dans ABM → Appareils → sélectionner les appareils → "Modifier le serveur MDM" pour les associer au profil Intune. Sans cette étape, les appareils ne recevront pas le profil lors de l\'activation.',
    },
  ],

  'gestion-macos-intune': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que le "Settings Catalog" dans Microsoft Intune pour macOS ?',
      options: [
        'Un catalogue des applications disponibles dans le Mac App Store',
        'Une interface de configuration qui expose toutes les clés MDM Apple disponibles avec recherche et catégorisation, remplaçant les templates statiques',
        'Un rapport d\'inventaire des paramètres système des Mac gérés',
        'Une fonctionnalité d\'Apple Configurator 2 intégrée à Intune',
      ],
      correctIndex: 1,
      explanation: 'Le Settings Catalog dans Intune est une interface moderne qui expose des milliers de paramètres MDM macOS (et iOS/Windows) avec une recherche intégrée. Il est mis à jour régulièrement et remplace progressivement les "Device Configuration Profiles" classiques basés sur des templates fixes.',
    },
  ],

  'gestion-iphone-ipad-intune': [
    {
      id: 'q1',
      question: 'Comment déployer Microsoft Outlook sur des iPhone gérés par Intune avec pré-configuration du compte email ?',
      options: [
        'Demander à chaque utilisateur de configurer Outlook manuellement',
        'Déployer Outlook via Intune en Required + créer une App Configuration Policy avec les paramètres email préconfigurés',
        'Utiliser un profil Exchange natif pour configurer Mail.app',
        'Synchroniser via iCloud Exchange',
      ],
      correctIndex: 1,
      explanation: 'Pour pré-configurer Outlook sur iPhone : déployer l\'app Outlook (Required) + créer une App Configuration Policy ciblant Outlook avec les clés de configuration (email, serveur, authentification moderne). L\'app se configure automatiquement à l\'ouverture avec le compte Microsoft 365 de l\'utilisateur.',
    },
  ],

  'compliance-policies-intune-apple': [
    {
      id: 'q1',
      question: 'Qu\'arrive-t-il à un Mac marqué "Non conforme" dans Intune si une politique d\'accès conditionnel est configurée ?',
      options: [
        'Rien — la non-conformité est uniquement informative',
        'L\'accès aux ressources Microsoft 365 (Exchange, SharePoint, Teams) est bloqué jusqu\'à ce que la conformité soit rétablie',
        'Le Mac est automatiquement réinitialisé aux paramètres d\'usine',
        'L\'utilisateur reçoit un email et a 30 jours pour corriger',
      ],
      correctIndex: 1,
      explanation: 'Quand Conditional Access requiert "Require device to be marked as compliant" et que le Mac est non-conforme dans Intune, l\'accès aux ressources protégées (Office 365, SharePoint, etc.) est bloqué. L\'utilisateur voit un message d\'erreur avec un lien vers le portail Company Portal pour résoudre les problèmes.',
    },
  ],

  'conditional-access-apple-intune': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qu\'un "Named Location" dans Microsoft Conditional Access ?',
      options: [
        'Le nom géographique du bureau Entra ID',
        'Une plage d\'adresses IP ou un pays considéré comme "de confiance" dans les politiques CAP — peut exclure ou inclure l\'accès selon la localisation',
        'L\'emplacement de stockage des logs d\'authentification',
        'Un alias pour les groupes de sécurité Azure AD',
      ],
      correctIndex: 1,
      explanation: 'Les Named Locations permettent de définir des emplacements de confiance (ex: plages IP du bureau) dans les politiques CAP. On peut ainsi exiger MFA uniquement depuis des connexions hors-bureau, ou bloquer l\'accès depuis certains pays.',
    },
  ],

  'microsoft-defender-apple': [
    {
      id: 'q1',
      question: 'Quel composant de Microsoft Defender for Endpoint est requis pour la protection antivirus sur macOS ?',
      options: [
        'Microsoft Security Center uniquement',
        'L\'agent MDE avec les permissions PPPC : Full Disk Access, System Extension approuvée, et Network Extension pour la protection réseau',
        'Un Kernel Extension (KEXT) Apple signé',
        'Microsoft Endpoint Manager uniquement',
      ],
      correctIndex: 1,
      explanation: 'MDE sur macOS nécessite plusieurs permissions déployées via MDM : Full Disk Access (PPPC payload) pour analyser tous les fichiers, approbation de la System Extension Microsoft (remplaçant le KEXT), et Network Extension pour la protection réseau/phishing.',
    },
  ],

  'profils-configuration-intune-apple': [
    {
      id: 'q1',
      question: 'Quand faut-il utiliser un profil "Custom Configuration" (PLIST) dans Intune plutôt que le Settings Catalog ?',
      options: [
        'Toujours — les profils personnalisés sont plus flexibles',
        'Quand une clé MDM Apple spécifique n\'est pas encore disponible dans le Settings Catalog, on peut la déployer via un payload PLIST personnalisé',
        'Pour tous les paramètres liés à la sécurité',
        'Uniquement pour les appareils iOS, pas macOS',
      ],
      correctIndex: 1,
      explanation: 'Le Settings Catalog ne couvre pas encore toutes les clés MDM Apple disponibles. Pour les paramètres non encore intégrés (ex: certains payloads d\'applications tierces, configurations spécifiques), on crée un profil Custom avec le payload PLIST/XML correct selon la documentation Apple MDM.',
    },
  ],


  'android-work-profile': [
    {
      id: 'q1',
      question: 'Un employé BYOD avec Work Profile peut-il voir ses applications professionnelles et personnelles dans la même liste ?',
      options: [
        'Oui, toutes les apps sont visibles dans le même lanceur',
        'Non — les apps Work Profile ont une icône avec un badge "valise" et sont visuellement séparées, mais accessibles depuis le même lanceur avec une section distincte',
        'Les apps professionnelles remplacent complètement les apps personnelles',
        'Les apps professionnelles ne sont visibles que dans une application Portail d\'entreprise dédiée',
      ],
      correctIndex: 1,
      explanation: 'Android Work Profile crée une séparation visuelle et cryptographique : les apps pro ont un badge "valise" dans le lanceur. Sur Android 11+, les apps pro et perso sont dans des onglets séparés. Les données entre les deux profiles ne peuvent pas se mélanger (pas de copier-coller entre profiles sauf si autorisé).',
    },
  ],

  'android-fully-managed': [
    {
      id: 'q1',
      question: 'Quelle méthode d\'enrôlement Android Enterprise ne nécessite aucune interaction physique avec l\'appareil ?',
      options: [
        'Enrôlement par QR Code',
        'Enrôlement NFC avec tag',
        'Zero-Touch Enrollment — l\'appareil est pré-configuré par le revendeur et s\'enrôle automatiquement à la première mise en route',
        'Enrôlement via SMS',
      ],
      correctIndex: 2,
      explanation: 'Android Zero-Touch Enrollment est l\'équivalent Android de l\'ADE Apple. L\'entreprise configure les appareils dans le portail Zero-Touch (avec le revendeur), et à la première mise en route, l\'appareil s\'enrôle automatiquement dans le MDM sans aucune action utilisateur.',
    },
  ],

  'android-cope': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qui différencie COPE d\'un Work Profile BYOD classique ?',
      options: [
        'Il n\'y a aucune différence — COPE est juste un autre nom pour BYOD',
        'En COPE, l\'appareil appartient à l\'entreprise (enrollment Fully Managed) mais un Work Profile personnel est créé pour l\'usage perso — l\'IT a plus de contrôle qu\'en BYOD',
        'COPE est uniquement disponible sur les appareils Samsung',
        'En COPE, l\'utilisateur ne peut pas installer d\'apps personnelles',
      ],
      correctIndex: 1,
      explanation: 'COPE (Corporate Owned Personally Enabled) : l\'appareil est d\'entreprise (enrolled comme Fully Managed), mais Android crée automatiquement un Work Profile personnel. L\'IT contrôle le profil entreprise complètement, et peut aussi appliquer des limites au profil personnel (ex: bloquer certains sites même en mode perso).',
    },
  ],

  'android-dedicated-devices': [
    {
      id: 'q1',
      question: 'Quel composant Google permet d\'afficher un écran d\'accueil personnalisé sur un appareil Android Dedicated (COSU) ?',
      options: [
        'Google Workspace Launcher',
        'Managed Home Screen (MHS) — une app Microsoft déployée via Intune qui remplace le launcher par défaut sur les appareils kiosque',
        'Android Enterprise Kiosk Mode natif',
        'Google Device Policy App',
      ],
      correctIndex: 1,
      explanation: 'Managed Home Screen (MHS) est une application Microsoft déployée via Intune sur les appareils Dedicated. Elle remplace le launcher Android par défaut et affiche uniquement les apps autorisées, les raccourcis configurés, et l\'identité de l\'entreprise — parfait pour les kiosques et terminaux partagés.',
    },
  ],

  'deploiement-apps-android': [
    {
      id: 'q1',
      question: 'Comment déployer une application interne (APK propriétaire) sur des appareils Android Enterprise gérés par Intune ?',
      options: [
        'Envoyer le fichier APK par email aux utilisateurs',
        'Uploader l\'APK comme application "Private App" dans Managed Google Play, puis la déployer via Intune en mode Required',
        'Installer manuellement l\'APK en activant les sources inconnues',
        'Utiliser ADB (Android Debug Bridge) pour chaque appareil',
      ],
      correctIndex: 1,
      explanation: 'Pour les apps internes, il faut : publier l\'APK comme "Private App" dans Managed Google Play (accessible uniquement à votre organisation), puis la synchroniser et déployer dans Intune. Ce processus évite d\'activer "sources inconnues" et maintient la sécurité Android Enterprise.',
    },
  ],

  'politiques-conformite-android': [
    {
      id: 'q1',
      question: 'Qu\'est-ce que l\'attestation SafetyNet/Play Integrity dans une Compliance Policy Android ?',
      options: [
        'Un service de sauvegarde Google pour les données d\'entreprise',
        'Une vérification Google qui certifie que l\'appareil n\'est pas rooté, que le bootloader est verrouillé et que le système n\'a pas été modifié',
        'Un système d\'authentification biométrique Android',
        'Un contrôle de version de l\'application Company Portal',
      ],
      correctIndex: 1,
      explanation: 'L\'attestation Play Integrity (anciennement SafetyNet) est une API Google qui évalue l\'intégrité de l\'appareil. Elle détecte le rooting, les bootloaders déverrouillés, les ROM personnalisées et les appareils émulés. Les Compliance Policies Intune peuvent exiger un niveau d\'attestation spécifique.',
    },
  ],

  'securite-android-intune': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qu\'une App Protection Policy (APP/MAM) dans Intune et comment diffère-t-elle d\'une Compliance Policy ?',
      options: [
        'Les deux font la même chose, seul le nom diffère',
        'APP protège les données DANS les applications (copier-coller, sauvegarde, chiffrement des données d\'app) sans nécessiter d\'enrôlement MDM ; Compliance Policy évalue l\'état de sécurité de l\'appareil entier',
        'APP est uniquement pour iOS, Compliance Policy uniquement pour Android',
        'APP nécessite l\'enrôlement MDM, la Compliance Policy fonctionne sans MDM',
      ],
      correctIndex: 1,
      explanation: 'App Protection Policies (MAM) contrôlent les données dans les apps managées (Outlook, Teams, Edge) : interdire le copier-coller vers apps non managées, forcer le chiffrement, bloquer les captures d\'écran. Elles fonctionnent SANS enrôlement MDM (MAM-WE). Les Compliance Policies évaluent l\'appareil entier et nécessitent l\'enrôlement.',
    },
  ],

  'certification-apple-device-support': [
    {
      id: 'q1',
      question: 'Combien de jours sont généralement accordés pour passer l\'examen Apple Device Support après inscription ?',
      options: [
        'Aucun délai — on peut s\'inscrire et passer le même jour',
        'L\'examen est disponible immédiatement après paiement sur Pearson VUE — pas de délai imposé, on choisit sa date',
        '30 jours obligatoires de formation',
        '90 jours maximums après inscription',
      ],
      correctIndex: 1,
      explanation: 'Les examens Apple (Device Support, Deployment and Management) sont disponibles via Pearson VUE. Après paiement, on choisit librement sa date et son centre de passage (ou en ligne). Il n\'y a pas de formation obligatoire imposée par Apple — l\'expérience pratique et l\'auto-formation suffisent.',
    },
  ],

  'certification-apple-deployment': [
    {
      id: 'q1',
      question: 'Quel est le périmètre principal de l\'examen Apple Deployment and Management ?',
      options: [
        'Uniquement la gestion macOS avec Jamf Pro',
        'La gestion MDM des appareils Apple (Mac, iPhone, iPad) : ABM, ADE, profils de configuration, Apps & Books, et outils MDM',
        'Le support helpdesk et le dépannage des appareils Apple',
        'Le développement d\'applications iOS avec Xcode',
      ],
      correctIndex: 1,
      explanation: 'L\'examen Apple Deployment and Management couvre : Apple Business Manager (ABM), Automated Device Enrollment (ADE), profils de configuration MDM, Apps & Books (VPP), gestion des Managed Apple Accounts, et les concepts de déploiement multi-appareils. Il est agnostique au MDM (Jamf, Intune, etc.).',
    },
  ],

  'certification-jamf-100': [
    {
      id: 'q1',
      question: 'Quel est le niveau et la durée approximative de l\'examen Jamf 100 ?',
      options: [
        'Expert — 4 heures, 200 questions',
        'Débutant/Fondamentaux — 1h30, 60 questions à choix multiples sur les bases de Jamf Pro',
        'Intermédiaire — 3 heures, 100 questions pratiques en lab',
        'Introduction — 30 minutes, 20 questions',
      ],
      correctIndex: 1,
      explanation: 'Le Jamf 100 Course est un examen d\'entrée de gamme d\'environ 1h30 avec ~60 questions QCM. Il teste les fondamentaux Jamf Pro : enrôlement, Smart Groups, profils, policies, Self Service. C\'est le prérequis recommandé avant les parcours Jamf 170 et 200.',
    },
  ],

  'certification-jamf-170': [
    {
      id: 'q1',
      question: 'Quel prérequis officiel Jamf recommande avant de passer le Jamf 170 ?',
      options: [
        'Aucun prérequis — accessible à tous',
        'Avoir la certification Jamf 100 et 6+ mois d\'expérience pratique avec Jamf Pro, notamment en scripting et API',
        'Être employé chez un partenaire Jamf certifié',
        'Avoir une certification Apple Device Support',
      ],
      correctIndex: 1,
      explanation: 'Jamf recommande d\'avoir le Jamf 100 Course avant de passer le Jamf 170 Course. Une expérience pratique significative en scripting Bash, API Jamf Pro, packaging PKG et automatisation est nécessaire pour réussir cet examen avancé.',
    },
  ],

  'certification-jamf-200': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qui distingue le Jamf 200 Course des autres parcours Jamf ?',
      options: [
        'Il est uniquement disponible en ligne',
        'C\'est un parcours intermédiaire couvrant l\'administration avancée Jamf Pro, le packaging, les scripts et les intégrations',
        'Il n\'y a pas d\'examen — c\'est basé sur un portfolio de projets uniquement',
        'Il est réservé aux ingénieurs Jamf employees',
      ],
      correctIndex: 1,
      explanation: 'Le Jamf 200 Course approfondit l\'administration Jamf Pro : packaging, scripts, API, architecture et intégrations avancées. C\'est le niveau intermédiaire recommandé avant les parcours Jamf 300 et 400.',
    },
  ],

  'certification-md-102': [
    {
      id: 'q1',
      question: 'Quel est l\'intitulé officiel de la certification obtenue après l\'examen MD-102 ?',
      options: [
        'Microsoft Certified: Azure Administrator Associate',
        'Microsoft 365 Certified: Endpoint Administrator Associate',
        'Microsoft Certified: Security Operations Analyst',
        'Microsoft 365 Certified: Modern Desktop Administrator',
      ],
      correctIndex: 1,
      explanation: 'L\'examen MD-102 mène à la certification "Microsoft 365 Certified: Endpoint Administrator Associate". Elle valide les compétences en gestion des endpoints : Windows, macOS, iOS/Android avec Intune, politiques de conformité, Autopilot, et sécurité des appareils.',
    },
  ],

  'certification-ms-102': [
    {
      id: 'q1',
      question: 'Quel est le prérequis recommandé avant de passer l\'examen MS-102 ?',
      options: [
        'Aucun prérequis nécessaire',
        'Avoir la certification MD-102 (Endpoint Administrator) ou une expérience équivalente en administration Microsoft 365',
        'Avoir 5 ans d\'expérience minimum en IT',
        'Avoir une certification AWS ou GCP',
      ],
      correctIndex: 1,
      explanation: 'MS-102 mène à "Microsoft 365 Certified: Administrator Expert". Microsoft recommande d\'avoir d\'abord le MD-102 (Endpoint Administrator Associate) car MS-102 couvre des sujets avancés : Entra ID governance, Microsoft Defender, Purview Compliance, et l\'administration tenant M365 complète.',
    },
  ],

  // ─── Module 10 — Gestion Moderne Apple ───────────────────────────────────
  'histoire-mdm-apple': [
    {
      id: 'q1',
      question: 'Quel service Apple est au cœur de la livraison des commandes MDM vers les appareils ?',
      options: ['iCloud Drive', 'APNS (Apple Push Notification Service)', 'FaceTime', 'AirDrop'],
      correctIndex: 1,
      explanation: 'Le protocole MDM Apple s\'appuie sur APNS : le serveur envoie une notification push, l\'appareil se connecte ensuite au MDM pour récupérer les commandes en attente.',
    },
    {
      id: 'q2',
      question: 'Quelle innovation Apple (2021+) marque le passage vers la « gestion moderne » ?',
      options: [
        'Le retour du bind Active Directory obligatoire',
        'Declarative Device Management (DDM)',
        'La fin du chiffrement FileVault',
        'La suppression d\'Apple Business Manager',
      ],
      correctIndex: 1,
      explanation: 'DDM, annoncé à la WWDC 2021, introduit un modèle déclaratif où l\'appareil applique un état souhaité de façon autonome — pilier de la gestion moderne Apple.',
    },
  ],

  'mdm-classique-vs-ddm': [
    {
      id: 'q1',
      question: 'Quelle est la différence fondamentale entre MDM classique et DDM ?',
      options: [
        'DDM ne fonctionne que sur iPhone',
        'MDM classique = commandes impératives serveur→appareil ; DDM = déclarations d\'état appliquées côté appareil',
        'DDM remplace entièrement APNS',
        'MDM classique est plus récent que DDM',
      ],
      correctIndex: 1,
      explanation: 'Le MDM impératif attend des commandes explicites (InstallProfile, etc.). DDM envoie des déclarations : l\'appareil sait quel état maintenir et agit proactivement.',
    },
    {
      id: 'q2',
      question: 'Pourquoi le modèle classique atteint-il ses limites en environnement hybride ?',
      options: [
        'Il ne supporte pas FileVault',
        'La latence check-in/polling et la charge serveur augmentent avec des appareils mobiles et distants',
        'Il est incompatible avec Apple Silicon',
        'Il nécessite un VPN permanent',
      ],
      correctIndex: 1,
      explanation: 'En télétravail, les appareils ne check-in pas toujours au même rythme. Le polling constant crée latence et charge — DDM répartit l\'intelligence côté appareil.',
    },
  ],

  'declarative-device-management': [
    {
      id: 'q1',
      question: 'Quels sont les trois piliers de DDM selon Apple ?',
      options: [
        'VPN, AD et antivirus',
        'Déclarations, status channel et extensibilité',
        'ABM, APNS et iCloud',
        'Smart Groups, Policies et Scripts',
      ],
      correctIndex: 1,
      explanation: 'DDM repose sur les déclarations (état souhaité), le status channel (reporting appareil→serveur) et l\'extensibilité (nouveaux types de déclarations).',
    },
    {
      id: 'q2',
      question: 'Que permet une Software Update Declaration en DDM ?',
      options: [
        'Désactiver les mises à jour macOS',
        'Définir une version cible que l\'appareil installera de façon autonome',
        'Forcer un wipe à distance',
        'Créer un compte admin local',
      ],
      correctIndex: 1,
      explanation: 'Les Software Update Declarations permettent au MDM de déclarer la version OS cible ; l\'appareil gère le téléchargement et l\'installation sans commandes répétées.',
    },
  ],

  'cloud-first-management': [
    {
      id: 'q1',
      question: 'Quel principe définit une stratégie « cloud-first » pour Apple ?',
      options: [
        'Conserver Active Directory on-premise comme source d\'identité unique',
        'IdP cloud, MDM SaaS et ABM comme fondations — minimiser l\'infra locale',
        'Désactiver la supervision MDM',
        'Utiliser uniquement des appareils non managés',
      ],
      correctIndex: 1,
      explanation: 'Cloud-first place l\'identité (Entra ID, Google), le MDM (Jamf Cloud) et ABM dans le cloud, éliminant bind AD et serveurs MDM on-premise.',
    },
    {
      id: 'q2',
      question: 'Quel outil Jamf remplace typiquement le bind AD local sur macOS ?',
      options: ['Jamf Protect', 'Jamf Connect', 'Jamf School', 'Jamf Composer'],
      correctIndex: 1,
      explanation: 'Jamf Connect authentifie les utilisateurs via IdP cloud (Entra ID) et crée des comptes locaux synchronisés — sans bind AD traditionnel.',
    },
  ],

  'device-trust-apple': [
    {
      id: 'q1',
      question: 'Qu\'est-ce qu\'un « signal de conformité » dans la gestion moderne ?',
      options: [
        'Un email de rappel aux utilisateurs',
        'Une donnée remontée par le MDM (FileVault, OS version, etc.) utilisée pour décider l\'accès',
        'Un certificat SSL du serveur MDM',
        'Un profil Wi-Fi entreprise',
      ],
      correctIndex: 1,
      explanation: 'Les signaux de conformité (FileVault actif, OS à jour, absence de malware) alimentent Conditional Access et device trust pour autoriser ou bloquer l\'accès.',
    },
    {
      id: 'q2',
      question: 'Comment Jamf Pro contribue-t-il au device trust avec Microsoft Entra ID ?',
      options: [
        'En remplaçant Entra ID',
        'En remontant l\'état de conformité des Mac vers Entra pour Conditional Access',
        'En désactivant MFA',
        'En créant des comptes Apple ID',
      ],
      correctIndex: 1,
      explanation: 'L\'intégration Jamf + Entra ID transmet la conformité du Mac (via Jamf) à Conditional Access, qui peut bloquer l\'accès M365 si l\'appareil n\'est pas conforme.',
    },
  ],

  'identity-access-management-apple': [
    {
      id: 'q1',
      question: 'Quelle est la différence entre un Apple ID personnel et un Managed Apple Account ?',
      options: [
        'Aucune — ce sont identiques',
        'Le MAA est créé et géré par l\'organisation via ABM, pas par l\'utilisateur',
        'Le MAA ne fonctionne que sur iPhone',
        'L\'Apple ID personnel est obligatoire en entreprise',
      ],
      correctIndex: 1,
      explanation: 'Les Managed Apple Accounts (MAA) sont provisionnés par l\'organisation via ABM ou fédération IdP — l\'IT contrôle le cycle de vie, contrairement à un Apple ID personnel.',
    },
    {
      id: 'q2',
      question: 'Quel protocole est couramment utilisé pour fédérer ABM avec Entra ID ?',
      options: ['FTP', 'OIDC / SAML via fédération', 'SNMP', 'LDAP bind uniquement'],
      correctIndex: 1,
      explanation: 'La fédération ABM avec Entra ID utilise OIDC/SAML pour synchroniser identités et permettre aux utilisateurs de s\'authentifier avec leurs credentials entreprise.',
    },
  ],

  'jamf-connect-gestion-moderne': [
    {
      id: 'q1',
      question: 'Quel est le rôle principal de Jamf Connect Login ?',
      options: [
        'Installer des applications depuis Self Service',
        'Authentifier l\'utilisateur via IdP cloud à l\'écran de connexion macOS',
        'Chiffrer le disque FileVault',
        'Gérer les certificats APNs',
      ],
      correctIndex: 1,
      explanation: 'Jamf Connect Login remplace l\'écran de connexion local par une authentification cloud (Entra ID, Okta) et provisionne le compte macOS correspondant.',
    },
    {
      id: 'q2',
      question: 'Pourquoi Jamf Connect est-il central dans la gestion moderne ?',
      options: [
        'Il remplace Jamf Pro entièrement',
        'Il unifie identité cloud et expérience Mac sans AD on-premise',
        'Il gère uniquement les iPad',
        'Il est requis pour DDM',
      ],
      correctIndex: 1,
      explanation: 'La gestion moderne repose sur identité cloud + appareil conforme. Jamf Connect fait le lien entre IdP et session macOS, éliminant le bind AD legacy.',
    },
  ],

  'zero-trust-apple': [
    {
      id: 'q1',
      question: 'Quel principe Zero Trust signifie « ne jamais faire confiance au réseau » ?',
      options: [
        'Moindre privilège',
        'Vérifier explicitement chaque accès, indépendamment du réseau (VPN ou bureau)',
        'Présumer la compromission',
        'Chiffrement FileVault',
      ],
      correctIndex: 1,
      explanation: 'Zero Trust exige de vérifier identité, appareil et contexte à chaque accès — le fait d\'être « sur le réseau entreprise » ne suffit plus.',
    },
    {
      id: 'q2',
      question: 'Quelle combinaison typique implémente Zero Trust sur macOS ?',
      options: [
        'VPN permanent + antivirus seul',
        'Jamf Pro (conformité) + Jamf Connect (identité) + Entra Conditional Access',
        'Apple ID + iCloud',
        'Bind AD + pare-feu réseau',
      ],
      correctIndex: 1,
      explanation: 'La stack Zero Trust Apple combine conformité appareil (Jamf), identité cloud (Jamf Connect + Entra) et politiques d\'accès (Conditional Access).',
    },
  ],

  'conformite-moderne-apple': [
    {
      id: 'q1',
      question: 'Comment DDM améliore-t-il le reporting de conformité ?',
      options: [
        'Il supprime tout reporting',
        'Le status channel remonte l\'état des déclarations en temps quasi réel',
        'Il nécessite un audit manuel mensuel',
        'Il remplace les Smart Groups',
      ],
      correctIndex: 1,
      explanation: 'DDM permet aux appareils de reporter proactivement l\'état de leurs déclarations via le status channel — données plus fraîches pour la conformité.',
    },
    {
      id: 'q2',
      question: 'Quel cadre est souvent mappé aux contrôles MDM macOS en entreprise ?',
      options: ['HTML5', 'CIS Apple macOS Benchmark', 'SMTP', 'DNSSEC'],
      correctIndex: 1,
      explanation: 'Le CIS Benchmark macOS fournit des contrôles mesurables (FileVault, Gatekeeper, etc.) alignables avec profils MDM et Smart Groups Jamf.',
    },
  ],

  'futur-mdm-apple': [
    {
      id: 'q1',
      question: 'Selon Apple et l\'industrie, quelle direction prend le protocole MDM ?',
      options: [
        'Retour au MDM impératif uniquement',
        'Extension progressive de DDM et autonomie appareil',
        'Fin du MDM au profit d\'antivirus',
        'Obligation du bind AD',
      ],
      correctIndex: 1,
      explanation: 'Apple positionne DDM comme l\'avenir du MDM : plus de types de déclarations, moins de commandes impératives, appareils plus autonomes.',
    },
    {
      id: 'q2',
      question: 'Quelle source est recommandée pour rester à jour sur l\'avenir MDM Apple ?',
      options: [
        'Forums Windows uniquement',
        'WWDC Device Management sessions + Apple Developer Documentation + Jamf Learn',
        'Documentation Oracle',
        'RFC SMTP',
      ],
      correctIndex: 1,
      explanation: 'Apple annonce les évolutions MDM/DDM à la WWDC ; la doc développeur et Jamf Learn complètent la veille pour les admins enterprise.',
    },
  ],

};

export function getQuizForCourse(slug: string): QuizQuestion[] {
  return QUIZZES[slug] ?? [];
}


