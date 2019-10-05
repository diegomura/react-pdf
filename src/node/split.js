import * as R from 'ramda';

const getTop = R.pathOr(0, ['box', 'top']);

const getHeight = R.path(['box', 'height']);

const getChildren = R.propOr([], 'children');

const isElementOutside = R.useWith(R.lte, [R.identity, getTop]);

const splitNodes = (height, nodes) => {
  const currentChildren = [];
  const nextChildren = [];

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];
    const [currentChild, nextChild] = splitNode(height, child);

    if (currentChild) currentChildren.push(currentChild);
    if (nextChild) nextChildren.push(nextChild);
  }

  return [currentChildren, nextChildren];
};

const splitChildren = (height, node) => {
  const children = getChildren(node);
  const availableHeight = height - getTop(node);
  return splitNodes(availableHeight, children);
};

const splitNode = (height, node) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);
  const nodeHeight = getHeight(node);
  const isOutside = isElementOutside(height, node);
  const shouldSplit = height < nodeTop + nodeHeight;

  if (isOutside) {
    const next = R.evolve({ box: { top: R.subtract(R.__, height) } })(node);
    return [null, next];
  }

  if (shouldSplit) {
    const [currentChilds, nextChildren] = splitChildren(height, node);

    const current = R.evolve({
      children: R.always(currentChilds),
      style: {
        borderBottomLeftRadius: R.always(0),
        borderBottomRightRadius: R.always(0),
      },
      box: {
        height: R.when(R.always(shouldSplit), R.always(height - nodeTop)),
      },
    })(node);

    const next = R.evolve({
      children: R.always(nextChildren),
      style: {
        borderTopLeftRadius: R.always(0),
        borderTopRightRadius: R.always(0),
      },
      box: {
        top: R.always(0),
        height: R.subtract(R.__, height - nodeTop),
      },
    })(node);

    return [current, next];
  }

  return [node, null];
};

export default R.curryN(2, splitNode);
