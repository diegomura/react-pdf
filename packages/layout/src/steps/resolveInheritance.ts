import * as P from '@react-pdf/primitives';
import { pick, compose } from '@react-pdf/fns';
import { SafeStyle } from '@react-pdf/stylesheet';

import { SafeNode } from '../types';

type StyleKey = keyof SafeStyle;

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

const isType = (type: string) => (node: SafeNode) => node.type === type;

const isSvg = isType(P.Svg);

const isText = isType(P.Text);

// Merge style values
const mergeValues = <K extends StyleKey>(
  styleName: K,
  value: SafeStyle[K],
  inheritedValue: SafeStyle[K],
) => {
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
const merge = (inheritedStyles: SafeStyle, style: SafeStyle): SafeStyle => {
  const mergedStyles = { ...inheritedStyles };

  Object.entries(style).forEach(([styleName, value]) => {
    mergedStyles[styleName] = mergeValues(
      styleName as StyleKey,
      value,
      inheritedStyles[styleName],
    );
  });

  return mergedStyles;
};

/**
 * Merges styles with node
 *
 * @param inheritedStyles - Style object
 * @returns Merge styles function
 */
const mergeStyles =
  (inheritedStyles: SafeStyle) =>
  (node: SafeNode): SafeNode => {
    const style = merge(inheritedStyles, node.style || {});

    return Object.assign({}, node, { style });
  };

/**
 * Inherit style values from the root to the leafs
 *
 * @param node - Document root
 * @returns Document root with inheritance
 *
 */
const resolveInheritance = (node: SafeNode) => {
  if (isSvg(node)) return node;

  if (!('children' in node)) return node;

  const inheritableProperties = isText(node)
    ? TEXT_INHERITABLE_PROPERTIES
    : BASE_INHERITABLE_PROPERTIES;

  const inheritStyles = pick(inheritableProperties, node.style || {});

  const resolveChild = compose(resolveInheritance, mergeStyles(inheritStyles));

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveInheritance;
