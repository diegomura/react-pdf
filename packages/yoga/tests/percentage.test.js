const Yoga = require('..');

describe('Percentage', () => {
  test('percentage_width_height', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidthPercent(30);
    rootChild0.setHeightPercent(30);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(140);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(60);
  });

  test('percentage_position_left_top', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(400);
    root.setHeight(400);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setPositionPercent(Yoga.EDGE_LEFT, 10);
    rootChild0.setPositionPercent(Yoga.EDGE_TOP, 20);
    rootChild0.setWidthPercent(45);
    rootChild0.setHeightPercent(55);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(400);
    expect(root.getComputedLayout().height).toBe(400);

    expect(rootChild0.getComputedLayout().left).toBe(40);
    expect(rootChild0.getComputedLayout().top).toBe(80);
    expect(rootChild0.getComputedLayout().width).toBe(180);
    expect(rootChild0.getComputedLayout().height).toBe(220);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(400);
    expect(root.getComputedLayout().height).toBe(400);

    expect(rootChild0.getComputedLayout().left).toBe(260);
    expect(rootChild0.getComputedLayout().top).toBe(80);
    expect(rootChild0.getComputedLayout().width).toBe(180);
    expect(rootChild0.getComputedLayout().height).toBe(220);
  });

  test('percentage_position_bottom_right', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(500);
    root.setHeight(500);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setPositionPercent(Yoga.EDGE_RIGHT, 20);
    rootChild0.setPositionPercent(Yoga.EDGE_BOTTOM, 10);
    rootChild0.setWidthPercent(55);
    rootChild0.setHeightPercent(15);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(rootChild0.getComputedLayout().left).toBe(-100);
    expect(rootChild0.getComputedLayout().top).toBe(-50);
    expect(rootChild0.getComputedLayout().width).toBe(275);
    expect(rootChild0.getComputedLayout().height).toBe(75);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(rootChild0.getComputedLayout().left).toBe(125);
    expect(rootChild0.getComputedLayout().top).toBe(-50);
    expect(rootChild0.getComputedLayout().width).toBe(275);
    expect(rootChild0.getComputedLayout().height).toBe(75);
  });

  test('percentage_flex_basis', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(50);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setFlexBasisPercent(25);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(125);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(125);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(75);
    expect(rootChild1.getComputedLayout().height).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(75);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(125);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(75);
    expect(rootChild1.getComputedLayout().height).toBe(200);
  });

  test('percentage_flex_basis_cross', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(50);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    rootChild1.setFlexBasisPercent(25);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(125);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(125);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(75);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(125);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(125);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(75);
  });

  test('percentage_flex_basis_cross_min_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMinHeightPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(2);
    rootChild1.setMinHeightPercent(10);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(140);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(140);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(60);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(140);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(140);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(60);
  });

  test('percentage_flex_basis_main_max_height', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(10);
    rootChild0.setMaxHeightPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(10);
    rootChild1.setMaxHeightPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(52);
    expect(rootChild0.getComputedLayout().height).toBe(120);

    expect(rootChild1.getComputedLayout().left).toBe(52);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(148);
    expect(rootChild1.getComputedLayout().height).toBe(40);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(148);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(52);
    expect(rootChild0.getComputedLayout().height).toBe(120);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(148);
    expect(rootChild1.getComputedLayout().height).toBe(40);
  });

  test('percentage_flex_basis_cross_max_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(10);
    rootChild0.setMaxHeightPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(10);
    rootChild1.setMaxHeightPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(120);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(120);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(40);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(120);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(120);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(40);
  });

  test('percentage_flex_basis_main_max_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(15);
    rootChild0.setMaxWidthPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(10);
    rootChild1.setMaxWidthPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(120);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(40);
    expect(rootChild1.getComputedLayout().height).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(80);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(40);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(40);
    expect(rootChild1.getComputedLayout().height).toBe(200);
  });

  test('percentage_flex_basis_cross_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(10);
    rootChild0.setMaxWidthPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(15);
    rootChild1.setMaxWidthPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(40);
    expect(rootChild1.getComputedLayout().height).toBe(150);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(80);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(160);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(40);
    expect(rootChild1.getComputedLayout().height).toBe(150);
  });

  test('percentage_flex_basis_main_min_width', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(15);
    rootChild0.setMinWidthPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(10);
    rootChild1.setMinWidthPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(120);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(80);
    expect(rootChild1.getComputedLayout().height).toBe(200);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(80);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(120);
    expect(rootChild0.getComputedLayout().height).toBe(200);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(80);
    expect(rootChild1.getComputedLayout().height).toBe(200);
  });

  test('percentage_flex_basis_cross_min_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(10);
    rootChild0.setMinWidthPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(15);
    rootChild1.setMinWidthPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(150);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(50);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(150);
  });

  test('percentage_multiple_nested_with_padding_margin_and_percentage_values', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setFlexBasisPercent(10);
    rootChild0.setMargin(Yoga.EDGE_LEFT, 5);
    rootChild0.setMargin(Yoga.EDGE_TOP, 5);
    rootChild0.setMargin(Yoga.EDGE_RIGHT, 5);
    rootChild0.setMargin(Yoga.EDGE_BOTTOM, 5);
    rootChild0.setPadding(Yoga.EDGE_LEFT, 3);
    rootChild0.setPadding(Yoga.EDGE_TOP, 3);
    rootChild0.setPadding(Yoga.EDGE_RIGHT, 3);
    rootChild0.setPadding(Yoga.EDGE_BOTTOM, 3);
    rootChild0.setMinWidthPercent(60);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setMargin(Yoga.EDGE_LEFT, 5);
    rootChild0Child0.setMargin(Yoga.EDGE_TOP, 5);
    rootChild0Child0.setMargin(Yoga.EDGE_RIGHT, 5);
    rootChild0Child0.setMargin(Yoga.EDGE_BOTTOM, 5);
    rootChild0Child0.setPaddingPercent(Yoga.EDGE_LEFT, 3);
    rootChild0Child0.setPaddingPercent(Yoga.EDGE_TOP, 3);
    rootChild0Child0.setPaddingPercent(Yoga.EDGE_RIGHT, 3);
    rootChild0Child0.setPaddingPercent(Yoga.EDGE_BOTTOM, 3);
    rootChild0Child0.setWidthPercent(50);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child0Child0 = Yoga.Node.create();
    rootChild0Child0Child0.setMarginPercent(Yoga.EDGE_LEFT, 5);
    rootChild0Child0Child0.setMarginPercent(Yoga.EDGE_TOP, 5);
    rootChild0Child0Child0.setMarginPercent(Yoga.EDGE_RIGHT, 5);
    rootChild0Child0Child0.setMarginPercent(Yoga.EDGE_BOTTOM, 5);
    rootChild0Child0Child0.setPadding(Yoga.EDGE_LEFT, 3);
    rootChild0Child0Child0.setPadding(Yoga.EDGE_TOP, 3);
    rootChild0Child0Child0.setPadding(Yoga.EDGE_RIGHT, 3);
    rootChild0Child0Child0.setPadding(Yoga.EDGE_BOTTOM, 3);
    rootChild0Child0Child0.setWidthPercent(45);
    rootChild0Child0.insertChild(rootChild0Child0Child0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(4);
    rootChild1.setFlexBasisPercent(15);
    rootChild1.setMinWidthPercent(20);
    root.insertChild(rootChild1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(5);
    expect(rootChild0.getComputedLayout().top).toBe(5);
    expect(rootChild0.getComputedLayout().width).toBe(190);
    expect(rootChild0.getComputedLayout().height).toBe(48);

    expect(rootChild0Child0.getComputedLayout().left).toBe(8);
    expect(rootChild0Child0.getComputedLayout().top).toBe(8);
    expect(rootChild0Child0.getComputedLayout().width).toBe(92);
    expect(rootChild0Child0.getComputedLayout().height).toBe(25);

    expect(rootChild0Child0Child0.getComputedLayout().left).toBe(10);
    expect(rootChild0Child0Child0.getComputedLayout().top).toBe(10);
    expect(rootChild0Child0Child0.getComputedLayout().width).toBe(36);
    expect(rootChild0Child0Child0.getComputedLayout().height).toBe(6);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(58);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(142);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(5);
    expect(rootChild0.getComputedLayout().top).toBe(5);
    expect(rootChild0.getComputedLayout().width).toBe(190);
    expect(rootChild0.getComputedLayout().height).toBe(48);

    expect(rootChild0Child0.getComputedLayout().left).toBe(90);
    expect(rootChild0Child0.getComputedLayout().top).toBe(8);
    expect(rootChild0Child0.getComputedLayout().width).toBe(92);
    expect(rootChild0Child0.getComputedLayout().height).toBe(25);

    expect(rootChild0Child0Child0.getComputedLayout().left).toBe(46);
    expect(rootChild0Child0Child0.getComputedLayout().top).toBe(10);
    expect(rootChild0Child0Child0.getComputedLayout().width).toBe(36);
    expect(rootChild0Child0Child0.getComputedLayout().height).toBe(6);

    expect(rootChild1.getComputedLayout().left).toBe(0);
    expect(rootChild1.getComputedLayout().top).toBe(58);
    expect(rootChild1.getComputedLayout().width).toBe(200);
    expect(rootChild1.getComputedLayout().height).toBe(142);
  });

  test('percentage_margin_should_calculate_based_only_on_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setMarginPercent(Yoga.EDGE_LEFT, 10);
    rootChild0.setMarginPercent(Yoga.EDGE_TOP, 10);
    rootChild0.setMarginPercent(Yoga.EDGE_RIGHT, 10);
    rootChild0.setMarginPercent(Yoga.EDGE_BOTTOM, 10);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidth(10);
    rootChild0Child0.setHeight(10);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(20);
    expect(rootChild0.getComputedLayout().width).toBe(160);
    expect(rootChild0.getComputedLayout().height).toBe(60);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(10);
    expect(rootChild0Child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(20);
    expect(rootChild0.getComputedLayout().top).toBe(20);
    expect(rootChild0.getComputedLayout().width).toBe(160);
    expect(rootChild0.getComputedLayout().height).toBe(60);

    expect(rootChild0Child0.getComputedLayout().left).toBe(150);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(10);
    expect(rootChild0Child0.getComputedLayout().height).toBe(10);
  });

  test('percentage_padding_should_calculate_based_only_on_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexGrow(1);
    rootChild0.setPaddingPercent(Yoga.EDGE_LEFT, 10);
    rootChild0.setPaddingPercent(Yoga.EDGE_TOP, 10);
    rootChild0.setPaddingPercent(Yoga.EDGE_RIGHT, 10);
    rootChild0.setPaddingPercent(Yoga.EDGE_BOTTOM, 10);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidth(10);
    rootChild0Child0.setHeight(10);
    rootChild0.insertChild(rootChild0Child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child0.getComputedLayout().left).toBe(20);
    expect(rootChild0Child0.getComputedLayout().top).toBe(20);
    expect(rootChild0Child0.getComputedLayout().width).toBe(10);
    expect(rootChild0Child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(200);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild0Child0.getComputedLayout().left).toBe(170);
    expect(rootChild0Child0.getComputedLayout().top).toBe(20);
    expect(rootChild0Child0.getComputedLayout().width).toBe(10);
    expect(rootChild0Child0.getComputedLayout().height).toBe(10);
  });

  test('percentage_absolute_position', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    rootChild0.setPositionPercent(Yoga.EDGE_LEFT, 30);
    rootChild0.setPositionPercent(Yoga.EDGE_TOP, 10);
    rootChild0.setWidth(10);
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(60);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(60);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });

  test('percentage_width_height_undefined_parent_size', () => {
    const root = Yoga.Node.create();

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidthPercent(50);
    rootChild0.setHeightPercent(50);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(0);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(0);
    expect(root.getComputedLayout().height).toBe(0);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(0);
    expect(rootChild0.getComputedLayout().height).toBe(0);
  });

  test('percent_within_flex_grow', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(350);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setWidth(100);
    root.insertChild(rootChild0, 0);

    const rootChild1 = Yoga.Node.create();
    rootChild1.setFlexGrow(1);
    root.insertChild(rootChild1, 1);

    const rootChild1Child0 = Yoga.Node.create();
    rootChild1Child0.setWidthPercent(100);
    rootChild1.insertChild(rootChild1Child0, 0);

    const rootChild2 = Yoga.Node.create();
    rootChild2.setWidth(100);
    root.insertChild(rootChild2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(350);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(100);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(150);
    expect(rootChild1.getComputedLayout().height).toBe(100);

    expect(rootChild1Child0.getComputedLayout().left).toBe(0);
    expect(rootChild1Child0.getComputedLayout().top).toBe(0);
    expect(rootChild1Child0.getComputedLayout().width).toBe(150);
    expect(rootChild1Child0.getComputedLayout().height).toBe(0);

    expect(rootChild2.getComputedLayout().left).toBe(250);
    expect(rootChild2.getComputedLayout().top).toBe(0);
    expect(rootChild2.getComputedLayout().width).toBe(100);
    expect(rootChild2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(350);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(250);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    expect(rootChild1.getComputedLayout().left).toBe(100);
    expect(rootChild1.getComputedLayout().top).toBe(0);
    expect(rootChild1.getComputedLayout().width).toBe(150);
    expect(rootChild1.getComputedLayout().height).toBe(100);

    expect(rootChild1Child0.getComputedLayout().left).toBe(0);
    expect(rootChild1Child0.getComputedLayout().top).toBe(0);
    expect(rootChild1Child0.getComputedLayout().width).toBe(150);
    expect(rootChild1Child0.getComputedLayout().height).toBe(0);

    expect(rootChild2.getComputedLayout().left).toBe(0);
    expect(rootChild2.getComputedLayout().top).toBe(0);
    expect(rootChild2.getComputedLayout().width).toBe(100);
    expect(rootChild2.getComputedLayout().height).toBe(100);
  });

  test('percentage_container_in_wrapping_container', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create();
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    rootChild0Child0.setJustifyContent(Yoga.JUSTIFY_CENTER);
    rootChild0Child0.setWidthPercent(100);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child0Child0 = Yoga.Node.create();
    rootChild0Child0Child0.setWidth(50);
    rootChild0Child0Child0.setHeight(50);
    rootChild0Child0.insertChild(rootChild0Child0Child0, 0);

    const rootChild0Child0Child1 = Yoga.Node.create();
    rootChild0Child0Child1.setWidth(50);
    rootChild0Child0Child1.setHeight(50);
    rootChild0Child0.insertChild(rootChild0Child0Child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(50);
    expect(rootChild0.getComputedLayout().top).toBe(75);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0Child0.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0Child1.getComputedLayout().left).toBe(50);
    expect(rootChild0Child0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0Child1.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0Child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(50);
    expect(rootChild0.getComputedLayout().top).toBe(75);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(100);
    expect(rootChild0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0Child0.getComputedLayout().left).toBe(50);
    expect(rootChild0Child0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0Child0.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0Child1.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0Child1.getComputedLayout().width).toBe(50);
    expect(rootChild0Child0Child1.getComputedLayout().height).toBe(50);
  });

  test('percent_absolute_position', () => {
    const root = Yoga.Node.create();
    root.setWidth(60);
    root.setHeight(50);

    const rootChild0 = Yoga.Node.create();
    rootChild0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    rootChild0.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    rootChild0.setPositionPercent(Yoga.EDGE_LEFT, 50);
    rootChild0.setWidthPercent(100);
    rootChild0.setHeight(50);
    root.insertChild(rootChild0, 0);

    const rootChild0Child0 = Yoga.Node.create();
    rootChild0Child0.setWidthPercent(100);
    rootChild0.insertChild(rootChild0Child0, 0);

    const rootChild0Child1 = Yoga.Node.create();
    rootChild0Child1.setWidthPercent(100);
    rootChild0.insertChild(rootChild0Child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(60);
    expect(root.getComputedLayout().height).toBe(50);

    expect(rootChild0.getComputedLayout().left).toBe(30);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(60);
    expect(rootChild0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child1.getComputedLayout().left).toBe(60);
    expect(rootChild0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child1.getComputedLayout().width).toBe(60);
    expect(rootChild0Child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(60);
    expect(root.getComputedLayout().height).toBe(50);

    expect(rootChild0.getComputedLayout().left).toBe(30);
    expect(rootChild0.getComputedLayout().top).toBe(0);
    expect(rootChild0.getComputedLayout().width).toBe(60);
    expect(rootChild0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child0.getComputedLayout().left).toBe(0);
    expect(rootChild0Child0.getComputedLayout().top).toBe(0);
    expect(rootChild0Child0.getComputedLayout().width).toBe(60);
    expect(rootChild0Child0.getComputedLayout().height).toBe(50);

    expect(rootChild0Child1.getComputedLayout().left).toBe(-60);
    expect(rootChild0Child1.getComputedLayout().top).toBe(0);
    expect(rootChild0Child1.getComputedLayout().width).toBe(60);
    expect(rootChild0Child1.getComputedLayout().height).toBe(50);
  });
});
