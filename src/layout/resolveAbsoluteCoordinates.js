import * as R from 'ramda';

const resolveAbsoluteCoordinates = node => {
  const top = R.pathOr(0, ['box', 'top'], node);
  const left = R.pathOr(0, ['box', 'left'], node);

  return R.evolve({
    children: R.map(
      R.compose(
        resolveAbsoluteCoordinates,
        R.evolve({
          box: R.evolve({
            top: R.add(top),
            bottom: R.add(top),
            left: R.add(left),
            right: R.add(left),
          }),
        }),
      ),
    ),
  })(node);
};

export default resolveAbsoluteCoordinates;
