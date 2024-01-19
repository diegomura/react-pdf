import scriptItemizer from '../../src/engines/scriptItemizer';

const instance = scriptItemizer();

describe('scriptItemizer', () => {
  test('should return empty array for empty string', () => {
    const string = instance({ string: '' });

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should return empty array for null string', () => {
    const string = instance({ string: null });

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should return run with correct latin script', () => {
    const string = instance({ string: 'Lorem' });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(1);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 5);
    expect(string.runs[0].attributes).toHaveProperty('script', 'Latin');
  });

  test('should return run with correct non-latin script', () => {
    const string = '្ញុំអាចញ៉ាំកញ្';
    const value = instance({ string });

    expect(value).toHaveProperty('string', string);
    expect(value.runs).toHaveLength(1);
    expect(value.runs[0]).toHaveProperty('start', 0);
    expect(value.runs[0]).toHaveProperty('end', 14);
    expect(value.runs[0].attributes.script).toBe('Khmer');
  });

  test('should return runs with correct script for many scripts', () => {
    const string = '្ញុំអាចញ៉ាំកញ្Lorem';
    const value = instance({ string });

    expect(value).toHaveProperty('string', string);
    expect(value.runs).toHaveLength(2);
    expect(value.runs[0]).toHaveProperty('start', 0);
    expect(value.runs[0]).toHaveProperty('end', 14);
    expect(value.runs[0].attributes.script).toBe('Khmer');
    expect(value.runs[1]).toHaveProperty('start', 14);
    expect(value.runs[1]).toHaveProperty('end', 19);
    expect(value.runs[1].attributes.script).toBe('Latin');
  });
});
