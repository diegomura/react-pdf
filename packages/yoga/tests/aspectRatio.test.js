const Yoga = require('..');

describe('Aspect ratio', () => {
  const measure = (node, width, widthMode, height, heightMode) => {
    return {
        width: widthMode === Yoga.MEASURE_MODE_EXACTLY ? width : 50,
        height: heightMode === Yoga.MEASURE_MODE_EXACTLY ? height : 50,
    };
  };

  test('aspect_ratio_cross_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setAspectRatio(1);

    root.insertChild(child1, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_main_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_both_dimensions_defined_row', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(100);
    child1.setHeight(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_both_dimensions_defined_column', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(100);
    child1.setHeight(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_align_stretch', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_flex_grow', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_flex_shrink', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(150);
    child1.setFlexShrink(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_flex_shrink_2', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeightPercent(100);
    child1.setFlexShrink(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setHeightPercent(100);
    child2.setFlexShrink(1);
    child2.setAspectRatio(1);
    root.insertChild(child2, 1);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_basis', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setFlexBasis(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_absolute_layout_width_defined', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    child1.setPosition(Yoga.EDGE_LEFT, 0);
    child1.setPosition(Yoga.EDGE_TOP, 0);
    child1.setWidth(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_absolute_layout_height_defined', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    child1.setPosition(Yoga.EDGE_LEFT, 0);
    child1.setPosition(Yoga.EDGE_TOP, 0);
    child1.setHeight(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_with_max_cross_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setMaxWidth(40);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_with_max_main_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setMaxHeight(40);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);
  });

  test('aspect_ratio_with_min_cross_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(30);
    child1.setMinWidth(40);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(30);
  });

  test('aspect_ratio_with_min_main_defined', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setMinHeight(40);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);
  });

  test('aspect_ratio_double_cross', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setAspectRatio(2);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_half_cross', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(100);
    child1.setAspectRatio(0.5);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_double_main', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setAspectRatio(0.5);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_half_main', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(100);
    child1.setAspectRatio(2);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_with_measure_func', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setMeasureFunc(measure);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_width_height_flex_grow_row', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(200);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(200);
  });

  test('aspect_ratio_width_height_flex_grow_column', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(200);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_height_as_flex_basis', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(200);
    root.setHeight(200);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setHeight(100);
    child2.setFlexGrow(1);
    child2.setAspectRatio(1);
    root.insertChild(child2, 1);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(75);
    expect(child1.getComputedLayout().height).toBe(75);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(75);
    expect(child2.getComputedLayout().width).toBe(125);
    expect(child2.getComputedLayout().height).toBe(125);
  });

  test('aspect_ratio_width_as_flex_basis', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(200);
    root.setHeight(200);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(100);
    child2.setFlexGrow(1);
    child2.setAspectRatio(1);
    root.insertChild(child2, 1);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(75);
    expect(child1.getComputedLayout().height).toBe(75);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(75);
    expect(child2.getComputedLayout().width).toBe(125);
    expect(child2.getComputedLayout().height).toBe(125);
  });

  test('aspect_ratio_overrides_flex_grow_row', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(0.5);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_overrides_flex_grow_column', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setFlexGrow(1);
    child1.setAspectRatio(2);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('aspect_ratio_left_right_absolute', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    child1.setPosition(Yoga.EDGE_LEFT, 10);
    child1.setPosition(Yoga.EDGE_TOP, 10);
    child1.setPosition(Yoga.EDGE_RIGHT, 10);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(80);
    expect(child1.getComputedLayout().height).toBe(80);
  });

  test('aspect_ratio_top_bottom_absolute', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    child1.setPosition(Yoga.EDGE_LEFT, 10);
    child1.setPosition(Yoga.EDGE_TOP, 10);
    child1.setPosition(Yoga.EDGE_BOTTOM, 10);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(80);
    expect(child1.getComputedLayout().height).toBe(80);
  });

  test('aspect_ratio_width_overrides_align_stretch_row', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_height_overrides_align_stretch_column', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setAspectRatio(1);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_allow_child_overflow_parent_size', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setAspectRatio(4);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_defined_main_with_margin', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(50);
    child1.setAspectRatio(1);
    child1.setMargin(Yoga.EDGE_LEFT, 10);
    child1.setMargin(Yoga.EDGE_RIGHT, 10);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('aspect_ratio_defined_cross_with_margin', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setAspectRatio(1);
    child1.setMargin(Yoga.EDGE_LEFT, 10);
    child1.setMargin(Yoga.EDGE_RIGHT, 10);
    root.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });
});
