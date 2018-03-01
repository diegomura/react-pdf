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

  constructor(root, props) {
    this.root = root;
    this.props = { ...Page.defaultProps, ...props };
    this.children = [];
    this.initialSubpage = null;

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
    const newSubpage = new SubPage(this.root, this.props);

    newSubpage.parent = this;

    this.children.push(newSubpage);
    this.initialSubpage = newSubpage;
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

  async render() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render(this);
    }
  }
}

export default Page;
