import { MatchView } from './match/MatchView.tsx';
import { PlayerProvider } from './player/PlayerContext.tsx';

export function Main() {
  return (
    <PlayerProvider>
      <MatchView />
    </PlayerProvider>
  );
}
