import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { Player } from './PlayerUtils.ts';

const PlayerContext = createContext<
  | {
      players: { one: Player; two: Player };
      updatePlayers: (newPlayers: { one: Player; two: Player }) => void;
    }
  | undefined
>(undefined);

export const usePlayers = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayers must be used within a PlayerContext.Provider');
  }
  return context;
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [players, updatePlayers] = useImmer({
    one: 'X',
    two: 'O',
  });
  const playerContextValue = useMemo(
    () => ({ players, updatePlayers }),
    [players, updatePlayers]
  );
  return (
    <PlayerContext.Provider value={playerContextValue}>
      {children}
    </PlayerContext.Provider>
  );
}
