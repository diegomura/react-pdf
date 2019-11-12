import * as R from 'ramda';

import getDefs from './getDefs';
import isDefs from '../node/isDefs';

const isNotDefs = R.complement(isDefs);

const detachDefs = R.evolve({
  children: R.filter(isNotDefs),
});

const replaceDef = defs =>
  R.compose(
    R.prop(R.__, defs),
    R.prop(1),
    R.match(/url\(#(.+)\)/),
  );

const parseNodeDefs = defs => node =>
  R.compose(
    R.evolve({
      props: R.evolve({
        clipPath: replaceDef(defs),
      }),
    }),
    R.evolve({ children: R.map(parseNodeDefs(defs)) }),
  )(node);

const parseDefs = root => {
  const defs = getDefs(root);
  return R.evolve({ children: R.map(parseNodeDefs(defs)) }, root);
};

const replaceDefs = R.compose(
  detachDefs,
  parseDefs,
);

export default replaceDefs;
