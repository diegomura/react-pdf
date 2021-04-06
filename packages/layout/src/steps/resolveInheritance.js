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

/**
 * Merges styles with node
 *
 * @param {Object} style object
 * @param {Object} node
 * @returns {Object} node with styles merged
 */
const mergeStyles = styles =>
  R.evolve({
    style: R.merge(styles),
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
