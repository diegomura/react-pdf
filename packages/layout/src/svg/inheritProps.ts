import * as P from '@react-pdf/primitives';
import { pick, without } from '@react-pdf/fns';
import { SafeNode } from '../types';

const BASE_SVG_INHERITED_PROPS = [
  'x',
  'y',
  'clipPath',
  'clipRule',
  'opacity',
  'fill',
  'fillOpacity',
  'fillRule',
  'stroke',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  'dominantBaseline',
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'opacity',
  'textDecoration',
  'lineHeight',
  'textAlign',
  'visibility',
  'wordSpacing',
];

// Do not inherit "x" for <tspan> elements from <text> parent
const TEXT_SVG_INHERITED_PROPS = without(['x'], BASE_SVG_INHERITED_PROPS);

const SVG_INHERITED_PROPS = {
  [P.Text]: TEXT_SVG_INHERITED_PROPS,
};

const getInheritProps = (node) => {
  const props = node.props || {};

  const svgInheritedProps =
    SVG_INHERITED_PROPS[node.type] ?? BASE_SVG_INHERITED_PROPS;

  return pick(svgInheritedProps, props);
};

const inheritProps = (node: SafeNode) => {
  if (!node.children) return node;

  const inheritedProps = getInheritProps(node);

  const children = node.children.map((child) => {
    const props = Object.assign({}, inheritedProps, child.props || {});
    const newChild = Object.assign({}, child, { props });
    return inheritProps(newChild);
  });

  return Object.assign({}, node, { children });
};

export default inheritProps;
