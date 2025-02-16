import { vi } from 'vitest';
import { AttributedString, Run } from '../../src/types';

/**
 * Test the bidi engine based on the string 'Lorem'
 * Returns emp if no runs present, or arbitrary bidi levels otherwise
 *
 *  *   L     o     r     e     m
 * |---- Level 1 ------|-- Level 2 -|
 *
 * @param attributedString
 * @return Attributed string
 */

export const bidiEngineImpl = vi.fn((attributedString: AttributedString) => {
  const runs: Run[] =
    attributedString.runs.length === 0
      ? []
      : [
          { start: 0, end: 3, attributes: { bidiLevel: 0 } },
          { start: 3, end: 5, attributes: { bidiLevel: 1 } },
        ];

  const res: AttributedString = Object.assign({}, attributedString, { runs });

  return res;
});

const bidiEngine = vi.fn(() => bidiEngineImpl);

export default bidiEngine;
