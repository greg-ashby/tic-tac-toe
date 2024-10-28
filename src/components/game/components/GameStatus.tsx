import { Game, GameStatuses } from '../GameUtils.ts';
import NewGameButton from './NewGameButton.tsx';

type Props = {
  game: Game;
  onNewGameClick: () => void;
};

export default function GameStatus({ game, onNewGameClick }: Props) {
  let text = `${game.currentPlayer}'s Turn`;
  let showButton = false;
  if (game.statusOrWinner !== GameStatuses.IN_PROGRESS) {
    showButton = true;
    text =
      game.statusOrWinner !== GameStatuses.TIE
        ? `${game.statusOrWinner} wins!`
        : 'Tie Game';
  }

  return (
    <>
      <div className="text-2xl font-bold pt-2">{text}</div>
      {showButton && <NewGameButton onClick={onNewGameClick} />}
    </>
  );
}
