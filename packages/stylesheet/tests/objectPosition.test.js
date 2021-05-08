import processObjectPosition from '../src/objectPosition';

describe('stylesheet objectPosition transform', () => {
  test('should process objectPosition shorthand', () => {
    const styles = processObjectPosition('objectPosition', '20 30');

    expect(styles.objectPositionX).toBe(20);
    expect(styles.objectPositionY).toBe(30);
  });

  test('should process objectPosition shorthand percentages', () => {
    const styles = processObjectPosition('objectPosition', '20% 30%');

    expect(styles.objectPositionX).toBe('20%');
    expect(styles.objectPositionY).toBe('30%');
  });

  test('should keep objectPosition as it is', () => {
    const x = processObjectPosition('objectPositionX', '20%');
    const y = processObjectPosition('objectPositionY', '30%');

    expect(x.objectPositionX).toBe('20%');
    expect(y.objectPositionY).toBe('30%');
  });
});
