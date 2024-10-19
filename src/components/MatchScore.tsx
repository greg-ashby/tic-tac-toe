import { Score } from '@/lib/MatchLogic.ts';

type Props = {
  score: Score;
};

export default function MatchScore({ score: { xWins, oWins, ties } }: Props) {
  return (
    <>
      <p className="text-2xl font-bold">X: {xWins}</p>
      <p className="text-2xl font-bold">O: {oWins}</p>
      <p className="text-2xl font-bold">Ties: {ties}</p>
    </>
  );
}
