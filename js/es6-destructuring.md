## ES6 Destructuring Assignment

```js
const person = {
  first: 'Jack',
  last: 'Daniels',
  address: {
    city: 'Dallas',
  }
};

// destructure as it is
const { first, last } = person;

// destructure with custom name
const { first: firstName, last: lastName } = person;

// destructure with default value
const { first, last, middle = 'The Boss' } = person;

// destructure with custom name and default value
const { first, last, middle: middleName = 'The Boss' } = person;

// destructure nested keys
const { first, last, address: { city } } = person;

// destructure nested keys with custom name
const { first, last, address: { city: myCity } } = person;

// destructure nested keys safely
const { first, last, address: { city } = {} } = person;

// destructure rest of the values
const { first, ...rest } = person; // => rest will have all keys but first

```
