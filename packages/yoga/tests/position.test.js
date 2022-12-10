const Yoga = require('..');

describe('Position', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = Yoga.Node.createDefault();
    flexboxNode = Yoga.Node.createDefault();
  });

  test('should have same top position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_TOP),
    );
  });

  test('should have same left position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_LEFT),
    );
  });

  test('should have same bottom position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_BOTTOM),
    );
  });

  test('should have same right position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_RIGHT),
    );
  });

  test('should have same vertical position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should have same start position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_START),
    );
  });

  test('should have same end position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_END),
    );
  });

  test('should have same all position by default', () => {
    expect(yogaNode.getPosition(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_ALL),
    );
  });

  test('should set top position', () => {
    yogaNode.setPosition(Yoga.EDGE_TOP, 5);
    flexboxNode.setPosition(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_TOP),
    );
  });

  test('should set left position', () => {
    yogaNode.setPosition(Yoga.EDGE_LEFT, 5);
    flexboxNode.setPosition(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom position', () => {
    yogaNode.setPosition(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPosition(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right position', () => {
    yogaNode.setPosition(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setPosition(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical position', () => {
    yogaNode.setPosition(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPosition(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal position', () => {
    yogaNode.setPosition(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPosition(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start position', () => {
    yogaNode.setPosition(Yoga.EDGE_START, 5);
    flexboxNode.setPosition(Yoga.EDGE_START, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_START),
    );
  });

  test('should set end position', () => {
    yogaNode.setPosition(Yoga.EDGE_END, 5);
    flexboxNode.setPosition(Yoga.EDGE_END, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_END),
    );
  });

  test('should set all position', () => {
    yogaNode.setPosition(Yoga.EDGE_ALL, 5);
    flexboxNode.setPosition(Yoga.EDGE_ALL, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_ALL),
    );
  });

  test('should set top percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_TOP, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_TOP),
    );
  });

  test('should set left percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_LEFT, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_START, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_START, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_START),
    );
  });

  test('should set end percent position', () => {
    yogaNode.setPositionPercent(Yoga.EDGE_END, 5);
    flexboxNode.setPositionPercent(Yoga.EDGE_END, 5);

    expect(yogaNode.getPosition(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(Yoga.EDGE_END),
    );
  });

  test('should set position type relative', () => {
    yogaNode.setPositionType(Yoga.POSITION_TYPE_RELATIVE);
    flexboxNode.setPositionType(Yoga.POSITION_TYPE_RELATIVE);

    expect(yogaNode.getPositionType()).toEqual(flexboxNode.getPositionType());
  });

  test('should set position type absolute', () => {
    yogaNode.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    flexboxNode.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);

    expect(yogaNode.getPositionType()).toEqual(flexboxNode.getPositionType());
  });
});
