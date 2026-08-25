import { describe, expect, test } from 'vitest';
import { createTw } from '../src';
import { rem, round } from '../src/utils';

const colors = [
  ['inherit', 'inherit'],
  ['current', 'currentColor'],
  ['transparent', 'transparent'],
  ['black', 'black'],
  ['white', 'white'],
  ['gray-500', '#6b7280'],
  ['badass', '#bada55'],
  ['myblue-300', '#5778d4'],
  ['myblue-500', '#2546a1'],
  ['[#bada55]', '#bada55'],
  ['[rgb(69,69,69)]', 'rgb(69,69,69)'],
  ['[hsl(69,69,69)]', 'hsl(69,69,69)'],
];

const customSpacing = [
  ['[6.9rem]', rem(6.9)],
  ['[69]', 69],
];

const spacing = [
  ['0', 0],
  ['px', 1],
  ['0.5', rem(0.125)],
  ['1', rem(0.25)],
  ['96', rem(24)],
  ['420', rem(69)],
  ...customSpacing,
];

const inset = [
  ['auto', 'auto'],
  ['1/2', '50%'],
  ['1/3', '33.333333%'],
  ['2/3', '66.666667%'],
  ['1/4', '25%'],
  ['2/4', '50%'],
  ['3/4', '75%'],
  ['full', '100%'],
  ...spacing,
];

const width = [
  ['auto', 'auto'],
  ['1/2', '50%'],
  ['1/3', '33.333333%'],
  ['2/3', '66.666667%'],
  ['1/4', '25%'],
  ['2/4', '50%'],
  ['3/4', '75%'],
  ['1/5', '20%'],
  ['2/5', '40%'],
  ['3/5', '60%'],
  ['4/5', '80%'],
  ['1/6', '16.666667%'],
  ['2/6', '33.333333%'],
  ['3/6', '50%'],
  ['4/6', '66.666667%'],
  ['5/6', '83.333333%'],
  ['1/12', '8.333333%'],
  ['2/12', '16.666667%'],
  ['3/12', '25%'],
  ['4/12', '33.333333%'],
  ['5/12', '41.666667%'],
  ['6/12', '50%'],
  ['7/12', '58.333333%'],
  ['8/12', '66.666667%'],
  ['9/12', '75%'],
  ['10/12', '83.333333%'],
  ['11/12', '91.666667%'],
  ...spacing,
];

const extendedWidth = [...width, ['full', '100%'], ['screen', '100vw']];

const height = [
  ['auto', 'auto'],
  ['1/2', '50%'],
  ['1/3', '33.333333%'],
  ['2/3', '66.666667%'],
  ['1/4', '25%'],
  ['2/4', '50%'],
  ['3/4', '75%'],
  ['1/5', '20%'],
  ['2/5', '40%'],
  ['3/5', '60%'],
  ['4/5', '80%'],
  ['1/6', '16.666667%'],
  ['2/6', '33.333333%'],
  ['3/6', '50%'],
  ['4/6', '66.666667%'],
  ['5/6', '83.333333%'],
  ['full', '100%'],
  ['screen', '100vh'],
  ...spacing,
];

const tw = createTw({
  fontFamily: {
    sans: ['Papyrus', 'ignored'],
    nice: ['Comic Sans'],
  },
  spacing: {
    '420': '69rem',
  },
  colors: {
    badass: '#bada55',
    myblue: {
      300: '#5778d4',
      500: '#2546a1',
    },
  },
});

const customPtPerRem = 16;

const twWithCustomPtPerRem = createTw({}, { ptPerRem: customPtPerRem });

