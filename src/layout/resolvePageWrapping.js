import * as R from 'ramda';

import { resolvePageSize } from './resolvePageSizes';
import resolvePageBreaks from './resolvePageBreaks';
import resolvePageSplitting from './resolvePageSplitting';

const restorePageSize = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(resolvePageSize('box')),
    }),
  ),
});

const resolvePageWrapping = R.compose(
  restorePageSize,
  resolvePageSplitting,
  resolvePageBreaks,
);

export default resolvePageWrapping;
