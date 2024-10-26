import { Player } from '@/code/player/PlayerLogic.ts';
import { useImmerReducer } from 'use-immer';
import {
  Game,
  GameStatuses,
  getNewGame,
  makeMove,
  GameStatusOrWinner,
} from '@/code/game/GameLogic.ts';
import GameBoard from './GameBoard.tsx';
import GameStatus from './GameStatus.tsx';

type Props = {
  firstPlayer: Player;
  secondPlayer: Player;
  // eslint-disable-next-line no-unused-vars
  onGameOver: (outcome: GameStatusOrWinner) => void;
};

/* eslint-disable no-unused-vars */
enum GameActionNames {
  SQUARE_CLICKED = 'squareClicked',
  START_NEW_GAME = 'startNewGame',
}

type GameActions =
  | {
      type: GameActionNames.SQUARE_CLICKED;
      squareNumber: number;
      // eslint-disable-next-line no-unused-vars
      onGameOver: (outcome: GameStatusOrWinner) => void;
    }
  | {
      type: 'startNewGame';
      firstPlayer: Player;
      secondPlayer: Player;
    };

function gameReducer(draft: Game, action: GameActions) {
  switch (action.type) {
    case GameActionNames.SQUARE_CLICKED: {
      makeMove(draft, action.squareNumber);
      if (draft.statusOrWinner !== GameStatuses.IN_PROGRESS) {
        action.onGameOver(draft.statusOrWinner);
      }
      break;
    }
    case GameActionNames.START_NEW_GAME: {
      const newGame = getNewGame(action.firstPlayer, action.secondPlayer);
      Object.assign(draft, newGame);
      break;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
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
