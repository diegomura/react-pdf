const uuid = () => {
  let randomstring;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  randomstring = '';

  for (let i = 0; i < 12; i += 1) {
    randomstring += chars[Math.floor(Math.random() * chars.length)];
  }

  return randomstring;
};

export default uuid;
