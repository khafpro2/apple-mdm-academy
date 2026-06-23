'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, BookOpen, GraduationCap, Trophy, Search, Command, Layers, ChevronRight, Terminal } from 'lucide-react';
import dynamic from 'next/dynamic';

const AuthButton = dynamic(() => import('./AuthButton'), { ssr: false });
import clsx from 'clsx';
import { search, type SearchResult } from '@/lib/search';

const NAV_LINKS = [
  { href: '/parcours',      label: 'Parcours',       icon: GraduationCap },
  { href: '/modules',       label: 'Modules',        icon: Layers },
  { href: '/labs',          label: 'Labs',           icon: Terminal },
  { href: '/ressources',    label: 'Ressources',     icon: BookOpen },
  { href: '/certifications',label: 'Certifications', icon: Trophy },
];

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (query.length < 2) { setResults([]); return; }
    const timer = setTimeout(() => {
      setResults(search(query, 8));
      setActiveIdx(0);
    }, 100);
    return () => clearTimeout(timer);
  }, [query]);

  const go = useCallback((result: SearchResult) => {
    const href = result.type === 'module' ? `/modules/${result.slug}` : `/cours/${result.slug}`;
    router.push(href);
    onClose();
  }, [router, onClose]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[activeIdx]) go(results[activeIdx]);
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#131720] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <Search size={17} className="text-gray-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un cours, module, outil…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-600 hover:text-gray-400">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-gray-600 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.id}>
                <button
                  className={clsx(
                    'w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors',
                    i === activeIdx ? 'bg-white/6' : 'hover:bg-white/4'
                  )}
                  onClick={() => go(r)}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <div className={clsx(
                    'flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5 text-xs font-bold',
                    r.type === 'module'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-white/6 text-gray-400'
                  )}>
                    {r.type === 'module' ? <Layers size={12} /> : <BookOpen size={12} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-100 truncate">{r.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {r.type === 'course' && r.moduleTitle ? r.moduleTitle : r.description.slice(0, 60) + '…'}
                    </p>
                  </div>
                  <ChevronRight size={13} className="text-gray-700 shrink-0 mt-1" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-600">Aucun résultat pour &quot;{query}&quot;</p>
          </div>
        )}

        {/* Footer hint */}
        {results.length === 0 && query.length < 2 && (
          <div className="px-4 py-4 flex flex-wrap gap-2">
            {['ABM', 'Jamf Pro', 'Intune', 'FileVault', 'Zero-Touch'].map((hint) => (
              <button
                key={hint}
                onClick={() => setQuery(hint)}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-gray-500 hover:text-gray-300 hover:border-white/15 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-[#080B12]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-15 items-center gap-4" style={{ height: '3.75rem' }}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <span className="text-xs font-black text-white tracking-tighter">MDM</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-bold text-white tracking-tight">Academy</span>
                <span className="ml-1 text-[10px] font-medium text-indigo-400/80 bg-indigo-500/10 px-1.5 py-0.5 rounded-full border border-indigo-500/20">
                  v2
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5 ml-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                    isActive(href)
                      ? 'text-white bg-white/8'
                      : 'text-[#9AA2B4] hover:text-white hover:bg-white/5'
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search bar */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3 text-[#5A6478] hover:text-gray-400 hover:border-white/12 hover:bg-white/5 transition-all text-xs group"
            >
              <Search size={13} />
              <span>Rechercher…</span>
              <kbd className="ml-2 flex items-center gap-0.5 text-[10px] font-mono opacity-60">
                <Command size={9} />K
              </kbd>
            </button>

            {/* Mobile search + CTA + burger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/6 transition-colors"
                aria-label="Rechercher"
              >
                <Search size={18} />
              </button>

              <Link
                href="/parcours"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
              >
                <GraduationCap size={14} />
                <span className="hidden md:inline">Commencer</span>
                <span className="md:hidden">Parcours</span>
              </Link>

              {/* Auth — UserButton si connecté, SignInButton sinon */}
              <div className="hidden sm:flex">
                <AuthButton />
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
                aria-label={menuOpen ? 'Fermer le menu' : 'Menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/6 bg-[#0D1117]">
            <nav className="px-4 py-3 space-y-0.5">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    isActive(href)
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                      : 'text-[#9AA2B4] hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <div className="pt-2 pb-1 space-y-2">
                <Link
                  href="/parcours"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <GraduationCap size={16} />
                  Commencer la formation
                </Link>
                <div className="flex justify-center py-1">
                  <AuthButton />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
