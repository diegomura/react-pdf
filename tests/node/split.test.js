import split from '../../src/node/split';

describe('node split', () => {
  test('should not split null node', () => {
    const [splitted, rest] = split(400, null);

    expect(splitted).toEqual(null);
    expect(rest).toEqual(null);
  });

  test('should not split if height higher than node', () => {
    const node = { box: { width: 100, height: 300 } };
    const [splitted, rest] = split(400, node);

    expect(splitted.box).toHaveProperty('width', 100);
    expect(splitted.box).toHaveProperty('height', 300);
    expect(rest).toEqual(null);
  });

  test('should split if height lower than node', () => {
    const node = { box: { width: 100, height: 300 } };
    const [splitted, rest] = split(200, node);

    expect(splitted.box).toHaveProperty('width', 100);
    expect(splitted.box).toHaveProperty('height', 200);
    expect(rest.box).toHaveProperty('width', 100);
    expect(rest.box).toHaveProperty('height', 100);
  });

  test('should split if height lower than node and top not zero', () => {
    const node = { box: { width: 100, height: 300 } };
    const [splitted, rest] = split(200, node);

    expect(splitted.box).toHaveProperty('width', 100);
    expect(splitted.box).toHaveProperty('height', 200);
    expect(rest.box).toHaveProperty('width', 100);
    expect(rest.box).toHaveProperty('height', 100);
  });

  test('should split if node is outside height', () => {
    const node = { box: { top: 400, left: 0, width: 100, height: 300 } };
    const [splitted, rest] = split(200, node);

    expect(splitted).toEqual(null);
    expect(rest.box).toHaveProperty('width', 100);
    expect(rest.box).toHaveProperty('height', 300);
    expect(rest.box).toHaveProperty('left', 0);
    expect(rest.box).toHaveProperty('top', 200);
  });

  test('should split children recursively', () => {
    const node = {
      box: { top: 0, left: 0, width: 100, height: 300 },
      children: [{ box: { top: 20, left: 10, width: 80, height: 250 }, children: [
        { box: { top: 5, left: 5, height: 240, width: 35 } },
        { box: { top: 5, left: 40, height: 240, width: 35 } },
      ] }],
    };

    const [splitted, rest] = split(200, node);

    expect(splitted.box).toHaveProperty('width', 100);
    expect(splitted.box).toHaveProperty('height', 200);
    expect(splitted.children).toHaveLength(1);
    expect(splitted.children[0].box).toHaveProperty('top', 20);
    expect(splitted.children[0].box).toHaveProperty('left', 10);
    expect(splitted.children[0].box).toHaveProperty('width', 80);
    expect(splitted.children[0].box).toHaveProperty('height', 180);
    expect(splitted.children[0].children).toHaveLength(2);
    expect(splitted.children[0].children[0].box).toHaveProperty('top', 5);
    expect(splitted.children[0].children[0].box).toHaveProperty('left', 5);
    expect(splitted.children[0].children[0].box).toHaveProperty('width', 35);
    expect(splitted.children[0].children[0].box).toHaveProperty('height', 175);
    expect(splitted.children[0].children[1].box).toHaveProperty('top', 5);
    expect(splitted.children[0].children[1].box).toHaveProperty('left', 40);
    expect(splitted.children[0].children[1].box).toHaveProperty('width', 35);
    expect(splitted.children[0].children[1].box).toHaveProperty('height', 175);

    expect(rest.box).toHaveProperty('width', 100);
    expect(rest.box).toHaveProperty('height', 100);
    expect(rest.children).toHaveLength(1);
    expect(rest.children[0].box).toHaveProperty('top', 0);
    expect(rest.children[0].box).toHaveProperty('left', 10);
    expect(rest.children[0].box).toHaveProperty('width', 80);
    expect(rest.children[0].box).toHaveProperty('height', 70);
    expect(rest.children[0].children).toHaveLength(2);
    expect(rest.children[0].children[0].box).toHaveProperty('top', 0);
    expect(rest.children[0].children[0].box).toHaveProperty('left', 5);
    expect(rest.children[0].children[0].box).toHaveProperty('width', 35);
    expect(rest.children[0].children[0].box).toHaveProperty('height', 65);
    expect(rest.children[0].children[1].box).toHaveProperty('top', 0);
    expect(rest.children[0].children[1].box).toHaveProperty('left', 40);
    expect(rest.children[0].children[1].box).toHaveProperty('width', 35);
    expect(rest.children[0].children[1].box).toHaveProperty('height', 65);
  });
});