describe('Layout', () => {
  describe('display', () => {
    test.each([
      ['flex', 'flex'],
      ['hidden', 'none'],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        display: value,
      });
    });
  });

  describe('object-fit', () => {
    test.each([['contain'], ['cover'], ['fill'], ['none'], ['scale-down']])(
      '%s',
      (value) => {
        expect(tw(`object-${value}`)).toEqual({
          objectFit: value,
        });
      },
    );
  });

  describe('object-position', () => {
    test.each([
      ['bottom', 'bottom'],
      ['center', 'center'],
      ['left', 'left'],
      ['left-bottom', 'left bottom'],
      ['left-top', 'left top'],
      ['right', 'right'],
      ['right-bottom', 'right bottom'],
      ['right-top', 'right top'],
      ['top', 'top'],
      ['[69%_69%]', '69% 69%'],
    ])('%s', (key, value) => {
      expect(tw(`object-${key}`)).toEqual({
        objectPosition: value,
      });
    });
  });

  describe('overflow', () => {
    test.each([['hidden', { overflow: 'hidden' }]])('%s', (key, rule) => {
      expect(tw(`overflow-${key}`)).toEqual(rule);
    });
  });

  describe('position', () => {
    test.each([['absolute'], ['relative']])('%s', (value) => {
      expect(tw(value)).toEqual({
        position: value,
      });
    });
  });

  describe('aspect-ratio', () => {
    test.each([
      ['square', 1],
      ['video', 16 / 9],
      ['[4/3]', 4 / 3],
      ['[16/10]', 1.6],
      ['[2]', 2],
      ['3/2', 1.5],
    ])('%s', (key, value) => {
      expect(tw(`aspect-${key}`)).toEqual({
        aspectRatio: round(value as number),
      });
    });

    // react-pdf has no style value meaning "no aspect ratio"; omitting the
    // property is the reset.
    test('auto is unsupported', () => {
      expect(tw('aspect-auto')).toEqual({});
    });
  });

  describe('float', () => {
    test.each([['left'], ['right'], ['none']])('%s', (value) => {
      expect(tw(`float-${value}`)).toEqual({
        float: value,
      });
    });
  });

  describe('clear', () => {
    test.each([['left'], ['right'], ['both'], ['none']])('%s', (value) => {
      expect(tw(`clear-${value}`)).toEqual({
        clear: value,
      });
    });
  });

  describe('top / right / bottom / left', () => {
    describe('inset', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`inset-${key}`)).toEqual({
          top: value,
          right: value,
          bottom: value,
          left: value,
        });
      });
    });

    describe('inset-x', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`inset-x-${key}`)).toEqual({
          left: value,
          right: value,
        });
      });
    });

    describe('inset-y', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`inset-y-${key}`)).toEqual({
          top: value,
          bottom: value,
        });
      });
    });

    describe('top', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`top-${key}`)).toEqual({
          top: value,
        });
      });
    });

    describe('right', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`right-${key}`)).toEqual({
          right: value,
        });
      });
    });

    describe('bottom', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`bottom-${key}`)).toEqual({
          bottom: value,
        });
      });
    });

    describe('left', () => {
      test.each(inset)('%s', (key, value) => {
        expect(tw(`left-${key}`)).toEqual({
          left: value,
        });
      });
    });
  });

  describe('z-index', () => {
    test.each([
      ['0', 0],
      ['10', 10],
      ['20', 20],
      ['30', 30],
      ['40', 40],
      ['50', 50],
      ['auto', 'auto'],
      ...customSpacing,
    ])('%s', (key, value) => {
      expect(tw(`z-${key}`)).toEqual({
        zIndex: value,
      });
    });
  });
});

