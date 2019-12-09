import * as R from 'ramda';

import lineIndexAtHeight from './lineIndexAtHeight';
import heightAtLineIndex from './heightAtLineIndex';

const zero = R.always(0);

const getTop = R.pathOr(0, ['box', 'top']);

const getWidows = R.pathOr(2, ['props', 'widows']);

const getOrphans = R.pathOr(2, ['props', 'orphans']);

const getLineBreak = (node, height) => {
  const top = getTop(node);
  const widows = getWidows(node);
  const orphans = getOrphans(node);
  const linesQuantity = node.lines.length;
  const slicedLine = lineIndexAtHeight(node, height - top);

  if (slicedLine === 0) {
    return 0;
  } else if (linesQuantity < orphans) {
    return linesQuantity;
  } else if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return 0;
  } else if (linesQuantity === orphans + widows) {
    return orphans;
  } else if (linesQuantity - slicedLine < widows) {
    return linesQuantity - widows;
  }

  return slicedLine;
};

const splitText = (node, height) => {
  const slicedLineIndex = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;

  const current = R.evolve(
    {
      lines: R.slice(0, slicedLineIndex),
      style: R.evolve({
        marginBottom: zero,
        paddingBottom: zero,
        borderBottomWidth: zero,
        borderBottomLeftRadius: zero,
        borderBottomRightRadius: zero,
      }),
      box: {
        height: R.always(currentHeight),
        borderBottomWidth: zero,
      },
    },
    node,
  );

  const next = R.evolve(
    {
      lines: R.slice(slicedLineIndex, Infinity),
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
    },
    node,
  );

  return [current, next];
};

export default splitText;
