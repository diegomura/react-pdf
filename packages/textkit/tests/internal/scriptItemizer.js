import { vi } from 'vitest';

/**
 * Test script itemizer based on the string 'Lorem'
 * Returns empty if no runs present, or arbitrary script itemization otherwise
 *
 *   L     o     r     e     m
 * |---- Latin ----|- Non-latin-|
 *
 * @param {Object}  attributed string
 * @returns {Object} attributed string
 */
export const scriptItemizerImpl = vi.fn((string) => {
  const runs =
    string.runs.length === 0
      ? []
      : [
          { start: 0, end: 3, attributes: { script: 'Latin' } },
          { start: 3, end: 5, attributes: { script: 'Non-latin' } },
        ];

  return Object.assign({}, string, { runs });
});

const scriptItemizer = vi.fn(() => scriptItemizerImpl);

export default scriptItemizer;
