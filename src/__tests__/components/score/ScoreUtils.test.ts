import { TIE_GAME } from '@/components/game/GameUtils.ts';
import {
  calculateNewScoreState,
  getNewScoreState,
} from '@/components/score/ScoreUtils.ts';

describe('ScoreUtils', () => {
  const players = {
    one: 'X',
    two: 'O',
  };
  describe('getNewScoreState', () => {
    it('should set all values to 0', () => {
      const score = getNewScoreState();
      expect(score.playerOneWins).toBe(0);
      expect(score.playerTwoWins).toBe(0);
      expect(score.ties).toBe(0);
    });
  });
  describe('calculateNewScoreState', () => {
    it('should increment playerOneWins', () => {
      const score = getNewScoreState();
      const newScore = calculateNewScoreState(score, players, players.one);
      expect(newScore.playerOneWins).toBe(1);
      expect(newScore.playerTwoWins).toBe(0);
      expect(newScore.ties).toBe(0);
    });
    it('should increment playerTwoWins', () => {
      const score = getNewScoreState();
      const newScore = calculateNewScoreState(score, players, players.two);
      expect(newScore.playerOneWins).toBe(0);
      expect(newScore.playerTwoWins).toBe(1);
      expect(newScore.ties).toBe(0);
    });
    it('should increment ties', () => {
      const score = getNewScoreState();
      const newScore = calculateNewScoreState(score, players, TIE_GAME);
      expect(newScore.playerOneWins).toBe(0);
      expect(newScore.playerTwoWins).toBe(0);
      expect(newScore.ties).toBe(1);
    });
    it('should throw error for unknown outcome', () => {
      const score = getNewScoreState();
      expect(() => calculateNewScoreState(score, players, 'unknown')).toThrow();
    });
  });
});
