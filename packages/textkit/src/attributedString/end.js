import { last } from '@react-pdf/fns';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string end value
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} end
 */
export default function end(attributedString) {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
}
