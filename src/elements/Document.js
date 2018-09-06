import wrapPages from 'page-wrapping';
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

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child) {
    const i = this.children.indexOf(child);
    child.parent = null;
    this.children.slice(i, 1);
  }

  addMetaData() {
    const { title, author, subject, keywords, creator, producer } = this.props;

    // The object keys need to start with a capital letter by the PDF spec
    if (title) this.root.instance.info.Title = title;
    if (author) this.root.instance.info.Author = author;
    if (subject) this.root.instance.info.Subject = subject;
    if (keywords) this.root.instance.info.Keywords = keywords;

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
    this.children.forEach(child => child.applyProps());
  }

  update(newProps) {
    this.props = newProps;
  }

  async renderPages() {
    let pageNumber = 0;

    for (let i = 0; i < this.children.length; i++) {
      const page = this.children[i];

      page.calculateLayout();

      if (page.wrap) {
        const subpages = wrapPages(page, page.size.height - page.paddingBottom);

        for (let j = 0; j < subpages.length; j++) {
          const subpage = subpages[j];
          subpage.number = pageNumber++;
          subpage.height = page.size.height;
          await subpage.render();
        }
      } else {
        page.number = pageNumber++;
        await page.render();
      }
    }
  }

  async render() {
    console.time('renderPages');
    try {
      this.addMetaData();
      await this.loadEmojis();
      await this.loadAssets();
      this.applyProps();
      await this.renderPages();
      this.root.instance.end();
      Font.reset();
    } catch (e) {
      throw e;
    }
    console.timeEnd('renderPages');
  }
}

export default Document;
