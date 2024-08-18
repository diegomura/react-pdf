import { parseButtonFieldOptions } from '../../utils/parseFormOptions';

const renderFormPushButton = (ctx, node) => {
  const { top, left, width, height } = node.box || {};

  // Element's name
  const name = node.props?.name || '';

  ctx.formPushButton(
    name,
    left,
    top,
    width,
    height,
    parseButtonFieldOptions(node),
  );
};

export default renderFormPushButton;
