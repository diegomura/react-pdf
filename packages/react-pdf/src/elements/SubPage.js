import warning from 'fbjs/lib/warning';
import Base from './Base';

const ORPHAN_THRESHOLD = 15;

class SubPage extends Base {
  constructor(root, props, number) {
    super(root, props);

    this.number = number;
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
      } else {
        this.layout.setWidth(size[0]);
      }
    }
  }

  recalculateLayout() {
    super.recalculateLayout();
    this.layout.calculateLayout();
  }

  getPage() {
    return this.parent;
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

    result.number = this.number + 1;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const { fixed, wrap, orphan } = child.props;

      const childBottom = child.top + child.height;
      const isElementOutside = height < child.top;
      const shouldElementSplit = height < childBottom;
      const orphanThreshold = child.props.orphanThreshold || ORPHAN_THRESHOLD;
      const isElementOrphan = !orphan && height - childBottom < orphanThreshold;

      if (fixed) {
        const fixedElement = child.clone();
        fixedElement.children = child.children;
        result.appendChild(fixedElement);
      } else if (isElementOutside || isElementOrphan) {
        nextPageElements.push(child);
      } else if (child.props.break) {
        child.props.break = false;
        nextPageElements.push(...this.children.slice(i));
        break;
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
      const totalPages = this.getPage().subpagesCount;

      if (!node.children) continue;

      node.children = node.children.map(childNode => {
        if (childNode.constructor.name === 'Func') {
          return childNode.call({
            totalPages,
            pageNumber: this.number,
          });
        }

        listToExplore.push(childNode);
        return childNode;
      });
    }
  }

  layoutFixedElements() {
    this.reset();
    this.layout.setHeight(this.size[1]);
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
  }
}

export default SubPage;
