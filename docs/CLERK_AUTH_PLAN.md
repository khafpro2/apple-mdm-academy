# Plan d'intégration Clerk — Authentification V3

## Vue d'ensemble

L'authentification V3 utilisera **Clerk** pour gérer les comptes utilisateurs  
et **Neon PostgreSQL** pour persister la progression dans le cloud.

**État actuel V2 :** progression en localStorage (par navigateur, pas cross-device)  
**Objectif V3 :** progression cloud synchronisée sur tous les appareils

---

## Stack technique V3

```
Authentification : Clerk (clerk.com)
Base de données  : Neon (neon.tech) — PostgreSQL serverless
ORM              : Drizzle ORM
Stockage         : Vercel Blob (pour les futurs certificats PDF)
```

---

## Schéma de base de données (Drizzle)

```typescript
// db/schema.ts
import { pgTable, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const courseProgress = pgTable('course_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  courseSlug: text('course_slug').notNull(),
  completed: boolean('completed').default(false),
  completedAt: timestamp('completed_at'),
  xpEarned: integer('xp_earned').default(0),
});

export const lessonProgress = pgTable('lesson_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  courseSlug: text('course_slug').notNull(),
  lessonId: text('lesson_id').notNull(),
  completed: boolean('completed').default(false),
  completedAt: timestamp('completed_at'),
});

export const quizScores = pgTable('quiz_scores', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  courseSlug: text('course_slug').notNull(),
  score: integer('score').notNull(),
  maxScore: integer('max_score').notNull(),
  takenAt: timestamp('taken_at').defaultNow(),
});
```

---

## Dépendances à installer (V3)

```bash
# Authentification
npm install @clerk/nextjs

# Base de données
npm install @neondatabase/serverless drizzle-orm drizzle-kit
npm install -D @types/pg

# Utilitaires
npm install nanoid  # Génération d'IDs
```

---

## Variables d'environnement requises

```bash
# .env.local (jamais committer)

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/parcours

# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require
```

---

## Middleware Next.js (à créer)

```typescript
// middleware.ts (racine du projet)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/progress(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

---

## API Routes à créer (V3)

```
app/
├── api/
│   ├── progress/
│   │   ├── route.ts          # GET /api/progress — récupérer progression
│   │   ├── course/
│   │   │   └── route.ts      # POST /api/progress/course — marquer cours complété
│   │   ├── lesson/
│   │   │   └── route.ts      # POST /api/progress/lesson — marquer leçon complétée
│   │   └── quiz/
│   │       └── route.ts      # POST /api/progress/quiz — sauvegarder score quiz
│   └── user/
│       └── route.ts          # GET/POST /api/user — profil utilisateur
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx          # Page Clerk sign-in
└── sign-up/
    └── [[...sign-up]]/
        └── page.tsx          # Page Clerk sign-up
```

---

## Migration localStorage → Cloud (stratégie)

```typescript
// Lors de la première connexion après auth :
// 1. Récupérer les données localStorage existantes
// 2. Les envoyer à l'API pour initialiser la progression cloud
// 3. Continuer avec le cloud uniquement

// hooks/useProgress.ts (V3)
export function useProgress() {
  const { user } = useUser(); // Clerk hook
  
  // Si authentifié → cloud
  // Si non authentifié → localStorage (fonctionnement V2 préservé)
  if (user) {
    return useCloudProgress(user.id);
  }
  return useLocalProgress(); // Fallback V2
}
```

---

## Plan de migration V2 → V3

```
Phase 1 — Préparer l'infrastructure (sans casser V2)
  □ Créer la base Neon
  □ Écrire le schéma Drizzle
  □ Créer les migrations
  □ Créer les API routes (sans auth d'abord)

Phase 2 — Intégrer Clerk
  □ Installer @clerk/nextjs
  □ Configurer le middleware (seulement /dashboard protégé)
  □ Pages sign-in / sign-up
  □ Boutons login/logout dans le Header

Phase 3 — Migration de la progression
  □ Hook useProgress() hybride (local + cloud)
  □ Sync localStorage → cloud à la première connexion
  □ Dashboard mis à jour pour afficher la progression cloud

Phase 4 — Fonctionnalités V3 exclusives
  □ Progression cross-device
  □ Leaderboard anonymisé
  □ Certificats de complétion (PDF via react-pdf)
  □ Badges de certification
```

---

## Coût estimé (plan gratuit)

| Service | Plan gratuit | Limites | Plan Pro |
|---------|-------------|---------|----------|
| Clerk | Gratuit | 10,000 MAU | $25/mois |
| Neon | Gratuit | 0.5 GB, 1 projet | $19/mois |
| Vercel | Hobby gratuit | Déploiements illimités | $20/mois |

**Total plan gratuit : 0€/mois** pour une petite académie (<10,000 utilisateurs)

---

## Ressources

- Clerk docs : https://clerk.com/docs/quickstarts/nextjs
- Neon docs : https://neon.tech/docs/introduction
- Drizzle ORM : https://orm.drizzle.team/docs/get-started-postgresql
- Vercel Postgres : https://vercel.com/docs/storage/vercel-postgres
