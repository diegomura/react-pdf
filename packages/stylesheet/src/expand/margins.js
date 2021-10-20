import processBoxModel from './boxModel';

const processMargin = processBoxModel({
  expandsTo: ({ first, second, third, fourth }) => ({
    marginTop: first,
    marginRight: second,
    marginBottom: third,
    marginLeft: fourth,
  }),
  maxValues: 4,
  autoSupported: true,
});

const processMarginVertical = processBoxModel({
  expandsTo: ({ first, second }) => ({
    marginTop: first,
    marginBottom: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginHorizontal = processBoxModel({
  expandsTo: ({ first, second }) => ({
    marginRight: first,
    marginLeft: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginSingle = processBoxModel({
  autoSupported: true,
});

export {
  processMargin,
  processMarginVertical,
  processMarginHorizontal,
  processMarginSingle,
};
