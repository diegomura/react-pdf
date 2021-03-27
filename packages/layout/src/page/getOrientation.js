import * as R from 'ramda';

const VALID_ORIENTATIONS = ['portrait', 'landscape'];

/**
 * Get page orientation. Defaults to portrait
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */
const getOrientation = R.compose(
  R.ifElse(
    R.includes(R.__, VALID_ORIENTATIONS),
    R.identity,
    R.always('portrait'),
  ),
  R.pathOr('portrait', ['props', 'orientation']),
);

export default getOrientation;
