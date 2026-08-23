import { describe, expect, test } from 'vitest';

import createPaginator from '../src/paginator';
import toItems from '../src/paginator/toItems';
import {
  Box,
  ContainerNode,
  FlowNode,
  LazyNode,
  LeafNode,
} from '../src/paginator/types';
import { ColumnItem, LazyItem, LeafItem, RowItem } from '../src/types';

const box = (top: number, height: number, rest: Partial<Box> = {}): Box => ({
  top,
  height,
  ...rest,
});

const leaf = (
  top: number,
  height: number,
  rest: Partial<LeafNode> = {},
): LeafNode => ({ box: box(top, height), ...rest });

const kinds = (items: { kind: string }[]) => items.map((item) => item.kind);

describe('flow to items', () => {
  test('leaf carries margin-box height and the flow node as data', () => {
    const node = leaf(10, 100, {
      id: 'a',
      data: 'payload',
      box: box(10, 100, { marginTop: 10, marginBottom: 5 }),
    });

    const [item] = toItems([node]).children as LeafItem[];

    expect(item).toMatchObject({ kind: 'leaf', height: 115, id: 'a' });
    expect((item.data as LeafNode).data).toBe('payload');
  });

  test('space between siblings becomes a collapsing spacer', () => {
    const first = leaf(0, 100);
    const second = leaf(130, 80);

    const items = toItems([first, second]).children;

    expect(kinds(items)).toEqual(['leaf', 'spacer', 'leaf']);
    expect(items[1]).toMatchObject({ height: 30 });

    const spacer = items[1] as LeafItem;
    expect(spacer.split!(12)).toMatchObject({
      current: { height: 12 },
      next: { height: 0 },
    });
  });

  test('break becomes a force penalty, except before the first child', () => {
    const first = leaf(0, 100, { break: true });
    const second = leaf(100, 80, { break: true });

    const items = toItems([first, second]).children;

    expect(items).toMatchObject([
      { kind: 'leaf' },
      { kind: 'penalty', type: 'force' },
      { kind: 'leaf' },
    ]);
  });

  test('minPresenceAhead becomes a forbid window after the node', () => {
    const first = leaf(0, 100, { minPresenceAhead: 50 });
    const second = leaf(100, 80);

    const items = toItems([first, second]).children;

    expect(items).toMatchObject([
      { kind: 'leaf' },
      { kind: 'penalty', type: 'forbid', ahead: 50 },
      { kind: 'leaf' },
    ]);
  });

  test('repeat rides onto the item', () => {
    const [item] = toItems([leaf(0, 100, { repeat: true })]).children;

    expect(item).toMatchObject({ kind: 'leaf', repeat: true });
  });

  test('absolutes are zero-height leaves and stay out of the gap math', () => {
    const first = leaf(0, 100);
    const absolute = leaf(500, 50, { absolute: true, data: 'floating' });
    const second = leaf(100, 80);

    const items = toItems([first, absolute, second]).children;

    expect(kinds(items)).toEqual(['leaf', 'leaf', 'leaf']);
    expect(items[1]).toMatchObject({ kind: 'leaf', height: 0 });
    expect((items[1] as LeafItem).split).toBeUndefined();
  });

  test('split receives content height and returns converted leaves', () => {
    const seen: number[] = [];

    const node = leaf(0, 100, {
      box: box(0, 100, { marginTop: 10 }),
      split: (avail) => {
        seen.push(avail);
        return [
          leaf(0, avail, { data: 'current' }),
          leaf(0, 100 - avail, { data: 'next' }),
        ];
      },
    });

    const [item] = toItems([node]).children as LeafItem[];
    const result = item.split!(50);

    expect(seen).toEqual([40]);
    expect(result!.current).toMatchObject({ kind: 'leaf', height: 40 });
    expect((result!.current.data as LeafNode).data).toBe('current');
    expect((result!.next.data as LeafNode).data).toBe('next');
  });

  test('column edges stack as spacers around the body', () => {
    const container: ContainerNode = {
      box: box(0, 130, { marginTop: 10, edgeTop: 20 }),
      direction: 'column',
      children: [leaf(20, 100)],
    };

    const [column] = toItems([container]).children as ColumnItem[];

    expect(kinds(column.children)).toEqual(['spacer', 'leaf', 'spacer']);
    expect(column.children[0]).toMatchObject({ height: 30 });
    expect(column.children[2]).toMatchObject({ height: 10 });
  });

  test('row cells pushed down by alignment get a forbid-glued offset', () => {
    const container: ContainerNode = {
      box: box(0, 100),
      direction: 'row',
      children: [leaf(0, 100), leaf(20, 50)],
    };

    const [column] = toItems([container]).children as ColumnItem[];
    const [row] = column.children as RowItem[];

    expect(row.kind).toBe('row');
    expect(row.children[0]).toMatchObject({ kind: 'leaf', height: 100 });
    expect(row.children[1]).toMatchObject({
      kind: 'column',
      children: [
        { kind: 'spacer', height: 20 },
        { kind: 'penalty', type: 'forbid' },
        { kind: 'leaf', height: 50 },
      ],
    });
  });

  test('a column with vertically overlapping children demotes to a leaf', () => {
    const container: ContainerNode = {
      box: box(0, 100),
      direction: 'column',
      data: 'wrapped',
      children: [leaf(0, 80), leaf(30, 80)],
    };

    const [item] = toItems([container]).children as LeafItem[];

    expect(item).toMatchObject({ kind: 'leaf', height: 100 });
    expect((item.data as ContainerNode).data).toBe('wrapped');
    expect(item.split).toBeUndefined();
  });

  test('lazy materializes into converted items', () => {
    const node: LazyNode = {
      box: box(0, 100),
      materialize: ({ pageNumber }) => leaf(0, 40, { data: pageNumber }),
    };

    const [item] = toItems([node]).children as LazyItem[];
    const [materialized] = item.materialize({ pageNumber: 3 });

    expect(materialized).toMatchObject({ kind: 'leaf', height: 40 });
    expect(((materialized as LeafItem).data as LeafNode).data).toBe(3);
  });

  test('a node with children and split is rejected', () => {
    const invalid = {
      box: box(0, 100),
      children: [leaf(0, 100)],
      split: () => null,
    } as unknown as FlowNode;

    expect(() => toItems([invalid])).toThrow(/children/);
  });
});

