import * as R from 'ramda';

import applyDefaultStyles from '../../src/layout/applyDefaultStyles';

const applyDefaultStylesInstance = applyDefaultStyles();

const DEFAULTS = {
  align: 'left',
  attachment: null,
  backgroundColor: null,
  characterSpacing: 0,
  color: 'black',
  features: [],
  fill: true,
  font: null,
  fontSize: 12,
  hangingPunctuation: false,
  hyphenationFactor: 0,
  indent: 0,
  justificationFactor: 1,
  lineHeight: null,
  lineSpacing: 0,
  link: null,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paragraphSpacing: 0,
  underline: false,
  underlineColor: 'black',
  underlineStyle: 'solid',
  script: null,
  shrinkFactor: 0,
  strike: false,
  strikeColor: 'black',
  strikeStyle: 'solid',
  stroke: false,
  wordSpacing: 0,
  yOffset: 0,
};

const OVERRIDES = {
  align: 'right',
  attachment: [],
  backgroundColor: 'red',
  characterSpacing: 5,
  color: 'red',
  features: ['test'],
  fill: false,
  font: { font: true },
  fontSize: 15,
  hangingPunctuation: true,
  hyphenationFactor: 5,
  indent: 5,
  justificationFactor: 5,
  lineHeight: 10,
  lineSpacing: 5,
  link: 'link',
  marginLeft: 10,
  marginRight: 10,
  opacity: 0.4,
  paddingTop: 5,
  paragraphSpacing: 5,
  underline: true,
  underlineColor: 'red',
  underlineStyle: 'dashed',
  script: 'latin',
  shrinkFactor: 5,
  strike: true,
  strikeColor: 'red',
  strikeStyle: 'dashed',
  stroke: true,
  wordSpacing: 5,
  yOffset: 5,
};

const shouldDefault = (attribute, value) => () => {
  const result = applyDefaultStylesInstance({
    string: 'Lorem',
    runs: [{ start: 0, end: 5, attributes: {} }],
  });
  expect(result.runs[0].attributes).toHaveProperty(attribute, value);
};

const shouldOverride = (attribute, value) => () => {
  const result = applyDefaultStylesInstance({
    string: 'Lorem',
    runs: [{ start: 0, end: 5, attributes: { [attribute]: value } }],
  });
  expect(result.runs[0].attributes).toHaveProperty(attribute, value);
};

describe('applyDefaultStyles', () => {
  test('should return empty attributed string if nothing passed', () => {
    const result = applyDefaultStylesInstance({});

    expect(result.string).toEqual('');
    expect(result.runs).toHaveLength(0);
  });

  test('should return passed string unchanged', () => {
    const result = applyDefaultStylesInstance({ string: 'Lorem' });

    expect(result.string).toEqual('Lorem');
    expect(result.runs).toHaveLength(0);
  });

  // Default overrides
  R.keys(DEFAULTS).forEach(key => {
    test(
      `should apply default ${key} to passed run`,
      shouldDefault(key, DEFAULTS[key]),
    );
  });

  // Overrides
  R.keys(OVERRIDES).forEach(key => {
    test(
      `should apply ${key} to passed run`,
      shouldOverride(key, DEFAULTS[key]),
    );
  });

  test('should underline color get color value if not present', () => {
    const result = applyDefaultStylesInstance({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { color: 'red' } }],
    });

    expect(result.runs[0].attributes).toHaveProperty('underlineColor', 'red');
  });

  test('should margin right get margin value if not present', () => {
    const result = applyDefaultStylesInstance({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { margin: 5 } }],
    });

    expect(result.runs[0].attributes).toHaveProperty('marginRight', 5);
  });

  test('should margin left get margin value if not present', () => {
    const result = applyDefaultStylesInstance({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { margin: 5 } }],
    });

    expect(result.runs[0].attributes).toHaveProperty('marginLeft', 5);
  });

  test('should padding top get padding value if not present', () => {
    const result = applyDefaultStylesInstance({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { padding: 5 } }],
    });

    expect(result.runs[0].attributes).toHaveProperty('paddingTop', 5);
  });

  test('should opacity be zero', () => {
    const result = applyDefaultStylesInstance({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { opacity: 0 } }],
    });

    expect(result.runs[0].attributes).toHaveProperty('opacity', 0);
  });
});
