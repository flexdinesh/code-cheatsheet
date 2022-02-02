// @ts-nocheck
import React from 'react';

export type ExampleComponentProps = {
  greetings?: string;
};

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  greetings = 'Jane',
}) => {
  return <div>Hello, {greetings}!</div>;
};

if (process.env.NODE_ENV !== 'production') {
  ExampleComponent.displayName = 'ExampleComponent';
}
