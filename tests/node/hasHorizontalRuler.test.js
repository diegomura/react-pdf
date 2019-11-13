import hasHorizontalRuler from '../../src/node/hasHorizontalRuler';

describe('node hasHorizontalRuler', () => {
  test('should return false if no props available', () => {
    const node = { type: 'PAGE', props: {} };

    expect(hasHorizontalRuler(node)).toBeFalsy();
  });

  test('should return false if verticalRuler prop available', () => {
    const node = { type: 'PAGE', props: { verticalRuler: true } };

    expect(hasHorizontalRuler(node)).toBeFalsy();
  });

  test('should return true if horizontalRuler prop available', () => {
    const node = { type: 'PAGE', props: { horizontalRuler: true } };

    expect(hasHorizontalRuler(node)).toBeTruthy();
  });

  test('should return true if ruler prop available', () => {
    const node = { type: 'PAGE', props: { ruler: true } };

    expect(hasHorizontalRuler(node)).toBeTruthy();
  });
});
