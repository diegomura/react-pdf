import { vi } from 'vitest';
import { AttributedString, Run } from '../../src/types';

/**
 * Test script itemizer based on the string 'Lorem'
 * Returns empty if no runs present, or arbitrary script itemization otherwise
 *
 *   L     o     r     e     m
 * |---- Latin ----|- Non-latin-|
 *
 * @param attributedString
 * @returns attributed string
 */
export const scriptItemizerImpl = vi.fn(
  (attributedString: AttributedString) => {
    const runs: Run[] =
      attributedString.runs.length === 0
        ? []
        : [
            { start: 0, end: 3, attributes: { script: 'Latin' } },
            { start: 3, end: 5, attributes: { script: 'Non-latin' } },
          ];

    const res: AttributedString = Object.assign({}, attributedString, { runs });

    return res;
  },
);

const scriptItemizer = vi.fn(() => scriptItemizerImpl);

export default scriptItemizer;
