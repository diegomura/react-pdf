const PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;

export const getURL = value => {
  if (!value) return '';

  if (isSrcDest(value)) return value;

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};

export const isSrcDest = src => src[0] === '#';

export const setLink = node => {
  const { top, left, width, height } = node.getAbsoluteLayout();
  node.root.instance[isSrcDest(node.src) ? 'goTo' : 'link'](
    left,
    top,
    width,
    height,
    isSrcDest(node.src) ? node.src.slice(1) : node.src,
  );
};
