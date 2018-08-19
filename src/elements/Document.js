import Font from '../font';
import { fetchEmojis } from '../utils/emoji';

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

  get name() {
    return 'Document';
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
      this.root.instance.info.Title = title;
    }
    if (author) {
      this.root.instance.info.Author = author;
    }
    if (subject) {
      this.root.instance.info.Subject = subject;
    }
    if (keywords) {
      this.root.instance.info.Keywords = keywords;
    }

    this.root.instance.info.Creator = creator || 'react-pdf';
    this.root.instance.info.Producer = producer || 'react-pdf';
  }

  async loadFonts() {
    const promises = [];
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.style && node.style.fontFamily) {
        promises.push(Font.load(node.style.fontFamily, this.root.instance));
      }

      if (node.children) {
        node.children.forEach(childNode => {
          listToExplore.push(childNode);
        });
      }
    }

    await Promise.all(promises);
  }

  async loadEmojis() {
    const promises = [];
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (typeof node === 'string') {
        promises.push(...fetchEmojis(node));
      } else if (node.children) {
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

      if (node.name === 'Image') {
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

  update(newProps) {
    this.props = newProps;
  }

  reset() {
    this.children.forEach(child => {
      child.reset();
    });
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
    try {
      console.time('render');
      this.addMetaData();
      this.applyProps();
      await this.loadEmojis();
      await this.loadAssets();
      await this.wrapChildren();
      await this.renderChildren();
      this.root.instance.end();
      Font.reset();
      console.timeEnd('render');
    } catch (e) {
      throw e;
    }
  }
}

export default Document;
