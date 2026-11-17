import React, { useEffect } from 'react';
import { Users, Bot, Play, Wrench, Lock, MonitorPlay } from 'lucide-react';
import { ASSET_PATHS, LEVEL_METADATA } from '../data/hardwareData';
import { GameMode } from '../types/game';
import { ResilientImage } from './HardwareVisuals';

interface TitleScreenProps {
  mode: GameMode;
  classLabel: string;
  redName: string;
  blueName: string;
  matchCount: number;
  onChangeMode: (mode: GameMode) => void;
  onChangeClassLabel: (label: string) => void;
  onChangeRedName: (name: string) => void;
  onChangeBlueName: (name: string) => void;
  onStart: () => void;
  onOpenDashboard: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  mode,
  classLabel,
  redName,
  blueName,
  matchCount,
  onChangeMode,
  onChangeClassLabel,
  onChangeRedName,
  onChangeBlueName,
  onStart,
  onOpenDashboard,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0B1120] text-slate-100 flex flex-col">
      {/* Full-Viewport Key Art Backdrop with Left Calm Negative Space Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ResilientImage
          src={ASSET_PATHS.labBackdrop}
          alt="Meja kerja laboratorium perakitan komputer Mr. Hardware"
          className="w-full h-full object-cover opacity-55"
          fallbackIcon={<Wrench className="w-16 h-16" />}
          fallbackLabel="Laboratorium Komputer"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(11,17,32,0.97) 0%, rgba(11,17,32,0.88) 44%, rgba(11,17,32,0.45) 100%), linear-gradient(180deg, rgba(11,17,32,0.5) 0%, rgba(11,17,32,0.2) 50%, rgba(11,17,32,0.94) 100%)',
          }}
        />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-8 lg:py-10 flex flex-col justify-between gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left Hero Column (Calm Negative Space + Bespoke SVG Lockup + Teacher Setup Controls) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Bespoke Inline SVG Title Lockup */}
            <div className="space-y-2.5">
              <p className="text-xs font-medium tracking-wider text-amber-400">
                Misi Laboratorium TKJ · Proyektor Kelas & Layar Sentuh Bersama
              </p>

              <svg
                viewBox="0 0 640 120"
                className="w-full max-w-[520px] h-auto"
                role="img"
                aria-label="COMPUTER HERO"
              >
                <defs>
                  <linearGradient id="heroTitleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="65%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <g transform="translate(4, 18)">
                  <rect
                    x="0"
                    y="6"
                    width="64"
                    height="64"
                    rx="10"
                    fill="#1E293B"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                  />
                  <rect x="16" y="22" width="32" height="32" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                  <path d="M10 18 H0 M10 38 H0 M10 58 H0 M54 18 H64 M54 38 H64 M54 58 H64" stroke="#F59E0B" strokeWidth="2.5" />
                  <path d="M22 6 V0 M32 6 V0 M42 6 V0 M22 70 V76 M32 70 V76 M42 70 V76" stroke="#F59E0B" strokeWidth="2.5" />
                </g>
                <text
                  x="86"
                  y="62"
                  fill="url(#heroTitleGrad)"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="50"
                  letterSpacing="-1"
                >
                  COMPUTER HERO
                </text>
                <text
                  x="88"
                  y="94"
                  fill="#94A3B8"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="600"
                  fontSize="18"
                >
                  Hidupkan Kembali Laboratorium Mr. Hardware
                </text>
              </svg>

              <p className="text-sm lg:text-base text-slate-300 max-w-xl leading-relaxed">
                Dirancang untuk proyeksi tablet atau laptop di depan kelas. Kedua regu bermain{' '}
                <strong className="text-white font-semibold">secara bersamaan di layar terbagi</strong> dengan{' '}
                <strong className="text-amber-300 font-semibold">soal berbeda antar regu</strong> melewati 6 level
                hingga meraih gelar <strong className="text-amber-300 font-semibold">MASTER TEKNISI TKJ</strong>.
              </p>
            </div>

            {/* Teacher Setup Panel */}
            <div className="bg-slate-900/90 border border-slate-700/75 rounded-xl p-5 max-w-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <MonitorPlay className="w-4 h-4 text-amber-400" />
                  Pengaturan Kelas oleh Guru
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => onChangeMode('TWO_TEAMS')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      mode === 'TWO_TEAMS'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    2 Regu · Bersamaan
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeMode('VS_BOT')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      mode === 'VS_BOT'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    Solo vs Bot
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="class-label-input" className="block text-xs font-medium text-slate-300 mb-1">
                  Nama Kelas / Sesi Pertandingan (Diisi Guru)
                </label>
                <input
                  id="class-label-input"
                  type="text"
                  maxLength={32}
                  value={classLabel}
                  onChange={(e) => onChangeClassLabel(e.target.value)}
                  placeholder="Contoh: X TKJ 1 · Sesi Pagi"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="red-team-input" className="block text-xs font-medium text-red-400 mb-1">
                    Nama Regu Merah (Diisi Guru)
                  </label>
                  <input
                    id="red-team-input"
                    type="text"
                    maxLength={22}
                    value={redName}
                    onChange={(e) => onChangeRedName(e.target.value)}
                    placeholder="Regu Merah"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-red-500/45 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label htmlFor="blue-team-input" className="block text-xs font-medium text-blue-400 mb-1">
                    {mode === 'VS_BOT' ? 'Nama Lawan (Bot)' : 'Nama Regu Biru (Diisi Guru)'}
                  </label>
                  <input
                    id="blue-team-input"
                    type="text"
                    maxLength={22}
                    value={blueName}
                    onChange={(e) => onChangeBlueName(e.target.value)}
                    placeholder="Regu Biru"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-blue-500/45 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-bold text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Mulai Pertandingan
                </button>

                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Dasbor Guru ({matchCount})
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Jawab bersamaan di panel masing-masing · Soal berbeda anti-contek · Esc Jeda
              </p>
            </div>
          </div>

          {/* Right Column: Mr. Hardware Mentor Brief & 6-Level Mission Map */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4">
                <ResilientImage
                  src={ASSET_PATHS.mrHardware}
                  alt="Mentor Mr. Hardware"
                  className="w-20 h-20 rounded-xl object-cover border border-amber-500/40 shrink-0"
                  fallbackIcon={<Wrench className="w-8 h-8" />}
                  fallbackLabel="Mr. Hardware"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-amber-400">Mentor Laboratorium</p>
                  <h2 className="font-display text-xl font-bold text-white">Mr. Hardware</h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    “Kedua regu bertanding bersamaan di sisi kiri dan kanan layar dengan paket soal berbeda. Regu tercepat
                    menaklukkan Level 6 menang!”
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2.5">
                <h3 className="text-xs font-semibold text-slate-300">Peta 6 Level Tantangan</h3>
                <ol className="space-y-2">
                  {([1, 2, 3, 4, 5, 6] as const).map((lvl) => {
                    const meta = LEVEL_METADATA[lvl];
                    return (
                      <li
                        key={lvl}
                        className="flex items-baseline justify-between gap-3 text-xs py-1.5 border-b border-slate-800/70 last:border-b-0"
                      >
                        <span className="font-semibold text-slate-100">
                          <span className="font-mono text-amber-400 mr-2">0{lvl}.</span>
                          {meta.title}
                        </span>
                        <span className="text-slate-400 text-right shrink-0">{meta.goalLabel}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
