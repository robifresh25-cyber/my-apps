import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Search, Wrench } from 'lucide-react';
import { LEVEL5_CASES } from '../../data/hardwareData';
import { TeamProgress } from '../../types/game';
import { soundFX } from '../../utils/sound';

interface Level5DetectiveProps {
  team: TeamProgress;
  disabled: boolean;
  onSolveStep: (
    caseId: string,
    phase: 'cause' | 'action',
    correct: boolean,
    explanation: string
  ) => void;
}

export const Level5Detective: React.FC<Level5DetectiveProps> = ({
  team,
  disabled,
  onSolveStep,
}) => {
  const activeCase = useMemo(() => {
    const nextCaseId =
      team.level5CaseOrder.find((id) => !team.level5Solved.includes(id)) ??
      team.level5CaseOrder[0];
    return LEVEL5_CASES.find((c) => c.id === nextCaseId) ?? LEVEL5_CASES[0];
  }, [team.level5CaseOrder, team.level5Solved]);

  const phase = team.level5CurrentPhase;

  const shuffledOptions = useMemo(() => {
    const raw = phase === 'cause' ? activeCase.causeOptions : activeCase.actionOptions;
    const correctIdx =
      phase === 'cause' ? activeCase.correctCauseIndex : activeCase.correctActionIndex;
    const items = raw.map((text, idx) => ({
      text,
      isCorrect: idx === correctIdx,
    }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, [activeCase, phase, team.attemptsTotal]);

  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const hasAnswered = pickedIdx !== null;
  const isCorrect = hasAnswered && (shuffledOptions[pickedIdx]?.isCorrect ?? false);

  const handleSelect = (idx: number) => {
    if (disabled || hasAnswered) return;
    setPickedIdx(idx);
    const ok = shuffledOptions[idx]?.isCorrect ?? false;
    const explanation =
      phase === 'action' && ok
        ? activeCase.summary
        : ok
        ? 'Akar masalah tepat! Lanjut ke langkah pemeriksaan.'
        : 'Analisis belum akurat. Cek kembali indikator gejala.';

    timerRef.current = window.setTimeout(() => {
      setPickedIdx(null);
      onSolveStep(activeCase.id, phase, ok, explanation);
    }, 850);
  };

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-display text-base lg:text-lg font-bold text-white">
            Level 5 · Detektif Kerusakan
          </h3>
          <p className="text-[11px] text-slate-400">
            Analisis penyebab & tentukan langkah pemeriksaan 4 kasus PC
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums">
          {team.level5Solved.length} / 4 Selesai
        </span>
      </div>

      {/* 4 Cases Strip (team-specific order) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
        {team.level5CaseOrder.map((cId, idx) => {
          const c = LEVEL5_CASES.find((item) => item.id === cId)!;
          const solved = team.level5Solved.includes(c.id);
          const current = c.id === activeCase.id;
          return (
            <div
              key={c.id}
              className={`px-2 py-1.5 rounded-lg border truncate font-medium ${
                solved
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                  : current
                  ? 'bg-amber-500/15 border-amber-400 text-amber-200 font-semibold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              {idx + 1}. {c.title.replace(/^Kasus \d+ · /, '')}
            </div>
          );
        })}
      </div>

      {/* Symptom Inspection Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
            <Search className="w-3.5 h-3.5" />
            {activeCase.title.replace(/^Kasus \d+ · /, 'Kasus: ')}
          </span>
          {activeCase.hasBeepAudio && (
            <button
              type="button"
              onClick={() => soundFX.playBiosBeep()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[11px] font-semibold text-white cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              Bunyi Beep
            </button>
          )}
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">{activeCase.symptom}</p>
        <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 font-mono text-[11px] text-amber-300">
          {activeCase.indicatorText}
        </div>
      </div>

      {/* Deduction Options */}
      <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
        <div className="text-[11px] font-semibold text-amber-400 inline-flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />
          {phase === 'cause'
            ? 'Tahap 1/2 · Analisis Penyebab Utama'
            : 'Tahap 2/2 · Langkah Pemeriksaan Teknisi'}
        </div>

        <h4 className="font-display text-sm font-bold text-white leading-snug">
          {phase === 'cause' ? activeCase.causePrompt : activeCase.actionPrompt}
        </h4>

        <div className="space-y-2">
          {shuffledOptions.map((opt, idx) => {
            let cls =
              'bg-slate-900/95 hover:bg-slate-800 border-slate-700/80 hover:border-amber-400/70 text-slate-100';
            if (hasAnswered) {
              if (opt.isCorrect) {
                cls = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
              } else if (idx === pickedIdx) {
                cls = 'bg-red-950/60 border-red-500 text-red-100';
              } else {
                cls = 'bg-slate-950/50 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled || hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full min-h-[50px] px-3 py-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer disabled:cursor-default flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${cls}`}
              >
                <span className="w-6 h-6 rounded bg-slate-950 border border-slate-700 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 text-amber-300">
                  {['A', 'B', 'C'][idx]}
                </span>
                <span className="leading-snug flex-1">{opt.text}</span>
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
            <span>
              {isCorrect
                ? phase === 'action'
                  ? activeCase.summary
                  : 'Tepat! Sekarang tentukan langkah pemeriksaannya.'
                : 'Kurang tepat. Cermati ulang gejala di atas.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
