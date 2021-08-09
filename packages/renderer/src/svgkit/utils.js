/* eslint-disable import/prefer-default-export */

export const randomString = holder => {
  let randomstring;

  if (!holder) {
    throw new Error(
      'cannot create a random attribute name for an undefined object',
    );
  }
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  randomstring = '';
  do {
    randomstring = '';
    for (let i = 0; i < 12; i += 1) {
      randomstring += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (holder[randomstring]);
  return randomstring;
};
