import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
  textDecoration,
  fromFragments,
  Fragment,
} from '@react-pdf/textkit';

import transformText from '../text/transformText';
import {
  SafeNode,
  SafeTextNode,
  SafeTspanNode,
  SafeTextInstanceNode,
} from '../types';

const isTspan = (node: SafeNode): node is SafeTspanNode =>
  node.type === P.Tspan;

const isTextInstance = (node: SafeNode): node is SafeTextInstanceNode =>
  node.type === P.TextInstance;

const engines = {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

const getFragments = (fontStore: FontStore, instance) => {
  if (!instance) return [{ string: '' }];

  const fragments: Fragment[] = [];

  const {
    fill = 'black',
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    opacity,
  } = instance.props;

  const _textDecoration = instance.props.textDecoration;

  const fontFamilies =
    typeof fontFamily === 'string' ? [fontFamily] : [...(fontFamily || [])];

  // Fallback font
  fontFamilies.push('Helvetica');

  const font = fontFamilies.map((fontFamilyName) => {
    const opts = { fontFamily: fontFamilyName, fontWeight, fontStyle };
    const obj = fontStore.getFont(opts);
    return obj?.data;
  });

  const attributes = {
    font,
    opacity,
    fontSize,
    color: fill,
    underlineStyle: textDecorationStyle,
    underline:
      _textDecoration === 'underline' ||
      _textDecoration === 'underline line-through' ||
      _textDecoration === 'line-through underline',
    underlineColor: textDecorationColor || fill,
    strike:
      _textDecoration === 'line-through' ||
      _textDecoration === 'underline line-through' ||
      _textDecoration === 'line-through underline',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || fill,
  };

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

    if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes,
      });
    } else if (child) {
      fragments.push(...getFragments(fontStore, child));
    }
  }

  return fragments;
};

const getAttributedString = (fontStore: FontStore, instance) =>
  fromFragments(getFragments(fontStore, instance));

const AlmostInfinity = 999999999999;

const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

const layoutTspan = (fontStore: FontStore) => (node, xOffset) => {
  const attributedString = getAttributedString(fontStore, node);

  const x = node.props.x === undefined ? xOffset : node.props.x;
  const y = node.props?.y || 0;

  const container = { x, y, width: AlmostInfinity, height: AlmostInfinity };

  const hyphenationCallback =
    node.props.hyphenationCallback ||
    fontStore?.getHyphenationCallback() ||
    null;

  const layoutOptions = { hyphenationCallback, shrinkWhitespaceFactor };
  const lines = engine(attributedString, container, layoutOptions).flat();

  return Object.assign({}, node, { lines });
};

// Consecutive TSpan elements should be joined with a space
const joinTSpanLines = (node: SafeTextNode) => {
  const children = node.children.map((child, index) => {
    if (!isTspan(child)) return child;

    const textInstance = child.children[0];

    if (
      child.props.x === undefined &&
      index < node.children.length - 1 &&
      textInstance?.value
    ) {
      return Object.assign({}, child, {
        children: [{ ...textInstance, value: `${textInstance.value} ` }],
      });
    }

    return child;
  }, []);

  return Object.assign({}, node, { children });
};

const layoutText = (fontStore: FontStore, node: SafeTextNode) => {
  if (!node.children) return node;

  let currentXOffset = node.props?.x || 0;

  const layoutFn = layoutTspan(fontStore);

  const joinedNode = joinTSpanLines(node);

  const children = joinedNode.children.map((child) => {
    const childWithLayout = layoutFn(child, currentXOffset);
    currentXOffset += childWithLayout.lines[0].xAdvance;
    return childWithLayout;
  });

  return Object.assign({}, node, { children });
};

export default layoutText;
