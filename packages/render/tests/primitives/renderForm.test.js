import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderFieldSet from '../../src/primitives/renderFieldSet';

describe('primitive renderFieldSet', () => {
  test('should render FieldSet correctly', () => {
    const ctx = createCTX();
    const args = 'example';
    const props = { name: args };
    const node = { type: P.FieldSet, props };

    renderFieldSet(ctx, node);

    expect(ctx.formField.mock.calls).toHaveLength(1);
    expect(ctx.formField.mock.calls[0]).toHaveLength(1);
    expect(ctx.formField.mock.calls[0][0]).toBe(args);
  });

  test.todo('FieldSet with one textInput direct child', () => {
    const ctx = createCTX();
    const node = { type: P.FieldSet, children: [{ type: P.TextInput }] };

    renderFieldSet(ctx, node);

    expect(ctx.textInput.mock.calls).toHaveLength(1);
  });

  test.todo('FieldSet with one TextInput indirect child', () => {
    const ctx = createCTX();
    const node = {
      type: P.TextInput,
      children: [
        {
          type: P.View,
          children: [
            {
              type: P.TextInput,
            },
          ],
        },
      ],
    };

    renderFieldSet(ctx, node);

    expect(ctx.textInput.mock.calls).toHaveLength(1);
  });
});
