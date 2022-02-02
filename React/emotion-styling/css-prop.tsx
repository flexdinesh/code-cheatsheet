// @ts-nocheck
/** @jsxImportSource @emotion/react */
import { css, CSSObject } from '@emotion/react';

const objectStyles: CSSObject = {
  minWidth: 96,
  borderRadius: 4,
  cursor: 'pointer',
  textAlign: 'center',
};

const cssFnStyles = css`
  height: 6rem;
  display: grid;
  grid-template-columns: 8rem 1fr 8rem;
  align-items: center;
  justify-content: center;
`;

const CssFunction = () => {
  <div css={cssFnStyles}>Hello World</div>;
};

const ObjectSyntax = () => {
  <div css={objectStyles}>Hello World</div>;
};

const InlineSyntax = () => {
  <div css={{ background: 'yellow' }}>Hello World</div>;
};

/**
 * Method to get runtime styles based on prop
 */
export const getStyles = ({
  variant,
}: {
  variant: 'primary' | 'secondary';
}): ReturnType<typeof css> => {
  const baseStyles = {
    background: 'yellow',
  };
  const variantStyles: {
    [variant in 'primary' | 'secondary']: CSSObject;
  } = {
    primary: {
      color: 'green',
    },
    secondary: {
      color: 'hotpink',
    },
  };
  const styles = {
    ...baseStyles,
    ...(variant && variantStyles[variant]),
  };
  return css(styles);
};
