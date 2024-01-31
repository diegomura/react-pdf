import { last } from '@react-pdf/fns';

import runTrailingOffset from '../run/trailingOffset';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string trailing white space offset
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} trailing white space offset
 */
export default function trailingOffset(attributedString) {
  const runs = attributedString.runs || [];

  return runTrailingOffset(last(runs));
}
