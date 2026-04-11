import * as P from '@react-pdf/primitives';
import { isNil, matchPercent, compose } from '@react-pdf/fns';
import * as Yoga from 'yoga-layout/load';
import FontStore from '@react-pdf/font';

import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import getPosition from '../node/getPosition';
import getDimension from '../node/getDimension';
import getBorderWidth from '../node/getBorderWidth';
import measureSvg from '../svg/measureSvg';
import measureText from '../text/measureText';
import measureImage from '../image/measureImage';
import measureCanvas from '../canvas/measureCanvas';
import {
  Box,
  SafeDocumentNode,
  SafeNode,
  SafePageNode,
  YogaInstance,
} from '../types';

const isSvg = (node) => node.type === P.Svg;
const isText = (node) => node.type === P.Text;
const isNote = (node) => node.type === P.Note;
const isPage = (node) => node.type === P.Page;
const isImage = (node) => node.type === P.Image;
const isCanvas = (node) => node.type === P.Canvas;
const isTextInstance = (node) => node.type === P.TextInstance;

const FLEX_DIRECTIONS = {
  row: Yoga.FlexDirection.Row,
  'row-reverse': Yoga.FlexDirection.RowReverse,
  'column-reverse': Yoga.FlexDirection.ColumnReverse,
};

const JUSTIFY_CONTENT = {
  center: Yoga.Justify.Center,
  'flex-end': Yoga.Justify.FlexEnd,
  'space-between': Yoga.Justify.SpaceBetween,
  'space-around': Yoga.Justify.SpaceAround,
  'space-evenly': Yoga.Justify.SpaceEvenly,
};

const ALIGN = {
  'flex-start': Yoga.Align.FlexStart,
  center: Yoga.Align.Center,
  'flex-end': Yoga.Align.FlexEnd,
  stretch: Yoga.Align.Stretch,
  baseline: Yoga.Align.Baseline,
  'space-between': Yoga.Align.SpaceBetween,
  'space-around': Yoga.Align.SpaceAround,
  'space-evenly': Yoga.Align.SpaceEvenly,
};

const FLEX_WRAP = {
  wrap: Yoga.Wrap.Wrap,
  'wrap-reverse': Yoga.Wrap.WrapReverse,
};

const OVERFLOW = {
  hidden: Yoga.Overflow.Hidden,
  scroll: Yoga.Overflow.Scroll,
};

const POSITION = {
  absolute: Yoga.PositionType.Absolute,
  relative: Yoga.PositionType.Relative,
  static: Yoga.PositionType.Static,
};

/**
 * Set a numeric/percentage/auto value on a yoga node.
 * Calls setFoo / setFooPercent / setFooAuto, with or without an edge arg.
 */
const applyYogaValue = (
  yogaNode: any,
  setter: string,
  value: string | number | null | undefined,
  edge?: number,
) => {
  if (isNil(value)) return;

  const percent = matchPercent(value);
  const hasEdge = !isNil(edge);

  if (percent) {
    const fn = yogaNode[`${setter}Percent`];
    if (!fn) throw new Error(`You can't pass percentage values to ${setter}`);
    if (hasEdge) {
      fn.call(yogaNode, edge, percent.value);
    } else {
      fn.call(yogaNode, percent.value);
    }
  } else if (value === 'auto') {
    const fn = yogaNode[`${setter}Auto`];
    if (fn) {
      if (hasEdge) {
        fn.call(yogaNode, edge);
      } else {
        fn.call(yogaNode);
      }
    }
  } else if (hasEdge) {
    yogaNode[setter](edge, value);
  } else {
    yogaNode[setter](value);
  }
};

/**
 * Set styles values into yoga node before layout calculation
 */
