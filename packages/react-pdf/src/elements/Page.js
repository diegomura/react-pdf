import SubPage from './SubPage';
import StyleSheet from '../stylesheet';
import sizes from '../utils/pageSizes';

class Page {
  parent = null;
  children = [];

  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
    wrap: false,
  };

  constructor(root, props, numberBase = 1) {
    this.root = root;
    this.props = { ...Page.defaultProps, ...props };
    this.children = [];
    this.initialSubpage = null;
    this.numberBase = numberBase;

    this.addInitialSubpage();
  }

  applyProps() {
    this.style = StyleSheet.resolve(this.props.style);

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].applyProps();
    }
  }

  getSize() {
    const { size } = this.props;

    if (typeof size === 'string') {
      return sizes[size];
    } else if (Array.isArray(size)) {
      return size;
    } else if (typeof size === 'object' && size.width && size.height) {
      return [size.width, size.height];
    } else {
      throw new Error(`Invalid Page size: ${size}`);
    }
  }

  getOrientation() {
    return this.props.orientation;
  }

  addInitialSubpage() {
    const newSubpage = new SubPage(this.root, this.props, this.numberBase);

    newSubpage.parent = this;

    this.children.push(newSubpage);
    this.initialSubpage = newSubpage;
  }

  getInitialSubpage() {
    return this.children[0];
  }

  addNewSubpage() {
    const newSubpage = this.initialSubpage.clone();

    this.children.push(newSubpage);
  }

  appendChild(child) {
    this.children[0].appendChild(child);
  }

  removeChild(child) {
    this.children[0].removeChild(child);
  }

  getWidth() {
    return this.children[0].getWidth();
  }

  getHeight() {
    return this.children[0].getHeight();
  }

  async wrapPage() {
    const height =
      this.getSize()[1] - this.style.paddingTop - this.style.paddingBottom;
    let nextSubpage = this.getInitialSubpage().wrap(height);

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
