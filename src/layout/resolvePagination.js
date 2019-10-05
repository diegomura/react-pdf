import * as R from 'ramda';

import { resolvePageSize } from './resolvePageSizes';
import resolvePageSplitting from './resolvePageSplitting';

const restorePageSize = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(resolvePageSize('box')),
    }),
  ),
});

const resolvePagination = root => {
  return R.compose(
    restorePageSize,
    resolvePageSplitting,
  )(root);
};

export default resolvePagination;
