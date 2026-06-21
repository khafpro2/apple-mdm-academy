import Link from 'next/link';

export default function ClerkSetupNotice({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const title = mode === 'sign-in' ? 'Connexion' : 'Inscription';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#080B12]">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#0D1117] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
          Auth V3 — configuration requise
        </p>
        <h1 className="text-xl font-bold text-white mb-3">{title}</h1>
        <p className="text-sm text-[#9AA2B4] leading-relaxed mb-6">
          Clerk n&apos;est pas configuré localement. Ajoutez{' '}
          <code className="text-indigo-300">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{' '}
          et <code className="text-indigo-300">CLERK_SECRET_KEY</code> dans{' '}
          <code className="text-indigo-300">.env.local</code>, puis redémarrez le serveur.
        </p>
        <Link
          href="/labs"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          Continuer vers les labs
        </Link>
      </div>
    </div>
  );
}
