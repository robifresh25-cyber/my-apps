import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { LEVEL1_COMPONENTS, shuffleIds } from '../../data/hardwareData';
import { HardwareComponentId, TeamProgress } from '../../types/game';
import { HardwareIllustration, getComponentIcon } from '../HardwareVisuals';

interface Level1IdentifyProps {
  team: TeamProgress;
  disabled: boolean;
  onAnswer: (correct: boolean, componentId: HardwareComponentId, explanation: string) => void;
}

export const Level1Identify: React.FC<Level1IdentifyProps> = ({
  team,
  disabled,
  onAnswer,
}) => {
  const targetComponent = useMemo(() => {
    const compId =
      team.level1Order[team.level1Cursor % team.level1Order.length] ?? 'cpu';
    return LEVEL1_COMPONENTS.find((c) => c.id === compId) ?? LEVEL1_COMPONENTS[0];
  }, [team.level1Order, team.level1Cursor]);

  const options = useMemo(() => {
    const others = LEVEL1_COMPONENTS.filter((c) => c.id !== targetComponent.id).map((c) => c.id);
    const pickedOthers = shuffleIds(others).slice(0, 3);
    const combined = shuffleIds([targetComponent.id, ...pickedOthers]);
    return combined.map((id) => LEVEL1_COMPONENTS.find((c) => c.id === id)!);
  }, [targetComponent.id, team.attemptsTotal]);

  const [selectedId, setSelectedId] = useState<HardwareComponentId | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handlePick = (pickedId: HardwareComponentId) => {
    if (disabled || feedback) return;
    const isCorrect = pickedId === targetComponent.id;
    setSelectedId(pickedId);
    const msg = isCorrect
      ? `Tepat! ${targetComponent.name} (+25 pts)`
      : `Salah — ini ${targetComponent.name} (${targetComponent.fullName}).`;
    setFeedback({ correct: isCorrect, text: msg });

    timerRef.current = window.setTimeout(() => {
      setSelectedId(null);
      setFeedback(null);
      onAnswer(isCorrect, targetComponent.id, msg);
    }, 750);
  };

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-display text-base lg:text-lg font-bold text-white">
            Level 1 · Misi Mengenal Hardware
          </h3>
          <p className="text-[11px] text-slate-400">
            Kumpulkan <span className="font-mono text-amber-300 font-semibold">100 poin</span> untuk naik ke Level 2
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums">
          {team.level1Points} / 100 pts
        </span>
      </div>

      {/* 7 Component Discovery Strip */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-400">
        {LEVEL1_COMPONENTS.map((comp) => {
          const seen = team.level1SeenIds.includes(comp.id);
          return (
            <span
              key={comp.id}
              className={`inline-flex items-center gap-1 ${
                seen ? 'text-emerald-400 font-semibold' : 'text-slate-500'
              }`}
            >
              {seen ? <CheckCircle2 className="w-3 h-3" /> : <span aria-hidden="true">·</span>}
              {comp.name}
            </span>
          );
        })}
      </div>

      {/* Visual + Clue */}
      <div className="bg-slate-950/75 border border-slate-800 rounded-xl p-3 space-y-2.5">
        <HardwareIllustration id={targetComponent.id} className="w-full h-40" />
        <div className="space-y-0.5">
          <p className="text-[11px] font-mono text-amber-400">{targetComponent.specTag}</p>
          <p className="text-xs text-slate-200 leading-relaxed">{targetComponent.clue}</p>
        </div>
      </div>

      {/* 2x2 Touch-Friendly Choices */}
      <div className="grid grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isTarget = opt.id === targetComponent.id;

          let btnStyle =
            'bg-slate-900/95 border-slate-700/80 hover:border-amber-400/70 hover:bg-slate-800 text-slate-100';
          if (feedback) {
            if (isTarget) {
              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
            } else if (isSelected && !isTarget) {
              btnStyle = 'bg-red-950/60 border-red-500 text-red-100';
            } else {
              btnStyle = 'bg-slate-950/50 border-slate-800 text-slate-500';
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled || Boolean(feedback)}
              onClick={() => handlePick(opt.id)}
              className={`min-h-[58px] p-3 rounded-xl border text-left transition-all cursor-pointer disabled:cursor-default flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${btnStyle}`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-950/80 border border-slate-700/70 flex items-center justify-center text-amber-400 shrink-0">
                {getComponentIcon(opt.id)}
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold truncate">{opt.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{opt.fullName}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Inline Auto-Advancing Feedback */}
      {feedback && (
        <div
          className={`rounded-xl px-3.5 py-2.5 border text-xs flex items-center gap-2 ${
            feedback.correct
              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
              : 'bg-red-950/40 border-red-500/60 text-red-100'
          }`}
        >
          {feedback.correct ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="font-medium">{feedback.text}</span>
        </div>
      )}
    </div>
  );
};
