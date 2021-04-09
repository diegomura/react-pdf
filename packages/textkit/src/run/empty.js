import * as R from 'ramda';

/**
 * Returns empty run
 *
 * @return {Object} empty run
 */
const empty = R.always({
  start: 0,
  end: 0,
  glyphIndices: [],
  glyphs: [],
  positions: [],
  attributes: {},
});

export default empty;
