import { SafeListNode } from '@react-pdf/layout';

import { Context } from '../types';
import { parseSelectAndListFieldOptions } from '../utils/parseFormOptions';

const renderList = (ctx: Context, node: SafeListNode) => {
  if (!node.box) return;

  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = ('name' in node.props ? node.props.name || '' : '') as string;

  // Fields inherit the active font, usually a subset missing the glyphs of
  // values typed later. Viewers ship standard fonts in full.
  ctx.font('Helvetica');

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  ctx.formList(
    name,
    left,
    top,
    width,
    height,
    parseSelectAndListFieldOptions(node),
  );
};

export default renderList;
