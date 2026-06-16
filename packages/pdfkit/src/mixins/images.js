import PDFImage from '../image';

export default {
  initImages() {
    this._imageRegistry = {};
    this._imageCount = 0;
  },

  image(src, x, y, options = {}) {
    let bh, bp, bw, image, ip, left, left1, originX, originY;
    if (typeof x === 'object') {
      options = x;
      x = null;
    }

    // Ignore orientation based on document options or image options
    const ignoreOrientation =
      options.ignoreOrientation ||
      (options.ignoreOrientation !== false && this.options.ignoreOrientation);

    const inDocumentFlow = typeof y !== 'number';

    x = (left = x != null ? x : options.x) != null ? left : this.x;
    y = (left1 = y != null ? y : options.y) != null ? left1 : this.y;

    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      if (src.width && src.height) {
        image = src;
      } else {
        image = this.openImage(src);
      }
    }

    if (!image.obj) {
      image.embed(this);
    }

    if (this.page.xobjects[image.label] == null) {
      this.page.xobjects[image.label] = image.obj;
    }

    let { width, height } = image;

    // If EXIF orientation calls for it, swap width and height
    if (!ignoreOrientation && image.orientation > 4) {
      [width, height] = [height, width];
    }

    let w = options.width || width;
    let h = options.height || height;

    if (options.width && !options.height) {
      const wp = w / width;
      w = width * wp;
      h = height * wp;
    } else if (options.height && !options.width) {
      const hp = h / height;
      w = width * hp;
      h = height * hp;
    } else if (options.scale) {
      w = width * options.scale;
      h = height * options.scale;
    } else if (options.fit) {
      [bw, bh] = options.fit;
      bp = bw / bh;
      ip = width / height;
      if (ip > bp) {
        w = bw;
        h = bw / ip;
      } else {
        h = bh;
        w = bh * ip;
      }
    } else if (options.cover) {
      [bw, bh] = options.cover;
      bp = bw / bh;
      ip = width / height;
      if (ip > bp) {
        h = bh;
        w = bh * ip;
      } else {
        w = bw;
        h = bw / ip;
      }
    }

    if (options.fit || options.cover) {
      if (options.align === 'center') {
        x = x + bw / 2 - w / 2;
      } else if (options.align === 'right') {
        x = x + bw - w;
      }

      if (options.valign === 'center') {
        y = y + bh / 2 - h / 2;
      } else if (options.valign === 'bottom') {
        y = y + bh - h;
      }
    }

    // need to flip image by default because of the default transform matrix on the document
    let rotateAngle = 0;
    let xTransform = x;
    let yTransform = y;
    let hTransform = h;
    let wTransform = w;

    if (!ignoreOrientation) {
      switch (image.orientation) {
        // No orientation (need to flip image, though, because of the default transform matrix on the document)
        default:
        case 1:
          hTransform = -h;
          yTransform += h;

          break;
        // Flip Horizontal
        case 2:
          wTransform = -w;
          hTransform = -h;
          xTransform += w;
          yTransform += h;

          break;
        // Rotate 180 degrees
        case 3:
          originX = x;
          originY = y;

          hTransform = -h;
          xTransform -= w;

          rotateAngle = 180;
          break;
        // Flip vertical
        case 4:
          // Do nothing, image will be flipped

          break;
        // Flip horizontally and rotate 270 degrees CW
        case 5:
          originX = x;
          originY = y;

          wTransform = h;
          hTransform = w;
          yTransform -= hTransform;

          rotateAngle = 90;
          break;
        // Rotate 90 degrees CW
        case 6:
          originX = x;
          originY = y;

          wTransform = h;
          hTransform = -w;

          rotateAngle = 90;
          break;
        // Flip horizontally and rotate 90 degrees CW
        case 7:
          originX = x;
          originY = y;

          hTransform = -w;
          wTransform = -h;
          xTransform += h;

          rotateAngle = 90;
          break;
        // Rotate 270 degrees CW
        case 8:
          originX = x;
          originY = y;

          wTransform = h;
          hTransform = -w;
          xTransform -= h;
          yTransform += w;

          rotateAngle = -90;
          break;
      }
    } else {
      hTransform = -h;
      yTransform += h;
    }

    // create link annotations if the link option is given
    if (options.link != null) {
      this.link(x, y, w, h, options.link);
    }
    if (options.goTo != null) {
      this.goTo(x, y, w, h, options.goTo);
    }
    if (options.destination != null) {
      this.addNamedDestination(options.destination, 'XYZ', x, y, null);
    }

    // Set the current y position to below the image if it is in the document flow
    if (inDocumentFlow) {
      this.y += h;
    }

    this.save();

    if (options.opacity != null) {
      this._doOpacity(options.opacity, null);
    }

    if (rotateAngle) {
      this.rotate(rotateAngle, {
        origin: [originX, originY],
      });
    }

    this.transform(wTransform, 0, 0, hTransform, xTransform, yTransform);
    this.addContent(`/${image.label} Do`);
    this.restore();

    return this;
  },

  openImage(src) {
    let image;
    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      image = PDFImage.open(src, `I${++this._imageCount}`);
      if (typeof src === 'string') {
        this._imageRegistry[src] = image;
      }
    }

    return image;
  },
};
