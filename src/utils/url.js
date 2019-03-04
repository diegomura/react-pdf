const PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto|skype)/i;

export const getURL = value => {
  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};
