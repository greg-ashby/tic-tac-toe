'use client';

import Match from '@/code/match/Match.tsx';
import PlayerSetup from '@/code/player/PlayerSetup.tsx';
import { Player, NullablePlayer } from '@/code/player/PlayerLogic.ts';
import { useState } from 'react';

export default function Main() {
  const [playerOne, setPlayerOne] = useState<NullablePlayer>(null);
  const [playerTwo, setPlayerTwo] = useState<NullablePlayer>(null);

  const handlePlayerSetupSubmit = (
    playerOneValue: Player,
    playerTwoValue: Player
  ) => {
    setPlayerOne(playerOneValue);
    setPlayerTwo(playerTwoValue);
  };

  if (!playerOne || !playerTwo) {
    return <PlayerSetup onPlayerSetupSubmit={handlePlayerSetupSubmit} />;
  }
  return <Match playerOne={playerOne} playerTwo={playerTwo} />;
}
