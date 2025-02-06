import * as P from '@react-pdf/primitives';
import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  textDecoration,
} from '@react-pdf/textkit';

import fromFragments from '../text/fromFragments';
import transformText from '../text/transformText';
import fontSubstitution from '../text/fontSubstitution';

const isTextInstance = (node) => node.type === P.TextInstance;

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

const getFragments = (fontStore, instance) => {
  if (!instance) return [{ string: '' }];

  const fragments = [];

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

  const font = fontFamilies.map((fontFamilyName) => {
    if (typeof fontFamilyName !== 'string') return fontFamilyName;

    const opts = { fontFamily: fontFamilyName, fontWeight, fontStyle };
    const obj = fontStore ? fontStore.getFont(opts) : null;
    return obj ? obj.data : fontFamilyName;
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
      fragments.push(...getFragments(child));
    }
  }

  return fragments;
};

const getAttributedString = (fontStore, instance) =>
  fromFragments(getFragments(fontStore, instance));

const AlmostInfinity = 999999999999;

const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

const layoutTspan = (fontStore) => (node, xOffset) => {
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

const layoutText = (fontStore, node) => {
  if (!node.children) return node;

  let currentXOffset = node.props?.x || 0;

  const layoutFn = layoutTspan(fontStore);

  const children = node.children.map((child, index) => {
    // If the <tspan> has no explicit x position, and it's not the last child of the <text> node, and it has a value, add a space to the end of the value
    if (
      child.props.x === undefined &&
      index < node.children.length - 1 &&
      child.children?.[0]?.value
    ) {
      // eslint-disable-next-line no-param-reassign
      child.children[0].value += ' ';
    }

    const childWithLayout = layoutFn(child, currentXOffset);

    currentXOffset += childWithLayout.lines[0].xAdvance;

    return childWithLayout;
  });

  return Object.assign({}, node, { children });
};

export default layoutText;
