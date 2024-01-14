const Yoga = require('..');

describe('Size overflow', () => {
  test('nested_overflowing_child', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidth(200);
    rootChild0Child0.setHeight(200);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(200);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(200);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(200);

    expect(rootChild0Child0.getComputedLeft()).toBe(-100);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(200);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);
  });

  test('nested_overflowing_child_in_constraint_parent', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(100);
    rootChild0.setHeight(100);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidth(200);
    rootChild0Child0.setHeight(200);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(200);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild0Child0.getComputedLeft()).toBe(-100);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(200);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);
  });

  test('parent_wrap_child_size_overflowing_parent', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(100);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidth(100);
    rootChild0Child0.setHeight(200);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(200);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(100);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(200);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(0);
    expect(rootChild0Child0.getComputedWidth()).toBe(100);
    expect(rootChild0Child0.getComputedHeight()).toBe(200);
  });
});
