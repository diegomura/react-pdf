import processFontWeight from '../src/fontWeight';

describe('stylesheet font weight transform', () => {
  test('should process numeric value', () => {
    const styles = processFontWeight('fontWeight', 800);

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should process numeric string value', () => {
    const styles = processFontWeight('fontWeight', '800');

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should process thin value', () => {
    const styles = processFontWeight('fontWeight', 'thin');

    expect(styles).toEqual({ fontWeight: 100 });
  });

  test('should process hairline value', () => {
    const styles = processFontWeight('fontWeight', 'hairline');

    expect(styles).toEqual({ fontWeight: 100 });
  });

  test('should process ultralight value', () => {
    const styles = processFontWeight('fontWeight', 'ultralight');

    expect(styles).toEqual({ fontWeight: 200 });
  });

  test('should process extralight value', () => {
    const styles = processFontWeight('fontWeight', 'extralight');

    expect(styles).toEqual({ fontWeight: 200 });
  });

  test('should process light value', () => {
    const styles = processFontWeight('fontWeight', 'light');

    expect(styles).toEqual({ fontWeight: 300 });
  });

  test('should process normal value', () => {
    const styles = processFontWeight('fontWeight', 'normal');

    expect(styles).toEqual({ fontWeight: 400 });
  });

  test('should process medium value', () => {
    const styles = processFontWeight('fontWeight', 'medium');

    expect(styles).toEqual({ fontWeight: 500 });
  });

  test('should process semibold value', () => {
    const styles = processFontWeight('fontWeight', 'semibold');

    expect(styles).toEqual({ fontWeight: 600 });
  });

  test('should process demibold value', () => {
    const styles = processFontWeight('fontWeight', 'demibold');

    expect(styles).toEqual({ fontWeight: 600 });
  });

  test('should process bold value', () => {
    const styles = processFontWeight('fontWeight', 'bold');

    expect(styles).toEqual({ fontWeight: 700 });
  });

  test('should process ultrabold value', () => {
    const styles = processFontWeight('fontWeight', 'ultrabold');

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should process extrabold value', () => {
    const styles = processFontWeight('fontWeight', 'extrabold');

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should process heavy value', () => {
    const styles = processFontWeight('fontWeight', 'heavy');

    expect(styles).toEqual({ fontWeight: 900 });
  });

  test('should process black value', () => {
    const styles = processFontWeight('fontWeight', 'black');

    expect(styles).toEqual({ fontWeight: 900 });
  });
});
