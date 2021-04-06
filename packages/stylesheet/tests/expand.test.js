import expandStyles from '../src/expand';

describe('stylesheet expand', () => {
  const expand = (stylesheet, expected) => {
    return expect(Object.keys(stylesheet).sort()).toEqual(expected.sort());
  };

  test('should keep unrelated keys equal', () => {
    const expectedKeys = ['color', 'backgroundColor'];

    expand(
      expandStyles({ color: 'red', backgroundColor: 'red' }),
      expectedKeys,
    );
  });

  test('should expand borderTop attribute', () => {
    const expectedKeys = ['borderTopColor', 'borderTopStyle', 'borderTopWidth'];

    expand(expandStyles({ borderTop: '1 solid red' }), expectedKeys);
  });

  test('should expand borderRight attribute', () => {
    const expectedKeys = [
      'borderRightColor',
      'borderRightStyle',
      'borderRightWidth',
    ];

    expand(expandStyles({ borderRight: '1 solid red' }), expectedKeys);
  });

  test('should expand borderBottom attribute', () => {
    const expectedKeys = [
      'borderBottomColor',
      'borderBottomStyle',
      'borderBottomWidth',
    ];

    expand(expandStyles({ borderBottom: '1 solid red' }), expectedKeys);
  });

  test('should expand borderLeft attribute', () => {
    const expectedKeys = [
      'borderLeftColor',
      'borderLeftStyle',
      'borderLeftWidth',
    ];

    expand(expandStyles({ borderLeft: '1 solid red' }), expectedKeys);
  });

  test('should expand border attribute', () => {
    const expectedKeys = [
      'borderTopColor',
      'borderTopStyle',
      'borderTopWidth',
      'borderRightColor',
      'borderRightStyle',
      'borderRightWidth',
      'borderBottomColor',
      'borderBottomStyle',
      'borderBottomWidth',
      'borderLeftColor',
      'borderLeftStyle',
      'borderLeftWidth',
    ];

    expand(expandStyles({ border: '1 solid red' }), expectedKeys);
  });

  test('should expand borderColor attribute', () => {
    const expectedKeys = [
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
    ];
    expand(expandStyles({ borderColor: 'red' }), expectedKeys);
  });

  test('should expand borderRadius attribute', () => {
    const expectedKeys = [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius',
    ];
    expand(expandStyles({ borderRadius: 5 }), expectedKeys);
  });

  test('should expand borderStyle attribute', () => {
    const expectedKeys = [
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle',
    ];
    expand(expandStyles({ borderStyle: 'solid' }), expectedKeys);
  });

  test('should expand borderWidth attribute', () => {
    const expectedKeys = [
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
    ];
    expand(expandStyles({ borderWidth: 5 }), expectedKeys);
  });

  test('should expand margin horizontal attribute', () => {
    const expectedKeys = ['marginRight', 'marginLeft'];

    expand(expandStyles({ marginHorizontal: '1' }), expectedKeys);
  });

  test('should expand margin vertical attribute', () => {
    const expectedKeys = ['marginTop', 'marginBottom'];

    expand(expandStyles({ marginVertical: '1' }), expectedKeys);
  });

  test('should expand margin attribute', () => {
    const expectedKeys = [
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
    ];

    expand(expandStyles({ margin: '1 2 3 4' }), expectedKeys);
  });

  test('should expand padding horizontal attribute', () => {
    const expectedKeys = ['paddingRight', 'paddingLeft'];

    expand(expandStyles({ paddingHorizontal: '1' }), expectedKeys);
  });

  test('should expand padding vertical attribute', () => {
    const expectedKeys = ['paddingTop', 'paddingBottom'];

    expand(expandStyles({ paddingVertical: '1' }), expectedKeys);
  });

  test('should expand padding attribute', () => {
    const expectedKeys = [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ];

    expand(expandStyles({ padding: '1 2 3 4' }), expectedKeys);
  });

  test('should expand flex attribute', () => {
    const expectedKeys = ['flexGrow', 'flexShrink', 'flexBasis'];

    expand(expandStyles({ flex: '1 2 20%' }), expectedKeys);
  });

  test('should expand objectPosition attribute', () => {
    const expectedKeys = ['objectPositionX', 'objectPositionY'];

    expand(expandStyles({ objectPosition: '50% 50%' }), expectedKeys);
  });

  test('should expand transformOrigin attribute', () => {
    const expectedKeys = ['transformOriginX', 'transformOriginY'];

    expand(expandStyles({ transformOrigin: '50% 50%' }), expectedKeys);
  });
});

