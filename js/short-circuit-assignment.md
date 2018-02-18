## Short Circuit Assignment

```js
const person = {
    name: 'Jack'
};

const name = person.name || 'Sunshine'; // 'Sunshine' => default value

// if you're not sure if person object is defined
const name = (person && person.name) || 'Sunshine';

// can be used with as many variables as needed
let foo, bar, baz;
bar = 'Bar-da-Jack';
// first truthy value will be assigned to name
const name = foo || bar || baz || 'John'; // => name = 'Bar-da-Jack'
```

_Note: Keep in mind, if you're expecting 0 as a value in a variable, this trick might not work as expected, as 0 is considered falsy in JavaScript._
