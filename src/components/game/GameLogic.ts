import { NullablePlayer, Player } from '@/components/players/Players.ts';

type Board = NullablePlayer[];
export enum GameStatuses {
  IN_PROGRESS = 'In-Progress',
  TIE = 'Tie',
}
export type GameStatusOrWinner = GameStatuses | Player;

export type Game = {
  board: NullablePlayer[];
  currentPlayer: Player;
  nextPlayer: Player;
  statusOrWinner: GameStatuses | Player;
};

export function getNewGame(startingPlayer: Player, opponent: Player): Game {
  return {
    board: Array(9).fill(null),
    currentPlayer: startingPlayer,
    nextPlayer: opponent,
    statusOrWinner: GameStatuses.IN_PROGRESS,
  };
}

function getWinner(board: Board): NullablePlayer {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function isBoardFull(board: Board): boolean {
  return board.every((square) => square !== null);
}

function calculateOutcome({ board }: Game): GameStatusOrWinner {
  const winner = getWinner(board);
  if (winner) {
    return winner;
  }
  if (isBoardFull(board)) {
    return GameStatuses.TIE;
  }
  return GameStatuses.IN_PROGRESS;
}

export function makeMove(draft: Game, squareNumber: number) {
  if (draft.board[squareNumber] !== null) {
    throw new Error('Square already taken');
  }
  draft.board[squareNumber] = draft.currentPlayer;

  [draft.currentPlayer, draft.nextPlayer] = [
    draft.nextPlayer,
    draft.currentPlayer,
  ];

  draft.statusOrWinner = calculateOutcome(draft);
}
