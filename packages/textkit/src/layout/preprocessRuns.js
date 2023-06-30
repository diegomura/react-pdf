import { isNil } from '@nutshelllabs/fns';

import empty from '../attributedString/empty';

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} processed attributed string
 */
const preprocessRuns = (engines, options) => attributedString => {
  if (isNil(attributedString)) return empty();

  const { fontSubstitution } = engines;
  fontSubstitution(options)(attributedString);

  return attributedString;
};

export default preprocessRuns;
