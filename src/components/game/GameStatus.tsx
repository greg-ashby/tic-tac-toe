import { Game } from '@/lib/GameLogic.ts';
import NewGameButton from './NewGameButton.tsx';

type Props = {
  game: Game;
  onNewGameClick: () => void;
};

export default function GameStatus({ game, onNewGameClick }: Props) {
  let text = `${game.currentPlayer}'s Turn`;
  let showButton = false;
  const { winner, isOver } = game.outcome;
  if (isOver) {
    showButton = true;
    text = winner ? `${winner} wins!` : 'Tie Game';
  }

  return (
    <>
      <div className="text-2xl font-bold pt-2">{text}</div>
      {showButton && <NewGameButton onClick={onNewGameClick} />}
    </>
  );
}
