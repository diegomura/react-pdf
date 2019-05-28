import * as R from 'ramda';

import getPageSize from '../page/getSize';

const resolvePageSize = page => {
  const size = getPageSize(page);
  return R.evolve({ box: R.merge(size) })(page);
};

const resolvePageSizes = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(resolvePageSize),
    }),
  ),
});

export default resolvePageSizes;
