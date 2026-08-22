import { PlacedItem } from '../types';
import { FlowNode, PlacedNode } from './types';

// Structural items dissolve into positions: a spacer's space and a synthetic
// wrapper's nesting are already in the accumulated y. Data-bearing items come
// out as placed nodes whose children are relative to the parent's border box.
const rebuild = (placed: PlacedItem, origin: number): PlacedNode[] => {
  const node = placed.item.data as FlowNode | undefined;
  const top = origin + placed.y;

  if (!node) {
    return (placed.children || []).flatMap((child) => rebuild(child, top));
  }

  const lead = placed.part.isFirst ? node.box.marginTop || 0 : 0;

  const data = 'data' in node ? node.data : undefined;
  const children = placed.children?.flatMap((child) => rebuild(child, -lead));

  return [
    { box: { top, height: placed.height }, part: placed.part, data, children },
  ];
};

const toPlaced = (page: PlacedItem[]): PlacedNode[] =>
  page.flatMap((item) => rebuild(item, 0));

export default toPlaced;
