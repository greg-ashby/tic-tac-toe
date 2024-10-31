import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EndMatchButton } from '@/components/match/EndMatchButton.tsx';

describe('EndMatchButton', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <EndMatchButton onEndMatchClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls onEndMatchClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <EndMatchButton onEndMatchClick={handleClick} />
    );

    const button = getByRole('button', { name: /end match/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
