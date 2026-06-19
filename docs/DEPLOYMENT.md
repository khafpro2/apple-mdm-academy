# Déploiement Production — Apple MDM Academy

## Vue d'ensemble

Apple MDM Academy est une application **Next.js 16 SSG** (Static Site Generation).  
Toutes les pages sont générées statiquement au build — aucun serveur Node.js requis en production.

**Stack :**
- Framework : Next.js 16.2.9 (App Router, Turbopack)
- Build output : 80 pages HTML statiques
- Hosting recommandé : Vercel (zéro config)
- Repo : https://github.com/khafpro2/apple-mdm-academy

---

## 1. Connexion GitHub → Vercel

### Prérequis
- Compte Vercel (vercel.com) — plan Hobby gratuit suffisant
- Accès admin au repo GitHub `khafpro2/apple-mdm-academy`

### Étapes

```
1. Aller sur https://vercel.com/new
2. Cliquer "Import Git Repository"
3. Autoriser Vercel à accéder à GitHub
4. Sélectionner : khafpro2/apple-mdm-academy
5. Configuration du projet :
   - Framework Preset : Next.js (détecté automatiquement)
   - Root Directory : ./  (racine du repo)
   - Build Command : npm run build
   - Output Directory : .next  (Next.js default)
   - Install Command : npm install
6. Cliquer "Deploy"
```

**Déploiement automatique :**  
Chaque `git push` sur la branche `main` déclenche un nouveau déploiement.  
Les Pull Requests créent des previews automatiques.

---

## 2. Variables d'environnement

### État actuel (V2)

L'application V2 est **100% statique** et n'utilise **aucune variable d'environnement**.  
Toutes les données sont dans le code source (`lib/courses.ts`, `content/cours/*.mdx`).

```
Variables requises : AUCUNE
```

### Variables futures (V3 — Authentification)

Pour la V3 avec Clerk + base de données cloud :

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/parcours

# Base de données (Neon PostgreSQL)
DATABASE_URL=postgresql://...
```

> **Sécurité** : Ne jamais committer ces valeurs dans le code.  
> Les configurer uniquement via le dashboard Vercel → Settings → Environment Variables.

---

## 3. Commandes build

### Développement local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:3000)
npm run dev

# Vérifier le code (ESLint)
npm run lint

# Build production local
npm run build

# Démarrer le serveur de production local
npm start

# Audit du contenu pédagogique
npm run content:check
```

### Build Vercel (automatique)

```bash
npm install      # Install Command
npm run build    # Build Command
# Output : .next/
```

**Temps de build estimé :** 45-90 secondes (80 pages SSG)

---

## 4. Domaine personnalisé

### Ajouter un domaine sur Vercel

```
1. Dashboard Vercel → [Votre projet] → Settings → Domains
2. Ajouter : mdm-academy.votredomaine.com
3. Vercel fournit les enregistrements DNS à ajouter :
   - Type CNAME : mdm-academy → cname.vercel-dns.com
   - Ou Type A si domaine apex : @ → 76.76.21.21
4. Configurer chez votre registrar (OVH, Namecheap, Cloudflare...)
5. Attendre la propagation DNS (5 min - 48h)
6. Vercel active automatiquement HTTPS (Let's Encrypt)
```

### Exemple de configuration DNS (Cloudflare)

```
Nom        Type    Valeur                  Proxy
mdm        CNAME   cname.vercel-dns.com    DNS only (orange off)
```

> **Note Cloudflare** : désactiver le proxy (orange cloud → gris) pour que  
> Vercel puisse gérer le certificat SSL correctement.

---

## 5. Checklist post-déploiement

### Vérifications techniques

```
□ URL principale accessible (https://votre-domaine.com)
□ HTTPS actif (certificat SSL vert)
□ Page d'accueil se charge correctement
□ Navigation entre les modules fonctionne
□ Pages de cours chargent le contenu MDX
□ Recherche instantanée (⌘K) opérationnelle
□ Dashboard de progression accessible (/dashboard)
□ Bibliothèque de ressources (/ressources)
□ Page certifications (/certifications)
□ Pas d'erreur 404 sur les routes dynamiques
□ Sitemap accessible : /sitemap.xml
□ Robots.txt accessible : /robots.txt
```

### Vérifications contenu

```
□ Tous les 9 modules affichent correctement
□ Au moins 5 cours vérifiés manuellement
□ Les quiz fonctionnent (questions + score)
□ Les leçons peuvent être marquées comme complétées
□ Les ressources (scripts, profils) sont téléchargeables
□ La progression XP s'affiche dans le dashboard
```

### Vérifications performance

```
□ Lighthouse score > 90 sur Performance
□ Lighthouse score > 90 sur Accessibility
□ Lighthouse score > 90 sur Best Practices
□ Lighthouse score > 90 sur SEO
□ First Contentful Paint < 1.5s
□ Largest Contentful Paint < 2.5s
```

Tester avec Chrome DevTools → Lighthouse ou https://pagespeed.web.dev/

### Vérifications SEO

```
□ Title et meta description sur chaque page
□ Open Graph tags (partage réseaux sociaux)
□ Sitemap soumis dans Google Search Console
□ Favicon et icônes PWA présents
□ manifest.json accessible : /manifest.json
```

---

## 6. Monitoring Vercel

### Analytics (plan Pro)

```
Dashboard Vercel → Analytics
→ Visiteurs, pages vues, origines géographiques
→ Core Web Vitals en production
→ Alertes de performance
```

### Logs

```
Dashboard Vercel → [Déploiement] → Functions Logs
→ Erreurs runtime (si fonctions Edge/API routes ajoutées en V3)
→ Actuellement : site statique, pas de logs runtime
```

### Alertes de déploiement

```
Dashboard Vercel → Settings → Notifications
→ Email ou Slack sur succès/échec de déploiement
→ Recommandé : activer les alertes d'échec
```

---

## 7. Rollback

En cas de problème après déploiement :

```
Dashboard Vercel → Deployments
→ Trouver le dernier déploiement stable
→ Cliquer "..." → "Promote to Production"
→ Rollback instantané sans re-build
```

---

## 8. Roadmap déploiements futurs

### V3 — Authentification (Clerk)
```
Ajouts requis :
- npm install @clerk/nextjs
- Configurer les variables d'environnement Clerk dans Vercel
- Middleware Next.js pour les routes protégées
- Base de données Neon pour la progression cloud
```

### V3 — Base de données (Neon PostgreSQL)
```
Ajouts requis :
- npm install @neondatabase/serverless drizzle-orm
- DATABASE_URL dans les variables Vercel
- Migrations Drizzle au déploiement
- Basculer de localStorage vers DB pour la progression
```

### Domaine apex (mdm-academy.fr ou similaire)
```
Registrar recommandé : OVH (France) ou Cloudflare
Prix : ~10€/an
Configuration : DNS A record → IP Vercel
```

---

## Contact et support

**Repo GitHub :** https://github.com/khafpro2/apple-mdm-academy  
**Documentation Next.js :** https://nextjs.org/docs  
**Documentation Vercel :** https://vercel.com/docs  
**Statut Vercel :** https://www.vercelstatus.com  
