import NewGameButton from '@/components/game/NewGameButton.tsx';
import { fireEvent, render } from '@testing-library/react';

describe('NewGameButton', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<NewGameButton onClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<NewGameButton onClick={handleClick} />);

    const button = getByRole('button', { name: /new game/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