const setYogaValues = (node: SafeNode) => {
  const { yogaNode } = node;
  if (!yogaNode) return;

  const { style } = node;
  const height = isPage(node) ? node.box?.height : style?.height;

  // Dimensions
  applyYogaValue(yogaNode, 'setHeight', height);
  applyYogaValue(yogaNode, 'setWidth', style.width);
  applyYogaValue(yogaNode, 'setMinWidth', style.minWidth);
  applyYogaValue(yogaNode, 'setMaxWidth', style.maxWidth);
  applyYogaValue(yogaNode, 'setMinHeight', style.minHeight);
  applyYogaValue(yogaNode, 'setMaxHeight', style.maxHeight);

  // Margin
  applyYogaValue(yogaNode, 'setMargin', style.marginTop, Yoga.Edge.Top);
  applyYogaValue(yogaNode, 'setMargin', style.marginRight, Yoga.Edge.Right);
  applyYogaValue(yogaNode, 'setMargin', style.marginBottom, Yoga.Edge.Bottom);
  applyYogaValue(yogaNode, 'setMargin', style.marginLeft, Yoga.Edge.Left);

  // Padding
  applyYogaValue(yogaNode, 'setPadding', style.paddingTop, Yoga.Edge.Top);
  applyYogaValue(yogaNode, 'setPadding', style.paddingRight, Yoga.Edge.Right);
  applyYogaValue(yogaNode, 'setPadding', style.paddingBottom, Yoga.Edge.Bottom);
  applyYogaValue(yogaNode, 'setPadding', style.paddingLeft, Yoga.Edge.Left);

  // Position
  if (!isNil(style.position))
    yogaNode.setPositionType(POSITION[style.position]);
  applyYogaValue(yogaNode, 'setPosition', style.top, Yoga.Edge.Top);
  applyYogaValue(yogaNode, 'setPosition', style.right, Yoga.Edge.Right);
  applyYogaValue(yogaNode, 'setPosition', style.bottom, Yoga.Edge.Bottom);
  applyYogaValue(yogaNode, 'setPosition', style.left, Yoga.Edge.Left);

  // Border
  applyYogaValue(yogaNode, 'setBorder', style.borderTopWidth, Yoga.Edge.Top);
  applyYogaValue(
    yogaNode,
    'setBorder',
    style.borderRightWidth,
    Yoga.Edge.Right,
  );
  applyYogaValue(
    yogaNode,
    'setBorder',
    style.borderBottomWidth,
    Yoga.Edge.Bottom,
  );
  applyYogaValue(yogaNode, 'setBorder', style.borderLeftWidth, Yoga.Edge.Left);

  // Display
  yogaNode.setDisplay(
    style.display === 'none' ? Yoga.Display.None : Yoga.Display.Flex,
  );

  // Flex
  yogaNode.setFlexDirection(
    FLEX_DIRECTIONS[style.flexDirection] || Yoga.FlexDirection.Column,
  );

  if (!isNil(style.alignSelf))
    yogaNode.setAlignSelf(ALIGN[style.alignSelf] || Yoga.Align.Auto);
  if (!isNil(style.alignContent))
    yogaNode.setAlignContent(ALIGN[style.alignContent] || Yoga.Align.Auto);
  yogaNode.setAlignItems(ALIGN[style.alignItems] || Yoga.Align.Stretch);

  if (!isNil(style.justifyContent))
    yogaNode.setJustifyContent(
      JUSTIFY_CONTENT[style.justifyContent] || Yoga.Justify.FlexStart,
    );

  yogaNode.setFlexWrap(FLEX_WRAP[style.flexWrap] || Yoga.Wrap.NoWrap);

  if (!isNil(style.overflow))
    yogaNode.setOverflow(OVERFLOW[style.overflow] || Yoga.Overflow.Visible);

  if (!isNil(style.aspectRatio)) yogaNode.setAspectRatio(style.aspectRatio);

  applyYogaValue(yogaNode, 'setFlexBasis', style.flexBasis);
  yogaNode.setFlexGrow(style.flexGrow || 0);
  yogaNode.setFlexShrink(style.flexShrink || 1);

  // Gap
  applyYogaValue(yogaNode, 'setGap', style.rowGap, Yoga.Gutter.Row);
  applyYogaValue(yogaNode, 'setGap', style.columnGap, Yoga.Gutter.Column);
};

/**
 * Inserts child into parent' yoga node
 *
 * @param parent parent
 * @returns Insert yoga nodes
 */
const insertYogaNodes = (parent) => (child) => {
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

const isLayoutElement = (node) =>
  !isText(node) && !isNote(node) && !isSvg(node);

/**
 * @typedef {Function} CreateYogaNodes
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */

/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @returns Create yoga nodes
 */
const createYogaNodes =
  (page: SafePageNode, fontStore: FontStore, yoga: YogaInstance) =>
  (node: SafeNode) => {
    const yogaNode = yoga.node.create();

    const result = Object.assign({}, node, { yogaNode });

    setYogaValues(result);

    if (isLayoutElement(node) && node.children) {
      const resolveChild = compose(
        insertYogaNodes(yogaNode),
        createYogaNodes(page, fontStore, yoga),
      );

      result.children = node.children.map(resolveChild);
    }

    setMeasureFunc(result, page, fontStore);

    return result;
  };

/**
 * Performs yoga calculation
 *
 * @param page - Page node
 * @returns Page node
 */
const calculateLayout = (page: SafePageNode) => {
  page.yogaNode.calculateLayout();
  return page;
};

/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param node
 * @returns Node with box data
 */
const persistDimensions = (node: SafeNode) => {
  if (isTextInstance(node)) return node;

  const box: Box = Object.assign(
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
 * @param node
 * @returns Node without yoga node
 */
const destroyYogaNodes = (node: SafeNode): SafeNode => {
  const newNode = Object.assign({}, node);

  delete newNode.yogaNode;

  if (!node.children) return newNode;

  const children = node.children.map(destroyYogaNodes);

  return Object.assign({}, newNode, { children });
};

/**
 * Free yoga node from document tree
 *
 * @param node
 * @returns Node without yoga node
 */
const freeYogaNodes = (node: SafeNode) => {
  if (node.yogaNode) node.yogaNode.freeRecursive();
  return node;
};

/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param page - Object
 * @returns Page object with correct 'box' layout attributes
 */
export const resolvePageDimensions = (
  page: SafePageNode,
  fontStore: FontStore,
  yoga: YogaInstance,
) => {
  if (isNil(page)) return null;

  return compose(
    destroyYogaNodes,
    freeYogaNodes,
    persistDimensions,
    calculateLayout,
    createYogaNodes(page, fontStore, yoga),
  )(page);
};

/**
 * Calculates root object layout using Yoga.
 *
 * @param node - Root object
 * @param fontStore - Font store
 * @returns Root object with correct 'box' layout attributes
 */
const resolveDimensions = (node: SafeDocumentNode, fontStore: FontStore) => {
  if (!node.children) return node;

  const resolveChild = (child: SafePageNode) =>
    resolvePageDimensions(child, fontStore, node.yoga);

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveDimensions;
