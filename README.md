# 🍎 MDM Academy — V2 Premium

Plateforme de formation professionnelle Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![Build](https://img.shields.io/badge/Build-80%2F80%20pages-green)](/)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

## ✨ Fonctionnalités V2

- 🎓 **9 modules** — du débutant à l'expert (57+ cours)
- 📊 **Tableau de bord** — progression XP, leçons, quiz
- 🔍 **Recherche instantanée** — Fuse.js, raccourci ⌘K
- 📚 **Bibliothèque de ressources** — scripts, profils, politiques
- 📝 **Contenu MDX** — cours avec schémas, code, tableaux
- 🏆 **Quiz interactifs** — scoring, review, récompenses XP
- 📱 **PWA** — installable sur Android et iOS
- 🌐 **100% statique** — 80 pages SSG, zéro backend requis

## 🛠 Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Next.js | 16.2.9 | Framework App Router |
| TypeScript | ^5 | Typage strict |
| Tailwind CSS | ^4 | Design system |
| Fuse.js | latest | Recherche fuzzy |
| gray-matter | latest | MDX frontmatter |

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Production
npm run build
npm start
```

## 📁 Structure du projet

```
apple-mdm-academy/
├── app/                    # Routes Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── parcours/          # Parcours de formation
│   ├── modules/[slug]/    # Pages modules (SSG)
│   ├── cours/[slug]/      # Pages cours (SSG)
│   ├── dashboard/         # Tableau de bord étudiant
│   ├── certifications/    # Certifications
│   └── ressources/        # Bibliothèque de ressources
├── components/
│   ├── cours/             # CourseCard, ModuleCard, Quiz, LessonPlayer
│   ├── layout/            # Header, Footer
│   └── ui/                # Badges, ProgressRing
├── content/cours/         # Contenu MDX des cours
├── hooks/                 # useProgress()
└── lib/
    ├── courses.ts         # Source de données (9 modules, 57+ cours)
    ├── progress.ts        # Système XP localStorage
    ├── search.ts          # Moteur Fuse.js
    ├── mdx.ts             # Loader MDX
    ├── quizzes.ts         # Questions de quiz
    └── resources.ts       # Bibliothèque de ressources
```

## 📚 Modules de formation

| # | Module | Niveau |
|---|--------|--------|
| 1 | Fondations Apple Enterprise (ABM, ADE) | Débutant |
| 2 | Administration macOS avec Jamf Pro | Intermédiaire |
| 3 | Automatisation Jamf Pro (API, Bash) | Avancé |
| 4 | Sécurité Apple avec Jamf (Protect, Security Cloud) | Avancé |
| 5 | Jamf School (iPad éducation) | Intermédiaire |
| 6 | Jamf Connect (Entra ID, SSO, Zero Trust) | Avancé |
| 7 | Microsoft Intune pour Apple | Intermédiaire |
| 8 | Android Enterprise avec Intune | Intermédiaire |
| 9 | Certifications (Apple, Jamf, Microsoft) | Expert |

## 🏅 Certifications couvertes

- Apple Device Support
- Apple Deployment and Management
- Jamf 100, 170, 200
- Microsoft MD-102
- Microsoft MS-102

## 📦 Build

```
✓ 80/80 pages statiques générées
✓ TypeScript strict : 0 erreur
✓ ESLint : 0 avertissement
```

## 🗺 Roadmap V3

- [ ] Contenu MDX des 55 cours restants
- [ ] Labs pratiques (terminal simulé)
- [ ] Service Worker offline (PWA complète)
- [ ] Authentification + progression cloud
- [ ] Génération de certificats PDF
- [ ] Examens blancs simulés

## 📄 Licence

MIT — voir [LICENSE](LICENSE)
