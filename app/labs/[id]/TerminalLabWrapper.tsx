'use client';

import dynamic from 'next/dynamic';
import type { Lab } from '@/lib/labs';

const TerminalLab = dynamic(() => import('@/components/labs/TerminalLab'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] h-80 flex items-center justify-center">
      <span className="text-xs text-gray-600 animate-pulse">Chargement du terminal...</span>
    </div>
  ),
});

export default function TerminalLabWrapper({ lab }: { lab: Lab }) {
  return (
    <TerminalLab
      lab={lab}
      onComplete={(xp) => {
        // Sauvegarder localement (V3 cloud ready)
        try {
          const stored = localStorage.getItem('mdm-labs-progress') ?? '{}';
          const progress = JSON.parse(stored);
          progress[lab.id] = { completed: true, xpEarned: xp, completedAt: new Date().toISOString() };
          localStorage.setItem('mdm-labs-progress', JSON.stringify(progress));
        } catch { /* ignore */ }
      }}
    />
  );
}
