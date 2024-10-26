'use client';

import { useImmer } from 'use-immer';
import { getOpponentOf, Player } from '@/code/player/PlayerLogic.ts';
import { GameStatuses, GameStatusOrWinner } from '@/code/game/GameLogic.ts';
import GameView from '@/code/game/GameView.tsx';
import MatchScore from './MatchScore.tsx';
import { getNewMatchScore } from './MatchLogic.ts';

type Props = {
  playerOne: Player;
  playerTwo: Player;
};

export default function Match({ playerOne, playerTwo }: Props) {
  const [score, updateScore] = useImmer(getNewMatchScore());
  const [currentStartingPlayer, updateStartingPlayer] = useImmer(playerOne);
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

    updateStartingPlayer(
      getOpponentOf(currentStartingPlayer, [playerOne, playerTwo])
    );
  };

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
        <MatchScore playerOne={playerOne} playerTwo={playerTwo} score={score} />
      </div>
    </div>
  );
}