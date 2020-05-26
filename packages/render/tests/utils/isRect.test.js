import * as P from '@react-pdf/primitives';
import isRect from '../../src/utils/isRect';

const ASSERTED_TYPE = P.RECT;
const PRIMITIVES = Object.keys(P.default);

describe('is rect util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isRect({ type })).toBe(isAssertedType);
    });
  });
});
