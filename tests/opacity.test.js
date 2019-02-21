import fs from 'fs';
import path from 'path';

import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import View from '../src/elements/View';
import Image from '../src/elements/Image';
import root from './utils/dummyRoot';

let dummyRoot;

const jpgImageUrl = 'https://react-pdf.org/static/images/quijote1.jpg';
const localJPGImage = fs.readFileSync(path.join(__dirname, 'assets/test.jpg'));

describe('Opacity', () => {
  beforeEach(() => {
    fetch.resetMocks();
    dummyRoot = root.reset();
  });

  test('Should render opacity 1 as default', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'red' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(1);
  });

  test('Should render passed opacity for simple view elements', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'red', opacity: 0.5 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0.5);
  });

  test('Should render zero opacity for simple view elements', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'red', opacity: 0 },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0);
  });

  test('Should render passed opacity for simple image elements', async () => {
    fetch.once(localJPGImage);

    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const image = new Image(dummyRoot, {
      src: jpgImageUrl,
      style: { width: 50, height: 50, opacity: 0.5 },
    });

    doc.appendChild(page);
    page.appendChild(image);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0.5);
  });

  test('Should render zero opacity for simple image elements', async () => {
    fetch.once(localJPGImage);

    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const image = new Image(dummyRoot, {
      src: jpgImageUrl,
      style: { width: 50, height: 50, opacity: 0 },
    });

    doc.appendChild(page);
    page.appendChild(image);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0);
  });

  test('Should render passed opacity for nested elements', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const parent = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'red', opacity: 0.5 },
    });
    const child = new View(dummyRoot, { style: { backgroundColor: 'blue' } });

    doc.appendChild(page);
    page.appendChild(parent);
    parent.appendChild(child);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(2);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0.5);
    expect(dummyRoot.instance.fillOpacity.mock.calls[1][0]).toBe(0.5);
  });

  test('Should render passed overrided opacity for nested elements', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const parent = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'red', opacity: 0.5 },
    });
    const child = new View(dummyRoot, {
      style: { backgroundColor: 'blue', opacity: 1 },
    });

    doc.appendChild(page);
    page.appendChild(parent);
    parent.appendChild(child);

    await doc.render();

    expect(dummyRoot.instance.fillOpacity.mock.calls).toHaveLength(2);
    expect(dummyRoot.instance.fillOpacity.mock.calls[0][0]).toBe(0.5);
    expect(dummyRoot.instance.fillOpacity.mock.calls[1][0]).toBe(1);
  });
});
