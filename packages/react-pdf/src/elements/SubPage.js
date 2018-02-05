import Base from './Base';
import warning from 'fbjs/lib/warning';
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

  resetMargins() {
    if (
      !!this.style.marginTop ||
      !!this.style.marginBottom ||
      !!this.style.marginLeft ||
      !!this.style.marginRight
    ) {
      warning(
        false,
        'Margin values are not allowed on Page element. Use padding instead.',
      );

      this.style.marginTop = 0;
      this.style.marginBottom = 0;
      this.style.marginLeft = 0;
      this.style.marginRight = 0;
    }
  }

  applyProps(props) {
    this.resetMargins();

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
    this.layout.calculateLayout();

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
