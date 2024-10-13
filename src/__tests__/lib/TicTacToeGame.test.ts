import TicTacToeGame from '@/lib/TicTacToeGame.ts';
import { Player } from '@/lib/Types.ts';

const playerX: Player = { name: 'X', avatar: 'X' };
const playerO: Player = { name: 'O', avatar: 'O' };
let game: TicTacToeGame;

describe('TicTacToeGame', () => {
  beforeEach(() => {
    game = new TicTacToeGame(playerX, playerO);
  });

  it('should set current turn to first player', () => {
    expect(game.currentTurn).toBe(playerX);
  });

  it('should change turn to next player', () => {
    game.makeMove(0, 0);
    expect(game.currentTurn).toBe(playerO);
    game.makeMove(0, 1);
    expect(game.currentTurn).toBe(playerX);
  });

  it('should throw error if square is already taken', () => {
    game.makeMove(0, 0);
    expect(() => game.makeMove(0, 0)).toThrow();
  });

  it('should set first player as first parameter', () => {
    game = new TicTacToeGame(playerO, playerX);
    expect(game.currentTurn).toBe(playerO);
  });

  it('should detect winner by row', () => {
    expect(game.winner).toBe(null);
    const row = 0;
    game.makeMove(row, 0);
    game.makeMove(row + 1, 0);
    game.makeMove(row, 1);
    game.makeMove(row + 2, 1);
    game.makeMove(row, 2);
    expect(game.winner).toBe(playerX);
  });

  it('should detect winner by column', () => {
    expect(game.winner).toBe(null);
    const column = 1;
    game.makeMove(0, column);
    game.makeMove(0, column + 1);
    game.makeMove(1, column);
    game.makeMove(1, column + 1);
    game.makeMove(2, column);
    expect(game.winner).toBe(playerX);
  });

  it('should detect winner by left-down diagonal', () => {
    expect(game.winner).toBe(null);
    game.makeMove(0, 1);
    game.makeMove(0, 0);
    game.makeMove(0, 2);
    game.makeMove(1, 1);
    game.makeMove(1, 0);
    game.makeMove(2, 2);
    expect(game.winner).toBe(playerO);
  });

  it('should detect winner by left-up diagonal', () => {
    expect(game.winner).toBe(null);
    game.makeMove(2, 1);
    game.makeMove(2, 0);
    game.makeMove(1, 2);
    game.makeMove(1, 1);
    game.makeMove(1, 0);
    game.makeMove(0, 2);
    expect(game.winner).toBe(playerO);
  });

  it('should not allow out of bounds moves', () => {
    expect(() => game.makeMove(3, 3)).toThrow();
    expect(() => game.makeMove(-1, -1)).toThrow();
  });

  it('should detect a draw after 9 turns without winner', () => {
    expect(game.isDraw()).toBe(false);
    game.makeMove(0, 0);
    game.makeMove(1, 1);
    game.makeMove(0, 1);
    game.makeMove(0, 2);
    game.makeMove(2, 0);
    game.makeMove(1, 0);
    game.makeMove(1, 2);
    game.makeMove(2, 1);
    expect(game.isDraw()).toBe(false);
    game.makeMove(2, 2);
    expect(game.isDraw()).toBe(true);
  });
});
