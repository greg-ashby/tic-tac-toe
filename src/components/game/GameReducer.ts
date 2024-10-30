import { Player } from '@/components/player/PlayerUtils.ts';
import {
  calculateOutcome,
  Game,
  GameOutcome,
  getNewGame,
} from './GameUtils.ts';

export enum GameActionNames {
  SQUARE_CLICKED = 'squareClicked',
  START_NEW_GAME = 'startNewGame',
}
type GameActions =
  | {
      type: GameActionNames.SQUARE_CLICKED;
      payload: {
        squareNumber: number;
        onGameOver: (outcome: GameOutcome) => void;
      };
    }
  | {
      type: GameActionNames.START_NEW_GAME;
      payload: {
        firstPlayer: Player;
        secondPlayer: Player;
      };
    };

export function gameReducer(draft: Game, action: GameActions) {
  switch (action.type) {
    case GameActionNames.SQUARE_CLICKED: {
      const { squareNumber, onGameOver } = action.payload;

      if (draft.board[squareNumber] !== null) {
        throw new Error('Square already taken');
      }
      draft.board[squareNumber] = draft.currentPlayer;

      [draft.currentPlayer, draft.nextPlayer] = [
        draft.nextPlayer,
        draft.currentPlayer,
      ];

      draft.outcome = calculateOutcome(draft);
      if (draft.outcome) {
        onGameOver(draft.outcome);
      }
      break;
    }
    case GameActionNames.START_NEW_GAME: {
      const { firstPlayer, secondPlayer } = action.payload;

      const newGame = getNewGame(firstPlayer, secondPlayer);
      Object.assign(draft, newGame);
      break;
    }
    default: {
      throw Error(`Unknown action`);
    }
  }
}
