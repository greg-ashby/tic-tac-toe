/* eslint-disable react/no-array-index-key */
// in this case, we can use the index as the key because the board is always a 3x3 array and the squares never change
import { Game, GameStatuses } from '../GameUtils.ts';
import GameSquare from './GameSquare.tsx';

type Props = {
  game: Game;
  onSquareClick: (squareNumber: number) => void;
};
export default function GameBoard({ game, onSquareClick }: Props) {
  return (
    <div className="grid grid-cols-3 w-72">
      {game.board.map((square, index) => (
        <GameSquare
          key={index}
          value={square}
          disabled={game.statusOrWinner !== GameStatuses.IN_PROGRESS}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
