'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Terminal, FileCode, Shield, CheckSquare, ChevronRight,
  Download, Search, Copy, Check, BookOpen, Layers
} from 'lucide-react';
import clsx from 'clsx';
import {
  getAllResources, RESOURCE_TYPE_LABELS,
  type Resource, type ResourceType, type ResourcePlatform
} from '@/lib/resources';
import OfficialSourcesSection from '@/components/ressources/OfficialSourcesSection';

const TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  script: Terminal, profile: FileCode, policy: Shield,
  template: Layers, checklist: CheckSquare, reference: BookOpen,
};

const TYPE_COLORS: Record<ResourceType, string> = {
  script:    'bg-violet-500/12 text-violet-400 border-violet-500/25',
  profile:   'bg-blue-500/12 text-blue-400 border-blue-500/25',
  policy:    'bg-red-500/12 text-red-400 border-red-500/25',
  template:  'bg-cyan-500/12 text-cyan-400 border-cyan-500/25',
  checklist: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/25',
  reference: 'bg-amber-500/12 text-amber-400 border-amber-500/25',
};

const PLATFORM_COLORS: Record<string, string> = {
  macOS:    'bg-gray-500/10 text-gray-300',
  iOS:      'bg-sky-500/10 text-sky-400',
  iPadOS:   'bg-violet-500/10 text-violet-400',
  Android:  'bg-emerald-500/10 text-emerald-400',
  'Jamf Pro':    'bg-blue-500/10 text-blue-400',
  'Jamf School': 'bg-green-500/10 text-green-400',
  'Jamf Connect':'bg-indigo-500/10 text-indigo-400',
  Intune:   'bg-cyan-500/10 text-cyan-400',
  ABM:      'bg-gray-500/10 text-gray-300',
  'Multi-platform': 'bg-purple-500/10 text-purple-400',
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all"
      title="Copier le contenu"
    >
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
      {copied ? 'Copié !' : 'Copier'}
    </button>
  );
}

