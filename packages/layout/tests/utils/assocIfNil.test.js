import assocIfNil from '../../src/utils/assocIfNil';

describe('assocIfNil', () => {
  test('should add new value to object if missing', () => {
    const result = assocIfNil('test', true, {});
    expect(result).toHaveProperty('test', true);
  });

  test('should add new value to object if undefined', () => {
    const result = assocIfNil('test', true, { test: undefined });
    expect(result).toHaveProperty('test', true);
  });

  test('should add new value to object if null', () => {
    const result = assocIfNil('test', true, { test: null });
    expect(result).toHaveProperty('test', true);
  });

  test('should not add new value to object if false', () => {
    const result = assocIfNil('test', true, { test: false });
    expect(result).toHaveProperty('test', false);
  });

  test('should not add new value to object if true', () => {
    const result = assocIfNil('test', false, { test: true });
    expect(result).toHaveProperty('test', true);
  });

  test('should not add new value to object if zero', () => {
    const result = assocIfNil('test', true, { test: 0 });
    expect(result).toHaveProperty('test', 0);
  });

  test('should not add new value to object if possitive number', () => {
    const result = assocIfNil('test', true, { test: 50 });
    expect(result).toHaveProperty('test', 50);
  });

  test('should not add new value to object if negative number', () => {
    const result = assocIfNil('test', true, { test: -50 });
    expect(result).toHaveProperty('test', -50);
  });

  test('should not add new value to object if string', () => {
    const result = assocIfNil('test', true, { test: 'boo' });
    expect(result).toHaveProperty('test', 'boo');
  });

  test('should keep other attributes unchanged', () => {
    const result = assocIfNil('test', true, { foo: 'boo' });
    expect(result).toHaveProperty('test', true);
    expect(result).toHaveProperty('foo', 'boo');
  });
});
