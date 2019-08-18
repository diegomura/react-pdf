import { StyleSheet } from '../src/node';

describe('units conversion', () => {
  test('Should transform width in dimensions', () => {
    const styles = StyleSheet.resolve({ width: '1in' });

    expect(styles.width).toBe(72);
  });

  test('Should transform min/max width in dimensions', () => {
    const styles = StyleSheet.resolve({ minWidth: '1in', maxWidth: '2in' });

    expect(styles.minWidth).toBe(72);
    expect(styles.maxWidth).toBe(72 * 2);
  });

  test('Should transform width mm dimensions', () => {
    const styles = StyleSheet.resolve({ width: '1mm' });

    expect(styles.width).toBeCloseTo(2.83, 1);
  });

  test('Should transform min/max width mm dimensions', () => {
    const styles = StyleSheet.resolve({ minWidth: '1mm', maxWidth: '2mm' });

    expect(styles.minWidth).toBeCloseTo(2.83, 1);
    expect(styles.maxWidth).toBeCloseTo(2.83 * 2, 1);
  });

  test('Should transform width cm dimensions', () => {
    const styles = StyleSheet.resolve({ width: '1cm' });

    expect(styles.width).toBeCloseTo(28.346, 1);
  });

  test('Should transform min/max width cm dimensions', () => {
    const styles = StyleSheet.resolve({ minWidth: '1cm', maxWidth: '2cm' });

    expect(styles.minWidth).toBeCloseTo(28.346, 1);
    expect(styles.maxWidth).toBeCloseTo(28.346 * 2, 1);
  });

  test('Should transform width vw dimensions', () => {
    const styles = StyleSheet.resolve(
      { width: '50vw' },
      { width: 200, height: 400 },
    );

    expect(styles.width).toBe(100);
  });

  test('Should transform min/max width vw dimensions', () => {
    const styles = StyleSheet.resolve(
      { minWidth: '50vw', maxWidth: '20vw' },
      { width: 200, height: 400 },
    );

    expect(styles.minWidth).toBe(100);
    expect(styles.maxWidth).toBe(40);
  });

  test('Should transform width vh dimensions', () => {
    const styles = StyleSheet.resolve(
      { width: '50vh' },
      { width: 200, height: 400 },
    );

    expect(styles.width).toBe(200);
  });

  test('Should transform min/max width vh dimensions', () => {
    const styles = StyleSheet.resolve(
      { minWidth: '50vh', maxWidth: '20vh' },
      { width: 200, height: 400 },
    );

    expect(styles.minWidth).toBe(200);
    expect(styles.maxWidth).toBe(80);
  });

  test('Should transform height in dimensions', () => {
    const styles = StyleSheet.resolve({ height: '1in' });

    expect(styles.height).toBe(72);
  });

  test('Should transform min/max height in dimensions', () => {
    const styles = StyleSheet.resolve({ minHeight: '1in', maxHeight: '2in' });

    expect(styles.minHeight).toBe(72);
    expect(styles.maxHeight).toBe(72 * 2);
  });

  test('Should transform height mm dimensions', () => {
    const styles = StyleSheet.resolve({ height: '1mm' });

    expect(styles.height).toBeCloseTo(2.83, 1);
  });

  test('Should transform min/max height mm dimensions', () => {
    const styles = StyleSheet.resolve({ minHeight: '1mm', maxHeight: '2mm' });

    expect(styles.minHeight).toBeCloseTo(2.83, 1);
    expect(styles.maxHeight).toBeCloseTo(2.83 * 2, 1);
  });

  test('Should transform height cm dimensions', () => {
    const styles = StyleSheet.resolve({ height: '1cm' });

    expect(styles.height).toBeCloseTo(28.346, 1);
  });

  test('Should transform min/max height cm dimensions', () => {
    const styles = StyleSheet.resolve({ minHeight: '1cm', maxHeight: '2cm' });

    expect(styles.minHeight).toBeCloseTo(28.346, 1);
    expect(styles.maxHeight).toBeCloseTo(28.346 * 2, 1);
  });

  test('Should transform expanded margin in dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted margin in dimensions', () => {
    const styles = StyleSheet.resolve({ margin: '1in' });

    expect(styles.marginTop).toBe(72);
    expect(styles.marginRight).toBe(72);
    expect(styles.marginBottom).toBe(72);
    expect(styles.marginLeft).toBe(72);
  });

  test('Should transform expanded padding in dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted padding in dimensions', () => {
    const styles = StyleSheet.resolve({ padding: '1in' });

    expect(styles.paddingTop).toBe(72);
    expect(styles.paddingRight).toBe(72);
    expect(styles.paddingBottom).toBe(72);
    expect(styles.paddingLeft).toBe(72);
  });

  test('Should transform expanded margin vw dimensions', () => {
    const styles = StyleSheet.resolve(
      {
        marginTop: '10vw',
        marginRight: '20vw',
        marginBottom: '30vw',
        marginLeft: '40vw',
      },
      { width: 200, height: 400 },
    );

    expect(styles.marginTop).toBe(20);
    expect(styles.marginRight).toBe(40);
    expect(styles.marginBottom).toBe(60);
    expect(styles.marginLeft).toBe(80);
  });

  test('Should transform compacted margin vw dimensions', () => {
    const styles = StyleSheet.resolve(
      { margin: '20vw' },
      { width: 200, height: 400 },
    );

    expect(styles.marginTop).toBe(40);
    expect(styles.marginRight).toBe(40);
    expect(styles.marginBottom).toBe(40);
    expect(styles.marginLeft).toBe(40);
  });

  test('Should transform expanded padding vw dimensions', () => {
    const styles = StyleSheet.resolve(
      {
        paddingTop: '10vw',
        paddingRight: '20vw',
        paddingBottom: '30vw',
        paddingLeft: '40vw',
      },
      { width: 200, height: 400 },
    );

    expect(styles.paddingTop).toBe(20);
    expect(styles.paddingRight).toBe(40);
    expect(styles.paddingBottom).toBe(60);
    expect(styles.paddingLeft).toBe(80);
  });

  test('Should transform compacted padding vw dimensions', () => {
    const styles = StyleSheet.resolve(
      { padding: '20vw' },
      { width: 200, height: 400 },
    );

    expect(styles.paddingTop).toBe(40);
    expect(styles.paddingRight).toBe(40);
    expect(styles.paddingBottom).toBe(40);
    expect(styles.paddingLeft).toBe(40);
  });

  test('Should transform expanded margin vh dimensions', () => {
    const styles = StyleSheet.resolve(
      {
        marginTop: '10vh',
        marginRight: '20vh',
        marginBottom: '30vh',
        marginLeft: '40vh',
      },
      { width: 200, height: 400 },
    );

    expect(styles.marginTop).toBe(40);
    expect(styles.marginRight).toBe(80);
    expect(styles.marginBottom).toBe(120);
    expect(styles.marginLeft).toBe(160);
  });

  test('Should transform compacted margin vh dimensions', () => {
    const styles = StyleSheet.resolve(
      { margin: '20vh' },
      { width: 200, height: 400 },
    );

    expect(styles.marginTop).toBe(80);
    expect(styles.marginRight).toBe(80);
    expect(styles.marginBottom).toBe(80);
    expect(styles.marginLeft).toBe(80);
  });

  test('Should transform expanded padding vh dimensions', () => {
    const styles = StyleSheet.resolve(
      {
        paddingTop: '10vh',
        paddingRight: '20vh',
        paddingBottom: '30vh',
        paddingLeft: '40vh',
      },
      { width: 200, height: 400 },
    );

    expect(styles.paddingTop).toBe(40);
    expect(styles.paddingRight).toBe(80);
    expect(styles.paddingBottom).toBe(120);
    expect(styles.paddingLeft).toBe(160);
  });

  test('Should transform compacted padding vh dimensions', () => {
    const styles = StyleSheet.resolve(
      { padding: '20vh' },
      { width: 200, height: 400 },
    );

    expect(styles.paddingTop).toBe(80);
    expect(styles.paddingRight).toBe(80);
    expect(styles.paddingBottom).toBe(80);
    expect(styles.paddingLeft).toBe(80);
  });

  test('Should transform expanded margin mm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted margin mm dimensions', () => {
    const styles = StyleSheet.resolve({ margin: '1mm' });

    expect(styles.marginTop).toBeCloseTo(2.83, 1);
    expect(styles.marginRight).toBeCloseTo(2.83, 1);
    expect(styles.marginBottom).toBeCloseTo(2.83, 1);
    expect(styles.marginLeft).toBeCloseTo(2.83, 1);
  });

  test('Should transform expanded padding mm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted padding mm dimensions', () => {
    const styles = StyleSheet.resolve({ padding: '1mm' });

    expect(styles.paddingTop).toBeCloseTo(2.83, 1);
    expect(styles.paddingRight).toBeCloseTo(2.83, 1);
    expect(styles.paddingBottom).toBeCloseTo(2.83, 1);
    expect(styles.paddingLeft).toBeCloseTo(2.83, 1);
  });

  test('Should transform expanded margin cm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted margin cm dimensions', () => {
    const styles = StyleSheet.resolve({ margin: '1cm' });

    expect(styles.marginTop).toBeCloseTo(28.346, 1);
    expect(styles.marginRight).toBeCloseTo(28.346, 1);
    expect(styles.marginBottom).toBeCloseTo(28.346, 1);
    expect(styles.marginLeft).toBeCloseTo(28.346, 1);
  });

  test('Should transform expanded padding cm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform compacted padding cm dimensions', () => {
    const styles = StyleSheet.resolve({ padding: '1cm' });

    expect(styles.paddingTop).toBeCloseTo(28.346, 1);
    expect(styles.paddingRight).toBeCloseTo(28.346, 1);
    expect(styles.paddingBottom).toBeCloseTo(28.346, 1);
    expect(styles.paddingLeft).toBeCloseTo(28.346, 1);
  });

  test('Should transform positions in in dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform positions in mm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform positions in cm dimensions', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform expanded borders in in', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform collapsed borders in in', () => {
    const styles = StyleSheet.resolve({ borderWidth: '1in' });

    expect(styles.borderTopWidth).toBe(72);
    expect(styles.borderRightWidth).toBe(72);
    expect(styles.borderBottomWidth).toBe(72);
    expect(styles.borderLeftWidth).toBe(72);
  });

  test('Should transform shortcut borders in in', () => {
    const styles = StyleSheet.resolve({ border: '1in solid red' });

    expect(styles.borderTopWidth).toBe(72);
    expect(styles.borderRightWidth).toBe(72);
    expect(styles.borderBottomWidth).toBe(72);
    expect(styles.borderLeftWidth).toBe(72);
  });

  test('Should transform expanded borders in vw', () => {
    const styles = StyleSheet.resolve(
      {
        borderTopWidth: '10vw',
        borderRightWidth: '20vw',
        borderBottomWidth: '30vw',
        borderLeftWidth: '40vw',
      },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(20);
    expect(styles.borderRightWidth).toBe(40);
    expect(styles.borderBottomWidth).toBe(60);
    expect(styles.borderLeftWidth).toBe(80);
  });

  test('Should transform collapsed borders in vw', () => {
    const styles = StyleSheet.resolve(
      { borderWidth: '20vw' },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(40);
    expect(styles.borderRightWidth).toBe(40);
    expect(styles.borderBottomWidth).toBe(40);
    expect(styles.borderLeftWidth).toBe(40);
  });

  test('Should transform shortcut borders in vw', () => {
    const styles = StyleSheet.resolve(
      { border: '20vw solid red' },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(40);
    expect(styles.borderRightWidth).toBe(40);
    expect(styles.borderBottomWidth).toBe(40);
    expect(styles.borderLeftWidth).toBe(40);
  });

  test('Should transform expanded borders in vh', () => {
    const styles = StyleSheet.resolve(
      {
        borderTopWidth: '10vh',
        borderRightWidth: '20vh',
        borderBottomWidth: '30vh',
        borderLeftWidth: '40vh',
      },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(40);
    expect(styles.borderRightWidth).toBe(80);
    expect(styles.borderBottomWidth).toBe(120);
    expect(styles.borderLeftWidth).toBe(160);
  });

  test('Should transform collapsed borders in vh', () => {
    const styles = StyleSheet.resolve(
      { borderWidth: '20vh' },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(80);
    expect(styles.borderRightWidth).toBe(80);
    expect(styles.borderBottomWidth).toBe(80);
    expect(styles.borderLeftWidth).toBe(80);
  });

  test('Should transform shortcut borders in vh', () => {
    const styles = StyleSheet.resolve(
      { border: '20vh solid red' },
      { width: 200, height: 400 },
    );

    expect(styles.borderTopWidth).toBe(80);
    expect(styles.borderRightWidth).toBe(80);
    expect(styles.borderBottomWidth).toBe(80);
    expect(styles.borderLeftWidth).toBe(80);
  });

  test('Should transform expanded borders in mm', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform collapsed borders in mm', () => {
    const styles = StyleSheet.resolve({ borderWidth: '1mm' });

    expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderRightWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(2.83, 1);
  });

  test('Should transform shortcut borders in mm', () => {
    const styles = StyleSheet.resolve({ border: '1mm solid red' });

    expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderRightWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(2.83, 1);
  });

  test('Should transform expanded borders in cm', () => {
    const styles = StyleSheet.resolve({
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

  test('Should transform collapsed borders in cm', () => {
    const styles = StyleSheet.resolve({ borderWidth: '1cm' });

    expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderRightWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(28.346, 1);
  });

  test('Should transform shortcut borders in cm', () => {
    const styles = StyleSheet.resolve({ border: '1cm solid red' });

    expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderRightWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(28.346, 1);
  });
});
