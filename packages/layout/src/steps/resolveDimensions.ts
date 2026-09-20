import * as P from '@react-pdf/primitives';
import { isNil } from '@react-pdf/fns';
import FontStore from '@react-pdf/font';
import { Style, TaffyTree } from 'taffy-layout';

import toTaffyStyle from '../node/toTaffyStyle';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import measureSvg from '../svg/measureSvg';
import measureText from '../text/measureText';
import { getLinesLayoutWidth } from '../text/layoutText';
import measureImage from '../image/measureImage';
import measureCanvas from '../canvas/measureCanvas';
import {
  createMeasureDispatch,
  MeasureFunction,
  toNodeMeasure,
} from '../taffy/measure';
import {
  Box,
  SafeCanvasNode,
  SafeDocumentNode,
  SafeImageNode,
  SafeNode,
  SafePageNode,
  SafeSvgNode,
  SafeTextNode,
} from '../types';

const isType = (type) => (node) => node.type === type;

const isSvg = isType(P.Svg);
const isText = isType(P.Text);
const isNote = isType(P.Note);
const isImage = isType(P.Image);
const isCanvas = isType(P.Canvas);
const isTextInstance = isType(P.TextInstance);

const MAX_CONTENT = { width: 'max-content', height: 'max-content' } as const;

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

const isLayoutElement = (node: SafeNode) =>
  !isText(node) && !isNote(node) && !isSvg(node);

const getMeasureFunc = (
  node: SafeNode,
  page: SafePageNode,
  fontStore: FontStore,
): MeasureFunction | undefined => {
  if (isText(node)) return measureText(page, node as SafeTextNode, fontStore);
  if (isImage(node)) return measureImage(page, node as SafeImageNode);
  if (isCanvas(node)) return measureCanvas(page, node as SafeCanvasNode);
  if (isSvg(node)) return measureSvg(page, node as SafeSvgNode);
  return undefined;
};

/**
 * Creates a Taffy node for every layout node of the page subtree, storing
 * the id on `taffyNode`. Text, image, canvas and svg nodes carry their
 * measure function as node context.
 */
const createTaffyNodes =
  (tree: TaffyTree, page: SafePageNode, fontStore: FontStore) =>
  (node: SafeNode): SafeNode => {
    const result: SafeNode = Object.assign({}, node);
    const style = new Style(toTaffyStyle(result));
    const measure = getMeasureFunc(result, page, fontStore);

    const taffyNode = measure
      ? tree.newLeafWithContext(style, toNodeMeasure(measure))
      : tree.newLeaf(style);

    style.free();
    result.taffyNode = taffyNode;

    if (isLayoutElement(node) && node.children) {
      const create = createTaffyNodes(tree, page, fontStore);

      result.children = (node.children as SafeNode[]).map((child) => {
        const resolved = create(child);
        tree.addChild(taffyNode, resolved.taffyNode!);
        return resolved;
      }) as any;
    }

    return result;
  };

/**
 * Text lines are broken against the width Taffy offered while measuring,
 * but the node's box may end up narrower (shrink-wrapped). textkit already
 * aligned the lines inside the wider container, so the renderer shifts them
 * back by the difference.
 */
const getAlignOffset = (node: SafeTextNode, box: Box) => {
  if (!node.lines?.length || node.exclusions?.length) return 0;

  const factor = ALIGNMENT_FACTORS[node.style?.textAlign] || 0;
  if (!factor) return 0;

  const layoutWidth = getLinesLayoutWidth(node.lines);
  if (layoutWidth === undefined) return 0;

  const contentWidth = box.width - box.paddingLeft - box.paddingRight;

  return Math.max(0, layoutWidth - contentWidth) * factor;
};

/**
 * Saves Taffy layout result into 'box' attribute of node and drops the
 * Taffy node id.
 *
 * @param tree - Taffy tree
 * @param node - Node
 * @param parent - Parent box size, for the right/bottom offsets
 * @returns Node with box data
 */
const persistDimensions = (
  tree: TaffyTree,
  node: SafeNode,
  parent?: { width: number; height: number },
): SafeNode => {
  if (isTextInstance(node)) return node;

  // Descendants of text and svg nodes have no layout node of their own
  if (isNil(node.taffyNode)) {
    const box = Object.assign(
      { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 },
      getPadding(node),
      getMargin(node),
    ) as Box;
    const newNode: SafeNode = Object.assign({}, node, { box });

    if (!node.children) return newNode;

    const children = node.children.map((child) =>
      persistDimensions(tree, child),
    );

    return Object.assign({}, newNode, { children });
  }

  const layout = tree.getLayout(node.taffyNode);

  const box: Box = {
    width: layout.width,
    height: layout.height,
    top: layout.y,
    left: layout.x,
    right: parent ? parent.width - layout.x - layout.width : 0,
    bottom: parent ? parent.height - layout.y - layout.height : 0,
    marginTop: layout.marginTop,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
    marginLeft: layout.marginLeft,
    paddingTop: layout.paddingTop,
    paddingRight: layout.paddingRight,
    paddingBottom: layout.paddingBottom,
    paddingLeft: layout.paddingLeft,
    borderTopWidth: layout.borderTop,
    borderRightWidth: layout.borderRight,
    borderBottomWidth: layout.borderBottom,
    borderLeftWidth: layout.borderLeft,
  };

  layout.free();

  const newNode: SafeNode = Object.assign({}, node, { box });
  delete newNode.taffyNode;

  if (isText(newNode)) {
    (newNode as SafeTextNode).alignOffset = getAlignOffset(
      newNode as SafeTextNode,
      box,
    );
  }

  if (!node.children) return newNode;

  const children = node.children.map((child) =>
    persistDimensions(tree, child, box),
  );

  return Object.assign({}, newNode, { children });
};

/**
 * Calculates page object layout using Taffy.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 *
 * @param page - Object
 * @param fontStore - Font store
 * @returns Page object with correct 'box' layout attributes
 */
export const resolvePageDimensions = (
  page: SafePageNode,
  fontStore: FontStore,
) => {
  if (isNil(page)) return null;

  const tree = new TaffyTree();
  tree.disableRounding();

  try {
    const withNodes = createTaffyNodes(tree, page, fontStore)(page);
    const { dispatch, rethrow } = createMeasureDispatch();

    tree.computeLayoutWithMeasure(withNodes.taffyNode!, MAX_CONTENT, dispatch);
    rethrow();

    return persistDimensions(tree, withNodes) as SafePageNode;
  } finally {
    tree.free();
  }
};

/**
 * Calculates root object layout using Taffy.
 *
 * @param node - Root object
 * @param fontStore - Font store
 * @returns Root object with correct 'box' layout attributes
 */
const resolveDimensions = (node: SafeDocumentNode, fontStore: FontStore) => {
  if (!node.children) return node;

  const resolveChild = (child: SafePageNode) =>
    resolvePageDimensions(child, fontStore);

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveDimensions;
