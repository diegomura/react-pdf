import * as R from 'ramda';

import isDefs from '../node/isDefs';

const isNotDefs = R.complement(isDefs);

const detachDefs = R.evolve({
  children: R.filter(isNotDefs),
});

export default detachDefs;
