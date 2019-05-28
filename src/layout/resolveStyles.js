import * as R from 'ramda';

import flattenStyles from '../stylesheet/flatten';
import expandStyles from '../stylesheet/expandStyles';
import transformUnits from '../stylesheet/transformUnits';
import transformStyles from '../stylesheet/transformStyles';
import resolveMediaQueries from '../stylesheet/resolveMediaQueries';

const resolveStyles = container =>
  R.compose(
    transformUnits(container),
    transformStyles,
    expandStyles,
    resolveMediaQueries(container),
    flattenStyles,
  );

const resolveNodeStyles = page => node => {
  const container = R.propOr({}, 'box', page);

  return R.evolve({
    style: resolveStyles(container),
    children: R.map(resolveNodeStyles(page)),
  })(node);
};

const resolvePageStyles = page => {
  return R.evolve({
    children: R.map(resolveNodeStyles(page)),
  })(page);
};

export default R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(resolvePageStyles),
    }),
  ),
});