describe('Flexbox', () => {
  describe('flex-basis', () => {
    test.each(width)('%s', (key, value) => {
      expect(tw(`basis-${key}`)).toEqual({
        flexBasis: value,
      });
    });
  });

  describe('flex-direction', () => {
    test.each([
      ['row', 'row'],
      ['row-reverse', 'row-reverse'],
      ['col', 'column'],
      ['col-reverse', 'column-reverse'],
    ])('%s', (key, value) => {
      expect(tw(`flex-${key}`)).toEqual({
        flexDirection: value,
      });
    });
  });

  describe('flex-wrap', () => {
    test.each([['wrap'], ['wrap-reverse'], ['nowrap']])('%s', (value) => {
      expect(tw(`flex-${value}`)).toEqual({
        flexWrap: value,
      });
    });
  });

  describe('flex', () => {
    test.each([
      ['1', '1 1 0%'],
      ['auto', '1 1 auto'],
      ['initial', '0 1 auto'],
      ['none', 'none'],
      ['[2_2_0%]', '2 2 0%'],
    ])('%s', (key, value) => {
      expect(tw(`flex-${key}`)).toEqual({
        flex: value,
      });
    });
  });

  describe('gap', () => {
    describe('gap', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`gap-${key}`)).toEqual({
          gap: value,
        });
      });
    });

    describe('gap-x', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`gap-x-${key}`)).toEqual({
          columnGap: value,
        });
      });
    });

    describe('gap-y', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`gap-y-${key}`)).toEqual({
          rowGap: value,
        });
      });
    });
  });

  describe('flex-grow', () => {
    test.each([
      ['grow', 1],
      ['grow-0', 0],
      ['grow-[2]', 2],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        flexGrow: value,
      });
    });
  });

  describe('flex-shrink', () => {
    test.each([
      ['shrink', 1],
      ['shrink-0', 0],
      ['shrink-[2]', 2],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        flexShrink: value,
      });
    });
  });

  describe('order', () => {
    test.each([
      ['1', 1],
      ['2', 2],
      ['3', 3],
      ['4', 4],
      ['5', 5],
      ['6', 6],
      ['7', 7],
      ['8', 8],
      ['9', 9],
      ['10', 10],
      ['11', 11],
      ['12', 12],
      ['first', -9999],
      ['last', 9999],
      ['none', 0],
    ])('%s', (key, value) => {
      expect(tw(`order-${key}`)).toEqual({
        order: value,
      });
    });
  });

  describe('justify-content', () => {
    test.each([
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
      ['between', 'space-between'],
      ['around', 'space-around'],
      ['evenly', 'space-evenly'],
    ])('%s', (key, value) => {
      expect(tw(`justify-${key}`)).toEqual({
        justifyContent: value,
      });
    });
  });

  describe('align-content', () => {
    test.each([
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
      ['between', 'space-between'],
      ['around', 'space-around'],
    ])('%s', (key, value) => {
      expect(tw(`content-${key}`)).toEqual({
        alignContent: value,
      });
    });
  });

  describe('align-items', () => {
    test.each([
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
      ['baseline', 'baseline'],
      ['stretch', 'stretch'],
    ])('%s', (key, value) => {
      expect(tw(`items-${key}`)).toEqual({
        alignItems: value,
      });
    });
  });

  describe('align-self', () => {
    test.each([
      ['auto', 'auto'],
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
      ['baseline', 'baseline'],
      ['stretch', 'stretch'],
    ])('%s', (key, value) => {
      expect(tw(`self-${key}`)).toEqual({
        alignSelf: value,
      });
    });
  });
});

describe('Spacing', () => {
  describe('padding', () => {
    describe('padding', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`p-${key}`)).toEqual({
          padding: value,
        });
      });
    });

    describe('padding-x', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`px-${key}`)).toEqual({
          paddingLeft: value,
          paddingRight: value,
        });
      });
    });

    describe('padding-y', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`py-${key}`)).toEqual({
          paddingTop: value,
          paddingBottom: value,
        });
      });
    });

    describe('padding-top', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`pt-${key}`)).toEqual({
          paddingTop: value,
        });
      });
    });

    describe('padding-right', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`pr-${key}`)).toEqual({
          paddingRight: value,
        });
      });
    });

    describe('padding-bottom', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`pb-${key}`)).toEqual({
          paddingBottom: value,
        });
      });
    });

    describe('padding-left', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`pl-${key}`)).toEqual({
          paddingLeft: value,
        });
      });
    });
  });

  describe('margin', () => {
    describe('margin', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`m-${key}`)).toEqual({
          margin: value,
        });
      });
    });

    describe('margin-x', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`mx-${key}`)).toEqual({
          marginLeft: value,
          marginRight: value,
        });
      });
    });

    describe('margin-y', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`my-${key}`)).toEqual({
          marginTop: value,
          marginBottom: value,
        });
      });
    });

    describe('margin-top', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`mt-${key}`)).toEqual({
          marginTop: value,
        });
      });
    });

    describe('margin-right', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`mr-${key}`)).toEqual({
          marginRight: value,
        });
      });
    });

    describe('margin-bottom', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`mb-${key}`)).toEqual({
          marginBottom: value,
        });
      });
    });

    describe('margin-left', () => {
      test.each(spacing)('%s', (key, value) => {
        expect(tw(`ml-${key}`)).toEqual({
          marginLeft: value,
        });
      });
    });
  });
});

