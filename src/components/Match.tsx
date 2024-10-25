'use client';

import { useState } from 'react';
import {
  calculateOutcome,
  getEmptyBoard,
  makeMove,
  Player,
} from '@/lib/GameLogic.ts';
import {
  calculateMatchScore,
  getNewMatchScore,
  switchPlayer,
} from '@/lib/MatchLogic.ts';
import GameBoard from './GameBoard.tsx';
import GameState from './GameState.tsx';
import MatchScore from './MatchScore.tsx';

type Props = {
  playerOne: Player;
  playerTwo: Player;
};

export default function Match({ playerOne, playerTwo }: Props) {
  const [board, setBoard] = useState(getEmptyBoard());
  const [startingPlayer, setStartingPlayer] = useState<Player>(playerOne);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(startingPlayer);
  const [score, setScore] = useState(getNewMatchScore());

  const handleSquareClick = (squareNumber: number) => {
    const newBoard = makeMove(board, squareNumber, currentPlayer);
    setBoard(newBoard);
    const { winner, isTie, isOver } = calculateOutcome(newBoard);
    if (isOver) {
      const winningPlayerNumber = isTie || winner === playerOne ? 1 : 2;
      const newMatchScore = calculateMatchScore(
        score,
        winningPlayerNumber,
        isTie,
        isOver
      );
      setScore(newMatchScore);
    } else {
      const newCurrentPlayer = switchPlayer(
        currentPlayer,
        playerOne,
        playerTwo
      );
      setCurrentPlayer(newCurrentPlayer);
    }
  };

  const handleNewGameClick = () => {
    setBoard(getEmptyBoard());
    const newStartingPlayer = switchPlayer(
      startingPlayer,
      playerOne,
      playerTwo
    );
    setStartingPlayer(newStartingPlayer);
    setCurrentPlayer(newStartingPlayer);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-4 mb-4">Tic-Tac-Toe</h1>
        <GameBoard board={board} onSquareClick={handleSquareClick} />
        <GameState
          board={board}
          currentPlayer={currentPlayer}
          onNewGameClick={handleNewGameClick}
        />
      </div>
      <div className="flex flex-col justify-center h-full">
        <MatchScore playerOne={playerOne} playerTwo={playerTwo} score={score} />
      </div>
    </div>
  );
}
