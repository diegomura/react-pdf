import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderFieldSet from '../../src/primitives/renderFieldSet';
import { SafeFieldSetNode } from '@react-pdf/layout';

describe('primitive renderFieldSet', () => {
  test('should render FieldSet correctly', () => {
    const ctx = createCTX();
    const args = 'example';
    const props = { name: args };
    const node: SafeFieldSetNode = { type: P.FieldSet, props, style: {} };

    renderFieldSet(ctx, node, { fieldSets: [] });

    expect(ctx.formField.mock.calls).toHaveLength(1);
    expect(ctx.formField.mock.calls[0]).toHaveLength(1);
    expect(ctx.formField.mock.calls[0][0]).toBe(args);
  });

  test.todo('FieldSet with one textInput direct child', () => {
    const ctx = createCTX();
    const node: SafeFieldSetNode = {
      type: P.FieldSet,
      style: {},
      props: { name: 'example' },
      children: [{ type: P.TextInput, style: {}, props: {} }],
    };

    renderFieldSet(ctx, node, { fieldSets: [] });

    expect(ctx.textInput.mock.calls).toHaveLength(1);
  });
});
