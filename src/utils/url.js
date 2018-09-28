const PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto)\:\/\//i;

export const getURL = value => {
  let src = value;

  if (typeof src === 'string' && !src.match(PROTOCOL_REGEXP)) {
    src = `http://${src}`;
  }

  return src;
};
