'use client';

import { useImmer } from 'use-immer';
import GameView from '@/components/game/GameView.tsx';
import ScoreView from '@/components/score/ScoreView.tsx';
import MatchSetupView from '@/components/match/MatchSetupView.tsx';
import {
  GameStatuses,
  GameStatusOrWinner,
} from '@/components/game/GameUtils.ts';
import { getNewScoreState } from '@/components/score/ScoreUtils.ts';
import { getOpponentOf, Player } from '@/components/player/PlayerUtils.ts';
import { usePlayers } from '@/components/player/PlayerContext.tsx';
import { createMatchState, MatchStatus } from './MatchUtils.ts';

export function MatchView() {
  const { players, updatePlayers } = usePlayers();
  const [match, updateMatch] = useImmer(createMatchState(players.one));
  const [score, updateScore] = useImmer(getNewScoreState());

  const { currentStartingPlayer } = match;
  const currentSecondPlayer = getOpponentOf(currentStartingPlayer, players);

  const handleGameOver = (statusOrWinner: GameStatusOrWinner) => {
    if (statusOrWinner === GameStatuses.TIE) {
      updateScore((draft) => {
        draft.ties = 1;
      });
    } else {
      updateScore((draft) => {
        if (statusOrWinner === players.one) {
          draft.playerOneWins = 1;
        } else {
          draft.playerTwoWins = 1;
        }
      });
    }
    updateMatch((draft) => {
      draft.currentStartingPlayer = currentSecondPlayer;
    });
  };

  const handlePlayerSetupSubmit = (
    playerOneValue: Player,
    playerTwoValue: Player
  ) => {
    updatePlayers({ one: playerOneValue, two: playerTwoValue });
    updateMatch((draft) => {
      draft.status = MatchStatus.PLAYING;
      draft.currentStartingPlayer = playerOneValue;
    });
  };

  return match.status === MatchStatus.SETUP ? (
    <MatchSetupView onMatchSetupSubmit={handlePlayerSetupSubmit} />
  ) : (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <GameView
          firstPlayer={currentStartingPlayer}
          secondPlayer={currentSecondPlayer}
          onGameOver={handleGameOver}
        />
      </div>
      <div className="flex flex-col justify-center h-full">
        <ScoreView score={score} />
      </div>
    </div>
  );
}