function DownloadButton({ content, filename }: { content: string; filename: string }) {
  const download = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={download}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 border border-indigo-500/40 text-xs text-white hover:bg-indigo-600 transition-all"
      title="Télécharger le fichier"
    >
      <Download size={12} />
      {filename}
    </button>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = TYPE_ICONS[resource.type] ?? Terminal;

  return (
    <div className={clsx(
      'rounded-2xl border bg-[#0D1117] transition-all duration-200',
      expanded ? 'border-white/12' : 'border-white/7 hover:border-white/12'
    )}>
      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={clsx('flex items-center justify-center w-8 h-8 rounded-xl border', TYPE_COLORS[resource.type])}>
              <Icon size={14} />
            </div>
            <div>
              <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full border', TYPE_COLORS[resource.type])}>
                {RESOURCE_TYPE_LABELS[resource.type]}
              </span>
            </div>
          </div>
          <span className={clsx(
            'text-[10px] font-medium px-2 py-0.5 rounded-full',
            PLATFORM_COLORS[resource.platform] ?? 'bg-gray-500/10 text-gray-400'
          )}>
            {resource.platform}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[#F1F3F9] mb-1 group-hover:text-white text-left">
          {resource.title}
        </h3>
        <p className="text-xs text-[#5A6478] leading-relaxed text-left">{resource.description}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-wrap gap-1.5">
            {resource.language && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400">
                {resource.language}
              </span>
            )}
            {resource.version && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                v{resource.version}
              </span>
            )}
            {resource.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
          <span className={clsx(
            'text-[10px] px-2 py-0.5 rounded-full font-medium',
            resource.complexity === 'Basique' ? 'bg-emerald-500/10 text-emerald-400' :
            resource.complexity === 'Intermédiaire' ? 'bg-amber-500/10 text-amber-400' :
            'bg-red-500/10 text-red-400'
          )}>
            {resource.complexity}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-white/6">
          {resource.usageNotes && (
            <div className="px-5 pt-4 pb-0">
              <p className="text-xs text-amber-400/80 bg-amber-500/8 border border-amber-500/15 rounded-xl px-3 py-2">
                💡 {resource.usageNotes}
              </p>
            </div>
          )}

          {resource.externalUrl ? (
            <div className="p-5 space-y-4">
              <pre className="text-[11px] text-gray-300 bg-[#0a0d14] border border-white/6 rounded-xl p-4 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                {resource.content}
              </pre>
              <a
                href={resource.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/80 border border-indigo-500/40 text-xs text-white hover:bg-indigo-600 transition-all"
              >
                {resource.externalUrl.includes('github.com')
                  ? 'Ouvrir sur GitHub ↗'
                  : resource.externalUrl.includes('developer.jamf.com')
                    ? 'Ouvrir sur developer.jamf.com ↗'
                    : 'Ouvrir la source officielle ↗'}
              </a>
            </div>
          ) : (
            <>
          {/* Code block */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-600 font-mono">{resource.filename}</span>
              <div className="flex items-center gap-2">
                <CopyButton text={resource.content} />
                <DownloadButton content={resource.content} filename={resource.filename} />
              </div>
            </div>
            <pre className="text-[11px] text-gray-300 bg-[#0a0d14] border border-white/6 rounded-xl p-4 overflow-x-auto max-h-72 overflow-y-auto font-mono leading-relaxed">
              <code>{resource.content}</code>
            </pre>
          </div>

          <div className="px-5 pb-4 flex items-center gap-3 text-[10px] text-gray-600">
            <span>Mis à jour : {new Date(resource.lastUpdated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span>Par {resource.author}</span>
          </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const ALL_TYPES = ['script', 'profile', 'policy', 'checklist', 'template', 'reference'] as ResourceType[];
const ALL_PLATFORMS = ['macOS', 'iOS', 'iPadOS', 'Android', 'Jamf Pro', 'Intune'] as ResourcePlatform[];

export default function RessourcesPage() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<ResourceType | null>(null);
  const [activePlatform, setActivePlatform] = useState<ResourcePlatform | null>(null);

  const all = getAllResources();

  const filtered = useMemo(() => {
    return all.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      const matchType = !activeType || r.type === activeType;
      const matchPlatform = !activePlatform || r.platform === activePlatform;
      return matchSearch && matchType && matchPlatform;
    });
  }, [all, search, activeType, activePlatform]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A6478] mb-8">
        <Link href="/" className="hover:text-gray-400">Accueil</Link>
        <ChevronRight size={11} />
        <span className="text-gray-400">Bibliothèque de ressources</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/8 text-violet-400 text-xs font-medium mb-4">
          <Terminal size={11} />
          Scripts · Profils · Politiques · Checklists
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Bibliothèque de ressources
        </h1>
        <p className="text-sm text-[#5A6478] max-w-2xl">
          Scripts Bash, Configuration Profiles, politiques Intune, templates Android Enterprise —
          et liens vers les sources officielles Jamf (Jamf Learn, documentation, API, JamfSync).
        </p>
      </div>

      <OfficialSourcesSection />

      {/* Search + filters */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Rechercher scripts, profils, politiques…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#0D1117] border border-white/8 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Type filters */}
          {ALL_TYPES.map((type) => {
            const Icon = TYPE_ICONS[type];
            return (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                  activeType === type
                    ? TYPE_COLORS[type]
                    : 'border-white/8 text-[#5A6478] hover:text-gray-300 hover:border-white/12'
                )}
              >
                <Icon size={11} />
                {RESOURCE_TYPE_LABELS[type].split(' ').slice(1).join(' ')}
              </button>
            );
          })}

          <div className="w-px bg-white/8 mx-1 hidden sm:block" />

          {/* Platform filters */}
          {ALL_PLATFORMS.map((plat) => (
            <button
              key={plat}
              onClick={() => setActivePlatform(activePlatform === plat ? null : plat)}
              className={clsx(
                'px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                activePlatform === plat
                  ? (PLATFORM_COLORS[plat] ?? 'bg-indigo-500/12 text-indigo-400 border-indigo-500/25')
                  : 'border-white/8 text-[#5A6478] hover:text-gray-300 hover:border-white/12'
              )}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-[#5A6478] mb-5">
        {filtered.length} ressource{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
        {(activeType || activePlatform || search) && (
          <button
            onClick={() => { setActiveType(null); setActivePlatform(null); setSearch(''); }}
            className="ml-3 text-indigo-400 hover:text-indigo-300"
          >
            Effacer les filtres
          </button>
        )}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Terminal size={32} className="mx-auto text-gray-700 mb-3" />
          <p className="text-sm text-gray-600">Aucune ressource ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
