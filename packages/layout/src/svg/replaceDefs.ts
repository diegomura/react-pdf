import * as P from '@react-pdf/primitives';

import getDefs from './getDefs';
import { SafeDefs, SafeNode, SafeSvgNode } from '../types';

const isNotDefs = (node: SafeNode) => node.type !== P.Defs;

const detachDefs = (node: SafeSvgNode) => {
  if (!node.children) return node;

  const children = node.children.filter(isNotDefs);

  return Object.assign({}, node, { children });
};

const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

const replaceDef = (defs: SafeDefs, value: string) => {
  if (!value) return undefined;

  if (!URL_REGEX.test(value)) return value;

  const match = value.match(URL_REGEX);

  return defs[match[1]];
};

const parseNodeDefs =
  (defs: SafeDefs) =>
  (node: SafeNode): SafeNode => {
    const props = node.props;

    const fill = `fill` in props ? replaceDef(defs, props?.fill) : undefined;

    const clipPath =
      `clipPath` in props ? replaceDef(defs, props?.clipPath) : undefined;

    const newProps = Object.assign({}, node.props, { fill, clipPath });

    const children = node.children
      ? node.children.map(parseNodeDefs(defs))
      : undefined;

    return Object.assign({}, node, { props: newProps, children });
  };

const parseDefs = (root: SafeSvgNode) => {
  if (!root.children) return root;

  const defs = getDefs(root);
  const children = root.children.map(parseNodeDefs(defs));

  return Object.assign({}, root, { children });
};

const replaceDefs = (node: SafeSvgNode) => {
  return detachDefs(parseDefs(node));
};

export default replaceDefs;
