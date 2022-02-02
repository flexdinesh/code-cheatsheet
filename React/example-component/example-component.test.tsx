// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { ExampleComponent } from './example-component';

test('renders ExampleComponent', () => {
  render(<ExampleComponent />);
  const renderedElement = screen.getByText(/Hello, Jane/i);
  expect(renderedElement).toBeInTheDocument();
});
