const Yoga = require('../src/dist/entry-browser');

describe('Default values', () => {
  test('assert default values', () => {
    const root = Yoga.Node.create();

    expect(root.getChildCount(root)).toBe(0);
    expect(root.getChild(1)).toBe(null);

    expect(root.getFlexDirection()).toBe(Yoga.FLEX_DIRECTION_COLUMN);
    expect(root.getJustifyContent()).toBe(Yoga.JUSTIFY_FLEX_START);
    expect(root.getAlignContent()).toBe(Yoga.ALIGN_FLEX_START);
    expect(root.getAlignItems()).toBe(Yoga.ALIGN_STRETCH);
    expect(root.getAlignSelf()).toBe(Yoga.ALIGN_AUTO);
    expect(root.getPositionType()).toBe(Yoga.POSITION_TYPE_RELATIVE);
    expect(root.getFlexWrap()).toBe(Yoga.WRAP_NO_WRAP);
    expect(root.getOverflow()).toBe(Yoga.OVERFLOW_VISIBLE);
    expect(root.getFlexGrow()).toBe(0);
    expect(root.getFlexShrink()).toBe(0);
    expect(root.getFlexBasis().unit).toBe(Yoga.UNIT_AUTO);

    expect(root.getPosition(Yoga.EDGE_LEFT).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPosition(Yoga.EDGE_TOP).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPosition(Yoga.EDGE_RIGHT).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPosition(Yoga.EDGE_BOTTOM).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPosition(Yoga.EDGE_START).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPosition(Yoga.EDGE_END).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );

    expect(root.getMargin(Yoga.EDGE_LEFT).unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getMargin(Yoga.EDGE_TOP).unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getMargin(Yoga.EDGE_RIGHT).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getMargin(Yoga.EDGE_BOTTOM).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getMargin(Yoga.EDGE_START).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getMargin(Yoga.EDGE_END).unit).toBe(Yoga.UNIT_UNDEFINED);

    expect(root.getPadding(Yoga.EDGE_LEFT).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPadding(Yoga.EDGE_TOP).unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getPadding(Yoga.EDGE_RIGHT).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPadding(Yoga.EDGE_BOTTOM).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPadding(Yoga.EDGE_START).unit).toBe(
      Yoga.UNIT_UNDEFINED,
    );
    expect(root.getPadding(Yoga.EDGE_END).unit).toBe(Yoga.UNIT_UNDEFINED);

    expect(root.getBorder(Yoga.EDGE_LEFT)).toBeFalsy();
    expect(root.getBorder(Yoga.EDGE_TOP)).toBeFalsy();
    expect(root.getBorder(Yoga.EDGE_RIGHT)).toBeFalsy();
    expect(root.getBorder(Yoga.EDGE_BOTTOM)).toBeFalsy();
    expect(root.getBorder(Yoga.EDGE_START)).toBeFalsy();
    expect(root.getBorder(Yoga.EDGE_END)).toBeFalsy();

    expect(root.getWidth().unit).toBe(Yoga.UNIT_AUTO);
    expect(root.getHeight().unit).toBe(Yoga.UNIT_AUTO);
    expect(root.getMinWidth().unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getMinHeight().unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getMaxWidth().unit).toBe(Yoga.UNIT_UNDEFINED);
    expect(root.getMaxHeight().unit).toBe(Yoga.UNIT_UNDEFINED);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedRight()).toBe(0);
    expect(root.getComputedBottom()).toBe(0);

    expect(root.getComputedMargin(Yoga.EDGE_LEFT)).toBe(0);
    expect(root.getComputedMargin(Yoga.EDGE_TOP)).toBe(0);
    expect(root.getComputedMargin(Yoga.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedMargin(Yoga.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedPadding(Yoga.EDGE_LEFT)).toBe(0);
    expect(root.getComputedPadding(Yoga.EDGE_TOP)).toBe(0);
    expect(root.getComputedPadding(Yoga.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedPadding(Yoga.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedBorder(Yoga.EDGE_LEFT)).toBe(0);
    expect(root.getComputedBorder(Yoga.EDGE_TOP)).toBe(0);
    expect(root.getComputedBorder(Yoga.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedBorder(Yoga.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedWidth()).toBeFalsy();
    expect(root.getComputedHeight()).toBeFalsy();
  });
});
