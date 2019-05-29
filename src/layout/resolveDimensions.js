import * as R from 'ramda';
import Yoga from 'yoga-layout';

const YOGA_NODE = '_yogaNode';

const isNotTextInstance = R.complement(R.propEq)('type', 'TEXT_INSTANCE');

const insertYogaNodes = parent =>
  R.tap(child => parent.insertChild(child[YOGA_NODE], parent.getChildCount()));

const setYogaValues = node => {
  const width = node.box.width || node.style.width;
  const height = node.box.height || node.style.height;

  if (width) node[YOGA_NODE].setWidth(width);
  if (height) node[YOGA_NODE].setHeight(height);
  if (node.style.marginTop)
    node[YOGA_NODE].setMargin(Yoga.EDGE_TOP, node.style.marginTop);
  if (node.style.marginRight)
    node[YOGA_NODE].setMargin(Yoga.EDGE_RIGHT, node.style.marginRight);
  if (node.style.marginBottom)
    node[YOGA_NODE].setMargin(Yoga.EDGE_BOTTOM, node.style.marginBottom);
  if (node.style.marginLeft)
    node[YOGA_NODE].setMargin(Yoga.EDGE_LEFT, node.style.marginLeft);
  if (node.style.paddingTop)
    node[YOGA_NODE].setPadding(Yoga.EDGE_TOP, node.style.paddingTop);
  if (node.style.paddingRight)
    node[YOGA_NODE].setPadding(Yoga.EDGE_RIGHT, node.style.paddingRight);
  if (node.style.paddingBottom)
    node[YOGA_NODE].setPadding(Yoga.EDGE_BOTTOM, node.style.paddingBottom);
  if (node.style.paddingLeft)
    node[YOGA_NODE].setPadding(Yoga.EDGE_LEFT, node.style.paddingLeft);

  return node;
};

const createYogaNodes = node => {
  const yogaNode = Yoga.Node.createDefault();

  return R.compose(
    R.evolve({
      children: R.map(
        R.when(
          isNotTextInstance,
          R.compose(
            insertYogaNodes(yogaNode),
            createYogaNodes,
          ),
        ),
      ),
    }),
    setYogaValues,
    R.assoc(YOGA_NODE, yogaNode),
  )(node);
};

const calculateLayout = R.tap(page => page[YOGA_NODE].calculateLayout());

const persistDimensions = node => {
  const yogaNode = node[YOGA_NODE];
  const layout = yogaNode.getComputedLayout();

  const minMaxLayout = {
    minWidth: yogaNode.getMinWidth().value,
    maxWidth: yogaNode.getMaxWidth().value,
    minHeight: yogaNode.getMinHeight().value,
    maxHeight: yogaNode.getMaxHeight().value,
  };

  const padding = {
    paddingTop: yogaNode.getComputedPadding(Yoga.EDGE_TOP) || 0,
    paddingRight: yogaNode.getComputedPadding(Yoga.EDGE_RIGHT) || 0,
    paddingBottom: yogaNode.getComputedPadding(Yoga.EDGE_BOTTOM) || 0,
    paddingLeft: yogaNode.getComputedPadding(Yoga.EDGE_LEFT) || 0,
  };

  const margin = {
    marginTop: yogaNode.getComputedMargin(Yoga.EDGE_TOP) || 0,
    marginRight: yogaNode.getComputedMargin(Yoga.EDGE_RIGHT) || 0,
    marginBottom: yogaNode.getComputedMargin(Yoga.EDGE_BOTTOM) || 0,
    marginLeft: yogaNode.getComputedMargin(Yoga.EDGE_LEFT) || 0,
  };

  const border = {
    borderTopWidth: yogaNode.getComputedBorder(Yoga.EDGE_TOP) || 0,
    borderRightWidth: yogaNode.getComputedBorder(Yoga.EDGE_RIGHT) || 0,
    borderBottomWidth: yogaNode.getComputedBorder(Yoga.EDGE_BOTTOM) || 0,
    borderLeftWidth: yogaNode.getComputedBorder(Yoga.EDGE_LEFT) || 0,
  };

  const position = {
    position:
      yogaNode.getPositionType() === Yoga.POSITION_TYPE_ABSOLUTE
        ? 'absolute'
        : 'relative',
  };

  return R.evolve({
    children: R.map(R.when(isNotTextInstance, persistDimensions)),
    box: R.always(
      R.mergeAll([layout, padding, margin, border, position, minMaxLayout]),
    ),
  })(node);
};

const destroyYogaNodes = node => {
  return R.compose(
    R.dissoc(YOGA_NODE),
    R.tap(n => Yoga.Node.destroy(n[YOGA_NODE])),
    R.tap(n => n[YOGA_NODE].unsetMeasureFunc()),
    R.evolve({ children: R.map(R.when(isNotTextInstance, destroyYogaNodes)) }),
  )(node);
};

const resolvePageDimensions = R.compose(
  destroyYogaNodes,
  persistDimensions,
  calculateLayout,
  createYogaNodes,
);

const resolveDimensions = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(resolvePageDimensions),
    }),
  ),
});

export default resolveDimensions;
