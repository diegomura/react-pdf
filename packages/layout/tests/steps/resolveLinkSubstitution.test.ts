import { describe, expect, test } from 'vitest';

import resolveLinkSubstitution from '../../src/steps/resolveLinkSubstitution';

describe('layout resolve link substitution', () => {
  test('Should leave link with text children as it is', () => {
    const result = resolveLinkSubstitution({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [
                {
                  type: 'TEXT',
                  props: {},
                },
              ],
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should replace link with only one text instance as children', () => {
    const result = resolveLinkSubstitution({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [{ type: 'TEXT_INSTANCE', value: '1' }],
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should replace link with only many text instances as children', () => {
    const result = resolveLinkSubstitution({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          children: [
            {
              type: 'LINK',
              props: { src: 'url' },
              children: [
                { type: 'TEXT_INSTANCE', value: '1' },
                { type: 'TEXT_INSTANCE', value: '2' },
                { type: 'TEXT_INSTANCE', value: '3' },
                { type: 'TEXT_INSTANCE', value: '4' },
              ],
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should replace link with render prop', () => {
    const result = resolveLinkSubstitution({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          children: [
            {
              type: 'LINK',
              props: {
                render: () => null,
              },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});
