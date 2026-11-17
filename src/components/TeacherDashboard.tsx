import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Download,
  Search,
  Trash2,
  Trophy,
  Users,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { MatchRecord } from '../types/game';
import {
  exportMatchesToCsv,
  formatDateId,
  formatDuration,
} from '../utils/matchStorage';

interface TeacherDashboardProps {
  records: MatchRecord[];
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
  onStartNewMatch: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  records,
  onDeleteRecord,
  onClearAll,
  onBack,
  onStartNewMatch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [winnerFilter, setWinnerFilter] = useState<'all' | 'red' | 'blue'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(records[0]?.id ?? null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const filteredRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return records.filter((rec) => {
      if (winnerFilter !== 'all' && rec.winnerId !== winnerFilter) {
        return false;
      }
      if (!q) return true;
      return (
        rec.classLabel.toLowerCase().includes(q) ||
        rec.red.name.toLowerCase().includes(q) ||
        rec.blue.name.toLowerCase().includes(q) ||
        rec.winnerName.toLowerCase().includes(q)
      );
    });
  }, [records, searchQuery, winnerFilter]);

  const selectedRecord = useMemo(() => {
    if (filteredRecords.length === 0) return null;
    return filteredRecords.find((r) => r.id === selectedId) ?? filteredRecords[0];
  }, [filteredRecords, selectedId]);

  const summaryStats = useMemo(() => {
    const totalMatches = records.length;
    const completedCount = records.filter((r) => r.isCompletedFull).length;
    const redWins = records.filter((r) => r.winnerId === 'red').length;
    const blueWins = records.filter((r) => r.winnerId === 'blue').length;

    let totalAccSum = 0;
    let totalTeamEntries = 0;
    records.forEach((r) => {
      totalAccSum += r.red.accuracyPct + r.blue.accuracyPct;
      totalTeamEntries += 2;
    });
    const avgAccuracy = totalTeamEntries > 0 ? Math.round(totalAccSum / totalTeamEntries) : 0;

    return { totalMatches, completedCount, redWins, blueWins, avgAccuracy };
  }, [records]);

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-slate-100 flex flex-col">
      {/* Top Bar Contract: Breadcrumb left, primary actions right */}
      <header className="w-full bg-slate-950 border-b border-slate-800 px-4 lg:px-8 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <div className="min-w-0">
              <div className="text-xs text-slate-400">
                Computer Hero / Dasbor Guru
              </div>
              <h1 className="font-display text-xl font-bold text-white truncate">
                Rekap Hasil Per Pertandingan
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {records.length > 0 && (
              <button
                type="button"
                onClick={() => exportMatchesToCsv(filteredRecords.length > 0 ? filteredRecords : records)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4 text-amber-400" />
                Ekspor CSV
              </button>
            )}
            <button
              type="button"
              onClick={onStartNewMatch}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Pertandingan Baru
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* KPI Strip (Single-Elevation Flat Panels) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400">Total Pertandingan</span>
            <div className="font-mono text-2xl font-bold text-white tabular-nums">
              {summaryStats.totalMatches}
            </div>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {summaryStats.completedCount} tamat Level 6
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400">Kemenangan Regu Merah</span>
            <div className="font-mono text-2xl font-bold text-red-400 tabular-nums">
              {summaryStats.redWins}
            </div>
            <span className="text-xs text-slate-500">Rekor sisi merah</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400">Kemenangan Regu Biru</span>
            <div className="font-mono text-2xl font-bold text-blue-400 tabular-nums">
              {summaryStats.blueWins}
            </div>
            <span className="text-xs text-slate-500">Rekor sisi biru</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400">Rata-Rata Akurasi Regu</span>
            <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
              {summaryStats.avgAccuracy}%
            </div>
            <span className="text-xs text-slate-500">Ketepatan seluruh sesi</span>
          </div>
        </section>

        {/* Empty State vs Populated Table */}
        {records.length === 0 ? (
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="font-display text-lg font-bold text-white">
                Belum Ada Rekap Pertandingan
              </h2>
              <p className="text-sm text-slate-400">
                Setiap pertandingan kelas yang selesai hingga Level 6 atau dihentikan & disimpan guru akan otomatis
                tercatat di dasbor ini.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartNewMatch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
            >
              Mulai Pertandingan Pertama
            </button>
          </section>
        ) : (
          <div className="space-y-4">
            {/* Filter & Search Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[260px]">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kelas atau nama regu..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                  {(
                    [
                      { id: 'all', label: 'Semua' },
                      { id: 'red', label: 'Juara Merah' },
                      { id: 'blue', label: 'Juara Biru' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setWinnerFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        winnerFilter === tab.id
                          ? 'bg-amber-500 text-slate-950'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {confirmClearAll ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-300">Hapus semua rekap?</span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearAll();
                        setConfirmClearAll(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClearAll(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClearAll(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-400 hover:text-red-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Bersihkan Rekap
                  </button>
                )}
              </div>
            </div>

            {/* Table + Selected Match Detail Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* High-Density Match History Table */}
              <div className="lg:col-span-8 bg-slate-900/75 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold">
                        <th className="py-3 px-4">Waktu & Kelas</th>
                        <th className="py-3 px-3">Regu Merah</th>
                        <th className="py-3 px-3">Regu Biru</th>
                        <th className="py-3 px-3">Pemenang</th>
                        <th className="py-3 px-4 text-right">Durasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            Tidak ada hasil pertandingan yang cocok dengan filter.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((rec) => {
                          const isSelected = selectedRecord?.id === rec.id;
                          return (
                            <tr
                              key={rec.id}
                              onClick={() => setSelectedId(rec.id)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-amber-500/10'
                                  : 'hover:bg-slate-800/50'
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className="font-semibold text-white">{rec.classLabel}</div>
                                <div className="text-[11px] text-slate-400 font-mono">
                                  {formatDateId(rec.playedAt)}
                                </div>
                              </td>
                              <td className="py-3 px-3 font-mono tabular-nums">
                                <div className="font-sans font-semibold text-red-300 truncate max-w-[130px]">
                                  {rec.red.name}
                                </div>
                                <div className="text-slate-400">
                                  Lv.{rec.red.levelReached} · {rec.red.totalScore} pts
                                </div>
                              </td>
                              <td className="py-3 px-3 font-mono tabular-nums">
                                <div className="font-sans font-semibold text-blue-300 truncate max-w-[130px]">
                                  {rec.blue.name}
                                </div>
                                <div className="text-slate-400">
                                  Lv.{rec.blue.levelReached} · {rec.blue.totalScore} pts
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`font-semibold ${
                                    rec.winnerId === 'red'
                                      ? 'text-red-400'
                                      : rec.winnerId === 'blue'
                                      ? 'text-blue-400'
                                      : 'text-slate-300'
                                  }`}
                                >
                                  {rec.winnerName}
                                </span>
                                <div className="text-[11px] text-slate-500">
                                  {rec.isCompletedFull ? 'Master Teknisi' : 'Berhenti Awal'}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-slate-300 tabular-nums">
                                {formatDuration(rec.durationSeconds)}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail Rekap Pertandingan Terpilih */}
              {selectedRecord && (
                <aside className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <p className="text-xs text-amber-400 font-semibold">Detail Pertandingan</p>
                      <h2 className="font-display text-lg font-bold text-white">
                        {selectedRecord.classLabel}
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {formatDateId(selectedRecord.playedAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteRecord(selectedRecord.id)}
                      title="Hapus rekap pertandingan ini"
                      aria-label="Hapus rekap pertandingan ini"
                      className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-red-950/60 border border-slate-800 hover:border-red-500/50 flex items-center justify-center text-slate-400 hover:text-red-300 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        Pemenang:
                      </span>
                      <span className="font-bold text-white">{selectedRecord.winnerName}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        Mode:
                      </span>
                      <span>
                        {selectedRecord.mode === 'TWO_TEAMS'
                          ? 'Layar Bersama (2 Regu)'
                          : 'Solo vs Bot Biru'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        Durasi:
                      </span>
                      <span className="font-mono tabular-nums">
                        {formatDuration(selectedRecord.durationSeconds)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Status:
                      </span>
                      <span>
                        {selectedRecord.isCompletedFull ? 'Tamat Level 6' : 'Disimpan Guru'}
                      </span>
                    </div>
                  </div>

                  {/* Per-Team Detailed Metrics */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    {[
                      { label: 'Regu Merah', data: selectedRecord.red, color: 'text-red-400' },
                      { label: 'Regu Biru', data: selectedRecord.blue, color: 'text-blue-400' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-slate-950/80 border border-slate-800 p-3 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${item.color}`}>{item.data.name}</span>
                          <span className="font-mono text-slate-300 tabular-nums">
                            Level {item.data.levelReached}/6
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono tabular-nums text-slate-300">
                          <div>
                            <div className="text-slate-500 font-sans">Skor</div>
                            <div className="font-bold text-white">{item.data.totalScore}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 font-sans">Benar</div>
                            <div className="font-bold text-white">
                              {item.data.correctTotal}/{item.data.attemptsTotal}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500 font-sans">Akurasi</div>
                            <div className="font-bold text-emerald-400">
                              {item.data.accuracyPct}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
