import { GameStatusOrWinner } from '../game/GameUtils.ts';
import GameView from '../game/GameView.tsx';
import { ScoreState } from '../score/ScoreUtils.ts';
import ScoreView from '../score/ScoreView.tsx';
import { MatchState } from './MatchUtils.ts';

type Props = {
  match: MatchState;
  score: ScoreState;
  onGameOver: (statusOrWinner: GameStatusOrWinner) => void;
};
export function MatchPlayingView({
  match: { currentStartingPlayer, status },
  score,
  onGameOver,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <GameView firstPlayer={currentStartingPlayer} onGameOver={onGameOver} />
      </div>
      <div className="flex flex-col justify-center h-full">
        <ScoreView score={score} />
      </div>
    </div>
  );
}
