/**
 * Returns true if the arg is an object
 */
export const isObject = (item: unknown) => {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
};

/**
 * Callback utitlity to deep walk the entire object
 */
export const walkObject = (
  root: Record<string, any>,
  callback: (arg: {
    value: string | number;
    key: string;
    location: string[];
    isLeaf: boolean;
  }) => void
) => {
  const walk = (obj: Record<string, any>, location: string[] = []) => {
    Object.keys(obj).forEach((key) => {
      // Value is an array, do nothing
      if (Array.isArray(obj[key])) {
        // do nothing
        console.error(
          "Object key with array value detected. Array values will be ignored.",
          obj[key]
        );
        // Value is an object, walk the keys of the object
      } else if (isObject(obj[key])) {
        callback({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: false,
        });
        walk(obj[key], [...location, ...[key]]);

        // We've reached a leaf node, call fn on the leaf with the location
      } else {
        callback({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: true,
        });
      }
    });
  };

  walk(root);
};

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
 export const mergeDeep = (...args: Array<Record<string, any>>) => {
  const mergeObject = (...objects: Array<Record<string, any>>) => {
    const isObject = (obj: unknown) => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          // eslint-disable-next-line no-param-reassign
          prev[key] = pVal.concat(...oVal);
        } else if (isObject(pVal) && isObject(oVal)) {
          // eslint-disable-next-line no-param-reassign
          prev[key] = mergeObject(pVal as Record<string, unknown>, oVal as Record<string, unknown>);
        } else {
          // eslint-disable-next-line no-param-reassign
          prev[key] = oVal;
        }
      });

      return prev;
    }, {});
  };

  return mergeObject(...args);
};
