import Base from './Base';
import Rectangle from './Rectangle';
import Resources from './Resources';
import GraphicState from './GraphicState';
import sizes from '../utils/pageSizes';
import { pdfObject } from '../utils/pdf';

class Page extends Base {
  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
  };

  constructor(props, root) {
    super(props, root);

    this.resources = new Resources(null, root);
    this.graphicState = new GraphicState(null, root);

    this.graphicState.parent = this;
  }

  applyProps(props) {
    super.applyProps(props);

    props = Object.assign({}, Page.defaultProps, props);

    if (props.size) {
      const size = sizes[props.size];

      if (props.orientation === 'landscape') {
        this.layout.setWidth(size[1]);
        this.layout.setHeight(size[0]);
      } else {
        this.layout.setHeight(size[1]);
        this.layout.setWidth(size[0]);
      }
    }
  }

  createsBackgroundColor() {
    const layout = this.layout.getComputedLayout();

    return new Rectangle({ ...layout, style: this.style }, this.root);
  }

  renderContents() {
    const contents = [
      this.backgroundColor.ref(),
      this.graphicState.ref(),
      this.getChildrenRefs().join(' '),
    ].join(' ');

    return `[${contents}]`;
  }

  async render() {
    this.layout.calculateLayout();
    this.backgroundColor = this.createsBackgroundColor();

    const { width, height } = this.layout.getComputedLayout();

    const page =
      pdfObject(this.id, {
        Type: '/Page',
        Parent: this.parent.ref(),
        Contents: this.renderContents(),
        Resources: this.resources.ref(),
        MediaBox: `[0 0 ${width} ${height}]`,
      }) + '\n';

    this.offset = this.root.addOffset(page.length);

    return [
      page,
      this.backgroundColor.render(),
      this.graphicState.render(),
      this.resources.render(),
      await this.renderChildren(),
    ].join('');
  }
}

export default Page;
