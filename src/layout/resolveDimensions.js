import * as R from 'ramda';
import Yoga from 'yoga-layout';

import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import getPosition from '../node/getPosition';
import getDimension from '../node/getDimension';
import getBorderWidth from '../node/getBorderWidth';
import setFlex from '../node/setFlex';
import setDisplay from '../node/setDisplay';
import setOverflow from '../node/setOverflow';
import setFlexWrap from '../node/setFlexWrap';
import setFlexGrow from '../node/setFlexGrow';
import setFlexBasis from '../node/setFlexBasis';
import setAlignSelf from '../node/setAlignSelf';
import setFlexShrink from '../node/setFlexShrink';
import setAspectRatio from '../node/setAspectRatio';
import setAlignContent from '../node/setAlignContent';
import setPositionType from '../node/setPositionType';
import setFlexDirection from '../node/setFlexDirection';
import setJustifyContent from '../node/setJustifyContent';
import {
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
} from '../node/setMargin';
import {
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
} from '../node/setPadding';
import {
  setBorderTop,
  setBorderRight,
  setBorderBottom,
  setBorderLeft,
} from '../node/setBorderWidth';
import {
  setPositionTop,
  setPositionRight,
  setPositionBottom,
  setPositionLeft,
} from '../node/setPosition';
import {
  setWidth,
  setHeight,
  setMinWidth,
  setMaxWidth,
  setMinHeight,
  setMaxHeight,
} from '../node/setDimension';

const YOGA_NODE = '_yogaNode';

const isNotTextInstance = R.complement(R.propEq)('type', 'TEXT_INSTANCE');

const insertYogaNodes = parent =>
  R.tap(child => parent.insertChild(child[YOGA_NODE], parent.getChildCount()));

const setYogaValues = R.tap(node => {
  R.compose(
    setWidth(node.box.width || node.style.width),
    setHeight(node.box.height || node.style.height),
    setMinWidth(node.style.minWidth),
    setMaxWidth(node.style.maxWidth),
    setMinHeight(node.style.minHeight),
    setMaxHeight(node.style.maxHeight),
    setMarginTop(node.style.marginTop),
    setMarginRight(node.style.marginRight),
    setMarginBottom(node.style.marginBottom),
    setMarginLeft(node.style.marginLeft),
    setPaddingTop(node.style.paddingTop),
    setPaddingRight(node.style.paddingRight),
    setPaddingBottom(node.style.paddingBottom),
    setPaddingLeft(node.style.paddingLeft),
    setPositionType(node.style.position),
    setPositionTop(node.style.top),
    setPositionRight(node.style.right),
    setPositionBottom(node.style.bottom),
    setPositionLeft(node.style.left),
    setBorderTop(node.style.borderTopWidth),
    setBorderRight(node.style.borderRightWidth),
    setBorderBottom(node.style.borderBottomWidth),
    setBorderLeft(node.style.borderLeftWidth),
    setDisplay(node.style.display),
    setFlexDirection(node.style.flexDirection),
    setAlignSelf(node.style.alignSelf),
    setAlignContent(node.style.alignContent),
    setJustifyContent(node.style.justifyContent),
    setFlexWrap(node.style.flexWrap),
    setOverflow(node.style.overflow),
    setAspectRatio(node.style.aspectRatio),
    setFlex(node.style.flex),
    setFlexBasis(node.style.flexBasis),
    setFlexGrow(node.style.flexGrow),
    setFlexShrink(node.style.flexShrink),
  )(node);
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
  return R.evolve({
    children: R.map(R.when(isNotTextInstance, persistDimensions)),
    box: R.always(
      R.mergeAll([
        getPadding(node),
        getMargin(node),
        getBorderWidth(node),
        getPosition(node),
        getDimension(node),
      ]),
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
