import * as P from '@react-pdf/primitives';
import isPolyline from '../../src/utils/isPolyline';

const ASSERTED_TYPE = P.POLYLINE;
const PRIMITIVES = Object.keys(P.default);

describe('is polyline util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isPolyline({ type })).toBe(isAssertedType);
    });
  });
});
