'use client';

import { useImmer } from 'use-immer';
import MatchSetupView from '@/components/match/MatchSetupView.tsx';
import { MatchPlayingView } from './MatchPlayingView.tsx';

export enum MatchStatus {
  SETUP = 'setup',
  PLAYING = 'playing',
}

export function MatchView() {
  const [matchStatus, updateMatchStatus] = useImmer<MatchStatus>(
    MatchStatus.SETUP
  );

  const handleStartMatch = () => {
    updateMatchStatus(MatchStatus.PLAYING);
  };

  const handleEndMatch = () => {
    updateMatchStatus(MatchStatus.SETUP);
  };

  return matchStatus === MatchStatus.SETUP ? (
    <MatchSetupView onStartMatch={handleStartMatch} />
  ) : (
    <MatchPlayingView onEndMatch={handleEndMatch} />
  );
}
