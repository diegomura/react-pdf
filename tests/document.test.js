import wrapPages from 'page-wrapping';
import Font from '../src/font';
import Page from '../src/elements/Page';
import Image from '../src/elements/Image';
import Document from '../src/elements/Document';
import root from './utils/dummyRoot';
import Text from '../src/elements/Text';
import TextInstance from '../src/elements/TextInstance';
import * as emojiUtils from '../src/utils/emoji';

jest.mock('page-wrapping');
jest.mock('../src/font');

let dummyRoot;

describe('Document', () => {
  beforeEach(() => {
    wrapPages.mockReturnValue([]);
    dummyRoot = root.reset();
  });
  afterEach(jest.resetAllMocks);

  test('Should not render extra metadata if not specified', async () => {
    const doc = new Document(dummyRoot, {});
    await doc.render();

    expect(dummyRoot.instance.info).toEqual({
      Creator: 'react-pdf',
      Producer: 'react-pdf',
    });
  });

  test('Should be able to set Title metadata', async () => {
    const doc = new Document(dummyRoot, { title: 'Test' });
    await doc.render();

    expect(dummyRoot.instance.info.Title).toBe('Test');
  });

  test('Should be able to set Author metadata', async () => {
    const doc = new Document(dummyRoot, { author: 'John Doe' });
    await doc.render();

    expect(dummyRoot.instance.info.Author).toBe('John Doe');
  });

  test('Should be able to set Subject metadata', async () => {
    const doc = new Document(dummyRoot, { subject: 'Whatever' });
    await doc.render();

    expect(dummyRoot.instance.info.Subject).toBe('Whatever');
  });

  test('Should be able to set Keywords metadata', async () => {
    const doc = new Document(dummyRoot, { keywords: 'lorem, ipsum' });
    await doc.render();

    expect(dummyRoot.instance.info.Keywords).toBe('lorem, ipsum');
  });

  test('Should be able to override Creator metadata', async () => {
    const doc = new Document(dummyRoot, { creator: 'me' });
    await doc.render();

    expect(dummyRoot.instance.info.Creator).toBe('me');
  });

  test('Should be able to override Producer metadata', async () => {
    const doc = new Document(dummyRoot, { producer: 'me' });
    await doc.render();

    expect(dummyRoot.instance.info.Producer).toBe('me');
  });

  test('Should trigger available fonts loading', async () => {
    const doc = new Document(dummyRoot, {});
    const page1 = new Page(dummyRoot, { style: { fontFamily: 'Courier' } });
    const page2 = new Page(dummyRoot, { style: { fontFamily: 'Helvetica' } });

    doc.appendChild(page1);
    doc.appendChild(page2);

    await doc.render();

    expect(Font.load.mock.calls).toHaveLength(2);
    expect(Font.load.mock.calls[0][0]).toBe('Courier');
    expect(Font.load.mock.calls[1][0]).toBe('Helvetica');
  });

  test('Should trigger correct fonts loading given multiple font-families', async () => {
    const doc = new Document(dummyRoot, {});
    const page1 = new Page(dummyRoot, {
      style: { fontFamily: 'Curlz, Curly, CurlyWurly' },
    });
    const page2 = new Page(dummyRoot, {
      style: { fontFamily: 'Roboto, Helvetica' },
    });

    doc.appendChild(page1);
    doc.appendChild(page2);

    await doc.render();

    expect(Font.load.mock.calls).toHaveLength(2);
    expect(Font.load.mock.calls[0][0]).toBe('Curlz');
    expect(Font.load.mock.calls[1][0]).toBe('Roboto');
  });

  test('Should trigger available images loading', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const image1 = new Image(dummyRoot, {
      src: 'src1',
      style: { width: 10, height: 10 },
    });
    const image2 = new Image(dummyRoot, {
      src: 'src2',
      style: { width: 10, height: 10 },
    });

    // Simulate fetch successful loading
    const image1Fetch = jest.fn(() => {
      image1.image = { data: { width: 10, height: 10 } };
    });
    const image2Fetch = jest.fn(() => {
      image2.image = { data: { width: 10, height: 10 } };
    });

    image1.fetch = image1Fetch;
    image2.fetch = image2Fetch;

    doc.appendChild(page);
    page.appendChild(image1);
    page.appendChild(image2);

    await doc.render();

    expect(image1Fetch.mock.calls).toHaveLength(1);
    expect(image2Fetch.mock.calls).toHaveLength(1);
  });

  test('Should trigger available emojis loading', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, '😁 😊');

    // Simulate fetch successful loading
    emojiUtils.fetchEmojis = jest.fn(() => [
      Promise.resolve(),
      Promise.resolve(),
    ]);

    doc.appendChild(page);
    page.appendChild(text);
    text.appendChild(textInstance);

    await doc.render();

    expect(emojiUtils.fetchEmojis.mock.calls).toHaveLength(1);
  });

  test('Should trigger page wrapping if flag true', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: true, size: [100, 100] });

    doc.appendChild(page);

    await doc.render();

    expect(wrapPages.mock.calls).toHaveLength(1);
    expect(wrapPages.mock.calls[0][0]).toBe(page);
    expect(wrapPages.mock.calls[0][1]).toBe(100);
  });

  test('Should avoid page wrapping if flag false', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false, size: [100, 100] });

    doc.appendChild(page);

    await doc.render();

    expect(wrapPages.mock.calls).toHaveLength(0);
  });

  test('Should end document instance after render', async () => {
    const doc = new Document(dummyRoot, {});
    await doc.render();

    expect(dummyRoot.instance.end.mock.calls).toHaveLength(1);
  });
});
