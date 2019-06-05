import wrapPages from 'page-wrapping';

import Font from '../font';

class Document {
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
      if (page.wrap) {
        const wrapArea = page.isAutoHeight
          ? Infinity
          : page.size.height - (page.style.paddingBottom || 0);

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
