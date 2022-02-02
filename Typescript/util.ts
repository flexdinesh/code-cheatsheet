/** convert array of vals to typed object */
const ALL_FEATURE_FLAGS = ['superFeature'] as const;
type FeatureFlag = typeof ALL_FEATURE_FLAGS[number];
type FeatureFlags = {
  [property in FeatureFlag]: boolean;
};

const obj = {
  hello: 'world',
};
/** Object.keys to typed array */
const keys = Object.keys(obj) as Array<keyof typeof obj>;
