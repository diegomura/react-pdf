import SVGElement from '@react-pdf/svgkit/dist/elements/SVGElement';

class SvgNode {
  static defaultProps = {};

  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.parent = null;
    this.document = null;
    this.element = null;
  }

  get name() {
    return 'SvgNode';
  }

  clone() {
    return new SvgNode(this.root, this.props);
  }

  render() {
    const ElementType = SVGElement.parsers['polygon'] || SVGElement;

    this.element = new ElementType(this.document, null, 'polygon', this.props);
    this.parent.element.childNodes.push(this.element);
    this.element.parse();
  }
}

export default SvgNode;
