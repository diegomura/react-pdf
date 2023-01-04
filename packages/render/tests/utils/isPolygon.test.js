import * as P from '@govind-react-pdf/primitives';
import isPolygon from '../../src/utils/isPolygon';

const ASSERTED_TYPE = P.Polygon;
const PRIMITIVES = Object.keys(P.default);

describe('is polygon util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isPolygon({ type })).toBe(isAssertedType);
    });
  });
});
