import * as P from '@react-pdf/primitives';
import stylesheet, { Container, Style } from '@react-pdf/stylesheet';

import {
  DocumentNode,
  Node,
  PageNode,
  SafeDocumentNode,
  SafeNode,
} from '../types';

const isLink = (node: Node) => node.type === P.Link;

const DEFAULT_LINK_STYLES: Style = {
  color: 'blue',
  textDecoration: 'underline',
};

/**
 * Computes styles using stylesheet
 *
 * @param container
 * @param node - Document node
 * @returns Computed styles
 */
const computeStyle = (container: Container, node: Node) => {
  const baseStyle = isLink(node)
    ? [DEFAULT_LINK_STYLES, node.style]
    : node.style;

  const style = stylesheet(container, baseStyle);

  // Floats are out of flow; flipping to absolute here keeps yoga and pagination float-unaware
  if (style.float === 'left' || style.float === 'right') {
    style.position = 'absolute';
  }

  return style;
};

/**
 * Resolves node styles
 *
 * @param container
 * @returns Resolve node styles
 */
const resolveNodeStyles =
  (container: Container) =>
  (node: Node): SafeNode => {
    const style = computeStyle(container, node);

    // Split fragments re-enter through page relayout; keep their mark.
    const wasSplit = (node as SafeNode).wasSplit ?? false;

    if (!node.children) {
      return Object.assign({}, node, { style, wasSplit }) as SafeNode;
    }

    const children = node.children.map(resolveNodeStyles(container));

    return Object.assign({}, node, { style, wasSplit, children }) as SafeNode;
  };

/**
 * Resolves page styles
 *
 * @param page Document page
 * @returns Document page with resolved styles
 */
export const resolvePageStyles = (page: PageNode) => {
  const dpi = page.props?.dpi || 72;
  const style = page.style as Style;
  const width = page.box?.width || style.width;
  const height = page.box?.height || style.height;
  const orientation = page.props?.orientation || 'portrait';
  const remBase = style?.fontSize || 18;
  const container = { width, height, orientation, dpi, remBase } as Container;

  return resolveNodeStyles(container)(page);
};

/**
 * Resolves document styles
 *
 * @param root - Document root
 * @returns Document root with resolved styles
 */
const resolveStyles = (root: DocumentNode): SafeDocumentNode => {
  if (!root.children) {
    return Object.assign({}, root, {
      wasSplit: false,
    }) as unknown as SafeDocumentNode;
  }

  const children = root.children.map(resolvePageStyles);

  return Object.assign({}, root, {
    wasSplit: false,
    children,
  }) as SafeDocumentNode;
};

export default resolveStyles;
