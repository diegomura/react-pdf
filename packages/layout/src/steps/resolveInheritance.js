import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

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

const isSvg = R.propEq('type', P.Svg);

/**
 * Get styles sub group of inherited properties
 *
 * @param {Object} style object
 * @returns {Object} style object only with inherited properties
 */
const getInheritStyles = R.compose(
  R.pick(INHERITED_PROPERTIES),
  R.propOr({}, 'style'),
);

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
const mergeStyles = inheritedStyles =>
  R.evolve({
    style: style => merge(inheritedStyles, style),
  });

/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */
const resolveInheritance = node => {
  if (isSvg(node)) return node;

  const inheritStyles = getInheritStyles(node);
  const resolveChild = R.compose(
    resolveInheritance,
    mergeStyles(inheritStyles),
  );

  return R.evolve({ children: R.map(resolveChild) })(node);
};

export default resolveInheritance;
