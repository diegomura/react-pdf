import Base from '../src/elements/Base';
import root from './utils/dummyRoot';

let dummyRoot;

describe('Base', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should apply default props', () => {
    const base = new Base(dummyRoot, {});

    expect(base.props.minPresenceAhead).toBe(0);
  });

  test('Should apply default style', () => {
    const base = new Base(dummyRoot, {});

    expect(base.props.style.borderTopLeftRadius).toBe(0);
    expect(base.props.style.borderTopRightRadius).toBe(0);
    expect(base.props.style.borderBottomRightRadius).toBe(0);
    expect(base.props.style.borderBottomLeftRadius).toBe(0);
  });

  test('Should append child correctly', () => {
    const base = new Base(dummyRoot, { parent: true });
    const child = new Base(dummyRoot, { child: true });

    base.appendChild(child);

    expect(base.children).toHaveLength(1);
    expect(base.children[0]).toBe(child);
    expect(base.layout.getChildCount()).toBe(1);
    expect(child.parent).toBe(base);
    expect(child.layout.getParent()).toBeTruthy();
  });

  test('Should remove child correctly', () => {
    const base = new Base(dummyRoot, { parent: true });
    const child1 = new Base(dummyRoot, { child: true });
    const child2 = new Base(dummyRoot, { child: true });

    base.appendChild(child1);
    base.appendChild(child2);
    base.removeChild(child1);

    expect(base.children).toHaveLength(1);
    expect(base.children[0]).toBe(child2);
    expect(base.layout.getChildCount()).toBe(1);
    expect(child1.parent).toBe(null);
    expect(child1.layout.getParent()).toBe(null);
    expect(child2.parent).toBe(base);
    expect(child2.layout.getParent()).toBeTruthy();
  });

  test('Should wrap be true if is in props', () => {
    const base = new Base(dummyRoot, { wrap: true });

    expect(base.wrap).toBeTruthy();
  });

  test('Should wrap be false if not in props', () => {
    const base = new Base(dummyRoot, { wrap: false });

    expect(base.wrap).toBeFalsy();
  });

  test('Should fixed be true if is in props', () => {
    const base = new Base(dummyRoot, { fixed: true });

    expect(base.fixed).toBeTruthy();
  });

  test('Should fixed be false if not in props', () => {
    const base = new Base(dummyRoot, { fixed: false });

    expect(base.fixed).toBeFalsy();
  });

  test('Should absolute be true if position absolute', () => {
    const base = new Base(dummyRoot, { style: { position: 'absolute' } });

    expect(base.absolute).toBeTruthy();
  });

  test('Should absolute be false if position not absolute', () => {
    const base = new Base(dummyRoot, { style: { position: 'relative' } });

    expect(base.absolute).toBeFalsy();
  });

  test('Should render sharp background correctly', async () => {
    const base = new Base(dummyRoot, { style: { backgroundColor: 'tomato' } });

    // Simulate base element as part of document.
    // This is needed for media query calculation, which is outside this test scope.
    base.parent = {};
    base.parent.page = {
      size: { width: 600, height: 800 },
      orientation: 'portrait',
    };
    base.applyProps();

    // Simulate layout
    base.top = 50;
    base.left = 100;
    base.width = 500;
    base.height = 300;

    base.drawBackgroundColor();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.roundedRect.mock.calls[0]).toEqual([
      100,
      50,
      500,
      300,
      0,
    ]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });

  test('Should render rounded background correctly', async () => {
    const base = new Base(dummyRoot, {
      style: { backgroundColor: 'tomato', borderRadius: 5 },
    });

    // Simulate base element as part of document.
    // This is needed for media query calculation, which is outside this test scope.
    base.parent = {};
    base.parent.page = {
      size: { width: 600, height: 800 },
      orientation: 'portrait',
    };
    base.applyProps();

    // Simulate layout
    base.top = 50;
    base.left = 100;
    base.width = 500;
    base.height = 300;

    base.drawBackgroundColor();

    expect(dummyRoot.instance.fillColor.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.roundedRect.mock.calls[0]).toEqual([
      100,
      50,
      500,
      300,
      5,
    ]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });

  test('Clone should be different instance', () => {
    const base = new Base(dummyRoot, {});

    expect(base.clone()).not.toEqual(base);
  });

  test('Clone should be of same class', () => {
    const base = new Base(dummyRoot, {});

    expect(base.clone().constructor.name).toEqual(base.constructor.name);
  });

  test('Clone should have same props', () => {
    const props = { someProp: 1, style: { someStyle: 2 } };
    const base = new Base(dummyRoot, props);
    const clone = base.clone();

    expect(clone.props).toEqual(base.props);
    expect(clone.props).not.toBe(base.props);
  });

  test('Clone should have different layout instance', () => {
    const base = new Base(dummyRoot, {});
    const clone = base.clone();

    expect(base.layout).toEqual(clone.layout);
  });

  test('Clone should have same dimensions', () => {
    const base = new Base(dummyRoot, {});

    base.width = 300;
    base.height = 700;

    const clone = base.clone();

    expect(base.width).toEqual(clone.width);
    expect(base.height).toEqual(clone.height);
  });

  test('Clone should have same position', () => {
    const base = new Base(dummyRoot, {});

    base.top = 300;
    base.left = 700;

    const clone = base.clone();

    expect(base.top).toEqual(clone.top);
    expect(base.left).toEqual(clone.left);
  });

  test('Clone should have same paddings', () => {
    const base = new Base(dummyRoot, {});

    base.padding = { top: 0, left: 10, right: 20, bottom: 30 };

    const clone = base.clone();

    expect(base.padding).toEqual(clone.padding);
    expect(base.padding).not.toBe(clone.padding);
  });

  test('Clone should have same margins', () => {
    const base = new Base(dummyRoot, {});

    base.margin = { top: 0, left: 10, right: 20, bottom: 30 };

    const clone = base.clone();

    expect(base.margin).toEqual(clone.margin);
    expect(base.margin).not.toBe(clone.margin);
  });

  test('Clone should also clone children', () => {
    const base = new Base(dummyRoot, { parent: true });
    const child = new Base(dummyRoot, { child: true });
    const subchild = new Base(dummyRoot, { subchild: true });

    base.appendChild(child);
    child.appendChild(subchild);

    const clone = base.clone();

    expect(clone.children).toHaveLength(1);
    expect(clone.children[0].parent).toBe(clone);
    expect(clone.children[0].children).toHaveLength(1);
    expect(clone.children[0].children[0].parent).toBe(clone.children[0]);
  });
});
