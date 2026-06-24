'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  courseSlug: string;
  title?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export default function Quiz({ courseSlug, title = 'Quiz de validation', questions, onComplete }: QuizProps) {
  const { saveQuiz } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQ;

  const score = submitted
    ? Math.round(
        (questions.filter((q) => answers[q.id] === q.correctIndex).length / totalQ) * 100
      )
    : 0;

  const handleAnswer = (qId: string, idx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
    // Auto-advance after short delay
    if (currentQ < totalQ - 1) {
      setTimeout(() => setCurrentQ((c) => c + 1), 300);
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    saveQuiz(courseSlug, score);
    onComplete?.(score);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#131720] overflow-hidden">
        {/* Score header */}
        <div className={clsx(
          'p-8 text-center',
          score >= 70 ? 'bg-emerald-500/8 border-b border-emerald-500/15'
                      : 'bg-red-500/8 border-b border-red-500/15'
        )}>
          <div className="text-5xl font-black text-white mb-2">{score}<span className="text-2xl text-gray-400">/100</span></div>
          <div className={clsx('text-base font-semibold mb-1', score >= 70 ? 'text-emerald-400' : 'text-red-400')}>
            {score >= 90 ? 'Excellent !' : score >= 70 ? 'Réussi ✓' : 'À revoir'}
          </div>
          <p className="text-sm text-gray-500">
            {questions.filter((q) => answers[q.id] === q.correctIndex).length}/{totalQ} bonnes réponses
          </p>
          {score >= 70 && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/12 border border-yellow-500/25 text-yellow-400 text-xs font-bold">
              <Award size={12} />
              +{Math.round((score / 100) * 50)} XP gagnés
            </div>
          )}
        </div>

        {/* Review answers */}
        <div className="p-5 space-y-5">
          {questions.map((q, qi) => {
            const userAns = answers[q.id];
            const correct = userAns === q.correctIndex;
            return (
              <div key={q.id} className="space-y-2">
                <div className="flex items-start gap-2">
                  {correct
                    ? <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    : <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />}
                  <p className="text-sm font-medium text-gray-200">
                    <span className="text-gray-500 mr-1.5 font-mono text-xs">{qi + 1}.</span>
                    {q.question}
                  </p>
                </div>
                {!correct && (
                  <div className="ml-5 text-xs text-gray-500 bg-white/3 rounded-lg p-3 border border-white/5">
                    <span className="text-emerald-400 font-medium">Bonne réponse :</span>{' '}
                    {q.options[q.correctIndex]}
                  </div>
                )}
                <div className="ml-5 text-xs text-[#5A6478] bg-white/2 rounded-lg p-3 border border-white/4">
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 text-sm text-gray-400 hover:text-white hover:border-white/15 transition-colors"
          >
            <RotateCcw size={13} />
            Recommencer le quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="rounded-2xl border border-white/8 bg-[#131720] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
        <div className="flex items-center gap-2">
          <Award size={15} className="text-indigo-400" />
          <span className="text-sm font-semibold text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">{currentQ + 1}/{totalQ}</span>
          {/* Progress dots */}
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={clsx(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  i === currentQ ? 'bg-indigo-400 w-3'
                    : answers[questions[i].id] !== undefined ? 'bg-emerald-500'
                    : 'bg-white/15'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-5">
        <p className="text-sm font-medium text-gray-100 mb-4 leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(q.id, i)}
              className={clsx(
                'quiz-option w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                answers[q.id] === i
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200 selected'
                  : 'border-white/8 text-gray-400 hover:border-white/15 hover:text-gray-200'
              )}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/6 text-[11px] font-bold mr-3 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ((c) => c - 1)}
          className="px-3 py-1.5 rounded-lg border border-white/8 text-xs text-gray-500 hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Précédente
        </button>
        {currentQ < totalQ - 1 ? (
          <button
            onClick={() => setCurrentQ((c) => c + 1)}
            disabled={answers[q.id] === undefined}
            className="px-3 py-1.5 rounded-lg bg-white/6 border border-white/8 text-xs text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Suivante →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Valider ({answeredCount}/{totalQ})
          </button>
        )}
      </div>
    </div>
  );
}
