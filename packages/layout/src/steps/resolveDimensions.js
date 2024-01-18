import * as P from '@react-pdf/primitives';
import { isNil, compose } from '@react-pdf/fns';
import Yoga from '../../yoga';

import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import getPosition from '../node/getPosition';
import getDimension from '../node/getDimension';
import getBorderWidth from '../node/getBorderWidth';
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
import { setRowGap, setColumnGap } from '../node/setGap';
import measureSvg from '../svg/measureSvg';
import measureText from '../text/measureText';
import measureImage from '../image/measureImage';
import measureCanvas from '../canvas/measureCanvas';

const YOGA_CONFIG = Yoga.Config.create();

YOGA_CONFIG.setPointScaleFactor(0);

const isType = type => node => node.type === type;

const isSvg = isType(P.Svg);
const isText = isType(P.Text);
const isNote = isType(P.Note);
const isPage = isType(P.Page);
const isImage = isType(P.Image);
const isCanvas = isType(P.Canvas);
const isTextInstance = isType(P.TextInstance);

const setNodeHeight = node => {
  const value = isPage(node) ? node.box.height : node.style.height;
  return setHeight(value);
};

/**
 * Set styles valeus into yoga node before layout calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const setYogaValues = node => {
  compose(
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
    setFlexBasis(node.style.flexBasis),
    setFlexGrow(node.style.flexGrow),
    setFlexShrink(node.style.flexShrink),
    setRowGap(node.style.rowGap),
    setColumnGap(node.style.columnGap),
  )(node);
};

/**
 * Inserts child into parent' yoga node
 *
 * @param {Object} parent
 * @param {Object} node
 * @param {Object} node
 */
const insertYogaNodes = parent => child => {
  parent.insertChild(child.yogaNode, parent.getChildCount());
  return child;
};

const setMeasureFunc = (node, page, fontStore) => {
  const { yogaNode } = node;

  if (isText(node)) {
    yogaNode.setMeasureFunc(measureText(page, node, fontStore));
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

const isLayoutElement = node => !isText(node) && !isNote(node) && !isSvg(node);

/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */
const createYogaNodes = (page, fontStore) => node => {
  const yogaNode = Yoga.Node.createWithConfig(YOGA_CONFIG);

  const result = Object.assign({}, node, { yogaNode });

  setYogaValues(result);

  if (isLayoutElement(node) && node.children) {
    const resolveChild = compose(
      insertYogaNodes(yogaNode),
      createYogaNodes(page, fontStore),
    );

    result.children = node.children.map(resolveChild);
  }

  setMeasureFunc(result, page, fontStore);

  return result;
};

/**
 * Performs yoga calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const calculateLayout = page => {
  page.yogaNode.calculateLayout();
  return page;
};

/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param {Object} node
 * @returns {Object} node with box data
 */
const persistDimensions = node => {
  if (isTextInstance(node)) return node;

  const box = Object.assign(
    getPadding(node),
    getMargin(node),
    getBorderWidth(node),
    getPosition(node),
    getDimension(node),
  );

  const newNode = Object.assign({}, node, { box });

  if (!node.children) return newNode;

  const children = node.children.map(persistDimensions);

  return Object.assign({}, newNode, { children });
};

/**
 * Removes yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */
const destroyYogaNodes = node => {
  const newNode = Object.assign({}, node);

  delete newNode.yogaNode;

  if (!node.children) return newNode;

  const children = node.children.map(destroyYogaNodes);

  return Object.assign({}, newNode, { children });
};

/**
 * Free yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */
const freeYogaNodes = node => {
  if (node.yogaNode) node.yogaNode.freeRecursive();
  return node;
};

/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param {Object} page object
 * @returns {Object} page object with correct 'box' layout attributes
 */
export const resolvePageDimensions = (page, fontStore) => {
  if (isNil(page)) return null;

  return compose(
    destroyYogaNodes,
    freeYogaNodes,
    persistDimensions,
    calculateLayout,
    createYogaNodes(page, fontStore),
  )(page);
};

/**
 * Calculates root object layout using Yoga.
 *
 * @param {Object} root object
 * @returns {Object} root object with correct 'box' layout attributes
 */
const resolveDimensions = (node, fontStore) => {
  if (!node.children) return node;

  const resolveChild = child => resolvePageDimensions(child, fontStore);
  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveDimensions;
