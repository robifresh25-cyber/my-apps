import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Cable, ArrowRight } from 'lucide-react';
import { LEVEL4_CABLES, LEVEL4_STEPS, Level4StepOption } from '../../data/hardwareData';
import { TeamProgress } from '../../types/game';

interface Level4PcBuilderProps {
  team: TeamProgress;
  disabled: boolean;
  onStepComplete: (
    success: boolean,
    payload: {
      stepIndex: number;
      option?: Level4StepOption;
      cableId?: string;
      feedbackMsg: string;
    }
  ) => void;
}

export const Level4PcBuilder: React.FC<Level4PcBuilderProps> = ({
  team,
  disabled,
  onStepComplete,
}) => {
  const stepIdx = team.level4Step;
  const build = team.level4Build;
  const assignedPlatform = team.level4AssignedPlatform;

  const [selectedCable, setSelectedCable] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const currentStepSpec = stepIdx < 5 ? LEVEL4_STEPS[stepIdx] : null;

  // Shuffle option display order per step/team so answers don't sit in identical rows
  const shuffledStepOptions = useMemo(() => {
    if (!currentStepSpec) return [];
    const arr = [...currentStepSpec.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentStepSpec?.stepIndex, team.id, team.attemptsTotal]);

  const handleSelectOption = (opt: Level4StepOption) => {
    if (disabled || feedback) return;

    // On Step 0, enforce the team's assigned platform so Red (LGA1700/DDR5) and Blue (AM4/DDR4) build different specs!
    let isValid = opt.isValidFor(build.moboPlatform);
    let reason = opt.reasonIfWrong;

    if (stepIdx === 0) {
      if (opt.setsPlatform && opt.setsPlatform !== assignedPlatform) {
        isValid = false;
        reason =
          assignedPlatform === 'LGA1700_DDR5'
            ? 'Tugas regu kalian adalah merakit platform Intel LGA 1700 · DDR5 (Motherboard B760).'
            : 'Tugas regu kalian adalah merakit platform AMD AM4 · DDR4 (Motherboard A520).';
      }
    }

    const msg = isValid
      ? `${opt.label} terpasang di dalam casing!`
      : reason;

    setFeedback({ ok: isValid, text: msg });
    timerRef.current = window.setTimeout(() => {
      setFeedback(null);
      onStepComplete(isValid, { stepIndex: stepIdx, option: opt, feedbackMsg: msg });
    }, 800);
  };

  const handlePairCable = (targetCableId: string) => {
    if (disabled || !selectedCable || feedback) return;
    if (build.cablesConnected.includes(targetCableId)) return;

    if (selectedCable === targetCableId) {
      const cableMeta = LEVEL4_CABLES.find((c) => c.id === targetCableId)!;
      const msg = `${cableMeta.cableLabel} terhubung ke ${cableMeta.targetPort}!`;
      setSelectedCable(null);
      setFeedback({ ok: true, text: msg });
      timerRef.current = window.setTimeout(() => {
        setFeedback(null);
        onStepComplete(true, { stepIndex: 5, cableId: targetCableId, feedbackMsg: msg });
      }, 650);
    } else {
      const msg = 'Konektor tidak cocok! Sesuaikan jenis kabel daya dengan header tujuannya.';
      setFeedback({ ok: false, text: msg });
      timerRef.current = window.setTimeout(() => {
        setFeedback(null);
        onStepComplete(false, { stepIndex: 5, feedbackMsg: msg });
      }, 800);
    }
  };

  const connectedCount = build.cablesConnected.length;
  const missionSpecLabel =
    assignedPlatform === 'LGA1700_DDR5'
      ? 'Target Spesifikasi: Intel LGA 1700 · DDR5'
      : 'Target Spesifikasi: AMD AM4 · DDR4';

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-display text-base lg:text-lg font-bold text-white">
            Level 4 · Rakit Komputer
          </h3>
          <p className="text-[11px] text-amber-300 font-medium">{missionSpecLabel}</p>
        </div>
        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums">
          Tahap {Math.min(6, stepIdx + 1)} / 6
        </span>
      </div>

      {/* 6-Step Progress Bar */}
      <div className="grid grid-cols-6 gap-1 text-[10px] font-medium">
        {['Mobo', 'CPU', 'RAM', 'Storage', 'PSU', 'Kabel'].map((label, idx) => {
          const done = stepIdx > idx || (idx === 5 && connectedCount === 3);
          const active = stepIdx === idx && !done;
          return (
            <div
              key={label}
              className={`px-1.5 py-1 rounded text-center border truncate ${
                done
                  ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300'
                  : active
                  ? 'bg-amber-500/15 border-amber-400 text-amber-200 font-semibold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              {idx + 1}. {label}
            </div>
          );
        })}
      </div>

      {/* Compact PC Case Schematic + Spec Readout */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3.5">
        <svg
          viewBox="0 0 220 230"
          className="w-28 h-28 shrink-0"
          role="img"
          aria-label="Skema Casing PC"
        >
          <rect x="14" y="10" width="192" height="210" rx="10" fill="#0F172A" stroke="#475569" strokeWidth="3" />
          {build.moboName ? (
            <rect x="30" y="22" width="118" height="134" rx="5" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          ) : (
            <rect x="30" y="22" width="118" height="134" rx="5" fill="none" stroke="#334155" strokeDasharray="5 4" />
          )}
          {build.cpuName && (
            <rect x="64" y="46" width="32" height="32" rx="3" fill="#CBD5E1" stroke="#F59E0B" strokeWidth="2" />
          )}
          {build.ramName && (
            <g>
              <rect x="110" y="38" width="7" height="52" rx="1" fill="#10B981" />
              <rect x="122" y="38" width="7" height="52" rx="1" fill="#10B981" />
            </g>
          )}
          {build.storageName && (
            <rect x="56" y="96" width="54" height="14" rx="2" fill="#0284C7" />
          )}
          {build.psuName ? (
            <rect x="30" y="170" width="84" height="34" rx="4" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
          ) : (
            <rect x="30" y="170" width="84" height="34" rx="4" fill="none" stroke="#334155" strokeDasharray="5 4" />
          )}
          {build.cablesConnected.includes('cable_24pin') && (
            <path d="M114 180 C158 180, 162 90, 140 72" stroke="#F59E0B" strokeWidth="3.5" fill="none" />
          )}
          {build.cablesConnected.includes('cable_8pin') && (
            <path d="M90 170 C48 150, 38 42, 52 28" stroke="#38BDF8" strokeWidth="3" fill="none" />
          )}
          {build.cablesConnected.includes('cable_sata_pcie') && (
            <path d="M114 196 C168 196, 174 114, 110 103" stroke="#10B981" strokeWidth="3" fill="none" />
          )}
        </svg>

        <div className="flex-1 min-w-0 space-y-1 text-[11px]">
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">Mobo:</span>
            <span className="text-slate-200 font-medium truncate">{build.moboName ?? 'Kosong'}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">CPU:</span>
            <span className="text-slate-200 font-medium truncate">{build.cpuName ?? '—'}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">RAM:</span>
            <span className="text-slate-200 font-medium truncate">{build.ramName ?? '—'}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">Storage:</span>
            <span className="text-slate-200 font-medium truncate">{build.storageName ?? '—'}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">PSU:</span>
            <span className="text-slate-200 font-medium truncate">{build.psuName ?? '—'}</span>
          </div>
        </div>
      </div>

      {/* Active Step Choices or Cable Wiring */}
      {currentStepSpec ? (
        <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
          <div>
            <p className="text-[11px] font-semibold text-amber-400">{currentStepSpec.title}</p>
            <h4 className="font-display text-sm font-bold text-white mt-0.5">
              {currentStepSpec.prompt}
            </h4>
          </div>

          <div className="space-y-2">
            {shuffledStepOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                disabled={disabled || Boolean(feedback)}
                onClick={() => handleSelectOption(opt)}
                className="w-full min-h-[54px] p-3 rounded-xl bg-slate-900/95 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/70 text-left transition-all cursor-pointer disabled:opacity-75 disabled:cursor-default flex items-center justify-between gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-white">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{opt.detail}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
          <div>
            <p className="text-[11px] font-semibold text-amber-400">
              Langkah 6 · Hubungkan Kabel Daya ({connectedCount}/3)
            </p>
            <h4 className="font-display text-sm font-bold text-white mt-0.5">
              Sentuh kabel di kiri lalu sentuh header tujuannya di kanan:
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1.5">
              {LEVEL4_CABLES.map((cable) => {
                const isDone = build.cablesConnected.includes(cable.id);
                const isSelected = selectedCable === cable.id;
                return (
                  <button
                    key={cable.id}
                    type="button"
                    disabled={disabled || isDone || Boolean(feedback)}
                    onClick={() => setSelectedCable(cable.id)}
                    className={`w-full min-h-[48px] p-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer flex items-center gap-2 ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-200'
                    }`}
                  >
                    <Cable className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span className="font-semibold leading-tight">{cable.cableLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5">
              {[...LEVEL4_CABLES].reverse().map((port) => {
                const isDone = build.cablesConnected.includes(port.id);
                return (
                  <button
                    key={port.id}
                    type="button"
                    disabled={disabled || isDone || !selectedCable || Boolean(feedback)}
                    onClick={() => handlePairCable(port.id)}
                    className={`w-full min-h-[48px] p-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer disabled:cursor-default ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : selectedCable
                        ? 'bg-slate-900 border-amber-400/50 hover:bg-amber-500/15 text-slate-100'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold leading-tight">{port.targetPort}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
