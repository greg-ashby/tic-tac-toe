import { Board, calculateOutcome } from '@/lib/GameLogic.ts';
import NewGameButton from './NewGameButton.tsx';

type Props = {
  board: Board;
  currentPlayer: string;
  onNewGameClick: () => void;
};

export default function GameState({
  board,
  currentPlayer,
  onNewGameClick,
}: Props) {
  let text = `${currentPlayer}'s Turn`;
  let showButton = false;
  const { winner, isOver } = calculateOutcome(board);
  if (isOver) {
    showButton = true;
    text = winner ? `${winner} wins!` : 'Tie Game';
  }

  return (
    <>
      <div className="text-2xl font-bold">{text}</div>
      {showButton && <NewGameButton onClick={onNewGameClick} />}
    </>
  );
}
