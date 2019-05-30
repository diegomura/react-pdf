import * as R from 'ramda';
import Yoga from 'yoga-layout';

import matchPercent from '../utils/matchPercent';

const YOGA_NODE = '_yogaNode';

const capitalize = R.compose(
  R.join(''),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head,
    ),
    R.tail,
  ]),
);

const isNotTextInstance = R.complement(R.propEq)('type', 'TEXT_INSTANCE');

const insertYogaNodes = parent =>
  R.tap(child => parent.insertChild(child[YOGA_NODE], parent.getChildCount()));

const setDimension = attr => value =>
  R.tap(yogaNode => {
    if (value) {
      const fixedMethod = `set${capitalize(attr)}`;
      const percentMethod = `${fixedMethod}Percent`;
      const percent = matchPercent(value);

      if (percent) {
        yogaNode[percentMethod](percent.value);
      } else {
        yogaNode[fixedMethod](value);
      }
    }
  });

const setMargin = edge => value =>
  R.tap(yogaNode => {
    if (value) {
      yogaNode.setMargin(edge, value);
    }
  });

const setPadding = edge => value =>
  R.tap(yogaNode => {
    if (value) {
      yogaNode.setPadding(edge, value);
    }
  });

const setWidth = setDimension('width');
const setHeight = setDimension('height');
const setMarginTop = setMargin(Yoga.EDGE_TOP);
const setMarginRight = setMargin(Yoga.EDGE_RIGHT);
const setMarginBottom = setMargin(Yoga.EDGE_BOTTOM);
const setMarginLeft = setMargin(Yoga.EDGE_LEFT);
const setPaddingTop = setPadding(Yoga.EDGE_TOP);
const setPaddingRight = setPadding(Yoga.EDGE_RIGHT);
const setPaddingBottom = setPadding(Yoga.EDGE_BOTTOM);
const setPaddingLeft = setPadding(Yoga.EDGE_LEFT);

const setYogaValues = R.tap(node => {
  R.compose(
    setWidth(node.box.width || node.style.width),
    setHeight(node.box.height || node.style.height),
    setMarginTop(node.style.marginTop),
    setMarginRight(node.style.marginRight),
    setMarginBottom(node.style.marginBottom),
    setMarginLeft(node.style.marginLeft),
    setPaddingTop(node.style.paddingTop),
    setPaddingRight(node.style.paddingRight),
    setPaddingBottom(node.style.paddingBottom),
    setPaddingLeft(node.style.paddingLeft),
  )(node[YOGA_NODE]);
});

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
