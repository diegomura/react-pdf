import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  splice(height) {
    const buffer = [];
    const result = this.clone();

    this.children.forEach(child => {
      const isElementOutside = height < child.top;
      const shouldElementSplit = height < child.top + child.height;

      if (isElementOutside) {
        buffer.push(child);
      } else if (shouldElementSplit) {
        if (!child.props.wrap) {
          buffer.push(child);
        } else {
          result.appendChild(child.splice(height - child.top - this.marginTop));
        }
      }
    });

    buffer.forEach(child => child.moveTo(result));

    result.marginTop = 0;
    result.paddingTop = 0;
    result.marginBottom = this.marginBottom;
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
