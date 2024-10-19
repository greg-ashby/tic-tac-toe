import { Square } from './GameLogic.ts';

export type Score = {
  xWins: number;
  oWins: number;
  ties: number;
};

export function getNewMatchScore(): Score {
  return { xWins: 0, oWins: 0, ties: 0 };
}

export function calculateNewMatchScore(
  currentScore: Score,
  winner: Square,
  isTie: boolean,
  isOver: boolean
): Score {
  if (!isOver) {
    throw new Error('Game is not over');
  }
  if (isTie) {
    return { ...currentScore, ties: currentScore.ties + 1 };
  }
  if (winner === null) {
    throw new Error('No winner declared');
  }
  return winner === 'X'
    ? { ...currentScore, xWins: currentScore.xWins + 1 }
    : { ...currentScore, oWins: currentScore.oWins + 1 };
}
