import GameSquare from '@/components/game/GameSquare.tsx';
import { fireEvent, render } from '@testing-library/react';

describe('GameSquare', () => {
  it('displays the correct value and disables the button if value is not null', () => {
    const value = 'X';
    const { getByRole } = render(
      <GameSquare value={value} disabled={false} onClick={() => {}} />
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(value);
  });
  it('disables the button if disabled is true', () => {
    const { getByRole } = render(
      <GameSquare value={null} disabled onClick={() => {}} />
    );
    expect(getByRole('button')).toBeDisabled();
  });
  it('displays nothing and is enabled if no value and not disabled', () => {
    const { getByRole } = render(
      <GameSquare value={null} disabled={false} onClick={() => {}} />
    );
    const button = getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('');
  });
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <GameSquare value={null} disabled={false} onClick={handleClick} />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
