import { describe, expect, test } from '@jest/globals';

import expandStyles from '../src/expand';

describe('stylesheet expand', () => {
  test('should keep unrelated keys equal', () => {
    const style = { color: 'red', backgroundColor: 'red' };
    expect(expandStyles(style)).toEqual(style);
  });

  describe('expand margins', () => {
    test('should ignore invalid values', () => {
      const margins = [
        { margin: '"string"' },
        { margin: 'url("link.com")' },
        { margin: 'auto 2 black 4' },
        { margin: 'calc(100% - 10px)' },
        { margin: 'rgba(1 1 1 / 0.3)' },
        { margin: '1, 2, 3' },
        { marginLeft: 'yellow' },
        { marginTop: '12lelkek' },
        { marginBottom: '1 2 3' },
        { marginHorizontal: '1 2 3' },
        { margin: '1 2 3 4 5' },
        { margin: () => console.log('function') },
      ];
      const expanded = {};

      margins.forEach(style => {
        expect(expandStyles(style)).toEqual(expanded);
      });
    });

    test('should parse values with improper formatting', () => {
      const style = { margin: '  1 ' };
      const expanded = {
        marginTop: '1',
        marginRight: '1',
        marginBottom: '1',
        marginLeft: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand marginHorizontal attribute', () => {
      const margins = [{ marginHorizontal: '1 2' }, { marginHorizontal: '2' }];
      const expandedMargins = [
        {
          marginRight: '1',
          marginLeft: '2',
        },
        {
          marginRight: '2',
          marginLeft: '2',
        },
      ];

      margins.forEach((style, index) => {
        expect(expandStyles(style)).toEqual(expandedMargins[index]);
      });
    });

    test('should expand marginHorizontal attribute with auto', () => {
      const style = { marginHorizontal: 'auto' };
      const expanded = {
        marginRight: 'auto',
        marginLeft: 'auto',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand marginVertical attribute', () => {
      const style = { marginVertical: '1' };
      const expanded = {
        marginTop: '1',
        marginBottom: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand marginVertical attribute with auto', () => {
      const style = { marginVertical: 'auto' };
      const expanded = {
        marginTop: 'auto',
        marginBottom: 'auto',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand margin attribute', () => {
      const style = { margin: '1 2 3 4' };
      const expanded = {
        marginTop: '1',
        marginRight: '2',
        marginBottom: '3',
        marginLeft: '4',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand margin attribute with auto', () => {
      const margins = [
        { margin: 'auto 2 3 4' },
        { margin: '1 auto 3 4' },
        { margin: '1 2 auto 4' },
        { margin: '1 2 3 auto' },
      ];
      const expandedMargins = [
        {
          marginTop: 'auto',
          marginRight: '2',
          marginBottom: '3',
          marginLeft: '4',
        },
        {
          marginTop: '1',
          marginRight: 'auto',
          marginBottom: '3',
          marginLeft: '4',
        },
        {
          marginTop: '1',
          marginRight: '2',
          marginBottom: 'auto',
          marginLeft: '4',
        },
        {
          marginTop: '1',
          marginRight: '2',
          marginBottom: '3',
          marginLeft: 'auto',
        },
      ];

      margins.forEach((style, index) => {
        expect(expandStyles(style)).toEqual(expandedMargins[index]);
      });
    });
  });

  describe('expand paddings', () => {
    test('should ignore invalid values', () => {
      const paddings = [
        { padding: '2 auto' },
        { padding: '"string"' },
        { padding: 'url("link.com")' },
        { padding: 'auto 2 black 4' },
        { padding: 'calc(100% - 10px)' },
        { padding: 'rgba(1 1 1 / 0.3)' },
        { padding: '1, 2, 3' },
        { padding: 'yellow' },
        { paddingTop: '12lelkek' },
        { paddingRight: 'auto' },
        { paddingBottom: '1 2 3' },
        { paddingHorizontal: '1 2 3' },
        { padding: '1 2 3 4 5' },
        { padding: () => console.log('function') },
      ];
      const expanded = {};

      paddings.forEach(style => {
        expect(expandStyles(style)).toEqual(expanded);
      });
    });

    test('should expand paddingHorizontal attribute', () => {
      const style = { paddingHorizontal: '1' };
      const expanded = {
        paddingRight: '1',
        paddingLeft: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand paddingVertical attribute', () => {
      const style = { paddingVertical: '1' };
      const expanded = {
        paddingTop: '1',
        paddingBottom: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand padding attribute', () => {
      const style = { padding: '1 2 3 4' };
      const expanded = {
        paddingTop: '1',
        paddingRight: '2',
        paddingBottom: '3',
        paddingLeft: '4',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });
  });

  describe('expand borders', () => {
    test('should expand borderTop attribute', () => {
      const style = { borderTop: '1 solid red' };
      const expanded = {
        borderTopColor: 'red',
        borderTopStyle: 'solid',
        borderTopWidth: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderRight attribute', () => {
      const style = { borderRight: '1 solid red' };
      const expanded = {
        borderRightColor: 'red',
        borderRightStyle: 'solid',
        borderRightWidth: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderBottom attribute', () => {
      const style = { borderBottom: '1 solid red' };
      const expanded = {
        borderBottomColor: 'red',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderLeft attribute', () => {
      const style = { borderLeft: '1 solid red' };
      const expanded = {
        borderLeftColor: 'red',
        borderLeftStyle: 'solid',
        borderLeftWidth: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand border attribute', () => {
      const style = { border: '1 solid red' };
      const expanded = {
        borderTopColor: 'red',
        borderTopStyle: 'solid',
        borderTopWidth: '1',
        borderRightColor: 'red',
        borderRightStyle: 'solid',
        borderRightWidth: '1',
        borderBottomColor: 'red',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1',
        borderLeftColor: 'red',
        borderLeftStyle: 'solid',
        borderLeftWidth: '1',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderColor attribute', () => {
      const style = { borderColor: 'red' };
      const expanded = {
        borderTopColor: 'red',
        borderRightColor: 'red',
        borderBottomColor: 'red',
        borderLeftColor: 'red',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderRadius attribute', () => {
      const style = { borderRadius: 5 };
      const expanded = {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderStyle attribute', () => {
      const style = { borderStyle: 'solid' };
      const expanded = {
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand borderWidth attribute', () => {
      const style = { borderWidth: 5 };
      const expanded = {
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
      };

      expect(expandStyles(style)).toEqual(expanded);
    });
  });

  describe('expand flex', () => {
    test('should expand flex attribute', () => {
      const style = { flex: '1 2 20%' };
      const expanded = {
        flexGrow: '1',
        flexShrink: '2',
        flexBasis: '20%',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });
  });

  describe('expand object position', () => {
    test('should expand objectPosition attribute', () => {
      const style = { objectPosition: '50% 50%' };
      const expanded = {
        objectPositionX: '50%',
        objectPositionY: '50%',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });
  });

  describe('expand transform origin', () => {
    test('should expand transformOrigin numeric attribute', () => {
      const style = { transformOrigin: '20 30' };
      const expanded = {
        transformOriginX: '20',
        transformOriginY: '30',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin percent attribute', () => {
      const style = { transformOrigin: '50% 50%' };
      const expanded = {
        transformOriginX: '50%',
        transformOriginY: '50%',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand single value transformOrigin shorthand', () => {
      const style = { transformOrigin: '20' };
      const expanded = {
        transformOriginX: '20',
        transformOriginY: 'center',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin left shorthand', () => {
      const style = { transformOrigin: 'left' };
      const expanded = {
        transformOriginX: 'left',
        transformOriginY: 'center',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin top shorthand', () => {
      const style = { transformOrigin: 'top' };
      const expanded = {
        transformOriginX: 'center',
        transformOriginY: 'top',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin right shorthand', () => {
      const style = { transformOrigin: 'right' };
      const expanded = {
        transformOriginX: 'right',
        transformOriginY: 'center',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin bottom shorthand', () => {
      const style = { transformOrigin: 'bottom' };
      const expanded = {
        transformOriginX: 'center',
        transformOriginY: 'bottom',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });

    test('should expand transformOrigin center shorthand', () => {
      const style = { transformOrigin: 'center' };
      const expanded = {
        transformOriginX: 'center',
        transformOriginY: 'center',
      };

      expect(expandStyles(style)).toEqual(expanded);
    });
  });
});
