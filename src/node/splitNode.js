import * as R from 'ramda';

const zero = R.always(0);

const getTop = R.pathOr(0, ['box', 'top']);

const hasFixedHeight = R.hasPath(['style', 'height']);

const subtractHeight = value =>
  R.o(R.subtract(R.__, value), R.path(['box', 'height']));

const splitNode = (node, height) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);

  // TODO: We should keep style untouched
  const current = R.evolve({
    style: R.evolve({
      marginBottom: zero,
      paddingBottom: zero,
      borderBottomWidth: zero,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero,
    }),
    box: {
      height: R.always(height - nodeTop),
      borderBottomWidth: zero,
    },
  })(node);

  const nextHeight = R.ifElse(
    hasFixedHeight,
    subtractHeight(height - nodeTop),
    R.always(null),
  )(node);

  // TODO: We should keep style untouched
  const next = R.evolve({
    style: R.evolve({
      marginTop: zero,
      paddingTop: zero,
      borderTopWidth: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero,
    }),
    box: {
      top: zero,
      height: R.always(nextHeight),
      borderTopWidth: zero,
    },
  })(node);

  return [current, next];
};

export default splitNode;
