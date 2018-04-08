import warning from 'fbjs/lib/warning';
import Base from './Base';

class SubPage extends Base {
  constructor(root, props, number) {
    super(root, props);

    this.number = number;
  }

  get size() {
    return this.parent.getSize();
  }

  get style() {
    return this.parent.style;
  }

  set style(style) {
    return style;
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

  applyProps() {
    super.applyProps();
    this.resetMargins();

    if (this.props.size) {
      const size = this.size;

      if (this.props.orientation === 'landscape') {
        this.layout.setWidth(size[1]);
        // this.layout.setHeight(size[0]);
      } else {
        // this.layout.setHeight(size[1]);
        this.layout.setWidth(size[0]);
      }
    }
  }

  getPage() {
    return this.parent;
  }

  splice(height) {
    this.layout.calculateLayout();

    const buffer = [];
    const result = this.clone();

    result.number = this.number + 1;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const isElementOutside = height < child.top;
      const shouldElementSplit = height < child.top + child.height;

      if (isElementOutside) {
        buffer.push(child);
      } else if (child.props.fixed) {
        result.appendChild(child.clone());
      } else if (child.props.break) {
        child.props.break = false;
        buffer.push(...this.children.slice(i));
      } else if (shouldElementSplit) {
        if (!child.props.wrap) {
          buffer.push(child);
        } else {
          result.appendChild(
            child.splice(height - child.top - this.paddingBottom),
          );
        }
      }
    }

    buffer.forEach(child => child.moveTo(result));

    result.applyProps();
    result.height = this.height + this.paddingBottom - height;

    return result;
  }

  async render(page) {
    const { orientation } = this.props;

    this.root.addPage({ size: this.size, layout: orientation, margin: 0 });

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
