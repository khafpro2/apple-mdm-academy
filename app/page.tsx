import Link from 'next/link';
import {
  BookOpen, GraduationCap, ChevronRight, Clock,
  Trophy, ArrowRight, Terminal, CheckCircle, Layers,
  Shield, Zap, Users
} from 'lucide-react';
import { MODULES, STATS, getFeaturedCourses } from '@/lib/courses';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MDM Academy — Formation Apple Enterprise, Jamf & Intune',
  description: `Formation professionnelle Apple Enterprise : ${STATS.totalCourses} cours structurés, 9 modules progressifs, du débutant à l'expert. Apple Business Manager, Jamf Pro, Microsoft Intune, Android Enterprise.`,
};

/* ─── Données statiques ─────────────────────────────────────────────────── */

const TOOLS = [
  { name: 'Apple Business Manager', abbr: 'ABM',     emoji: '🍎', bg: 'bg-slate-800/60',   border: 'border-slate-700/50' },
  { name: 'Jamf Pro',               abbr: 'Jamf Pro', emoji: '🖥️', bg: 'bg-blue-950/60',    border: 'border-blue-900/50' },
  { name: 'Jamf Protect',           abbr: 'Protect',  emoji: '🛡️', bg: 'bg-red-950/60',     border: 'border-red-900/50' },
  { name: 'Jamf Connect',           abbr: 'Connect',  emoji: '🔐', bg: 'bg-indigo-950/60',  border: 'border-indigo-900/50' },
  { name: 'Jamf School',            abbr: 'School',   emoji: '🎒', bg: 'bg-green-950/60',   border: 'border-green-900/50' },
  { name: 'Jamf Security Cloud',    abbr: 'JSC',      emoji: '☁️', bg: 'bg-purple-950/60',  border: 'border-purple-900/50' },
  { name: 'Microsoft Intune',       abbr: 'Intune',   emoji: '🪟', bg: 'bg-cyan-950/60',    border: 'border-cyan-900/50' },
  { name: 'Android Enterprise',     abbr: 'Android',  emoji: '🤖', bg: 'bg-emerald-950/60', border: 'border-emerald-900/50' },
];

const FEATURES = [
  {
    icon: Layers,
    title: '9 modules progressifs',
    desc: 'Du fondamental à l\'expert, chaque module s\'appuie sur le précédent. Objectifs clairs, prérequis définis.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/8 border-indigo-500/15',
  },
  {
    icon: Terminal,
    title: 'Labs pratiques',
    desc: 'Exercices en ligne de commande : Bash, Jamf CLI, API REST. Testez vos compétences en conditions réelles.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8 border-emerald-500/15',
  },
  {
    icon: Trophy,
    title: '7 certifications',
    desc: 'Apple Device Support, Jamf 100/170/200, Microsoft MD-102 et MS-102 — guides de révision inclus.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/8 border-amber-500/15',
  },
  {
    icon: Zap,
    title: 'Quiz par cours',
    desc: 'Évaluez vos connaissances après chaque cours. Points XP, progression et historique de résultats.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/8 border-violet-500/15',
  },
];

