import * as P from '@react-pdf/primitives';
import stylesheet from '@react-pdf/stylesheet';

const isLink = node => node.type === P.Link;

const LINK_STYLES = {
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
  const overrideStyle = isLink(node) ? LINK_STYLES : {};

  const baseStyle = Array.isArray(node.style)
    ? [...node.style, overrideStyle]
    : Object.assign({}, overrideStyle, node.style);

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
  const style = computeStyle(container, node);

  if (!node.children) return Object.assign({}, node, { style });

  const children = node.children.map(resolveNodeStyles(container));

  return Object.assign({}, node, { style, children });
};

/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */
const resolvePageStyles = page => {
  const container = page.box || page.style;
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

  const children = root.children.map(resolvePageStyles);

  return Object.assign({}, root, { children });
};

export default resolveStyles;
