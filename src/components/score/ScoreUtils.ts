import { GameOutcome, TIE_GAME } from '@/components/game/GameUtils.ts';
import { Players } from '@/components/player/PlayerUtils.ts';

export type ScoreState = {
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
};

export function getNewScoreState(): ScoreState {
  return { playerOneWins: 0, playerTwoWins: 0, ties: 0 };
}

export function calculateNewScore(
  score: ScoreState,
  players: Players,
  outcome: GameOutcome
): ScoreState {
  const newScore = { ...score };
  if (outcome === players.one) {
    newScore.playerOneWins += 1;
  } else if (outcome === players.two) {
    newScore.playerTwoWins += 1;
  } else if (outcome === TIE_GAME) {
    newScore.ties += 1;
  } else {
    throw new Error(`Unknown outcome: ${outcome}`);
  }
  return newScore;
}
