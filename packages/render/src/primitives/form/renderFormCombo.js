import {parseComboAndListFieldOptions} from '../../utils/parseFormOptions';

const renderFormCombo = (ctx, node) => {
    const { top, left, width, height } = node.box;

    // Element's name
    const name = node.props?.name || '';

    ctx.formCombo(name, left, top, width, height, parseComboAndListFieldOptions(node));
};

export default renderFormCombo;