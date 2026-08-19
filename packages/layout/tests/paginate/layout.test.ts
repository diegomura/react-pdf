import { describe, expect, test } from 'vitest';

import {
  SLOT_PROP,
  findSlot,
  instantiateTemplate,
} from '../../src/paginate/template';

const view = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  props: { style, children },
});

describe('template', () => {
  test('instantiates the layout with a slot wrapping the content', () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row' }, [children]);

    const content = [view({ height: 10 })];
    const nodes = instantiateTemplate(layout, content, { pageNumber: 1 });

    const slot = findSlot({ type: 'PAGE', children: nodes } as any);

    expect(slot).toBeTruthy();
    expect(SLOT_PROP in (slot as any).props).toBe(true);
    expect((slot as any).children).toHaveLength(1);
  });

  test('the layout receives its page props', () => {
    const seen: any[] = [];
    const layout = ({ children, ...props }: any) => {
      seen.push(props);
      return view({}, [children]);
    };

    instantiateTemplate(layout, [], { pageNumber: 3, totalPages: 7 });

    expect(seen).toEqual([{ pageNumber: 3, totalPages: 7 }]);
  });

  test('throws when the layout renders children twice or never', () => {
    const twice = ({ children }: any) => view({}, [children, children]);
    const never = () => view({}, []);

    expect(() =>
      instantiateTemplate(twice, [], { pageNumber: 1 }),
    ).toThrow(/exactly once/);
    expect(() =>
      instantiateTemplate(never, [], { pageNumber: 1 }),
    ).toThrow(/exactly once/);
  });
});
