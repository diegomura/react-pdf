const isSrcId = (value) => /^#.+/.test(value);

const setLink = (ctx, node) => {
  const props = node.props || {};
  const { top, left, width, height } = node.box;
  const src = props.src || props.href;

  if (src) {
    const isId = isSrcId(src);
    const method = isId ? 'goTo' : 'link';
    const value = isId ? src.slice(1) : src;

    ctx[method](left, top, width, height, value);
  }
};

export default setLink;
