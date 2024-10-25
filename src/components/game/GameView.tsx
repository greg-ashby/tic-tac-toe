import { Player } from '@/lib/PlayerLogic.ts';
import { useImmer } from 'use-immer';
import {
  GameStatuses,
  getNewGame,
  makeMove,
  Outcome,
} from '@/lib/GameLogic.ts';
import GameBoard from './GameBoard.tsx';
import GameStatus from './GameStatus.tsx';

type Props = {
  firstPlayer: Player;
  secondPlayer: Player;
  // eslint-disable-next-line no-unused-vars
  onGameOver: (outcome: Outcome) => void;
};
export default function GameView({
  firstPlayer,
  secondPlayer,
  onGameOver,
}: Props) {
  const [game, updateGame] = useImmer(getNewGame(firstPlayer, secondPlayer));

  const handleNewGameClick = () => {
    updateGame(getNewGame(firstPlayer, secondPlayer));
  };

  const handleSquareClick = (squareNumber: number) => {
    updateGame((draft) => {
      makeMove(draft, squareNumber);
      if (draft.status !== GameStatuses.IN_PROGRESS) {
        onGameOver(draft.status);
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mt-4 mb-4">Tic-Tac-Toe</h1>
      <GameBoard game={game} onSquareClick={handleSquareClick} />
      <GameStatus game={game} onNewGameClick={handleNewGameClick} />
    </>
  );
}
