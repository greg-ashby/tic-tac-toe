import { Player } from '@/components/players/Players.ts';
import { Score } from './Score.ts';

type Props = {
  playerOne: Player;
  playerTwo: Player;
  score: Score;
};

export default function ScoreView({
  score: { playerOneWins, playerTwoWins, ties },
  playerOne,
  playerTwo,
}: Props) {
  return (
    <>
      <h1 className="text-2xl text-center font-bold mt-7 mb-3">SCORE</h1>
      <div className="grid grid-cols-2">
        <div className="border border-black text-l font-bold text-right p-2">
          {playerOne} wins
        </div>
        <div className="border border-black text-l font-bold text-left p-2">
          {playerOneWins}
        </div>
        <div className="border border-black text-l font-bold text-right p-2">
          {playerTwo} wins
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
