import { Item, PenaltyItem } from '../types';

const isPenalty = (item: Item): item is PenaltyItem => item.kind === 'penalty';

export default isPenalty;
