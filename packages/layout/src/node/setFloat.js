import Yoga from '../yoga/index';

const VALUE_MAP = {
  left: Yoga.FLOAT_LEFT,
  right: Yoga.FLOAT_RIGHT,
};

const setFloat = value => node => {
  const yogaNode = node._yogaNode;
  const yogaValue = VALUE_MAP[value];

  if (yogaNode && yogaValue) {
    yogaNode.setFloat(yogaValue);
    yogaNode.calculateLayout();
  }

  return node;
};

export default setFloat;
