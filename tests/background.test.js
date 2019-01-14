import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import View from '../src/elements/View';
import root from './utils/dummyRoot';

let dummyRoot;

describe('Background', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should render sharp background correctly', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, backgroundColor: 'tomato' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.rect.mock.calls[0]).toEqual([0, 0, 50, 50]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });

  test('Should render sharp background correctly ignoring margins', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, margin: 40, backgroundColor: 'tomato' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.rect.mock.calls[0]).toEqual([40, 40, 50, 50]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });

  test('Should render sharp background correctly including paddings', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, padding: 20, backgroundColor: 'tomato' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.rect.mock.calls[0]).toEqual([0, 0, 50, 50]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });

  test('Should render rounded background correctly', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: {
        width: 50,
        height: 50,
        backgroundColor: 'tomato',
        borderRadius: 5,
      },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.rect.mock.calls[0]).toEqual([0, 0, 50, 50]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });
});
