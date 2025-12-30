<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/fns

> Lightweight utility functions for react-pdf

A collection of functional programming utilities used internally by react-pdf. Zero dependencies, tree-shakeable, and fully typed.

## Installation

```bash
yarn add @react-pdf/fns
```

## Table of Contents

- [adjust](#adjust)
- [asyncCompose](#asynccompose)
- [capitalize](#capitalize)
- [castArray](#castarray)
- [compose](#compose)
- [dropLast](#droplast)
- [evolve](#evolve)
- [get](#get)
- [isNil](#isnil)
- [last](#last)
- [mapValues](#mapvalues)
- [matchPercent](#matchpercent)
- [omit](#omit)
- [parseFloat](#parsefloat)
- [pick](#pick)
- [repeat](#repeat)
- [reverse](#reverse)
- [upperFirst](#upperfirst)
- [without](#without)

## Functions

### adjust

Applies a function to the value at the given index of an array.

```js
import { adjust } from '@react-pdf/fns';

adjust(1, (x) => x * 2, [1, 2, 3]); // => [1, 4, 3]
adjust(-1, (x) => x + 10, [1, 2, 3]); // => [1, 2, 13]
```

---

### asyncCompose

Performs right-to-left function composition with async functions support. `asyncCompose(f, g, h)(x)` is equivalent to `await f(await g(await h(x)))`.

```js
import { asyncCompose } from '@react-pdf/fns';

const addAsync = async (x) => x + 1;
const double = (x) => x * 2;

const fn = asyncCompose(double, addAsync);
await fn(5); // => 12
```

---

### capitalize

Capitalizes the first letter of each word in a string.

```js
import { capitalize } from '@react-pdf/fns';

capitalize('hello world'); // => 'Hello World'
capitalize('foo bar baz'); // => 'Foo Bar Baz'
```

---

### castArray

Wraps a value in an array if it isn't one already.

```js
import { castArray } from '@react-pdf/fns';

castArray('foo'); // => ['foo']
castArray(['foo']); // => ['foo']
castArray(123); // => [123]
```

---

### compose

Performs right-to-left function composition. `compose(f, g, h)(x)` is equivalent to `f(g(h(x)))`.

```js
import { compose } from '@react-pdf/fns';

const add1 = (x) => x + 1;
const double = (x) => x * 2;

const fn = compose(double, add1);
fn(5); // => 12
```

---

### dropLast

Drops the last element from an array or string.

```js
import { dropLast } from '@react-pdf/fns';

dropLast([1, 2, 3]); // => [1, 2]
dropLast('hello'); // => 'hell'
```

---

### evolve

Applies transformations to an object's values based on a transformation map.

```js
import { evolve } from '@react-pdf/fns';

evolve(
  { count: (n) => n + 1, name: (s) => s.toUpperCase() },
  { name: 'item', count: 5 },
);
// => { name: 'ITEM', count: 6 }
```

---

### get

Retrieves a value at a given path from an object with a default fallback.

```js
import { get } from '@react-pdf/fns';

get({ a: { b: 1 } }, ['a', 'b'], 0); // => 1
get({ a: { b: 1 } }, ['a', 'c'], 0); // => 0
get({ a: { b: 1 } }, 'a', {}); // => { b: 1 }
```

---

### isNil

Checks if a value is `null` or `undefined`.

```js
import { isNil } from '@react-pdf/fns';

isNil(null); // => true
isNil(undefined); // => true
isNil(0); // => false
isNil(''); // => false
```

---

### last

Returns the last element of an array or last character of a string.

```js
import { last } from '@react-pdf/fns';

last([1, 2, 3]); // => 3
last('abc'); // => 'c'
last([]); // => undefined
```

---

### mapValues

Maps over the values of an object, applying a function to each value.

```js
import { mapValues } from '@react-pdf/fns';

mapValues({ a: 1, b: 2 }, (v) => v * 2); // => { a: 2, b: 4 }
mapValues({ x: 'foo', y: 'bar' }, (v, k) => `${k}:${v}`);
// => { x: 'x:foo', y: 'y:bar' }
```

---

### matchPercent

Parses a percentage string and returns both the numeric value and decimal percent.

```js
import { matchPercent } from '@react-pdf/fns';

matchPercent('50%'); // => { value: 50, percent: 0.5 }
matchPercent('-25%'); // => { value: -25, percent: -0.25 }
matchPercent('abc'); // => null
```

---

### omit

Creates a new object excluding specified keys.

```js
import { omit } from '@react-pdf/fns';

omit('b', { a: 1, b: 2, c: 3 }); // => { a: 1, c: 3 }
omit(['a', 'c'], { a: 1, b: 2, c: 3 }); // => { b: 2 }
```

---

### parseFloat

Parses a string to a float. Non-string values pass through unchanged.

```js
import { parseFloat } from '@react-pdf/fns';

parseFloat('3.14'); // => 3.14
parseFloat('10px'); // => 10
parseFloat(42); // => 42
parseFloat(null); // => null
```

---

### pick

Creates a new object with only the specified keys.

```js
import { pick } from '@react-pdf/fns';

pick(['a', 'c'], { a: 1, b: 2, c: 3 }); // => { a: 1, c: 3 }
pick(['x'], { a: 1, b: 2 }); // => {}
```

---

### repeat

Creates an array with an element repeated a specified number of times.

```js
import { repeat } from '@react-pdf/fns';

repeat('a', 3); // => ['a', 'a', 'a']
repeat(0, 4); // => [0, 0, 0, 0]
```

---

### reverse

Returns a new array with elements in reverse order (does not mutate original).

```js
import { reverse } from '@react-pdf/fns';

reverse([1, 2, 3]); // => [3, 2, 1]
reverse(['a', 'b', 'c']); // => ['c', 'b', 'a']
```

---

### upperFirst

Converts the first character of a string to uppercase.

```js
import { upperFirst } from '@react-pdf/fns';

upperFirst('hello'); // => 'Hello'
upperFirst('hELLO'); // => 'HELLO'
```

---

### without

Returns a new array excluding the specified values.

```js
import { without } from '@react-pdf/fns';

without([2, 4], [1, 2, 3, 4, 5]); // => [1, 3, 5]
without(['b'], ['a', 'b', 'c']); // => ['a', 'c']
```

## License

MIT
