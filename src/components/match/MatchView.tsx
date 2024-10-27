'use client';

import { useImmer } from 'use-immer';
import {
  GameStatuses,
  GameStatusOrWinner,
} from '@/components/game/GameLogic.ts';
import GameView from '@/components/game/GameView.tsx';
import { getNewScoreState } from '@/components/score/ScoreState.ts';
import ScoreView from '@/components/score/ScoreView.tsx';
import { getOpponentOf, Player } from '@/components/players/Players.ts';
import PlayerSetup from '@/components/players/PlayersView.tsx';
import { useState } from 'react';
import { getNewMatchState, MatchStatus } from './MatchState.ts';

export default function MatchView() {
  const [playerOne, setPlayerOne] = useState('X');
  const [playerTwo, setPlayerTwo] = useState('O');
  const [match, updateMatch] = useImmer(getNewMatchState(playerOne));
  const [score, updateScore] = useImmer(getNewScoreState());

  const { currentStartingPlayer } = match;
  const currentSecondPlayer = getOpponentOf(currentStartingPlayer, [
    playerOne,
    playerTwo,
  ]);

  const handleGameOver = (statusOrWinner: GameStatusOrWinner) => {
    if (statusOrWinner === GameStatuses.TIE) {
      updateScore((draft) => {
        draft.ties = 1;
      });
    } else {
      updateScore((draft) => {
        if (statusOrWinner === playerOne) {
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
    setPlayerOne(playerOneValue);
    setPlayerTwo(playerTwoValue);
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
        <ScoreView playerOne={playerOne} playerTwo={playerTwo} score={score} />
      </div>
    </div>
  );
}
