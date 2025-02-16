import { vi } from 'vitest';
import { AttributedString, Run } from '../../src/types';

/**
 * Test font substitution based on the string 'Lorem'
 * Returns empry if no runs present, or arbitrary font substitution otherwise
 *
 *   L     o     r     e     m
 * |- Courier -|-- Helvetica --|
 *
 * @param attributedString
 * @returns Attributed string
 */
export const fontSubstitutionImpl = vi.fn((attributedString) => {
  const runs: Run[] =
    attributedString.runs.length === 0
      ? []
      : [
          { start: 0, end: 2, attributes: { fontSize: 10 } },
          { start: 2, end: 5, attributes: { fontSize: 12 } },
        ];

  const res: AttributedString = Object.assign({}, attributedString, { runs });

  return res;
});

const fontSubstitutionEngine = vi.fn(() => fontSubstitutionImpl);

export default fontSubstitutionEngine;
