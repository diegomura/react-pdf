import Text from '../src/elements/Text';
import TextInstance from '../src/elements/TextInstance';
import { getAttributedString } from '../src/text/attributedString';

describe('attributedString', () => {
  test('Should get emtpy attributed string if no instance passed', () => {
    const attributedString = getAttributedString();

    expect(attributedString.string).toEqual('');
  });

  test('Should get attributed string from single text node', () => {
    const text = new Text(null, {});
    const instance = new TextInstance(null, 'Hey');

    text.appendChild(instance);

    const attributedString = getAttributedString(text);

    expect(attributedString.runs).toHaveLength(1);
    expect(attributedString.string).toEqual('Hey');
  });

  test('Should get attributed string with inline texts', () => {
    const root = new Text(null, {});
    const inline = new Text(null, {});
    const instance1 = new TextInstance(null, 'Hey');
    const instance2 = new TextInstance(null, 'Ho');
    const instance3 = new TextInstance(null, 'Lets go');

    root.style = {}; // Simulate parent stlyes computing

    inline.appendChild(instance2);
    root.appendChild(instance1);
    root.appendChild(inline);
    root.appendChild(instance3);

    const attributedString = getAttributedString(root);

    expect(attributedString.runs).toHaveLength(3);
    expect(attributedString.string).toEqual('HeyHoLets go');
  });

  test('Should set backgroundColor to attributed string', () => {
    const text = new Text(null, {});
    const instance = new TextInstance(null, 'Hey');

    text.style = { backgroundColor: 'red' }; // Simulate parent stlyes computing
    text.appendChild(instance);

    const attributedString = getAttributedString(text);

    expect(attributedString.runs[0].attributes.backgroundColor).toBe('red');
  });

  test('Should set opacity to attributed string', () => {
    const text = new Text(null, {});
    const instance = new TextInstance(null, 'Hey');

    text.style = { opacity: 0.4 }; // Simulate parent stlyes computing
    text.appendChild(instance);

    const attributedString = getAttributedString(text);

    expect(attributedString.runs[0].attributes.opacity).toBe(0.4);
  });

  test('Should set zero opacity to attributed string', () => {
    const text = new Text(null, {});
    const instance = new TextInstance(null, 'Hey');

    text.style = { opacity: 0 }; // Simulate parent stlyes computing
    text.appendChild(instance);

    const attributedString = getAttributedString(text);

    expect(attributedString.runs[0].attributes.opacity).toBe(0);
  });
});
