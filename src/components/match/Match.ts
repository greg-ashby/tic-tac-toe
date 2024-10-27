import { Player } from '@/components/players/Players.ts';

export enum MatchStatus {
  SETUP = 'setup',
  PLAYING = 'playing',
}

export type Match = {
  currentStartingPlayer: Player;
  status: MatchStatus;
};

export function getNewMatch(startingPlayer: Player): Match {
  return {
    currentStartingPlayer: startingPlayer,
    status: MatchStatus.SETUP,
  };
}
