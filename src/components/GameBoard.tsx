/* eslint-disable react/no-array-index-key */
import GameSquare from './GameSquare.tsx';

type Props = {
  board: (string | null)[];
  // eslint-disable-next-line no-unused-vars
  onSquareClick: (squareNumber: number) => void;
};
export default function GameBoard({ board, onSquareClick }: Props) {
  return (
    <div className="grid grid-cols-3 w-72">
      {board.map((square, index) => (
        <GameSquare
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
