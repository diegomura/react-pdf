import * as P from '@react-pdf/primitives';
import { pick, compose } from '@react-pdf/fns';

const BASE_INHERITABLE_PROPERTIES = [
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

const TEXT_INHERITABLE_PROPERTIES = [
  ...BASE_INHERITABLE_PROPERTIES,
  'backgroundColor',
];

const isSvg = (node) => node.type === P.Svg;

const isText = (node) => node.type === P.Text;

// Merge style values
const mergeValues = (styleName, value, inheritedValue) => {
  switch (styleName) {
    case 'textDecoration': {
      // merge not none and not false textDecoration values to one rule
      return [inheritedValue, value].filter((v) => v && v !== 'none').join(' ');
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
 * @typedef {Function} MergeStyles
 * @param {Object} node
 * @returns {Object} node with styles merged
 */

/**
 * Merges styles with node
 *
 * @param {Object} inheritedStyles style object
 * @returns {MergeStyles} merge styles function
 */
const mergeStyles = (inheritedStyles) => (node) => {
  const style = merge(inheritedStyles, node.style || {});
  return Object.assign({}, node, { style });
};

/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} node document root
 * @returns {Object} document root with inheritance
 *
 */
const resolveInheritance = (node) => {
  if (isSvg(node)) return node;

  if (!node.children) return node;

  const inheritableProperties = isText(node)
    ? TEXT_INHERITABLE_PROPERTIES
    : BASE_INHERITABLE_PROPERTIES;

  const inheritStyles = pick(inheritableProperties, node.style || {});

  const resolveChild = compose(resolveInheritance, mergeStyles(inheritStyles));

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveInheritance;
