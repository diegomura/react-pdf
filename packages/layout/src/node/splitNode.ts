import { isNil } from '@react-pdf/fns';

import { SafeNode } from '../types';

const getTop = (node: SafeNode) => node.box?.top || 0;

const hasFixedHeight = (node: SafeNode) => !isNil(node.style?.height);

const splitNode = (node: SafeNode, height: number) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);

  const current: SafeNode = Object.assign({}, node, {
    box: {
      ...node.box,
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
  });

  // The leftover space of the page is a FLOOR, not a ceiling.
  //
  // react-pdf gives every node flexShrink: 1 (see setFlexShrink), so a fixed
  // height here does not only cut the box - yoga hands the missing space back
  // out by squeezing the children into it. A heading measured 13.3pt tall then
  // sits in a box of 7.6pt while its glyphs are still drawn at 13.3pt, so the
  // row beneath it is drawn straight through it. That is the squashed,
  // overlapping totals box at the foot of a page.
  //
  // minHeight keeps what the height was for - the box reaches down to the page
  // edge, so a background or a border still fills it - and lets the content
  // keep the height it was measured at. What does not fit is already on the
  // next page; anything left over spills into the bottom padding, where the
  // page simply ends.
  current.style.height = undefined;
  current.style.minHeight = height - nodeTop;

  const nextHeight = hasFixedHeight(node)
    ? node.box.height - (height - nodeTop)
    : null;

  const next: SafeNode = Object.assign({}, node, {
    box: {
      ...node.box,
      top: 0,
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
    props: {
      ...node.props,
      bookmark: null,
    },
  });

  if (nextHeight) {
    next.style.height = nextHeight;
  }

  return [current, next];
};

export default splitNode;
