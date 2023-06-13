const primitives = require('../src');

describe('primitives', () => {
  test('should export group', () => {
    expect(primitives.G).toBeTruthy();
  });

  test('should export svg', () => {
    expect(primitives.Svg).toBeTruthy();
  });

  test('should export view', () => {
    expect(primitives.View).toBeTruthy();
  });

  test('should export link', () => {
    expect(primitives.Link).toBeTruthy();
  });

  test('should export page', () => {
    expect(primitives.Page).toBeTruthy();
  });

  test('should export note', () => {
    expect(primitives.Note).toBeTruthy();
  });

  test('should export path', () => {
    expect(primitives.Path).toBeTruthy();
  });

  test('should export rect', () => {
    expect(primitives.Rect).toBeTruthy();
  });

  test('should export line', () => {
    expect(primitives.Line).toBeTruthy();
  });

  test('should export form', () => {
    expect(primitives.Form).toBeTruthy();
  });

  test('should export form field', () => {
    expect(primitives.FormField).toBeTruthy();
  });

  test('should export text input', () => {
    expect(primitives.TextInput).toBeTruthy();
  });

  test('should export form list', () => {
    expect(primitives.FormList).toBeTruthy();
  });

  test('should export form combo', () => {
    expect(primitives.FormCombo).toBeTruthy();
  });

  test('should export form push button', () => {
    expect(primitives.FormPushButton).toBeTruthy();
  });

  test('should export stop', () => {
    expect(primitives.Stop).toBeTruthy();
  });

  test('should export defs', () => {
    expect(primitives.Defs).toBeTruthy();
  });

  test('should export image', () => {
    expect(primitives.Image).toBeTruthy();
  });

  test('should export tspan', () => {
    expect(primitives.Tspan).toBeTruthy();
  });

  test('should export canvas', () => {
    expect(primitives.Canvas).toBeTruthy();
  });

  test('should export circle', () => {
    expect(primitives.Circle).toBeTruthy();
  });

  test('should export ellipse', () => {
    expect(primitives.Ellipse).toBeTruthy();
  });

  test('should export polygon', () => {
    expect(primitives.Polygon).toBeTruthy();
  });

  test('should export document', () => {
    expect(primitives.Document).toBeTruthy();
  });

  test('should export polyline', () => {
    expect(primitives.Polyline).toBeTruthy();
  });

  test('should export clippath', () => {
    expect(primitives.ClipPath).toBeTruthy();
  });

  test('should export text intance', () => {
    expect(primitives.TextInstance).toBeTruthy();
  });

  test('should export text linear gradient', () => {
    expect(primitives.LinearGradient).toBeTruthy();
  });

  test('should export text radial gradient', () => {
    expect(primitives.RadialGradient).toBeTruthy();
  });
});
