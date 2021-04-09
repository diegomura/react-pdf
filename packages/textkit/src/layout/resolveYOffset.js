import * as R from 'ramda';

const getYOffset = R.pathOr(0, ['attributes', 'yOffset']);
const getUnitsPerEm = R.pathOr(0, ['attributes', 'font', 'unitsPerEm']);

/**
 * Resolves yOffset for run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunYOffset = run => {
  const unitsPerEm = getUnitsPerEm(run);
  const yOffset = getYOffset(run);
  const mult = yOffset * unitsPerEm;

  return R.evolve({
    positions: R.map(R.assoc('yOffset', mult)),
  })(run);
};

/**
 * Resolves yOffset for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */
const resolveYOffset = () =>
  R.evolve({
    runs: R.map(resolveRunYOffset),
  });

export default resolveYOffset;
