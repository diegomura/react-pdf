import { Item } from '../types';

const isRepeat = (item: Item): boolean =>
  'repeat' in item && item.repeat === true;

export default isRepeat;
