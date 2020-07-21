import parsePoints from '../../src/svg/parsePoints';

describe('svg parsePoints', () => {
  test('should return empty array for null argument', () => {
    const points = parsePoints(null);
    expect(points).toHaveLength(0);
  });

  test('should return empty array for empty string', () => {
    const points = parsePoints('');
    expect(points).toHaveLength(0);
  });

  test('should correctly parse svg points', () => {
    const points = parsePoints('20,20 40,25 60,40 80,120 120,140 200,180');

    expect(points[0]).toEqual([20, 20]);
    expect(points[1]).toEqual([40, 25]);
    expect(points[2]).toEqual([60, 40]);
    expect(points[3]).toEqual([80, 120]);
    expect(points[4]).toEqual([120, 140]);
    expect(points[5]).toEqual([200, 180]);
  });

  test('should trim leading spaces', () => {
    const points = parsePoints('   20,20');

    expect(points[0]).toEqual([20, 20]);
  });

  test('should trim trailing spaces', () => {
    const points = parsePoints('20,20   ');

    expect(points[0]).toEqual([20, 20]);
  });

  test('should parse float values', () => {
    const points = parsePoints('20.5,20.5');

    expect(points[0]).toEqual([20.5, 20.5]);
  });
});
