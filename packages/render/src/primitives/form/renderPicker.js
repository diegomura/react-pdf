import { parsePickerAndListFieldOptions } from '../../utils/parseFormOptions';

const renderPicker = (ctx, node) => {
  const { top, left, width, height } = node.box || {};
  const { type = 'combo' } = node.props || {};

  // Element's name
  const name = node.props?.name || '';

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  const renderMethod = type === 'list' ? 'formList' : 'formCombo';

  ctx[renderMethod](
    name,
    left,
    top,
    width,
    height,
    parsePickerAndListFieldOptions(node),
  );
};

export default renderPicker;
