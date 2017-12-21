import Base from './Base';
import sizes from '../utils/pageSizes';

class SubPage extends Base {
  getSize() {
    const { size } = this.props;

    if (typeof size === 'string') {
      return sizes[size];
    } else if (Array.isArray(size)) {
      return size;
    } else if (typeof size === 'object' && size.width && size.height) {
      return [size.width, size.height];
    } else {
      throw new Error(`Invalid Page size: ${size}`);
    }
  }

  applyProps(props) {
    super.applyProps(props);

    if (props.size) {
      const size = this.getSize();

      if (props.orientation === 'landscape') {
        this.layout.setWidth(size[1]);
        this.layout.setHeight(size[0]);
      } else {
        this.layout.setHeight(size[1]);
        this.layout.setWidth(size[0]);
      }
    }
  }

  async render(page) {
    const { orientation } = this.props;

    // Since Text needs it's parent layout,
    // we need to calculate flexbox layout for a first time.
    this.children.forEach(child => {
      child.layout.calculateLayout();
    });

    // Ask each children to recalculate it's layout.
    // This puts all Text nodes in a dirty state
    await this.recalculateLayout();

    // Finally, calculate flexbox's layout
    // one more time based new widths and heights.
    this.layout.calculateLayout();

    this.root.addPage({ size: this.getSize(), layout: orientation, margin: 0 });

    if (this.style.backgroundColor) {
      this.root
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.root.page.width, this.root.page.height)
        .fill();
    }

    await this.renderChildren(page);
  }
}

export default SubPage;
