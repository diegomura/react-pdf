import {parseTextFieldOptions} from '../../utils/parseFormOptions';

const renderFormText = (ctx, node, options) => {
    const { top, left, width, height } = node.box || {};

    // Element's name
    const name = node.props?.name || '';

    if(!options.formField)
        throw new Error('The FormText element must be a children of a FormField element.')

    ctx.formText(name, left, top, width, height, parseTextFieldOptions(node, options.formField));
};

export default renderFormText;