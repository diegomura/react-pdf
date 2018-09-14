import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import Note from '../src/elements/Note';
import Text from '../src/elements/Text';
import View from '../src/elements/View';
import TextInstance from '../src/elements/TextInstance';
import root from './utils/dummyRoot';

let dummyRoot;

describe('View', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should have null dimensions', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const note = new Note(dummyRoot, {});
    const text = new TextInstance(dummyRoot, 'Im a note!');

    doc.appendChild(page);
    page.appendChild(note);
    note.appendChild(text);

    await doc.render();

    expect(note.width).toBe(0);
    expect(note.height).toBe(0);
  });

  test('Should render note empty corectly', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const note = new Note(dummyRoot, {});

    doc.appendChild(page);
    page.appendChild(note);

    await doc.render();

    expect(dummyRoot.instance.note.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.note.mock.calls[0]).toEqual([0, 0, 0, 0, '']);
  });

  test('Should render note corectly', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const note = new Note(dummyRoot, {});
    const text = new TextInstance(dummyRoot, 'Im a note!');

    doc.appendChild(page);
    page.appendChild(note);
    note.appendChild(text);

    await doc.render();

    expect(dummyRoot.instance.note.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.note.mock.calls[0]).toEqual([
      0,
      0,
      0,
      0,
      'Im a note!',
    ]);
  });

  test('Should adjust to other elements in page', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const note = new Note(dummyRoot, {});
    const view = new View(dummyRoot, { style: { width: '100%', height: 300 } });
    const text = new TextInstance(dummyRoot, 'Im a note!');

    doc.appendChild(page);
    page.appendChild(view);
    page.appendChild(note);
    note.appendChild(text);

    await doc.render();

    expect(dummyRoot.instance.note.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.note.mock.calls[0]).toEqual([
      0,
      300,
      0,
      0,
      'Im a note!',
    ]);
  });

  test('Should throw error if non string children passed', () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const note = new Note(dummyRoot, {});
    const text = new Text(dummyRoot, {});

    doc.appendChild(page);
    page.appendChild(note);

    expect(() => note.appendChild(text)).toThrowError();
  });
});
