import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import View from '../src/elements/View';
import root from './utils/dummyRoot';

let dummyRoot;

describe('Borders', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should render solid border', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, borderBottom: '2 solid red' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.lineWidth.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.lineWidth.mock.calls[0][0]).toBe(4);
    expect(dummyRoot.instance.stroke.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.dash.mock.calls).toHaveLength(0);
  });

  test('Should render dashed border', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, borderBottom: '2 dashed red' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.lineWidth.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.lineWidth.mock.calls[0][0]).toBe(4);
    expect(dummyRoot.instance.stroke.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.dash.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.dash.mock.calls[0][0]).toBe(4);
  });

  test('Should render dotted border', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { width: 50, height: 50, borderBottom: '2 dotted red' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.lineWidth.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.lineWidth.mock.calls[0][0]).toBe(4);
    expect(dummyRoot.instance.stroke.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.dash.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.dash.mock.calls[0][0]).toBe(2);
  });
});
