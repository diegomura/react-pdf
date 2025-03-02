import { SafeTextInputNode } from '@react-pdf/layout';

import { Context, RenderOptions } from '../types';
import { parseTextInputOptions } from '../utils/parseFormOptions';

const renderTextInput = (
  ctx: Context,
  node: SafeTextInputNode,
  options: RenderOptions,
) => {
  if (!node.box) return;

  const { top, left, width, height } = node.box;

  // Element's name
  const name = node.props?.name || '';
  const fieldSetOptions = options.fieldSets?.at(0);

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  ctx.formText(
    name,
    left,
    top,
    width,
    height,
    parseTextInputOptions(node, fieldSetOptions),
  );
};

export default renderTextInput;
