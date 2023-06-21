import * as P from '@nutshelllabs-pdf/primitives';

import getDefs from './getDefs';

const isNotDefs = node => node.type !== P.Defs;

const detachDefs = node => {
  if (!node.children) return node;

  const children = node.children.filter(isNotDefs);

  return Object.assign({}, node, { children });
};

const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

const replaceDef = (defs, value) => {
  if (!value) return undefined;

  if (!URL_REGEX.test(value)) return value;

  const match = value.match(URL_REGEX);

  return defs[match[1]];
};

const parseNodeDefs = defs => node => {
  const fill = replaceDef(defs, node.props?.fill);
  const clipPath = replaceDef(defs, node.props?.clipPath);
  const props = Object.assign({}, node.props, { fill, clipPath });
  const children = node.children
    ? node.children.map(parseNodeDefs(defs))
    : undefined;

  return Object.assign({}, node, { props, children });
};

const parseDefs = root => {
  if (!root.children) return root;

  const defs = getDefs(root);
  const children = root.children.map(parseNodeDefs(defs));

  return Object.assign({}, root, { children });
};

const replaceDefs = node => {
  return detachDefs(parseDefs(node));
};

export default replaceDefs;
