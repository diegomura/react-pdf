import * as R from 'ramda';
import * as P from '@react-pdf/primitives';
import layoutEngine from '@react-pdf/textkit/layout';
import linebreaker from '@react-pdf/textkit/engines/linebreaker';
import justification from '@react-pdf/textkit/engines/justification';
import scriptItemizer from '@react-pdf/textkit/engines/scriptItemizer';
import wordHyphenation from '@react-pdf/textkit/engines/wordHyphenation';
import decorationEngine from '@react-pdf/textkit/engines/textDecoration';
import AttributedString from '@react-pdf/textkit/attributedString';

import transformText from '../text/transformText';
import fontSubstitution from '../text/fontSubstitution';

const isTextInstance = R.propEq('type', P.TextIntance);

const engines = {
  linebreaker,
  justification,
  decorationEngine,
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
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    opacity,
  } = instance.props;

  const obj = fontStore
    ? fontStore.getFont({ fontFamily, fontWeight, fontStyle })
    : null;
  const font = obj ? obj.data : fontFamily;

  const attributes = {
    font,
    opacity,
    fontSize,
    color: fill,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || fill,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || fill,
  };

  instance.children.forEach(child => {
    if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes,
      });
    } else if (child) {
      fragments.push(...getFragments(child));
    }
  });

  return fragments;
};

const getAttributedString = (fontStore, instance) =>
  AttributedString.fromFragments(getFragments(fontStore, instance));

const AlmostInfinity = 999999999999;

const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

const layoutTspan = (fontStore, node) => {
  const attributedString = getAttributedString(fontStore, node);

  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);

  const container = { x, y, width: AlmostInfinity, height: AlmostInfinity };

  const hyphenationCallback = fontStore
    ? fontStore.getHyphenationCallback()
    : null;

  const layoutOptions = { hyphenationCallback, shrinkWhitespaceFactor };

  const lines = R.compose(R.reduce(R.concat, []), engine)(
    attributedString,
    container,
    layoutOptions,
  );

  return R.assoc('lines', lines, node);
};

const layoutText = (fontStore, node) =>
  R.evolve({
    children: R.map(layoutTspan(fontStore)),
  })(node);

export default R.curryN(2, layoutText);
