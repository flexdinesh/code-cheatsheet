## React Method Binding


  1. Bind during render (ES5 approach)

  ```js
  // define method
  handleChange(e) {
    // e is the event
  }

  // and call as
  onChange={this.handleChange.bind(this)}

  ```

  2. Bind in constructor (ES5 approach)

  ```js
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // define method
  handleChange() {}

  // and call as
  onChange={this.handleChange}

  ```

  3. Use arrow function in render (ES6 approach)

  ```js
  // define method
  handleChange(e) {
    // e is the event
  }

  // and call as
  onChange={e => this.handleChange(e)}

  ```

  4. Use arrow function while defining method (ES6 approach - recommended)

    This is ES6 stage-2 feature, so you might need to enable `transform-class-properties` in babel.

  ```js
  // define method
  handleChange = () => {
    // call this function from render
    // and this.whatever in here works fine.
  };

  // and call as
  onChange={this.handleChange}

  ```
