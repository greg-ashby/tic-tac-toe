import { Player } from '@/components/players/Players.ts';

export enum MatchStatus {
  SETUP = 'setup',
  PLAYING = 'playing',
}

export type MatchState = {
  currentStartingPlayer: Player;
  status: MatchStatus;
};

export function getNewMatchState(startingPlayer: Player): MatchState {
  return {
    currentStartingPlayer: startingPlayer,
    status: MatchStatus.SETUP,
  };
}
