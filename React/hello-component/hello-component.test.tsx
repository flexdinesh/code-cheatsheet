// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { HelloComponent } from './HelloComponent';

test('renders HelloComponent', () => {
  render(<HelloComponent />);
  const renderedElement = screen.getByText(/Hello, Jane/i);
  expect(renderedElement).toBeInTheDocument();
});
