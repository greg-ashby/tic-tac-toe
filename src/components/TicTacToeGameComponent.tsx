'use client';

import { useState } from 'react';
import { Player } from '@/lib/Types.ts';
import TicTacToeGame from '@/lib/TicTacToeGame.ts';
import TicTacToeSquareComponent from './TicTacToeSquareComponent.tsx';

export default function TicTacToeGameComponent() {
  const playerX: Player = { name: 'X', avatar: 'X' };
  const playerO: Player = { name: 'O', avatar: 'O' };
  const [game] = useState(new TicTacToeGame(playerX, playerO));
  const [winner, setWinner] = useState(game.winner);
  const [draw, setDraw] = useState(game.isDraw);

  const handleSquareClick = (row: number, column: number) => {
    game.makeMove(row, column);

    if (game.isOver) {
      setWinner(game.winner);
      setDraw(game.isDraw);
    }
    return game.getSquare(row, column);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Tic-Tac-Toe</h1>
      {winner && <p className="text-2xl font-bold">{winner.avatar} wins!</p>}
      {draw && (
        <p className="text-2xl font-bold">
          Tie Game {String.fromCodePoint(0x1f641)}
        </p>
      )}
      <div className="space-y-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex space-x-2">
            {[0, 1, 2].map((column) => (
              <TicTacToeSquareComponent
                key={`${row}-${column}`}
                square={game.getSquare(row, column)}
                isGameOver={game.isOver}
                onSquareClick={() => handleSquareClick(row, column)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
