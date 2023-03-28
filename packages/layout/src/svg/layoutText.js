import * as P from '@react-pdf/primitives';
import layoutEngine, {
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  textDecoration,
} from '@react-pdf/textkit';

import fromFragments from '../text/fromFragments';
import transformText from '../text/transformText';
import fontSubstitution from '../text/fontSubstitution';

const isTextInstance = node => node.type === P.TextInstance;

const engines = {
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const toFontNameStack = (...fontFamilyObjects) =>
  fontFamilyObjects
    .map(fontFamilies =>
      typeof fontFamilies === 'string'
        ? fontFamilies.split(',').map(f => f.trim())
        : Array.from(fontFamilies || []),
    )
    .flat()
    .reduce(
      (fonts, font) => (fonts.includes(font) ? fonts : [...fonts, font]),
      [],
    );

const getFontStack = (fontStore, { fontFamily, fontStyle, fontWeight }) =>
  toFontNameStack(fontFamily).map(fontFamilyName => {
    if (typeof fontFamilyName !== 'string') return fontFamilyName;

    const opts = { fontFamily: fontFamilyName, fontWeight, fontStyle };
    const obj = fontStore ? fontStore.getFont(opts) : null;
    return obj ? obj.data : fontFamilyName;
  });

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

  const fontStack = getFontStack(fontStore, {
    fontFamily,
    fontStyle,
    fontWeight,
  });

  const attributes = {
    fontStack,
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

const layoutTspan = fontStore => node => {
  const attributedString = getAttributedString(fontStore, node);

  const x = node.props?.x || 0;
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

  const children = node.children.map(layoutTspan(fontStore));

  return Object.assign({}, node, { children });
};

export default layoutText;