const CERTS = [
  { name: 'Apple Device Support',       level: 'Intermédiaire', color: 'bg-gray-500/15 text-gray-300 border-gray-500/25' },
  { name: 'Apple Deployment & Mgmt',    level: 'Avancé',        color: 'bg-slate-500/15 text-slate-300 border-slate-500/25' },
  { name: 'Jamf 100 Course',            level: 'Débutant',      color: 'bg-violet-500/15 text-violet-300 border-violet-500/25' },
  { name: 'Jamf 170 Course',            level: 'Intermédiaire', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
  { name: 'Jamf 200 Course',            level: 'Avancé',        color: 'bg-green-500/15 text-green-300 border-green-500/25' },
  { name: 'Microsoft MD-102',           level: 'Avancé',        color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' },
  { name: 'Microsoft MS-102',           level: 'Expert',        color: 'bg-rose-500/15 text-rose-300 border-rose-500/25' },
];

/* ─── Composants ────────────────────────────────────────────────────────── */

function StatCard({ value, label, sub, icon: Icon }: {
  value: string; label: string; sub: string; icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
      <Icon size={15} className="text-indigo-400 mb-2.5" />
      <div className="text-2xl sm:text-3xl font-black text-white leading-none mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-300">{label}</div>
      <div className="text-[10px] text-gray-600 mt-0.5">{sub}</div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const featured = getFeaturedCourses();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-28">

        {/* Ambiance lumineuse */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-indigo-600/10 blur-[100px] sm:blur-[130px] rounded-full" />
          <div className="absolute top-24 right-1/3 w-[300px] sm:w-[450px] h-[250px] sm:h-[350px] bg-violet-600/7 blur-[70px] sm:blur-[90px] rounded-full" />
          <div className="absolute -top-8 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-blue-500/5 blur-[60px] sm:blur-[80px] rounded-full" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          {/* Badge d'annonce */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 text-indigo-300 text-xs font-medium mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
            Plateforme de formation Apple Enterprise — v2
          </div>

          {/* Titre principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 sm:mb-6 leading-[1.08] tracking-tight">
            Maîtrisez la gestion{' '}
            <span className="gradient-text">Apple en entreprise</span>
          </h1>

          <p className="text-sm sm:text-base text-[#9AA2B4] max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            De Apple Business Manager à Jamf Pro — {STATS.totalCourses} cours structurés,{' '}
            {STATS.totalModules} modules progressifs, {STATS.certifications} certifications couvertes.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/parcours"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 active:bg-indigo-700 transition-colors text-sm shadow-xl shadow-indigo-500/25"
            >
              <GraduationCap size={16} />
              Commencer la formation
            </Link>
            <Link
              href="/modules"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-[#9AA2B4] font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
            >
              <Layers size={16} />
              Voir les modules
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mx-auto max-w-2xl mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <StatCard icon={Layers}       value={String(STATS.totalModules)} label="Modules"        sub="progressifs" />
          <StatCard icon={BookOpen}     value={String(STATS.totalCourses)} label="Cours"          sub="structurés" />
          <StatCard icon={Clock}        value="80+"                        label="Heures"         sub="de contenu" />
          <StatCard icon={Trophy}       value={String(STATS.certifications)} label="Certifications" sub="couvertes" />
        </div>
      </section>

      {/* ── OUTILS COUVERTS ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-y border-white/5">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[10px] text-[#3A4156] uppercase tracking-widest mb-6 font-semibold">
            Technologies couvertes
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border ${t.bg} ${t.border} transition-colors`}
                title={t.name}
              >
                <span className="text-lg sm:text-2xl">{t.emoji}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium text-center leading-tight">
                  {t.abbr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Une formation complète, du fondamental à l&apos;expert
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Chaque cours est conçu par des praticiens Apple Enterprise avec des exemples tirés de déploiements réels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`flex gap-4 p-5 sm:p-6 rounded-2xl border ${f.bg}`}
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${f.bg}`}>
                  <f.icon size={17} className={f.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES APERÇU ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">9 modules structurés</h2>
              <p className="text-sm text-gray-500">Progression pédagogique du fondamental à l&apos;expert</p>
            </div>
            <Link
              href="/modules"
              className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Voir tous les modules <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODULES.map((mod, i) => (
              <Link
                key={mod.id}
                href={`/modules/${mod.slug}`}
                className="group flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-white/6 bg-white/[0.015] hover:border-indigo-500/25 hover:bg-white/[0.03] transition-all duration-200"
              >
                <span className="text-xl shrink-0 mt-0.5">{mod.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                      Module {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-600">{mod.courses.length} cours</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors leading-snug">
                    {mod.title}
                  </h3>
                </div>
                <ChevronRight size={13} className="text-gray-700 group-hover:text-indigo-400 shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURS EN AVANT ─────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Commencer par ici</h2>
                <p className="text-sm text-gray-500">Premiers cours de chaque axe de formation</p>
              </div>
              <Link
                href="/parcours"
                className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Tous les cours <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {featured.map((course) => (
                <Link
                  key={course.id}
                  href={`/cours/${course.slug}`}
                  className="group flex flex-col p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-2">
                    {course.moduleTitle}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors mb-2 flex-1 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto text-[10px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-0.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform font-medium">
                      Démarrer <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CERTIFICATIONS ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-start">
            {/* Texte */}
            <div className="flex-1 max-w-xs sm:max-w-sm">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Trophy size={10} />
                Certifications
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                7 certifications professionnelles
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Chaque module prépare une ou plusieurs certifications officielles.
                Guides de révision, quiz et ressources officielles inclus.
              </p>
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-semibold hover:bg-amber-500/25 transition-colors"
              >
                Voir les certifications
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Grille certifs */}
            <div className="flex-1 grid grid-cols-1 gap-2 w-full">
              {CERTS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/6 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                    <span className="text-sm text-gray-300 font-medium">{cert.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cert.color}`}>
                    {cert.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-5">
            <Users size={10} />
            Formation professionnelle
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white mb-4 leading-tight">
            Prêt à devenir expert<br className="hidden sm:block" /> Apple Enterprise ?
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Accédez immédiatement à 60 cours structurés. Aucun abonnement requis pour commencer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/parcours"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors text-sm shadow-xl shadow-indigo-500/20"
            >
              <GraduationCap size={16} />
              Voir le parcours complet
            </Link>
            <Link
              href="/certifications"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
            >
              <Shield size={16} />
              Explorer les certifications
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
