import { pick } from 'ramda';

import Node from './Node';
import StyleSheet from '../stylesheet';
import Debug from '../mixins/debug';
import Borders from '../mixins/borders';
import Clipping from '../mixins/clipping';
import Transform from '../mixins/transform';
import warning from '../utils/warning';
import matchPercent from '../utils/matchPercent';
import { inheritedProperties } from '../stylesheet/inherit';

// TODO
warning(!this.props.styles, '"styles" prop passed instead of "style" prop');

class Base extends Node {
  get origin() {
    const { transformOriginX, transformOriginY } = this.style;
    const { left, top, width, height } = this.getAbsoluteLayout();

    const percentX = matchPercent(transformOriginX);
    const percentY = matchPercent(transformOriginY);

    const offsetX = percentX ? width * percentX.percent : transformOriginX;
    const offsetY = percentY ? height * percentY.percent : transformOriginY;

    return [left + offsetX, top + offsetY];
  }

  set break(value) {
    this.props.break = value;
  }

  resolveStyles() {
    const { size, orientation, isAutoHeight } = this.page;
    const container = {
      orientation,
      isAutoHeight,
      width: size.width,
      height: size.height,
    };

    const ownStyles = StyleSheet.resolve(this.props.style, container);

    const inheritedStyles = this.parent
      ? pick(inheritedProperties, this.parent.style)
      : {};

    return { ...inheritedStyles, ...ownStyles };
  }

  getLayoutData() {
    const layout = this.getAbsoluteLayout();

    return {
      type: this.name,
      top: layout.top,
      left: layout.left,
      width: layout.width,
      style: this.style,
      height: layout.height,
      children: this.children.map(c => {
        return c.getLayoutData();
      }),
    };
  }

  drawBackgroundColor() {
    const { backgroundColor, opacity = 1 } = this.style;
    const { left, top, width, height } = this.getAbsoluteLayout();

    if (backgroundColor) {
      this.root.instance.save();

      this.clip();

      this.root.instance
        .fillOpacity(opacity)
        .fillColor(backgroundColor)
        .rect(left, top, width, height)
        .fill()
        .restore();
    }
  }

  onNodeSplit(height, clone) {
    this.calculateLayout();

    clone.marginTop = 0;
    clone.paddingTop = 0;

    // If a height was given to the element, we need to substract the remaining wrapping height
    // If not, we just let Yoga calculate the appropiate height when layout get's calculated.
    if (clone.style.height) {
      clone.height = this.height - height;
    }

    this.height = height;
    this.marginBottom = 0;
    this.paddingBottom = 0;
  }

  async renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render();
    }
  }
}

Object.assign(Base.prototype, Debug);
Object.assign(Base.prototype, Borders);
Object.assign(Base.prototype, Clipping);
Object.assign(Base.prototype, Transform);

export default Base;
