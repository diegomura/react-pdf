import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import { SafeNode } from '@react-pdf/layout';

import createCTX from '../ctx';
import setDestination from '../../src/operations/setDestination';

describe('operations setDestination', () => {
  test('should call addNamedDestination method to passed context if id present', () => {
    const ctx = createCTX();
    const box = { top: 20 };
    const props = { id: 'test' };
    const doc = { type: P.View, style: {}, props, box } as SafeNode;
    const options = { registeredDestinations: new Set<string>() };

    setDestination(ctx, doc, options);

    expect(ctx.addNamedDestination.mock.calls).toHaveLength(1);
    expect(ctx.addNamedDestination.mock.calls[0][0]).toBe('test');
    expect(ctx.addNamedDestination.mock.calls[0][3]).toBe(20);
  });

  test('should not call addNamedDestination method to passed context if id missed', () => {
    const ctx = createCTX();
    const doc = { type: P.View, style: {}, props: {} } as SafeNode;
    const options = { registeredDestinations: new Set<string>() };

    setDestination(ctx, doc, options);

    expect(ctx.addNamedDestination.mock.calls).toHaveLength(0);
  });

  test('should only register the first occurrence of duplicate IDs (first wins)', () => {
    const ctx = createCTX();
    const options = { registeredDestinations: new Set<string>() };

    // First fragment (page 1)
    const fragment1 = {
      type: P.Text,
      style: {},
      props: { id: 'wrapped-text' },
      box: { top: 100 },
    } as SafeNode;

    // Second fragment (page 2) - should be ignored
    const fragment2 = {
      type: P.Text,
      style: {},
      props: { id: 'wrapped-text' },
      box: { top: 200 },
    } as SafeNode;

    setDestination(ctx, fragment1, options);
    setDestination(ctx, fragment2, options);

    // Should only be called once for the first fragment
    expect(ctx.addNamedDestination.mock.calls).toHaveLength(1);
    expect(ctx.addNamedDestination.mock.calls[0][0]).toBe('wrapped-text');
    expect(ctx.addNamedDestination.mock.calls[0][3]).toBe(100); // First fragment's y position

    // Verify the ID was tracked
    expect(options.registeredDestinations.has('wrapped-text')).toBe(true);
  });

  test('should allow different IDs to be registered', () => {
    const ctx = createCTX();
    const options = { registeredDestinations: new Set<string>() };

    const node1 = {
      type: P.Text,
      style: {},
      props: { id: 'destination-1' },
      box: { top: 100 },
    } as SafeNode;

    const node2 = {
      type: P.Text,
      style: {},
      props: { id: 'destination-2' },
      box: { top: 200 },
    } as SafeNode;

    setDestination(ctx, node1, options);
    setDestination(ctx, node2, options);

    // Both should be registered
    expect(ctx.addNamedDestination.mock.calls).toHaveLength(2);
    expect(ctx.addNamedDestination.mock.calls[0][0]).toBe('destination-1');
    expect(ctx.addNamedDestination.mock.calls[1][0]).toBe('destination-2');
    expect(options.registeredDestinations.size).toBe(2);
  });
});
