import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import addMetadata from '../../src/operations/addMetadata';

describe('operations addMetadata', () => {
  test('should not add title metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Title).toBeUndefined();
  });

  test('should add title metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { title: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Title).toBe('test');
  });

  test('should not add author metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Author).toBeUndefined();
  });

  test('should add author metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { author: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Author).toBe('test');
  });

  test('should not add keywords metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Keywords).toBeUndefined();
  });

  test('should add keywords metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { keywords: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Keywords).toBe('test');
  });

  test('should not add subject metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Subject).toBeUndefined();
  });

  test('should add subject metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { subject: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Subject).toBe('test');
  });

  test('should add default creator metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Creator).toBe('react-pdf');
  });

  test('should add default producer metadata if none provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    addMetadata(ctx, doc);

    expect(ctx.info.Producer).toBe('react-pdf');
  });

  test('should add creator metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { creator: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Creator).toBe('test');
  });

  test('should add producer metadata if provided', () => {
    const ctx = createCTX();
    const doc = { type: P.Document, props: { producer: 'test' } };

    addMetadata(ctx, doc);

    expect(ctx.info.Producer).toBe('test');
  });
});
