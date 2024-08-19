const clean = (options) => {
  const opt = { ...options };

  // We need to ensure the elements are no present if not true
  Object.entries(opt).forEach((pair) => {
    if (!pair[1]) {
      delete opt[pair[0]];
    }
  });

  return opt;
};

const parseCommonFormOptions = (node) => {
  // Common Options
  return {
    required: node.props?.required || false,
    noExport: node.props?.noExport || false,
    readOnly: node.props?.readOnly || false,
    value: node.props?.value || undefined,
    defaultValue: node.props?.defaultValue || undefined,
  };
};

const parseTextFieldOptions = (node, formField) => {
  return clean({
    ...parseCommonFormOptions(node),
    parent: formField || undefined,
    align: node.props?.align || 'left',
    multiline: node.props?.multiline || undefined,
    password: node.props?.password || false,
    noSpell: node.props?.noSpell || false,
    format: node.props?.format || undefined,
  });
};

const parsePickerAndListFieldOptions = (node) => {
  return clean({
    ...parseCommonFormOptions(node),
    sort: node.props?.sort || false,
    edit: node.props?.edit || false,
    multiSelect: node.props?.multiSelect || false,
    noSpell: node.props?.noSpell || false,
    select: node.props?.select || [''],
  });
};

const parseButtonFieldOptions = (node) => {
  return clean({
    ...parseCommonFormOptions(node),
    label: node.props?.label || '???',
  });
};

const parseCheckboxOptions = (node, formField) => {
  return clean({
    ...parseCommonFormOptions(node),
    backgroundColor: node.props?.backgroundColor || undefined,
    borderColor: node.props?.borderColor || undefined,
    parent: formField || undefined,
  });
};

export {
  parseTextFieldOptions,
  parsePickerAndListFieldOptions,
  parseButtonFieldOptions,
  parseCheckboxOptions,
};
