import hasVerticalRuler from '../../src/node/hasVerticalRuler';

describe('node hasVerticalRuler', () => {
  test('should return false if no props available', () => {
    const node = { type: 'PAGE', props: {} };

    expect(hasVerticalRuler(node)).toBeFalsy();
  });

  test('should return false if horizontalRuler prop available', () => {
    const node = { type: 'PAGE', props: { horizontalRuler: true } };

    expect(hasVerticalRuler(node)).toBeFalsy();
  });

  test('should return true if verticalRuler prop available', () => {
    const node = { type: 'PAGE', props: { verticalRuler: true } };

    expect(hasVerticalRuler(node)).toBeTruthy();
  });

  test('should return true if ruler prop available', () => {
    const node = { type: 'PAGE', props: { ruler: true } };

    expect(hasVerticalRuler(node)).toBeTruthy();
  });
});
