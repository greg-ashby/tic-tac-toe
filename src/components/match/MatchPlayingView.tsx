import { useImmer } from 'use-immer';
import {
  getNewScoreState,
  calculateNewScore,
} from '@/components/score/ScoreUtils.ts';
import GameView from '@/components/game/GameView.tsx';
import { usePlayers } from '@/components/player/PlayerContext.tsx';
import { getOpponentOf } from '@/components/player/PlayerUtils.ts';
import ScoreView from '@/components/score/ScoreView.tsx';
import { GameOutcome } from '@/components/game/GameUtils.ts';
import { EndMatchButton } from './EndMatchButton.tsx';

type Props = {
  onEndMatch: () => void;
};
export function MatchPlayingView({ onEndMatch }: Props) {
  const [score, updateScore] = useImmer(getNewScoreState());
  const { players } = usePlayers();
  const [currentStartingPlayer, updateCurrentStartingPlayer] = useImmer(
    players.one
  );

  const handleGameOver = (outcome: GameOutcome) => {
    updateScore(calculateNewScore(score, players, outcome));
    updateCurrentStartingPlayer(getOpponentOf(currentStartingPlayer, players));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <GameView
          firstPlayer={currentStartingPlayer}
          onGameOver={handleGameOver}
        />
      </div>
      <div className="flex flex-col justify-center h-full space-y-4">
        <ScoreView score={score} />
        <EndMatchButton onEndMatchClick={onEndMatch} />
      </div>
    </div>
  );
}
