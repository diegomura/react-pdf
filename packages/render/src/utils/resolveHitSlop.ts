import { HitSlop } from '@react-pdf/types';

type ResolvedHitSlop = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const ZERO: ResolvedHitSlop = { top: 0, bottom: 0, left: 0, right: 0 };

const resolveHitSlop = (hitSlop?: HitSlop): ResolvedHitSlop => {
  if (!hitSlop) return ZERO;

  if (typeof hitSlop === 'number') {
    return { top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop };
  }

  return {
    top: hitSlop.top ?? 0,
    bottom: hitSlop.bottom ?? 0,
    left: hitSlop.left ?? 0,
    right: hitSlop.right ?? 0,
  };
};

export default resolveHitSlop;
