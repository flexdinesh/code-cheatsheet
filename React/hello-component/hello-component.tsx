// @ts-nocheck
import React from 'react';

export type HelloComponentProps = {
  greetings?: string;
};

export const HelloComponent: React.FC<HelloComponentProps> = ({
  greetings = 'Jane',
}) => {
  return <div>Hello, {greetings}!</div>;
};

if (process.env.NODE_ENV !== 'production') {
  HelloComponent.displayName = 'HelloComponent';
}
