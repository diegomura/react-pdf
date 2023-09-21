import * as P from '@react-pdf/primitives';
import shouldBreak from '../../src/node/shouldBreak';

describe('node shouldBreak', () => {
  test('should not break when the child has enough space on the page', () => {
    const result = shouldBreak(
      {
        box: { top: 50, height: 400 },
      },
      [],
      1000,
    );

    expect(result).toEqual(false);
  });

  test('should break when the child has enough space on the page', () => {
    const result = shouldBreak(
      {
        box: { top: 50, height: 400 },
        props: { break: true },
      },
      [],
      1000,
    );

    expect(result).toEqual(true);
  });

  test('should not break when the child can be wrapped', () => {
    const result = shouldBreak(
      {
        box: { top: 50, height: 1400 },
        props: { wrap: true },
      },
      [],
      1000,
    );

    expect(result).toEqual(false);
  });

  test('should break when the child is an unwrappable node', () => {
    const result = shouldBreak(
      {
        type: P.Image,
        box: { top: 50, height: 1400 },
        props: { wrap: true },
      },
      [],
      1000,
    );

    expect(result).toEqual(true);
  });

  test('should break when the child has wrapping disabled', () => {
    const result = shouldBreak(
      {
        box: { top: 50, height: 1400 },
        props: { wrap: false },
      },
      [],
      1000,
    );

    expect(result).toEqual(true);
  });

  test('should break when minPresenceAhead is large enough and there are overflowing siblings after the child', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 900, height: 200, marginTop: 0, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(true);
  });

  test('should break when minPresenceAhead is large enough and there are overflowing siblings due to margins after the child', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 1100, height: 0, marginTop: 200, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(true);
  });

  test('should not break when minPresenceAhead is not past the page end', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 100 },
      },
      [{ box: { top: 900, height: 200, marginTop: 0, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(false);
  });

  test('should not break when the siblings after the child do not overflow past the page end', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 900, height: 100, marginTop: 0, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(false);
  });

  test('should not break when the siblings after the child do not overflow past the page end, with margins', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 1000, height: 0, marginTop: 100, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(false);
  });

  test("should not break when only the last sibling's bottom margin overflows past the page end", () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 0, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 900, height: 100, marginTop: 0, marginBottom: 100 } }],
      1000,
    );

    expect(result).toEqual(false);
  });

  test('should not break due to minPresenceAhead when breaking does not improve presence, to avoid infinite loops', () => {
    const result = shouldBreak(
      {
        box: { top: 500, height: 400, marginTop: 500, marginBottom: 0 },
        props: { minPresenceAhead: 400 },
      },
      [{ box: { top: 900, height: 200, marginTop: 0, marginBottom: 0 } }],
      1000,
    );

    expect(result).toEqual(false);
  });
});
