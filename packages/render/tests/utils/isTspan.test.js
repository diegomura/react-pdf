import * as P from '@react-pdf/primitives';
import isTspan from '../../src/utils/isTspan';

const ASSERTED_TYPE = P.Tspan;
const PRIMITIVES = Object.keys(P);

describe('is tspan instance util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isTspan({ type })).toBe(isAssertedType);
    });
  });
});
