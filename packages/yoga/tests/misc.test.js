const Yoga = require('../src/dist/entry-browser');

describe('Misc', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = Yoga.Node.createDefault();
    flexboxNode = Yoga.Node.createDefault();
  });

  test('should have same display by default', () => {
    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should have same overflow by default', () => {
    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set display flex', () => {
    yogaNode.setDisplay(Yoga.DISPLAY_FLEX);
    flexboxNode.setDisplay(Yoga.DISPLAY_FLEX);

    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should set display none', () => {
    yogaNode.setDisplay(Yoga.DISPLAY_NONE);
    flexboxNode.setDisplay(Yoga.DISPLAY_NONE);

    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should set overflow visible', () => {
    yogaNode.setOverflow(Yoga.OVERFLOW_VISIBLE);
    flexboxNode.setOverflow(Yoga.OVERFLOW_VISIBLE);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set overflow hidden', () => {
    yogaNode.setOverflow(Yoga.OVERFLOW_HIDDEN);
    flexboxNode.setOverflow(Yoga.OVERFLOW_HIDDEN);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set overflow scroll', () => {
    yogaNode.setOverflow(Yoga.OVERFLOW_SCROLL);
    flexboxNode.setOverflow(Yoga.OVERFLOW_SCROLL);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });
});
