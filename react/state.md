## React State

```js
import React from 'react';

class ComponentName extends React.Component {

  constructor(props) {
    super(props);
    // initial state is defined in constructor
    this.state = {
      key: 'value'
    };
  }

  changeState() {
    this.setState({
      key: 'new value'
    });
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>Hello, {name}!</h1>
        <span>The key is {this.state.key}</span>
      </div>;
    );
  }

}

export default ComponentName;

```

Some recommendations on using component state

```js
// Never change state directly
this.state.key = 'Hello'; // => Wrong
// Use setState() instead
this.setState({key: 'Hello'}); // => Correct

// To change the state based on previous state value
// Wrong
this.setState({
  key: this.state.key + 'mate!',
});
// Correct
this.setState((prevState, props) => ({
  key: prevState.key + 'mate!'
}));

// Remember - state change is shallow => can update separate keys independently
this.setState({
  keyOne: this.state.key + 'mate!',
});

this.setState({
  keyTwo: this.state.key + 'buddy!',
});

```
