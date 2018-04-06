import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
  };

  splice(height) {
    const toErase = [];
    const result = this.clone();

    this.children.forEach(child => {
      if (height < child.top) {
        // result.appendChild(child.clone());
        toErase.push(child);
      } else if (height < child.top + child.height) {
        const res = child.splice(height - this.marginTop - child.top);

        if (res) {
          result.appendChild(res);
        }
      }
    });

    toErase.forEach(child => {
      child.reset();
      this.removeChild(child);
      result.appendChild(child);
    });

    result.marginBottom = this.marginBottom;
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
