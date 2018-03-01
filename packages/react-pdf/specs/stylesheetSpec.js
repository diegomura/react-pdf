import Yoga from 'yoga-layout';
import { StyleSheet } from '../src';

describe('StyleSheet', () => {
  describe('flexbox attributes', () => {
    const assertFlexbox = (attribute, value, expectedValue) => {
      const styles = StyleSheet.resolve({ [attribute]: value });

      return expect(styles[attribute]).toEqual(expectedValue);
    };

    test('should transform display attribute correctly', () => {
      assertFlexbox('display', 'flex', Yoga.DISPLAY_FLEX);
      assertFlexbox('display', 'none', Yoga.DISPLAY_NONE);
    });

    test('should transform flexDirection attribute correctly', () => {
      assertFlexbox('flexDirection', 'row', Yoga.FLEX_DIRECTION_ROW);
      assertFlexbox(
        'flexDirection',
        'row-reverse',
        Yoga.FLEX_DIRECTION_ROW_REVERSE,
      );
      assertFlexbox('flexDirection', 'column', Yoga.FLEX_DIRECTION_COLUMN);
      assertFlexbox(
        'flexDirection',
        'column-reverse',
        Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
      );
    });

    test('should transform flexWrap attribute correctly', () => {
      assertFlexbox('flexWrap', 'nowrap', Yoga.WRAP_NO_WRAP);
      assertFlexbox('flexWrap', 'wrap', Yoga.WRAP_WRAP);
      assertFlexbox('flexWrap', 'wrap-reverse', Yoga.WRAP_WRAP_REVERSE);
    });

    test('should transform justifyContent attribute correctly', () => {
      assertFlexbox('justifyContent', 'flex-start', Yoga.JUSTIFY_FLEX_START);
      assertFlexbox('justifyContent', 'flex-end', Yoga.JUSTIFY_FLEX_END);
      assertFlexbox('justifyContent', 'center', Yoga.JUSTIFY_CENTER);
      assertFlexbox(
        'justifyContent',
        'space-between',
        Yoga.JUSTIFY_SPACE_BETWEEN,
      );
      assertFlexbox(
        'justifyContent',
        'space-around',
        Yoga.JUSTIFY_SPACE_AROUND,
      );
    });

    test('should transform alignItems attribute correctly', () => {
      assertFlexbox('alignItems', 'flex-start', Yoga.ALIGN_FLEX_START);
      assertFlexbox('alignItems', 'flex-end', Yoga.ALIGN_FLEX_END);
      assertFlexbox('alignItems', 'center', Yoga.ALIGN_CENTER);
      assertFlexbox('alignItems', 'stretch', Yoga.ALIGN_STRETCH);
      assertFlexbox('alignItems', 'baseline', Yoga.ALIGN_BASELINE);
    });

    test('should transform alignContent attribute correctly', () => {
      assertFlexbox('alignContent', 'flex-start', Yoga.ALIGN_FLEX_START);
      assertFlexbox('alignContent', 'flex-end', Yoga.ALIGN_FLEX_END);
      assertFlexbox('alignContent', 'center', Yoga.ALIGN_CENTER);
      assertFlexbox('alignContent', 'stretch', Yoga.ALIGN_STRETCH);
      assertFlexbox('alignContent', 'space-between', Yoga.ALIGN_SPACE_BETWEEN);
      assertFlexbox('alignContent', 'space-around', Yoga.ALIGN_SPACE_AROUND);
    });

    test('should transform alignSelf attribute correctly', () => {
      assertFlexbox('alignSelf', 'auto', Yoga.ALIGN_AUTO);
      assertFlexbox('alignSelf', 'flex-start', Yoga.ALIGN_FLEX_START);
      assertFlexbox('alignSelf', 'flex-end', Yoga.ALIGN_FLEX_END);
      assertFlexbox('alignSelf', 'center', Yoga.ALIGN_CENTER);
      assertFlexbox('alignSelf', 'baseline', Yoga.ALIGN_BASELINE);
      assertFlexbox('alignSelf', 'stretch', Yoga.ALIGN_STRETCH);
    });

    test('should transform order attribute correctly', () => {
      assertFlexbox('order', 1, 1);
    });

    test('should transform flexGrow attribute correctly', () => {
      assertFlexbox('flexGrow', 1, 1);
    });

    test('should transform flexShrink attribute correctly', () => {
      assertFlexbox('flexShrink', 1, 1);
    });
  });

  describe('flatten styles', () => {
    test('should return object from an object', () => {
      const styles = { color: 'red' };
      const flatten = StyleSheet.flatten(styles);

      return expect(flatten).toEqual(styles);
    });

    test('should return object of merged values from array', () => {
      const styles = [{ fontSize: 16, color: 'white' }, { color: 'green' }];
      const flatten = StyleSheet.flatten(styles);

      return expect(flatten).toEqual({ fontSize: 16, color: 'green' });
    });

    test('should ignore null array values', () => {
      const styles = [{ fontSize: 16, color: 'white' }, null];
      const flatten = StyleSheet.flatten(styles);

      return expect(flatten).toEqual({ fontSize: 16, color: 'white' });
    });

    test('should ignore null attribute values', () => {
      const styles = [{ fontSize: 16, color: 'white' }, { color: null }];
      const flatten = StyleSheet.flatten(styles);

      return expect(flatten).toEqual({ fontSize: 16, color: 'white' });
    });
  });

  describe('attribute expansion', () => {
    const expand = (style, expected) => {
      const stylesheet = StyleSheet.resolve(style);

      return expect(Object.keys(stylesheet).sort()).toEqual(expected.sort());
    };

    test('should expand borderColor attribute', () => {
      const expectedKeys = [
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
      ];
      expand({ borderColor: 'red' }, expectedKeys);
    });

    test('should expand borderRadius attribute', () => {
      const expectedKeys = [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomRightRadius',
        'borderBottomLeftRadius',
      ];
      expand({ borderRadius: 5 }, expectedKeys);
    });

    test('should expand borderStyle attribute', () => {
      const expectedKeys = [
        'borderTopStyle',
        'borderRightStyle',
        'borderBottomStyle',
        'borderLeftStyle',
      ];
      expand({ borderStyle: 'solid' }, expectedKeys);
    });

    test('should expand borderWidth attribute', () => {
      const expectedKeys = [
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
      ];
      expand({ borderWidth: 5 }, expectedKeys);
    });
  });

  describe('media queries', () => {
    test('should resolve media queries', () => {
      const styles = StyleSheet.resolve(
        {
          '@media max-height: 500': {
            color: 'red',
          },
        },
        { height: 300 },
      );

      expect(styles).toEqual({ color: 'red' });
    });
  });
});
