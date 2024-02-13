import * as P from '@react-pdf/primitives';

const isDefs = (node) => node.type === P.Defs;

const getDefs = (node) => {
  const children = node.children || [];
  const defs = children.find(isDefs) || {};
  const values = defs.children || [];

  return values.reduce((acc, value) => {
    const id = value.props?.id;
    if (id) acc[id] = value;
    return acc;
  }, {});
};

export default getDefs;
