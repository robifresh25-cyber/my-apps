import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { LEVEL2_QUESTIONS } from '../../data/hardwareData';
import { TeamProgress } from '../../types/game';

interface Level2FunctionsProps {
  team: TeamProgress;
  disabled: boolean;
  onAnswer: (correct: boolean, explanation: string) => void;
}

export const Level2Functions: React.FC<Level2FunctionsProps> = ({
  team,
  disabled,
  onAnswer,
}) => {
  const question = useMemo(() => {
    const qId = team.level2QuestionOrder[team.level2Answered] ?? LEVEL2_QUESTIONS[0].id;
    return LEVEL2_QUESTIONS.find((q) => q.id === qId) ?? LEVEL2_QUESTIONS[0];
  }, [team.level2QuestionOrder, team.level2Answered]);

  // Shuffle option order independently per question
  const shuffledOptions = useMemo(() => {
    const items = question.options.map((text, origIdx) => ({
      text,
      isCorrect: origIdx === question.correctIndex,
    }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, [question]);

  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = (idx: number) => {
    if (disabled || pickedIdx !== null) return;
    setPickedIdx(idx);
    const isCorrect = shuffledOptions[idx]?.isCorrect ?? false;
    timerRef.current = window.setTimeout(() => {
      setPickedIdx(null);
      onAnswer(isCorrect, question.explanation);
    }, 950);
  };

  const hasAnswered = pickedIdx !== null;
  const isCorrect = hasAnswered && (shuffledOptions[pickedIdx]?.isCorrect ?? false);

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-display text-base lg:text-lg font-bold text-white">
            Level 2 · Tebak Fungsi Komponen
          </h3>
          <p className="text-[11px] text-slate-400">
            Jawab benar minimal <span className="font-mono text-amber-300 font-semibold">8 / 10</span> soal
          </p>
        </div>
        <div className="font-mono text-xs font-bold text-slate-200 tabular-nums">
          Benar: <span className="text-emerald-400">{team.level2Correct}</span>/8 · Soal{' '}
          <span className="text-amber-300">{Math.min(10, team.level2Answered + 1)}</span>/10
        </div>
      </div>

      {/* 10-Slot Progress Strip */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }).map((_, idx) => {
          const isCurrent = idx === team.level2Answered;
          const isPast = idx < team.level2Answered;
          return (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-sm ${
                isCurrent ? 'bg-amber-400' : isPast ? 'bg-emerald-500/70' : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Question Card */}
      <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="text-[11px] font-medium text-amber-400">
          Materi: {question.topic}
        </div>
        <h4 className="font-display text-sm lg:text-base font-bold text-white leading-snug">
          {question.prompt}
        </h4>

        <div className="space-y-2">
          {shuffledOptions.map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            let style =
              'bg-slate-900/95 border-slate-700/80 hover:border-amber-400/70 hover:bg-slate-800 text-slate-100';

            if (hasAnswered) {
              if (opt.isCorrect) {
                style = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
              } else if (idx === pickedIdx) {
                style = 'bg-red-950/60 border-red-500 text-red-100';
              } else {
                style = 'bg-slate-950/50 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled || hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full min-h-[48px] px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer disabled:cursor-default flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${style}`}
              >
                <span className="w-6 h-6 rounded bg-slate-950 border border-slate-700 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 text-amber-300">
                  {letter}
                </span>
                <span className="text-xs leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div
            className={`rounded-xl px-3.5 py-2.5 border text-xs flex items-start gap-2 ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                : 'bg-red-950/40 border-red-500/60 text-red-100'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            )}
            <span>{question.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
};
