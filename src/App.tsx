import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ShieldAlert, Shield, Sparkles } from 'lucide-react';
import {
  LEVEL2_QUESTIONS,
  LEVEL3_SLOTS,
  LEVEL4_CABLES,
  LEVEL4_STEPS,
  LEVEL5_CASES,
  LEVEL6_FINAL_QUESTIONS,
  LEVEL_METADATA,
  Level4StepOption,
  createDisjointQuestionPairs,
  shuffleIds,
} from './data/hardwareData';
import {
  GameMode,
  GameState,
  HardwareComponentId,
  LevelNumber,
  MatchRecord,
  PuzzleSlotId,
  TeamId,
  TeamProgress,
  TurnEventLog,
} from './types/game';
import { soundFX } from './utils/sound';
import {
  buildMatchRecord,
  clearAllMatchRecords,
  deleteMatchRecord,
  loadMatchRecords,
  saveMatchRecord,
} from './utils/matchStorage';
import { TitleScreen } from './components/TitleScreen';
import { GameHUD } from './components/GameHUD';
import { Level1Identify } from './components/levels/Level1Identify';
import { Level2Functions } from './components/levels/Level2Functions';
import { Level3PuzzleBoard } from './components/levels/Level3PuzzleBoard';
import { Level4PcBuilder } from './components/levels/Level4PcBuilder';
import { Level5Detective } from './components/levels/Level5Detective';
import { Level6FinalBoss } from './components/levels/Level6FinalBoss';
import { PauseModal, VictoryModal } from './components/Modals';
import { PinLockModal } from './components/PinLockModal';
import { TeacherDashboard } from './components/TeacherDashboard';

