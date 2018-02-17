## React Prop-Types

```js
// All prop-types
ComponentName.propTypes = {
  string: PropTypes.string,
  number: PropTypes.number,
  boolean: PropTypes.bool,
  array: PropTypes.array,
  arrayOfType: PropTypes.arrayOf(PropTypes.string),
  object: PropTypes.shape,
  objectOfShape: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  }),
  instanceOfClass: PropTypes.instanceOf(Message),
  method: PropTypes.func,
  anyType: PropTypes.any,
  // any type can be marked required
  requiredProp: PropTypes.string.isRequired,
  // anything that can be rendered is a node
  // => Eg. children
  node: PropTypes.node,
  reactElement: PropTypes.element
};


```
