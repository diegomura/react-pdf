import renderNode from '../renderNode';

const renderForm = (ctx, node, options) => {
  ctx.save();
  ctx.initForm();

  const children = node.children || [];
  children.forEach((child) => renderNode(ctx, child, options));

  ctx.restore();
};

export default renderForm;
