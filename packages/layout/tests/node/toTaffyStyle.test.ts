import { describe, expect, test } from 'vitest';
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  Overflow,
  Position,
} from 'taffy-layout';

import toTaffyStyle from '../../src/node/toTaffyStyle';
import { SafeNode } from '../../src/types';

const view = (style = {}, extra = {}): SafeNode =>
  ({ type: 'VIEW', props: {}, children: [], style, ...extra }) as SafeNode;

describe('node toTaffyStyle', () => {
  test('should apply yoga compatible defaults', () => {
    const style = toTaffyStyle(view());

    expect(style.display).toBe(Display.Flex);
    expect(style.position).toBe(Position.Relative);
    expect(style.flexDirection).toBe(FlexDirection.Column);
    expect(style.flexWrap).toBe(FlexWrap.NoWrap);
    expect(style.alignItems).toBe(AlignItems.Stretch);
    expect(style.alignSelf).toBeUndefined();
    expect(style.alignContent).toBe(AlignContent.FlexStart);
    expect(style.justifyContent).toBe(JustifyContent.FlexStart);
    expect(style.overflowX).toBe(Overflow.Visible);
    expect(style.flexGrow).toBe(0);
    expect(style.flexShrink).toBe(1);
    expect(style.flexBasis).toBe('auto');
    expect(style.width).toBe('auto');
    expect(style.height).toBe('auto');
    expect(style.minWidth).toBe(0);
    expect(style.minHeight).toBe(0);
    expect(style.maxWidth).toBe('auto');
    expect(style.marginTop).toBe(0);
    expect(style.paddingLeft).toBe(0);
    expect(style.borderTop).toBe(0);
    expect(style.rowGap).toBe(0);
    expect(style.top).toBe('auto');
    expect(style.aspectRatio).toBeUndefined();
  });

  test('should map enum-like values', () => {
    const style = toTaffyStyle(
      view({
        display: 'none',
        position: 'absolute',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignSelf: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
      }),
    );

    expect(style.display).toBe(Display.None);
    expect(style.position).toBe(Position.Absolute);
    expect(style.flexDirection).toBe(FlexDirection.RowReverse);
    expect(style.flexWrap).toBe(FlexWrap.Wrap);
    expect(style.alignItems).toBe(AlignItems.Center);
    expect(style.alignSelf).toBe(AlignSelf.FlexEnd);
    expect(style.alignContent).toBe(AlignContent.SpaceBetween);
    expect(style.justifyContent).toBe(JustifyContent.SpaceEvenly);
    expect(style.overflowX).toBe(Overflow.Hidden);
    expect(style.overflowY).toBe(Overflow.Hidden);
  });

  test('should pass numbers, percentages and auto through', () => {
    const style = toTaffyStyle(
      view({
        width: 100,
        height: '50%',
        marginLeft: 'auto',
        flexBasis: '25%',
        minWidth: 10,
        maxHeight: '80%',
        paddingTop: '5%',
        top: 5,
        left: '10%',
        rowGap: 4,
        columnGap: '2%',
        aspectRatio: 1.5,
        flexGrow: 2,
        flexShrink: 0,
      }),
    );

    expect(style.width).toBe(100);
    expect(style.height).toBe('50%');
    expect(style.marginLeft).toBe('auto');
    expect(style.flexBasis).toBe('25%');
    expect(style.minWidth).toBe(10);
    expect(style.maxHeight).toBe('80%');
    expect(style.paddingTop).toBe('5%');
    expect(style.top).toBe(5);
    expect(style.left).toBe('10%');
    expect(style.rowGap).toBe(4);
    expect(style.columnGap).toBe('2%');
    expect(style.aspectRatio).toBe(1.5);
    expect(style.flexGrow).toBe(2);
    expect(style.flexShrink).toBe(0);
  });

  test('should ignore auto where taffy has no auto', () => {
    const style = toTaffyStyle(
      view({ paddingTop: 'auto', minWidth: 'auto', borderTopWidth: 'auto' }),
    );

    expect(style.paddingTop).toBe(0);
    expect(style.minWidth).toBe(0);
    expect(style.borderTop).toBe(0);
  });

  test('should ignore insets on static nodes', () => {
    const style = toTaffyStyle(view({ position: 'static', top: 10 }));

    expect(style.position).toBe(Position.Relative);
    expect(style.top).toBeUndefined();
  });

  test('should take page height from its box', () => {
    const page = {
      type: 'PAGE',
      props: {},
      children: [],
      style: { height: 500 },
      box: { width: 100, height: 200, top: 0, left: 0, right: 0, bottom: 0 },
    } as unknown as SafeNode;

    expect(toTaffyStyle(page).height).toBe(200);
  });
});
