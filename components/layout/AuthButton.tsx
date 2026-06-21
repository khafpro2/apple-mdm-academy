'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';

export default function AuthButton() {
  const { isLoaded, isSignedIn } = useUser();

  // Pendant le chargement Clerk → rien (évite le flash)
  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'w-8 h-8 ring-2 ring-indigo-500/40 hover:ring-indigo-400/60 transition-all',
            userButtonPopoverCard: 'bg-[#0D1117] border border-white/10 shadow-xl',
            userButtonPopoverActionButton: 'text-[#9AA2B4] hover:text-white hover:bg-white/5',
            userButtonPopoverActionButtonText: 'text-sm',
            userButtonPopoverFooter: 'hidden',
          },
        }}
      />
    );
  }

  return (
    <SignInButton mode="modal">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                   text-white border border-white/10 hover:border-white/20
                   hover:bg-white/5 transition-all"
      >
        <User size={14} />
        Connexion
      </button>
    </SignInButton>
  );
}
