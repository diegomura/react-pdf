import Base from './Base';

const ORPHAN_THRESHOLD = 15;

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  isEmpty() {
    if (this.children.length === 0) {
      return false;
    }

    return this.children.every(child => child.isEmpty());
  }

  splice(wrapHeight, pageHeight) {
    const buffer = [];
    const result = this.clone();

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const { fixed, wrap, orphan } = child.props;

      const childBottom = child.top + child.height;
      const isElementOutside = wrapHeight < child.top;
      const shouldElementSplit = wrapHeight < child.top + child.height;
      const orphanThreshold = child.props.orphanThreshold || ORPHAN_THRESHOLD;
      const isElementOrphan =
        !orphan && pageHeight - childBottom < orphanThreshold;

      if (isElementOutside || isElementOrphan) {
        buffer.push(child);
      } else if (fixed) {
        const fixedElement = child.clone();
        fixedElement.children = child.children;
        result.appendChild(fixedElement);
      } else if (child.props.break) {
        child.props.break = false;
        buffer.push(...this.children.slice(i));
        break;
      } else if (shouldElementSplit) {
        const remainingHeight = wrapHeight - child.top - this.marginTop;

        if (!wrap) {
          buffer.push(child);
        } else {
          result.appendChild(child.splice(remainingHeight, pageHeight));
        }
      }
    }

    buffer.forEach(child => child.moveTo(result));

    // If the View has fixed height, we calculate the new element heights.
    // If not, we set it up as NaN and use Yoga calculated heights as fallback.
    const h = this.style.height ? wrapHeight : NaN;

    result.marginTop = 0;
    result.paddingTop = 0;
    result.height = this.height - h;
    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.height = h;

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
