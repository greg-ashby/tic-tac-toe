import { getOpponentOf } from '@/components/player/PlayerUtils.ts';

describe('PlayerUtils', () => {
  describe('getOpponentOf', () => {
    it('should return the other player', () => {
      const players = {
        one: 'X',
        two: 'O',
      };
      expect(getOpponentOf(players.one, players)).toBe(players.two);
      expect(getOpponentOf(players.two, players)).toBe(players.one);
    });
  });
});