describe('Sizing', () => {
  describe('width', () => {
    test.each(extendedWidth)('%s', (key, value) => {
      expect(tw(`w-${key}`)).toEqual({
        width: value,
      });
    });
  });

  describe('min-width', () => {
    test.each([
      ['0', 0],
      ['full', '100%'],
      ['[69rem]', rem(69)],
    ])('%s', (key, value) => {
      expect(tw(`min-w-${key}`)).toEqual({
        minWidth: value,
      });
    });
  });

  describe('max-width', () => {
    test.each([
      ['0', 0],
      ['full', '100%'],
      ['[69rem]', rem(69)],
    ])('%s', (key, value) => {
      expect(tw(`max-w-${key}`)).toEqual({
        maxWidth: value,
      });
    });
  });

  describe('height', () => {
    test.each(height)('%s', (key, value) => {
      expect(tw(`h-${key}`)).toEqual({
        height: value,
      });
    });
  });

  describe('min-height', () => {
    test.each([
      ['0', 0],
      ['full', '100%'],
      ['[69rem]', rem(69)],
    ])('%s', (key, value) => {
      expect(tw(`min-h-${key}`)).toEqual({
        minHeight: value,
      });
    });
  });

  describe('max-height', () => {
    test.each([
      ['0', 0],
      ['full', '100%'],
      ['[69rem]', rem(69)],
    ])('%s', (key, value) => {
      expect(tw(`max-h-${key}`)).toEqual({
        maxHeight: value,
      });
    });
  });

  describe('size', () => {
    test.each([
      ['0', 0],
      ['px', 1],
      ['4', rem(1)],
      ['1/2', '50%'],
      ['full', '100%'],
      ['[3rem]', rem(3)],
    ])('%s', (key, value) => {
      expect(tw(`size-${key}`)).toEqual({
        width: value,
        height: value,
      });
    });
  });
});

