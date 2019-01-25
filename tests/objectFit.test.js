import { resolveObjectFit } from '../src/utils/objectFit';

describe('object-fit', () => {
  test('should fill to content box for portrait images', () => {
    const result = resolveObjectFit('fill', 200, 200, 40, 80);

    expect(result.width).toBe(200);
    expect(result.height).toBe(200);
    expect(result.xOffset).toBe(0);
    expect(result.yOffset).toBe(0);
  });

  test('should fill to content box for landscape images', () => {
    const result = resolveObjectFit('fill', 200, 200, 80, 40);

    expect(result.width).toBe(200);
    expect(result.height).toBe(200);
    expect(result.xOffset).toBe(0);
    expect(result.yOffset).toBe(0);
  });

  test('should contain inside content box for portrait images', () => {
    const result = resolveObjectFit('contain', 200, 200, 40, 80);

    expect(result.width).toBe(100);
    expect(result.height).toBe(200);
    expect(result.xOffset).toBe(50);
    expect(result.yOffset).toBe(0);
  });

  test('should contain inside content box for landscape images', () => {
    const result = resolveObjectFit('contain', 200, 200, 80, 40);

    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.xOffset).toBe(0);
    expect(result.yOffset).toBe(50);
  });

  test('should cover inside content box for portrait images', () => {
    const result = resolveObjectFit('cover', 200, 200, 40, 80);

    expect(result.width).toBe(200);
    expect(result.height).toBe(400);
    expect(result.xOffset).toBe(0);
    expect(result.yOffset).toBe(-100);
  });

  test('should cover inside content box for landscape images', () => {
    const result = resolveObjectFit('cover', 200, 200, 80, 40);

    expect(result.width).toBe(400);
    expect(result.height).toBe(200);
    expect(result.xOffset).toBe(-100);
    expect(result.yOffset).toBe(0);
  });

  test('should not fit inside content box for smaller portrait images', () => {
    const result = resolveObjectFit('none', 200, 200, 40, 80);

    expect(result.width).toBe(40);
    expect(result.height).toBe(80);
    expect(result.xOffset).toBe(80);
    expect(result.yOffset).toBe(60);
  });

  test('should not fit inside content box for bigger portrait images', () => {
    const result = resolveObjectFit('none', 200, 200, 400, 800);

    expect(result.width).toBe(400);
    expect(result.height).toBe(800);
    expect(result.xOffset).toBe(-100);
    expect(result.yOffset).toBe(-300);
  });

  test('should not fit inside content box for smaller landscape images', () => {
    const result = resolveObjectFit('none', 200, 200, 80, 40);

    expect(result.width).toBe(80);
    expect(result.height).toBe(40);
    expect(result.xOffset).toBe(60);
    expect(result.yOffset).toBe(80);
  });

  test('should not fit inside content box for bigger landscape images', () => {
    const result = resolveObjectFit('none', 200, 200, 800, 400);

    expect(result.width).toBe(800);
    expect(result.height).toBe(400);
    expect(result.xOffset).toBe(-300);
    expect(result.yOffset).toBe(-100);
  });

  test('should scale-down inside content box for smaller portrait images', () => {
    const result = resolveObjectFit('scale-down', 200, 200, 40, 80);

    expect(result.width).toBe(40);
    expect(result.height).toBe(80);
    expect(result.xOffset).toBe(80);
    expect(result.yOffset).toBe(60);
  });

  test('should scale-down inside content box for bigger portrait images', () => {
    const result = resolveObjectFit('scale-down', 200, 200, 400, 800);

    expect(result.width).toBe(100);
    expect(result.height).toBe(200);
    expect(result.xOffset).toBe(50);
    expect(result.yOffset).toBe(0);
  });

  test('should scale-down inside content box for smaller landscape images', () => {
    const result = resolveObjectFit('scale-down', 200, 200, 80, 40);

    expect(result.width).toBe(80);
    expect(result.height).toBe(40);
    expect(result.xOffset).toBe(60);
    expect(result.yOffset).toBe(80);
  });

  test('should scale-down inside content box for bigger landscape images', () => {
    const result = resolveObjectFit('scale-down', 200, 200, 800, 400);

    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
    expect(result.xOffset).toBe(0);
    expect(result.yOffset).toBe(50);
  });
});
