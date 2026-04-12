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

const splitText = (
  node: SafeTextNode,
  height: number,
  contentArea: number = Infinity,
) => {
  let slicedLineIndex = getLineBreak(node, height);

  // When no lines fit on the current page but lines exist, check if the first
  // line (e.g. a vertical text column) is taller than any page can accommodate.
  // If so, force at least one line onto the current page to prevent an infinite
  // pagination loop where the oversized line is endlessly pushed to the next page.
  if (slicedLineIndex === 0 && node.lines.length > 0) {
    const firstLineHeight = node.lines[0]?.box?.height || 0;

    if (firstLineHeight > contentArea) {
      slicedLineIndex = 1;
    }
  }

  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;

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

  const nextLines = node.lines.slice(slicedLineIndex);

  // If no lines remain for the next page, stop splitting. This prevents an
  // infinite pagination loop when all text content has been consumed but the
  // node still has a fixed height (from style) larger than the page.
  if (nextLines.length === 0) {
    return [current, null];
  }

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
    lines: nextLines,
  });

  return [current, next];
};

export default splitText;
