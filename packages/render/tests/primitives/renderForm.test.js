import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderFormField from '../../src/primitives/form/renderFormField';

describe('primitive renderFormField', () => {
  test('should render FormField correctly', () => {
    const ctx = createCTX();
    const args = 'example';
    const props = { name: args };
    const node = { type: P.FormField, props };

    renderFormField(ctx, node);

    expect(ctx.formField.mock.calls).toHaveLength(1);
    expect(ctx.formField.mock.calls[0]).toHaveLength(1);
    expect(ctx.formField.mock.calls[0][0]).toBe(args);
  });

  test.todo('FormField with one textInput direct child', () => {
    const ctx = createCTX();
    const node = { type: P.FormField, children: [{ type: P.TextInput }] };

    renderFormField(ctx, node);

    expect(ctx.textInput.mock.calls).toHaveLength(1);
  });

  test.todo('FormField with one TextInput indirect child', () => {
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

    renderFormField(ctx, node);

    expect(ctx.textInput.mock.calls).toHaveLength(1);
  });
});
