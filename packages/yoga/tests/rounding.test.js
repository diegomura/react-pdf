const Yoga = require('..');

describe('Rounding', () => {
  test('rounding_flex_basis_flex_grow_row_width_of_100', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(33);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(33);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(34);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(67);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(33);
    expect(rootChild2.getComputedHeight()).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(67);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(33);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(33);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(34);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(33);
    expect(rootChild2.getComputedHeight()).toBe(100);
  });

  test('rounding_flex_basis_flex_grow_row_prime_number_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(113);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    root.insertChild(rootChild2, 2);

    const rootChild3 = Yoga.Node.create();
    rootChild3.setFlexGrow(1);
    root.insertChild(rootChild3, 3);

    const rootChild4 = Yoga.Node.create();
    rootChild4.setFlexGrow(1);
    root.insertChild(rootChild4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(113);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(23);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(23);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(22);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(45);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(23);
    expect(rootChild2.getComputedHeight()).toBe(100);

    expect(rootChild3.getComputedLeft()).toBe(68);
    expect(rootChild3.getComputedTop()).toBe(0);
    expect(rootChild3.getComputedWidth()).toBe(22);
    expect(rootChild3.getComputedHeight()).toBe(100);

    expect(rootChild4.getComputedLeft()).toBe(90);
    expect(rootChild4.getComputedTop()).toBe(0);
    expect(rootChild4.getComputedWidth()).toBe(23);
    expect(rootChild4.getComputedHeight()).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(113);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(90);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(23);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(68);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(22);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(45);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(23);
    expect(rootChild2.getComputedHeight()).toBe(100);

    expect(rootChild3.getComputedLeft()).toBe(23);
    expect(rootChild3.getComputedTop()).toBe(0);
    expect(rootChild3.getComputedWidth()).toBe(22);
    expect(rootChild3.getComputedHeight()).toBe(100);

    expect(rootChild4.getComputedLeft()).toBe(0);
    expect(rootChild4.getComputedTop()).toBe(0);
    expect(rootChild4.getComputedWidth()).toBe(23);
    expect(rootChild4.getComputedHeight()).toBe(100);
  });

  test('rounding_flex_basis_flex_shrink_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(101);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexShrink(1);
    rootChild0.setFlexBasis(100);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexBasis(25);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexBasis(25);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(101);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(51);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(51);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(25);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(76);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(25);
    expect(rootChild2.getComputedHeight()).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(101);
    expect(root.getComputedHeight()).toBe(100);

    expect(rootChild0.getComputedLeft()).toBe(50);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(51);
    expect(rootChild0.getComputedHeight()).toBe(100);

    expect(rootChild1.getComputedLeft()).toBe(25);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(25);
    expect(rootChild1.getComputedHeight()).toBe(100);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(25);
    expect(rootChild2.getComputedHeight()).toBe(100);
  });

  test('rounding_flex_basis_overrides_main_size', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(113);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(50);
    rootChild0.setHeight(20);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);
  });

  test('rounding_total_fractial', () => {
    const root = Yoga.Node.create();
    root.setWidth(87.4);
    root.setHeight(113.4);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(0.7);
    rootChild0.setFlexBasis(50.3);
    rootChild0.setHeight(20.3);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1.6);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1.1);
    rootChild2.setHeight(10.7);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(87);
    expect(rootChild0.getComputedHeight()).toBe(59);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(59);
    expect(rootChild1.getComputedWidth()).toBe(87);
    expect(rootChild1.getComputedHeight()).toBe(30);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(87);
    expect(rootChild2.getComputedHeight()).toBe(24);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(87);
    expect(rootChild0.getComputedHeight()).toBe(59);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(59);
    expect(rootChild1.getComputedWidth()).toBe(87);
    expect(rootChild1.getComputedHeight()).toBe(30);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(87);
    expect(rootChild2.getComputedHeight()).toBe(24);
  });

  test('rounding_total_fractial_nested', () => {
    const root = Yoga.Node.create();
    root.setWidth(87.4);
    root.setHeight(113.4);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(0.7);
    rootChild0.setFlexBasis(50.3);
    rootChild0.setHeight(20.3);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexGrow(1);
    rootChild0Child0.setFlexBasis(0.3);
    rootChild0Child0.setPosition(Yoga.EDGE_BOTTOM, 13.3);
    rootChild0Child0.setHeight(9.9);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child1 = Yoga.Node.create();
    rootChild0Child1.setFlexGrow(4);
    rootChild0Child1.setFlexBasis(0.3);
    rootChild0Child1.setPosition(Yoga.EDGE_TOP, 13.3);
    rootChild0Child1.setHeight(1.1);
    rootChild0.insertChild(rootChild0Child1, 1);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1.6);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1.1);
    rootChild2.setHeight(10.7);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(87);
    expect(rootChild0.getComputedHeight()).toBe(59);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(-13);
    expect(rootChild0Child0.getComputedWidth()).toBe(87);
    expect(rootChild0Child0.getComputedHeight()).toBe(12);

    expect(rootChild0Child1.getComputedLeft()).toBe(0);
    expect(rootChild0Child1.getComputedTop()).toBe(25);
    expect(rootChild0Child1.getComputedWidth()).toBe(87);
    expect(rootChild0Child1.getComputedHeight()).toBe(47);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(59);
    expect(rootChild1.getComputedWidth()).toBe(87);
    expect(rootChild1.getComputedHeight()).toBe(30);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(87);
    expect(rootChild2.getComputedHeight()).toBe(24);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(87);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(87);
    expect(rootChild0.getComputedHeight()).toBe(59);

    expect(rootChild0Child0.getComputedLeft()).toBe(0);
    expect(rootChild0Child0.getComputedTop()).toBe(-13);
    expect(rootChild0Child0.getComputedWidth()).toBe(87);
    expect(rootChild0Child0.getComputedHeight()).toBe(12);

    expect(rootChild0Child1.getComputedLeft()).toBe(0);
    expect(rootChild0Child1.getComputedTop()).toBe(25);
    expect(rootChild0Child1.getComputedWidth()).toBe(87);
    expect(rootChild0Child1.getComputedHeight()).toBe(47);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(59);
    expect(rootChild1.getComputedWidth()).toBe(87);
    expect(rootChild1.getComputedHeight()).toBe(30);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(87);
    expect(rootChild2.getComputedHeight()).toBe(24);
  });

  test('rounding_fractial_input_1', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(113.4);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(50);
    rootChild0.setHeight(20);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);
  });

  test('rounding_fractial_input_2', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(113.6);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(50);
    rootChild0.setHeight(20);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(65);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(65);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(24);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(25);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(65);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(65);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(24);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(25);
  });

  test('rounding_fractial_input_3', () => {
    const root = Yoga.Node.create();
    root.setPosition(Yoga.EDGE_TOP, 0.3);
    root.setWidth(100);
    root.setHeight(113.4);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(50);
    rootChild0.setHeight(20);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(65);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(24);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(25);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(114);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(65);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(24);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(25);
  });

  test('rounding_fractial_input_4', () => {
    const root = Yoga.Node.create();
    root.setPosition(Yoga.EDGE_TOP, 0.7);
    root.setWidth(100);
    root.setHeight(113.4);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasis(50);
    rootChild0.setHeight(20);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(1);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(1);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(113);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(100);
    expect(rootChild0.getComputedHeight()).toBe(64);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(64);
    expect(rootChild1.getComputedWidth()).toBe(100);
    expect(rootChild1.getComputedHeight()).toBe(25);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(89);
    expect(rootChild2.getComputedWidth()).toBe(100);
    expect(rootChild2.getComputedHeight()).toBe(24);
  });

  test('rounding_inner_node_controversy_horizontal', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(320);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeight(10);
    root.insertChild(rootChild1, 1);

    const rootChild1Child0 = Yoga.Node.create();
    rootChild1Child0.setFlexGrow(1);
    rootChild1Child0.setHeight(10);
    rootChild1.insertChild(rootChild1Child0, 0);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeight(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(10);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(107);
    expect(rootChild0.getComputedHeight()).toBe(10);

    expect(rootChild1.getComputedLeft()).toBe(107);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(106);
    expect(rootChild1.getComputedHeight()).toBe(10);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(106);
    expect(rootChild1Child0.getComputedHeight()).toBe(10);

    expect(rootChild2.getComputedLeft()).toBe(213);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(107);
    expect(rootChild2.getComputedHeight()).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(320);
    expect(root.getComputedHeight()).toBe(10);

    expect(rootChild0.getComputedLeft()).toBe(213);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(107);
    expect(rootChild0.getComputedHeight()).toBe(10);

    expect(rootChild1.getComputedLeft()).toBe(107);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(106);
    expect(rootChild1.getComputedHeight()).toBe(10);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(106);
    expect(rootChild1Child0.getComputedHeight()).toBe(10);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(107);
    expect(rootChild2.getComputedHeight()).toBe(10);
  });

  test('rounding_inner_node_controversy_vertical', () => {
    const root = Yoga.Node.create();
    root.setHeight(320);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setWidth(10);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setWidth(10);
    root.insertChild(rootChild1, 1);

    const rootChild1Child0 = Yoga.Node.create();
    rootChild1Child0.setFlexGrow(1);
    rootChild1Child0.setWidth(10);
    rootChild1.insertChild(rootChild1Child0, 0);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setWidth(10);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(10);
    expect(root.getComputedHeight()).toBe(320);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(10);
    expect(rootChild0.getComputedHeight()).toBe(107);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(107);
    expect(rootChild1.getComputedWidth()).toBe(10);
    expect(rootChild1.getComputedHeight()).toBe(106);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(10);
    expect(rootChild1Child0.getComputedHeight()).toBe(106);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(213);
    expect(rootChild2.getComputedWidth()).toBe(10);
    expect(rootChild2.getComputedHeight()).toBe(107);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(10);
    expect(root.getComputedHeight()).toBe(320);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(10);
    expect(rootChild0.getComputedHeight()).toBe(107);

    expect(rootChild1.getComputedLeft()).toBe(0);
    expect(rootChild1.getComputedTop()).toBe(107);
    expect(rootChild1.getComputedWidth()).toBe(10);
    expect(rootChild1.getComputedHeight()).toBe(106);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(10);
    expect(rootChild1Child0.getComputedHeight()).toBe(106);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(213);
    expect(rootChild2.getComputedWidth()).toBe(10);
    expect(rootChild2.getComputedHeight()).toBe(107);
  });

  test('rounding_inner_node_controversy_combined', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(640);
    root.setHeight(320);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setHeightPercent(100);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setHeightPercent(100);
    root.insertChild(rootChild1, 1);

    const rootChild1Child0 = Yoga.Node.create();
    rootChild1Child0.setFlexGrow(1);
    rootChild1Child0.setWidthPercent(100);
    rootChild1.insertChild(rootChild1Child0, 0);

    const rootChild1Child1 = Yoga.Node.create();
    rootChild1Child1.setFlexGrow(1);
    rootChild1Child1.setWidthPercent(100);
    rootChild1.insertChild(rootChild1Child1, 1);

    const rootChild1Child1Child0 = Yoga.Node.create();
    rootChild1Child1Child0.setFlexGrow(1);
    rootChild1Child1Child0.setWidthPercent(100);
    rootChild1Child1.insertChild(rootChild1Child1Child0, 0);

    const rootChild1Child2 = Yoga.Node.create();
    rootChild1Child2.setFlexGrow(1);
    rootChild1Child2.setWidthPercent(100);
    rootChild1.insertChild(rootChild1Child2, 2);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setFlexGrow(1);
    rootChild2.setHeightPercent(100);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(640);
    expect(root.getComputedHeight()).toBe(320);

    expect(rootChild0.getComputedLeft()).toBe(0);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(213);
    expect(rootChild0.getComputedHeight()).toBe(320);

    expect(rootChild1.getComputedLeft()).toBe(213);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(214);
    expect(rootChild1.getComputedHeight()).toBe(320);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(214);
    expect(rootChild1Child0.getComputedHeight()).toBe(107);

    expect(rootChild1Child1.getComputedLeft()).toBe(0);
    expect(rootChild1Child1.getComputedTop()).toBe(107);
    expect(rootChild1Child1.getComputedWidth()).toBe(214);
    expect(rootChild1Child1.getComputedHeight()).toBe(106);

    expect(rootChild1Child1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child1Child0.getComputedWidth()).toBe(214);
    expect(rootChild1Child1Child0.getComputedHeight()).toBe(106);

    expect(rootChild1Child2.getComputedLeft()).toBe(0);
    expect(rootChild1Child2.getComputedTop()).toBe(213);
    expect(rootChild1Child2.getComputedWidth()).toBe(214);
    expect(rootChild1Child2.getComputedHeight()).toBe(107);

    expect(rootChild2.getComputedLeft()).toBe(427);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(213);
    expect(rootChild2.getComputedHeight()).toBe(320);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(640);
    expect(root.getComputedHeight()).toBe(320);

    expect(rootChild0.getComputedLeft()).toBe(427);
    expect(rootChild0.getComputedTop()).toBe(0);
    expect(rootChild0.getComputedWidth()).toBe(213);
    expect(rootChild0.getComputedHeight()).toBe(320);

    expect(rootChild1.getComputedLeft()).toBe(213);
    expect(rootChild1.getComputedTop()).toBe(0);
    expect(rootChild1.getComputedWidth()).toBe(214);
    expect(rootChild1.getComputedHeight()).toBe(320);

    expect(rootChild1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child0.getComputedWidth()).toBe(214);
    expect(rootChild1Child0.getComputedHeight()).toBe(107);

    expect(rootChild1Child1.getComputedLeft()).toBe(0);
    expect(rootChild1Child1.getComputedTop()).toBe(107);
    expect(rootChild1Child1.getComputedWidth()).toBe(214);
    expect(rootChild1Child1.getComputedHeight()).toBe(106);

    expect(rootChild1Child1Child0.getComputedLeft()).toBe(0);
    expect(rootChild1Child1Child0.getComputedTop()).toBe(0);
    expect(rootChild1Child1Child0.getComputedWidth()).toBe(214);
    expect(rootChild1Child1Child0.getComputedHeight()).toBe(106);

    expect(rootChild1Child2.getComputedLeft()).toBe(0);
    expect(rootChild1Child2.getComputedTop()).toBe(213);
    expect(rootChild1Child2.getComputedWidth()).toBe(214);
    expect(rootChild1Child2.getComputedHeight()).toBe(107);

    expect(rootChild2.getComputedLeft()).toBe(0);
    expect(rootChild2.getComputedTop()).toBe(0);
    expect(rootChild2.getComputedWidth()).toBe(213);
    expect(rootChild2.getComputedHeight()).toBe(320);
  });
});
