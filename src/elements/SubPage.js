import warning from 'fbjs/lib/warning';
import Base from './Base';

class SubPage extends Base {
  constructor(root, props, number) {
    super(root, props);

    this._number = number;
  }

  get name() {
    return 'SubPage';
  }

  get page() {
    return this.parent;
  }

  get size() {
    return this.parent.size;
  }

  get style() {
    return this.parent.style;
  }

  set style(style) {
    return style;
  }

  get number() {
    return this._number + this.page.numberOffset;
  }

  resetMargins() {
    if (
      !!this.style.marginTop ||
      !!this.style.marginBottom ||
      !!this.style.marginLeft ||
      !!this.style.marginRight
    ) {
      warning(
        false,
        'Margin values are not allowed on Page element. Use padding instead.',
      );

      this.style.marginTop = 0;
      this.style.marginBottom = 0;
      this.style.marginLeft = 0;
      this.style.marginRight = 0;
    }
  }

  applyProps() {
    super.applyProps();
    this.resetMargins();

    if (this.props.size) {
      const size = this.size;

      if (this.props.orientation === 'landscape') {
        this.layout.setWidth(size[1]);
        this.layout.setHeight(size[0]);
      } else {
        this.layout.setWidth(size[0]);
        this.layout.setHeight(size[1]);
      }
    }
  }

  recalculateLayout() {
    super.recalculateLayout();
    this.layout.calculateLayout();
  }

  isEmpty() {
    const nonFixedChilds = this.children.filter(child => !child.props.fixed);
    if (nonFixedChilds.length === 0) {
      return true;
    }

    return nonFixedChilds.every(child => child.isEmpty());
  }

  wrap(height) {
    this.layout.calculateLayout();

    const nextPageElements = [];
    const result = this.clone();

    result._number = this._number + 1;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const { fixed, wrap, minPresenceAhead } = child.props;

      const isElementOutside = height < child.top;
      const childBottom = child.top + child.height - this.paddingTop;
      const shouldElementSplit = height < childBottom;

      if (fixed) {
        const fixedElement = child.clone();
        fixedElement.children = child.children;
        result.appendChild(fixedElement);
      } else if (isElementOutside) {
        nextPageElements.push(child);
      } else if (child.props.break) {
        child.props.break = false;
        nextPageElements.push(...this.children.slice(i));
        break;
      } else if (minPresenceAhead) {
        let childIndex = 1;
        let presenceAhead = 0;
        let nextChild = this.children[i + childIndex];
        let isElementInside = height > nextChild.top;

        while (nextChild && isElementInside) {
          isElementInside = height > nextChild.top;
          presenceAhead += nextChild.wrapHeight(
            height - nextChild.top - this.marginTop,
          );
          nextChild = this.children[i + childIndex++];
        }

        if (presenceAhead < minPresenceAhead) {
          nextPageElements.push(...this.children.slice(i));
          break;
        }
      } else if (shouldElementSplit) {
        const remainingHeight = height - child.top + this.paddingTop;

        if (!wrap) {
          nextPageElements.push(child);
        } else {
          result.appendChild(child.splice(remainingHeight, height));
        }
      }
    }

    nextPageElements.forEach(child => child.moveTo(result));
    result.applyProps();

    return result;
  }

  callChildFunctions() {
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();
      const { pageCount } = this.page.document;

      if (node.renderCallback) {
        const callResult = node.renderCallback({
          totalPages: pageCount,
          pageNumber: this.number,
        });

        node.renderCallback = null;
        node.children = [callResult];
        continue;
      }

      if (node.children) {
        listToExplore.push(...node.children);
      }
    }
  }

  layoutFixedElements() {
    this.reset();
    this.recalculateLayout();

    this.children.forEach(child => {
      if (child.props.fixed) {
        child.reset();
      }
    });
  }

  async render(page) {
    this.root.addPage({
      size: this.size,
      layout: this.props.orientation,
      margin: 0,
    });

    this.callChildFunctions();
    this.layoutFixedElements();

    if (this.style.backgroundColor) {
      this.root
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.root.page.width, this.root.page.height)
        .fill();
    }

    if (this.props.debug) {
      this.debug();
    }

    await this.renderChildren(page);

    this.page.renderRuler();
  }
}

export default SubPage;
