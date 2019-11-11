import * as R from 'ramda';

import { INHERITED_PROPERTIES } from '../constants';

const getInheritProps = R.compose(
  R.pick(INHERITED_PROPERTIES),
  R.propOr({}, 'props'),
);

const inheritProps = node => {
  const props = getInheritProps(node);

  return R.evolve({
    children: R.map(
      R.compose(
        inheritProps,
        R.evolve({
          props: R.merge(props),
        }),
      ),
    ),
  })(node);
}

export default inheritProps;
