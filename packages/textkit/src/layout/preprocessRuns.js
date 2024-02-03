import { isNil } from '@react-pdf/fns';

import omit from '../run/omit';
import flatten from '../run/flatten';
import empty from '../attributedString/empty';

const omitFont = (attributedString) => {
  const runs = attributedString.runs.map((run) => omit('font', run));
  return Object.assign({}, attributedString, { runs });
};

/**
 * @typedef {Function} PreprocessRuns
 * @param {Object} attributedString attributed string
 * @returns {Object} processed attributed string
 */

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @returns {PreprocessRuns} preprocess runs
 */
const preprocessRuns = (engines, options) => (attributedString) => {
  if (isNil(attributedString)) return empty();

  const { string } = attributedString;
  const { fontSubstitution, scriptItemizer } = engines;

  const { runs: omittedFontRuns } = omitFont(attributedString);
  const { runs: substitutedRuns } = fontSubstitution(options)(attributedString);
  const { runs: itemizationRuns } = scriptItemizer(options)(attributedString);

  const runs = substitutedRuns.concat(itemizationRuns).concat(omittedFontRuns);

  return { string, runs: flatten(runs) };
};

export default preprocessRuns;
