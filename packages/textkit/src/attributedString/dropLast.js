import { adjust, dropLast as arrayDropLast } from '@react-pdf/fns';

import runDropLast from '../run/dropLast';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Drop last glyph
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string with new glyph
 */
const dropLast = (attributedString) => {
  const string = arrayDropLast(attributedString.string);
  const runs = adjust(-1, runDropLast, attributedString.runs);

  return Object.assign({}, attributedString, { string, runs });
};

export default dropLast;
