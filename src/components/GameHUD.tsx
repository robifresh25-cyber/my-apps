import React from 'react';
import { Volume2, VolumeX, Pause, ShieldAlert, Shield, Trophy } from 'lucide-react';
import { LEVEL_METADATA } from '../data/hardwareData';
import { GameMode, TeamProgress } from '../types/game';

interface GameHUDProps {
  redTeam: TeamProgress;
  blueTeam: TeamProgress;
  mode: GameMode;
  classLabel: string;
  muted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
}

function getLevelProgressSummary(team: TeamProgress): { pct: number; label: string } {
  switch (team.level) {
    case 1:
      return {
        pct: Math.min(100, (team.level1Points / 100) * 100),
        label: `${team.level1Points}/100 pts`,
      };
    case 2:
      return {
        pct: Math.min(100, (team.level2Correct / 8) * 100),
        label: `${team.level2Correct}/8 benar (${team.level2Answered}/10)`,
      };
    case 3:
      return {
        pct: (team.level3Installed.length / 4) * 100,
        label: `${team.level3Installed.length}/4 slot`,
      };
    case 4:
      return {
        pct: (team.level4Step / 6) * 100,
        label: `${team.level4Step}/6 rakit`,
      };
    case 5:
      return {
        pct: (team.level5Solved.length / 4) * 100,
        label: `${team.level5Solved.length}/4 kasus`,
      };
    case 6:
      return {
        pct: Math.min(100, (team.level6Answered / 15) * 100),
        label: `${team.level6Correct} benar (${team.level6Answered}/15)`,
      };
  }
}

export const GameHUD: React.FC<GameHUDProps> = ({
  redTeam,
  blueTeam,
  mode,
  classLabel,
  muted,
  onToggleMute,
  onPause,
}) => {
  const redProg = getLevelProgressSummary(redTeam);
  const blueProg = getLevelProgressSummary(blueTeam);

  return (
    <header className="w-full bg-slate-950/95 border-b border-slate-800 px-4 lg:px-6 py-2.5 shrink-0">
      <div className="max-w-[1440px] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
        {/* Red Team Status */}
        <div className="flex-1 min-w-[220px] rounded-lg px-3.5 py-2 border bg-red-950/35 border-red-500/60">
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-bold text-white truncate">{redTeam.name}</span>
              <span className="text-[11px] text-red-300 font-medium whitespace-nowrap shrink-0">
                · Panel Kiri
              </span>
            </div>
            <span className="font-mono font-bold text-red-300 tabular-nums shrink-0">
              {redTeam.totalScore} pts
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-semibold text-slate-200 whitespace-nowrap tabular-nums">
              Lv.{redTeam.level} · {LEVEL_METADATA[redTeam.level].shortTitle}
            </span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-sm overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-200"
                style={{ width: `${redProg.pct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-slate-300 tabular-nums whitespace-nowrap">
              {redProg.label}
            </span>
          </div>
        </div>

        {/* Center Class & Race Track + System Actions */}
        <div className="flex items-center gap-2.5 shrink-0 order-first lg:order-none w-full lg:w-auto justify-between lg:justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200 hidden sm:inline truncate max-w-[110px]">
              {classLabel || 'Kelas'}
            </span>
            <div className="flex items-center gap-1 font-mono text-xs tabular-nums">
              {([1, 2, 3, 4, 5, 6] as const).map((lvl) => {
                const redHere = redTeam.level === lvl;
                const blueHere = blueTeam.level === lvl;
                return (
                  <div
                    key={lvl}
                    title={`Level ${lvl}: ${LEVEL_METADATA[lvl].title}`}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] border ${
                      redHere && blueHere
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : redHere
                        ? 'bg-red-500/25 border-red-400 text-red-200'
                        : blueHere
                        ? 'bg-blue-500/25 border-blue-400 text-blue-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    {lvl}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? 'Aktifkan Suara' : 'Bisukan Suara'}
              title={muted ? 'Aktifkan Suara (M)' : 'Bisukan Suara (M)'}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onPause}
              aria-label="Jeda Permainan"
              title="Jeda Permainan (Esc)"
              className="h-10 px-3 flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Pause className="w-4 h-4" />
              Jeda
            </button>
          </div>
        </div>

        {/* Blue Team Status */}
        <div className="flex-1 min-w-[220px] rounded-lg px-3.5 py-2 border bg-blue-950/35 border-blue-500/60">
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Shield className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-bold text-white truncate">{blueTeam.name}</span>
              <span className="text-[11px] text-blue-300 font-medium whitespace-nowrap shrink-0">
                · {mode === 'VS_BOT' ? 'Bot Otomatis' : 'Panel Kanan'}
              </span>
            </div>
            <span className="font-mono font-bold text-blue-300 tabular-nums shrink-0">
              {blueTeam.totalScore} pts
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-semibold text-slate-200 whitespace-nowrap tabular-nums">
              Lv.{blueTeam.level} · {LEVEL_METADATA[blueTeam.level].shortTitle}
            </span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-sm overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${blueProg.pct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-slate-300 tabular-nums whitespace-nowrap">
              {blueProg.label}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
