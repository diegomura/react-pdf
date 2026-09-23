import { isNil, matchPercent } from '@react-pdf/fns';
import * as P from '@react-pdf/primitives';
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  Dimension,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  LengthPercentage,
  Overflow,
  Position,
  StylePropertyValues,
} from 'taffy-layout';

import { SafeNode } from '../types';

type Value = string | number | null | undefined;

/**
 * Normalise a react-pdf style value into a Taffy length or percentage.
 * Numbers pass through, `'50%'` stays `'50%'`, anything else is dropped.
 */
const length = (value: Value): LengthPercentage | undefined => {
  if (typeof value === 'number')
    return Number.isFinite(value) ? value : undefined;
  if (isNil(value)) return undefined;

  const percent = matchPercent(value);

  return percent ? `${percent.value}%` : undefined;
};

/** Like `length`, but also accepts `'auto'` */
const dimension = (value: Value): Dimension | undefined =>
  value === 'auto' ? 'auto' : length(value);

const ALIGN_ITEMS: Record<string, AlignItems> = {
  'flex-start': AlignItems.FlexStart,
  center: AlignItems.Center,
  'flex-end': AlignItems.FlexEnd,
  stretch: AlignItems.Stretch,
  baseline: AlignItems.Baseline,
};

const ALIGN_SELF: Record<string, AlignSelf> = {
  auto: AlignSelf.Auto,
  'flex-start': AlignSelf.FlexStart,
  center: AlignSelf.Center,
  'flex-end': AlignSelf.FlexEnd,
  stretch: AlignSelf.Stretch,
  baseline: AlignSelf.Baseline,
};

const ALIGN_CONTENT: Record<string, AlignContent> = {
  'flex-start': AlignContent.FlexStart,
  center: AlignContent.Center,
  'flex-end': AlignContent.FlexEnd,
  stretch: AlignContent.Stretch,
  'space-between': AlignContent.SpaceBetween,
  'space-around': AlignContent.SpaceAround,
  'space-evenly': AlignContent.SpaceEvenly,
};

const JUSTIFY_CONTENT: Record<string, JustifyContent> = {
  'flex-start': JustifyContent.FlexStart,
  center: JustifyContent.Center,
  'flex-end': JustifyContent.FlexEnd,
  'space-between': JustifyContent.SpaceBetween,
  'space-around': JustifyContent.SpaceAround,
  'space-evenly': JustifyContent.SpaceEvenly,
};

const FLEX_DIRECTION: Record<string, FlexDirection> = {
  row: FlexDirection.Row,
  'row-reverse': FlexDirection.RowReverse,
  column: FlexDirection.Column,
  'column-reverse': FlexDirection.ColumnReverse,
};

const FLEX_WRAP: Record<string, FlexWrap> = {
  nowrap: FlexWrap.NoWrap,
  wrap: FlexWrap.Wrap,
  'wrap-reverse': FlexWrap.WrapReverse,
};

const OVERFLOW: Record<string, Overflow> = {
  hidden: Overflow.Hidden,
};

/**
 * Map a node's resolved style onto Taffy style properties.
 *
 * Defaults are chosen to match what Yoga (without web defaults) used to do,
 * so existing documents keep their layout:
 * - `flexDirection: column`, `alignContent: flex-start`
 * - `minWidth`/`minHeight` default to `0` instead of Taffy's content-based
 *   automatic minimum, so flex items shrink like they did under Yoga.
 *
 * @param node - Node with resolved `style` (and `box` for pages)
 * @returns Taffy style properties
 */
const toTaffyStyle = (node: SafeNode): StylePropertyValues => {
  const style = node.style || {};
  const position = style.position;
  const isAbsolute = position === 'absolute';
  const props: StylePropertyValues = {
    display: style.display === 'none' ? Display.None : Display.Flex,
    position: isAbsolute ? Position.Absolute : Position.Relative,
    flexDirection: FLEX_DIRECTION[style.flexDirection] ?? FlexDirection.Column,
    flexWrap: FLEX_WRAP[style.flexWrap] ?? FlexWrap.NoWrap,
    alignItems: ALIGN_ITEMS[style.alignItems] ?? AlignItems.Stretch,
    alignSelf: ALIGN_SELF[style.alignSelf],
    alignContent: ALIGN_CONTENT[style.alignContent] ?? AlignContent.FlexStart,
    justifyContent:
      JUSTIFY_CONTENT[style.justifyContent] ?? JustifyContent.FlexStart,
    overflowX: OVERFLOW[style.overflow] ?? Overflow.Visible,
    overflowY: OVERFLOW[style.overflow] ?? Overflow.Visible,
    flexGrow: isNil(style.flexGrow) ? 0 : Number(style.flexGrow),
    flexShrink: isNil(style.flexShrink) ? 1 : Number(style.flexShrink),
    flexBasis: dimension(style.flexBasis) ?? 'auto',
    aspectRatio: isNil(style.aspectRatio) ? undefined : style.aspectRatio,
    width: dimension(style.width) ?? 'auto',
    height:
      dimension(node.type === P.Page ? node.box?.height : style.height) ??
      'auto',
    minWidth: length(style.minWidth) ?? 0,
    minHeight: length(style.minHeight) ?? 0,
    maxWidth: length(style.maxWidth) ?? 'auto',
    maxHeight: length(style.maxHeight) ?? 'auto',
    marginTop: dimension(style.marginTop) ?? 0,
    marginRight: dimension(style.marginRight) ?? 0,
    marginBottom: dimension(style.marginBottom) ?? 0,
    marginLeft: dimension(style.marginLeft) ?? 0,
    paddingTop: length(style.paddingTop) ?? 0,
    paddingRight: length(style.paddingRight) ?? 0,
    paddingBottom: length(style.paddingBottom) ?? 0,
    paddingLeft: length(style.paddingLeft) ?? 0,
    borderTop: length(style.borderTopWidth) ?? 0,
    borderRight: length(style.borderRightWidth) ?? 0,
    borderBottom: length(style.borderBottomWidth) ?? 0,
    borderLeft: length(style.borderLeftWidth) ?? 0,
    rowGap: length(style.rowGap) ?? 0,
    columnGap: length(style.columnGap) ?? 0,
  };

  // Yoga ignored insets on `position: static` nodes
  if (position !== 'static') {
    props.top = dimension(style.top) ?? 'auto';
    props.right = dimension(style.right) ?? 'auto';
    props.bottom = dimension(style.bottom) ?? 'auto';
    props.left = dimension(style.left) ?? 'auto';
  }

  return props;
};

export default toTaffyStyle;
