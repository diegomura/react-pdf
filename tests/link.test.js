import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import Link from '../src/elements/Link';
import View from '../src/elements/View';
import root from './utils/dummyRoot';

let dummyRoot;

const src = 'http://www.github.com/diegomura/react-pdf';

describe('Link', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should render absolute link', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const link = new Link(dummyRoot, {
      src,
      style: { position: 'absolute', width: 20, height: 20, top: 10, left: 30 },
    });

    doc.appendChild(page);
    page.appendChild(link);

    await doc.render();

    expect(dummyRoot.instance.link.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.link.mock.calls[0]).toEqual([
      30,
      10,
      20,
      20,
      src,
    ]);
  });

  test('Should render link between another component', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { size: { width: 200, height: 200 } });
    const link = new Link(dummyRoot, { src });
    const view = new View(dummyRoot, { style: { width: 20, height: 20 } });

    doc.appendChild(page);
    page.appendChild(link);
    link.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.link.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.link.mock.calls[0]).toEqual([0, 0, 200, 20, src]);
  });
});
