import Yoga from 'yoga-layout-prebuilt';
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
      expand({ border: '1px solid red' }, expectedKeys);
    });

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

  describe('units conversion', () => {
    test('Should transform width in dimensions', () => {
      const styles = StyleSheet.resolve({ width: '1in' });

      expect(styles.width).toBe(72);
    });

    test('Should transform min/max width in dimensions', () => {
      const styles = StyleSheet.resolve({ minWidth: '1in', maxWidth: '2in' });

      expect(styles.minWidth).toBe(72);
      expect(styles.maxWidth).toBe(72 * 2);
    });

    test('Should transform width mm dimensions', () => {
      const styles = StyleSheet.resolve({ width: '1mm' });

      expect(styles.width).toBeCloseTo(2.83, 1);
    });

    test('Should transform min/max width mm dimensions', () => {
      const styles = StyleSheet.resolve({ minWidth: '1mm', maxWidth: '2mm' });

      expect(styles.minWidth).toBeCloseTo(2.83, 1);
      expect(styles.maxWidth).toBeCloseTo(2.83 * 2, 1);
    });

    test('Should transform width cm dimensions', () => {
      const styles = StyleSheet.resolve({ width: '1cm' });

      expect(styles.width).toBeCloseTo(28.346, 1);
    });

    test('Should transform min/max width cm dimensions', () => {
      const styles = StyleSheet.resolve({ minWidth: '1cm', maxWidth: '2cm' });

      expect(styles.minWidth).toBeCloseTo(28.346, 1);
      expect(styles.maxWidth).toBeCloseTo(28.346 * 2, 1);
    });

    test('Should transform height in dimensions', () => {
      const styles = StyleSheet.resolve({ height: '1in' });

      expect(styles.height).toBe(72);
    });

    test('Should transform min/max height in dimensions', () => {
      const styles = StyleSheet.resolve({ minHeight: '1in', maxHeight: '2in' });

      expect(styles.minHeight).toBe(72);
      expect(styles.maxHeight).toBe(72 * 2);
    });

    test('Should transform height mm dimensions', () => {
      const styles = StyleSheet.resolve({ height: '1mm' });

      expect(styles.height).toBeCloseTo(2.83, 1);
    });

    test('Should transform min/max height mm dimensions', () => {
      const styles = StyleSheet.resolve({ minHeight: '1mm', maxHeight: '2mm' });

      expect(styles.minHeight).toBeCloseTo(2.83, 1);
      expect(styles.maxHeight).toBeCloseTo(2.83 * 2, 1);
    });

    test('Should transform height cm dimensions', () => {
      const styles = StyleSheet.resolve({ height: '1cm' });

      expect(styles.height).toBeCloseTo(28.346, 1);
    });

    test('Should transform min/max height cm dimensions', () => {
      const styles = StyleSheet.resolve({ minHeight: '1cm', maxHeight: '2cm' });

      expect(styles.minHeight).toBeCloseTo(28.346, 1);
      expect(styles.maxHeight).toBeCloseTo(28.346 * 2, 1);
    });

    test('Should transform expanded margin in dimensions', () => {
      const styles = StyleSheet.resolve({
        marginTop: '1in',
        marginRight: '2in',
        marginBottom: '3in',
        marginLeft: '4in',
      });

      expect(styles.marginTop).toBe(72);
      expect(styles.marginRight).toBe(72 * 2);
      expect(styles.marginBottom).toBe(72 * 3);
      expect(styles.marginLeft).toBe(72 * 4);
    });

    test('Should transform compacted margin in dimensions', () => {
      const styles = StyleSheet.resolve({ margin: '1in' });

      expect(styles.marginTop).toBe(72);
      expect(styles.marginRight).toBe(72);
      expect(styles.marginBottom).toBe(72);
      expect(styles.marginLeft).toBe(72);
    });

    test('Should transform expanded padding in dimensions', () => {
      const styles = StyleSheet.resolve({
        paddingTop: '1in',
        paddingRight: '2in',
        paddingBottom: '3in',
        paddingLeft: '4in',
      });

      expect(styles.paddingTop).toBe(72);
      expect(styles.paddingRight).toBe(72 * 2);
      expect(styles.paddingBottom).toBe(72 * 3);
      expect(styles.paddingLeft).toBe(72 * 4);
    });

    test('Should transform compacted padding in dimensions', () => {
      const styles = StyleSheet.resolve({ padding: '1in' });

      expect(styles.paddingTop).toBe(72);
      expect(styles.paddingRight).toBe(72);
      expect(styles.paddingBottom).toBe(72);
      expect(styles.paddingLeft).toBe(72);
    });

    test('Should transform expanded margin mm dimensions', () => {
      const styles = StyleSheet.resolve({
        marginTop: '1mm',
        marginRight: '2mm',
        marginBottom: '3mm',
        marginLeft: '4mm',
      });

      expect(styles.marginTop).toBeCloseTo(2.83, 1);
      expect(styles.marginRight).toBeCloseTo(2.83 * 2, 1);
      expect(styles.marginBottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.marginLeft).toBeCloseTo(2.83 * 4, 1);
    });

    test('Should transform compacted margin mm dimensions', () => {
      const styles = StyleSheet.resolve({ margin: '1mm' });

      expect(styles.marginTop).toBeCloseTo(2.83, 1);
      expect(styles.marginRight).toBeCloseTo(2.83, 1);
      expect(styles.marginBottom).toBeCloseTo(2.83, 1);
      expect(styles.marginLeft).toBeCloseTo(2.83, 1);
    });

    test('Should transform expanded padding mm dimensions', () => {
      const styles = StyleSheet.resolve({
        paddingTop: '1mm',
        paddingRight: '2mm',
        paddingBottom: '3mm',
        paddingLeft: '4mm',
      });

      expect(styles.paddingTop).toBeCloseTo(2.83, 1);
      expect(styles.paddingRight).toBeCloseTo(2.83 * 2, 1);
      expect(styles.paddingBottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.paddingLeft).toBeCloseTo(2.83 * 4, 1);
    });

    test('Should transform compacted padding mm dimensions', () => {
      const styles = StyleSheet.resolve({ padding: '1mm' });

      expect(styles.paddingTop).toBeCloseTo(2.83, 1);
      expect(styles.paddingRight).toBeCloseTo(2.83, 1);
      expect(styles.paddingBottom).toBeCloseTo(2.83, 1);
      expect(styles.paddingLeft).toBeCloseTo(2.83, 1);
    });

    test('Should transform expanded margin cm dimensions', () => {
      const styles = StyleSheet.resolve({
        marginTop: '1cm',
        marginRight: '2cm',
        marginBottom: '3cm',
        marginLeft: '4cm',
      });

      expect(styles.marginTop).toBeCloseTo(28.346, 1);
      expect(styles.marginRight).toBeCloseTo(28.346 * 2, 1);
      expect(styles.marginBottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.marginLeft).toBeCloseTo(28.346 * 4, 1);
    });

    test('Should transform compacted margin cm dimensions', () => {
      const styles = StyleSheet.resolve({ margin: '1cm' });

      expect(styles.marginTop).toBeCloseTo(28.346, 1);
      expect(styles.marginRight).toBeCloseTo(28.346, 1);
      expect(styles.marginBottom).toBeCloseTo(28.346, 1);
      expect(styles.marginLeft).toBeCloseTo(28.346, 1);
    });

    test('Should transform expanded padding cm dimensions', () => {
      const styles = StyleSheet.resolve({
        paddingTop: '1cm',
        paddingRight: '2cm',
        paddingBottom: '3cm',
        paddingLeft: '4cm',
      });

      expect(styles.paddingTop).toBeCloseTo(28.346, 1);
      expect(styles.paddingRight).toBeCloseTo(28.346 * 2, 1);
      expect(styles.paddingBottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.paddingLeft).toBeCloseTo(28.346 * 4, 1);
    });

    test('Should transform compacted padding cm dimensions', () => {
      const styles = StyleSheet.resolve({ padding: '1cm' });

      expect(styles.paddingTop).toBeCloseTo(28.346, 1);
      expect(styles.paddingRight).toBeCloseTo(28.346, 1);
      expect(styles.paddingBottom).toBeCloseTo(28.346, 1);
      expect(styles.paddingLeft).toBeCloseTo(28.346, 1);
    });

    test('Should transform positions in in dimensions', () => {
      const styles = StyleSheet.resolve({
        top: '1in',
        right: '2in',
        bottom: '3in',
        left: '4in',
      });

      expect(styles.top).toBe(72);
      expect(styles.right).toBe(72 * 2);
      expect(styles.bottom).toBe(72 * 3);
      expect(styles.left).toBe(72 * 4);
    });

    test('Should transform positions in mm dimensions', () => {
      const styles = StyleSheet.resolve({
        top: '1mm',
        right: '2mm',
        bottom: '3mm',
        left: '4mm',
      });

      expect(styles.top).toBeCloseTo(2.83, 1);
      expect(styles.right).toBeCloseTo(2.83 * 2, 1);
      expect(styles.bottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.left).toBeCloseTo(2.83 * 4, 1);
    });

    test('Should transform positions in cm dimensions', () => {
      const styles = StyleSheet.resolve({
        top: '1cm',
        right: '2cm',
        bottom: '3cm',
        left: '4cm',
      });

      expect(styles.top).toBeCloseTo(28.346, 1);
      expect(styles.right).toBeCloseTo(28.346 * 2, 1);
      expect(styles.bottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.left).toBeCloseTo(28.346 * 4, 1);
    });

    test('Should transform expanded borders in in', () => {
      const styles = StyleSheet.resolve({
        borderTopWidth: '1in',
        borderRightWidth: '2in',
        borderBottomWidth: '3in',
        borderLeftWidth: '4in',
      });

      expect(styles.borderTopWidth).toBe(72);
      expect(styles.borderRightWidth).toBe(72 * 2);
      expect(styles.borderBottomWidth).toBe(72 * 3);
      expect(styles.borderLeftWidth).toBe(72 * 4);
    });

    test('Should transform collapsed borders in in', () => {
      const styles = StyleSheet.resolve({ borderWidth: '1in' });

      expect(styles.borderTopWidth).toBe(72);
      expect(styles.borderRightWidth).toBe(72);
      expect(styles.borderBottomWidth).toBe(72);
      expect(styles.borderLeftWidth).toBe(72);
    });

    test('Should transform shortcut borders in in', () => {
      const styles = StyleSheet.resolve({ border: '1in solid red' });

      expect(styles.borderTopWidth).toBe(72);
      expect(styles.borderRightWidth).toBe(72);
      expect(styles.borderBottomWidth).toBe(72);
      expect(styles.borderLeftWidth).toBe(72);
    });

    test('Should transform expanded borders in mm', () => {
      const styles = StyleSheet.resolve({
        borderTopWidth: '1mm',
        borderRightWidth: '2mm',
        borderBottomWidth: '3mm',
        borderLeftWidth: '4mm',
      });

      expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderRightWidth).toBeCloseTo(2.83 * 2, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(2.83 * 3, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(2.83 * 4, 1);
    });

    test('Should transform collapsed borders in mm', () => {
      const styles = StyleSheet.resolve({ borderWidth: '1mm' });

      expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderRightWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(2.83, 1);
    });

    test('Should transform shortcut borders in mm', () => {
      const styles = StyleSheet.resolve({ border: '1mm solid red' });

      expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderRightWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(2.83, 1);
    });

    test('Should transform expanded borders in cm', () => {
      const styles = StyleSheet.resolve({
        borderTopWidth: '1cm',
        borderRightWidth: '2cm',
        borderBottomWidth: '3cm',
        borderLeftWidth: '4cm',
      });

      expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderRightWidth).toBeCloseTo(28.346 * 2, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(28.346 * 3, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(28.346 * 4, 1);
    });

    test('Should transform collapsed borders in cm', () => {
      const styles = StyleSheet.resolve({ borderWidth: '1cm' });

      expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderRightWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(28.346, 1);
    });

    test('Should transform shortcut borders in cm', () => {
      const styles = StyleSheet.resolve({ border: '1cm solid red' });

      expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderRightWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(28.346, 1);
    });
  });

  describe('media queries', () => {
    test('should resolve max-height media queries on narrow container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media max-height: 500': {
            color: 'red',
          },
        },
        { height: 300 },
      );

      expect(styles.color).toBe('red');
    });

    test('should resolve max-height media queries on wider container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media max-height: 500': {
            color: 'red',
          },
        },
        { height: 600 },
      );

      expect(styles.color).toBe(undefined);
    });

    test('should resolve max-width media queries on narrow container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media max-width: 500': {
            color: 'red',
          },
        },
        { width: 300 },
      );

      expect(styles.color).toBe('red');
    });

    test('should resolve max-width media queries on wider container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media max-width: 500': {
            color: 'red',
          },
        },
        { width: 600 },
      );

      expect(styles.color).toBe(undefined);
    });

    test('should resolve portrait media queries on portrait container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media orientation: portrait': {
            color: 'red',
          },
        },
        { orientation: 'portrait' },
      );

      expect(styles.color).toBe('red');
    });

    test('should resolve portrait media queries on landscape container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media orientation: portrait': {
            color: 'red',
          },
        },
        { orientation: 'landscape' },
      );

      expect(styles.color).toBe(undefined);
    });

    test('should resolve landscape media queries on landscape container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media orientation: landscape': {
            color: 'red',
          },
        },
        { orientation: 'landscape' },
      );

      expect(styles.color).toBe('red');
    });

    test('should resolve landscape media queries on portrait container', () => {
      const styles = StyleSheet.resolve(
        {
          '@media orientation: landscape': {
            color: 'red',
          },
        },
        { orientation: 'portrait' },
      );

      expect(styles.color).toBe(undefined);
    });
  });
});
