import * as P from '@react-pdf/primitives';
import isLine from '../../src/utils/isLine';

const ASSERTED_TYPE = P.Line;
const PRIMITIVES = Object.keys(P.default);

describe('is line util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isLine({ type })).toBe(isAssertedType);
    });
  });
});
