## React Pure Component

Pure Component will re-render only if the props/state is changed. React shallow checks the props or state and if the props/state remain the same at shallow level, the component won't re-render.


```js
import React from 'react';
import PropTypes from 'prop-types';

class ComponentName extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // custom checks can be done here
    // to force a pure component to re-render
    // return nextProps.name === props.name;
  }

  render() {
    const { name } = this.props;
    return (
      <div>Hello, {name}</div>;
    );
  }

  ComponentName.propTypes = {
    name: PropTypes.string
  };

  ComponentName.defaultProps = {
    name: 'Stranger'
  };
}

export default ComponentName;

```