describe('stylesheet transform', () => {
  test('should process margin shorthands', () => {
    const top = expandStyles({ marginTop: '1 2 3 4' });
    const right = expandStyles({ marginRight: '1 2 3 4' });
    const bottom = expandStyles({ marginBottom: '1 2 3 4' });
    const left = expandStyles({ marginLeft: '1 2 3 4' });

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(3);
    expect(left.marginLeft).toBe(4);
  });

  test('should process margin shorthand with percentages', () => {
    const top = expandStyles({ marginTop: '1% 2% 3% 4%' });
    const right = expandStyles({ marginRight: '1% 2% 3% 4%' });
    const bottom = expandStyles({ marginBottom: '1% 2% 3% 4%' });
    const left = expandStyles({ marginLeft: '1% 2% 3% 4%' });

    expect(top.marginTop).toBe('1%');
    expect(right.marginRight).toBe('2%');
    expect(bottom.marginBottom).toBe('3%');
    expect(left.marginLeft).toBe('4%');
  });

  test('should process margin axis shorthand', () => {
    const top = expandStyles({ marginTop: '1 2' });
    const right = expandStyles({ marginRight: '1 2' });
    const bottom = expandStyles({ marginBottom: '1 2' });
    const left = expandStyles({ marginLeft: '1 2' });

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(1);
    expect(left.marginLeft).toBe(2);
  });

  test('should keep normal margin values as it is', () => {
    const top = expandStyles({ marginTop: '1' });
    const right = expandStyles({ marginRight: '2' });
    const bottom = expandStyles({ marginBottom: '3' });
    const left = expandStyles({ marginLeft: '4' });

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(3);
    expect(left.marginLeft).toBe(4);
  });

  test('should process padding shorthand', () => {
    const top = expandStyles({ paddingTop: '1 2 3 4' });
    const right = expandStyles({ paddingRight: '1 2 3 4' });
    const bottom = expandStyles({ paddingBottom: '1 2 3 4' });
    const left = expandStyles({ paddingLeft: '1 2 3 4' });

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(3);
    expect(left.paddingLeft).toBe(4);
  });

  test('should process padding shorthand with percentages', () => {
    const top = expandStyles({ paddingTop: '1% 2% 3% 4%' });
    const right = expandStyles({ paddingRight: '1% 2% 3% 4%' });
    const bottom = expandStyles({ paddingBottom: '1% 2% 3% 4%' });
    const left = expandStyles({ paddingLeft: '1% 2% 3% 4%' });

    expect(top.paddingTop).toBe('1%');
    expect(right.paddingRight).toBe('2%');
    expect(bottom.paddingBottom).toBe('3%');
    expect(left.paddingLeft).toBe('4%');
  });

  test('should process padding axis shorthand', () => {
    const top = expandStyles({ paddingTop: '1 2' });
    const right = expandStyles({ paddingRight: '1 2' });
    const bottom = expandStyles({ paddingBottom: '1 2' });
    const left = expandStyles({ paddingLeft: '1 2' });

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(1);
    expect(left.paddingLeft).toBe(2);
  });

  test('should keep normal padding values as it is', () => {
    const top = expandStyles({ paddingTop: '1' });
    const right = expandStyles({ paddingRight: '2' });
    const bottom = expandStyles({ paddingBottom: '3' });
    const left = expandStyles({ paddingLeft: '4' });

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(3);
    expect(left.paddingLeft).toBe(4);
  });

  test('should process borderWidth shorthand', () => {
    const top = expandStyles({ borderTopWidth: '1 solid blue' });
    const right = expandStyles({ borderRightWidth: '1 solid blue' });
    const bottom = expandStyles({ borderBottomWidth: '1 solid blue' });
    const left = expandStyles({ borderLeftWidth: '1 solid blue' });

    expect(top.borderTopWidth).toBe(1);
    expect(right.borderRightWidth).toBe(1);
    expect(bottom.borderBottomWidth).toBe(1);
    expect(left.borderLeftWidth).toBe(1);
  });

  test('should keep borderWidth as it is', () => {
    const top = expandStyles({ borderTopWidth: '1' });
    const right = expandStyles({ borderRightWidth: '2' });
    const bottom = expandStyles({ borderBottomWidth: '3' });
    const left = expandStyles({ borderLeftWidth: '4' });

    expect(top.borderTopWidth).toBe(1);
    expect(right.borderRightWidth).toBe(2);
    expect(bottom.borderBottomWidth).toBe(3);
    expect(left.borderLeftWidth).toBe(4);
  });

  test('should process borderStyle shorthand', () => {
    const top = expandStyles({ borderTopStyle: '1 solid blue' });
    const right = expandStyles({ borderRightStyle: '1 solid blue' });
    const bottom = expandStyles({ borderBottomStyle: '1 solid blue' });
    const left = expandStyles({ borderLeftStyle: '1 solid blue' });

    expect(top.borderTopStyle).toBe('solid');
    expect(right.borderRightStyle).toBe('solid');
    expect(bottom.borderBottomStyle).toBe('solid');
    expect(left.borderLeftStyle).toBe('solid');
  });

  test('should keep borderStyle as it is', () => {
    const top = expandStyles({ borderTopStyle: 'solid' });
    const right = expandStyles({ borderRightStyle: 'dashed' });
    const bottom = expandStyles({ borderBottomStyle: 'solid' });
    const left = expandStyles({ borderLeftStyle: 'dashed' });

    expect(top.borderTopStyle).toBe('solid');
    expect(right.borderRightStyle).toBe('dashed');
    expect(bottom.borderBottomStyle).toBe('solid');
    expect(left.borderLeftStyle).toBe('dashed');
  });

  test('should process borderColor shorthand', () => {
    const top = expandStyles({ borderTopColor: '1 solid blue' });
    const right = expandStyles({ borderRightColor: '1 solid blue' });
    const bottom = expandStyles({ borderBottomColor: '1 solid blue' });
    const left = expandStyles({ borderLeftColor: '1 solid blue' });

    expect(top.borderTopColor).toBe('blue');
    expect(right.borderRightColor).toBe('blue');
    expect(bottom.borderBottomColor).toBe('blue');
    expect(left.borderLeftColor).toBe('blue');
  });

  test('should keep borderColor as it is', () => {
    const top = expandStyles({ borderTopColor: 'blue' });
    const right = expandStyles({ borderRightColor: 'green' });
    const bottom = expandStyles({ borderBottomColor: 'red' });
    const left = expandStyles({ borderLeftColor: 'yellow' });

    expect(top.borderTopColor).toBe('blue');
    expect(right.borderRightColor).toBe('green');
    expect(bottom.borderBottomColor).toBe('red');
    expect(left.borderLeftColor).toBe('yellow');
  });

  test('should process objectPosition shorthand', () => {
    const x = expandStyles({ objectPositionX: '20 30' });
    const y = expandStyles({ objectPositionY: '20 30' });

    expect(x.objectPositionX).toBe(20);
    expect(y.objectPositionY).toBe(30);
  });

  test('should process objectPosition shorthand percentages', () => {
    const x = expandStyles({ objectPositionX: '20% 30%' });
    const y = expandStyles({ objectPositionY: '20% 30%' });

    expect(x.objectPositionX).toBe('20%');
    expect(y.objectPositionY).toBe('30%');
  });

  test('should keep objectPosition as it is', () => {
    const x = expandStyles({ objectPositionX: '20%' });
    const y = expandStyles({ objectPositionY: '30%' });

    expect(x.objectPositionX).toBe('20%');
    expect(y.objectPositionY).toBe('30%');
  });

  test('should process single value transformOrigin shorthand', () => {
    const x = expandStyles({ transformOriginX: '20' });
    const y = expandStyles({ transformOriginY: '20' });

    expect(x.transformOriginX).toBe(20);
    expect(y.transformOriginY).toBe(20);
  });

  test('should process transformOrigin shorthand', () => {
    const x = expandStyles({ transformOriginX: '20 30' });
    const y = expandStyles({ transformOriginY: '20 30' });

    expect(x.transformOriginX).toBe(20);
    expect(y.transformOriginY).toBe(30);
  });

  test('should process transformOrigin shorthand percentages', () => {
    const x = expandStyles({ transformOriginX: '20% 30%' });
    const y = expandStyles({ transformOriginY: '20% 30%' });

    expect(x.transformOriginX).toBe('20%');
    expect(y.transformOriginY).toBe('30%');
  });

  test('should process transformOrigin zero offset shorthand', () => {
    const x = expandStyles({ transformOriginX: 'left top' });
    const y = expandStyles({ transformOriginY: 'left top' });

    expect(x.transformOriginX).toBe('0%');
    expect(y.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin full offset shorthand', () => {
    const x = expandStyles({ transformOriginX: 'right bottom' });
    const y = expandStyles({ transformOriginY: 'right bottom' });

    expect(x.transformOriginX).toBe('100%');
    expect(y.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin center offset shorthand', () => {
    const x = expandStyles({ transformOriginX: 'center' });
    const y = expandStyles({ transformOriginY: 'center' });

    expect(x.transformOriginX).toBe('50%');
    expect(y.transformOriginY).toBe('50%');
  });

  test('should process font-weight thin shorthand', () => {
    const stylesheet1 = expandStyles({ fontWeight: 'thin' });
    const stylesheet2 = expandStyles({ fontWeight: 'hairline' });

    expect(stylesheet1.fontWeight).toBe(100);
    expect(stylesheet2.fontWeight).toBe(100);
  });

  test('should process font-weight ultralight shorthand', () => {
    const stylesheet1 = expandStyles({ fontWeight: 'ultralight' });
    const stylesheet2 = expandStyles({ fontWeight: 'extralight' });

    expect(stylesheet1.fontWeight).toBe(200);
    expect(stylesheet2.fontWeight).toBe(200);
  });

  test('should process font-weight light shorthand', () => {
    const stylesheet = expandStyles({ fontWeight: 'light' });

    expect(stylesheet.fontWeight).toBe(300);
  });

  test('should process font-weight normal shorthand', () => {
    const stylesheet = expandStyles({ fontWeight: 'normal' });

    expect(stylesheet.fontWeight).toBe(400);
  });

  test('should process font-weight medium shorthand', () => {
    const stylesheet = expandStyles({ fontWeight: 'medium' });

    expect(stylesheet.fontWeight).toBe(500);
  });

  test('should process font-weight semibold shorthand', () => {
    const stylesheet1 = expandStyles({ fontWeight: 'semibold' });
    const stylesheet2 = expandStyles({ fontWeight: 'demibold' });

    expect(stylesheet1.fontWeight).toBe(600);
    expect(stylesheet2.fontWeight).toBe(600);
  });

  test('should process font-weight bold shorthand', () => {
    const stylesheet = expandStyles({ fontWeight: 'bold' });

    expect(stylesheet.fontWeight).toBe(700);
  });

  test('should process font-weight ultrabold shorthand', () => {
    const stylesheet1 = expandStyles({ fontWeight: 'ultrabold' });
    const stylesheet2 = expandStyles({ fontWeight: 'extraBold' });

    expect(stylesheet1.fontWeight).toBe(800);
    expect(stylesheet2.fontWeight).toBe(800);
  });

  test('should process font-weight heavy shorthand', () => {
    const stylesheet1 = expandStyles({ fontWeight: 'heavy' });
    const stylesheet2 = expandStyles({ fontWeight: 'black' });

    expect(stylesheet1.fontWeight).toBe(900);
    expect(stylesheet2.fontWeight).toBe(900);
  });
});
