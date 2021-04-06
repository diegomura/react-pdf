const PROTOCOL_REGEXP = /^([a-z]+:(\/\/)?)/i;
const DEST_REGEXP = /^#.+/;

/**
 * Add protocol th URL if valid
 *
 * @param {String} value url
 * @returns {String} corrected url
 */
export const getURL = value => {
  if (!value) return '';

  if (isSrcId(value)) return value; // don't modify it if it is an id

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};

export const isSrcId = src => src.match(DEST_REGEXP);

export const setLink = node => {
  if (!node.src) {
    return;
  }

  const { top, left, width, height } = node.getAbsoluteLayout();
  const instanceMethod = isSrcId(node.src) ? 'goTo' : 'link';
  const nodeSrc = isSrcId(node.src) ? node.src.slice(1) : node.src;

  node.root.instance[instanceMethod](left, top, width, height, nodeSrc);
};

export const setDestination = node => {
  if (!node.props.id) {
    return;
  }

  const { top } = node.getAbsoluteLayout();
  node.root.instance.addNamedDestination(node.props.id, 'XYZ', null, top, null);
};
