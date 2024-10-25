'use client';

import { getNewGame, makeMove, Outcome } from '@/lib/GameLogic.ts';
import { useImmer } from 'use-immer';
import { getNewMatchScore } from '@/lib/MatchLogic.ts';
import { getOpponent, Player } from '@/lib/PlayerLogic.ts';
import GameBoard from './GameBoard.tsx';
import MatchScore from './MatchScore.tsx';
import GameStatus from './GameStatus.tsx';

type Props = {
  playerOne: Player;
  playerTwo: Player;
};

export default function Match({ playerOne, playerTwo }: Props) {
  const [game, updateGame] = useImmer(getNewGame(playerOne, playerTwo));
  const [score, updateScore] = useImmer(getNewMatchScore());
  const [startingPlayer, updateStartingPlayer] = useImmer(playerOne);

  const handleGameOver = (outcome: Outcome) => {
    if (outcome.isTie) {
      updateScore((draft) => {
        draft.ties = 1;
      });
    } else {
      updateScore((draft) => {
        if (outcome.winner === playerOne) {
          draft.playerOneWins = 1;
        } else {
          draft.playerTwoWins = 1;
        }
      });
    }
  };

  const handleSquareClick = (squareNumber: number) => {
    updateGame((draft) => {
      makeMove(draft, squareNumber);
      if (draft.outcome.isOver) {
        handleGameOver(draft.outcome);
      }
    });
  };

  const handleNewGameClick = () => {
    const firstPlayer = getOpponent(startingPlayer, playerOne, playerTwo);
    const secondPlayer = getOpponent(firstPlayer, playerOne, playerTwo);
    updateStartingPlayer(firstPlayer);
    updateGame(getNewGame(firstPlayer, secondPlayer));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-4 mb-4">Tic-Tac-Toe</h1>
        <GameBoard game={game} onSquareClick={handleSquareClick} />
        <GameStatus game={game} onNewGameClick={handleNewGameClick} />
      </div>
      <div className="flex flex-col justify-center h-full">
        <MatchScore playerOne={playerOne} playerTwo={playerTwo} score={score} />
      </div>
    </div>
  );
}
