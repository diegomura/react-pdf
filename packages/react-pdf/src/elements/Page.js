import SubPage from './SubPage';
import StyleSheet from '../stylesheet';
import sizes from '../utils/pageSizes';

class Page {
  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
    wrap: false,
  };

  constructor(root, props) {
    this.root = root;
    this.parent = null;
    this.props = { ...Page.defaultProps, ...props };
    this.previousPage = null;
    this.children = [];
    this._size = null;

    this.addInitialSubpage();
  }

  get document() {
    return this.parent;
  }

  get orientation() {
    return this.props.orientation;
  }

  get initialSubpage() {
    return this.children[0];
  }

  get subpagesCount() {
    return this.children.length;
  }

  get numberOffset() {
    let result = 0;
    let page = this.previousPage;

    while (page) {
      result += page.subpagesCount;
      page = page.previousPage;
    }

    return result;
  }

  get width() {
    return this.size[0];
  }

  get height() {
    return this.size[1];
  }

  get padding() {
    return {
      top: this.style.paddingTop,
      right: this.style.paddingRight,
      bottom: this.style.paddingBottom,
      left: this.style.paddingLeft,
    };
  }

  get size() {
    if (this._size) {
      return this._size;
    }

    const { size } = this.props;

    if (typeof size === 'string') {
      this._size = sizes[size];
    } else if (Array.isArray(size)) {
      this._size = size;
    } else if (typeof size === 'object' && size.width && size.height) {
      this._size = [size.width, size.height];
    } else {
      throw new Error(`Invalid Page size: ${size}`);
    }

    return this._size;
  }

  applyProps() {
    this.style = StyleSheet.resolve(this.props.style);

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].applyProps();
    }
  }

  addInitialSubpage() {
    const newSubpage = new SubPage(this.root, this.props, 1);
    newSubpage.parent = this;

    this.children.push(newSubpage);
  }

  appendChild(child) {
    this.children[0].appendChild(child);
  }

  removeChild(child) {
    this.children[0].removeChild(child);
  }

  async wrapPage() {
    const { paddingTop, paddingBottom } = this.style;
    const height = this.height - paddingTop - paddingBottom;
    let nextSubpage = this.initialSubpage.wrap(height);

    while (this.props.wrap && !nextSubpage.isEmpty()) {
      this.children.push(nextSubpage);
      nextSubpage = nextSubpage.wrap(height);
    }
  }

  async render() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render(this);
    }
  }
}

export default Page;
