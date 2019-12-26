import root from './utils/dummyRoot';
import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import View from '../src/elements/View';

let dummyRoot;

describe('Styles inherit', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  const shouldInherit = (attribute, value) => async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const parent = new View(dummyRoot, { style: { [attribute]: value } });
    const child1 = new View(dummyRoot, {});
    const child2 = new View(dummyRoot, {});

    doc.appendChild(page);
    page.appendChild(parent);
    parent.appendChild(child1);
    child1.appendChild(child2);

    await doc.render();

    expect(child1.style[attribute]).toBe(value);
    expect(child2.style[attribute]).toBe(value);
  };

  const shouldNotInherit = attribute => async () => {
    const value = 'Courier';

    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const parent = new View(dummyRoot, { style: { [attribute]: value } });
    const child1 = new View(dummyRoot, {});
    const child2 = new View(dummyRoot, {});

    doc.appendChild(page);
    page.appendChild(parent);
    parent.appendChild(child1);
    child1.appendChild(child2);

    await doc.render();

    expect(child1.style[attribute]).not.toBe(value);
    expect(child2.style[attribute]).not.toBe(value);
  };

  const shouldOverride = (attribute, value1, value2) => async () => {
    const parentValue = value1 || 'Courier';
    const childValue = value2 || 'Helvetica';

    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const parent = new View(dummyRoot, { style: { [attribute]: parentValue } });
    const child1 = new View(dummyRoot, {});
    const child2 = new View(dummyRoot, { style: { [attribute]: childValue } });

    doc.appendChild(page);
    page.appendChild(parent);
    parent.appendChild(child1);
    child1.appendChild(child2);

    await doc.render();

    expect(child1.style[attribute]).toBe(parentValue);
    expect(child2.style[attribute]).toBe(childValue);
  };

  test('Should inherit color', shouldInherit('color', 'red'));
  test('Should inherit opacity', shouldInherit('opacity', 0.5));
  test('Should inherit font size', shouldInherit('fontSize', 12));
  test('Should inherit text align', shouldInherit('textAlign', 'center'));
  test('Should inherit visibility', shouldInherit('visibility', 'none'));
  test('Should inherit font weight', shouldInherit('fontWeight', 700));
  test('Should inherit line height', shouldInherit('lineHeight', 12));
  test('Should inherit font family', shouldInherit('fontFamily', 'Courier'));
  test('Should inherit word spacing', shouldInherit('wordSpacing', 10));
  test('Should inherit letter spacing', shouldInherit('letterSpacing', 10));
  test(
    'Should inherit text transform',
    shouldInherit('textTransform', 'uppercase'),
  );
  test(
    'Should inherit text decoration',
    shouldInherit('textDecoration', 'underline'),
  );

  test('Should override color', shouldOverride('color'));
  test('Should override font size', shouldOverride('fontSize'));
  test('Should override text align', shouldOverride('textAlign'));
  test('Should override visibility', shouldOverride('visibility'));
  test('Should override font weight', shouldOverride('fontWeight', 700, 100));
  test('Should override line height', shouldOverride('lineHeight'));
  test('Should override font family', shouldOverride('fontFamily'));
  test('Should override word spacing', shouldOverride('wordSpacing'));
  test('Should override letter spacing', shouldOverride('letterSpacing'));
  test('Should override text decoration', shouldOverride('textDecoration'));

  test('Should not override others', shouldNotInherit('backgroundColor'));
});
