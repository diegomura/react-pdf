import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import Text from '../src/elements/Text';
import TextInstance from '../src/elements/TextInstance';
import root from './utils/dummyRoot';

jest.mock('@textkit/pdf-renderer', () => () =>
  class PDFRendererMock {
    render() {}
  },
);

let dummyRoot;

describe('Text', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should render empty text', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, '');

    text.layoutEngine = { layout: jest.fn() };

    doc.appendChild(page);
    page.appendChild(text);
    text.appendChild(textInstance);

    await doc.render();

    expect(text.layoutEngine.layout.mock.calls).toHaveLength(1);
    expect(text.layoutEngine.layout.mock.calls[0][0].string).toBe('');
  });

  test('Should render the same rect x value for clones', async () => {
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    text.appendChild(textInstance);

    text.getAbsoluteLayout = () => ({ top: 20, left: 20 });
    text.layoutText(100, 100);

    await text.render();

    const textRectX = text.lines[0].rect.x;

    const clone = text.clone();

    clone.layoutText(100, 100);
    clone.getAbsoluteLayout = () => ({ top: 20, left: 20 });

    await clone.render();

    expect(clone.lines[0].rect.x).toEqual(textRectX);
  });
});
