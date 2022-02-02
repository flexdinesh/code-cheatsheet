// @ts-ignore
import clone from "just-clone";
// @ts-ignore
import set from "just-safe-set";
import { walkObject } from "./Object";

// restricting token groups to be flat
type TokenGroup = { [key: string]: string | number };
type ThemeDefinition = { [key: string]: string | TokenGroup };

type CreatedTheme<
  T extends ThemeDefinition | TokenGroup,
  NestedKey extends string = "--theme-"
> = T extends any
  ? {
      readonly [Key in keyof T]: T[Key] extends TokenGroup
        ? CreatedTheme<T[Key], `${NestedKey}-${string & Key}`>
        : Key extends "name"
        ? T[Key]
        : `var(${NestedKey}-${string & Key})`;
    }
  : never;

const tokenKeysToSkip = ["name"];
const numericTokenGrouns = ["fontWeights", "lineHeights"];
/**
 * Converts theme definitions into css variables with strong types
 */
export const createTheme = <ThemeDef extends ThemeDefinition>(
  themeDefinition: ThemeDef
): CreatedTheme<ThemeDef> & {
  __definition: ThemeDef;
  __cssVars: Record<string, string | number>;
} => {
  // we store the original tokens in __definition
  const __definition = clone<ThemeDef>(themeDefinition);
  // we store the created css variables in __cssVars
  const __cssVars: Record<string, string | number> = {};
  // we assign css vars to token keys
  const theme = {} as CreatedTheme<ThemeDef>;

  // Eg. { value: 'green', location: ['color', 'primary'], isLeaf: true }
  walkObject(themeDefinition, ({ value, location, isLeaf }) => {
    if (tokenKeysToSkip.includes(location[0])) {
      set(theme, location, value);
      return;
    }
    if (isLeaf) {
      const cssVarName = `--theme-${location.join("-")}`;
      let cssVarValue = value;
      if (
        typeof value === "number" &&
        !location.some((l) => numericTokenGrouns.includes(l))
      ) {
        cssVarValue = `${value}px`;
      }
      set(theme, location, `var(${cssVarName})`);
      __cssVars[cssVarName] = cssVarValue;
    }
  });

  return { ...theme, __definition, __cssVars };
};
