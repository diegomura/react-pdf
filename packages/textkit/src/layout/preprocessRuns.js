import { isNil } from '@react-pdf/fns';

import omit from '../run/omit';
import flatten from '../run/flatten';
import empty from '../attributedString/empty';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 *
 * @param {AttributedString} attributedString
 * @returns {AttributedString} attributed string without font
 */
function omitFont(attributedString) {
  const runs = attributedString.runs.map((run) => omit('font', run));
  return Object.assign({}, attributedString, { runs });
}

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 */
export default function preprocessRuns(engines, options) {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} processed attributed string
   */
  return (attributedString) => {
    if (isNil(attributedString)) return empty();

    const { string } = attributedString;
    const { fontSubstitution, scriptItemizer } = engines;

    const { runs: omittedFontRuns } = omitFont(attributedString);
    const { runs: substitutedRuns } =
      fontSubstitution(options)(attributedString);
    const { runs: itemizationRuns } = scriptItemizer(options)(attributedString);

    const runs = substitutedRuns
      .concat(itemizationRuns)
      .concat(omittedFontRuns);

    return { string, runs: flatten(runs) };
  };
}
