import { parseTextFieldOptions } from '../../utils/parseFormOptions';

const renderTextInput = (ctx, node, options) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';
  const formFieldOptions = options.formFields?.at(0);

  if (!formFieldOptions)
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
    parseTextFieldOptions(node, formFieldOptions),
  );
};

export default renderTextInput;
