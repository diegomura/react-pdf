import React, { Fragment } from 'react';
import Page from '../src/elements/Page';
import View from '../src/elements/View';
import Image from '../src/elements/Image';
import Document from '../src/elements/Document';
import root from './utils/dummyRoot';

let dummyRoot;
const ViewElement = 'VIEW';
const ImageElement = 'IMAGE';
const testImage = 'https://react-pdf.org/static/images/quijote1.jpg';

// Only for testing purposes
// Helper function to render document and get subpages in the process.
const renderDocument = async doc => {
  doc.addMetaData();
  doc.applyProps();
  await doc.loadEmojis();
  await doc.loadAssets();
  const subpages = await doc.renderPages();
  doc.root.instance.end();
  return subpages;
};

describe('Layout', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Absolute elements should be placed with top fixed', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', top: 10 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.top).toBe(10);
  });

  test('Absolute elements should be placed with left fixed', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', left: 10 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.left).toBe(10);
  });

  test('Absolute elements should be placed with right fixed', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', right: 10 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.right).toBe(-10);
  });

  test('Absolute elements should be placed with bottom fixed', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', bottom: 10 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.bottom).toBe(-10);
  });

  test('Absolute elements should be placed by all edges fixed', async () => {
    const size = { width: 600, height: 800 };
    const style = {
      position: 'absolute',
      top: 10,
      right: 20,
      bottom: 30,
      left: 40,
    };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size: size, wrap: false });
    const view = new View(dummyRoot, { style: style });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.top).toBe(10);
    expect(view.left).toBe(40);
    expect(view.width).toBe(size.width - style.right - style.left);
    expect(view.height).toBe(size.height - style.top - style.bottom);
  });

  test('Absolute elements should be placed with percent top', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size, wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', top: '10%' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.top).toBe(size.height * 0.1);
  });

  test('Absolute elements should be placed with percent left', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, { size });
    const page = new Page(dummyRoot, { wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', left: '10%' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.left).toBe(size.width * 0.1);
  });

  test('Absolute elements should be placed with percent right', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size, wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', right: '10%' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.right).toBe(size.width * -0.1);
  });

  test('Absolute elements should be placed with percent bottom', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size, wrap: false });
    const view = new View(dummyRoot, {
      style: { position: 'absolute', bottom: '10%' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.bottom).toBe(size.height * -0.1);
  });

  test('Absolute elements should be placed by all edges percent', async () => {
    const size = { width: 600, height: 800 };
    const style = {
      position: 'absolute',
      top: '10%',
      right: '20%',
      bottom: '30%',
      left: '40%',
    };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size: size, wrap: false });
    const view = new View(dummyRoot, { style: style });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(view.top).toBe(size.height * 0.1);
    expect(view.left).toBe(size.width * 0.4);
    expect(view.width).toBe(size.width - size.width * 0.2 - size.width * 0.4);
    expect(view.height).toBe(
      size.height - size.height * 0.1 - size.height * 0.3,
    );
  });

  test('Should wrap single big view on non padding page', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { style: { height: 1200 } });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(800);
    expect(subpages[1].children[0].height).toBe(400);
  });

  test('Should wrap single big view on padding page', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const view = new View(dummyRoot, { style: { height: 1200 } });
    const page = new Page(dummyRoot, {
      size,
      style: { paddingTop: 10, paddingBottom: 20 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(770);
    expect(subpages[1].children[0].height).toBe(430);
  });

  test('Should wrap nested big view on non padding page', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { style: { height: 1200, padding: 20 } });
    const child = new View(dummyRoot, { style: { height: 800 } });

    doc.appendChild(page);
    page.appendChild(view);
    view.appendChild(child);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(800);
    expect(subpages[0].children[0].children[0].height).toBe(780);
    expect(subpages[1].children[0].height).toBe(400);
    expect(subpages[1].children[0].children[0].height).toBe(20);
  });

  test('Should wrap nested big view on padding page', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const view = new View(dummyRoot, { style: { height: 1200, padding: 20 } });
    const child = new View(dummyRoot, { style: { height: 800 } });
    const page = new Page(dummyRoot, {
      size,
      style: { paddingTop: 10, paddingBottom: 20 },
    });

    doc.appendChild(page);
    page.appendChild(view);
    view.appendChild(child);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(770);
    expect(subpages[0].children[0].children[0].height).toBe(750);
    expect(subpages[1].children[0].height).toBe(430);
    expect(subpages[1].children[0].children[0].height).toBe(50);
  });

  test('Elements should wrap and adjust', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {
      size,
      style: { flexDirection: 'row' },
    });
    const child1 = new View(dummyRoot, { style: { height: 600, flex: 1 } });
    const child2 = new View(dummyRoot, { style: { height: 1000, flex: 1 } });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children).toHaveLength(2);
    expect(subpages[0].children[0].width).toBe(300);
    expect(subpages[0].children[0].height).toBe(600);
    expect(subpages[0].children[1].width).toBe(300);
    expect(subpages[0].children[1].height).toBe(800);
    expect(subpages[1].children).toHaveLength(1);
    expect(subpages[1].children[0].width).toBe(600);
    expect(subpages[1].children[0].height).toBe(200);
  });

  test('Should not wrap if flag false', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const child1 = new View(dummyRoot, { style: { height: 600 } });
    const child2 = new View(dummyRoot, { style: { height: 400 }, wrap: false });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[1].children).toHaveLength(1);
    expect(subpages[0].children[0].height).toBe(600);
    expect(subpages[1].children[0].height).toBe(400);
  });

  test('Should break if flag true', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const child1 = new View(dummyRoot, { style: { height: 600 } });
    const child2 = new View(dummyRoot, { style: { height: 400 }, break: true });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[1].children).toHaveLength(1);
    expect(subpages[0].children[0].height).toBe(600);
    expect(subpages[1].children[0].height).toBe(400);
  });

  test('Images should not wrap', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { style: { height: 700 } });
    const image = new Image(dummyRoot, {
      style: { height: 300 },
      src: testImage,
    });

    doc.appendChild(page);
    page.appendChild(view);
    page.appendChild(image);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[1].children).toHaveLength(1);
    expect(subpages[0].children[0].name).toBe('View');
    expect(subpages[1].children[0].name).toBe('Image');
  });

  test('Should not break if enough presence ahead', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const child1 = new View(dummyRoot, {
      style: { height: 500 },
      minPresenceAhead: 100,
    });
    const child2 = new View(dummyRoot, { style: { height: 200 } });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(1);
    expect(subpages[0].children).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(500);
    expect(subpages[0].children[1].height).toBe(200);
  });

  test('Should break if not enough presence ahead', async () => {
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const child1 = new View(dummyRoot, { style: { height: 500 } });
    const child2 = new View(dummyRoot, {
      style: { height: 500 },
      minPresenceAhead: 300,
    });
    const child3 = new View(dummyRoot, { style: { height: 500 } });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);
    page.appendChild(child3);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(3);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[0].children[0].height).toBe(500);
    expect(subpages[1].children).toHaveLength(2);
    expect(subpages[1].children[0].height).toBe(500);
    expect(subpages[1].children[1].height).toBe(300);
    expect(subpages[2].children).toHaveLength(1);
    expect(subpages[2].children[0].height).toBe(200);
  });

  test('Fixed elements should repeat througout pages', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { height: 1200 } });
    const fixed = new View(dummyRoot, {
      style: { positon: 'absolute', top: 20 },
      fixed: true,
    });

    doc.appendChild(page);
    page.appendChild(fixed);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].fixed).toBeTruthy();
    expect(subpages[1].children[0].fixed).toBeTruthy();
  });

  test('Should render dynamic content without conditions', async () => {
    const render = () => <ViewElement style={{ width: '100%', height: 400 }} />;
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { render });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(1);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[0].children[0].width).toBe(600);
    expect(subpages[0].children[0].height).toBe(400);
  });

  test('Should render dynamic images without conditions', async () => {
    const render = () => <ImageElement src={testImage} />;
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { render });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(1);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[0].children[0].children).toHaveLength(1);
    expect(subpages[0].children[0].children[0].name).toBe('Image');
    expect(subpages[0].children[0].children[0].props.src).toBe(testImage);
  });

  test('Should render multipe dynamic content without conditions using Fragment', async () => {
    const render = () => (
      <Fragment>
        <ViewElement style={{ width: '100%', height: 500 }} />
        <ViewElement style={{ width: '100%', height: 500 }} />
      </Fragment>
    );
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { render });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].children).toHaveLength(2);
    expect(subpages[0].children[0].children[0].height).toBe(500);
    expect(subpages[0].children[0].children[1].height).toBe(300);
    expect(subpages[1].children[0].children).toHaveLength(1);
    expect(subpages[1].children[0].children[0].height).toBe(200);
  });

  test('Should render dynamic content on first page', async () => {
    const render = ({ pageNumber }) =>
      pageNumber === 1 && (
        <ViewElement style={{ width: '100%', height: 400 }} />
      );
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { render });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(1);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[0].children[0].width).toBe(600);
    expect(subpages[0].children[0].height).toBe(400);
  });

  test('Should render dynamic content on second page', async () => {
    const render = ({ pageNumber }) =>
      pageNumber === 2 && (
        <ViewElement style={{ width: '100%', height: 400 }} />
      );
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const child1 = new View(dummyRoot, { render, fixed: true });
    const child2 = new View(dummyRoot, {
      style: { width: '100%', height: 1000 },
    });

    doc.appendChild(page);
    page.appendChild(child1);
    page.appendChild(child2);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(2);
    expect(subpages[0].children[0].height).toBe(0);
    expect(subpages[0].children[1].height).toBe(800);
    expect(subpages[1].children[0].height).toBe(400);
    expect(subpages[1].children[1].height).toBe(200);
  });

  test('Should not render dynamic content on not available page', async () => {
    const render = ({ pageNumber }) =>
      pageNumber === 2 && (
        <ViewElement style={{ width: '100%', height: 400 }} />
      );
    const size = { width: 600, height: 800 };
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size });
    const view = new View(dummyRoot, { render });

    doc.appendChild(page);
    page.appendChild(view);

    const subpages = await renderDocument(doc);

    expect(subpages).toHaveLength(1);
    expect(subpages[0].children).toHaveLength(1);
    expect(subpages[0].children[0].children).toHaveLength(0);
  });
});
