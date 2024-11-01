import { useImmer } from 'use-immer';
import {
  getNewScoreState,
  calculateNewScoreState,
} from '@/components/score/ScoreUtils.ts';
import { usePlayers } from '@/components/player/PlayerContext.tsx';
import { getOpponentOf } from '@/components/player/PlayerUtils.ts';
import ScoreView from '@/components/score/ScoreView.tsx';
import {
  calculateOutcome,
  getNewGame,
  makeMove,
} from '@/components/game/GameUtils.ts';
import { EndMatchButton } from './EndMatchButton.tsx';
import GameBoard from '../game/GameBoard.tsx';
import GameStatus from '../game/GameStatus.tsx';

type Props = {
  onEndMatch: () => void;
};
export function MatchPlayingView({ onEndMatch }: Props) {
  const { players } = usePlayers();
  const [firstPlayer, updateFirstPlayer] = useImmer(players.one);
  const secondPlayer = getOpponentOf(firstPlayer, players);

  const [score, updateScore] = useImmer(getNewScoreState());
  const [game, updateGame] = useImmer(getNewGame(firstPlayer, secondPlayer));

  const handleNewGameClick = () => {
    const newGame = getNewGame(firstPlayer, secondPlayer);
    updateGame(newGame);
  };

  const handleSquareClick = (squareNumber: number) => {
    updateGame((draft) => {
      makeMove(draft, squareNumber);
      draft.outcome = calculateOutcome(draft);
      if (draft.outcome) {
        updateScore(calculateNewScoreState(score, players, draft.outcome));
        updateFirstPlayer(secondPlayer);
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-4 mb-4">Tic-Tac-Toe</h1>
        <GameBoard game={game} onSquareClick={handleSquareClick} />
        <GameStatus game={game} onNewGameClick={handleNewGameClick} />
      </div>
      <div className="flex flex-col justify-center h-full space-y-4">
        <ScoreView score={score} />
        <EndMatchButton onEndMatchClick={onEndMatch} />
      </div>
    </div>
  );
}
