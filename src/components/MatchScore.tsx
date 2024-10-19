import { Score } from '@/lib/MatchLogic.ts';

type Props = {
  score: Score;
};

export default function MatchScore({ score: { xWins, oWins, ties } }: Props) {
  return (
    <>
      <h1 className="text-2xl text-center font-bold mt-3 mb-3">SCORE</h1>
      <div className="grid grid-cols-2">
        <div className="border border-black text-l font-bold text-right p-2">
          X wins
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {xWins}
        </div>
        <div className="border border-black text-l font-bold text-right p-2">
          O wins
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {oWins}
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
