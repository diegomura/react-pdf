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

const getAppearance = (ctx, data) => {
  const appearance = ctx.ref({
    Type: 'XObject',
    Subtype: 'Form',
    BBox: [0, 0, 11.1, 11.1],
    Resources: { ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'] },
  });
  appearance.initDeflate();
  appearance.write(data);
  appearance.end();
  return appearance;
};

const parseCheckboxOptions = (ctx, node, formField) => {
  const { width, height } = node.box || {};

  let transform = '';
  if (width / height <= 1)
    transform = `1 0 0 ${width / height} 0 ${(10 - (width * 10) / height) / 2 + 1} cm\n`;
  else
    transform = `${height / width} 0 0 1 ${(10 - (height * 10) / width) / 2} 1 cm\n`;

  const onOption = node.props?.onState || 'Yes';
  const offOption = node.props?.offState || 'Off';
  const normalAppearance = {};
  normalAppearance[onOption] = getAppearance(
    ctx,
    `/Tx BMC\nq\n${transform}q\n1 w\n/DeviceRGB CS\n0 0 0 SCN\n0 0 m\n10 10 l\nS\nQ\nq\n1 w\n/DeviceRGB CS\n0 0 0 SCN\n10 0 m\n0 10 l\nS\nQ\nQ\nEMC`,
  );
  normalAppearance[offOption] = getAppearance(ctx, '/Tx BMC\nEMC\n');

  return clean({
    ...parseCommonFormOptions(node),
    backgroundColor: node.props?.backgroundColor || undefined,
    borderColor: node.props?.borderColor || undefined,
    parent: formField || undefined,
    value: `/${node.props?.checked}` === true ? onOption : offOption,
    defaultValue: `/${node.props?.checked}` === true ? onOption : offOption,
    AS: node.props?.checked === true ? onOption : offOption,
    AP: { N: normalAppearance },
  });
};

export {
  parseTextFieldOptions,
  parsePickerAndListFieldOptions,
  parseCheckboxOptions,
};
