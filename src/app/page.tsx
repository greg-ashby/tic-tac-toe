'use client';

import MatchView from '@/components/match/MatchView.tsx';
import PlayersProvider from '@/components/players/PlayersContext.tsx';

export default function Home() {
  return (
    <PlayersProvider>
      <MatchView />
    </PlayersProvider>
  );
}