describe('Typography', () => {
  test('font-family', () => {
    expect(tw('font-sans')).toEqual({
      fontFamily: 'Papyrus',
    });
    expect(tw('font-nice')).toEqual({
      fontFamily: 'Comic Sans',
    });
    expect(tw('font-[Comic_Sans]')).toEqual({
      fontFamily: 'Comic Sans',
    });
  });

  describe('font-size', () => {
    test.each([
      ['xs', [rem(0.75), 1]],
      ['sm', [rem(0.875), 1.25]],
      ['base', [rem(1), 1.5]],
      ['lg', [rem(1.125), 1.75]],
      ['xl', [rem(1.25), 1.75]],
      ['2xl', [rem(1.5), 2]],
      ['3xl', [rem(1.875), 2.25]],
      ['4xl', [rem(2.25), 2.5]],
      ['5xl', [rem(3), 1]],
      ['6xl', [rem(3.75), 1]],
      ['7xl', [rem(4.5), 1]],
      ['8xl', [rem(6), 1]],
      ['9xl', [rem(8), 1]],
      ['[69rem]', [rem(69)]],
    ])('%s', (key, [fontSize, lineHeight]) => {
      expect(tw(`text-${key}`)).toEqual({
        fontSize,
        ...(lineHeight ? { lineHeight } : null),
      });
    });
  });

  describe('custom font-size', () => {
    test.each([
      ['xs', [rem(0.75, customPtPerRem), 1]],
      ['sm', [rem(0.875, customPtPerRem), 1.25]],
      ['base', [rem(1, customPtPerRem), 1.5]],
      ['lg', [rem(1.125, customPtPerRem), 1.75]],
      ['xl', [rem(1.25, customPtPerRem), 1.75]],
      ['2xl', [rem(1.5, customPtPerRem), 2]],
      ['3xl', [rem(1.875, customPtPerRem), 2.25]],
      ['4xl', [rem(2.25, customPtPerRem), 2.5]],
      ['5xl', [rem(3, customPtPerRem), 1]],
      ['6xl', [rem(3.75, customPtPerRem), 1]],
      ['7xl', [rem(4.5, customPtPerRem), 1]],
      ['8xl', [rem(6, customPtPerRem), 1]],
      ['9xl', [rem(8, customPtPerRem), 1]],
      ['[69rem]', [rem(69, customPtPerRem)]],
    ])('%s', (key, [fontSize, lineHeight]) => {
      expect(twWithCustomPtPerRem(`text-${key}`)).toEqual({
        fontSize,
        ...(lineHeight ? { lineHeight } : null),
      });
    });
  });

  describe('font-style', () => {
    test.each([
      ['italic', 'italic'],
      ['not-italic', 'normal'],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        fontStyle: value,
      });
    });
  });

  describe('font-weight', () => {
    test.each([
      ['thin', 100],
      ['extralight', 200],
      ['light', 300],
      ['normal', 400],
      ['medium', 500],
      ['semibold', 600],
      ['bold', 700],
      ['extrabold', 800],
      ['black', 900],
    ])('%s', (key, value) => {
      expect(tw(`font-${key}`)).toEqual({
        fontWeight: value,
      });
    });
  });

  describe('letter-spacing', () => {
    test.each([
      ['tighter', -0.05],
      ['tight', -0.025],
      ['normal', 0],
      ['wide', 0.025],
      ['wider', 0.05],
      ['widest', 0.1],
    ])('%s', (key, value) => {
      expect(tw(`tracking-${key}`)).toEqual({
        letterSpacing: rem(value),
      });
    });
  });

  describe('line-height', () => {
    test.each([
      ['none', 1],
      ['tight', 1.25],
      ['snug', 1.375],
      ['normal', 1.5],
      ['relaxed', 1.625],
      ['loose', 2],
      ['3', 0.75],
      ['4', 1],
      ['5', 1.25],
      ['6', 1.5],
      ['7', 1.75],
      ['8', 2],
      ['9', 2.25],
      ['10', 2.5],
    ])('%s', (key, value) => {
      expect(tw(`leading-${key}`)).toEqual({
        lineHeight: value,
      });
    });
  });

  describe('text-align', () => {
    test.each([['left'], ['center'], ['right'], ['justify']])('%s', (value) => {
      expect(tw(`text-${value}`)).toEqual({
        textAlign: value,
      });
    });
  });

  describe('text-color', () => {
    test.each(colors)('%s', (key, value) => {
      expect(tw(`text-${key}`)).toEqual({
        color: value,
      });
    });
  });

  describe('text-decoration', () => {
    test.each([
      ['underline', 'underline'],
      ['line-through', 'line-through'],
      ['no-underline', 'none'],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        textDecoration: value,
      });
    });
  });

  describe('text-decoration-color', () => {
    test.each(colors)('%s', (key, value) => {
      expect(tw(`decoration-${key}`)).toEqual({
        textDecorationColor: value,
      });
    });
  });

  describe('text-decoration-style', () => {
    test.each([['solid'], ['double'], ['dotted'], ['dashed'], ['wavy']])(
      '%s',
      (value) => {
        expect(tw(`decoration-${value}`)).toEqual({
          textDecorationStyle: value,
        });
      },
    );
  });

  describe('text-overflow', () => {
    test.each([
      [
        'truncate',
        {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      ],
      [
        'text-ellipsis',
        {
          textOverflow: 'ellipsis',
        },
      ],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual(value);
    });
  });

  describe('text-indent', () => {
    test.each([
      ['0', 0],
      ['px', 1],
      ['1', rem(0.25)],
      ['96', rem(24)],
    ])('%s', (key, value) => {
      expect(tw(`indent-${key}`)).toEqual({
        textIndent: value,
      });
    });
  });

  describe('text-transform', () => {
    test.each([
      ['uppercase', 'uppercase'],
      ['lowercase', 'lowercase'],
      ['capitalize', 'capitalize'],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        textTransform: value,
      });
    });
  });

  describe('line-clamp', () => {
    test.each([
      ['1', 1],
      ['3', 3],
      ['6', 6],
      ['[10]', 10],
    ])('%s', (key, value) => {
      expect(tw(`line-clamp-${key}`)).toEqual({
        maxLines: value,
      });
    });

    // textkit treats only a nil maxLines as unlimited, so 0 would clamp to
    // zero lines rather than reset.
    test('none is unsupported', () => {
      expect(tw('line-clamp-none')).toEqual({});
    });
  });

  describe('font-variant-numeric', () => {
    test.each([
      ['ordinal', 'ordn'],
      ['slashed-zero', 'zero'],
      ['lining-nums', 'lnum'],
      ['oldstyle-nums', 'onum'],
      ['proportional-nums', 'pnum'],
      ['tabular-nums', 'tnum'],
      ['diagonal-fractions', 'frac'],
      ['stacked-fractions', 'afrc'],
    ])('%s', (key, value) => {
      expect(tw(key)).toEqual({
        fontFeatureSettings: [value],
      });
    });

    test('stacks tags', () => {
      expect(tw('tabular-nums slashed-zero ordinal')).toEqual({
        fontFeatureSettings: ['tnum', 'zero', 'ordn'],
      });
    });
  });
});

