import { getOpponentOf, Player } from '@/components/player/PlayerUtils.ts';
import { useImmerReducer } from 'use-immer';
import { usePlayers } from '@/components/player/PlayerContext.tsx';
import { gameReducer, GameActionNames } from './GameReducer.ts';
import GameBoard from './components/GameBoard.tsx';
import GameStatus from './components/GameStatus.tsx';
import { GameOutcome, getNewGame } from './GameUtils.ts';

type Props = {
  firstPlayer: Player;
  onGameOver: (outcome: GameOutcome) => void;
};

export default function GameView({ firstPlayer, onGameOver }: Props) {
  const { players } = usePlayers();
  const secondPlayer = getOpponentOf(firstPlayer, players);
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
      payload: {
        squareNumber,
        onGameOver,
      },
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
