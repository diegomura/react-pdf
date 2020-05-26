import * as P from '@react-pdf/primitives';
import isSvg from '../../src/utils/isSvg';

const ASSERTED_TYPE = P.SVG;
const PRIMITIVES = Object.keys(P.default);

describe('is svg util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isSvg({ type })).toBe(isAssertedType);
    });
  });
});
