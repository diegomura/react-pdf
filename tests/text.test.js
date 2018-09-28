import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import Text from '../src/elements/Text';
import TextInstance from '../src/elements/TextInstance';
import root from './utils/dummyRoot';

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

    doc.appendChild(page);
    page.appendChild(text);
    text.appendChild(textInstance);

    await doc.render();

    expect(dummyRoot.layoutEngine.layout.mock.calls).toHaveLength(1);
    expect(dummyRoot.layoutEngine.layout.mock.calls[0][0].string).toBe('');
  });
});
