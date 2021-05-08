import processTransformOrigin from '../src/transformOrigin';

describe('stylesheet transformOrigin transform', () => {
  test('should process single value transformOrigin shorthand', () => {
    const style = processTransformOrigin('transformOrigin', '20');

    expect(style.transformOriginX).toBe(20);
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin shorthand', () => {
    const style = processTransformOrigin('transformOrigin', '20 30');

    expect(style.transformOriginX).toBe(20);
    expect(style.transformOriginY).toBe(30);
  });

  test('should process transformOrigin shorthand percentages', () => {
    const style = processTransformOrigin('transformOrigin', '20% 30%');

    expect(style.transformOriginX).toBe('20%');
    expect(style.transformOriginY).toBe('30%');
  });

  test('should process transformOrigin left shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'left');

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin top shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'top');

    expect(style.transformOriginX).toBe('50%');
    expect(style.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin right shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'right');

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin bottom shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'bottom');

    expect(style.transformOriginX).toBe('50%');
    expect(style.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin left top shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'left top');

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin left center shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'left center');

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin left bottom shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'left bottom');

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin right top shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'right top');

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin right center shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'right center');

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin right bottom shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'right bottom');

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin center shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'center');

    expect(style.transformOriginX).toBe('50%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should process transformOrigin center center shorthand', () => {
    const style = processTransformOrigin('transformOrigin', 'center center');

    expect(style.transformOriginX).toBe('50%');
    expect(style.transformOriginY).toBe('50%');
  });
});
