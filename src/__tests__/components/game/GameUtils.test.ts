import {
  calculateOutcome,
  getNewGame,
  TIE_GAME,
} from '@/components/game/GameUtils.ts';

describe('GameUtils', () => {
  describe('getNewGame', () => {
    it('should return a new game', () => {
      const game = getNewGame('X', 'O');
      expect(game).toEqual({
        board: Array(9).fill(null),
        currentPlayer: 'X',
        nextPlayer: 'O',
        outcome: undefined,
      });
    });
  });
  describe('calculateOutcome', () => {
    it('should return undefined if there is no winner and game is not over', () => {
      const game = getNewGame('X', 'O');
      expect(calculateOutcome(game)).toBeUndefined();
    });
    it('should return the winner for a row', () => {
      const game = getNewGame('X', 'O');
      game.board[0] = 'X';
      game.board[1] = 'X';
      game.board[2] = 'X';
      expect(calculateOutcome(game)).toBe('X');
    });
    it('should return the winner for a column', () => {
      const game = getNewGame('X', 'O');
      game.board[0] = 'X';
      game.board[3] = 'X';
      game.board[6] = 'X';
      expect(calculateOutcome(game)).toBe('X');
    });
    it('should return the winner for a diagonal', () => {
      const game = getNewGame('X', 'O');
      game.board[0] = 'X';
      game.board[4] = 'X';
      game.board[8] = 'X';
      expect(calculateOutcome(game)).toBe('X');
    });
    it('should return tie game', () => {
      const game = getNewGame('X', 'O');
      game.board[0] = 'X';
      game.board[4] = 'O';
      game.board[3] = 'X';
      game.board[6] = 'O';
      game.board[2] = 'X';
      game.board[1] = 'O';
      game.board[7] = 'X';
      game.board[5] = 'O';
      game.board[8] = 'X';
      expect(calculateOutcome(game)).toBe(TIE_GAME);
    });
  });
});
