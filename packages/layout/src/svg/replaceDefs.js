import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import getDefs from './getDefs';

const isDefs = R.propEq('type', P.Defs);

const isNotDefs = R.complement(isDefs);

const detachDefs = R.evolve({
  children: R.filter(isNotDefs),
});

const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

const replaceDef = defs =>
  R.compose(
    R.when(
      R.test(URL_REGEX),
      R.compose(
        R.prop(R.__, defs),
        R.prop(1),
        R.match(URL_REGEX),
      ),
    ),
    R.defaultTo(''),
  );

const parseNodeDefs = defs => node =>
  R.compose(
    R.evolve({
      props: R.evolve({
        fill: replaceDef(defs),
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
