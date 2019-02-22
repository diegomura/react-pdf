import SVGElement from '@react-pdf/svgkit/dist/elements/SVGElement';

class SvgNode {
  static defaultProps = {};

  constructor(root, props, type) {
    this.root = root;
    this.props = props;
    this.parent = null;
    this.document = null;
    this.element = null;
    this.children = [];
    this.type = type.toLowerCase();
  }

  get name() {
    return 'SvgNode';
  }

  appendChild(child) {
    child.parent = this;

    this.children.push(child);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].document = this.document;
      this.children[i].render();
    }
  }

  clone() {
    return new SvgNode(this.root, this.props, this.type);
  }

  render() {
    const ElementType = SVGElement.parsers[this.type] || SVGElement;

    this.element = new ElementType(
      this.document,
      this.parent.element,
      this.type,
      this.props,
    );

    this.parent.element.childNodes.push(this.element);

    this.renderChildren();

    this.element.parse();
  }
}

export default SvgNode;
