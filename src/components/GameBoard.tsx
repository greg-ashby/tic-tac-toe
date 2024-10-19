/* eslint-disable react/no-array-index-key */
import { Board, calculateOutcome } from '@/lib/GameLogic.ts';
import GameSquare from './GameSquare.tsx';

type Props = {
  board: Board;
  // eslint-disable-next-line no-unused-vars
  onSquareClick: (squareNumber: number) => void;
};
export default function GameBoard({ board, onSquareClick }: Props) {
  const { isOver } = calculateOutcome(board);
  return (
    <div className="grid grid-cols-3 w-72">
      {board.map((square, index) => (
        <GameSquare
          key={index}
          value={square}
          disabled={isOver}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
