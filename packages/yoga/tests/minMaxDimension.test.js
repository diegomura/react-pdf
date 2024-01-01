const Yoga = require('..');

describe("Min max dimensions", () => {
  test('max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setMaxWidth(50);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(50);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(10);
  });

  test('max_height', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setWidth(10);
    root_child0.setMaxHeight(50);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(90);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(50);
  });

  test('min_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setMinHeight(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(80);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(80);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(80);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(80);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(20);
  });

  test('min_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setMinWidth(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setFlexGrow(1);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(80);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child1.getComputedLayout().left).toBe(80);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(20);
    expect(root_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(20);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(80);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(20);
    expect(root_child1.getComputedLayout().height).toBe(100);
  });

  test('justify_content_min_max', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(200);

    const root_child0 = Yoga.Node.create();
    root_child0.setWidth(60);
    root_child0.setHeight(60);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(20);
    expect(root_child0.getComputedLayout().width).toBe(60);
    expect(root_child0.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(40);
    expect(root_child0.getComputedLayout().top).toBe(20);
    expect(root_child0.getComputedLayout().width).toBe(60);
    expect(root_child0.getComputedLayout().height).toBe(60);
  });

  test('align_items_min_max', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setMinWidth(100);
    root.setMaxWidth(200);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setWidth(60);
    root_child0.setHeight(60);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(20);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(60);
    expect(root_child0.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(20);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(60);
    expect(root_child0.getComputedLayout().height).toBe(60);
  });

  test('justify_content_overflow_min_max', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMinHeight(100);
    root.setMaxHeight(110);

    const root_child0 = Yoga.Node.create();
    root_child0.setWidth(50);
    root_child0.setHeight(50);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setWidth(50);
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);

    const root_child2 = Yoga.Node.create();
    root_child2.setWidth(50);
    root_child2.setHeight(50);
    root.insertChild(root_child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(110);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(-20);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(30);
    expect(root_child1.getComputedLayout().width).toBe(50);
    expect(root_child1.getComputedLayout().height).toBe(50);

    expect(root_child2.getComputedLayout().left).toBe(0);
    expect(root_child2.getComputedLayout().top).toBe(80);
    expect(root_child2.getComputedLayout().width).toBe(50);
    expect(root_child2.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(110);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(-20);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(30);
    expect(root_child1.getComputedLayout().width).toBe(50);
    expect(root_child1.getComputedLayout().height).toBe(50);

    expect(root_child2.getComputedLayout().left).toBe(0);
    expect(root_child2.getComputedLayout().top).toBe(80);
    expect(root_child2.getComputedLayout().width).toBe(50);
    expect(root_child2.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_to_min', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexShrink(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_in_at_most_container', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexGrow(1);
    root_child0_child0.setFlexBasis(0);
    root_child0.insertChild(root_child0_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(0);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(0);
    expect(root_child0_child0.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(100);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(0);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(0);
    expect(root_child0_child0.getComputedLayout().height).toBe(0);
  });

  test('flex_grow_child', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(0);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_max_column', () => {
    const root = Yoga.Node.create();
    root.setMinHeight(100);
    root.setMaxHeight(200);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(0);
    expect(root_child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(0);
    expect(root_child1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_within_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root_child0.setMaxWidth(100);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexGrow(1);
    root_child0_child0.setHeight(20);
    root_child0.insertChild(root_child0_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(20);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(100);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(20);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(20);
  });

  test('flex_grow_within_constrained_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root_child0.setMaxWidth(300);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexGrow(1);
    root_child0_child0.setHeight(20);
    root_child0.insertChild(root_child0_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(200);
    expect(root_child0.getComputedLayout().height).toBe(20);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(200);
    expect(root_child0_child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(200);
    expect(root_child0.getComputedLayout().height).toBe(20);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(200);
    expect(root_child0_child0.getComputedLayout().height).toBe(20);
  });

  test('flex_root_ignored', () => {
    const root = Yoga.Node.create();
    root.setFlexGrow(1);
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(200);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setHeight(100);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(200);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(200);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(200);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(200);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_root_minimized', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setMinHeight(100);
    root_child0.setMaxHeight(500);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexGrow(1);
    root_child0_child0.setFlexBasis(200);
    root_child0.insertChild(root_child0_child0, 0);

    const root_child0_child1 = Yoga.Node.create();
    root_child0_child1.setHeight(100);
    root_child0.insertChild(root_child0_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(300);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(200);

    expect(root_child0_child1.getComputedLayout().left).toBe(0);
    expect(root_child0_child1.getComputedLayout().top).toBe(200);
    expect(root_child0_child1.getComputedLayout().width).toBe(100);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(300);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(200);

    expect(root_child0_child1.getComputedLayout().left).toBe(0);
    expect(root_child0_child1.getComputedLayout().top).toBe(200);
    expect(root_child0_child1.getComputedLayout().width).toBe(100);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_height_maximized', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(500);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setMinHeight(100);
    root_child0.setMaxHeight(500);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexGrow(1);
    root_child0_child0.setFlexBasis(200);
    root_child0.insertChild(root_child0_child0, 0);

    const root_child0_child1 = Yoga.Node.create();
    root_child0_child1.setHeight(100);
    root_child0.insertChild(root_child0_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(500);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(500);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(400);

    expect(root_child0_child1.getComputedLayout().left).toBe(0);
    expect(root_child0_child1.getComputedLayout().top).toBe(400);
    expect(root_child0_child1.getComputedLayout().width).toBe(100);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(500);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(500);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(100);
    expect(root_child0_child0.getComputedLayout().height).toBe(400);

    expect(root_child0_child1.getComputedLayout().left).toBe(0);
    expect(root_child0_child1.getComputedLayout().top).toBe(400);
    expect(root_child0_child1.getComputedLayout().width).toBe(100);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setMinWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setWidth(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child1.getComputedLayout().left).toBe(50);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(50);
    expect(root_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(50);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(50);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(50);
    expect(root_child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_column', () => {
    const root = Yoga.Node.create();
    root.setMinHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(0);
    expect(root_child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(0);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(0);
    expect(root_child1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_within_constrained_max_row', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root_child0.setMaxWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);

    const root_child0_child0 = Yoga.Node.create();
    root_child0_child0.setFlexShrink(1);
    root_child0_child0.setFlexBasis(100);
    root_child0.insertChild(root_child0_child0, 0);

    const root_child0_child1 = Yoga.Node.create();
    root_child0_child1.setWidth(50);
    root_child0.insertChild(root_child0_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child0_child0.getComputedLayout().left).toBe(0);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(50);
    expect(root_child0_child0.getComputedLayout().height).toBe(100);

    expect(root_child0_child1.getComputedLayout().left).toBe(50);
    expect(root_child0_child1.getComputedLayout().top).toBe(0);
    expect(root_child0_child1.getComputedLayout().width).toBe(50);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(100);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(100);

    expect(root_child0_child0.getComputedLayout().left).toBe(50);
    expect(root_child0_child0.getComputedLayout().top).toBe(0);
    expect(root_child0_child0.getComputedLayout().width).toBe(50);
    expect(root_child0_child0.getComputedLayout().height).toBe(100);

    expect(root_child0_child1.getComputedLayout().left).toBe(0);
    expect(root_child0_child1.getComputedLayout().top).toBe(0);
    expect(root_child0_child1.getComputedLayout().width).toBe(50);
    expect(root_child0_child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_max_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMaxHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexShrink(1);
    root_child0.setFlexBasis(100);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setHeight(50);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(50);
    expect(root_child1.getComputedLayout().width).toBe(100);
    expect(root_child1.getComputedLayout().height).toBe(50);
  });

  test('child_min_max_width_flexing', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(120);
    root.setHeight(50);

    const root_child0 = Yoga.Node.create();
    root_child0.setFlexGrow(1);
    root_child0.setFlexBasis(0);
    root_child0.setMinWidth(60);
    root.insertChild(root_child0, 0);

    const root_child1 = Yoga.Node.create();
    root_child1.setFlexGrow(1);
    root_child1.setFlexBasisPercent(50);
    root_child1.setMaxWidth(20);
    root.insertChild(root_child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(120);
    expect(root.getComputedLayout().height).toBe(50);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(100);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(20);
    expect(root_child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(120);
    expect(root.getComputedLayout().height).toBe(50);

    expect(root_child0.getComputedLayout().left).toBe(20);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(50);

    expect(root_child1.getComputedLayout().left).toBe(0);
    expect(root_child1.getComputedLayout().top).toBe(0);
    expect(root_child1.getComputedLayout().width).toBe(20);
    expect(root_child1.getComputedLayout().height).toBe(50);
  });

  test('min_width_overrides_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(50);
    root.setMinWidth(100);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(0);
  });

  test('max_width_overrides_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setMaxWidth(100);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(0);
  });

  test('min_height_overrides_height', () => {
    const root = Yoga.Node.create();
    root.setHeight(50);
    root.setMinHeight(100);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);
  });

  test('max_height_overrides_height', () => {
    const root = Yoga.Node.create();
    root.setHeight(200);
    root.setMaxHeight(100);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);
  });

  test('min_max_percent_no_width_height', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = Yoga.Node.create();
    root_child0.setMinWidthPercent(10);
    root_child0.setMaxWidthPercent(10);
    root_child0.setMinHeightPercent(10);
    root_child0.setMaxHeightPercent(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(90);
    expect(root_child0.getComputedLayout().top).toBe(0);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);
  });
});
