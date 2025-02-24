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

  current.style.height = height - nodeTop;

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
  });

  if (nextHeight) {
    next.style.height = nextHeight;
  }

  return [current, next];
};

export default splitNode;
