import omit from './omit';

describe('omit', () => {
  const obj = { a: 1, b: 2, c: 3 };

  test('copies an object omitting the listed properties', () => {
    expect(omit('a', obj), { b: 2, c: 3 });
  });
});
