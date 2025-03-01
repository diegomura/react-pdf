import {
  SafeCheckboxNode,
  SafeListNode,
  SafeSelectNode,
  SafeTextInputNode,
} from '@react-pdf/layout';
import { Context } from '../types';

const clean = (options: Record<string, any>) => {
  const opt = { ...options };

  // We need to ensure the elements are no present if not true
  Object.entries(opt).forEach((pair) => {
    if (!pair[1]) {
      delete opt[pair[0]];
    }
  });

  return opt;
};

const parseCommonFormOptions = (node: any) => {
  // Common Options
  return {
    required: node.props?.required || false,
    noExport: node.props?.noExport || false,
    readOnly: node.props?.readOnly || false,
    value: node.props?.value || undefined,
    defaultValue: node.props?.defaultValue || undefined,
  };
};

const parseTextInputOptions = (node: SafeTextInputNode, fieldSet: any) => {
  return clean({
    ...parseCommonFormOptions(node),
    parent: fieldSet || undefined,
    align: node.props?.align || 'left',
    multiline: node.props?.multiline || undefined,
    password: node.props?.password || false,
    noSpell: node.props?.noSpell || false,
    format: node.props?.format || undefined,
    fontSize: node.props?.fontSize || undefined,
    MaxLen: node.props?.maxLength || undefined,
  });
};

const parseSelectAndListFieldOptions = (
  node: SafeListNode | SafeSelectNode,
) => {
  return clean({
    ...parseCommonFormOptions(node),
    sort: node.props?.sort || false,
    edit: node.props?.edit || false,
    multiSelect: node.props?.multiSelect || false,
    noSpell: node.props?.noSpell || false,
    select: node.props?.select || [''],
  });
};

const getAppearance = (
  ctx: Context,
  codepoint: '8' | '4' | ' ',
  width: number,
  height: number,
) => {
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
    `/Tx BMC\nq\n/ZaDi ${height * 0.8} Tf\nBT\n${width * 0.45} ${
      height / 4
    } Td (${codepoint}) Tj\nET\nQ\nEMC`,
  );

  appearance.end(null);

  return appearance;
};

const parseCheckboxOptions = (
  ctx: Context,
  node: SafeCheckboxNode,
  fieldSet: any,
) => {
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

    ref.end(null);
  }

  const normalAppearance = {
    [onOption]: getAppearance(ctx, xMark ? '8' : '4', width!, height!),
    [offOption]: getAppearance(ctx, xMark ? ' ' : '8', width!, height!),
  };

  return clean({
    ...parseCommonFormOptions(node),
    backgroundColor: node.props?.backgroundColor || undefined,
    borderColor: node.props?.borderColor || undefined,
    parent: fieldSet || undefined,
    value: `/${node.props?.checked === true ? onOption : offOption}`,
    defaultValue: `/${node.props?.checked === true ? onOption : offOption}`,
    AS: node.props?.checked === true ? onOption : offOption,
    AP: { N: normalAppearance, D: normalAppearance },
  });
};

export {
  parseTextInputOptions,
  parseSelectAndListFieldOptions,
  parseCheckboxOptions,
};
