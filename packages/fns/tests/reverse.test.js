import reverse from '../src/reverse';

describe('reverse', () => {
  test('reverses arrays', () => {
    expect(reverse([])).toEqual([]);
    expect(reverse([1])).toEqual([1]);
    expect(reverse([1, 2])).toEqual([2, 1]);
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });
});
