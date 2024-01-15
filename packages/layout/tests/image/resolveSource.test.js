import { describe, expect, it } from '@jest/globals';

import resolveSource from '../../src/image/resolveSource';

const SOURCE_URL = 'gotcha';
const SOURCE_URL_OBJECT = { uri: 'gotcha', method: 'GET' };
const SOURCE_BUFFER = Buffer.from('gotcha');
const SOURCE_DATA_BUFFER = { data: Buffer.from('gotcha'), format: 'png' };

describe('image resolveSource', () => {
  describe('source', () => {
    it('resolves url', () => {
      expect(resolveSource(SOURCE_URL)).resolves.toEqual({ uri: SOURCE_URL });
    });

    it('resolves url object', () => {
      expect(resolveSource(SOURCE_URL_OBJECT)).resolves.toBe(SOURCE_URL_OBJECT);
    });

    it('resolves buffer', () => {
      expect(resolveSource(SOURCE_BUFFER)).resolves.toBe(SOURCE_BUFFER);
    });

    it('resolves data buffer', () => {
      expect(resolveSource(SOURCE_DATA_BUFFER)).resolves.toBe(
        SOURCE_DATA_BUFFER,
      );
    });
  });

  describe('async', () => {
    it('resolves url', () => {
      expect(resolveSource(Promise.resolve(SOURCE_URL))).resolves.toEqual({
        uri: SOURCE_URL,
      });
    });

    it('resolves url object', () => {
      expect(resolveSource(Promise.resolve(SOURCE_URL_OBJECT))).resolves.toBe(
        SOURCE_URL_OBJECT,
      );
    });

    it('resolves buffer', () => {
      expect(resolveSource(Promise.resolve(SOURCE_BUFFER))).resolves.toBe(
        SOURCE_BUFFER,
      );
    });

    it('resolves data buffer', () => {
      expect(resolveSource(Promise.resolve(SOURCE_DATA_BUFFER))).resolves.toBe(
        SOURCE_DATA_BUFFER,
      );
    });
  });

  describe('factory', () => {
    it('resolves url', () => {
      expect(resolveSource(() => SOURCE_URL)).resolves.toEqual({
        uri: SOURCE_URL,
      });
    });

    it('resolves url object', () => {
      expect(resolveSource(() => SOURCE_URL_OBJECT)).resolves.toBe(
        SOURCE_URL_OBJECT,
      );
    });

    it('resolves buffer', () => {
      expect(resolveSource(() => SOURCE_BUFFER)).resolves.toBe(SOURCE_BUFFER);
    });

    it('resolves data buffer', () => {
      expect(resolveSource(() => SOURCE_DATA_BUFFER)).resolves.toBe(
        SOURCE_DATA_BUFFER,
      );
    });

    it('resolves undefined', () => {
      expect(resolveSource(() => undefined)).resolves.toBe(undefined);
    });
  });

  describe('async factory', () => {
    it('resolves url', () => {
      expect(resolveSource(async () => SOURCE_URL)).resolves.toEqual({
        uri: SOURCE_URL,
      });
    });

    it('resolves url object', () => {
      expect(resolveSource(async () => SOURCE_URL_OBJECT)).resolves.toBe(
        SOURCE_URL_OBJECT,
      );
    });

    it('resolves buffer', () => {
      expect(resolveSource(async () => SOURCE_BUFFER)).resolves.toBe(
        SOURCE_BUFFER,
      );
    });

    it('resolves data buffer', () => {
      expect(resolveSource(async () => SOURCE_DATA_BUFFER)).resolves.toBe(
        SOURCE_DATA_BUFFER,
      );
    });

    it('resolves undefined', () => {
      expect(resolveSource(async () => undefined)).resolves.toBe(undefined);
    });
  });
});
