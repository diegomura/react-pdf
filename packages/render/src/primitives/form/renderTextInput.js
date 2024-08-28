import { parseTextFieldOptions } from '../../utils/parseFormOptions';

const renderTextInput = (ctx, node, options) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';

  if (!options.formField)
    throw new Error(
      'The TextInput element must be a children of a FormField element.',
    );

  if (!ctx._root.data.AcroForm) {
    ctx.initForm();
  }

  ctx.textInput(
    name,
    left,
    top,
    width,
    height,
    parseTextFieldOptions(node, options.formField),
  );
};

export default renderTextInput;
