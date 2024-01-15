import { jest } from '@jest/globals';
import yogaModule from 'yoga-layout/sync';

import setDisplay from '../../src/node/setDisplay';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

describe('node setDisplay', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setDisplay: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setDisplay(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set flex by default', () => {
    const result = setDisplay(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_FLEX);
    expect(result).toBe(node);
  });

  test('Should set flex', () => {
    const result = setDisplay('flex')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_FLEX);
    expect(result).toBe(node);
  });

  test('Should set none', () => {
    const result = setDisplay('none')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_NONE);
    expect(result).toBe(node);
  });
});
