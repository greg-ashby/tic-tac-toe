import { useImmer } from 'use-immer';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Player } from './PlayerLogic.ts';

type PlayersContextType = {
  players: { one: Player; two: Player };
  updatePlayers: (newPlayers: { one: Player; two: Player }) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context)
    throw new Error('usePlayers must be used within a PlayersProvider');
  return context;
};

export default function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, updatePlayers] = useImmer({ one: 'X', two: 'O' });
  const contextValue = useMemo(
    () => ({ players, updatePlayers }),
    [players, updatePlayers]
  );

  return (
    <PlayersContext.Provider value={contextValue}>
      {children}
    </PlayersContext.Provider>
  );
}
