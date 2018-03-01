import Font from '../font';

class Document {
  static defaultProps = {
    author: null,
    keywords: null,
    subject: null,
    title: null,
  };

  children = [];

  constructor(root, props) {
    this.root = root;
    this.props = props;
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.slice(index, 1);
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
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.style && node.style.fontFamily) {
        await Font.load(node.style.fontFamily, this.root);
      }

      if (node.children) {
        node.children.forEach(childNode => {
          listToExplore.push(childNode);
        });
      }
    }
  }

  applyProps() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].applyProps();
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
    await this.loadFonts();
    await this.renderChildren();
    this.root.end();
    Font.reset();
  }
}

export default Document;
