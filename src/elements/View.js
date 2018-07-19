import Base from './Base';

class View extends Base {
  static defaultProps = {
    style: {},
    wrap: true,
  };

  get name() {
    return 'View';
  }

  isEmpty() {
    if (this.children.length === 0) {
      return false;
    }

    return this.children.every(child => child.isEmpty());
  }

  wrapHeight(height) {
    const { wrap } = this.props;

    if (!wrap && height < this.height) {
      return 0;
    }

    let result = 0;
    for (let i = 0; i < this.children.length; i++) {
      if (this.children.height > height) {
        break;
      }

      result += this.children.height;
    }
    return result;
  }

  splice(wrapHeight, pageHeight) {
    const nextViewElements = [];
    const result = this.clone();

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const { fixed, wrap, minPresenceAhead } = child.props;
      const isElementOutside = wrapHeight < child.top;
      const shouldElementSplit = wrapHeight < child.top + child.height;

      if (isElementOutside) {
        nextViewElements.push(child);
      } else if (fixed) {
        const fixedElement = child.clone();
        fixedElement.children = child.children;
        result.appendChild(fixedElement);
      } else if (child.props.break) {
        child.props.break = false;
        nextViewElements.push(...this.children.slice(i));
        break;
      } else if (minPresenceAhead) {
        let childIndex = 1;
        let presenceAhead = 0;
        let nextChild = this.children[i + childIndex];
        let isElementInside = wrapHeight > nextChild.top;

        while (nextChild && isElementInside) {
          isElementInside = wrapHeight > nextChild.top;
          presenceAhead += nextChild.wrapHeight(
            wrapHeight - nextChild.top - this.marginTop,
          );
          nextChild = this.children[i + childIndex++];
        }

        if (presenceAhead < minPresenceAhead) {
          nextViewElements.push(...this.children.slice(i));
          break;
        }
      } else if (shouldElementSplit) {
        const remainingHeight = wrapHeight - child.top - this.marginTop;

        if (!wrap) {
          nextViewElements.push(child);
        } else {
          result.appendChild(child.splice(remainingHeight, pageHeight));
        }
      }
    }

    nextViewElements.forEach(child => child.moveTo(result));

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
