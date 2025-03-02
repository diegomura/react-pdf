import { SafeFieldSetNode } from '@react-pdf/layout';
import { Context, RenderOptions } from '../types';

const renderFieldSet = (
  ctx: Context,
  node: SafeFieldSetNode,
  options: Pick<RenderOptions, 'fieldSets'>,
) => {
  const name = node.props?.name || '';

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  const formField = ctx.formField(name);
  const option = options;

  if (!option.fieldSets) {
    option.fieldSets = [formField];
  } else {
    option.fieldSets.push(formField);
  }
};

export const cleanUpFieldSet = (
  _ctx: Context,
  _node: SafeFieldSetNode,
  options: RenderOptions,
) => {
  options.fieldSets.pop();
};

export default renderFieldSet;
