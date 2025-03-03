import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet transform', () => {
  test('should resolve transform origin shorthand', () => {
    const style = resolveStyle({ transformOrigin: '20 1in' });

    expect(style).toEqual({
      transformOriginX: 20,
      transformOriginY: 72,
    });
  });

  test('should resolve transform origin percent shorthand', () => {
    const style = resolveStyle({ transformOrigin: '50% 50%' });

    expect(style).toEqual({
      transformOriginX: '50%',
      transformOriginY: '50%',
    });
  });

  test('should resolve single value transform origin shorthand', () => {
    const style = resolveStyle({ transformOrigin: '20' });

    expect(style).toEqual({
      transformOriginX: 20,
      transformOriginY: '50%',
    });
  });

  test('should resolve transform origin left shorthand', () => {
    const style = resolveStyle({ transformOrigin: 'left' });

    expect(style).toEqual({
      transformOriginX: '0%',
      transformOriginY: '50%',
    });
  });

  test('should resolve transform origin top shorthand', () => {
    const style = resolveStyle({ transformOrigin: 'top' });

    expect(style).toEqual({
      transformOriginX: '50%',
      transformOriginY: '0%',
    });
  });

  test('should resolve transform origin right shorthand', () => {
    const style = resolveStyle({ transformOrigin: 'right' });

    expect(style).toEqual({
      transformOriginX: '100%',
      transformOriginY: '50%',
    });
  });

  test('should resolve transform origin bottom shorthand', () => {
    const style = resolveStyle({ transformOrigin: 'bottom' });

    expect(style).toEqual({
      transformOriginX: '50%',
      transformOriginY: '100%',
    });
  });

  test('should resolve transform origin center shorthand', () => {
    const style = resolveStyle({ transformOrigin: 'center' });

    expect(style).toEqual({
      transformOriginX: '50%',
      transformOriginY: '50%',
    });
  });

  test('should resolve transform origin', () => {
    const style = resolveStyle({
      transformOriginX: '20',
      transformOriginY: '30',
    });

    expect(style.transformOriginX).toBe(20);
    expect(style.transformOriginY).toBe(30);
  });

  test('should resolve transform origin percentages', () => {
    const style = resolveStyle({
      transformOriginX: '20%',
      transformOriginY: '30%',
    });

    expect(style.transformOriginX).toBe('20%');
    expect(style.transformOriginY).toBe('30%');
  });

  test('should resolve transform origin left top', () => {
    const style = resolveStyle({
      transformOriginX: 'left',
      transformOriginY: 'top',
    });

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('0%');
  });

  test('should resolve transform origin left center', () => {
    const style = resolveStyle({
      transformOriginX: 'left',
      transformOriginY: 'center',
    });

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should resolve transform origin left bottom', () => {
    const style = resolveStyle({
      transformOriginX: 'left',
      transformOriginY: 'bottom',
    });

    expect(style.transformOriginX).toBe('0%');
    expect(style.transformOriginY).toBe('100%');
  });

  test('should resolve transform origin right top', () => {
    const style = resolveStyle({
      transformOriginX: 'right',
      transformOriginY: 'top',
    });

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('0%');
  });

  test('should resolve transform origin right center', () => {
    const style = resolveStyle({
      transformOriginX: 'right',
      transformOriginY: 'center',
    });

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should resolve transform origin right bottom', () => {
    const style = resolveStyle({
      transformOriginX: 'right',
      transformOriginY: 'bottom',
    });

    expect(style.transformOriginX).toBe('100%');
    expect(style.transformOriginY).toBe('100%');
  });

  test('should resolve transform origin center center', () => {
    const style = resolveStyle({
      transformOriginX: 'center',
      transformOriginY: 'center',
    });

    expect(style.transformOriginX).toBe('50%');
    expect(style.transformOriginY).toBe('50%');
  });

  test('should resolve single value scale operation', () => {
    const style = resolveStyle({ transform: 'scale(1)' });

    expect(style.transform).toEqual([{ operation: 'scale', value: [1, 1] }]);
  });

  test('should resolve single value gradient scale operation', () => {
    const style = resolveStyle({ gradientTransform: 'scale(1)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [1, 1] },
    ]);
  });

  test('should resolve multiple value scale operation', () => {
    const style = resolveStyle({ transform: 'scale(3, 2)' });

    expect(style.transform).toEqual([{ operation: 'scale', value: [3, 2] }]);
  });

  test('should resolve multiple value gradient scale operation', () => {
    const style = resolveStyle({ gradientTransform: 'scale(3, 2)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [3, 2] },
    ]);
  });

  test('should resolve multiple value scale operation without comma separator', () => {
    const style = resolveStyle({ transform: 'scale(3 2)' });

    expect(style.transform).toEqual([{ operation: 'scale', value: [3, 2] }]);
  });

  test('should resolve multiple value gradient scale operation without comma separator', () => {
    const style = resolveStyle({ gradientTransform: 'scale(3 2)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [3, 2] },
    ]);
  });

  test('should resolve multiple value scale operation with negative and floats', () => {
    const style = resolveStyle({ transform: 'scale(0.1, -10)' });

    expect(style.transform).toEqual([
      { operation: 'scale', value: [0.1, -10] },
    ]);
  });

  test('should resolve multiple value gradient scale operation with negative and floats', () => {
    const style = resolveStyle({ gradientTransform: 'scale(0.1, -10)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [0.1, -10] },
    ]);
  });

  test('should resolve scaleX operation', () => {
    const style = resolveStyle({ transform: 'scaleX(10)' });

    expect(style.transform).toEqual([{ operation: 'scale', value: [10, 1] }]);
  });

  test('should resolve scaleX gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'scaleX(10)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [10, 1] },
    ]);
  });

  test('should resolve scaleY operation', () => {
    const style = resolveStyle({ transform: 'scaleY(0.5)' });

    expect(style.transform).toEqual([{ operation: 'scale', value: [1, 0.5] }]);
  });

  test('should resolve scaleY gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'scaleY(0.5)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'scale', value: [1, 0.5] },
    ]);
  });

  test('should resolve translate operation', () => {
    const style = resolveStyle({ transform: 'translate(10px, 20px)' });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [10, 20] },
    ]);
  });

  test('should resolve translate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'translate(10px, 20px)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [10, 20] },
    ]);
  });

  test('should resolve translate operation without comma separator', () => {
    const style = resolveStyle({ transform: 'translate(10px 20px)' });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [10, 20] },
    ]);
  });

  test('should resolve translate gradient operation without comma separator', () => {
    const style = resolveStyle({ gradientTransform: 'translate(10px 20px)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [10, 20] },
    ]);
  });

  test('should resolve translate operation with negative and floats', () => {
    const style = resolveStyle({ transform: 'translate(-110px, 0.29px)' });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [-110, 0.29] },
    ]);
  });

  test('should resolve translate gradient operation with negative and floats', () => {
    const style = resolveStyle({
      gradientTransform: 'translate(-110px, 0.29px)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [-110, 0.29] },
    ]);
  });

  test('should resolve translateX operation', () => {
    const style = resolveStyle({ transform: 'translateX(10px)' });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [10, 0] },
    ]);
  });

  test('should resolve translateX gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'translateX(10px)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [10, 0] },
    ]);
  });

  test('should resolve translateY operation', () => {
    const style = resolveStyle({ transform: 'translateY(-10px)' });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [0, -10] },
    ]);
  });

  test('should resolve translateY gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'translateY(-10px)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [0, -10] },
    ]);
  });

  test('should resolve numeric rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(120)' });

    expect(style.transform).toEqual([{ operation: 'rotate', value: [120] }]);
  });

  test('should resolve numeric rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(120)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [120] },
    ]);
  });

  test('should resolve float rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(0.1)' });

    expect(style.transform).toEqual([{ operation: 'rotate', value: [0.1] }]);
  });

  test('should resolve float rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(0.1)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [0.1] },
    ]);
  });

  test('should resolve deg rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(2deg)' });

    expect(style.transform).toEqual([{ operation: 'rotate', value: [2] }]);
  });

  test('should resolve deg rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(2deg)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [2] },
    ]);
  });

  test('should resolve negative deg rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(-2deg)' });

    expect(style.transform).toEqual([{ operation: 'rotate', value: [-2] }]);
  });

  test('should resolve negative deg rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(-2deg)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [-2] },
    ]);
  });

  test('should resolve rad rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(3.1416rad)' });

    expect(style.transform).toEqual([
      { operation: 'rotate', value: [180.0004209182994] },
    ]);
  });

  test('should resolve rad rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(3.1416rad)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [180.0004209182994] },
    ]);
  });

  test('should resolve negative rad rotate operation', () => {
    const style = resolveStyle({ transform: 'rotate(-3.1416rad)' });

    expect(style.transform).toEqual([
      { operation: 'rotate', value: [-180.0004209182994] },
    ]);
  });

  test('should resolve negative rad rotate gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'rotate(-3.1416rad)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [-180.0004209182994] },
    ]);
  });

  test('should resolve numeric skew operation', () => {
    const style = resolveStyle({ transform: 'skew(120, 80)' });

    expect(style.transform).toEqual([{ operation: 'skew', value: [120, 80] }]);
  });

  test('should resolve numeric skew gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skew(120, 80)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [120, 80] },
    ]);
  });

  test('should resolve float skew operation', () => {
    const style = resolveStyle({ transform: 'skew(30.5, 40.5)' });

    expect(style.transform).toEqual([
      { operation: 'skew', value: [30.5, 40.5] },
    ]);
  });

  test('should resolve float skew gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skew(30.5, 40.5)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [30.5, 40.5] },
    ]);
  });

  test('should resolve deg skew operation', () => {
    const style = resolveStyle({ transform: 'skew(2deg, 20deg)' });

    expect(style.transform).toEqual([{ operation: 'skew', value: [2, 20] }]);
  });

  test('should resolve deg skew gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skew(2deg, 20deg)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [2, 20] },
    ]);
  });

  test('should resolve negative deg skew operation', () => {
    const style = resolveStyle({ transform: 'skew(-2deg, -5deg)' });

    expect(style.transform).toEqual([{ operation: 'skew', value: [-2, -5] }]);
  });

  test('should resolve negative deg skew gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skew(-2deg, -5deg)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [-2, -5] },
    ]);
  });

  test('should resolve rad skew operation', () => {
    const style = resolveStyle({
      transform: 'skew(3.1416rad, 3.1416rad)',
    });

    expect(style.transform).toEqual([
      { operation: 'skew', value: [180.0004209182994, 180.0004209182994] },
    ]);
  });

  test('should resolve rad skew gradient operation', () => {
    const style = resolveStyle({
      gradientTransform: 'skew(3.1416rad, 3.1416rad)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [180.0004209182994, 180.0004209182994] },
    ]);
  });

  test('should resolve negative rad skew operation', () => {
    const style = resolveStyle({
      transform: 'skew(-3.1416rad, -3.1416rad)',
    });

    expect(style.transform).toEqual([
      { operation: 'skew', value: [-180.0004209182994, -180.0004209182994] },
    ]);
  });

  test('should resolve negative rad skew gradient operation', () => {
    const style = resolveStyle({
      gradientTransform: 'skew(-3.1416rad, -3.1416rad)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [-180.0004209182994, -180.0004209182994] },
    ]);
  });

  test('should resolve mixed units skew operation', () => {
    const style = resolveStyle({ transform: 'skew(-3.1416rad, 10deg)' });

    expect(style.transform).toEqual([
      { operation: 'skew', value: [-180.0004209182994, 10] },
    ]);
  });

  test('should resolve mixed units skew gradient operation', () => {
    const style = resolveStyle({
      gradientTransform: 'skew(-3.1416rad, 10deg)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [-180.0004209182994, 10] },
    ]);
  });

  test('should resolve skewX operation', () => {
    const style = resolveStyle({ transform: 'skewX(-10)' });

    expect(style.transform).toEqual([{ operation: 'skew', value: [-10, 0] }]);
  });

  test('should resolve skewX gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skewX(-10)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [-10, 0] },
    ]);
  });

  test('should resolve skewY operation', () => {
    const style = resolveStyle({ transform: 'skewY(-10)' });

    expect(style.transform).toEqual([{ operation: 'skew', value: [0, -10] }]);
  });

  test('should resolve skewY gradient operation', () => {
    const style = resolveStyle({ gradientTransform: 'skewY(-10)' });

    expect(style.gradientTransform).toEqual([
      { operation: 'skew', value: [0, -10] },
    ]);
  });

  test('should resolve matrix operation', () => {
    const style = resolveStyle({
      transform: 'matrix(-1, -0.1, 0, 0.1, 1, 10)',
    });

    expect(style.transform).toEqual([
      { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
    ]);
  });

  test('should resolve matrix gradient operation', () => {
    const style = resolveStyle({
      gradientTransform: 'matrix(-1, -0.1, 0, 0.1, 1, 10)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
    ]);
  });

  test('should resolve combined operations', () => {
    const style = resolveStyle({
      transform:
        'translate(10px, 20px) scale(0.1, -10) matrix(-1, -0.1, 0, 0.1, 1, 10)',
    });

    expect(style.transform).toEqual([
      { operation: 'translate', value: [10, 20] },
      { operation: 'scale', value: [0.1, -10] },
      { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
    ]);
  });

  test('should resolve combined gradient operations', () => {
    const style = resolveStyle({
      gradientTransform:
        'translate(10px, 20px) scale(0.1, -10) matrix(-1, -0.1, 0, 0.1, 1, 10)',
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'translate', value: [10, 20] },
      { operation: 'scale', value: [0.1, -10] },
      { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
    ]);
  });

  // This can happen when transform get's parsed as prop and then again on an SVG node
  test('should leave parsed tranform value as is', () => {
    const style = resolveStyle({
      transform: [{ operation: 'rotate', value: [-180.0004209182994] }] as any,
    });

    expect(style.transform).toEqual([
      { operation: 'rotate', value: [-180.0004209182994] },
    ]);
  });

  // This can happen when transform get's parsed as prop and then again on an SVG node
  test('should leave parsed tranform gradient value as is', () => {
    const style = resolveStyle({
      gradientTransform: [
        { operation: 'rotate', value: [-180.0004209182994] },
      ] as any,
    });

    expect(style.gradientTransform).toEqual([
      { operation: 'rotate', value: [-180.0004209182994] },
    ]);
  });
});
