import isPenalty from './isPenalty';
import { Item, PenaltyItem } from '../types';

const isForbidPenalty = (item: Item): item is PenaltyItem =>
  isPenalty(item) && item.type === 'forbid';

export default isForbidPenalty;
