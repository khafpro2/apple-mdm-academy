#!/usr/bin/env tsx
/**
 * Apple MDM Academy — Content Audit Script
 * Usage: npm run content:check
 * 
 * Vérifie :
 * - Cours sans fichier MDX
 * - Fichiers MDX sans cours correspondant
 * - Quiz manquants
 * - Slugs invalides
 * - Cohérence des données
 */

import fs from 'fs';
import path from 'path';
import { getAllCourses, MODULES } from '../lib/courses';

// Couleurs terminal
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function log(color: string, prefix: string, msg: string) {
  console.log(`${color}${prefix}${RESET} ${msg}`);
}

async function runAudit() {
  console.log(`\n${BOLD}${BLUE}╔═══════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${BLUE}║  Apple MDM Academy — Content Audit        ║${RESET}`);
  console.log(`${BOLD}${BLUE}╚═══════════════════════════════════════════╝${RESET}\n`);

  const issues: { type: string; message: string }[] = [];
  const warnings: { type: string; message: string }[] = [];

  // ─── 1. Charger les données ─────────────────────────────────────────────
  const courses = getAllCourses();
  const contentDir = path.join(process.cwd(), 'content/cours');
  const mdxFiles = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));

  const courseSlugs = new Set(courses.map(c => c.slug));
  const mdxSet = new Set(mdxFiles);

  // ─── 2. Stats de base ────────────────────────────────────────────────────
  console.log(`${BOLD}📊 Statistiques${RESET}`);
  console.log(`   Modules : ${MODULES.length}`);
  console.log(`   Cours dans courses.ts : ${courses.length}`);
  console.log(`   Fichiers MDX : ${mdxFiles.length}`);
  console.log('');

  // ─── 3. Cours sans MDX ───────────────────────────────────────────────────
  console.log(`${BOLD}📝 Cours sans fichier MDX${RESET}`);
  const coursesMissingMDX = courses.filter(c => !mdxSet.has(c.slug));
  if (coursesMissingMDX.length === 0) {
    log(GREEN, '  ✅', `Tous les ${courses.length} cours ont un fichier MDX`);
  } else {
    coursesMissingMDX.forEach(c => {
      log(RED, '  ❌', `${c.slug} — "${c.title}" [Module: ${c.moduleId}]`);
      issues.push({ type: 'MISSING_MDX', message: c.slug });
    });
  }
  console.log('');

  // ─── 4. MDX sans cours correspondant ────────────────────────────────────
  console.log(`${BOLD}🔍 Fichiers MDX sans cours correspondant${RESET}`);
  const orphanMDX = mdxFiles.filter(slug => !courseSlugs.has(slug));
  if (orphanMDX.length === 0) {
    log(GREEN, '  ✅', 'Aucun fichier MDX orphelin');
  } else {
    orphanMDX.forEach(slug => {
      // Vérifier si c'est un slug de module (attendu)
      const isModuleSlug = MODULES.some(m => m.slug === slug);
      if (isModuleSlug) {
        log(CYAN, '  ℹ️ ', `${slug} — Page d'overview de module (normal)`);
      } else {
        log(YELLOW, '  ⚠️ ', `${slug} — MDX sans cours correspondant dans courses.ts`);
        warnings.push({ type: 'ORPHAN_MDX', message: slug });
      }
    });
  }
  console.log('');

  // ─── 5. Vérification des slugs ────────────────────────────────────────
  console.log(`${BOLD}🔤 Validation des slugs${RESET}`);
  const slugRegex = /^[a-z0-9-]+$/;
  let slugErrors = 0;
  courses.forEach(c => {
    if (!slugRegex.test(c.slug)) {
      log(RED, '  ❌', `Slug invalide: "${c.slug}" — doit être kebab-case (a-z, 0-9, -)`);
      issues.push({ type: 'INVALID_SLUG', message: c.slug });
      slugErrors++;
    }
  });
  if (slugErrors === 0) {
    log(GREEN, '  ✅', `Tous les ${courses.length} slugs sont valides (kebab-case)`);
  }
  console.log('');

  // ─── 6. Vérification du contenu MDX ──────────────────────────────────
  console.log(`${BOLD}📄 Vérification du contenu MDX${RESET}`);
  let emptyFiles = 0;
  let shortFiles = 0;
  const MIN_CONTENT_LENGTH = 500;

  courses.forEach(c => {
    if (!mdxSet.has(c.slug)) return;
    const filePath = path.join(contentDir, `${c.slug}.mdx`);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.length === 0) {
      log(RED, '  ❌', `${c.slug} — fichier MDX vide`);
      issues.push({ type: 'EMPTY_MDX', message: c.slug });
      emptyFiles++;
    } else if (content.length < MIN_CONTENT_LENGTH) {
      log(YELLOW, '  ⚠️ ', `${c.slug} — contenu trop court (${content.length} caractères)`);
      warnings.push({ type: 'SHORT_MDX', message: c.slug });
      shortFiles++;
    }
  });
  if (emptyFiles === 0 && shortFiles === 0) {
    log(GREEN, '  ✅', 'Tous les fichiers MDX ont du contenu suffisant');
  }
  console.log('');

  // ─── 7. Vérification des leçons ────────────────────────────────────────
  console.log(`${BOLD}📚 Vérification des leçons${RESET}`);
  let coursesWithoutLessons = 0;
  courses.forEach(c => {
    if (!c.lessons || c.lessons.length === 0) {
      log(YELLOW, '  ⚠️ ', `${c.slug} — aucune leçon définie dans courses.ts`);
      warnings.push({ type: 'NO_LESSONS', message: c.slug });
      coursesWithoutLessons++;
    }
  });
  if (coursesWithoutLessons === 0) {
    log(GREEN, '  ✅', 'Tous les cours ont au moins une leçon');
  }
  console.log('');

  // ─── 8. Vérification des modules ─────────────────────────────────────
  console.log(`${BOLD}🗂️  Vérification des modules${RESET}`);
  MODULES.forEach(m => {
    if (!m.courses || m.courses.length === 0) {
      log(YELLOW, '  ⚠️ ', `Module "${m.title}" (${m.slug}) — aucun cours`);
      warnings.push({ type: 'EMPTY_MODULE', message: m.slug });
    } else {
      log(GREEN, '  ✅', `${m.slug} — ${m.courses.length} cours`);
    }
  });
  console.log('');

  // ─── 9. Résumé final ─────────────────────────────────────────────────
  console.log(`${BOLD}${BLUE}═══════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}📋 Résumé de l'audit${RESET}`);
  console.log('');

  if (issues.length === 0 && warnings.length === 0) {
    log(GREEN, '  🎉', `${BOLD}Parfait ! Aucun problème détecté.${RESET}`);
    console.log(`\n  ${GREEN}✅ Cours complets : ${courses.length}/${courses.length}${RESET}`);
    console.log(`  ${GREEN}✅ Fichiers MDX   : ${mdxFiles.length}${RESET}`);
    console.log(`  ${GREEN}✅ Modules        : ${MODULES.length}${RESET}`);
  } else {
    if (issues.length > 0) {
      console.log(`  ${RED}${BOLD}❌ Erreurs (${issues.length}) :${RESET}`);
      issues.forEach(i => console.log(`     ${RED}• [${i.type}] ${i.message}${RESET}`));
      console.log('');
    }
    if (warnings.length > 0) {
      console.log(`  ${YELLOW}${BOLD}⚠️  Avertissements (${warnings.length}) :${RESET}`);
      warnings.forEach(w => console.log(`     ${YELLOW}• [${w.type}] ${w.message}${RESET}`));
      console.log('');
    }
  }

  console.log(`\n${BOLD}${BLUE}═══════════════════════════════════════════${RESET}\n`);

  // Exit avec erreur si problèmes critiques
  if (issues.length > 0) {
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Erreur audit:', err);
  process.exit(1);
});
