import { beforeEach, describe, expect, test, vi } from 'vitest';

const hyphenator = vi.fn((v) => {
  if (v === '') return '';
  if (v === 'something') return 'some\u00adthing';
  if (v === 'neumonia') return 'neu\u00admo\u00adnia';
  if (v === 'programming') return 'pro\u00adgram\u00adming';

  return v;
});

vi.mock('hyphen', () => ({ default: () => hyphenator }));

const wordHyphenation = (await import('../../src/engines/wordHyphenation'))
  .default;

const instance = wordHyphenation() as (word: null | string) => {
  parts: string[];
  hyphen?: '-';
};

describe('wordHyphenation', () => {
  beforeEach(() => {
    hyphenator.mockClear();
  });

  test('should return empty array if null param', () => {
    expect(instance(null).parts).toEqual([]);
    expect(hyphenator.mock.calls).toHaveLength(0);
  });

  test('should return empty part for empty string', () => {
    expect(instance('').parts).toEqual(['']);
    expect(hyphenator.mock.calls).toHaveLength(1);
  });

  test('should hyphenate word', () => {
    const word = 'something';
    const { parts, hyphen } = instance(word);

    expect(parts).toHaveLength(2);
    expect(parts[0]).toEqual('some');
    expect(parts[1]).toEqual('thing');
    expect(hyphen).toEqual('-');
    expect(hyphenator.mock.calls).toHaveLength(1);
  });

  test('should hyphenate word in many parts', () => {
    const word = 'neumonia';
    const { parts, hyphen } = instance(word);

    expect(parts).toHaveLength(3);
    expect(parts[0]).toEqual('neu');
    expect(parts[1]).toEqual('mo');
    expect(parts[2]).toEqual('nia');
    expect(hyphen).toEqual('-');
    expect(hyphenator.mock.calls).toHaveLength(1);
  });

  test('should hyphenate word with soft hyphen', () => {
    const word = 'so\u00admething';
    const { parts, hyphen } = instance(word);

    expect(parts).toHaveLength(2);
    expect(parts[0]).toEqual('so');
    expect(parts[1]).toEqual('mething');
    expect(hyphen).toEqual('-');
    expect(hyphenator.mock.calls).toHaveLength(0);
  });

  test('should hyphenate word with many soft hyphen', () => {
    const word = 'so\u00adme\u00adthing';
    const { parts, hyphen } = instance(word);

    expect(parts).toHaveLength(3);
    expect(parts[0]).toEqual('so');
    expect(parts[1]).toEqual('me');
    expect(parts[2]).toEqual('thing');
    expect(hyphen).toEqual('-');
    expect(hyphenator.mock.calls).toHaveLength(0);
  });

  test('should get previously hyphenated word from cache', () => {
    const word = 'programming';

    // Hyphen not called yet
    expect(hyphenator.mock.calls).toHaveLength(0);

    instance(word);

    // Hyphen called once for word
    expect(hyphenator.mock.calls).toHaveLength(1);

    const { parts, hyphen } = instance(word);

    expect(parts).toHaveLength(3);
    expect(parts[0]).toEqual('pro');
    expect(parts[1]).toEqual('gram');
    expect(parts[2]).toEqual('ming');
    expect(hyphen).toEqual('-');

    // Hyphen not called again. Got value from cache
    expect(hyphenator.mock.calls).toHaveLength(1);
  });
});
