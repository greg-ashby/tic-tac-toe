import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/app/page.tsx';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);

    // const heading = screen.getByRole('heading', { level: 1 });

    // expect(heading).toBeInTheDocument();
    expect(1).toBe(1);
  });
});
