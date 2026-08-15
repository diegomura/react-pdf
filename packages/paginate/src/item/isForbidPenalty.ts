import isPenalty from './isPenalty';
import { Item } from '../types';

const isForbidPenalty = (item: Item): boolean =>
  isPenalty(item) && item.type === 'forbid';

export default isForbidPenalty;
