import { Game, TIE_GAME } from '@/components/game/GameUtils.ts';
import NewGameButton from './NewGameButton.tsx';

type Props = {
  game: Game;
  onNewGameClick: () => void;
};

export default function GameStatus({ game, onNewGameClick }: Props) {
  let text = `${game.currentPlayer}'s Turn`;
  let showButton = false;
  if (game.outcome) {
    showButton = true;
    text = game.outcome !== TIE_GAME ? `${game.outcome} wins!` : 'Tie Game';
  }

  return (
    <>
      <div className="text-2xl font-bold pt-2">{text}</div>
      {showButton && <NewGameButton onClick={onNewGameClick} />}
    </>
  );
}
