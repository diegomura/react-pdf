import { describe, expect, test } from 'vitest';

import resolveLinkSubstitution from '../../src/steps/resolveLinkSubstitution';

describe('layout resolveStyles', () => {
  test('should leave link with text children as it is', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [
                {
                  type: 'TEXT',
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveLinkSubstitution(root);

    expect(result).toMatchSnapshot();
  });

  test('should replace link with only one text instance as children', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [{ type: 'TEXT_INSTANCE' }],
            },
          ],
        },
      ],
    };
    const result = resolveLinkSubstitution(root);

    expect(result).toMatchSnapshot();
  });

  test('should replace link with only many text instances as children', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [
                { type: 'TEXT_INSTANCE' },
                { type: 'TEXT_INSTANCE' },
                { type: 'TEXT_INSTANCE' },
                { type: 'TEXT_INSTANCE' },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveLinkSubstitution(root);

    expect(result).toMatchSnapshot();
  });

  test('should replace link with render prop', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [
            {
              type: 'LINK',
              props: { render: () => {} },
            },
          ],
        },
      ],
    };
    const result = resolveLinkSubstitution(root);

    expect(result).toMatchSnapshot();
  });
});
