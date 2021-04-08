import * as R from 'ramda';

// import { getURL } from '../utils/url';

const DEST_REGEXP = /^#.+/;

const isSrcId = R.test(DEST_REGEXP);

const getSource = node => {
  const props = node.props || {};
  return props.src || props.href;
};

const setLink = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const src = getSource(node);

  if (src) {
    const [instanceMethod, value] = isSrcId(src)
      ? ['goTo', src.slice(1)]
      : ['link', src];
    ctx[instanceMethod](left, top, width, height, value);
  }

  return node;
};

export default R.curryN(2, setLink);
