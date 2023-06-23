import { get } from '@nutshelllabs/fns';

import lineIndexAtHeight from './lineIndexAtHeight';
import heightAtLineIndex from './heightAtLineIndex';

const getLineBreak = (node, height) => {
  const top = get(node, ['box', 'top'], 0);
  const widows = get(node, ['props', 'widows'], 2);
  const orphans = get(node, ['props', 'orphans'], 2);
  const linesQuantity = node.lines.length;
  const slicedLine = lineIndexAtHeight(node, height - top);

  if (slicedLine === 0) {
    return 0;
  }

  if (linesQuantity < orphans) {
    return linesQuantity;
  }

  if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return 0;
  }

  if (linesQuantity === orphans + widows) {
    return orphans;
  }

  if (linesQuantity - slicedLine < widows) {
    return linesQuantity - widows;
  }

  return slicedLine;
};

// Also receives contentArea in case it's needed
const splitText = (node, height) => {
  const slicedLineIndex = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;

  const current = Object.assign({}, node, {
    box: {
      ...node.box,
      height: currentHeight,
      borderBottomWidth: 0,
    },
    style: {
      ...node.style,
      marginBottom: 0,
      paddingBottom: 0,
      borderBottomWidth: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    lines: node.lines.slice(0, slicedLineIndex),
  });

  const next = Object.assign({}, node, {
    box: {
      ...node.box,
      top: 0,
      height: nextHeight,
      borderTopWidth: 0,
    },
    style: {
      ...node.style,
      marginTop: 0,
      paddingTop: 0,
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    lines: node.lines.slice(slicedLineIndex),
  });

  return [current, next];
};

export default splitText;
