import { isNil, mergeDeepWith } from 'ramda';

const merge = (a, b) => {
  return isNil(b) ? a : b;
};

const deepMerge = objs =>
  objs.reduce((acc, obj) => {
    return mergeDeepWith(merge, acc, obj);
  }, {});

export default deepMerge;
