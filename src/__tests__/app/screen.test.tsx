import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/app/page.tsx';

describe('Page', () => {
  it('renders a match setup', () => {
    const screen = render(<Page />);

    const heading = screen.getByText('PLAYER SETUP');

    expect(heading).toBeInTheDocument();
  });
});
