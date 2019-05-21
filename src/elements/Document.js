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
    this.style = {};
    this.props = props;
    this.children = [];
    this.subpages = [];
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
    child.cleanup();
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
        promises.push(Font.load(node.style, this.root.instance));
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
      } else if (typeof node.value === 'string') {
        promises.push(...fetchEmojis(node.value));
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
    await Promise.all([this.loadFonts(), this.loadImages(), this.loadEmojis()]);
  }

  applyProps() {
    this.children.forEach(child => child.applyProps());
  }

  update(newProps) {
    this.props = newProps;
  }

  cleanup() {
    this.subpages.forEach(p => p.cleanup());
  }

  finish() {
    this.children.forEach(c => c.cleanup());
  }

  getLayoutData() {
    return {
      type: this.name,
      children: this.subpages.map(c => c.getLayoutData()),
    };
  }

  async wrapPages() {
    let pageCount = 1;
    const pages = [];

    for (const page of this.children) {
      const wrapArea = page.size.height - (page.style.paddingBottom || 0);
      if (page.wrap) {
        const subpages = await wrapPages(page, wrapArea, pageCount);

        pageCount += subpages.length;

        pages.push(...subpages);
      } else {
        pages.push(page);
      }
    }

    return pages;
  }

  async renderPages() {
    this.subpages = await this.wrapPages();

    for (let j = 0; j < this.subpages.length; j++) {
      // Update dynamic text nodes with total pages info
      this.subpages[j].renderDynamicNodes(
        {
          pageNumber: j + 1,
          totalPages: this.subpages.length,
        },
        node => node.name === 'Text',
      );
      await this.subpages[j].render();
    }

    return this.subpages;
  }

  async render() {
    try {
      this.addMetaData();
      this.applyProps();
      await this.loadAssets();
      await this.renderPages();
      this.root.instance.end();
      Font.reset();
    } catch (e) {
      throw e;
    }
  }
}

export default Document;
