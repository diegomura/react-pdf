import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  splice(height) {
    const buffer = [];
    const result = this.clone();

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const isElementOutside = height < child.top;
      const shouldElementSplit = height < child.top + child.height;

      if (isElementOutside) {
        buffer.push(child);
      } else if (child.props.fixed) {
        const fixedElement = child.clone();
        fixedElement.children = child.children;
        result.appendChild(fixedElement);
      } else if (child.props.break) {
        child.props.break = false;
        buffer.push(...this.children.slice(i));
        break;
      } else if (shouldElementSplit) {
        if (!child.props.wrap) {
          buffer.push(child);
        } else {
          result.appendChild(child.splice(height - child.top - this.marginTop));
        }
      }
    }

    buffer.forEach(child => child.moveTo(result));

    result.marginTop = 0;
    result.paddingTop = 0;
    result.height = this.height - height;
    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.height = height;

    return result;
  }

  async render(page) {
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    await this.renderChildren(page);
  }
}

export default View;
