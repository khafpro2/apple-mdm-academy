import Link from 'next/link';
import { Terminal, ChevronRight, Trophy, Zap } from 'lucide-react';
import { ALL_LABS } from '@/lib/labs';

export const metadata = {
  title: 'Labs pratiques — MDM Academy',
  description: 'Pratiquez les commandes Bash, Jamf et macOS dans un terminal interactif simulé.',
};

const LEVEL_COLORS = {
  'Débutant': 'bg-emerald-500/10 text-emerald-400',
  'Intermédiaire': 'bg-amber-500/10 text-amber-400',
  'Avancé': 'bg-red-500/10 text-red-400',
};

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A6478] mb-8">
        <Link href="/" className="hover:text-gray-400">Accueil</Link>
        <ChevronRight size={11} />
        <span className="text-gray-400">Labs pratiques</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/8 text-violet-400 text-xs font-medium mb-4">
          <Terminal size={11} />
          Terminal interactif simulé
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Labs pratiques Bash / Jamf
        </h1>
        <p className="text-sm text-[#9AA2B4] max-w-2xl leading-relaxed">
          Pratiquez les commandes réelles dans un environnement simulé. 
          Aucune exécution réelle — entraînez-vous en toute sécurité.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: Terminal, value: ALL_LABS.length.toString(), label: 'Labs disponibles' },
          { icon: Zap, value: `${ALL_LABS.reduce((s, l) => s + l.xpReward, 0)} XP`, label: 'XP à gagner' },
          { icon: Trophy, value: '5', label: 'Certifications couvertes' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="p-4 rounded-xl border border-white/8 bg-white/2 text-center">
            <Icon size={16} className="mx-auto text-indigo-400 mb-2" />
            <div className="text-xl font-black text-white">{value}</div>
            <div className="text-xs text-[#5A6478] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Labs list */}
      <div className="space-y-4">
        {ALL_LABS.map(lab => (
          <Link
            key={lab.id}
            href={`/labs/${lab.id}`}
            className="block p-5 rounded-2xl border border-white/8 bg-[#0D1117] hover:border-white/15 hover:bg-[#131720] transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${LEVEL_COLORS[lab.level]}`}>
                    {lab.level}
                  </span>
                  <span className="text-[10px] text-[#5A6478]">+{lab.xpReward} XP</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {lab.title}
                </h3>
                <p className="text-xs text-[#5A6478] leading-relaxed mb-3">{lab.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {lab.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <Terminal size={14} />
                </div>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
