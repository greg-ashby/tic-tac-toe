import GameStatus from '@/components/game/GameStatus.tsx';
import {
  Game,
  getNewGame,
  makeMove,
  TIE_GAME,
} from '@/components/game/GameUtils.ts';
import { render } from '@testing-library/react';

describe('GameStatus', () => {
  let game: Game;
  beforeEach(() => {
    game = getNewGame('X', 'O');
  });
  it('shows New Game button if game if over', () => {
    game.outcome = 'X';
    const { queryByRole } = render(
      <GameStatus game={game} onNewGameClick={() => {}} />
    );
    const button = queryByRole('button', { name: /new game/i });
    expect(button).toBeInTheDocument();
    game.outcome = TIE_GAME;
    expect(queryByRole('button', { name: /new game/i })).toBeInTheDocument();
  });
  it('does not show New Game button if game is not over', () => {
    const { queryByRole } = render(
      <GameStatus game={game} onNewGameClick={() => {}} />
    );
    const button = queryByRole('button', { name: /new game/i });
    expect(button).not.toBeInTheDocument();
  });
  it('shows tie game if game is tie', () => {
    game.outcome = TIE_GAME;
    const { getByText } = render(
      <GameStatus game={game} onNewGameClick={() => {}} />
    );
    expect(getByText('Tie Game')).toBeInTheDocument();
  });
  it('shows player turn if game is not over', () => {
    let result = render(<GameStatus game={game} onNewGameClick={() => {}} />);
    expect(result.getByText("X's Turn")).toBeInTheDocument();
    makeMove(game, 0);

    result = render(<GameStatus game={game} onNewGameClick={() => {}} />);

    expect(result.getByText("O's Turn")).toBeInTheDocument();
  });
});
