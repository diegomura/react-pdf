import { adjust, dropLast as arrayDropLast } from '@react-pdf/fns';

import runDropLast from '../run/dropLast';
import { AttributedString } from '../types';

/**
 * Drop last glyph
 *
 * @param attributedString - Attributed string
 * @returns Attributed string with new glyph
 */
const dropLast = (attributedString: AttributedString) => {
  const string = arrayDropLast(attributedString.string);
  const runs = adjust(-1, runDropLast, attributedString.runs);

  return Object.assign({}, attributedString, { string, runs });
};

export default dropLast;
