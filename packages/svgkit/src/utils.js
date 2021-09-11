/* eslint-disable import/prefer-default-export */

export const randomString = () => {
  let randomstring;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  randomstring = '';

  for (let i = 0; i < 12; i += 1) {
    randomstring += chars[Math.floor(Math.random() * chars.length)];
  }

  return randomstring;
};
