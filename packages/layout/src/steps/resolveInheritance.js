import * as P from '@nutshelllabs/primitives';
import { pick, compose } from '@nutshelllabs/fns';

const INHERITED_PROPERTIES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'opacity',
  'textDecoration',
  'textTransform',
  'lineHeight',
  'textAlign',
  'visibility',
  'wordSpacing',
];

const isSvg = node => node.type === P.Svg;

// Merge style values
const mergeValues = (styleName, value, inheritedValue) => {
  switch (styleName) {
    case 'textDecoration': {
      // merge not none and not false textDecoration values to one rule
      return [inheritedValue, value].filter(v => v && v !== 'none').join(' ');
    }
    default:
      return value;
  }
};

// Merge inherited and node styles
const merge = (inheritedStyles, style) => {
  const mergedStyles = { ...inheritedStyles };

  Object.entries(style).forEach(([styleName, value]) => {
    mergedStyles[styleName] = mergeValues(
      styleName,
      value,
      inheritedStyles[styleName],
    );
  });

  return mergedStyles;
};

/**
 * Merges styles with node
 *
 * @param {Object} style object
 * @param {Object} node
 * @returns {Object} node with styles merged
 */
const mergeStyles = inheritedStyles => node => {
  const style = merge(inheritedStyles, node.style || {});
  return Object.assign({}, node, { style });
};

/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */
const resolveInheritance = node => {
  if (isSvg(node)) return node;
  if (!node.children) return node;

  const inheritStyles = pick(INHERITED_PROPERTIES, node.style || {});

  const resolveChild = compose(resolveInheritance, mergeStyles(inheritStyles));

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveInheritance;
