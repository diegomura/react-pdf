const parseAspectRatio = value => {
  const match = value
    .replace(/[\s\r\t\n]+/gm, ' ')
    .replace(/^defer\s/, '')
    .split(' ');

  const align = match[0] || 'xMidYMid';
  const meetOrSlice = match[1] || 'meet';

  return { align, meetOrSlice };
};

export default parseAspectRatio;