function createInitialTeams(
  redName: string,
  blueName: string
): { red: TeamProgress; blue: TeamProgress } {
  const decks = createDisjointQuestionPairs();

  const makeBase = (id: TeamId, name: string): TeamProgress => ({
    id,
    name: name.trim() || (id === 'red' ? 'Regu Merah' : 'Regu Biru'),
    level: 1,
    totalScore: 0,
    streak: 0,
    correctTotal: 0,
    attemptsTotal: 0,
    level1Points: 0,
    level1SeenIds: [],
    level1Order: id === 'red' ? decks.redL1 : decks.blueL1,
    level1Cursor: 0,
    level2QuestionOrder: id === 'red' ? decks.redL2 : decks.blueL2,
    level2Answered: 0,
    level2Correct: 0,
    level3Sequence:
      id === 'red' ? ['cpu', 'ram', 'ssd', 'cooler'] : ['ssd', 'cpu', 'cooler', 'ram'],
    level3Installed: [],
    level4AssignedPlatform: id === 'red' ? 'LGA1700_DDR5' : 'AM4_DDR4',
    level4Step: 0,
    level4Build: {
      moboPlatform: null,
      moboName: null,
      cpuName: null,
      ramName: null,
      storageName: null,
      psuName: null,
      cablesConnected: [],
    },
    level5CaseOrder:
      id === 'red'
        ? ['fault_dead', 'fault_nodisplay', 'fault_beep', 'fault_slow']
        : ['fault_beep', 'fault_slow', 'fault_dead', 'fault_nodisplay'],
    level5Solved: [],
    level5CurrentPhase: 'cause',
    level6QuestionOrder: id === 'red' ? decks.redL6 : decks.blueL6,
    level6Answered: 0,
    level6Correct: 0,
  });

  return {
    red: makeBase('red', redName),
    blue: makeBase('blue', blueName),
  };
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [mode, setMode] = useState<GameMode>('TWO_TEAMS');
  const [classLabel, setClassLabel] = useState('X TKJ 1');
  const [redNameInput, setRedNameInput] = useState('Regu Merah');
  const [blueNameInput, setBlueNameInput] = useState('Regu Biru');

  const initialPair = useRef(createInitialTeams('Regu Merah', 'Regu Biru'));
  const [redTeam, setRedTeam] = useState<TeamProgress>(initialPair.current.red);
  const [blueTeam, setBlueTeam] = useState<TeamProgress>(initialPair.current.blue);

  // Non-blocking per-team level-up toast banners so opponent is never interrupted
  const [redLevelBanner, setRedLevelBanner] = useState<LevelNumber | null>(null);
  const [blueLevelBanner, setBlueLevelBanner] = useState<LevelNumber | null>(null);
  const [winnerTeamId, setWinnerTeamId] = useState<TeamId | null>(null);
  const [muted, setMuted] = useState(false);

  // Teacher Dashboard + PIN 2026 + Match History Recaps
  const [matchRecords, setMatchRecords] = useState<MatchRecord[]>(() => loadMatchRecords());
  const [showPinModal, setShowPinModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState<string>(() => `match-${Date.now()}`);
  const matchStartTimeRef = useRef<number>(Date.now());
  const matchSavedRef = useRef<boolean>(false);

  const redTeamRef = useRef<TeamProgress>(redTeam);
  const blueTeamRef = useRef<TeamProgress>(blueTeam);
  redTeamRef.current = redTeam;
  blueTeamRef.current = blueTeam;

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundFX.muted = next;
      return next;
    });
  }, []);

  const persistCurrentMatch = useCallback(
    (
      finalRed: TeamProgress,
      finalBlue: TeamProgress,
      winId: TeamId | null,
      isCompletedFull: boolean
    ) => {
      if (matchSavedRef.current) return;
      matchSavedRef.current = true;
      const durationSeconds = Math.max(
        1,
        Math.round((Date.now() - matchStartTimeRef.current) / 1000)
      );
      const record = buildMatchRecord({
        id: currentMatchId,
        classLabel,
        mode,
        durationSeconds,
        redTeam: finalRed,
        blueTeam: finalBlue,
        winnerId: winId,
        isCompletedFull,
      });
      setMatchRecords(saveMatchRecord(record));
    },
    [currentMatchId, classLabel, mode]
  );

  const startNewGame = useCallback(() => {
    soundFX.playClick();
    const resolvedBlueName =
      mode === 'VS_BOT' && blueNameInput.trim() === 'Regu Biru'
        ? 'Regu Biru (Bot)'
        : blueNameInput;
    const teams = createInitialTeams(redNameInput, resolvedBlueName);
    setRedTeam(teams.red);
    setBlueTeam(teams.blue);
    setRedLevelBanner(null);
    setBlueLevelBanner(null);
    setWinnerTeamId(null);
    setShowDashboard(false);
    setShowPinModal(false);
    setCurrentMatchId(`match-${Date.now()}`);
    matchStartTimeRef.current = Date.now();
    matchSavedRef.current = false;
    setGameState('PLAYING');
  }, [redNameInput, blueNameInput, mode]);

  const handleExitToTitle = useCallback(() => {
    setRedLevelBanner(null);
    setBlueLevelBanner(null);
    setWinnerTeamId(null);
    setGameState('TITLE_MENU');
  }, []);

  const handleSaveAndEndMatch = useCallback(() => {
    persistCurrentMatch(redTeamRef.current, blueTeamRef.current, null, false);
    setGameState('TITLE_MENU');
    setShowPinModal(true);
  }, [persistCurrentMatch]);

  // Global keyboard shortcuts (Esc Pause, M Mute)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || showPinModal || showDashboard) return;
      if (e.key === 'Escape') {
        if (gameState === 'PLAYING') {
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
        }
      } else if (e.key.toLowerCase() === 'm' && gameState !== 'TITLE_MENU') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, toggleMute, showPinModal, showDashboard]);

  const triggerBanner = useCallback((teamId: TeamId, newLevel: LevelNumber) => {
    if (teamId === 'red') {
      setRedLevelBanner(newLevel);
      window.setTimeout(() => setRedLevelBanner((cur) => (cur === newLevel ? null : cur)), 2400);
    } else {
      setBlueLevelBanner(newLevel);
      window.setTimeout(() => setBlueLevelBanner((cur) => (cur === newLevel ? null : cur)), 2400);
    }
  }, []);

  const applyTeamUpdate = useCallback(
    (
      teamId: TeamId,
      updater: (prev: TeamProgress) => {
        nextTeam: TeamProgress;
        event: TurnEventLog;
      }
    ) => {
      let generatedEvent: TurnEventLog | null = null;
      let updatedTeamSnapshot: TeamProgress | null = null;
      const setTarget = teamId === 'red' ? setRedTeam : setBlueTeam;

      setTarget((prev) => {
        const res = updater(prev);
        generatedEvent = res.event;
        updatedTeamSnapshot = res.nextTeam;
        return res.nextTeam;
      });

      queueMicrotask(() => {
        if (!generatedEvent || !updatedTeamSnapshot) return;

        if (generatedEvent.wonGame) {
          soundFX.playVictory();
          const finalRed = teamId === 'red' ? updatedTeamSnapshot : redTeamRef.current;
          const finalBlue = teamId === 'blue' ? updatedTeamSnapshot : blueTeamRef.current;
          persistCurrentMatch(finalRed, finalBlue, teamId, true);
          setWinnerTeamId(teamId);
          setGameState('GAME_OVER');
          return;
        }

        if (generatedEvent.leveledUpTo) {
          soundFX.playLevelUp();
          triggerBanner(teamId, generatedEvent.leveledUpTo);
        } else if (generatedEvent.isSuccess) {
          soundFX.playSuccess();
        } else {
          soundFX.playError();
        }
      });
    },
    [persistCurrentMatch, triggerBanner]
  );

  // Level 1 Handler
  const handleLevel1Answer = useCallback(
    (
      teamId: TeamId,
      correct: boolean,
      componentId: HardwareComponentId,
      explanation: string
    ) => {
      applyTeamUpdate(teamId, (prev) => {
        const nextSeen = prev.level1SeenIds.includes(componentId)
          ? prev.level1SeenIds
          : [...prev.level1SeenIds, componentId];
        const streakBonus = correct && prev.streak >= 2 ? 5 : 0;
        const gained = correct ? 25 + streakBonus : 0;
        const nextL1Points = Math.min(100, prev.level1Points + gained);
        const leveledUp = nextL1Points >= 100;

        return {
          nextTeam: {
            ...prev,
            totalScore: prev.totalScore + gained,
            streak: correct ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (correct ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level1Points: nextL1Points,
            level1SeenIds: nextSeen,
            level1Cursor: prev.level1Cursor + 1,
            level: leveledUp ? 2 : 1,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 1,
            message: explanation,
            isSuccess: correct,
            leveledUpTo: leveledUp ? 2 : undefined,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Level 2 Handler
  const handleLevel2Answer = useCallback(
    (teamId: TeamId, correct: boolean, explanation: string) => {
      applyTeamUpdate(teamId, (prev) => {
        const answered = prev.level2Answered + 1;
        const correctCount = prev.level2Correct + (correct ? 1 : 0);
        const gained = correct ? 20 : 0;

        const passedEarly = correctCount >= 8;
        const finishedTen = answered >= 10;

        let nextLevel: LevelNumber = 2;
        let nextOrder = prev.level2QuestionOrder;
        let nextAnswered = answered;
        let nextCorrect = correctCount;
        let leveledUpTo: LevelNumber | undefined;

        if (passedEarly) {
          nextLevel = 3;
          leveledUpTo = 3;
        } else if (finishedTen && correctCount < 8) {
          // Reshuffle keeping disjointness preference from the other team's current set
          const otherTeamOrder =
            teamId === 'red' ? blueTeamRef.current.level2QuestionOrder : redTeamRef.current.level2QuestionOrder;
          const preferred = LEVEL2_QUESTIONS.map((q) => q.id).filter(
            (id) => !otherTeamOrder.includes(id)
          );
          nextOrder = shuffleIds(preferred.length >= 10 ? preferred : LEVEL2_QUESTIONS.map((q) => q.id)).slice(0, 10);
          nextAnswered = 0;
          nextCorrect = 0;
        }

        return {
          nextTeam: {
            ...prev,
            level: nextLevel,
            totalScore: prev.totalScore + gained,
            streak: correct ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (correct ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level2QuestionOrder: nextOrder,
            level2Answered: nextAnswered,
            level2Correct: nextCorrect,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 2,
            message: explanation,
            isSuccess: correct,
            leveledUpTo,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Level 3 Handler
  const handleLevel3Slot = useCallback(
    (teamId: TeamId, slotId: PuzzleSlotId, success: boolean, feedbackMsg: string) => {
      if (success) soundFX.playSnap();
      applyTeamUpdate(teamId, (prev) => {
        const nextInstalled =
          success && !prev.level3Installed.includes(slotId)
            ? [...prev.level3Installed, slotId]
            : prev.level3Installed;

        const completed = nextInstalled.length >= 4;
        const gained = success ? 30 : 0;

        return {
          nextTeam: {
            ...prev,
            level: completed ? 4 : 3,
            totalScore: prev.totalScore + gained,
            streak: success ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (success ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level3Installed: nextInstalled,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 3,
            message: feedbackMsg,
            isSuccess: success,
            leveledUpTo: completed ? 4 : undefined,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Level 4 Handler
  const handleLevel4Step = useCallback(
    (
      teamId: TeamId,
      success: boolean,
      payload: {
        stepIndex: number;
        option?: Level4StepOption;
        cableId?: string;
        feedbackMsg: string;
      }
    ) => {
      if (success) soundFX.playSnap();
      applyTeamUpdate(teamId, (prev) => {
        const nextBuild = { ...prev.level4Build };
        let nextStep = prev.level4Step;
        let leveledUp = false;

        if (success) {
          if (payload.stepIndex === 0 && payload.option) {
            nextBuild.moboPlatform = payload.option.setsPlatform ?? prev.level4AssignedPlatform;
            nextBuild.moboName = payload.option.label;
            nextStep = 1;
          } else if (payload.stepIndex === 1 && payload.option) {
            nextBuild.cpuName = payload.option.label;
            nextStep = 2;
          } else if (payload.stepIndex === 2 && payload.option) {
            nextBuild.ramName = payload.option.label;
            nextStep = 3;
          } else if (payload.stepIndex === 3 && payload.option) {
            nextBuild.storageName = payload.option.label;
            nextStep = 4;
          } else if (payload.stepIndex === 4 && payload.option) {
            nextBuild.psuName = payload.option.label;
            nextStep = 5;
          } else if (payload.stepIndex === 5 && payload.cableId) {
            if (!nextBuild.cablesConnected.includes(payload.cableId)) {
              nextBuild.cablesConnected = [...nextBuild.cablesConnected, payload.cableId];
            }
            if (nextBuild.cablesConnected.length >= 3) {
              nextStep = 6;
              leveledUp = true;
            }
          }
        }

        const gained = success ? 25 : 0;

        return {
          nextTeam: {
            ...prev,
            level: leveledUp ? 5 : 4,
            totalScore: prev.totalScore + gained,
            streak: success ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (success ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level4Step: nextStep,
            level4Build: nextBuild,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 4,
            message: payload.feedbackMsg,
            isSuccess: success,
            leveledUpTo: leveledUp ? 5 : undefined,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Level 5 Handler
  const handleLevel5Step = useCallback(
    (
      teamId: TeamId,
      caseId: string,
      phase: 'cause' | 'action',
      correct: boolean,
      explanation: string
    ) => {
      applyTeamUpdate(teamId, (prev) => {
        let nextPhase = prev.level5CurrentPhase;
        let nextSolved = prev.level5Solved;
        let leveledUp = false;

        if (correct) {
          if (phase === 'cause') {
            nextPhase = 'action';
          } else {
            nextSolved = prev.level5Solved.includes(caseId)
              ? prev.level5Solved
              : [...prev.level5Solved, caseId];
            nextPhase = 'cause';
            if (nextSolved.length >= 4) {
              leveledUp = true;
            }
          }
        }

        const gained = correct ? 25 : 0;

        return {
          nextTeam: {
            ...prev,
            level: leveledUp ? 6 : 5,
            totalScore: prev.totalScore + gained,
            streak: correct ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (correct ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level5Solved: nextSolved,
            level5CurrentPhase: nextPhase,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 5,
            message: explanation,
            isSuccess: correct,
            leveledUpTo: leveledUp ? 6 : undefined,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Level 6 Final Boss Handler
  const handleLevel6Answer = useCallback(
    (teamId: TeamId, correct: boolean, explanation: string) => {
      applyTeamUpdate(teamId, (prev) => {
        const answered = prev.level6Answered + 1;
        const correctCount = prev.level6Correct + (correct ? 1 : 0);
        const gained = correct ? 35 : 0;

        const won = answered >= 15 && correctCount >= 12;
        const failedRound = answered >= 15 && correctCount < 12;

        let nextOrder = prev.level6QuestionOrder;
        let nextAnswered = answered;
        let nextCorrect = correctCount;

        if (failedRound) {
          const otherOrder =
            teamId === 'red'
              ? blueTeamRef.current.level6QuestionOrder
              : redTeamRef.current.level6QuestionOrder;
          const preferred = LEVEL6_FINAL_QUESTIONS.map((q) => q.id).filter(
            (id) => !otherOrder.includes(id)
          );
          nextOrder = shuffleIds(
            preferred.length >= 15 ? preferred : LEVEL6_FINAL_QUESTIONS.map((q) => q.id)
          ).slice(0, 15);
          nextAnswered = 0;
          nextCorrect = 0;
        }

        return {
          nextTeam: {
            ...prev,
            totalScore: prev.totalScore + gained,
            streak: correct ? prev.streak + 1 : 0,
            correctTotal: prev.correctTotal + (correct ? 1 : 0),
            attemptsTotal: prev.attemptsTotal + 1,
            level6QuestionOrder: nextOrder,
            level6Answered: nextAnswered,
            level6Correct: nextCorrect,
          },
          event: {
            teamId,
            teamName: prev.name,
            level: 6,
            message: explanation,
            isSuccess: correct,
            wonGame: won,
          },
        };
      });
    },
    [applyTeamUpdate]
  );

  // Live simultaneous Blue Bot runner when mode === 'VS_BOT'
  useEffect(() => {
    if (gameState !== 'PLAYING' || mode !== 'VS_BOT' || showDashboard || showPinModal) {
      return;
    }

    const interval = window.setInterval(() => {
      const bot = blueTeamRef.current;
      const botCorrect = Math.random() < 0.76;

      if (bot.level === 1) {
        const compId =
          bot.level1Order[bot.level1Cursor % bot.level1Order.length] ?? 'cpu';
        handleLevel1Answer('blue', botCorrect, compId, 'Bot Biru menjawab Level 1');
      } else if (bot.level === 2) {
        handleLevel2Answer('blue', botCorrect, 'Bot Biru menjawab Level 2');
      } else if (bot.level === 3) {
        const nextSlot =
          bot.level3Sequence.find((s) => !bot.level3Installed.includes(s)) ?? 'cpu';
        const slotName = LEVEL3_SLOTS.find((s) => s.id === nextSlot)?.componentName ?? 'Komponen';
        handleLevel3Slot('blue', nextSlot, botCorrect, `Bot Biru memasang ${slotName}`);
      } else if (bot.level === 4) {
        if (bot.level4Step < 5) {
          const stepSpec = LEVEL4_STEPS[bot.level4Step];
          const validOpt =
            stepSpec.options.find((o) =>
              bot.level4Step === 0
                ? o.setsPlatform === bot.level4AssignedPlatform
                : o.isValidFor(bot.level4Build.moboPlatform)
            ) ?? stepSpec.options[0];
          handleLevel4Step('blue', botCorrect, {
            stepIndex: bot.level4Step,
            option: validOpt,
            feedbackMsg: `Bot Biru memasang ${validOpt.label}`,
          });
        } else {
          const nextCable =
            LEVEL4_CABLES.find((c) => !bot.level4Build.cablesConnected.includes(c.id)) ??
            LEVEL4_CABLES[0];
          handleLevel4Step('blue', botCorrect, {
            stepIndex: 5,
            cableId: nextCable.id,
            feedbackMsg: `Bot Biru menyambungkan ${nextCable.cableLabel}`,
          });
        }
      } else if (bot.level === 5) {
        const nextCaseId =
          bot.level5CaseOrder.find((id) => !bot.level5Solved.includes(id)) ??
          bot.level5CaseOrder[0];
        const activeCase = LEVEL5_CASES.find((c) => c.id === nextCaseId) ?? LEVEL5_CASES[0];
        handleLevel5Step('blue', activeCase.id, bot.level5CurrentPhase, botCorrect, activeCase.summary);
      } else if (bot.level === 6) {
        handleLevel6Answer('blue', botCorrect, 'Bot Biru menjawab ujian Master Teknisi');
      }
    }, 2600);

    return () => window.clearInterval(interval);
  }, [
    gameState,
    mode,
    showDashboard,
    showPinModal,
    handleLevel1Answer,
    handleLevel2Answer,
    handleLevel3Slot,
    handleLevel4Step,
    handleLevel5Step,
    handleLevel6Answer,
  ]);

  if (showDashboard) {
    return (
      <TeacherDashboard
        records={matchRecords}
        onDeleteRecord={(id) => setMatchRecords(deleteMatchRecord(id))}
        onClearAll={() => setMatchRecords(clearAllMatchRecords())}
        onBack={() => setShowDashboard(false)}
        onStartNewMatch={() => {
          setShowDashboard(false);
          setGameState('TITLE_MENU');
        }}
      />
    );
  }

  const renderTeamPanel = (
    team: TeamProgress,
    bannerLevel: LevelNumber | null,
    isBotControlled: boolean
  ) => {
    const isRed = team.id === 'red';

    return (
      <section
        aria-label={`Panel ${team.name}`}
        className={`relative rounded-2xl border p-4 lg:p-5 flex flex-col gap-3 bg-slate-900/85 shadow-xl ${
          isRed ? 'border-red-500/60' : 'border-blue-500/60'
        }`}
      >
        {/* Team Panel Identity Strip */}
        <div
          className={`rounded-xl px-3.5 py-2.5 border flex items-center justify-between gap-2 ${
            isRed
              ? 'bg-red-950/45 border-red-500/40'
              : 'bg-blue-950/45 border-blue-500/40'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {isRed ? (
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <Shield className="w-5 h-5 text-blue-400 shrink-0" />
            )}
            <span className="font-display text-base font-extrabold text-white truncate">
              {team.name}
            </span>
          </div>
          <span
            className={`font-mono text-xs font-bold tabular-nums shrink-0 ${
              isRed ? 'text-red-300' : 'text-blue-300'
            }`}
          >
            {isBotControlled ? 'Bot Otomatis · ' : ''}Level {team.level} / 6
          </span>
        </div>

        {/* Non-blocking inline Level-Up celebration banner */}
        {bannerLevel && (
          <div className="rounded-xl px-3.5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              {team.name} naik ke Level {bannerLevel}: {LEVEL_METADATA[bannerLevel].title}!
            </span>
          </div>
        )}

        {/* Active Level Playfield for this Team */}
        <div className={isBotControlled ? 'pointer-events-none opacity-85' : ''}>
          {team.level === 1 && (
            <Level1Identify
              team={team}
              disabled={isBotControlled}
              onAnswer={(correct, compId, explanation) =>
                handleLevel1Answer(team.id, correct, compId, explanation)
              }
            />
          )}

          {team.level === 2 && (
            <Level2Functions
              team={team}
              disabled={isBotControlled}
              onAnswer={(correct, explanation) =>
                handleLevel2Answer(team.id, correct, explanation)
              }
            />
          )}

          {team.level === 3 && (
            <Level3PuzzleBoard
              team={team}
              disabled={isBotControlled}
              onInstallSlot={(slotId, success, msg) =>
                handleLevel3Slot(team.id, slotId, success, msg)
              }
            />
          )}

          {team.level === 4 && (
            <Level4PcBuilder
              team={team}
              disabled={isBotControlled}
              onStepComplete={(success, payload) =>
                handleLevel4Step(team.id, success, payload)
              }
            />
          )}

          {team.level === 5 && (
            <Level5Detective
              team={team}
              disabled={isBotControlled}
              onSolveStep={(caseId, phase, correct, explanation) =>
                handleLevel5Step(team.id, caseId, phase, correct, explanation)
              }
            />
          )}

          {team.level === 6 && (
            <Level6FinalBoss
              team={team}
              disabled={isBotControlled}
              onAnswer={(correct, explanation) =>
                handleLevel6Answer(team.id, correct, explanation)
              }
            />
          )}
        </div>
      </section>
    );
  };

  const winnerTeam = winnerTeamId === 'red' ? redTeam : blueTeam;

  return (
    <>
      {gameState === 'TITLE_MENU' ? (
        <TitleScreen
          mode={mode}
          classLabel={classLabel}
          redName={redNameInput}
          blueName={blueNameInput}
          matchCount={matchRecords.length}
          onChangeMode={setMode}
          onChangeClassLabel={setClassLabel}
          onChangeRedName={setRedNameInput}
          onChangeBlueName={setBlueNameInput}
          onStart={startNewGame}
          onOpenDashboard={() => setShowPinModal(true)}
        />
      ) : (
        <div className="min-h-screen w-full workbench-grid text-slate-100 flex flex-col">
          {/* Unobtrusive Top HUD */}
          <GameHUD
            redTeam={redTeam}
            blueTeam={blueTeam}
            mode={mode}
            classLabel={classLabel}
            muted={muted}
            onToggleMute={toggleMute}
            onPause={() => setGameState('PAUSED')}
          />

          {/* Simultaneous Split-Screen Arena (Left = Regu 1 Merah | Right = Regu 2 Biru) */}
          <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 lg:px-5 py-3.5 lg:py-4 flex flex-col gap-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start flex-1">
              {renderTeamPanel(redTeam, redLevelBanner, false)}
              {renderTeamPanel(blueTeam, blueLevelBanner, mode === 'VS_BOT')}
            </div>
          </main>

          {/* Game Modals */}
          {gameState === 'PAUSED' && !showPinModal && (
            <PauseModal
              onResume={() => setGameState('PLAYING')}
              onSaveAndEndMatch={handleSaveAndEndMatch}
              onOpenDashboard={() => setShowPinModal(true)}
              onRestart={startNewGame}
              onExitToTitle={handleExitToTitle}
            />
          )}

          {gameState === 'GAME_OVER' && winnerTeamId && !showPinModal && (
            <VictoryModal
              winner={winnerTeam}
              redTeam={redTeam}
              blueTeam={blueTeam}
              classLabel={classLabel || 'Kelas Umum'}
              onPlayAgain={startNewGame}
              onOpenDashboard={() => setShowPinModal(true)}
              onExitToTitle={handleExitToTitle}
            />
          )}
        </div>
      )}

      {/* PIN 2026 Gate Modal for Teacher Dashboard */}
      {showPinModal && (
        <PinLockModal
          onSuccess={() => {
            setShowPinModal(false);
            setShowDashboard(true);
          }}
          onClose={() => setShowPinModal(false)}
        />
      )}
    </>
  );
}
