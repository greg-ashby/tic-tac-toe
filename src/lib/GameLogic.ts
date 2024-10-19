export type Player = 'X' | 'O';
export type Square = Player | null;
export type Board = Square[];
export type Outcome = {
  winner: Square;
  isTie: boolean;
  isOver: boolean;
};

export function getEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function getWinner(board: Board): Square {
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

export function isBoardFull(board: Board): boolean {
  return board.every((square) => square !== null);
}

export function calculateOutcome(board: Board): Outcome {
  const winner = getWinner(board);
  const isTie = !winner && isBoardFull(board);
  const isOver = !!winner || isTie;
  return { winner, isTie, isOver };
}

export function makeMove(
  board: Board,
  squareNumber: number,
  currentPlayer: Player
): Board {
  if (board[squareNumber] !== null) {
    throw new Error('Square already taken');
  }
  const newBoard = [...board];
  newBoard[squareNumber] = currentPlayer;
  return newBoard;
}
