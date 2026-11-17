import React from 'react';
import { Award, Play, RotateCcw, Home, Trophy, Sparkles, Lock, Save } from 'lucide-react';
import { ASSET_PATHS, LEVEL_METADATA } from '../data/hardwareData';
import { LevelNumber, TeamProgress } from '../types/game';
import { ResilientImage } from './HardwareVisuals';

interface PauseModalProps {
  onResume: () => void;
  onSaveAndEndMatch: () => void;
  onOpenDashboard: () => void;
  onRestart: () => void;
  onExitToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onSaveAndEndMatch,
  onOpenDashboard,
  onRestart,
  onExitToTitle,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Permainan Dijeda"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="space-y-1 text-center">
          <h2 className="font-display text-2xl font-bold text-white">Permainan Dijeda</h2>
          <p className="text-sm text-slate-400">
            Kontrol sesi kelas untuk guru dan teknisi laboratorium.
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Lanjutkan Permainan
          </button>

          <button
            type="button"
            onClick={onSaveAndEndMatch}
            className="w-full py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan & Akhiri ke Rekap
          </button>

          <button
            type="button"
            onClick={onOpenDashboard}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            Buka Dasbor Guru
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi dari Level 1
          </button>

          <button
            type="button"
            onClick={onExitToTitle}
            className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Kembali ke Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
};

interface LevelUpModalProps {
  team: TeamProgress;
  newLevel: LevelNumber;
  onContinue: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  team,
  newLevel,
  onContinue,
}) => {
  const meta = LEVEL_METADATA[newLevel];
  const isRed = team.id === 'red';

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-950/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Naik Level"
    >
      <div className="w-full max-w-lg bg-slate-900 border border-amber-500/60 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-center gap-4">
          <ResilientImage
            src={ASSET_PATHS.mrHardware}
            alt="Mr. Hardware memberi selamat"
            className="w-16 h-16 rounded-xl object-cover border border-amber-500/50 shrink-0"
            fallbackIcon={<Sparkles className="w-7 h-7" />}
            fallbackLabel="Mr. Hardware"
          />
          <div>
            <p className={`text-xs font-bold ${isRed ? 'text-red-400' : 'text-blue-400'}`}>
              {team.name} Naik Level
            </p>
            <h2 className="font-display text-2xl font-bold text-white">
              Level {newLevel} · {meta.title}
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          “Kerja bagus, {team.name}! {meta.mrHardwareIntro}”
        </p>

        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="text-xs font-mono text-amber-300">
            Target: {meta.goalLabel}
          </span>
          <button
            type="button"
            onClick={onContinue}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

interface VictoryModalProps {
  winner: TeamProgress;
  redTeam: TeamProgress;
  blueTeam: TeamProgress;
  classLabel: string;
  onPlayAgain: () => void;
  onOpenDashboard: () => void;
  onExitToTitle: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  redTeam,
  blueTeam,
  classLabel,
  onPlayAgain,
  onOpenDashboard,
  onExitToTitle,
}) => {
  const isRedWinner = winner.id === 'red';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/88 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Kemenangan Master Teknisi TKJ"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/70 rounded-2xl p-6 lg:p-8 space-y-6 shadow-2xl my-auto">
        {/* Award Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left pb-5 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-400/60 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-amber-400">
              {classLabel} · Laboratorium Mr. Hardware Kembali Menyala
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {winner.name} Meraih Gelar MASTER TEKNISI TKJ!
            </h2>
            <p className="text-sm text-slate-300">
              Hasil pertandingan telah otomatis direkap ke Dasbor Guru.
            </p>
          </div>
        </div>

        {/* Certificate Banner */}
        <div
          className={`rounded-xl p-4 border flex items-center gap-4 ${
            isRedWinner
              ? 'bg-red-950/35 border-red-500/50'
              : 'bg-blue-950/35 border-blue-500/50'
          }`}
        >
          <Award className="w-9 h-9 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <div className="font-display text-base font-bold text-white">
              Sertifikat Kehormatan · MASTER TEKNISI TKJ
            </div>
            <div className="text-xs text-slate-300">
              Dianugerahkan kepada <strong className="text-white">{winner.name}</strong> oleh Mr. Hardware
            </div>
          </div>
        </div>

        {/* Score Breakdown Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[redTeam, blueTeam].map((team) => {
            const isWin = team.id === winner.id;
            const accuracy =
              team.attemptsTotal > 0
                ? Math.round((team.correctTotal / team.attemptsTotal) * 100)
                : 0;

            return (
              <div
                key={team.id}
                className={`rounded-xl p-4 border space-y-2 ${
                  isWin
                    ? 'bg-slate-950/90 border-amber-500/50'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-display font-bold text-base ${
                      team.id === 'red' ? 'text-red-400' : 'text-blue-400'
                    }`}
                  >
                    {team.name}
                  </span>
                  <span className="font-mono text-xs font-semibold text-amber-300">
                    {isWin ? 'Juara' : `Level ${team.level}`}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300 font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Skor:</span>
                    <span className="font-bold text-white">{team.totalScore} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jawaban Tepat:</span>
                    <span>
                      {team.correctTotal} / {team.attemptsTotal} ({accuracy}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Level Tercapai:</span>
                    <span>Level {team.level} / 6</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            Dasbor Guru
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExitToTitle}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Menu Utama
            </button>
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Main Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
