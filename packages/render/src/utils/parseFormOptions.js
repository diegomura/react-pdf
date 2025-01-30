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
    fontSize: node.props?.fontSize || undefined,
    MaxLen: node.props?.maxLength || undefined,
  });
};

const parseSelectAndListFieldOptions = (node) => {
  return clean({
    ...parseCommonFormOptions(node),
    sort: node.props?.sort || false,
    edit: node.props?.edit || false,
    multiSelect: node.props?.multiSelect || false,
    noSpell: node.props?.noSpell || false,
    select: node.props?.select || [''],
  });
};

const getAppearance = (ctx, codepoint, width, height) => {
  const appearance = ctx.ref({
    Type: 'XObject',
    Subtype: 'Form',
    BBox: [0, 0, width, height],
    Resources: {
      ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
      Font: {
        ZaDi: ctx._acroform.fonts.ZaDi,
      },
    },
  });

  appearance.initDeflate();
  appearance.write(
    `/Tx BMC\nq\n/ZaDi ${height * 0.8} Tf\nBT\n${width * 0.45} ${height / 4} Td (${codepoint}) Tj\nET\nQ\nEMC`,
  );
  appearance.end();
  return appearance;
};

const parseCheckboxOptions = (ctx, node, formField) => {
  const { width, height } = node.box || {};

  const onOption = node.props?.onState || 'Yes';
  const offOption = node.props?.offState || 'Off';
  const xMark = node.props?.xMark || false;

  if (!Object.prototype.hasOwnProperty.call(ctx._acroform.fonts, 'ZaDi')) {
    const ref = ctx.ref({
      Type: 'Font',
      Subtype: 'Type1',
      BaseFont: 'ZapfDingbats',
    });
    ctx._acroform.fonts.ZaDi = ref;
    ref.end();
  }

  const normalAppearance = {};
  normalAppearance[onOption] = getAppearance(
    ctx,
    xMark ? '8' : '4',
    width,
    height,
  );
  normalAppearance[offOption] = getAppearance(
    ctx,
    xMark ? ' ' : '8',
    width,
    height,
  );

  return clean({
    ...parseCommonFormOptions(node),
    backgroundColor: node.props?.backgroundColor || undefined,
    borderColor: node.props?.borderColor || undefined,
    parent: formField || undefined,
    value: `/${node.props?.checked === true ? onOption : offOption}`,
    defaultValue: `/${node.props?.checked === true ? onOption : offOption}`,
    AS: node.props?.checked === true ? onOption : offOption,
    AP: { N: normalAppearance, D: normalAppearance },
  });
};

export {
  parseTextFieldOptions,
  parseSelectAndListFieldOptions,
  parseCheckboxOptions,
};
