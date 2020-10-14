import Base from './Base';
import { setDestination } from '../utils/url';

class View extends Base {
  static defaultProps = {
    wrap: true,
  };

  get name() {
    return 'View';
  }

  async render() {
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    if (this.style.overflow === 'hidden') this.clip();
    await this.renderChildren();
    this.drawBorders();
    setDestination(this);
    if (this.props.debug) this.debug();
    if (this.props.testID) this.registerTestId(this.props.testID);
    this.root.instance.restore();
  }
}

export default View;
