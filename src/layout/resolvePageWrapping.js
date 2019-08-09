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

const removePagePadding = page => {
  const paddingTop = R.pathOr(0, ['box', 'paddingTop'], page);
  const paddingBottom = R.pathOr(0, ['box', 'paddingBottom'], page);

  return R.compose(
    R.assoc('_oldPadding', { paddingTop, paddingBottom }),
    R.evolve({
      box: {
        paddingTop: R.always(0),
        paddingBottom: R.always(0),
        height: R.subtract(R.__, paddingTop + paddingBottom),
      },
      children: R.map(
        R.evolve({
          box: { top: R.subtract(R.__, paddingTop) },
        }),
      ),
    }),
  )(page);
};

const restorePagePadding = page => {
  const paddingTop = R.pathOr(0, ['_oldPadding', 'paddingTop'], page);
  const paddingBottom = R.pathOr(0, ['_oldPadding', 'paddingBottom'], page);

  return R.compose(
    R.dissoc('_oldPadding'),
    R.evolve({
      box: {
        paddingTop: R.always(paddingTop),
        paddingBottom: R.always(paddingBottom),
        height: R.add(paddingTop + paddingBottom),
      },
      children: R.map(
        R.evolve({
          box: { top: R.add(paddingTop) },
        }),
      ),
    }),
  )(page);
};

const removePadding = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(removePagePadding),
    }),
  ),
});

const restorePadding = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(restorePagePadding),
    }),
  ),
});

const resolvePageWrapping = root => {
  return R.compose(
    // restorePageSize,
    // restorePadding,
    // resolvePageSplitting,
    resolvePageBreaks,
    removePadding,
  )(root);
};

export default resolvePageWrapping;
