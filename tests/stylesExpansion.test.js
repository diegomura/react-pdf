import { StyleSheet } from '../src';

describe('attribute expansion', () => {
  const expand = (stylesheet, expected) => {
    return expect(Object.keys(stylesheet).sort()).toEqual(expected.sort());
  };

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
    expand(StyleSheet.resolve({ border: '1 solid red' }), expectedKeys);
  });

  test('should expand borderColor attribute', () => {
    const expectedKeys = [
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
    ];
    expand(StyleSheet.resolve({ borderColor: 'red' }), expectedKeys);
  });

  test('should expand borderRadius attribute', () => {
    const expectedKeys = [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius',
    ];
    expand(StyleSheet.resolve({ borderRadius: 5 }), expectedKeys);
  });

  test('should expand borderStyle attribute', () => {
    const expectedKeys = [
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle',
    ];
    expand(StyleSheet.resolve({ borderStyle: 'solid' }), expectedKeys);
  });

  test('should expand borderWidth attribute', () => {
    const expectedKeys = [
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
    ];
    expand(StyleSheet.resolve({ borderWidth: 5 }), expectedKeys);
  });

  test('should expand margin attribute', () => {
    const expectedKeys = [
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
    ];

    expand(StyleSheet.resolve({ margin: '1 2 3 4' }), expectedKeys);
  });

  test('should expand objectPosition attribute', () => {
    const expectedKeys = ['objectPositionX', 'objectPositionY'];

    expand(StyleSheet.resolve({ objectPosition: '50% 50%' }), expectedKeys);
  });
});
