import * as R from 'ramda';

import removeMargins from '../node/removeMargins';

export default R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(removeMargins),
    }),
  ),
});
