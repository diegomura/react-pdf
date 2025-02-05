const renderFieldSet = (ctx, node, options = {}) => {
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

export const cleanUpFieldSet = (_ctx, _node, options) => {
  options.fieldSets.pop();
};

export default renderFieldSet;
