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
};

export function getQuizForCourse(slug: string): QuizQuestion[] {
  return QUIZZES[slug] ?? [];
}
