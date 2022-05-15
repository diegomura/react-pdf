import { createElement } from './element';

export default {
  image(href, x, y, width, height) {
    const image = createElement('image');
    const parent = this.closestGroupOrSvg();

    image.setAttribute('x', x);
    image.setAttribute('y', y);
    image.setAttribute('width', width);
    image.setAttribute('height', height);
    image.setAttribute('xlink:href', href);
    image.setAttribute('preserveAspectRatio', 'none');

    parent.appendChild(image);
  },
};
