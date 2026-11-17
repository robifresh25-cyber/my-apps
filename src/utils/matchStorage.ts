import { MatchRecord, TeamId, TeamProgress } from '../types/game';

const STORAGE_KEY = 'computer_hero_match_records_v1';

export function loadMatchRecords(): MatchRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MatchRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveMatchRecord(record: MatchRecord): MatchRecord[] {
  const existing = loadMatchRecords();
  const updated = [record, ...existing.filter((r) => r.id !== record.id)];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota issues safely
  }
  return updated;
}

export function deleteMatchRecord(id: string): MatchRecord[] {
  const updated = loadMatchRecords().filter((r) => r.id !== id);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota issues safely
  }
  return updated;
}

export function clearAllMatchRecords(): MatchRecord[] {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
  return [];
}

export function buildMatchRecord(params: {
  id: string;
  classLabel: string;
  mode: MatchRecord['mode'];
  durationSeconds: number;
  redTeam: TeamProgress;
  blueTeam: TeamProgress;
  winnerId: TeamId | null;
  isCompletedFull: boolean;
}): MatchRecord {
  const { id, classLabel, mode, durationSeconds, redTeam, blueTeam, winnerId, isCompletedFull } =
    params;

  const calcAcc = (t: TeamProgress) =>
    t.attemptsTotal > 0 ? Math.round((t.correctTotal / t.attemptsTotal) * 100) : 0;

  let resolvedWinnerId: TeamId | 'draw' = 'draw';
  let winnerName = 'Seri';

  if (winnerId === 'red') {
    resolvedWinnerId = 'red';
    winnerName = redTeam.name;
  } else if (winnerId === 'blue') {
    resolvedWinnerId = 'blue';
    winnerName = blueTeam.name;
  } else {
    // Ended early by teacher: rank by level first, then total score
    if (
      redTeam.level > blueTeam.level ||
      (redTeam.level === blueTeam.level && redTeam.totalScore > blueTeam.totalScore)
    ) {
      resolvedWinnerId = 'red';
      winnerName = redTeam.name;
    } else if (
      blueTeam.level > redTeam.level ||
      (blueTeam.level === redTeam.level && blueTeam.totalScore > redTeam.totalScore)
    ) {
      resolvedWinnerId = 'blue';
      winnerName = blueTeam.name;
    }
  }

  return {
    id,
    playedAt: new Date().toISOString(),
    classLabel: classLabel.trim() || 'Kelas Umum',
    mode,
    durationSeconds: Math.max(1, durationSeconds),
    winnerId: resolvedWinnerId,
    winnerName,
    isCompletedFull,
    red: {
      name: redTeam.name,
      levelReached: redTeam.level,
      totalScore: redTeam.totalScore,
      correctTotal: redTeam.correctTotal,
      attemptsTotal: redTeam.attemptsTotal,
      accuracyPct: calcAcc(redTeam),
    },
    blue: {
      name: blueTeam.name,
      levelReached: blueTeam.level,
      totalScore: blueTeam.totalScore,
      correctTotal: blueTeam.correctTotal,
      attemptsTotal: blueTeam.attemptsTotal,
      accuracyPct: calcAcc(blueTeam),
    },
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDateId(iso: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function exportMatchesToCsv(records: MatchRecord[]): void {
  const header = [
    'Tanggal',
    'Kelas/Sesi',
    'Mode',
    'Status',
    'Pemenang',
    'Durasi (dtk)',
    'Regu Merah',
    'Level Merah',
    'Skor Merah',
    'Akurasi Merah (%)',
    'Regu Biru',
    'Level Biru',
    'Skor Biru',
    'Akurasi Biru (%)',
  ];

  const escapeCell = (val: string | number) => {
    const str = String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = records.map((r) => [
    formatDateId(r.playedAt),
    r.classLabel,
    r.mode === 'TWO_TEAMS' ? 'Layar Bersama (2 Regu)' : 'Solo vs Bot',
    r.isCompletedFull ? 'Tamat Level 6' : 'Dihentikan Guru',
    r.winnerName,
    r.durationSeconds,
    r.red.name,
    r.red.levelReached,
    r.red.totalScore,
    r.red.accuracyPct,
    r.blue.name,
    r.blue.levelReached,
    r.blue.totalScore,
    r.blue.accuracyPct,
  ]);

  const csvContent =
    [header.map(escapeCell).join(','), ...rows.map((row) => row.map(escapeCell).join(','))].join(
      '\n'
    );

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `rekap-computer-hero-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
