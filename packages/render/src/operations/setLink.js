import * as R from 'ramda';

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
    const isId = isSrcId(src);
    const method = isId ? 'goTo' : 'link';
    const value = isId ? src.slice(1) : src;

    ctx[method](left, top, width, height, value);
  }

  return node;
};

export default R.curryN(2, setLink);
