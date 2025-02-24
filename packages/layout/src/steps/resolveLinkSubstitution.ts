import * as P from '@react-pdf/primitives';
import { compose } from '@react-pdf/fns';

import { Node } from '../types';

const isType = (type: string) => (node: Node) => node.type === type;

const isLink = isType(P.Link);

const isText = isType(P.Text);

const isTextInstance = isType(P.TextInstance);

/**
 * Checks if node has render prop
 *
 * @param node
 * @returns Has render prop?
 */
const hasRenderProp = (node: Node) => 'render' in node.props;

/**
 * Checks if node is text type (Text or TextInstance)
 *
 * @param node
 * @returns Are all children text instances?
 */
const isTextType = (node: Node) => isText(node) || isTextInstance(node);

/**
 * Checks if is tet link that needs to be wrapped in Text
 *
 * @param node
 * @returns Are all children text instances?
 */
const isTextLink = (node: Node) => {
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
 * @param node
 * @returns Node with intermediate Text child
 */
const wrapText = (node) => {
  const textElement = {
    type: P.Text,
    props: {},
    style: {},
    box: {},
    children: node.children,
  };

  return Object.assign({}, node, { children: [textElement] });
};

const transformLink = (node: Node) => {
  if (!isLink(node)) return node;

  // If has render prop substitute the instance by a Text, that will
  // ultimately render the inline Link via the textkit PDF renderer.
  if (hasRenderProp(node)) return Object.assign({}, node, { type: P.Text });

  // If is a text link (either contains Text or TextInstance), wrap it
  // inside a Text element so styles are applied correctly

  if (isTextLink(node)) return wrapText(node);

  return node;
};

/**
 * Transforms Link layout to correctly render text and dynamic rendered links
 *
 * @param node
 * @returns Node with link substitution
 */
const resolveLinkSubstitution = (node: Node): Node => {
  if (!node.children) return node;

  const resolveChild = compose(transformLink, resolveLinkSubstitution);

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveLinkSubstitution;
