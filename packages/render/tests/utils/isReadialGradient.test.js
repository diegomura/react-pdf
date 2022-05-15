import * as P from '@react-pdf/primitives';
import isRadialGradient from '../../src/utils/isRadialGradient';

const ASSERTED_TYPE = P.RadialGradient;
const PRIMITIVES = Object.keys(P);

describe('is radial gradient util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isRadialGradient({ type })).toBe(isAssertedType);
    });
  });
});
