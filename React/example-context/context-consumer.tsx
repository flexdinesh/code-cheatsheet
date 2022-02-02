// @ts-nocheck
import { ExampleContext } from './example-context';

const ConsumeContextExample = () => {
  <ExampleContext.Consumer>
    {(context) => {
      if (context === undefined) {
        throw new Error('Consumer must be used within a Provider');
      }
      const { name } = context;
      return <div>{name}</div>;
    }}
  </ExampleContext.Consumer>;
};
