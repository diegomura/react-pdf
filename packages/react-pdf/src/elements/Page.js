import Base from './Base';
import sizes from '../utils/pageSizes';

class Page extends Base {
  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
  };

  applyProps(props) {
    super.applyProps(props);

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

  async render() {
    const { size, orientation } = this.props;

    // Since Text needs it's parent layout, we need to calculate flexbox layout
    // for a first time, then ask each children to recalculate it's layout, to then
    // calculate flexbox's layout one more time based new widths and heights.
    this.layout.calculateLayout();
    // this.recalculateLayout();
    // this.layout.calculateLayout();

    this.root.addPage({ size, layout: orientation });

    if (this.style.backgroundColor) {
      this.root
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.root.page.width, this.root.page.height)
        .fill();
    }

    await this.renderChildren();
  }
}

export default Page;
