import { usePlayers } from '@/components/player/PlayerContext.tsx';
import { ScoreState } from './ScoreUtils.ts';

type Props = {
  score: ScoreState;
};

export default function ScoreView({
  score: { playerOneWins, playerTwoWins, ties },
}: Props) {
  const { players } = usePlayers();
  return (
    <>
      <h1 className="text-2xl text-center font-bold mt-6">SCORE</h1>
      <div className="grid grid-cols-2">
        <div className="border border-black text-l font-bold text-right p-2">
          {players.one} wins
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {playerOneWins}
        </div>
        <div className="border border-black text-l font-bold text-right p-2">
          {players.two} wins
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {playerTwoWins}
        </div>
        <div className="border border-black text-l font-bold text-right p-2">
          Ties
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {ties}
        </div>
      </div>
    </>
  );
}
