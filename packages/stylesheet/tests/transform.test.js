import { describe, expect, test } from 'vitest';

import _transformStyles from '../src/transform';

const CONTAINER = { width: 200, height: 400 };

const transformStyles = _transformStyles(CONTAINER);

describe('stylesheet transform', () => {
  describe('transform fontWeight', () => {
    test('should process numeric value', () => {
      const styles = transformStyles({ fontWeight: 800 });

      expect(styles).toEqual({ fontWeight: 800 });
    });

    test('should process numeric string value', () => {
      const styles = transformStyles({ fontWeight: '800' });

      expect(styles).toEqual({ fontWeight: 800 });
    });

    test('should process thin value', () => {
      const styles = transformStyles({ fontWeight: 'thin' });

      expect(styles).toEqual({ fontWeight: 100 });
    });

    test('should process hairline value', () => {
      const styles = transformStyles({ fontWeight: 'hairline' });

      expect(styles).toEqual({ fontWeight: 100 });
    });

    test('should process ultralight value', () => {
      const styles = transformStyles({ fontWeight: 'ultralight' });

      expect(styles).toEqual({ fontWeight: 200 });
    });

    test('should process extralight value', () => {
      const styles = transformStyles({ fontWeight: 'extralight' });

      expect(styles).toEqual({ fontWeight: 200 });
    });

    test('should process light value', () => {
      const styles = transformStyles({ fontWeight: 'light' });

      expect(styles).toEqual({ fontWeight: 300 });
    });

    test('should process normal value', () => {
      const styles = transformStyles({ fontWeight: 'normal' });

      expect(styles).toEqual({ fontWeight: 400 });
    });

    test('should process medium value', () => {
      const styles = transformStyles({ fontWeight: 'medium' });

      expect(styles).toEqual({ fontWeight: 500 });
    });

    test('should process semibold value', () => {
      const styles = transformStyles({ fontWeight: 'semibold' });

      expect(styles).toEqual({ fontWeight: 600 });
    });

    test('should process demibold value', () => {
      const styles = transformStyles({ fontWeight: 'demibold' });

      expect(styles).toEqual({ fontWeight: 600 });
    });

    test('should process bold value', () => {
      const styles = transformStyles({ fontWeight: 'bold' });

      expect(styles).toEqual({ fontWeight: 700 });
    });

    test('should process ultrabold value', () => {
      const styles = transformStyles({ fontWeight: 'ultrabold' });

      expect(styles).toEqual({ fontWeight: 800 });
    });

    test('should process extrabold value', () => {
      const styles = transformStyles({ fontWeight: 'extrabold' });

      expect(styles).toEqual({ fontWeight: 800 });
    });

    test('should process heavy value', () => {
      const styles = transformStyles({ fontWeight: 'heavy' });

      expect(styles).toEqual({ fontWeight: 900 });
    });

    test('should process black value', () => {
      const styles = transformStyles({ fontWeight: 'black' });

      expect(styles).toEqual({ fontWeight: 900 });
    });
  });

  describe('transform colors', () => {
    test('should keep hex values as they are', () => {
      const styles = transformStyles({ color: '#0000FF' });

      expect(styles.color).toBe('#0000FF');
    });

    test('should transform rgb to hexa', () => {
      const styles = transformStyles({ color: 'rgb(255, 0, 0)' });

      expect(styles.color).toBe('#FF0000');
    });

    test('should transform rgba to hexa', () => {
      const styles = transformStyles({ color: 'rgba(0, 255, 0, 0.5)' });

      expect(styles.color).toBe('#00FF0080');
    });

    test('should transform hsl to hexa', () => {
      const styles = transformStyles({ color: 'hsl(0, 100%, 50%)' });

      expect(styles.color).toBe('#FF0000');
    });

    test('should transform hsla to hexa', () => {
      const styles = transformStyles({ color: 'hsla(0, 100%, 50%, 0.5)' });

      expect(styles.color).toBe('#FF0000');
    });

    test('should any matching style attribute', () => {
      const styles = transformStyles({ backgroundColor: 'rgb(255, 0, 0)' });

      expect(styles.backgroundColor).toBe('#FF0000');
    });
  });

  describe('transform units', () => {
    test('should transform width in dimensions', () => {
      const styles = transformStyles({ width: '1in' });

      expect(styles.width).toBe(72);
    });

    test('should transform min/max width in dimensions', () => {
      const styles = transformStyles({ minWidth: '1in', maxWidth: '2in' });

      expect(styles.minWidth).toBe(72);
      expect(styles.maxWidth).toBe(72 * 2);
    });

    test('should transform width px dimensions', () => {
      const styles = transformStyles({ width: '1px' });

      expect(styles.width).toBe(1);
    });

    test('should transform width mm dimensions', () => {
      const styles = transformStyles({ width: '1mm' });

      expect(styles.width).toBeCloseTo(2.83, 1);
    });

    test('should transform min/max width mm dimensions', () => {
      const styles = transformStyles({ minWidth: '1mm', maxWidth: '2mm' });

      expect(styles.minWidth).toBeCloseTo(2.83, 1);
      expect(styles.maxWidth).toBeCloseTo(2.83 * 2, 1);
    });

    test('should transform width cm dimensions', () => {
      const styles = transformStyles({ width: '1cm' });

      expect(styles.width).toBeCloseTo(28.346, 1);
    });

    test('should transform min/max width cm dimensions', () => {
      const styles = transformStyles({ minWidth: '1cm', maxWidth: '2cm' });

      expect(styles.minWidth).toBeCloseTo(28.346, 1);
      expect(styles.maxWidth).toBeCloseTo(28.346 * 2, 1);
    });

    test('should transform width vw dimensions', () => {
      const styles = transformStyles({ width: '50vw' });

      expect(styles.width).toBe(100);
    });

    test('should transform min/max width vw dimensions', () => {
      const styles = transformStyles({ minWidth: '50vw', maxWidth: '20vw' });

      expect(styles.minWidth).toBe(100);
      expect(styles.maxWidth).toBe(40);
    });

    test('should transform width vh dimensions', () => {
      const styles = transformStyles({ width: '50vh' });

      expect(styles.width).toBe(200);
    });

    test('should transform min/max width vh dimensions', () => {
      const styles = transformStyles({ minWidth: '50vh', maxWidth: '20vh' });

      expect(styles.minWidth).toBe(200);
      expect(styles.maxWidth).toBe(80);
    });

    test('should transform height in dimensions', () => {
      const styles = transformStyles({ height: '1in' });

      expect(styles.height).toBe(72);
    });

    test('should transform min/max height in dimensions', () => {
      const styles = transformStyles({ minHeight: '1in', maxHeight: '2in' });

      expect(styles.minHeight).toBe(72);
      expect(styles.maxHeight).toBe(72 * 2);
    });

    test('should transform height mm dimensions', () => {
      const styles = transformStyles({ height: '1mm' });

      expect(styles.height).toBeCloseTo(2.83, 1);
    });

    test('should transform min/max height mm dimensions', () => {
      const styles = transformStyles({ minHeight: '1mm', maxHeight: '2mm' });

      expect(styles.minHeight).toBeCloseTo(2.83, 1);
      expect(styles.maxHeight).toBeCloseTo(2.83 * 2, 1);
    });

    test('should transform height cm dimensions', () => {
      const styles = transformStyles({ height: '1cm' });

      expect(styles.height).toBeCloseTo(28.346, 1);
    });

    test('should transform min/max height cm dimensions', () => {
      const styles = transformStyles({ minHeight: '1cm', maxHeight: '2cm' });

      expect(styles.minHeight).toBeCloseTo(28.346, 1);
      expect(styles.maxHeight).toBeCloseTo(28.346 * 2, 1);
    });

    test('should transform expanded margin in dimensions', () => {
      const styles = transformStyles({
        marginTop: '1in',
        marginRight: '2in',
        marginBottom: '3in',
        marginLeft: '4in',
      });

      expect(styles.marginTop).toBe(72);
      expect(styles.marginRight).toBe(72 * 2);
      expect(styles.marginBottom).toBe(72 * 3);
      expect(styles.marginLeft).toBe(72 * 4);
    });

    test('should transform expanded padding in dimensions', () => {
      const styles = transformStyles({
        paddingTop: '1in',
        paddingRight: '2in',
        paddingBottom: '3in',
        paddingLeft: '4in',
      });

      expect(styles.paddingTop).toBe(72);
      expect(styles.paddingRight).toBe(72 * 2);
      expect(styles.paddingBottom).toBe(72 * 3);
      expect(styles.paddingLeft).toBe(72 * 4);
    });

    test('should transform expanded margin vw dimensions', () => {
      const styles = transformStyles({
        marginTop: '10vw',
        marginRight: '20vw',
        marginBottom: '30vw',
        marginLeft: '40vw',
      });

      expect(styles.marginTop).toBe(20);
      expect(styles.marginRight).toBe(40);
      expect(styles.marginBottom).toBe(60);
      expect(styles.marginLeft).toBe(80);
    });

    test('should transform expanded padding vw dimensions', () => {
      const styles = transformStyles({
        paddingTop: '10vw',
        paddingRight: '20vw',
        paddingBottom: '30vw',
        paddingLeft: '40vw',
      });

      expect(styles.paddingTop).toBe(20);
      expect(styles.paddingRight).toBe(40);
      expect(styles.paddingBottom).toBe(60);
      expect(styles.paddingLeft).toBe(80);
    });

    test('should transform expanded margin vh dimensions', () => {
      const styles = transformStyles({
        marginTop: '10vh',
        marginRight: '20vh',
        marginBottom: '30vh',
        marginLeft: '40vh',
      });

      expect(styles.marginTop).toBe(40);
      expect(styles.marginRight).toBe(80);
      expect(styles.marginBottom).toBe(120);
      expect(styles.marginLeft).toBe(160);
    });

    test('should transform expanded padding vh dimensions', () => {
      const styles = transformStyles({
        paddingTop: '10vh',
        paddingRight: '20vh',
        paddingBottom: '30vh',
        paddingLeft: '40vh',
      });

      expect(styles.paddingTop).toBe(40);
      expect(styles.paddingRight).toBe(80);
      expect(styles.paddingBottom).toBe(120);
      expect(styles.paddingLeft).toBe(160);
    });

    test('should transform expanded margin mm dimensions', () => {
      const styles = transformStyles({
        marginTop: '1mm',
        marginRight: '2mm',
        marginBottom: '3mm',
        marginLeft: '4mm',
      });

      expect(styles.marginTop).toBeCloseTo(2.83, 1);
      expect(styles.marginRight).toBeCloseTo(2.83 * 2, 1);
      expect(styles.marginBottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.marginLeft).toBeCloseTo(2.83 * 4, 1);
    });

    test('should transform expanded padding mm dimensions', () => {
      const styles = transformStyles({
        paddingTop: '1mm',
        paddingRight: '2mm',
        paddingBottom: '3mm',
        paddingLeft: '4mm',
      });

      expect(styles.paddingTop).toBeCloseTo(2.83, 1);
      expect(styles.paddingRight).toBeCloseTo(2.83 * 2, 1);
      expect(styles.paddingBottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.paddingLeft).toBeCloseTo(2.83 * 4, 1);
    });

    test('should transform expanded margin cm dimensions', () => {
      const styles = transformStyles({
        marginTop: '1cm',
        marginRight: '2cm',
        marginBottom: '3cm',
        marginLeft: '4cm',
      });

      expect(styles.marginTop).toBeCloseTo(28.346, 1);
      expect(styles.marginRight).toBeCloseTo(28.346 * 2, 1);
      expect(styles.marginBottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.marginLeft).toBeCloseTo(28.346 * 4, 1);
    });

    test('should transform expanded padding cm dimensions', () => {
      const styles = transformStyles({
        paddingTop: '1cm',
        paddingRight: '2cm',
        paddingBottom: '3cm',
        paddingLeft: '4cm',
      });

      expect(styles.paddingTop).toBeCloseTo(28.346, 1);
      expect(styles.paddingRight).toBeCloseTo(28.346 * 2, 1);
      expect(styles.paddingBottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.paddingLeft).toBeCloseTo(28.346 * 4, 1);
    });

    test('should transform positions in in dimensions', () => {
      const styles = transformStyles({
        top: '1in',
        right: '2in',
        bottom: '3in',
        left: '4in',
      });

      expect(styles.top).toBe(72);
      expect(styles.right).toBe(72 * 2);
      expect(styles.bottom).toBe(72 * 3);
      expect(styles.left).toBe(72 * 4);
    });

    test('should transform positions in mm dimensions', () => {
      const styles = transformStyles({
        top: '1mm',
        right: '2mm',
        bottom: '3mm',
        left: '4mm',
      });

      expect(styles.top).toBeCloseTo(2.83, 1);
      expect(styles.right).toBeCloseTo(2.83 * 2, 1);
      expect(styles.bottom).toBeCloseTo(2.83 * 3, 1);
      expect(styles.left).toBeCloseTo(2.83 * 4, 1);
    });

    test('should transform positions in cm dimensions', () => {
      const styles = transformStyles({
        top: '1cm',
        right: '2cm',
        bottom: '3cm',
        left: '4cm',
      });

      expect(styles.top).toBeCloseTo(28.346, 1);
      expect(styles.right).toBeCloseTo(28.346 * 2, 1);
      expect(styles.bottom).toBeCloseTo(28.346 * 3, 1);
      expect(styles.left).toBeCloseTo(28.346 * 4, 1);
    });

    test('should transform expanded borders in in', () => {
      const styles = transformStyles({
        borderTopWidth: '1in',
        borderRightWidth: '2in',
        borderBottomWidth: '3in',
        borderLeftWidth: '4in',
      });

      expect(styles.borderTopWidth).toBe(72);
      expect(styles.borderRightWidth).toBe(72 * 2);
      expect(styles.borderBottomWidth).toBe(72 * 3);
      expect(styles.borderLeftWidth).toBe(72 * 4);
    });

    test('should transform expanded borders in vw', () => {
      const styles = transformStyles({
        borderTopWidth: '10vw',
        borderRightWidth: '20vw',
        borderBottomWidth: '30vw',
        borderLeftWidth: '40vw',
      });

      expect(styles.borderTopWidth).toBe(20);
      expect(styles.borderRightWidth).toBe(40);
      expect(styles.borderBottomWidth).toBe(60);
      expect(styles.borderLeftWidth).toBe(80);
    });

    test('should transform expanded borders in vh', () => {
      const styles = transformStyles({
        borderTopWidth: '10vh',
        borderRightWidth: '20vh',
        borderBottomWidth: '30vh',
        borderLeftWidth: '40vh',
      });

      expect(styles.borderTopWidth).toBe(40);
      expect(styles.borderRightWidth).toBe(80);
      expect(styles.borderBottomWidth).toBe(120);
      expect(styles.borderLeftWidth).toBe(160);
    });

    test('should transform expanded borders in mm', () => {
      const styles = transformStyles({
        borderTopWidth: '1mm',
        borderRightWidth: '2mm',
        borderBottomWidth: '3mm',
        borderLeftWidth: '4mm',
      });

      expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
      expect(styles.borderRightWidth).toBeCloseTo(2.83 * 2, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(2.83 * 3, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(2.83 * 4, 1);
    });

    test('should transform expanded borders in cm', () => {
      const styles = transformStyles({
        borderTopWidth: '1cm',
        borderRightWidth: '2cm',
        borderBottomWidth: '3cm',
        borderLeftWidth: '4cm',
      });

      expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
      expect(styles.borderRightWidth).toBeCloseTo(28.346 * 2, 1);
      expect(styles.borderBottomWidth).toBeCloseTo(28.346 * 3, 1);
      expect(styles.borderLeftWidth).toBeCloseTo(28.346 * 4, 1);
    });
  });

  describe('transform transformOrigin', () => {
    test('should transform transformOrigin shorthand', () => {
      const style = transformStyles({
        transformOriginX: '20',
        transformOriginY: '30',
      });

      expect(style.transformOriginX).toBe(20);
      expect(style.transformOriginY).toBe(30);
    });

    test('should transform transformOrigin shorthand percentages', () => {
      const style = transformStyles({
        transformOriginX: '20%',
        transformOriginY: '30%',
      });

      expect(style.transformOriginX).toBe('20%');
      expect(style.transformOriginY).toBe('30%');
    });

    test('should transform transformOrigin left top shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'left',
        transformOriginY: 'top',
      });

      expect(style.transformOriginX).toBe('0%');
      expect(style.transformOriginY).toBe('0%');
    });

    test('should transform transformOrigin left center shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'left',
        transformOriginY: 'center',
      });

      expect(style.transformOriginX).toBe('0%');
      expect(style.transformOriginY).toBe('50%');
    });

    test('should transform transformOrigin left bottom shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'left',
        transformOriginY: 'bottom',
      });

      expect(style.transformOriginX).toBe('0%');
      expect(style.transformOriginY).toBe('100%');
    });

    test('should transform transformOrigin right top shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'right',
        transformOriginY: 'top',
      });

      expect(style.transformOriginX).toBe('100%');
      expect(style.transformOriginY).toBe('0%');
    });

    test('should transform transformOrigin right center shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'right',
        transformOriginY: 'center',
      });

      expect(style.transformOriginX).toBe('100%');
      expect(style.transformOriginY).toBe('50%');
    });

    test('should transform transformOrigin right bottom shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'right',
        transformOriginY: 'bottom',
      });

      expect(style.transformOriginX).toBe('100%');
      expect(style.transformOriginY).toBe('100%');
    });

    test('should transform transformOrigin center center shorthand', () => {
      const style = transformStyles({
        transformOriginX: 'center',
        transformOriginY: 'center',
      });

      expect(style.transformOriginX).toBe('50%');
      expect(style.transformOriginY).toBe('50%');
    });
  });

  describe('transform objectPosition', () => {
    test('should transform objectPosition shorthand', () => {
      const style = transformStyles({
        objectPositionX: '20',
        objectPositionY: '30',
      });

      expect(style.objectPositionX).toBe(20);
      expect(style.objectPositionY).toBe(30);
    });

    test('should transform objectPosition shorthand percentages', () => {
      const style = transformStyles({
        objectPositionX: '20%',
        objectPositionY: '30%',
      });

      expect(style.objectPositionX).toBe('20%');
      expect(style.objectPositionY).toBe('30%');
    });

    test('should transform objectPosition left top shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'left',
        objectPositionY: 'top',
      });

      expect(style.objectPositionX).toBe('0%');
      expect(style.objectPositionY).toBe('0%');
    });

    test('should transform objectPosition left center shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'left',
        objectPositionY: 'center',
      });

      expect(style.objectPositionX).toBe('0%');
      expect(style.objectPositionY).toBe('50%');
    });

    test('should transform objectPosition left bottom shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'left',
        objectPositionY: 'bottom',
      });

      expect(style.objectPositionX).toBe('0%');
      expect(style.objectPositionY).toBe('100%');
    });

    test('should transform objectPosition right top shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'right',
        objectPositionY: 'top',
      });

      expect(style.objectPositionX).toBe('100%');
      expect(style.objectPositionY).toBe('0%');
    });

    test('should transform objectPosition right center shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'right',
        objectPositionY: 'center',
      });

      expect(style.objectPositionX).toBe('100%');
      expect(style.objectPositionY).toBe('50%');
    });

    test('should transform objectPosition right bottom shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'right',
        objectPositionY: 'bottom',
      });

      expect(style.objectPositionX).toBe('100%');
      expect(style.objectPositionY).toBe('100%');
    });

    test('should transform objectPosition center center shorthand', () => {
      const style = transformStyles({
        objectPositionX: 'center',
        objectPositionY: 'center',
      });

      expect(style.objectPositionX).toBe('50%');
      expect(style.objectPositionY).toBe('50%');
    });
  });

  describe('transform transform', () => {
    test('should transform single value scale operation', () => {
      const style = transformStyles({ transform: 'scale(1)' });

      expect(style.transform).toEqual([{ operation: 'scale', value: [1, 1] }]);
    });

    test('should transform multiple value scale operation', () => {
      const style = transformStyles({ transform: 'scale(3, 2)' });

      expect(style.transform).toEqual([{ operation: 'scale', value: [3, 2] }]);
    });

    test('should transform multiple value scale operation without comma separator', () => {
      const style = transformStyles({ transform: 'scale(3 2)' });

      expect(style.transform).toEqual([{ operation: 'scale', value: [3, 2] }]);
    });

    test('should transform multiple value scale operation with negative and floats', () => {
      const style = transformStyles({ transform: 'scale(0.1, -10)' });

      expect(style.transform).toEqual([
        { operation: 'scale', value: [0.1, -10] },
      ]);
    });

    test('should transform scaleX operation', () => {
      const style = transformStyles({ transform: 'scaleX(10)' });

      expect(style.transform).toEqual([{ operation: 'scale', value: [10, 1] }]);
    });

    test('should transform scaleY operation', () => {
      const style = transformStyles({ transform: 'scaleY(0.5)' });

      expect(style.transform).toEqual([
        { operation: 'scale', value: [1, 0.5] },
      ]);
    });

    test('should transform translate operation', () => {
      const style = transformStyles({ transform: 'translate(10px, 20px)' });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [10, 20] },
      ]);
    });

    test('should transform translate operation without comma separator', () => {
      const style = transformStyles({ transform: 'translate(10px 20px)' });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [10, 20] },
      ]);
    });

    test('should transform translate operation with negative and floats', () => {
      const style = transformStyles({ transform: 'translate(-110px, 0.29px)' });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [-110, 0.29] },
      ]);
    });

    test('should transform translateX operation', () => {
      const style = transformStyles({ transform: 'translateX(10px)' });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [10, 0] },
      ]);
    });

    test('should transform translateY operation', () => {
      const style = transformStyles({ transform: 'translateY(-10px)' });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [0, -10] },
      ]);
    });

    test('should transform numeric rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(120)' });

      expect(style.transform).toEqual([{ operation: 'rotate', value: [120] }]);
    });

    test('should transform float rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(0.1)' });

      expect(style.transform).toEqual([{ operation: 'rotate', value: [0.1] }]);
    });

    test('should transform deg rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(2deg)' });

      expect(style.transform).toEqual([{ operation: 'rotate', value: [2] }]);
    });

    test('should transform negative deg rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(-2deg)' });

      expect(style.transform).toEqual([{ operation: 'rotate', value: [-2] }]);
    });

    test('should transform rad rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(3.1416rad)' });

      expect(style.transform).toEqual([
        { operation: 'rotate', value: [180.0004209182994] },
      ]);
    });

    test('should transform negative rad rotate operation', () => {
      const style = transformStyles({ transform: 'rotate(-3.1416rad)' });

      expect(style.transform).toEqual([
        { operation: 'rotate', value: [-180.0004209182994] },
      ]);
    });

    test('should transform numeric skew operation', () => {
      const style = transformStyles({ transform: 'skew(120, 80)' });

      expect(style.transform).toEqual([
        { operation: 'skew', value: [120, 80] },
      ]);
    });

    test('should transform float skew operation', () => {
      const style = transformStyles({ transform: 'skew(30.5, 40.5)' });

      expect(style.transform).toEqual([
        { operation: 'skew', value: [30.5, 40.5] },
      ]);
    });

    test('should transform deg skew operation', () => {
      const style = transformStyles({ transform: 'skew(2deg, 20deg)' });

      expect(style.transform).toEqual([{ operation: 'skew', value: [2, 20] }]);
    });

    test('should transform negative deg skew operation', () => {
      const style = transformStyles({ transform: 'skew(-2deg, -5deg)' });

      expect(style.transform).toEqual([{ operation: 'skew', value: [-2, -5] }]);
    });

    test('should transform rad skew operation', () => {
      const style = transformStyles({
        transform: 'skew(3.1416rad, 3.1416rad)',
      });

      expect(style.transform).toEqual([
        { operation: 'skew', value: [180.0004209182994, 180.0004209182994] },
      ]);
    });

    test('should transform negative rad skew operation', () => {
      const style = transformStyles({
        transform: 'skew(-3.1416rad, -3.1416rad)',
      });

      expect(style.transform).toEqual([
        { operation: 'skew', value: [-180.0004209182994, -180.0004209182994] },
      ]);
    });

    test('should transform mixed units skew operation', () => {
      const style = transformStyles({ transform: 'skew(-3.1416rad, 10deg)' });

      expect(style.transform).toEqual([
        { operation: 'skew', value: [-180.0004209182994, 10] },
      ]);
    });

    test('should transform skewX operation', () => {
      const style = transformStyles({ transform: 'skewX(-10)' });

      expect(style.transform).toEqual([{ operation: 'skew', value: [-10, 0] }]);
    });

    test('should transform skewY operation', () => {
      const style = transformStyles({ transform: 'skewY(-10)' });

      expect(style.transform).toEqual([{ operation: 'skew', value: [0, -10] }]);
    });

    test('should transform matrix operation', () => {
      const style = transformStyles({
        transform: 'matrix(-1, -0.1, 0, 0.1, 1, 10)',
      });

      expect(style.transform).toEqual([
        { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
      ]);
    });

    test('should transform combined operations', () => {
      const style = transformStyles({
        transform:
          'translate(10px, 20px) scale(0.1, -10) matrix(-1, -0.1, 0, 0.1, 1, 10)',
      });

      expect(style.transform).toEqual([
        { operation: 'translate', value: [10, 20] },
        { operation: 'scale', value: [0.1, -10] },
        { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
      ]);
    });

    // This can happen when transform get's parsed as prop and then again on an SVG node
    test('should leave parsed tranform value as is', () => {
      const style = transformStyles({
        transform: [{ operation: 'rotate', value: [-180.0004209182994] }],
      });

      expect(style.transform).toEqual([
        { operation: 'rotate', value: [-180.0004209182994] },
      ]);
    });
  });
});
