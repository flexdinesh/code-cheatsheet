// @ts-nocheck
import React from 'react';

type ExampleContext = {
  name: string;
  changeName: (n: string) => void;
};

const ExampleContext = React.createContext<ExampleContext | undefined>(
  undefined
);

const ExampleProvider: React.FC = ({ children }) => {
  const [name, setName] = React.useState('');

  const contextValue = React.useMemo(() => {
    const changeName = (n: string) => {
      setName(n);
    };
    return { name, changeName };
  }, [name, setName]);

  return (
    <ExampleContext.Provider value={contextValue}>
      {children}
    </ExampleContext.Provider>
  );
};

const useExampleContext = () => {
  const exampleContext = React.useContext(ExampleContext);
  if (exampleContext === undefined) {
    throw new Error('ExampleProvider is not wrapped in the tree');
  }

  return exampleContext;
};
