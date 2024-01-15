import { describe, expect, test } from 'vitest';

import resolveBookmarks from '../../src/steps/resolveBookmarks';

describe('layout resolveBookmarks', () => {
  test('should keep nodes the same if no bookmark passed', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [{ type: 'VIEW', props: {} }],
        },
      ],
    };
    const result = resolveBookmarks(root);

    expect(result).toEqual(root);
  });

  test('should resolve bookmark in page node', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { bookmark: 'page' },
          children: [{ type: 'VIEW', props: {} }],
        },
      ],
    };
    const result = resolveBookmarks(root);

    expect(result.children[0].props.bookmark).toEqual({
      ref: 0,
      title: 'page',
      fit: false,
      expanded: false,
    });
  });

  test('should resolve bookmark hierarchy', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { bookmark: 'page' },
          children: [
            {
              type: 'VIEW',
              children: [
                {
                  type: 'VIEW',
                  children: [
                    {
                      type: 'VIEW',
                      props: {
                        bookmark: 'sub chapter',
                      },
                    },
                  ],
                  props: {
                    bookmark: 'chapter 1',
                  },
                },
              ],
              props: {},
            },
            {
              type: 'VIEW',
              props: {
                bookmark: 'chapter 2',
              },
            },
          ],
        },
      ],
    };
    const result = resolveBookmarks(root);
    const page = result.children[0];
    const view = page.children[1];
    const nestedView = page.children[0].children[0];
    const subNestedView = nestedView.children[0];

    expect(page.props.bookmark).toEqual({
      ref: 0,
      title: 'page',
      fit: false,
      expanded: false,
    });

    expect(view.props.bookmark).toEqual({
      ref: 1,
      parent: 0,
      title: 'chapter 2',
      fit: false,
      expanded: false,
    });

    expect(nestedView.props.bookmark).toEqual({
      ref: 2,
      parent: 0,
      title: 'chapter 1',
      fit: false,
      expanded: false,
    });

    expect(subNestedView.props.bookmark).toEqual({
      ref: 3,
      parent: 2,
      title: 'sub chapter',
      fit: false,
      expanded: false,
    });
  });

  test('should resolve bookmark object prop', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: {
            bookmark: {
              title: 'page',
              top: 20,
              left: 10,
              zoom: 5,
              expanded: true,
            },
          },
          children: [{ type: 'VIEW', props: {} }],
        },
      ],
    };
    const result = resolveBookmarks(root);

    expect(result.children[0].props.bookmark).toEqual({
      ref: 0,
      title: 'page',
      expanded: true,
      top: 20,
      left: 10,
      zoom: 5,
    });
  });
});
