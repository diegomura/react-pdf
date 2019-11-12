import * as R from 'ramda';

import { SVG_INHERITED_PROPS } from '../constants';

const getInheritProps = R.compose(
  R.pick(SVG_INHERITED_PROPS),
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
};

export default inheritProps;
