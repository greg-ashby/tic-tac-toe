import { Player } from './GameLogic.ts';

export type Score = {
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
};

export function switchPlayer(
  currentPlayer: Player,
  playerOne: Player,
  playerTwo: Player
): Player {
  return currentPlayer === playerOne ? playerTwo : playerOne;
}
export function getNewMatchScore(): Score {
  return { playerOneWins: 0, playerTwoWins: 0, ties: 0 };
}

export function calculateMatchScore(
  currentScore: Score,
  winner: number | null,
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
  return winner === 1
    ? { ...currentScore, playerOneWins: currentScore.playerOneWins + 1 }
    : { ...currentScore, playerTwoWins: currentScore.playerTwoWins + 1 };
}
