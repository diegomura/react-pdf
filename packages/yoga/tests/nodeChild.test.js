const Yoga = require('../src/dist/entry-browser');

describe('Node child', () => {
  test('reset_layout_when_child_removed', () => {
    const root = Yoga.Node.create();

    const child0 = Yoga.Node.create();
    child0.setWidth(100);
    child0.setHeight(100);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    root.removeChild(child0);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBeFalsy();
    expect(child0.getComputedLayout().height).toBeFalsy();
  });
});
