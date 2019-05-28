import transformStyles from '../../src/stylesheet/transformStyles';

describe('shorthands', () => {
  test('should process margin shorthands', () => {
    const top = transformStyles({ marginTop: '1 2 3 4' });
    const right = transformStyles({ marginRight: '1 2 3 4' });
    const bottom = transformStyles({ marginBottom: '1 2 3 4' });
    const left = transformStyles({ marginLeft: '1 2 3 4' });

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(3);
    expect(left.marginLeft).toBe(4);
  });

  test('should process margin shorthand with percentages', () => {
    const top = transformStyles({ marginTop: '1% 2% 3% 4%' });
    const right = transformStyles({ marginRight: '1% 2% 3% 4%' });
    const bottom = transformStyles({ marginBottom: '1% 2% 3% 4%' });
    const left = transformStyles({ marginLeft: '1% 2% 3% 4%' });

    expect(top.marginTop).toBe('1%');
    expect(right.marginRight).toBe('2%');
    expect(bottom.marginBottom).toBe('3%');
    expect(left.marginLeft).toBe('4%');
  });

  test('should process margin axis shorthand', () => {
    const top = transformStyles({ marginTop: '1 2' });
    const right = transformStyles({ marginRight: '1 2' });
    const bottom = transformStyles({ marginBottom: '1 2' });
    const left = transformStyles({ marginLeft: '1 2' });

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(1);
    expect(left.marginLeft).toBe(2);
  });

  test('should process padding shorthand', () => {
    const top = transformStyles({ paddingTop: '1 2 3 4' });
    const right = transformStyles({ paddingRight: '1 2 3 4' });
    const bottom = transformStyles({ paddingBottom: '1 2 3 4' });
    const left = transformStyles({ paddingLeft: '1 2 3 4' });

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(3);
    expect(left.paddingLeft).toBe(4);
  });

  test('should process padding shorthand with percentages', () => {
    const top = transformStyles({ paddingTop: '1% 2% 3% 4%' });
    const right = transformStyles({ paddingRight: '1% 2% 3% 4%' });
    const bottom = transformStyles({ paddingBottom: '1% 2% 3% 4%' });
    const left = transformStyles({ paddingLeft: '1% 2% 3% 4%' });

    expect(top.paddingTop).toBe('1%');
    expect(right.paddingRight).toBe('2%');
    expect(bottom.paddingBottom).toBe('3%');
    expect(left.paddingLeft).toBe('4%');
  });

  test('should process padding axis shorthand', () => {
    const top = transformStyles({ paddingTop: '1 2' });
    const right = transformStyles({ paddingRight: '1 2' });
    const bottom = transformStyles({ paddingBottom: '1 2' });
    const left = transformStyles({ paddingLeft: '1 2' });

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(1);
    expect(left.paddingLeft).toBe(2);
  });

  test('should process borderWidth shorthand', () => {
    const top = transformStyles({ borderTopWidth: '1 solid blue' });
    const right = transformStyles({ borderRightWidth: '1 solid blue' });
    const bottom = transformStyles({ borderBottomWidth: '1 solid blue' });
    const left = transformStyles({ borderLeftWidth: '1 solid blue' });

    expect(top.borderTopWidth).toBe(1);
    expect(right.borderRightWidth).toBe(1);
    expect(bottom.borderBottomWidth).toBe(1);
    expect(left.borderLeftWidth).toBe(1);
  });

  test('should process borderStyle shorthand', () => {
    const top = transformStyles({ borderTopStyle: '1 solid blue' });
    const right = transformStyles({ borderRightStyle: '1 solid blue' });
    const bottom = transformStyles({ borderBottomStyle: '1 solid blue' });
    const left = transformStyles({ borderLeftStyle: '1 solid blue' });

    expect(top.borderTopStyle).toBe('solid');
    expect(right.borderRightStyle).toBe('solid');
    expect(bottom.borderBottomStyle).toBe('solid');
    expect(left.borderLeftStyle).toBe('solid');
  });

  test('should process borderColor shorthand', () => {
    const top = transformStyles({ borderTopColor: '1 solid blue' });
    const right = transformStyles({ borderRightColor: '1 solid blue' });
    const bottom = transformStyles({ borderBottomColor: '1 solid blue' });
    const left = transformStyles({ borderLeftColor: '1 solid blue' });

    expect(top.borderTopColor).toBe('blue');
    expect(right.borderRightColor).toBe('blue');
    expect(bottom.borderBottomColor).toBe('blue');
    expect(left.borderLeftColor).toBe('blue');
  });

  test('should process objectPosition shorthand', () => {
    const x = transformStyles({ objectPositionX: '20 30' });
    const y = transformStyles({ objectPositionY: '20 30' });

    expect(x.objectPositionX).toBe(20);
    expect(y.objectPositionY).toBe(30);
  });

  test('should process objectPosition shorthand percentages', () => {
    const x = transformStyles({ objectPositionX: '20% 30%' });
    const y = transformStyles({ objectPositionY: '20% 30%' });

    expect(x.objectPositionX).toBe('20%');
    expect(y.objectPositionY).toBe('30%');
  });

  test('should process single value transformOrigin shorthand', () => {
    const x = transformStyles({ transformOriginX: '20' });
    const y = transformStyles({ transformOriginY: '20' });

    expect(x.transformOriginX).toBe(20);
    expect(y.transformOriginY).toBe(20);
  });

  test('should process transformOrigin shorthand', () => {
    const x = transformStyles({ transformOriginX: '20 30' });
    const y = transformStyles({ transformOriginY: '20 30' });

    expect(x.transformOriginX).toBe(20);
    expect(y.transformOriginY).toBe(30);
  });

  test('should process transformOrigin shorthand percentages', () => {
    const x = transformStyles({ transformOriginX: '20% 30%' });
    const y = transformStyles({ transformOriginY: '20% 30%' });

    expect(x.transformOriginX).toBe('20%');
    expect(y.transformOriginY).toBe('30%');
  });

  test('should process transformOrigin zero offset shorthand', () => {
    const x = transformStyles({ transformOriginX: 'left top' });
    const y = transformStyles({ transformOriginY: 'left top' });

    expect(x.transformOriginX).toBe('0%');
    expect(y.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin full offset shorthand', () => {
    const x = transformStyles({ transformOriginX: 'right bottom' });
    const y = transformStyles({ transformOriginY: 'right bottom' });

    expect(x.transformOriginX).toBe('100%');
    expect(y.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin center offset shorthand', () => {
    const x = transformStyles({ transformOriginX: 'center' });
    const y = transformStyles({ transformOriginY: 'center' });

    expect(x.transformOriginX).toBe('50%');
    expect(y.transformOriginY).toBe('50%');
  });

  test('should process font-weight thin shorthand', () => {
    const stylesheet1 = transformStyles({ fontWeight: 'thin' });
    const stylesheet2 = transformStyles({ fontWeight: 'hairline' });

    expect(stylesheet1.fontWeight).toBe(100);
    expect(stylesheet2.fontWeight).toBe(100);
  });

  test('should process font-weight ultralight shorthand', () => {
    const stylesheet1 = transformStyles({ fontWeight: 'ultralight' });
    const stylesheet2 = transformStyles({ fontWeight: 'extralight' });

    expect(stylesheet1.fontWeight).toBe(200);
    expect(stylesheet2.fontWeight).toBe(200);
  });

  test('should process font-weight light shorthand', () => {
    const stylesheet = transformStyles({ fontWeight: 'light' });

    expect(stylesheet.fontWeight).toBe(300);
  });

  test('should process font-weight normal shorthand', () => {
    const stylesheet = transformStyles({ fontWeight: 'normal' });

    expect(stylesheet.fontWeight).toBe(400);
  });

  test('should process font-weight medium shorthand', () => {
    const stylesheet = transformStyles({ fontWeight: 'medium' });

    expect(stylesheet.fontWeight).toBe(500);
  });

  test('should process font-weight semibold shorthand', () => {
    const stylesheet1 = transformStyles({ fontWeight: 'semibold' });
    const stylesheet2 = transformStyles({ fontWeight: 'demibold' });

    expect(stylesheet1.fontWeight).toBe(600);
    expect(stylesheet2.fontWeight).toBe(600);
  });

  test('should process font-weight bold shorthand', () => {
    const stylesheet = transformStyles({ fontWeight: 'bold' });

    expect(stylesheet.fontWeight).toBe(700);
  });

  test('should process font-weight ultrabold shorthand', () => {
    const stylesheet1 = transformStyles({ fontWeight: 'ultrabold' });
    const stylesheet2 = transformStyles({ fontWeight: 'extraBold' });

    expect(stylesheet1.fontWeight).toBe(800);
    expect(stylesheet2.fontWeight).toBe(800);
  });

  test('should process font-weight heavy shorthand', () => {
    const stylesheet1 = transformStyles({ fontWeight: 'heavy' });
    const stylesheet2 = transformStyles({ fontWeight: 'black' });

    expect(stylesheet1.fontWeight).toBe(900);
    expect(stylesheet2.fontWeight).toBe(900);
  });
});
