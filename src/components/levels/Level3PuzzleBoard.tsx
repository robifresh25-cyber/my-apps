import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Cpu, MemoryStick, HardDrive, Fan } from 'lucide-react';
import { ASSET_PATHS, LEVEL3_SLOTS } from '../../data/hardwareData';
import { PuzzleSlotId, TeamProgress } from '../../types/game';
import { ResilientImage } from '../HardwareVisuals';

interface Level3PuzzleBoardProps {
  team: TeamProgress;
  disabled: boolean;
  onInstallSlot: (slotId: PuzzleSlotId, success: boolean, feedbackMsg: string) => void;
}

const SLOT_ICONS: Record<PuzzleSlotId, React.ReactNode> = {
  cpu: <Cpu className="w-4 h-4" />,
  ram: <MemoryStick className="w-4 h-4" />,
  ssd: <HardDrive className="w-4 h-4" />,
  cooler: <Fan className="w-4 h-4" />,
};

export const Level3PuzzleBoard: React.FC<Level3PuzzleBoardProps> = ({
  team,
  disabled,
  onInstallSlot,
}) => {
  const installed = team.level3Installed;

  // Each team has its own target sequence so Red & Blue install different parts simultaneously
  const targetPartId =
    team.level3Sequence.find((id) => !installed.includes(id)) ?? null;
  const targetMeta = LEVEL3_SLOTS.find((s) => s.id === targetPartId) ?? null;

  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClickSlot = (targetSlotId: PuzzleSlotId) => {
    if (disabled || feedback || !targetPartId || !targetMeta) return;

    const matchesCpuZone =
      (targetPartId === 'cpu' && targetSlotId === 'cpu') ||
      (targetPartId === 'cooler' && (targetSlotId === 'cooler' || targetSlotId === 'cpu'));

    if (targetPartId === targetSlotId || matchesCpuZone) {
      const msg = `${targetMeta.componentName} terpasang pada ${targetMeta.slotTitle}!`;
      setFeedback({ ok: true, text: msg });
      timerRef.current = window.setTimeout(() => {
        setFeedback(null);
        onInstallSlot(targetPartId, true, msg);
      }, 650);
    } else {
      const wrongMeta = LEVEL3_SLOTS.find((s) => s.id === targetSlotId)!;
      const msg = `Slot keliru! ${targetMeta.componentName} bukan di ${wrongMeta.slotTitle}.`;
      setFeedback({ ok: false, text: msg });
      timerRef.current = window.setTimeout(() => {
        setFeedback(null);
        onInstallSlot(targetPartId, false, msg);
      }, 800);
    }
  };

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-display text-base lg:text-lg font-bold text-white">
            Level 3 · Puzzle Pasang Komponen
          </h3>
          <p className="text-[11px] text-slate-400">
            Sentuh slot yang tepat pada motherboard untuk komponen aktif di bawah
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums">
          {installed.length} / 4 Terpasang
        </span>
      </div>

      {/* Active Target Component Prompt (Team-Specific Order) */}
      {targetMeta && (
        <div className="rounded-xl bg-amber-500/10 border border-amber-400/50 p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
            {SLOT_ICONS[targetMeta.id]}
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm font-bold text-white">
              Pasang Sekarang: {targetMeta.componentName}
            </div>
            <div className="text-[11px] text-amber-200/90">{targetMeta.instruction}</div>
          </div>
        </div>
      )}

      {/* Interactive Motherboard Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden select-none">
          <ResilientImage
            src={ASSET_PATHS.motherboardTop}
            alt="Diagram interaktif papan motherboard ATX"
            className="w-full h-full object-cover"
            fallbackIcon={<Cpu className="w-10 h-10" />}
            fallbackLabel="Motherboard ATX"
          />

          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

          {LEVEL3_SLOTS.map((slot) => {
            const isInstalled = installed.includes(slot.id);
            const cpuReady = installed.includes('cpu');

            if (slot.id === 'cpu' && cpuReady) return null;
            if (slot.id === 'cooler' && !cpuReady) return null;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={disabled || isInstalled || Boolean(feedback)}
                onClick={() => handleClickSlot(slot.id)}
                style={{
                  left: `${slot.xPercent}%`,
                  top: `${slot.yPercent}%`,
                  width: `${slot.wPercent}%`,
                  height: `${slot.hPercent}%`,
                }}
                className={`absolute rounded-lg border-2 flex flex-col items-center justify-center p-1 text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  isInstalled
                    ? 'bg-emerald-600/35 border-emerald-400 text-white'
                    : 'bg-slate-900/65 border-slate-200/70 hover:border-amber-300 hover:bg-amber-500/25 text-slate-100'
                }`}
              >
                {isInstalled ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                ) : (
                  <span className="text-[10px] font-bold leading-tight bg-slate-950/90 px-1.5 py-0.5 rounded">
                    {slot.slotTitle}
                  </span>
                )}
              </button>
            );
          })}

          {installed.includes('cooler') && (
            <div
              style={{ left: '46%', top: '19%', width: '21%', height: '26%' }}
              className="absolute rounded-lg border-2 border-emerald-400 bg-emerald-600/40 flex flex-col items-center justify-center text-white pointer-events-none"
            >
              <Fan className="w-5 h-5 text-emerald-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-[10px] font-bold bg-slate-950/85 px-1.5 py-0.5 rounded mt-0.5">
                CPU + Cooler
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Checklist Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
        {team.level3Sequence.map((slotId) => {
          const sMeta = LEVEL3_SLOTS.find((s) => s.id === slotId)!;
          const done = installed.includes(slotId);
          const current = slotId === targetPartId;
          return (
            <div
              key={slotId}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 truncate ${
                done
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : current
                  ? 'bg-amber-500/15 border-amber-400 text-amber-200 font-semibold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              {SLOT_ICONS[slotId]}
              <span className="truncate">{sMeta.componentName.replace(' (Cooler)', '')}</span>
            </div>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`rounded-xl px-3.5 py-2.5 border text-xs flex items-center gap-2 ${
            feedback.ok
              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
              : 'bg-red-950/40 border-red-500/60 text-red-100'
          }`}
        >
          {feedback.ok ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}
    </div>
  );
};
