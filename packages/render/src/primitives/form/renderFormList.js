import { parseSelectAndListFieldOptions } from '../../utils/parseFormOptions';

const renderFormList = (ctx, node) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  ctx.formList(
    name,
    left,
    top,
    width,
    height,
    parseSelectAndListFieldOptions(node),
  );
};

export default renderFormList;
