const PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;

export const getURL = value => {
  if (!value) return '';

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};
