import { MarginExpandedStyle, MarginShorthandStyle } from '../types';
import processBoxModel from './boxModel';

const processMargin = processBoxModel<
  MarginShorthandStyle,
  MarginExpandedStyle
>({
  expandsTo: ({ first, second, third, fourth }) => ({
    marginTop: first,
    marginRight: second,
    marginBottom: third,
    marginLeft: fourth,
  }),
  maxValues: 4,
  autoSupported: true,
});

const processMarginVertical = processBoxModel<
  MarginShorthandStyle,
  MarginExpandedStyle
>({
  expandsTo: ({ first, second }) => ({
    marginTop: first,
    marginBottom: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginHorizontal = processBoxModel<
  MarginShorthandStyle,
  MarginExpandedStyle
>({
  expandsTo: ({ first, second }) => ({
    marginRight: first,
    marginLeft: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginSingle = processBoxModel<
  MarginShorthandStyle,
  MarginExpandedStyle
>({
  autoSupported: true,
});

export {
  processMargin,
  processMarginVertical,
  processMarginHorizontal,
  processMarginSingle,
};
