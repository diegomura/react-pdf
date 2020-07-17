import resolve from '../src/resolve';

describe('stylesheet resolve', () => {
  test('should return empty object for undefined', () => {
    const style = undefined;
    const result = resolve({}, style);

    expect(result).toEqual({});
  });

  test('should return empty object for null', () => {
    const style = null;
    const result = resolve({}, style);

    expect(result).toEqual({});
  });

  test('should return empty object for empty object', () => {
    const style = {};
    const result = resolve({}, style);

    expect(result).toEqual({}, {});
  });

  test('should return identity for single style object', () => {
    const style = { color: 'red', textAlign: 'center' };
    const result = resolve({}, style);

    expect(result).toEqual(style);
  });

  test('should return identity for single style object array', () => {
    const style = [{ color: 'red', textAlign: 'center' }];
    const result = resolve({}, style);

    expect(result).toEqual(style[0]);
  });

  test('should return identity for single style object array with nil values', () => {
    const style = [null, { color: 'red', textAlign: 'center' }, undefined];
    const result = resolve({}, style);

    expect(result).toEqual(style[1]);
  });

  test('should return several style objects flatten', () => {
    const style = [
      { backgroundColor: 'black' },
      { color: 'red', textAlign: 'center' },
    ];
    const result = resolve({}, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return object of merged values from array', () => {
    const styles = [{ fontSize: 16, color: 'white' }, { color: 'green' }];
    const result = resolve({}, styles);

    return expect(result).toEqual({ fontSize: 16, color: 'green' });
  });

  test('should return flatten several style objects with nil values', () => {
    const style = [
      null,
      { backgroundColor: 'black' },
      undefined,
      { color: 'red', textAlign: 'center' },
      null,
    ];
    const result = resolve({}, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return flatten nested style objects', () => {
    const style = [
      { backgroundColor: 'black' },
      [{ color: 'red', textAlign: 'center' }],
    ];
    const result = resolve({}, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return flatten nested style objects with nil values', () => {
    const style = [
      null,
      { backgroundColor: 'black' },
      undefined,
      [null, { color: 'red', textAlign: 'center' }, undefined],
    ];
    const result = resolve({}, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should keep hex colors as they are', () => {
    const styles = resolve(
      {},
      { color: '#0000FF', backgroundColor: '#FF0000' },
    );

    expect(styles.color).toBe('#0000FF');
    expect(styles.backgroundColor).toBe('#FF0000');
  });

  test('should transform rgb colors to hexa', () => {
    const styles = resolve(
      {},
      { color: 'rgb(255, 0, 0)', backgroundColor: 'rgb(0, 0, 255)' },
    );

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0000FF');
  });

  test('should transform rgba colors to hexa', () => {
    const styles = resolve(
      {},
      {
        color: 'rgba(0, 255, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 0, 0.1)',
      },
    );

    expect(styles.color).toBe('#00FF0080');
    expect(styles.backgroundColor).toBe('#FFFF001A');
  });

  test('should transform hsl colors to hexa', () => {
    const styles = resolve(
      {},
      { color: 'hsl(0, 100%, 50%)', backgroundColor: 'hsl(204, 100%, 50%)' },
    );

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0099FF');
  });

  test('should transform hsla colors to hexa', () => {
    const styles = resolve(
      {},
      {
        color: 'hsla(0, 100%, 50%, 0.5)',
        backgroundColor: 'hsla(204, 100%, 50%, 1)',
      },
    );

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0099FF');
  });

  test('should transform border style correctly', () => {
    const styles = resolve({}, { border: '1in solid rgb(255, 0, 255)' });

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: '#FF00FF',
      borderLeftColor: '#FF00FF',
      borderRightColor: '#FF00FF',
      borderBottomColor: '#FF00FF',
      borderTopWidth: 72,
      borderLeftWidth: 72,
      borderRightWidth: 72,
      borderBottomWidth: 72,
    });
  });

  test('should transform specific border style correctly', () => {
    const styles = resolve({}, { borderTop: '3px dashed hsl(0, 100%, 50%)' });

    expect(styles).toEqual({
      borderTopWidth: 3,
      borderTopStyle: 'dashed',
      borderTopColor: '#FF0000',
    });
  });

  test('should transform margin horizontal style correctly', () => {
    const styles = resolve({}, { marginHorizontal: 4 });

    expect(styles).toEqual({
      marginLeft: 4,
      marginRight: 4,
    });
  });

  test('should transform margin vertical style correctly', () => {
    const styles = resolve({}, { marginVertical: '4' });

    expect(styles).toEqual({
      marginTop: 4,
      marginBottom: 4,
    });
  });

  test('should transform padding horizontal style correctly', () => {
    const styles = resolve({}, { paddingHorizontal: 4 });

    expect(styles).toEqual({
      paddingLeft: 4,
      paddingRight: 4,
    });
  });

  test('should transform padding vertical style correctly', () => {
    const styles = resolve({}, { paddingVertical: '4' });

    expect(styles).toEqual({
      paddingTop: 4,
      paddingBottom: 4,
    });
  });

  test('should transform margin style correctly', () => {
    const styles = resolve({}, { margin: 4 });

    expect(styles).toEqual({
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
    });
  });

  test('should transform margin axis shorthand style correctly', () => {
    const styles = resolve({}, { margin: '10 20' });

    expect(styles).toEqual({
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
    });
  });

  test('should transform margin shorthand style correctly', () => {
    const styles = resolve({}, { margin: '10 20 30 40' });

    expect(styles).toEqual({
      marginTop: 10,
      marginLeft: 40,
      marginRight: 20,
      marginBottom: 30,
    });
  });

  test('should transform padding style correctly', () => {
    const styles = resolve({}, { padding: 4 });

    expect(styles).toEqual({
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
    });
  });

  test('should transform padding axis shorthand style correctly', () => {
    const styles = resolve({}, { padding: '10 20' });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10,
    });
  });

  test('should transform padding shorthand style correctly', () => {
    const styles = resolve({}, { padding: '10 20 30 40' });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingLeft: 40,
      paddingRight: 20,
      paddingBottom: 30,
    });
  });

  test('should transform font weight correctly', () => {
    const styles = resolve({}, { fontWeight: 'ultrabold' });

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should resolve max-height media queries on narrow container', () => {
    const styles = resolve(
      { height: 300 },
      {
        fontSize: 10,
        '@media max-height: 500': {
          color: 'rgb(100, 0, 0)',
        },
      },
    );

    expect(styles).toEqual({
      fontSize: 10,
      color: '#640000',
    });
  });

  test('should resolve max-height media queries on wider container', () => {
    const styles = resolve(
      { height: 600 },
      {
        fontSize: 10,
        '@media max-height: 500': {
          color: 'red',
        },
      },
    );

    expect(styles).toEqual({ fontSize: 10 });
  });

  test('should resolve max-width media queries on narrow container', () => {
    const styles = resolve(
      { width: 300 },
      {
        fontSize: 10,
        '@media max-width: 500': {
          color: 'hsl(0, 100%, 50%)',
        },
      },
    );

    expect(styles).toEqual({
      fontSize: 10,
      color: '#FF0000',
    });
  });

  test('should resolve max-width media queries on wider container', () => {
    const styles = resolve(
      { width: 600 },
      {
        fontSize: 10,
        '@media max-width: 500': {
          color: 'red',
        },
      },
    );

    expect(styles).toEqual({ fontSize: 10 });
  });

  test('should resolve portrait media queries on portrait container', () => {
    const styles = resolve(
      { orientation: 'portrait' },
      {
        fontSize: 10,
        '@media orientation: portrait': {
          color: 'red',
        },
      },
    );

    expect(styles).toEqual({ color: 'red', fontSize: 10 });
  });

  test('should resolve portrait media queries on landscape container', () => {
    const styles = resolve(
      { orientation: 'landscape' },
      {
        fontSize: 10,
        '@media orientation: portrait': {
          color: 'red',
        },
      },
    );

    expect(styles).toEqual({ fontSize: 10 });
  });

  test('should resolve landscape media queries on landscape container', () => {
    const styles = resolve(
      { orientation: 'landscape' },
      {
        fontSize: 10,
        '@media orientation: landscape': {
          color: '#00FF00',
        },
      },
    );

    expect(styles).toEqual({ color: '#00FF00', fontSize: 10 });
  });

  test('should resolve landscape media queries on portrait container', () => {
    const styles = resolve(
      { orientation: 'portrait' },
      {
        fontSize: 10,
        '@media orientation: landscape': {
          color: 'red',
        },
      },
    );

    expect(styles).toEqual({ fontSize: 10 });
  });
});
