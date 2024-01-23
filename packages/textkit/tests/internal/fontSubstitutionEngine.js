import { vi } from 'vitest';

/**
 * Test font substitution based on the string 'Lorem'
 * Returns empry if no runs present, or arbitrary font substitution otherwise
 *
 *   L     o     r     e     m
 * |- Courier -|-- Helvetica --|
 *
 * @param {Object}  attributed string
 * @returns {Object} attributed string
 */
export const fontSubstitutionImpl = vi.fn(string => {
  const runs =
    string.runs.length === 0
      ? []
      : [
          { start: 0, end: 2, attributes: { font: 'Courier' } },
          { start: 2, end: 5, attributes: { font: 'Helvetica' } },
        ];

  return Object.assign({}, string, { runs });
});

const fontSubstitutionEngine = vi.fn(() => fontSubstitutionImpl);

export default fontSubstitutionEngine;
