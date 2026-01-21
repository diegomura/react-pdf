import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';
import { SvgImage } from '@react-pdf/image';

import resolveSvgImages from '../../src/steps/resolveSvgImages';
import {
  SafeImageNode,
  SafeNode,
  SafePageNode,
  SafeSvgNode,
} from '../../src/types';

const createMockSvgImage = (): SvgImage => ({
  format: 'svg',
  width: 100,
  height: 100,
  data: '<svg></svg>',
  viewBox: { minX: 0, minY: 0, maxX: 100, maxY: 100 },
  children: [
    {
      type: 'RECT',
      props: { x: '10', y: '10', width: '80', height: '80', fill: 'blue' },
      children: [],
    },
    {
      type: 'CIRCLE',
      props: { cx: '50', cy: '50', r: '30', fill: 'red' },
      children: [],
    },
  ],
});

const createMockImageNode = (image?: SvgImage): SafeImageNode => ({
  type: P.Image,
  props: { src: 'test.svg' },
  style: { width: 200, height: 150 },
  image,
});

const createMockPageNode = (children: SafeNode[]): SafePageNode =>
  ({
    type: P.Page,
    props: {},
    style: {},
    children,
  }) as SafePageNode;

describe('resolveSvgImages', () => {
  test('Should convert ImageNode with SVG to SvgNode', () => {
    const svgImage = createMockSvgImage();
    const imageNode = createMockImageNode(svgImage);
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;

    expect(result.children?.length).toBe(1);
    expect(result.children?.[0].type).toBe(P.Svg);
  });

  test('Should preserve style from ImageNode', () => {
    const svgImage = createMockSvgImage();
    const imageNode = createMockImageNode(svgImage);
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;
    const svgNode = result.children?.[0] as SafeSvgNode;

    expect(svgNode.style.width).toBe(200);
    expect(svgNode.style.height).toBe(150);
  });

  test('Should convert SVG children', () => {
    const svgImage = createMockSvgImage();
    const imageNode = createMockImageNode(svgImage);
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;
    const svgNode = result.children?.[0] as SafeSvgNode;

    expect(svgNode.children?.length).toBe(2);
    expect(svgNode.children?.[0].type).toBe('RECT');
    expect(svgNode.children?.[1].type).toBe('CIRCLE');
  });

  test('Should not modify non-SVG ImageNodes', () => {
    const imageNode: SafeImageNode = {
      type: P.Image,
      props: { src: 'test.png' },
      style: {},
      image: {
        format: 'png',
        width: 100,
        height: 100,
        data: Buffer.from([]),
      },
    };
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;

    expect(result.children?.[0].type).toBe(P.Image);
  });

  test('Should not modify ImageNodes without image data', () => {
    const imageNode = createMockImageNode(undefined);
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;

    expect(result.children?.[0].type).toBe(P.Image);
  });

  test('Should process nested nodes', () => {
    const svgImage = createMockSvgImage();
    const imageNode = createMockImageNode(svgImage);
    const viewNode: SafeNode = {
      type: P.View,
      props: {},
      style: {},
      children: [imageNode],
    } as SafeNode;
    const pageNode = createMockPageNode([viewNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;
    const view = result.children?.[0] as SafeNode;

    expect(view.type).toBe(P.View);
    expect((view as any).children?.[0].type).toBe(P.Svg);
  });

  test('Should handle mixed content', () => {
    const svgImage = createMockSvgImage();
    const svgImageNode = createMockImageNode(svgImage);
    const pngImageNode: SafeImageNode = {
      type: P.Image,
      props: { src: 'test.png' },
      style: {},
      image: {
        format: 'png',
        width: 100,
        height: 100,
        data: Buffer.from([]),
      },
    };
    const pageNode = createMockPageNode([svgImageNode, pngImageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;

    expect(result.children?.length).toBe(2);
    expect(result.children?.[0].type).toBe(P.Svg);
    expect(result.children?.[1].type).toBe(P.Image);
  });

  test('Should use SVG dimensions when style dimensions not specified', () => {
    const svgImage = createMockSvgImage();
    const imageNode: SafeImageNode = {
      type: P.Image,
      props: { src: 'test.svg' },
      style: {},
      image: svgImage,
    };
    const pageNode = createMockPageNode([imageNode]);

    const result = resolveSvgImages(pageNode, null as any) as SafePageNode;
    const svgNode = result.children?.[0] as SafeSvgNode;

    expect(svgNode.style.width).toBe(100);
    expect(svgNode.style.height).toBe(100);
  });
});
