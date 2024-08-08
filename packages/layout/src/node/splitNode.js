import { isNil } from '@react-pdf/fns';

const getTop = (node) => node.box?.top || 0;

const hasFixedHeight = (node) => !isNil(node.style?.height);

const splitNode = (node, height) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);

  const current = Object.assign({}, node, {
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

  const next = Object.assign({}, node, {
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
