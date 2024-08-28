import { parseCheckboxOptions } from '../../utils/parseFormOptions';

const renderCheckbox = (ctx, node, options) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';

  if (!options.formField)
    throw new Error(
      'The TextInput element must be a children of a FormField element.',
    );

  ctx.formCheckbox(
    name,
    left,
    top,
    width,
    height,
    parseCheckboxOptions(ctx, node, options.formField),
  );
};

export default renderCheckbox;
