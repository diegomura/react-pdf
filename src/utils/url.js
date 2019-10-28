const PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;
const DEST_REGEXP = /^#.+/;

export const getURL = value => {
  if (!value) return '';

  if (isSrcDest(value)) return value; // don't modify it if it is a destination

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};

export const isSrcDest = src => src.match(DEST_REGEXP);

export const setLink = node => {
  if (!node.src) {
    return;
  }

  const { top, left, width, height } = node.getAbsoluteLayout();
  const instanceMethod = isSrcDest(node.src) ? 'goTo' : 'link';
  const nodeSrc = isSrcDest(node.src) ? node.src.slice(1) : node.src;

  node.root.instance[instanceMethod](left, top, width, height, nodeSrc);
};

export const setDestination = node => {
  if (!node.props.dest) {
    return;
  }
  console.log('in here', node.name || '');

  const { top } = node.getAbsoluteLayout();
  node.root.instance.addNamedDestination(node.props.dest, 'XYZ', null, top, null)
}
