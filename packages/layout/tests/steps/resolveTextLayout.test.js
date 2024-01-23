import { describe, expect, test } from 'vitest';

import { loadYoga } from '../../src/yoga';

import resolveTextLayout from '../../src/steps/resolveTextLayout';
import resolveDimensions from '../../src/steps/resolveDimensions';

const getRoot = async (text = 'hello world', styles = {}) => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  children: [
    {
      type: 'PAGE',
      box: {},
      style: {
        width: 100,
        height: 100,
      },
      children: [
        {
          type: 'TEXT',
          box: {},
          style: styles,
          props: {},
          children: [
            {
              type: 'TEXT_INSTANCE',
              value: text,
            },
          ],
        },
      ],
    },
  ],
});

describe('text layout step', () => {
  const getText = root => root.children[0].children[0];

  test('should calculate lines for text while resolve dimensions', async () => {
    const root = await getRoot('text text text');
    const dimensions = resolveDimensions(root);

    expect(getText(dimensions).lines).toBeDefined();
  });

  test('should calculate lines for text width defined height', async () => {
    const root = await getRoot('text text text', { height: 50 });
    const dimensions = resolveDimensions(root);

    expect(getText(dimensions).lines).not.toBeDefined();

    const textLayout = resolveTextLayout(dimensions);

    expect(getText(textLayout).lines).toBeDefined();
  });

  test('should calculate lines for empty text', async () => {
    const root = await getRoot('');
    const dimensions = resolveDimensions(root);

    expect(getText(dimensions).lines).toBeDefined();
  });
});