describe('flow output', () => {
  test('placed nodes carry margin-box tops and the original data', () => {
    const paginator = createPaginator([
      leaf(0, 60, { data: 'a' }),
      leaf(60, 60, { data: 'b' }),
    ]);

    const first = paginator.next(100);
    expect(first).toMatchObject([
      {
        box: { top: 0, height: 60 },
        data: 'a',
        part: { isFirst: true, isLast: true },
      },
    ]);

    const second = paginator.next(100);
    expect(second).toMatchObject([{ box: { top: 0, height: 60 }, data: 'b' }]);
    expect(paginator.done).toBe(true);
  });

  test('split containers dissolve spacers into child positions', () => {
    const container: ContainerNode = {
      box: box(0, 120, { marginTop: 10 }),
      direction: 'column',
      data: 'parent',
      children: [leaf(0, 60, { data: 'a' }), leaf(60, 60, { data: 'b' })],
    };

    const paginator = createPaginator([container]);
    const [first] = paginator.next(80);

    expect(first).toMatchObject({
      data: 'parent',
      box: { top: 0 },
      part: { isFirst: true, isLast: false },
      children: [{ data: 'a', box: { top: 0, height: 60 } }],
    });

    const [second] = paginator.next(80);
    expect(second).toMatchObject({
      data: 'parent',
      part: { isFirst: false, isLast: true },
      children: [{ data: 'b', box: { top: 0, height: 60 } }],
    });
  });
});
