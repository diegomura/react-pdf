import { PreserveAspectRatio } from '../types';

const parseAspectRatio = (value: string | PreserveAspectRatio) => {
  if (typeof value !== 'string') return value;

  const match = value
    .replace(/[\s\r\t\n]+/gm, ' ')
    .replace(/^defer\s/, '')
    .split(' ');

  const align = (match[0] || 'xMidYMid') as PreserveAspectRatio['align'];

  const meetOrSlice = (match[1] ||
    'meet') as PreserveAspectRatio['meetOrSlice'];

  return { align, meetOrSlice };
};

export default parseAspectRatio;
