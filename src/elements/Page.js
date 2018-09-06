import warning from 'fbjs/lib/warning';
import Base from './Base';
import StyleSheet from '../stylesheet';
import getPageSize from '../utils/pageSizes';
import Ruler from '../mixins/ruler';

class Page extends Base {
  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
    wrap: false,
  };

  constructor(root, props) {
    super(root, props);

    this._number = null;
    this._size = null;
  }

  get name() {
    return 'Page';
  }

  get document() {
    return this.parent;
  }

  get page() {
    return this;
  }

  get number() {
    return this._number;
  }

  set number(value) {
    this._number = value;
  }

  get orientation() {
    return this.props.orientation;
  }

  get size() {
    if (this._size) {
      return this._size;
    }

    this._size = getPageSize(this.props.size, this.orientation);

    // Adjust size for ruler
    if (this.hasHorizontalRuler()) {
      this._size.width += this.getRulerWidth();
    }

    if (this.hasVerticalRuler()) {
      this._size.height += this.getRulerWidth();
    }

    return this._size;
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
    this.top = 0;
    this.left = 0;
    this.style = StyleSheet.resolve(this.props.style);

    this.resetMargins();

    this.layout.setWidth(this.size.width);

    // Add some padding if ruler present, so we can see the whole page inside it
    const rulerWidth = this.getRulerWidth();
    const { paddingTop = 0, paddingLeft = 0 } = this.style;

    if (this.hasHorizontalRuler()) {
      this.style.paddingTop = paddingTop + rulerWidth;
    }

    if (this.hasVerticalRuler()) {
      this.style.paddingLeft = paddingLeft + rulerWidth;
    }

    super.applyProps();
  }

  // callChildFunctions() {
  //   const listToExplore = this.children.slice(0);
  //
  //   while (listToExplore.length > 0) {
  //     const node = listToExplore.shift();
  //
  //     if (node.renderCallback) {
  //       const callResult = node.renderCallback({
  //         totalPages: 3, //TODO: Fix this
  //         pageNumber: this.number,
  //       });
  //
  //       node.renderCallback = null;
  //       node.children = [callResult];
  //       continue;
  //     }
  //
  //     if (node.children) {
  //       listToExplore.push(...node.children);
  //     }
  //   }
  // }

  onNodeWrap() {
    this.calculateLayout();
  }

  update(newProps) {
    // this.props = { ...Page.defaultProps, ...newProps };
  }

  async render() {
    const { instance } = this.root;

    instance.addPage({
      size: [this.size.width, this.size.height],
      layout: this.props.orientation,
      margin: 0,
    });

    // this.callChildFunctions();

    this.layout.calculateLayout();

    if (this.style.backgroundColor) {
      instance
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.size.width, this.size.height)
        .fill();
    }

    await this.renderChildren();

    if (this.props.debug) this.debug();

    this.renderRuler();
  }
}

Object.assign(Page.prototype, Ruler);

export default Page;