describe('Backgrounds', () => {
  describe('background-color', () => {
    test.each([
      ['inherit', 'inherit'],
      ['current', 'currentColor'],
      ['transparent', 'transparent'],
    ])('%s', (key, value) => {
      expect(tw(`bg-${key}`)).toEqual({
        backgroundColor: value,
      });
    });

    test.each(colors)('%s', (key, value) => {
      expect(tw(`bg-${key}`)).toEqual({
        backgroundColor: value,
      });
    });
  });
});

describe('Borders', () => {
  const borderRadii = [
    ['none', 0],
    ['sm', rem(0.125)],
    ['DEFAULT', rem(0.25)],
    ['md', rem(0.375)],
    ['lg', rem(0.5)],
    ['xl', rem(0.75)],
    ['2xl', rem(1)],
    ['3xl', rem(1.5)],
    ['full', 9999],
    ...customSpacing,
  ];
  describe('border-radius', () => {
    describe('border-radius', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-${key}`)).toEqual({
          borderRadius: value,
        });
      });
    });

    describe('border-radius-t', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-t-${key}`)).toEqual({
          borderTopLeftRadius: value,
          borderTopRightRadius: value,
        });
      });
    });

    describe('border-radius-r', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-r-${key}`)).toEqual({
          borderTopRightRadius: value,
          borderBottomRightRadius: value,
        });
      });
    });

    describe('border-radius-b', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-b-${key}`)).toEqual({
          borderBottomRightRadius: value,
          borderBottomLeftRadius: value,
        });
      });
    });

    describe('border-radius-l', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-l-${key}`)).toEqual({
          borderBottomLeftRadius: value,
          borderTopLeftRadius: value,
        });
      });
    });

    describe('border-radius-tl', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-tl-${key}`)).toEqual({
          borderTopLeftRadius: value,
        });
      });
    });

    describe('border-radius-tr', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-tr-${key}`)).toEqual({
          borderTopRightRadius: value,
        });
      });
    });

    describe('border-radius-br', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-br-${key}`)).toEqual({
          borderBottomRightRadius: value,
        });
      });
    });

    describe('border-radius-bl', () => {
      test.each(borderRadii)('%s', (key, value) => {
        expect(tw(`rounded-bl-${key}`)).toEqual({
          borderBottomLeftRadius: value,
        });
      });
    });
  });

  describe('border-width', () => {
    const borderWidths = [
      ['DEFAULT', 1],
      [0, 0],
      [2, 2],
      [4, 4],
      [8, 8],
      ...customSpacing,
    ];

    describe('border-width', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-${key}`)).toEqual({
          borderWidth: value,
        });
      });
    });

    describe('border-width-x', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-x-${key}`)).toEqual({
          borderLeftWidth: value,
          borderRightWidth: value,
        });
      });
    });

    describe('border-width-y', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-y-${key}`)).toEqual({
          borderTopWidth: value,
          borderBottomWidth: value,
        });
      });
    });

    describe('border-width-t', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-t-${key}`)).toEqual({
          borderTopWidth: value,
        });
      });
    });

    describe('border-width-r', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-r-${key}`)).toEqual({
          borderRightWidth: value,
        });
      });
    });

    describe('border-width-b', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-b-${key}`)).toEqual({
          borderBottomWidth: value,
        });
      });
    });

    describe('border-width-l', () => {
      test.each(borderWidths)('%s', (key, value) => {
        expect(tw(`border-l-${key}`)).toEqual({
          borderLeftWidth: value,
        });
      });
    });
  });

  describe('border-color', () => {
    describe('border-color', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-${key}`)).toEqual({
          borderColor: value,
        });
      });
    });

    describe('border-color-x', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-x-${key}`)).toEqual({
          borderLeftColor: value,
          borderRightColor: value,
        });
      });
    });

    describe('border-color-y', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-y-${key}`)).toEqual({
          borderTopColor: value,
          borderBottomColor: value,
        });
      });
    });

    describe('border-color-t', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-t-${key}`)).toEqual({
          borderTopColor: value,
        });
      });
    });

    describe('border-color-r', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-r-${key}`)).toEqual({
          borderRightColor: value,
        });
      });
    });

    describe('border-color-b', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-b-${key}`)).toEqual({
          borderBottomColor: value,
        });
      });
    });

    describe('border-color-l', () => {
      test.each(colors)('%s', (key, value) => {
        expect(tw(`border-l-${key}`)).toEqual({
          borderLeftColor: value,
        });
      });
    });
  });

  describe('border-style', () => {
    test.each([['solid'], ['dashed'], ['dotted']])('%s', (value) => {
      expect(tw(`border-${value}`)).toEqual({
        borderStyle: value,
      });
    });
  });
});

