import * as R from 'ramda';

import { PORTRAIT, LANDSCAPE } from '../constants';

const VALID_ORIENTATIONS = [PORTRAIT, LANDSCAPE];

/**
 * Get page orientation. Defaults to landscape
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */
const getOrientation = R.compose(
  R.ifElse(
    R.includes(R.__, VALID_ORIENTATIONS),
    R.identity,
    R.always(LANDSCAPE),
  ),
  R.pathOr(LANDSCAPE, ['props', 'orientation']),
);

export default getOrientation;
