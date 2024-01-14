const Yoga = require('..');

describe('Min max dimensions', () => {
  test('max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setMaxWidth(50);
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(50);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });

  test('max_height', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(10);
    rootChild0.setMaxHeight(50);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(90);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(50);
  });

  test('min_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMinHeight(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(80);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(80);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(80);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(80);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(20);
  });

  test('min_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMinWidth(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(80);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(80);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(20);
    expect(rootChild1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(80);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(20);
    expect(rootChild1.getComputedLayout().height).toBe(100);
  });

  test('justify_content_min_max', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(60);
    rootChild0.setHeight(60);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(20);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(40);
    expect(rootChild0.getComputedLayout().top).toBe(20);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);
  });

  test('align_items_min_max', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setMinWidth(100);
    root.setMaxWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(60);
    rootChild0.setHeight(60);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);
  });

  test('justify_content_overflow_min_max', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMinHeight(100);
    root.setMaxHeight(110);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(50);
    rootChild0.setHeight(50);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setWidth(50);
    rootChild1.setHeight(50);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setWidth(50);
    rootChild2.setHeight(50);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(110);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(-20);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(30);
    expect(rootChild1.getComputedLayout().width).toBe(50);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    expect(rootChild2.getComputedLayout().left).toBe(0);
    expect(rootChild2.getComputedLayout().top).toBe(80);
    expect(rootChild2.getComputedLayout().width).toBe(50);
    expect(rootChild2.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(110);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(-20);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(30);
    expect(rootChild1.getComputedLayout().width).toBe(50);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    expect(rootChild2.getComputedLayout().left).toBe(0);
    expect(rootChild2.getComputedLayout().top).toBe(80);
    expect(rootChild2.getComputedLayout().width).toBe(50);
    expect(rootChild2.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_to_min', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexShrink(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setHeight(50);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_in_at_most_container', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setFlexBasis(0);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(0);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(0);
    expect(rootChild0Child0.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(100);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(0);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(0);
    expect(rootChild0Child0.getComputedLayout().height).toBe(0);
  });

  test('flex_grow_child', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(0);
    rootChild0.setHeight(100);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_max_column', () => {
    const root = Yoga.Node.create();
    root.setMinHeight(100);
    root.setMaxHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setHeight(50);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(0);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(0);
    expect(rootChild1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_within_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    rootChild0.setMaxWidth(100);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setHeight(20);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(20);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(100);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(20);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(20);
  });

  test('flex_grow_within_constrained_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    rootChild0.setMaxWidth(300);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setHeight(20);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(20);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(200);
    expect(rootChild0Child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(20);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(200);
    expect(rootChild0Child0.getComputedLayout().height).toBe(20);
  });

  test('flex_root_ignored', () => {
    const root = Yoga.Node.create();
    root.setFlexGrow(1);
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(200);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setHeight(100);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(200);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(200);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_root_minimized', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMinHeight(100);
    root.setMaxHeight(500);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMinHeight(100);
    rootChild0.setMaxHeight(500);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setFlexBasis(200);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child1 = Yoga.Node.create();
    rootChild0Child1.setHeight(100);
    rootChild0.insertChild(rootChild0Child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(300);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(200);

    expect(rootChild0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child1.getComputedLayout().top).toBe(200);
    expect(rootChild0Child1.getComputedLayout().width).toBe(100);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(300);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(300);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(200);

    expect(rootChild0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child1.getComputedLayout().top).toBe(200);
    expect(rootChild0Child1.getComputedLayout().width).toBe(100);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_height_maximized', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(500);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMinHeight(100);
    rootChild0.setMaxHeight(500);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setFlexBasis(200);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child1 = Yoga.Node.create();
    rootChild0Child1.setHeight(100);
    rootChild0.insertChild(rootChild0Child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(500);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(500);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(400);

    expect(rootChild0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child1.getComputedLayout().top).toBe(400);
    expect(rootChild0Child1.getComputedLayout().width).toBe(100);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(500);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(500);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(400);

    expect(rootChild0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child1.getComputedLayout().top).toBe(400);
    expect(rootChild0Child1.getComputedLayout().width).toBe(100);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setMinWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setWidth(50);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(50);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(50);
    expect(rootChild1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(50);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(50);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(50);
    expect(rootChild1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_min_column', () => {
    const root = Yoga.Node.create();
    root.setMinHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setHeight(50);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(0);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(0);
    expect(rootChild1.getComputedLayout().height).toBe(50);
  });

  test('flex_grow_within_constrained_max_row', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    rootChild0.setMaxWidth(100);
    rootChild0.setHeight(100);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexShrink(1);
    rootChild0Child0.setFlexBasis(100);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child1 = Yoga.Node.create();
    rootChild0Child1.setWidth(50);
    rootChild0.insertChild(rootChild0Child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child1.getComputedLayout().left).toBe(50);
    expect(rootChild0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child1.getComputedLayout().width).toBe(50);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(100);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child0.getComputedLayout().left).toBe(50);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child1.getComputedLayout().width).toBe(50);
    expect(rootChild0Child1.getComputedLayout().height).toBe(100);
  });

  test('flex_grow_within_constrained_max_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setMaxHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexShrink(1);
    rootChild0.setFlexBasis(100);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setHeight(50);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(100);
    expect(rootChild1.getComputedLayout().height).toBe(50);
  });

  test('child_min_max_width_flexing', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(120);
    root.setHeight(50);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(0);
    rootChild0.setMinWidth(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setFlexBasisPercent(50);
    rootChild1.setMaxWidth(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(120);
    expect(root.getComputedLayout().height).toBe(50);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(100);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(20);
    expect(rootChild1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(120);
    expect(root.getComputedLayout().height).toBe(50);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(20);
    expect(rootChild1.getComputedLayout().height).toBe(50);
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

    const rootChild0 = Yoga.Node.create();
    rootChild0.setMinWidthPercent(10);
    rootChild0.setMaxWidthPercent(10);
    rootChild0.setMinHeightPercent(10);
    rootChild0.setMaxHeightPercent(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(90);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });
});
