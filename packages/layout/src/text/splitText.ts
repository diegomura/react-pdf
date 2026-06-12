import lineIndexAtHeight from './lineIndexAtHeight';
import heightAtLineIndex from './heightAtLineIndex';
import { SafeTextNode } from '../types';

const getLineBreak = (node: SafeTextNode, height: number) => {
  const top = node.box?.top || 0;
  const widows = node.props.widows || 2;
  const orphans = node.props.orphans || 2;
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
const splitText = (node: SafeTextNode, height: number) => {
  const slicedLineIndex = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  // Compute next-half height from actual remaining line heights rather than
  // geometric remainder (node.box.height - currentHeight).  The geometric
  // form includes paddingTop (zeroed for the next-half by splitText) and
  // mishandles minHeight when all lines end up on the current page, leaving a
  // 0-line next node that yoga would render at minHeight, not at the ~1-2pt
  // remainder.
  const remainingLineHeight =
    heightAtLineIndex(node, node.lines.length) - currentHeight;
  const nextPaddingBottom =
    typeof node.box?.paddingBottom === 'number' ? node.box.paddingBottom : 0;
  const minH =
    typeof node.style?.minHeight === 'number' ? node.style.minHeight : 0;
  const nextHeight = Math.max(remainingLineHeight + nextPaddingBottom, minH);

  const current: SafeTextNode = Object.assign({}, node, {
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

  const next: SafeTextNode = Object.assign({}, node, {
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
