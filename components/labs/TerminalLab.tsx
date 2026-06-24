'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, CheckCircle, XCircle, Lightbulb, RotateCcw, Trophy } from 'lucide-react';
import type { Lab, LabCommand } from '@/lib/labs';

interface CommandHistoryEntry {
  input: string;
  output: string;
  type: 'success' | 'error' | 'partial' | 'neutral';
}

interface TerminalLabProps {
  lab: Lab;
  onComplete?: (xpEarned: number) => void;
}

export default function TerminalLab({ lab, onComplete }: TerminalLabProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const findCommand = useCallback((cmd: string): LabCommand | undefined => {
    const trimmed = cmd.trim().toLowerCase();
    return lab.commands.find(c => {
      if (c.command.startsWith('regex:')) {
        return new RegExp(c.command.slice(6), 'i').test(trimmed);
      }
      return c.command.toLowerCase() === trimmed;
    });
  }, [lab.commands]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || completed) return;

    const cmd = input.trim();
    const matched = findCommand(cmd);
    const isSuccess = lab.successCommands.some(s => 
      s.toLowerCase() === cmd.toLowerCase()
    );

    let output: string;
    let type: CommandHistoryEntry['type'];

    if (matched) {
      output = matched.output;
      type = matched.isCorrect ? 'success' : matched.partial ? 'partial' : 'neutral';
      if (matched.hint && !isSuccess) setHint(matched.hint);
      else setHint(null);
    } else {
      output = `bash: ${cmd}: command not found`;
      type = 'error';
      setHint(null);
    }

    const newEntry: CommandHistoryEntry = { input: cmd, output, type };
    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setInput('');
    setAttempts(prev => prev + 1);

    if (isSuccess) {
      setCompleted(true);
      onComplete?.(lab.xpReward);
    }
  }, [input, completed, findCommand, lab.successCommands, lab.xpReward, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(idx);
      setInput(commandHistory[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(idx);
      setInput(idx === -1 ? '' : commandHistory[idx]);
    }
  };

  const reset = () => {
    setHistory([]);
    setCommandHistory([]);
    setHistoryIndex(-1);
    setInput('');
    setCompleted(false);
    setHint(null);
    setAttempts(0);
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-gray-500 font-mono ml-2">{lab.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {completed && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <Trophy size={11} />
              +{lab.xpReward} XP
            </span>
          )}
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>
      </div>

      {/* Objectif */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="flex items-start gap-2">
          <Terminal size={13} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-white mb-0.5">Objectif</p>
            <p className="text-xs text-[#9AA2B4]">{lab.objective}</p>
          </div>
        </div>
        {lab.docReference && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-[10px] text-blue-400/70 mb-1">Documentation officielle</p>
            <p className="text-[11px] text-[#9AA2B4] leading-relaxed mb-2">{lab.docReference.summary}</p>
            <a
              href={lab.docReference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              {lab.docReference.title} ↗
            </a>
          </div>
        )}
      </div>

      {/* Terminal */}
      <div
        className="p-4 min-h-[240px] max-h-[400px] overflow-y-auto font-mono text-xs cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Historique des commandes */}
        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center gap-2 text-[#9AA2B4]">
              <span className="text-indigo-400">{lab.context}</span>
              <span className="text-white">{entry.input}</span>
            </div>
            <pre className={`mt-1 whitespace-pre-wrap leading-relaxed pl-2 border-l-2 ${
              entry.type === 'success' ? 'text-emerald-400 border-emerald-500/40' :
              entry.type === 'partial' ? 'text-amber-400 border-amber-500/40' :
              entry.type === 'error' ? 'text-red-400 border-red-500/40' :
              'text-gray-300 border-white/10'
            }`}>
              {entry.output}
            </pre>
            {entry.type === 'success' && (
              <div className="flex items-center gap-1.5 mt-1.5 text-emerald-400">
                <CheckCircle size={11} />
                <span className="text-[10px] font-medium">✓ Commande correcte !</span>
              </div>
            )}
            {entry.type === 'error' && (
              <div className="flex items-center gap-1.5 mt-1 text-red-400/70">
                <XCircle size={11} />
                <span className="text-[10px]">Commande non reconnue</span>
              </div>
            )}
          </div>
        ))}

        {/* Succès */}
        {completed && (
          <div className="my-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/8">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
              <Trophy size={13} />
              Lab terminé ! +{lab.xpReward} XP gagnés
            </div>
            <p className="text-[11px] text-emerald-400/70">
              Résolu en {attempts} tentative{attempts > 1 ? 's' : ''}.
            </p>
          </div>
        )}

        {/* Ligne de saisie */}
        {!completed && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-indigo-400 shrink-0">{lab.context}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-indigo-400"
              placeholder="Tapez une commande..."
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Hint */}
      {hint && !completed && (
        <div className="px-4 py-3 border-t border-white/5 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <Lightbulb size={12} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-400/90">{hint}</p>
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-3 text-[10px] text-gray-600">
          {lab.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span className="text-[10px] text-gray-600">
          {attempts > 0 && `${attempts} tentative${attempts > 1 ? 's' : ''}`}
        </span>
      </div>
    </div>
  );
}
