import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';
import layoutEngine from '@govind-react-pdf/textkit/lib/layout';
import linebreaker from '@govind-react-pdf/textkit/lib/engines/linebreaker';
import AttributedString from '@govind-react-pdf/textkit/lib/attributedString';
import bidi from '@govind-react-pdf/textkit/lib/engines/bidi';
import justification from '@govind-react-pdf/textkit/lib/engines/justification';
import scriptItemizer from '@govind-react-pdf/textkit/lib/engines/scriptItemizer';
import wordHyphenation from '@govind-react-pdf/textkit/lib/engines/wordHyphenation';
import decorationEngine from '@govind-react-pdf/textkit/lib/engines/textDecoration';

import transformText from '../text/transformText';
import fontSubstitution from '../text/fontSubstitution';

const isTextInstance = R.propEq('type', P.TextInstance);

const engines = {
  bidi,
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
  textDecoration: decorationEngine,
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
    underline:
      textDecoration === 'underline' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
    underlineColor: textDecorationColor || fill,
    strike:
      textDecoration === 'line-through' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
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
  AttributedString.fromFragments(getFragments(fontStore, instance));

const AlmostInfinity = 999999999999;

const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

const layoutTspan = fontStore => node => {
  const attributedString = getAttributedString(fontStore, node);

  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);

  const container = { x, y, width: AlmostInfinity, height: AlmostInfinity };

  const hyphenationCallback =
    node.props.hyphenationCallback ||
    fontStore?.getHyphenationCallback() ||
    null;

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
