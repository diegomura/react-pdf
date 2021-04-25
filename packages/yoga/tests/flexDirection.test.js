const Yoga = require('../src/dist/entry-browser');

describe('Flex direction', () => {
  test('flex_direction_column_no_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(30);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(30);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('flex_direction_row_no_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(20);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);
  });

  test('flex_direction_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('flex_direction_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(20);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(90);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(80);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(70);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);
  });

  test('flex_direction_column_reverse', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(90);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(80);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(70);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(90);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(80);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(70);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('flex_direction_row_reverse', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(90);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(80);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(70);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(20);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(100);
  });
});
