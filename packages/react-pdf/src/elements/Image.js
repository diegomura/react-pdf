import Yoga from 'yoga-layout';
import Base from './Base';
import JPEG from '../utils/jpeg';
const request = require('request');

class Image extends Base {
  image = null;

  constructor(root, props) {
    super(root, props);

    this.fetch = this.fetchImage();
    this.layout.setMeasureFunc(this.measureImage.bind(this));
  }

  measureImage(width, widthMode, height, heightMode) {
    console.log(`${widthMode} : ${width} - ${heightMode} : ${height}`);
    if (this.image) {
      if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
        return { height: width / this.image.getRatio() };
      }
    }
    return {};
  }

  async recalculateLayout() {
    this.image = await this.fetch;
    this.layout.markDirty();
  }

  async fetchImage() {
    return new Promise((resolve, reject) => {
      request(
        {
          url: this.props.src,
          method: 'GET',
          encoding: null,
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(new JPEG(body));
        },
      );
    });
  }

  async render() {
    const { left, top, width } = this.getAbsoluteLayout();

    this.root.image(this.image.getData(), left, top, { width });
  }
}

export default Image;
