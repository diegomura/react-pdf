const renderFormField = (ctx, node, options = {}) => {
  const name = node.props?.name || '';

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  const formField = ctx.formField(name);
  const option = options;
  if (!option.formFields) option.formFields = [formField];
  else option.formFields.push(formField);
};

export const cleanUpFormField = (_ctx, _node, options) => {
  options.formFields.pop();
};

export default renderFormField;
