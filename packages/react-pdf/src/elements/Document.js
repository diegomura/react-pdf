import Font from '../font';

class Document {
  static defaultProps = {
    author: null,
    keywords: null,
    subject: null,
    title: null,
  };

  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.children = [];
  }

  get pageCount() {
    return this.children.reduce((acc, page) => acc + page.subpagesCount, 0);
  }

  appendChild(child) {
    child.parent = this;
    child.previousPage = this.children[this.children.length - 1];
    this.children.push(child);
  }

  removeChild(child) {
    const i = this.children.indexOf(child);
    child.parent = null;

    if (this.children[i + 1]) {
      this.children[i + 1].previousPage = this.children[i].previousPage;
    }

    this.children.slice(i, 1);
  }

  addMetaData() {
    const { title, author, subject, keywords, creator, producer } = this.props;

    // The object keys need to start with a capital letter by the PDF spec
    if (title) {
      this.root.info.Title = title;
    }
    if (author) {
      this.root.info.Author = author;
    }
    if (subject) {
      this.root.info.Subject = subject;
    }
    if (keywords) {
      this.root.info.Keywords = keywords;
    }

    this.root.info.Creator = creator || 'react-pdf';
    this.root.info.Producer = producer || 'react-pdf';
  }

  async loadFonts() {
    const promises = [];
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.style && node.style.fontFamily) {
        promises.push(Font.load(node.style.fontFamily, this.root));
      }

      if (node.children) {
        node.children.forEach(childNode => {
          listToExplore.push(childNode);
        });
      }
    }

    await Promise.all(promises);
  }

  async loadImages() {
    const promises = [];
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.constructor.name === 'Image') {
        promises.push(node.fetch());
      }

      if (node.children) {
        node.children.forEach(childNode => {
          listToExplore.push(childNode);
        });
      }
    }

    await Promise.all(promises);
  }

  async loadAssets() {
    await Promise.all([this.loadFonts(), this.loadImages()]);
  }

  applyProps() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].applyProps();
    }
  }

  async wrapChildren() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].wrapPage();
    }
  }

  async renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render();
    }
  }

  async render() {
    this.addMetaData();
    this.applyProps();
    await this.loadAssets();
    await this.wrapChildren();
    await this.renderChildren();
    this.root.end();
    Font.reset();
  }
}

export default Document;
