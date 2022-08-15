import processBoxModel from './boxModel';

const processPadding = processBoxModel({
  expandsTo: ({ first, second, third, fourth }) => ({
    paddingTop: first,
    paddingRight: second,
    paddingBottom: third,
    paddingLeft: fourth,
  }),
  maxValues: 4,
});

const processPaddingVertical = processBoxModel({
  expandsTo: ({ first, second }) => ({
    paddingTop: first,
    paddingBottom: second,
  }),
  maxValues: 2,
});

const processPaddingHorizontal = processBoxModel({
  expandsTo: ({ first, second }) => ({
    paddingRight: first,
    paddingLeft: second,
  }),
  maxValues: 2,
});

const processPaddingSingle = processBoxModel();

export {
  processPadding,
  processPaddingVertical,
  processPaddingHorizontal,
  processPaddingSingle,
};
