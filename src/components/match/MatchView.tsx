'use client';

import { useImmer } from 'use-immer';
import {
  GameStatuses,
  GameStatusOrWinner,
} from '@/components/game/GameState.ts';
import GameView from '@/components/game/GameView.tsx';
import { getNewScoreState } from '@/components/score/ScoreState.ts';
import ScoreView from '@/components/score/ScoreView.tsx';
import { getOpponentOf, Player } from '@/components/players/Players.ts';
import PlayerSetup from '@/components/players/PlayersView.tsx';
import { getNewMatchState, MatchStatus } from './MatchState.ts';
import { usePlayers } from '../players/PlayersContext.tsx';

export default function MatchView() {
  const { players, updatePlayers } = usePlayers();
  const [match, updateMatch] = useImmer(getNewMatchState(players.one));
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

  if (match.status === MatchStatus.SETUP) {
    return <PlayerSetup onPlayerSetupSubmit={handlePlayerSetupSubmit} />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <GameView
          firstPlayer={currentStartingPlayer}
          secondPlayer={currentSecondPlayer}
          onGameOver={handleGameOver}
        />
      </div>
      <div className="flex flex-col justify-center h-full">
        <ScoreView
          playerOne={players.one}
          playerTwo={players.two}
          score={score}
        />
      </div>
    </div>
  );
}
