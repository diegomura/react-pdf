import { PaddingExpandedStyle, PaddingShorthandStyle } from '../types';
import processBoxModel from './boxModel';

const processPadding = processBoxModel<
  PaddingShorthandStyle,
  PaddingExpandedStyle
>({
  expandsTo: ({ first, second, third, fourth }) => ({
    paddingTop: first,
    paddingRight: second,
    paddingBottom: third,
    paddingLeft: fourth,
  }),
  maxValues: 4,
});

const processPaddingVertical = processBoxModel<
  PaddingShorthandStyle,
  PaddingExpandedStyle
>({
  expandsTo: ({ first, second }) => ({
    paddingTop: first,
    paddingBottom: second,
  }),
  maxValues: 2,
});

const processPaddingHorizontal = processBoxModel<
  PaddingShorthandStyle,
  PaddingExpandedStyle
>({
  expandsTo: ({ first, second }) => ({
    paddingRight: first,
    paddingLeft: second,
  }),
  maxValues: 2,
});

const processPaddingSingle = processBoxModel<
  PaddingShorthandStyle,
  PaddingExpandedStyle
>();

export {
  processPadding,
  processPaddingVertical,
  processPaddingHorizontal,
  processPaddingSingle,
};
