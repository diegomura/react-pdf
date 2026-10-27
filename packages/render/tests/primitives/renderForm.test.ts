import { describe, expect, test, vi } from 'vitest';
import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderFieldSet from '../../src/primitives/renderFieldSet';
import renderTextInput from '../../src/primitives/renderTextInput';
import renderCheckbox from '../../src/primitives/renderCheckbox';
import {
  SafeCheckboxNode,
  SafeFieldSetNode,
  SafeTextInputNode,
} from '@react-pdf/layout';

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

describe('primitive renderTextInput', () => {
  test('should keep MaxLen out of the field dict but on the annotation', () => {
    const ctx = createCTX();
    const box = { top: 0, left: 0, width: 100, height: 20 };
    const node = {
      type: P.TextInput,
      style: {},
      box,
      props: { name: 'example', maxLength: 7 },
    } as unknown as SafeTextInputNode;

    renderTextInput(ctx, node, { fieldSets: [], imageCache: new Map() });

    expect(ctx._fieldDict.mock.calls[0][2]).not.toHaveProperty('MaxLen');
    expect(ctx.page.annotations.at(-1).data).toMatchObject({
      Subtype: 'Widget',
      F: 4,
      MaxLen: 7,
    });
  });

  test('should omit MaxLen when maxLength is not set', () => {
    const ctx = createCTX();
    const box = { top: 0, left: 0, width: 100, height: 20 };
    const node = {
      type: P.TextInput,
      style: {},
      box,
      props: { name: 'example' },
    } as unknown as SafeTextInputNode;

    renderTextInput(ctx, node, { fieldSets: [], imageCache: new Map() });

    expect(ctx.page.annotations.at(-1).data).not.toHaveProperty('MaxLen');
  });
});

describe('primitive renderCheckbox', () => {
  test('should keep AP/AS out of the field dict but on the annotation', () => {
    const ctx = createCTX();
    ctx._acroform = { fonts: {} };
    ctx.ref = vi.fn(() => ({
      write: vi.fn(),
      end: vi.fn(),
    }));

    const box = { top: 0, left: 0, width: 20, height: 20 };
    const node = {
      type: P.Checkbox,
      style: {},
      box,
      props: { name: 'example', checked: true },
    } as unknown as SafeCheckboxNode;

    renderCheckbox(ctx, node, { fieldSets: [], imageCache: new Map() });

    expect(ctx._fieldDict.mock.calls[0][2]).not.toHaveProperty('AP');
    expect(ctx._fieldDict.mock.calls[0][2]).not.toHaveProperty('AS');

    const { data } = ctx.page.annotations.at(-1);
    expect(data).toMatchObject({ Subtype: 'Widget', F: 4, AS: 'Yes' });
    expect(data.AP.N).toHaveProperty('Yes');
    expect(data.AP.N).toHaveProperty('Off');
  });
});
