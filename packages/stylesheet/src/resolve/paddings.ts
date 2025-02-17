import { PaddingSafeStyle, PaddingStyle } from '../types';
import processBoxModel from './boxModel';

const processPadding = processBoxModel<PaddingStyle, PaddingSafeStyle>({
  expandsTo: ({ first, second, third, fourth }) => ({
    paddingTop: first,
    paddingRight: second,
    paddingBottom: third,
    paddingLeft: fourth,
  }),
  maxValues: 4,
});

const processPaddingVertical = processBoxModel<PaddingStyle, PaddingSafeStyle>({
  expandsTo: ({ first, second }) => ({
    paddingTop: first,
    paddingBottom: second,
  }),
  maxValues: 2,
});

const processPaddingHorizontal = processBoxModel<
  PaddingStyle,
  PaddingSafeStyle
>({
  expandsTo: ({ first, second }) => ({
    paddingRight: first,
    paddingLeft: second,
  }),
  maxValues: 2,
});

const processPaddingSingle = processBoxModel<PaddingStyle, PaddingSafeStyle>();

const handlers = {
  padding: processPadding,
  paddingBottom: processPaddingSingle,
  paddingHorizontal: processPaddingHorizontal,
  paddingLeft: processPaddingSingle,
  paddingRight: processPaddingSingle,
  paddingTop: processPaddingSingle,
  paddingVertical: processPaddingVertical,
};

export default handlers;
