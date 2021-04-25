const Yoga = require('../src/dist/entry-browser');

describe('Infinite height', () => {
  test('percent_absolute_position_infinite_height', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(300);

    const child0 = Yoga.Node.create();
    child0.setWidth(300);
    child0.setHeight(300);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    child1.setPositionPercent(Yoga.EDGE_LEFT, 20);
    child1.setPositionPercent(Yoga.EDGE_TOP, 20);
    child1.setWidthPercent(20);
    child1.setHeightPercent(20);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(300);
    expect(root.getComputedLayout().height).toBe(300);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(300);
    expect(child0.getComputedLayout().height).toBe(300);

    expect(child1.getComputedLayout().left).toBe(60);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(60);
    expect(child1.getComputedLayout().height).toBe(0);
  });
});