describe('Effects', () => {
  describe('opacity', () => {
    test.each([
      [0, 0],
      [5, 0.05],
      [10, 0.1],
      [20, 0.2],
      [25, 0.25],
      [30, 0.3],
      [40, 0.4],
      [50, 0.5],
      [60, 0.6],
      [70, 0.7],
      [75, 0.75],
      [80, 0.8],
      [90, 0.9],
      [95, 0.95],
      [100, 1],
    ])('%s', (key, value) => {
      expect(tw(`opacity-${key}`)).toEqual({
        opacity: value,
      });
    });
  });
});

describe('Transforms', () => {
  describe('scale', () => {
    const scale = [
      [0, 0],
      [50, 0.5],
      [75, 0.75],
      [90, 0.9],
      [95, 0.95],
      [100, 1],
      [105, 1.05],
      [110, 1.1],
      [125, 1.25],
      [150, 1.5],
      ...customSpacing,
    ];

    describe('scale', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`scale-${key}`)).toEqual({
          transform: `scale(${value})`,
        });
      });
    });

    describe('scale-x', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`scale-x-${key}`)).toEqual({
          transform: `scaleX(${value})`,
        });
      });
    });

    describe('scale-y', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`scale-y-${key}`)).toEqual({
          transform: `scaleY(${value})`,
        });
      });
    });
  });

  describe('rotate', () => {
    const scale = [
      [0, '0deg'],
      [1, '1deg'],
      [2, '2deg'],
      [3, '3deg'],
      [6, '6deg'],
      [12, '12deg'],
      [45, '45deg'],
      [90, '90deg'],
      [180, '180deg'],
      ['[69deg]', '69deg'],
    ];

    test.each(scale)('%s', (key, value) => {
      expect(tw(`rotate-${key}`)).toEqual({
        transform: `rotate(${value})`,
      });
    });
  });

  describe('skew', () => {
    const scale = [
      [0, '0deg'],
      [1, '1deg'],
      [2, '2deg'],
      [3, '3deg'],
      [6, '6deg'],
      [12, '12deg'],
      ['[7deg]', '7deg'],
    ];

    // Both axes, spelled with two args because react-pdf reads skew's y from
    // the second one instead of defaulting it to x.
    test.each(scale)('%s', (key, value) => {
      expect(tw(`skew-${key}`)).toEqual({
        transform: `skew(${value}, ${value})`,
      });
    });

    test.each(scale)('x-%s', (key, value) => {
      expect(tw(`skew-x-${key}`)).toEqual({
        transform: `skewX(${value})`,
      });
    });

    test.each(scale)('y-%s', (key, value) => {
      expect(tw(`skew-y-${key}`)).toEqual({
        transform: `skewY(${value})`,
      });
    });

    test('negative', () => {
      expect(tw('-skew-x-3')).toEqual({
        transform: 'skewX(-3deg)',
      });
    });
  });

  describe('translate', () => {
    const scale = [
      ['1/2', '50%'],
      ['1/3', '33.333333%'],
      ['2/3', '66.666667%'],
      ['1/4', '25%'],
      ['2/4', '50%'],
      ['3/4', '75%'],
      ['full', '100%'],
      ...spacing,
      ...customSpacing,
    ];

    describe('translate', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`translate-${key}`)).toEqual({
          transform: `translate(${value})`,
        });
      });
    });

    describe('translate-x', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`translate-x-${key}`)).toEqual({
          transform: `translateX(${value})`,
        });
      });
    });

    describe('translate-y', () => {
      test.each(scale)('%s', (key, value) => {
        expect(tw(`translate-y-${key}`)).toEqual({
          transform: `translateY(${value})`,
        });
      });
    });
  });

  describe('transform-origin', () => {
    const scale = [
      ['center', 'center'],
      ['top', 'top'],
      ['top-right', 'top right'],
      ['right', 'right'],
      ['bottom-right', 'bottom right'],
      ['bottom', 'bottom'],
      ['bottom-left', 'bottom left'],
      ['left', 'left'],
      ['top-left', 'top left'],
      ['[69%_42%]', '69% 42%'],
    ];

    test.each(scale)('%s', (key, value) => {
      expect(tw(`origin-${key}`)).toEqual({
        transformOrigin: value,
      });
    });
  });
});

describe('Combinations', () => {
  test('Misc', () => {
    expect(tw('w-24 h-12 max-w-3xl text-gray-500')).toEqual({
      width: rem(6),
      height: rem(3),
      maxWidth: rem(48),
      color: '#6b7280',
    });
  });

  test('Negative values', () => {
    expect(
      tw(
        '-z-10 -top-1 -right-full -bottom-1/2 -left-2 -translate-1 -scale-50 -rotate-45 -order-1 -m-2',
      ),
    ).toEqual({
      zIndex: -10,
      top: rem(-0.25),
      right: '-100%',
      bottom: '-50%',
      left: rem(-0.5),
      transform: `translate(${rem(-0.25)}) scale(-0.5) rotate(-45deg)`,
      order: -1,
      margin: rem(-0.5),
    });
  });

  test('Transform chain', () => {
    expect(tw('rotate-45 skew-x-3 scale-50')).toEqual({
      transform: 'rotate(45deg) skewX(3deg) scale(0.5)',
    });
  });
});
