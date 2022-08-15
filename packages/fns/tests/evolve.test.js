import evolve from '../src/evolve';

const add = a => b => a + b;

describe('evolve', () => {
  test('creates a new object by evolving the `object` according to the `transformation` functions', () => {
    const transf = { elapsed: add(1), remaining: add(-1) };
    const object = { name: 'Tomato', elapsed: 100, remaining: 1400 };
    const expected = { name: 'Tomato', elapsed: 101, remaining: 1399 };

    expect(evolve(transf, object)).toEqual(expected);
  });

  test('does not invoke function if object does not contain the key', () => {
    const transf = { n: add(1), m: add(1) };
    const object = { m: 3 };
    const expected = { m: 4 };

    expect(evolve(transf, object)).toEqual(expected);
  });

  test('is not destructive', () => {
    const transf = { elapsed: add(1), remaining: add(-1) };
    const object = { name: 'Tomato', elapsed: 100, remaining: 1400 };
    const expected = { name: 'Tomato', elapsed: 100, remaining: 1400 };

    evolve(transf, object);

    expect(object).toEqual(expected);
  });

  test('creates a new array by evolving the `array` according to the `transformation` functions', () => {
    const transf = [add(1), add(-1)];
    const object = [100, 1400];
    const expected = [101, 1399];

    expect(evolve(transf, object)).toEqual(expected);
  });
});
