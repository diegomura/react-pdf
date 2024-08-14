import renderNode from '../renderNode';

const renderFormField = (ctx, node, options) => {
    const name = node.props?.name || '';

    const formField = ctx.formField(name);

    const children = node.children || [];
    children.forEach((child) => renderNode(ctx, child, {...options, formField}))
};

export default renderFormField;
