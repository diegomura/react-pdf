import { SafeCheckboxNode } from '@react-pdf/layout';
import { Context, RenderOptions } from '../types';
import { parseCheckboxOptions } from '../utils/parseFormOptions';
import addFormAnnotation from '../utils/addFormAnnotation';

const renderCheckbox = (
  ctx: Context,
  node: SafeCheckboxNode,
  options: RenderOptions,
) => {
  if (!node.box) return;

  // Element's name
  const name = node.props?.name || '';
  const fieldSetOptions = options.fieldSets?.at(0);

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  const { AP, AS, ...fieldOptions } = parseCheckboxOptions(
    ctx,
    node,
    fieldSetOptions,
  );

  addFormAnnotation(ctx, name, 'checkbox', node.box, fieldOptions, { AP, AS });
};

export default renderCheckbox;
