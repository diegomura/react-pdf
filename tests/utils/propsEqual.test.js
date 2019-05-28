import propsEqual from '../../src/utils/propsEqual';

describe('propsEqual', () => {
  test('should be true for two empty objects', () => {
    expect(propsEqual({}, {})).toBeTruthy();
  });

  test('should be true for equal objects', () => {
    const a = { foo: 'bar', bar: 'foo' };
    const b = { bar: 'foo', foo: 'bar' };

    expect(propsEqual(a, b)).toBeTruthy();
  });

  test('should be false for diffent length objects', () => {
    const a = { foo: 'bar', bar: 'foo' };
    const b = { baz: 'foo' };

    expect(propsEqual(a, b)).toBeFalsy();
  });

  test('should be false if string children attributes differ', () => {
    const a = { foo: 'bar', children: 'test' };
    const b = { foo: 'bar', children: 'else' };

    expect(propsEqual(a, b)).toBeFalsy();
  });

  test('should be false if nested values differ', () => {
    const a = { foo: 'bar', something: { hey: 'there' } };
    const b = { foo: 'bar', something: { hey: 'back' } };

    expect(propsEqual(a, b)).toBeFalsy();
  });
});
