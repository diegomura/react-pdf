import SVGDocument from '@react-pdf/svgkit/dist/SVGDocument';
import SVGElement from '@react-pdf/svgkit/dist/elements/SVGElement';

import Base from './Base';

class Svg extends Base {
  static defaultProps = {};

  constructor(root, props) {
    super(root, props);

    this.document = new SVGDocument();
  }

  get name() {
    return 'Svg';
  }

  appendChild(child) {
    child.parent = this;
    child.document = this.document;
    this.children.push(child);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].render();
    }
  }

  async render() {
    this.root.instance.save();
    this.root.instance.translate(this.top, this.left);

    this.document._width = this.width;
    this.document._height = this.height;

    const ElementType = SVGElement.parsers['svg'];
    this.element = new ElementType(this.document, null, 'svg', {});

    this.document.init(this.element);

    this.element.parse();

    this.renderChildren();

    this.document.draw(this.root.instance);

    this.root.instance.restore();

    if (this.props.debug) {
      this.debug();
    }
  }
}

export default Svg;
