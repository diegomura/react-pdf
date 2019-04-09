import { mergeDeepRight } from 'ramda';

const deepMerge = objs =>
  objs.reduce((acc, obj) => {
    return mergeDeepRight(acc, obj);
  }, {});

export default deepMerge;
