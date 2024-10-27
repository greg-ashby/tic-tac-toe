import { Player } from '@/components/players/Players.ts';
import { useImmerReducer } from 'use-immer';
import {
  getNewGame,
  GameStatusOrWinner,
  gameReducer,
  GameActionNames,
} from '@/components/game/GameState.ts';
import GameBoard from './components/GameBoard.tsx';
import GameStatus from './components/GameStatus.tsx';

type Props = {
  firstPlayer: Player;
  secondPlayer: Player;
  onGameOver: (outcome: GameStatusOrWinner) => void;
};

export default function GameView({
  firstPlayer,
  secondPlayer,
  onGameOver,
}: Props) {
  const [game, dispatch] = useImmerReducer(
    gameReducer,
    getNewGame(firstPlayer, secondPlayer)
  );

  const handleNewGameClick = () => {
    dispatch({
      type: GameActionNames.START_NEW_GAME,
      firstPlayer,
      secondPlayer,
    });
  };

  const handleSquareClick = (squareNumber: number) => {
    dispatch({
      type: GameActionNames.SQUARE_CLICKED,
      squareNumber,
      onGameOver,
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
