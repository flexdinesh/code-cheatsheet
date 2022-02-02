// @ts-nocheck
import { Global } from '@emotion/react';

/* global styles, css reset, web font loading happen here */
const GlobalStyles: React.FC = () => {
  return (
    <>
      <Global
        styles={`
          body {
            margin: 0px;
            padding: 0px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
      `}
      />
    </>
  );
};
