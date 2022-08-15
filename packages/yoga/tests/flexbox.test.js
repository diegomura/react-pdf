const Yoga = require('../src/dist/entry-browser');

describe('Flexbox', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = Yoga.Node.createDefault();
    flexboxNode = Yoga.Node.createDefault();
  });

  test('Should have the same flexDirection by default', () => {
    expect(yogaNode.getFlexDirection()).toEqual(flexboxNode.getFlexDirection());
  });

  test('Should have the same justifyContent by default', () => {
    expect(yogaNode.getJustifyContent()).toEqual(
      flexboxNode.getJustifyContent(),
    );
  });

  test('Should have the same alignContent by default', () => {
    expect(yogaNode.getAlignContent()).toEqual(flexboxNode.getAlignContent());
  });

  test('Should have the same alignItems by default', () => {
    expect(yogaNode.getAlignItems()).toEqual(flexboxNode.getAlignItems());
  });

  test('Should have the same alignSelf by default', () => {
    expect(yogaNode.getAlignSelf()).toEqual(flexboxNode.getAlignSelf());
  });

  test('Should have the same flexWrap by default', () => {
    expect(yogaNode.getFlexWrap()).toEqual(flexboxNode.getFlexWrap());
  });

  test('Should have the same display by default', () => {
    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('Should have the same flexGrow by default', () => {
    expect(yogaNode.getFlexGrow()).toEqual(flexboxNode.getFlexGrow());
  });

  test('Should have the same flexShrink by default', () => {
    expect(yogaNode.getFlexShrink()).toEqual(flexboxNode.getFlexShrink());
  });

  test('Should have the same flexBasis by default', () => {
    expect(yogaNode.getFlexBasis()).toEqual(flexboxNode.getFlexBasis());
  });

  test('Should setFlexDirection', () => {
    yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    flexboxNode.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);

    expect(yogaNode.getFlexDirection()).toEqual(flexboxNode.getFlexDirection());
  });

  test('Should setJustifyContent', () => {
    yogaNode.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    flexboxNode.setJustifyContent(Yoga.JUSTIFY_FLEX_END);

    expect(yogaNode.getJustifyContent()).toEqual(
      flexboxNode.getJustifyContent(),
    );
  });

  test('Should setAlignContent', () => {
    yogaNode.setAlignContent(Yoga.ALIGN_CENTER);
    flexboxNode.setAlignContent(Yoga.ALIGN_CENTER);

    expect(yogaNode.getAlignContent()).toEqual(flexboxNode.getAlignContent());
  });

  test('Should setAlignItems', () => {
    yogaNode.setAlignItems(Yoga.ALIGN_CENTER);
    flexboxNode.setAlignItems(Yoga.ALIGN_CENTER);

    expect(yogaNode.getAlignItems()).toEqual(flexboxNode.getAlignItems());
  });

  test('Should setAlignSelf', () => {
    yogaNode.setAlignSelf(Yoga.ALIGN_CENTER);
    flexboxNode.setAlignSelf(Yoga.ALIGN_CENTER);

    expect(yogaNode.getAlignSelf()).toEqual(flexboxNode.getAlignSelf());
  });

  test('Should setFlexWrap', () => {
    yogaNode.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    flexboxNode.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);

    expect(yogaNode.getFlexWrap()).toEqual(flexboxNode.getFlexWrap());
  });

  test('Should setDisplay', () => {
    yogaNode.setDisplay(Yoga.DISPLAY_NONE);
    flexboxNode.setDisplay(Yoga.DISPLAY_NONE);

    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('Should setFlexGrow', () => {
    yogaNode.setFlexGrow(1);
    flexboxNode.setFlexGrow(1);

    expect(yogaNode.getFlexGrow()).toEqual(flexboxNode.getFlexGrow());
  });

  test('Should setFlexShrink', () => {
    yogaNode.setFlexShrink(1);
    flexboxNode.setFlexShrink(1);

    expect(yogaNode.getFlexShrink()).toEqual(flexboxNode.getFlexShrink());
  });

  test('Should setFlexBasis', () => {
    yogaNode.setFlexBasis(1);
    flexboxNode.setFlexBasis(1);

    expect(yogaNode.getFlexBasis()).toEqual(flexboxNode.getFlexBasis());
  });

  test('Should setFlexBasisPercent', () => {
    yogaNode.setFlexBasisPercent(1);
    flexboxNode.setFlexBasisPercent(1);

    expect(yogaNode.getFlexBasis()).toEqual(flexboxNode.getFlexBasis());
  });

  test('Should setFlex', () => {
    yogaNode.setFlex(1);
    flexboxNode.setFlex(1);

    expect(yogaNode.getFlexDirection()).toEqual(flexboxNode.getFlexDirection());
    expect(yogaNode.getFlexWrap()).toEqual(flexboxNode.getFlexWrap());
    expect(yogaNode.getFlexGrow()).toEqual(flexboxNode.getFlexGrow());
    expect(yogaNode.getFlexShrink()).toEqual(flexboxNode.getFlexShrink());
    expect(yogaNode.getFlexBasis()).toEqual(flexboxNode.getFlexBasis());
  });
});
