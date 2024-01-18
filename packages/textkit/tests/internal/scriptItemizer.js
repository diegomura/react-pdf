import { jest } from '@jest/globals';

/**
 * Test script itemizer based on the string 'Lorem'
 * Returns empty if no runs present, or arbitrary script itemization otherwise
 *
 *   L     o     r     e     m
 * |---- Latin ----|- Non-latin-|
 *
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */
export const scriptItemizerImpl = jest.fn(string => {
  const runs =
    string.runs.length === 0
      ? []
      : [
          { start: 0, end: 3, attributes: { script: 'Latin' } },
          { start: 3, end: 5, attributes: { script: 'Non-latin' } },
        ];

  return Object.assign({}, string, { runs });
});

const scriptItemizer = jest.fn(() => scriptItemizerImpl);

export default scriptItemizer;
