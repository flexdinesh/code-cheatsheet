## React Functional Component

```js
import PropTypes from 'prop-types';

const HelloWorld = ({name}) => (
 <div>{`Hi ${name}! Well, Hello World!`}</div>
);

HelloWorld.propTypes = {
  name: PropTypes.string
};

HelloWorld.defaultProps = {
  name: 'Stranger'
};

export default HelloWorld;

```
