import { SafeNoteNode } from '@react-pdf/layout';

import { Context } from '../types';

const renderNote = (ctx: Context, node: SafeNoteNode) => {
  if (!node.box) return;

  const { top, left } = node.box;
  const value = node?.children?.[0].value || '';
  const color = node.style?.backgroundColor;

  ctx.note(left, top, 0, 0, value, { color });
};

export default renderNote;
