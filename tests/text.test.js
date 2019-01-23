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

    text.layoutEngine = { layout: jest.fn() };

    doc.appendChild(page);
    page.appendChild(text);
    text.appendChild(textInstance);

    await doc.render();

    expect(text.layoutEngine.layout.mock.calls).toHaveLength(1);
    expect(text.layoutEngine.layout.mock.calls[0][0].string).toBe('');
  });

  test('Should render maxLines', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { maxLines: 2 });
    const textInstance = new TextInstance(dummyRoot, 'really long text');

    text.layoutEngine = {
      layout: jest.fn((attributedString, containers) => {
        containers[0].blocks = [
          {
            lines: [
              { rect: { y: 0, x: 0 } },
              { rect: { y: 0, x: 0 } },
              { rect: { y: 0, x: 0 } },
            ],
          },
        ];
      }),
    };

    doc.appendChild(page);
    page.appendChild(text);
    text.appendChild(textInstance);

    await text.layoutText();

    expect(text.lines.length).toEqual(2);
  });
});
