import { Image, Svg } from '@react-pdf/primitives';
import { SvgImage, SvgNode as ParsedSvgNode } from '@react-pdf/image';

import { SafeNode, SafeImageNode, SafeSvgNode } from '../types';

const isSvgImage = (
  node: SafeNode,
): node is SafeImageNode & { image: SvgImage } =>
  node.type === Image && (node as SafeImageNode).image?.format === 'svg';

function convertParsedNode(node: ParsedSvgNode) {
  return {
    type: node.type,
    props: node.props,
    style: {},
    children: node.children?.map(convertParsedNode),
    ...('value' in node && { value: node.value as string }),
  };
}

function convertToSvgNode(
  imageNode: SafeImageNode,
  svgImage: SvgImage,
): SafeSvgNode {
  const width = imageNode.style?.width ?? svgImage.width;
  const height = imageNode.style?.height ?? svgImage.height;

  return {
    type: Svg,
    props: {
      width,
      height,
      viewBox: svgImage.viewBox,
      preserveAspectRatio: { align: 'xMidYMid', meetOrSlice: 'meet' },
    },
    style: { ...imageNode.style, width, height },
    box: imageNode.box,
    origin: imageNode.origin,
    yogaNode: imageNode.yogaNode,
    children: svgImage.children.map(convertParsedNode),
  };
}

/**
 * Resolve SVG images step.
 *
 * Converts ImageNodes containing SVG data into SvgNodes,
 * allowing them to be processed by the existing SVG rendering pipeline.
 */
function resolveSvgImages(node: SafeNode): SafeNode {
  if (isSvgImage(node)) {
    return convertToSvgNode(node, node.image);
  }

  if (!node.children) return node;

  return { ...node, children: node.children.map(resolveSvgImages) } as SafeNode;
}

export default resolveSvgImages;
