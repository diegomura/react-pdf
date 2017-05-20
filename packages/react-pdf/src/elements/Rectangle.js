import Base from './Base';
import { toRGB } from '../utils/colors';
import { pdfObject, pdfStream } from '../utils/pdf';

class Rectangle extends Base {
  static defaultProps = {
    style: {},
  };

  render() {
    const { backgroundColor } = this.style;
    const { left, top, width, height } = this.props;

    const rect = [
      '/DeviceRGB cs',
      backgroundColor ? `${toRGB(backgroundColor)} scn` : '',
      backgroundColor ? `${left} ${top} ${width} ${height} re` : '',
      backgroundColor ? 'f' : '',
    ].join('\n');

    return pdfObject(this.id, pdfStream(rect)) + '\n';
  }
}

export default Rectangle;
