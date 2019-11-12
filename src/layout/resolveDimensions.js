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
import setAlignItems from '../node/setAlignItems';
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
import isSvg from '../node/isSvg';
import isText from '../node/isText';
import isNote from '../node/isNote';
import isPage from '../node/isPage';
import isImage from '../node/isImage';
import isCanvas from '../node/isCanvas';
import measureSvg from '../svg/measureSvg';
import measureText from '../text/measureText';
import measureImage from '../image/measureImage';
import measureCanvas from '../canvas/measureCanvas';
import isTextInstance from '../node/isTextInstance';

const YOGA_NODE = '_yogaNode';
const YOGA_CONFIG = Yoga.Config.create();

YOGA_CONFIG.setPointScaleFactor(0);

const setNodeHeight = node =>
  R.ifElse(
    isPage,
    setHeight(node.box.height),
    setHeight(node.box.height || node.style.height),
  );

/**
 * Set styles valeus into yoga node before layout calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const setYogaValues = R.tap(node => {
  R.compose(
    setNodeHeight(node),
    setWidth(node.style.width),
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
    setAlignItems(node.style.alignItems),
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

/**
 * Inserts child into parent' yoga node
 *
 * @param {Object} parent
 * @param {Object} node
 * @param {Object} node
 */
const insertYogaNodes = parent =>
  R.tap(child => parent.insertChild(child[YOGA_NODE], parent.getChildCount()));

const setMeasureFunc = page => node => {
  const yogaNode = node[YOGA_NODE];

  if (isText(node)) {
    yogaNode.setMeasureFunc(measureText(page, node));
  }

  if (isImage(node)) {
    yogaNode.setMeasureFunc(measureImage(page, node));
  }

  if (isCanvas(node)) {
    yogaNode.setMeasureFunc(measureCanvas(page, node));
  }

  if (isSvg(node)) {
    yogaNode.setMeasureFunc(measureSvg(page, node));
  }

  return node;
};

const isNotText = R.complement(isText);
const isNotNote = R.complement(isNote);
const isNotSvg = R.complement(isSvg);
const isNotTextInstance = R.complement(isTextInstance);
const isLayoutElement = R.allPass([isNotText, isNotNote, isNotSvg]);

/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */
const createYogaNodes = page => node => {
  const yogaNode = Yoga.Node.createWithConfig(YOGA_CONFIG);

  return R.compose(
    setMeasureFunc(page),
    R.when(
      isLayoutElement,
      R.evolve({
        children: R.map(
          R.compose(
            insertYogaNodes(yogaNode),
            createYogaNodes(page),
          ),
        ),
      }),
    ),
    setYogaValues,
    R.assoc(YOGA_NODE, yogaNode),
  )(node);
};

/**
 * Performs yoga calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const calculateLayout = R.tap(page => page[YOGA_NODE].calculateLayout());

/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param {Object} node
 * @returns {Object} node with box data
 */
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

/**
 * Removes and destroys yoga node frm document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */
const destroyYogaNodes = node => {
  return R.compose(
    R.dissoc(YOGA_NODE),
    R.tap(n => Yoga.Node.destroy(n[YOGA_NODE])),
    R.evolve({ children: R.map(R.when(isLayoutElement, destroyYogaNodes)) }),
  )(node);
};

/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param {Object} page object
 * @returns {Object} page object with correct 'box' layout attributes
 */
export const resolvePageDimensions = page =>
  R.ifElse(
    R.isNil,
    R.always(null),
    R.compose(
      destroyYogaNodes,
      persistDimensions,
      calculateLayout,
      createYogaNodes(page),
    ),
  )(page);

/**
 * Calculates root object layout using Yoga.
 *
 * @param {Object} root object
 * @returns {Object} root object with correct 'box' layout attributes
 */
const resolveDimensions = node =>
  R.evolve({
    children: R.map(resolvePageDimensions),
  })(node);

export default resolveDimensions;
