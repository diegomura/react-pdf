import SubPage from './SubPage';

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
