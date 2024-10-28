import { Player } from '@/components/player/PlayerUtils.ts';

import { ScoreState } from '../score/ScoreUtils.ts';
import { GameStatusOrWinner } from '../game/GameUtils.ts';

export enum MatchStatus {
  SETUP = 'setup',
  PLAYING = 'playing',
}

export type MatchState = {
  currentStartingPlayer: Player;
  status: MatchStatus;
};

export enum MatchActionNames {
  START_NEW_MATCH = 'startNewMatch',
  GAME_OVER = 'gameOver',
}

type MatchActions =
  | {
      type: MatchActionNames.START_NEW_MATCH;
      payload: {
        playerOneValue: Player;
        playerTwoValue: Player;
        updatePlayers: (newPlayers: { one: Player; two: Player }) => void;
      };
    }
  | {
      type: MatchActionNames.GAME_OVER;
      payload: {
        updateScore: (update: (draft: ScoreState) => void) => void;
        statusOrWinner: GameStatusOrWinner;
      };
    };

export function matchReducer(draft: MatchState, action: MatchActions) {
  switch (action.type) {
    case MatchActionNames.START_NEW_MATCH: {
      const { playerOneValue, playerTwoValue, updatePlayers } = action.payload;
      updatePlayers({ one: playerOneValue, two: playerTwoValue });
      draft.currentStartingPlayer = playerOneValue;
      draft.status = MatchStatus.PLAYING;
      break;
    }
    default: {
      throw Error(`Unknown action`);
    }
  }
}

export function createMatchState(firstPlayer: Player): MatchState {
  return {
    currentStartingPlayer: firstPlayer,
    status: MatchStatus.SETUP,
  };
}
