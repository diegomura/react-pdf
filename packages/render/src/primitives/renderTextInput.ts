import { SafeTextInputNode } from '@react-pdf/layout';

import { Context, RenderOptions } from '../types';
import { parseTextInputOptions } from '../utils/parseFormOptions';
import addFormAnnotation from '../utils/addFormAnnotation';

const renderTextInput = (
  ctx: Context,
  node: SafeTextInputNode,
  options: RenderOptions,
) => {
  if (!node.box) return;

  // Element's name
  const name = node.props?.name || '';
  const fieldSetOptions = options.fieldSets?.at(0);

  // Fields inherit the active font, usually a subset missing the glyphs of
  // values typed later. Viewers ship standard fonts in full.
  ctx.font('Helvetica');

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  const { MaxLen, ...fieldOptions } = parseTextInputOptions(
    node,
    fieldSetOptions,
  );

  addFormAnnotation(ctx, name, 'text', node.box, fieldOptions, { MaxLen });
};

export default renderTextInput;
