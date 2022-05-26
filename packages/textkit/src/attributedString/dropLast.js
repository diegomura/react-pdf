import runDropLast from '../run/dropLast';
import adjust from '../../../fns/adjust';
import arrayDropLast from '../../../fns/dropLast';

/**
 * Drop last glyph
 *
 * @param {Object} attributed string
 * @return {Object} attributed string with new glyph
 */
const dropLast = attributeString => {
  const string = arrayDropLast(attributeString.string);
  const runs = adjust(-1, runDropLast, attributeString.runs);

  return Object.assign({}, attributeString, { string, runs });
};

export default dropLast;
