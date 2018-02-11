## Access Nested Objects Using Array Reduce

```js
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : null, nestedObj);
}
```
