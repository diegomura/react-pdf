import * as P from '@govind-react-pdf/primitives';
import isCanvas from '../../src/utils/isCanvas';

const ASSERTED_TYPE = P.Canvas;
const PRIMITIVES = Object.keys(P.default);

describe('is canvas util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isCanvas({ type })).toBe(isAssertedType);
    });
  });
});
