import Yoga from 'yoga-layout';

import setYogaStyle from './setYogaStyle';
import setYogaValue from './setYogaValue';
import setYogaAspectRatio from './setYogaAspectRatio';
import { measureText } from '../text';

const createYogaNodes = async (node, fontStore) => {
  const yogaNode = Yoga.Node.create();

  setYogaStyle(yogaNode, node.style);
  setYogaValue(yogaNode, 'width', node.style.width);
  setYogaValue(yogaNode, 'height', node.style.height);
  setYogaValue(yogaNode, 'minWidth', node.style.minWidth);
  setYogaValue(yogaNode, 'minHeight', node.style.minHeight);
  setYogaValue(yogaNode, 'maxWidth', node.style.maxWidth);
  setYogaValue(yogaNode, 'maxHeight', node.style.maxHeight);
  setYogaAspectRatio(yogaNode, node.style);

  if (node.style.margin) {
    setYogaValue(yogaNode, 'margin', node.style.margin);
  }
  if (node.style.marginVertical) {
    setYogaValue(yogaNode, 'marginVertical', node.style.marginVertical);
  }
  if (node.style.marginHorizontal) {
    setYogaValue(yogaNode, 'marginHorizontal', node.style.marginHorizontal);
  }
  if (node.style.marginTop) {
    setYogaValue(yogaNode, 'marginTop', node.style.marginTop);
  }
  if (node.style.marginBottom) {
    setYogaValue(yogaNode, 'marginBottom', node.style.marginBottom);
  }
  if (node.style.marginLeft) {
    setYogaValue(yogaNode, 'marginLeft', node.style.marginLeft);
  }
  if (node.style.marginRight) {
    setYogaValue(yogaNode, 'marginRight', node.style.marginRight);
  }

  if (node.style.padding) {
    setYogaValue(yogaNode, 'padding', node.style.padding);
  }
  if (node.style.paddingVertical) {
    setYogaValue(yogaNode, 'paddingVertical', node.style.paddingVertical);
  }
  if (node.style.paddingHorizontal) {
    setYogaValue(yogaNode, 'paddingHorizontal', node.style.paddingHorizontal);
  }
  if (node.style.paddingTop) {
    setYogaValue(yogaNode, 'paddingTop', node.style.paddingTop);
  }
  if (node.style.paddingBottom) {
    setYogaValue(yogaNode, 'paddingBottom', node.style.paddingBottom);
  }
  if (node.style.paddingLeft) {
    setYogaValue(yogaNode, 'paddingLeft', node.style.paddingLeft);
  }
  if (node.style.paddingRight) {
    setYogaValue(yogaNode, 'paddingRight', node.style.paddingRight);
  }

  if (node.type === 'TEXT') {
    const { width, height } = measureText(node, fontStore);

    yogaNode.setMeasureFunc((w, wMode, h, hMode) => {
      if (
        w === width &&
        h === height &&
        wMode === Yoga.MEASURE_MODE_EXACTLY &&
        hMode === Yoga.MEASURE_MODE_EXACTLY
      ) {
        return { width, height };
      }

      const measured = measureText(
        { ...node, style: { ...node.style, width: w } },
        fontStore,
      );

      return measured;
    });
  }

  if (node.children) {
    for (let i = 0; i < node.children.length; i += 1) {
      const child = node.children[i];
      const childYogaNode = await createYogaNodes(child, fontStore);
      yogaNode.insertChild(childYogaNode, i);
    }
  }

  if (node.style?.overflow === 'hidden') {
    for (let i = 0; i < yogaNode.getChildCount(); i += 1) {
      const child = node.children[i];
      const childYogaNode = yogaNode.getChild(i);

      if (child.style?.flexShrink === undefined) {
        childYogaNode.setFlexShrink(0);
      }
    }
  }

  return yogaNode;
};

export default createYogaNodes;
