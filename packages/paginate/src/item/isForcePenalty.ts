import isPenalty from './isPenalty';
import { Item } from '../types';

const isForcePenalty = (item: Item): boolean =>
  isPenalty(item) && item.type === 'force';

export default isForcePenalty;
