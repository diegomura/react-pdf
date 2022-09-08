import {parseTextFieldOptions} from '../../utils/parseFormOptions';

const renderFormText = (ctx, node) => {
    const { top, left, width, height } = node.box;

    // Element's name
    const name = node.props?.name || '';

    ctx.formText(name, left, top, width, height, parseTextFieldOptions(node));
};

export default renderFormText;