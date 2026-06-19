#!/usr/bin/env node
/**
 * MDM Academy — Content Audit Script
 * npm run content:check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  blue:   (s) => `\x1b[34m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
  dim:    (s) => `\x1b[2m${s}\x1b[0m`,
};

function extractCourseSlugs() {
  const src = fs.readFileSync(path.join(ROOT, 'lib/courses.ts'), 'utf8');
  const matches = [...src.matchAll(/slug:\s*'([a-z0-9\-]+)',\s*\n\s*title:/g)];
  return matches.map(m => m[1]);
}

function extractModuleSlugs() {
  const src = fs.readFileSync(path.join(ROOT, 'lib/courses.ts'), 'utf8');
  const matches = [...src.matchAll(/slug:\s*'([a-z0-9\-]+)',\s*\n\s*id:/g)];
  return matches.map(m => m[1]);
}

function listMdxFiles() {
  const dir = path.join(ROOT, 'content/cours');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''));
}

function parseFrontmatter(slug) {
  const filePath = path.join(ROOT, 'content/cours', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

function extractQuizSlugs() {
  const quizPath = path.join(ROOT, 'lib/quizzes.ts');
  if (!fs.existsSync(quizPath)) return [];
  const src = fs.readFileSync(quizPath, 'utf8');
  return [...src.matchAll(/'([a-z0-9\-]+)':\s*\[/g)].map(m => m[1]);
}

function extractResourceModules() {
  const resPath = path.join(ROOT, 'lib/resources.ts');
  if (!fs.existsSync(resPath)) return [];
  const src = fs.readFileSync(resPath, 'utf8');
  return [...new Set([...src.matchAll(/module:\s*'([a-z0-9\-]+)'/g)].map(m => m[1]))];
}

function printSection(title, items, formatter, emptyMsg) {
  console.log('\n' + c.bold(c.blue(`── ${title}`)));
  if (items.length === 0) {
    console.log(c.green(`  ✅ ${emptyMsg}`));
  } else {
    items.forEach(item => console.log(c.red(`  ❌ ${formatter(item)}`)));
  }
}

// Main
console.log('\n' + c.bold('🔍 MDM Academy — Audit du contenu pédagogique'));
console.log(c.dim(`   ${new Date().toLocaleString('fr-FR')}`));

const courseSlugs = extractCourseSlugs();
const moduleSlugs = extractModuleSlugs();
const mdxFiles    = listMdxFiles();
const quizSlugs   = extractQuizSlugs();
const resMods     = extractResourceModules();

console.log('\n' + c.bold('📊 Statistiques :'));
console.log(`  Cours dans courses.ts  : ${c.bold(String(courseSlugs.length))}`);
console.log(`  Modules                : ${c.bold(String(moduleSlugs.length))}`);
console.log(`  Fichiers MDX           : ${c.bold(String(mdxFiles.length))}`);
console.log(`  Slugs avec quiz        : ${c.bold(String(quizSlugs.length))}`);
console.log(`  Modules dans resources : ${c.bold(String(resMods.length))}`);

const missingMdx    = courseSlugs.filter(s => !mdxFiles.includes(s));
const orphanMdx     = mdxFiles.filter(s => ![...courseSlugs, ...moduleSlugs].includes(s));
const invalidSlugs  = [...courseSlugs, ...moduleSlugs].filter(s => !/^[a-z0-9\-]+$/.test(s));
const fmIssues      = mdxFiles.map(slug => {
  const fm = parseFrontmatter(slug);
  if (!fm) return { slug, issue: 'Fichier non trouvé' };
  if (Object.keys(fm).length === 0) return { slug, issue: 'Frontmatter manquant' };
  if (!fm.title) return { slug, issue: 'Champ "title" manquant' };
  return null;
}).filter(Boolean);
const orphanQuizzes = quizSlugs.filter(s => !courseSlugs.includes(s));
const orphanResMods = resMods.filter(m => !moduleSlugs.includes(m));
const tinyFiles     = mdxFiles.filter(slug => {
  const p = path.join(ROOT, 'content/cours', `${slug}.mdx`);
  return fs.statSync(p).size < 500;
}).map(slug => ({ slug, size: fs.statSync(path.join(ROOT, 'content/cours', `${slug}.mdx`)).size }));

printSection('Cours sans fichier MDX', missingMdx,
  s => `${s}  →  content/cours/${s}.mdx manquant`,
  'Tous les cours ont leur fichier MDX');

printSection('Fichiers MDX orphelins (sans cours dans courses.ts)', orphanMdx,
  s => `${s}.mdx  →  slug introuvable dans lib/courses.ts`,
  'Aucun MDX orphelin');

printSection('Slugs invalides (caractères non autorisés)', invalidSlugs,
  s => `"${s}"  →  doit être [a-z0-9-] uniquement`,
  'Tous les slugs sont valides');

printSection('Problèmes de frontmatter MDX', fmIssues,
  i => `${i.slug}  →  ${i.issue}`,
  'Tous les frontmatters sont corrects');

printSection('Quiz sur des slugs inexistants', orphanQuizzes,
  s => `Quiz "${s}"  →  aucun cours avec ce slug dans courses.ts`,
  'Tous les quiz pointent vers des cours existants');

printSection('Ressources liées à des modules inexistants', orphanResMods,
  m => `Module "${m}"  →  introuvable dans courses.ts`,
  'Toutes les ressources sont correctement reliées');

printSection('Fichiers MDX trop courts (< 500 octets)', tinyFiles,
  i => `${i.slug}  →  ${i.size} octets (probablement vide)`,
  'Tous les fichiers MDX ont un contenu suffisant');

const total = missingMdx.length + orphanMdx.length + invalidSlugs.length +
  fmIssues.length + orphanQuizzes.length + orphanResMods.length + tinyFiles.length;

console.log('\n' + '═'.repeat(55));
if (total === 0) {
  console.log(c.green(c.bold('  ✅  Aucun problème détecté — Plateforme prête !')));
  console.log(c.green(`     ${courseSlugs.length} cours · ${mdxFiles.length} MDX · Tout est en ordre.`));
} else {
  console.log(c.red(c.bold(`  ⚠️  ${total} problème(s) détecté(s)`)));
  console.log(c.yellow('     Corrigez les erreurs ci-dessus.'));
}
console.log('═'.repeat(55) + '\n');

process.exit(total > 0 ? 1 : 0);
