'use client';

import { useState } from 'react';
import {
  calculateOutcome,
  getEmptyBoard,
  makeMove,
  Player,
} from '@/lib/GameLogic.ts';
import { calculateNewMatchScore, getNewMatchScore } from '@/lib/MatchLogic.ts';
import GameBoard from './GameBoard.tsx';
import GameState from './GameState.tsx';
import MatchScore from './MatchScore.tsx';
import MatchTitle from './MatchTitle.tsx';

function switchPlayer(currentPlayer: Player) {
  return currentPlayer === 'X' ? 'O' : 'X';
}

export default function Match() {
  const [board, setBoard] = useState(getEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [score, setScore] = useState(getNewMatchScore());

  const handleSquareClick = (squareNumber: number) => {
    const newBoard = makeMove(board, squareNumber, currentPlayer);
    setBoard(newBoard);
    const { winner, isTie, isOver } = calculateOutcome(newBoard);
    if (isOver) {
      const newMatchScore = calculateNewMatchScore(
        score,
        winner,
        isTie,
        isOver
      );
      setScore(newMatchScore);
    } else {
      const newCurrentPlayer = switchPlayer(currentPlayer);
      setCurrentPlayer(newCurrentPlayer);
    }
  };

  const handleNewGameClick = () => {
    setBoard(getEmptyBoard());
    setCurrentPlayer('X');
  };

  return (
    <>
      <MatchTitle />
      <GameState
        board={board}
        currentPlayer={currentPlayer}
        onNewGameClick={handleNewGameClick}
      />
      <GameBoard board={board} onSquareClick={handleSquareClick} />
      <MatchScore score={score} />
    </>
  );
}
