import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet flex', () => {
  test('should resolve flex shorthand', () => {
    const style = resolveStyle({ flex: '1 2 20%' });

    expect(style).toEqual({
      flexGrow: 1,
      flexShrink: 2,
      flexBasis: '20%',
    });
  });

  test('should resolve flex align content', () => {
    const styles = resolveStyle({ alignContent: 'center' });

    expect(styles).toEqual({ alignContent: 'center' });
  });

  test('should resolve flex align items', () => {
    const styles = resolveStyle({ alignItems: 'center' });

    expect(styles).toEqual({ alignItems: 'center' });
  });

  test('should resolve flex align self', () => {
    const styles = resolveStyle({ alignSelf: 'center' });

    expect(styles).toEqual({ alignSelf: 'center' });
  });

  test('should resolve flex direction', () => {
    const styles = resolveStyle({ flexDirection: 'row' });

    expect(styles).toEqual({ flexDirection: 'row' });
  });

  test('should resolve flex wrap', () => {
    const styles = resolveStyle({ flexWrap: 'wrap' });

    expect(styles).toEqual({ flexWrap: 'wrap' });
  });

  test('should resolve flex grow', () => {
    const styles = resolveStyle({ flexGrow: 1 });

    expect(styles).toEqual({ flexGrow: 1 });
  });

  test('should resolve string flex grow', () => {
    const styles = resolveStyle({ flexGrow: '1' });

    expect(styles).toEqual({ flexGrow: 1 });
  });

  test('should resolve flex shrink', () => {
    const styles = resolveStyle({ flexShrink: 1 });

    expect(styles).toEqual({ flexShrink: 1 });
  });

  test('should resolve string flex shrink', () => {
    const styles = resolveStyle({ flexShrink: '1' });

    expect(styles).toEqual({ flexShrink: 1 });
  });

  test('should resolve flex basis', () => {
    const styles = resolveStyle({ flexBasis: 1 });

    expect(styles).toEqual({ flexBasis: 1 });
  });

  test('should resolve string flex basis', () => {
    const styles = resolveStyle({ flexBasis: '1' });

    expect(styles).toEqual({ flexBasis: 1 });
  });

  test('should resolve flex basis percent', () => {
    const styles = resolveStyle({ flexBasis: '40%' });

    expect(styles).toEqual({ flexBasis: '40%' });
  });

  test('should resolve flex basis auto', () => {
    const styles = resolveStyle({ flexBasis: 'auto' });

    expect(styles).toEqual({ flexBasis: 'auto' });
  });

  test('should resolve flex justify content', () => {
    const styles = resolveStyle({ justifyContent: 'space-between' });

    expect(styles).toEqual({ justifyContent: 'space-between' });
  });

  test('should resolve flex justify self', () => {
    const styles = resolveStyle({ justifySelf: 'center' });

    expect(styles).toEqual({ justifySelf: 'center' });
  });

  test('should resolve flex flow', () => {
    const styles = resolveStyle({ flexFlow: 'row wrap' });

    expect(styles).toEqual({ flexFlow: 'row wrap' });
  });

  test('should resolve flex shorthand auto', () => {
    const style = resolveStyle({ flex: 'auto' });

    expect(style).toEqual({
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
    });
  });

  test('should resolve flex shorthand none', () => {
    const style = resolveStyle({ flex: 'none' });

    expect(style).toEqual({
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
    });
  });

  test('should resolve flex shorthand initial', () => {
    const style = resolveStyle({ flex: 'initial' });

    expect(style).toEqual({
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
    });
  });

  test('should resolve flex shorthand single value', () => {
    const style = resolveStyle({ flex: '2' });

    expect(style).toEqual({
      flexGrow: 2,
      flexShrink: 1,
      flexBasis: 0,
    });
  });

  test('should resolve flex shorthand two values', () => {
    const style = resolveStyle({ flex: '2 3' });

    expect(style).toEqual({
      flexGrow: 2,
      flexShrink: 3,
      flexBasis: 0,
    });
  });

  test('should resolve flex shorthand numeric value', () => {
    const style = resolveStyle({ flex: 1 });

    expect(style).toEqual({
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    });
  });

  test('should resolve flex basis with in unit', () => {
    const styles = resolveStyle({ flexBasis: '1in' });

    expect(styles).toEqual({ flexBasis: 72 });
  });

  test('should resolve flex basis with rem unit', () => {
    const styles = resolveStyle({ flexBasis: '2rem' });

    expect(styles).toEqual({ flexBasis: 20 });
  });

  test('should resolve flex basis with vw unit', () => {
    const styles = resolveStyle({ flexBasis: '50vw' });

    expect(styles).toEqual({ flexBasis: 100 });
  });
});
