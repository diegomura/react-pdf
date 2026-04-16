import { bench, describe } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
import { SafeDocumentNode, SafeNode } from '../../src/types';

const fontStore = new FontStore();

const createChildren = (count: number, pageHeight: number): SafeNode[] => {
  const childHeight = pageHeight / 10; // ~10 children per page
  const children: SafeNode[] = [];

  for (let i = 0; i < count; i += 1) {
    children.push({
      type: 'VIEW',
      style: { height: childHeight },
      props: {},
      children: [],
    } as unknown as SafeNode);
  }

  return children;
};

const createDocument = (
  childCount: number,
  yoga: ReturnType<Awaited<ReturnType<typeof loadYoga>>>,
): SafeDocumentNode => {
  const pageHeight = 792;

  return {
    type: 'DOCUMENT',
    yoga,
    props: {},
    children: [
      {
        type: 'PAGE',
        props: {},
        style: { width: 612, height: pageHeight },
        children: createChildren(childCount, pageHeight),
      },
    ],
  } as unknown as SafeDocumentNode;
};

const calcLayout = (node: SafeDocumentNode) =>
  resolvePagination(resolveDimensions(node, fontStore), fontStore);

describe('resolvePagination benchmark', async () => {
  const yoga = await loadYoga();

  bench('100 children (~10 pages)', () => {
    calcLayout(createDocument(100, yoga));
  });

  bench('500 children (~50 pages)', () => {
    calcLayout(createDocument(500, yoga));
  });

  bench('1000 children (~100 pages)', () => {
    calcLayout(createDocument(1000, yoga));
  });

  bench('2000 children (~200 pages)', () => {
    calcLayout(createDocument(2000, yoga));
  });
});
