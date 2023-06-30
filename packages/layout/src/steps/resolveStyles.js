import * as P from '@nutshelllabs/primitives';
import stylesheet from '@nutshelllabs/stylesheet';

const isLink = node => node.type === P.Link;

const DEFAULT_LINK_STYLES = {
  color: 'blue',
  textDecoration: 'underline',
};

/**
 * Computes styles using stylesheet
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} computed styles
 */
const computeStyle = (container, node) => {
  let baseStyle = node.style;

  if (isLink(node)) {
    baseStyle = Array.isArray(node.style)
      ? [DEFAULT_LINK_STYLES, ...node.style]
      : [DEFAULT_LINK_STYLES, node.style];
  }

  return stylesheet(container, baseStyle);
};

/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */
const resolveNodeStyles = container => node => {
  node.style = computeStyle(container, node);

  if (node.children) {
    node.children.forEach(resolveNodeStyles(container));
  }

  return node;
};

/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */
const resolvePageStyles = page => {
  const dpi = page.props?.dpi || 72;
  const width = page.box?.width || page.style.width;
  const height = page.box?.height || page.style.height;
  const orientation = page.props?.orientation || 'portrait';
  const container = { width, height, orientation, dpi };

  return resolveNodeStyles(container)(page);
};

/**
 * Resolves document styles
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved styles
 */
const resolveStyles = root => {
  if (!root.children) return root;
  root.children.forEach(resolvePageStyles);
  return root;
};

export default resolveStyles;
