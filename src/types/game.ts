export type GameState = 'TITLE_MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export type GameMode = 'TWO_TEAMS' | 'VS_BOT';

export type TeamId = 'red' | 'blue';

export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type HardwareComponentId =
  | 'cpu'
  | 'ram'
  | 'motherboard'
  | 'hdd'
  | 'ssd'
  | 'psu'
  | 'vga'
  | 'cooler';

export type PuzzleSlotId = 'cpu' | 'ram' | 'ssd' | 'cooler';

export interface Level4Build {
  moboPlatform: 'LGA1700_DDR5' | 'AM4_DDR4' | null;
  moboName: string | null;
  cpuName: string | null;
  ramName: string | null;
  storageName: string | null;
  psuName: string | null;
  cablesConnected: string[];
}

export interface TeamProgress {
  id: TeamId;
  name: string;
  level: LevelNumber;
  totalScore: number;
  streak: number;
  correctTotal: number;
  attemptsTotal: number;
  // Level 1: target 100 pts with independent component order
  level1Points: number;
  level1SeenIds: HardwareComponentId[];
  level1Order: HardwareComponentId[];
  level1Cursor: number;
  // Level 2: 8 of 10 disjoint questions
  level2QuestionOrder: string[];
  level2Answered: number;
  level2Correct: number;
  // Level 3: 4 motherboard slots in team-specific sequence
  level3Sequence: PuzzleSlotId[];
  level3Installed: PuzzleSlotId[];
  // Level 4: 6-step PC assembly with assigned platform per team
  level4AssignedPlatform: 'LGA1700_DDR5' | 'AM4_DDR4';
  level4Step: number; // 0..5 (6th step completed -> level up!)
  level4Build: Level4Build;
  // Level 5: 4 detective fault cases in team-specific order
  level5CaseOrder: string[];
  level5Solved: string[];
  level5CurrentPhase: 'cause' | 'action';
  // Level 6: 15 disjoint mixed Final Boss questions (need >= 12/15)
  level6QuestionOrder: string[];
  level6Answered: number;
  level6Correct: number;
}

export interface TurnEventLog {
  teamId: TeamId;
  teamName: string;
  level: LevelNumber;
  message: string;
  isSuccess: boolean;
  leveledUpTo?: LevelNumber;
  wonGame?: boolean;
}

export interface MatchTeamSummary {
  name: string;
  levelReached: LevelNumber;
  totalScore: number;
  correctTotal: number;
  attemptsTotal: number;
  accuracyPct: number;
}

export interface MatchRecord {
  id: string;
  playedAt: string;
  classLabel: string;
  mode: GameMode;
  durationSeconds: number;
  winnerId: TeamId | 'draw';
  winnerName: string;
  isCompletedFull: boolean;
  red: MatchTeamSummary;
  blue: MatchTeamSummary;
}
