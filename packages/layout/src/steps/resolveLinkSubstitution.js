import * as P from '@nutshelllabs-pdf/primitives';
import { compose } from '@nutshelllabs-pdf/fns';

const isType = type => node => node.type === type;

const isLink = isType(P.Link);

const isText = isType(P.Text);

const isTextInstance = isType(P.TextInstance);

/**
 * Checks if node has render prop
 *
 * @param {Object} node
 * @returns {Boolean} has render prop?
 */
const hasRenderProp = node => !!node.props?.render;

/**
 * Checks if node is text type (Text or TextInstance)
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */
const isTextType = node => isText(node) || isTextInstance(node);

/**
 * Checks if is tet link that needs to be wrapped in Text
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */
const isTextLink = node => {
  const children = node.children || [];

  // Text string inside a Link
  if (children.every(isTextInstance)) return true;

  // Text node inside a Link
  if (children.every(isText)) return false;

  return children.every(isTextType);
};

/**
 * Wraps node children inside Text node
 *
 * @param {Object} node
 * @returns {Boolean} node with intermediate Text child
 */
const wrapText = node => {
  const textElement = {
    type: P.Text,
    props: {},
    style: {},
    box: {},
    children: node.children,
  };

  return Object.assign({}, node, { children: [textElement] });
};

const transformLink = node => {
  if (!isLink(node)) return node;

  // If has render prop substitute the instance by a Text, that will
  // ultimately render the inline Link via the textkit PDF renderer.
  if (hasRenderProp(node)) return Object.assign({}, node, { type: P.Text });

  // If is a text link (either contains Text or TextInstalce), wrap it
  // inside a Text element so styles are applied correctly

  if (isTextLink(node)) return wrapText(node);

  return node;
};

/**
 * Transforms Link layout to correctly render text and dynamic rendered links
 *
 * @param {Object} node
 * @returns {Object} node with link substitution
 */
const resolveLinkSubstitution = node => {
  if (!node.children) return node;

  const resolveChild = compose(transformLink, resolveLinkSubstitution);

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveLinkSubstitution;
