import {parseComboAndListFieldOptions} from '../../utils/parseFormOptions';

const renderFormList = (ctx, node) => {
    const { top, left, width, height } = node.box || {};

    // Element's name
    const name = node.props?.name || '';

    ctx.formList(name, left, top, width, height, parseComboAndListFieldOptions(node));
};

export default renderFormList;