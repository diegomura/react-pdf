import { parseTextFieldOptions } from '../utils/parseFormOptions';

const renderTextInput = (ctx, node, options = {}) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';
  const fieldSetOptions = options.fieldSets?.at(0);

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  ctx.formText(
    name,
    left,
    top,
    width,
    height,
    parseTextFieldOptions(node, fieldSetOptions),
  );
};

export default renderTextInput;
