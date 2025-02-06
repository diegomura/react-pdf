import { pick } from '@react-pdf/fns';

const SVG_INHERITED_PROPS = [
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

const getInheritProps = (node) => {
  const props = node.props || {};
  return pick(SVG_INHERITED_PROPS, props);
};

const inheritProps = (node) => {
  if (!node.children) return node;

  const inheritedProps = getInheritProps(node);

  const children = node.children.map((child) => {
    const props = Object.assign({}, inheritedProps, child.props || {});
    const newChild = Object.assign({}, child, { props });

    // Do not inherit "x" for <tspan> elements from <text> parent
    // If no explicit x is provided, the x-offset will be calculated in layoutText.js
    if (child.type === 'TSPAN') {
      newChild.props.x = child.props.x;
    }

    return inheritProps(newChild);
  });

  return Object.assign({}, node, { children });
};

export default inheritProps;
