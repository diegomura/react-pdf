import { describe, expect, test } from 'vitest';

import { resolveXLinks } from '../../src/steps/resolveSvg';
import { SafeSvgNode } from '../../src/types';

describe('layout resolveSvg', () => {
  describe('resolve xlinks', () => {
    test('should replace xlinkHref with the correct node', () => {
      const node: SafeSvgNode = {
        type: 'SVG',
        props: {},
        style: {},
        children: [
          {
            type: 'DEFS',
            children: [
              {
                type: 'LINEAR_GRADIENT',
                props: { id: 'lg1' },
                children: [
                  {
                    type: 'STOP',
                    props: { offset: 0, stopColor: 'red' },
                  },
                  {
                    type: 'STOP',
                    props: { offset: 100, stopColor: 'blue' },
                  },
                ],
              },
              {
                type: 'LINEAR_GRADIENT',
                props: { id: 'lg2', x1: 10, xlinkHref: '#lg1' },
              },
            ],
          },
        ],
      };

      const result = resolveXLinks(node);

      expect(result.children![0].type).toBe('DEFS');
      expect(result.children![0].children).toHaveLength(2);
      expect(result.children![0].children![1].props).toEqual({
        id: 'lg2',
        x1: 10,
      });
      expect(result.children![0].children![1].children).toHaveLength(2);
    });

    test('should not replace xlinkHref if node does not exist', () => {
      const node: SafeSvgNode = {
        type: 'SVG',
        props: {},
        style: {},
        children: [
          {
            type: 'DEFS',
            children: [
              {
                type: 'LINEAR_GRADIENT',
                props: { id: 'lg2', x1: 10, xlinkHref: '#lg1' },
              },
            ],
          },
        ],
      };

      const result = resolveXLinks(node);

      expect(result.children![0].type).toBe('DEFS');
      expect(result.children![0].children).toHaveLength(1);
      expect(result.children![0].children![0].children).toBeFalsy();
    });
  });
});
