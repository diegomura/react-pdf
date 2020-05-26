import expandStyles from '../../src/stylesheet/expandStyles';

describe('stylesheet expandStyles', () => {
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
