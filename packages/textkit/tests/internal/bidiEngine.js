import { vi } from 'vitest';

/**
 * Test the bidi engine based on the string 'Lorem'
 * Returns emp if no runs present, or arbitrary bidi levels otherwise
 *
 *  *   L     o     r     e     m
 * |---- Level 1 ------|-- Level 2 -|
 *
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */

export const bidiEngineImpl = vi.fn((string) => {
  const runs =
    string.runs.length === 0
      ? []
      : [
          { start: 0, end: 3, attributes: { bidiLevel: 0 } },
          { start: 3, end: 5, attributes: { bidiLevel: 1 } },
        ];

  return Object.assign({}, string, { runs });
});

const bidiEngine = vi.fn(() => bidiEngineImpl);

export default bidiEngine;
