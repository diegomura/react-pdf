import { createInstance } from '../src/elements';

describe('Elements', () => {
  test('Should create root instance', async () => {
    const instance = createInstance({ type: 'ROOT' });
    expect(instance.name).toBe('Root');
  });

  test('Should create document instance', async () => {
    const instance = createInstance({ type: 'DOCUMENT' });
    expect(instance.name).toBe('Document');
  });

  test('Should create page instance', async () => {
    const instance = createInstance({ type: 'PAGE' });
    expect(instance.name).toBe('Page');
  });

  test('Should create view instance', async () => {
    const instance = createInstance({ type: 'VIEW' });
    expect(instance.name).toBe('View');
  });

  test('Should create image instance', async () => {
    const instance = createInstance({ type: 'IMAGE' });
    expect(instance.name).toBe('Image');
  });

  test('Should create text instance', async () => {
    const instance = createInstance({ type: 'TEXT' });
    expect(instance.name).toBe('Text');
  });

  test('Should create link instance', async () => {
    const instance = createInstance({ type: 'LINK' });
    expect(instance.name).toBe('Link');
  });

  test('Should create note instance', async () => {
    const instance = createInstance({ type: 'NOTE' });
    expect(instance.name).toBe('Note');
  });

  test('Should create text instance instance', async () => {
    const instance = createInstance({ type: 'TEXT_INSTANCE' });
    expect(instance.name).toBe('TextInstance');
  });

  test('Should throw error if type non of the above', async () => {
    expect(() => createInstance({ type: 'div' })).toThrow();
  });
});
