// ScoreView.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import ScoreView from '@/components/score/ScoreView.tsx';

// Mock the usePlayers hook to provide consistent player names
jest.mock('@/components/player/PlayerContext', () => ({
  usePlayers: () => ({
    players: { one: 'Player One', two: 'Player Two' },
  }),
}));

describe('ScoreView', () => {
  it('renders correctly with the given score values', () => {
    const score = { playerOneWins: 5, playerTwoWins: 1, ties: 4 };
    const { asFragment } = render(<ScoreView score={score} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
