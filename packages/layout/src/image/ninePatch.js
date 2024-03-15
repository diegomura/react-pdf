// import { createCanvas, loadImage } from "canvas";
import { Canvas, loadImage, Image } from "skia-canvas";

class NinePatch {
  // New version
  scaleImage(srcImg, newWidth, newHeight) {
    return new Promise(async (resolve, reject) => {

      // this.bgImage = await loadImage(srcImg);
      // const x = new Promise((res, rej) => {
      //   res(new Image(srcImg).decode());
      // });
      this.bgImage = new Image();
      this.bgImage.src = srcImg;
      await  this.bgImage.decode();
        let destWidth = newWidth;
        let destHeight = newHeight;

        // Create a temporary canvas to get the 9Patch index data.
        let cvs, ctx;
        cvs = new Canvas(destWidth, destHeight);
        ctx = cvs.getContext('2d');
        ctx.drawImage(this.bgImage, 0, 0);
        // Loop over each horizontal pixel and get piece
        let data = ctx.getImageData(0, 0, this.bgImage.width, 1).data;

        // Use the upper-left corner to get staticColor, use the upper-right corner
        // to get the repeatColor.
        let tmpLen = data.length - 4;
        let staticColor = this._getColorPattern(data[0], data[1], data[2], data[3]);
        let repeatColor = this._getColorPattern(data[tmpLen], data[tmpLen + 1], data[tmpLen + 2], data[tmpLen + 3]);

        this.horizontalPieces = this._getPieces(data, staticColor, repeatColor);

        // Loop over each vertical pixel and get piece
        data = ctx.getImageData(0, 0, 1, this.bgImage.height).data;
        this.verticalPieces = this._getPieces(data, staticColor, repeatColor);
        // console.log('here scale image onload');
        resolve(this._draw(destWidth, destHeight));
      // }
      // this.bgImage.onerror = error => reject(error);

    });
  }

  sliceBorder(srcImg, newWidth, newHeight) {
    return new Promise((resolve, reject) => {
      // Load 9patch from background-image
      this.bgImage = new Image();
      this.bgImage.crossOrigin = "Anonymous";
      this.bgImage.src = srcImg;
      this.bgImage.onload = () => {
        let srcWidth = this.bgImage.width - 2;
        let srcHeight = this.bgImage.height - 2;

        // Handle scale down
        let ratio = 1;
        if (newWidth < srcWidth || newHeight < srcHeight) {
          ratio = Math.max(srcWidth / newWidth, srcHeight / newHeight);
        }

        let dCtx, dCanvas;
        dCanvas = new Canvas((srcWidth * ratio).toFixed(), (srcHeight * ratio).toFixed());
        dCtx = dCanvas.getContext('2d');
        // dCanvas.width = (srcWidth * ratio).toFixed();
        // dCanvas.height = (srcHeight * ratio).toFixed();

        dCtx.drawImage(
          this.bgImage,
          1, 1,
          srcWidth, srcHeight,
          0, 0,
          dCanvas.width, dCanvas.height);

        resolve(dCanvas.toDataURL("image/png"));
      }
      this.bgImage.onerror = error => reject(error);
    });
  }

  /**
   * s: static, r: repeat, d: dynamic
   */
  _getType(tempColor, staticColor, repeatColor) {
    return (tempColor == staticColor ? 's' : (tempColor == repeatColor ? 'r' : 'd'));
  }

  _getColorPattern() {
    return Array.from(arguments).join(',');
  }

  _getPieces(data, staticColor, repeatColor) {
    let curType, tempPosition, tempWidth, tempColor, tempType;
    let tempArray = [];

    tempColor = this._getColorPattern(data[4], data[5], data[6], data[7]);
    curType = this._getType(tempColor, staticColor, repeatColor);
    tempPosition = 1;

    for (var i = 4, n = data.length - 4; i < n; i += 4) {
      tempColor = this._getColorPattern(data[i], data[i + 1], data[i + 2], data[i + 3]);
      tempType = this._getType(tempColor, staticColor, repeatColor);
      if (curType != tempType) {
        // box changed colors
        tempWidth = (i / 4) - tempPosition;
        tempArray.push([curType, tempPosition, tempWidth]);

        curType = tempType;
        tempPosition = i / 4;
        tempWidth = 1;
      }
    }

    // push end
    tempWidth = (i / 4) - tempPosition;
    tempArray.push([curType, tempPosition, tempWidth]);

    return tempArray;
  }

  _draw(dWidth, dHeight) {
    let dCanvas = new Canvas(dWidth, dHeight);
    let dCtx = dCanvas.getContext('2d');
    // dCanvas.width = dWidth;
    // dCanvas.height = dHeight;

    // Determine the width for the static and dynamic pieces
    let tempStaticWidth = 0;
    let tempDynamicCount = 0;

    for (let i = 0; i < this.horizontalPieces.length; i++) {
      if (this.horizontalPieces[i][0] == 's') {
        tempStaticWidth += this.horizontalPieces[i][2];
      } else {
        tempDynamicCount++;
      }
    }

    let totalDynamicWidth = (dWidth - tempStaticWidth) / tempDynamicCount;

    // Determine the height for the static and dynamic pieces
    var tempStaticHeight = 0;
    tempDynamicCount = 0;
    for (let i = 0; i < this.verticalPieces.length; i++) {
      if (this.verticalPieces[i][0] == 's') {
        tempStaticHeight += this.verticalPieces[i][2];
      } else {
        tempDynamicCount++;
      }
    }

    let totalDynamicHeight = (dHeight - tempStaticHeight) / tempDynamicCount;

    // Loop through each of the vertical/horizontal pieces and draw on
    // the canvas
    for (let i = 0; i < this.verticalPieces.length; i++) {
      for (let j = 0; j < this.horizontalPieces.length; j++) {
        let tempFillWidth = (this.horizontalPieces[j][0] == 'd') ? totalDynamicWidth : this.horizontalPieces[j][2];
        let tempFillHeight = (this.verticalPieces[i][0] == 'd') ? totalDynamicHeight : this.verticalPieces[i][2];

        // Stretching :
        let tempCanvas = new Canvas(this.horizontalPieces[j][2], this.verticalPieces[i][2]);
        // tempCanvas.width = this.horizontalPieces[j][2];
        // tempCanvas.height = this.verticalPieces[i][2];

        let tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(this.bgImage,
          this.horizontalPieces[j][1], this.verticalPieces[i][1],
          this.horizontalPieces[j][2], this.verticalPieces[i][2],
          0, 0,
          this.horizontalPieces[j][2], this.verticalPieces[i][2]);

        let tempPattern = dCtx.createPattern(tempCanvas, 'repeat');
        dCtx.fillStyle = tempPattern;
        dCtx.fillRect(
          0, 0,
          tempFillWidth, tempFillHeight);

        // Shift to next x position
        dCtx.translate(tempFillWidth, 0);
      }

      // shift back to 0 x and down to the next line
      dCtx.translate(-dWidth, (this.verticalPieces[i][0] == 's' ? this.verticalPieces[i][2] : totalDynamicHeight));
    }

    // store the canvas as the div's background
    return dCanvas.toDataURL("image/png");
  }

  _isTransparent(rgbArray) {
    return (rgbArray[0] == 0 && rgbArray[1] == 0 && rgbArray[2] == 0 && rgbArray[3] == 0);
  }

  _getOffsetFromCanvas(canvas, context) {
    let offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
    // Get top offset
    for (let y = 0; y < canvas.height; y++) {
      let p = context.getImageData(0, y, 1, 1).data;
      if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.top++;
      else break;
    }
    // Get bottom offset
    for (let y = canvas.height - 1; y >= 0; y--) {
      let p = context.getImageData(0, y, 1, 1).data;
      if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.bottom++;
      else break;
    }
    // Get left offset
    for (let x = 0; x < canvas.width; x++) {
      let p = context.getImageData(x, 0, 1, 1).data;
      if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.left++;
      else break;
    }
    // Get right offset
    for (let x = canvas.width - 1; x >= 0; x--) {
      let p = context.getImageData(x, 0, 1, 1).data;
      if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.right++;
      else break;
    }
    return offset;
  }

  getSize(srcImg) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => resolve({ width: image.width, height: image.height, url: srcImg });
      image.onerror = error => reject(error);
      image.src = srcImg;
    });
  }

  _scale(canvas, context, newCanvas, newContext, offset) {
    // copy top-left corner, ignore 1px from the left
    let rootX = 1, rootY = 1;
    let newX = 0, newY = 0;
    let imageData;
    if (offset.left - 1 > 0 && offset.top - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, offset.left - 1, offset.top - 1);
      newContext.putImageData(imageData, newX, newY);
    }

    // copy top-right corner, ignore 1px from the right
    rootX = canvas.width - offset.right; rootY = 1;
    newX = newCanvas.width - offset.right; newY = 0;
    if (offset.right - 1 > 0 && offset.top - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, offset.right - 1, offset.top - 1);
      newContext.putImageData(imageData, newX, newY);
    }

    // copy bottom-right corner
    rootX = canvas.width - offset.right; rootY = canvas.height - offset.bottom;
    newX = newCanvas.width - offset.right; newY = newCanvas.height - offset.bottom;
    imageData = context.getImageData(rootX, rootY, offset.right - 1, offset.bottom - 1);
    newContext.putImageData(imageData, newX, newY);

    // copy bottom-left corner
    rootX = 1; rootY = canvas.height - offset.bottom;
    newX = 0; newY = newCanvas.height - offset.bottom;
    if (offset.left - 1 > 0 && offset.bottom - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, offset.left - 1, offset.bottom - 1);
      newContext.putImageData(imageData, newX, newY);
    }

    // scale middle top
    rootX = offset.left; rootY = 1;
    if (offset.top - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, 1, offset.top - 1);
      for (let x = offset.left - 1; x <= newCanvas.width - offset.right; x++) {
        newContext.putImageData(imageData, x, 0);
      }
    }

    // scale middle bottom
    rootX = offset.left; rootY = canvas.height - offset.bottom;
    if (offset.bottom - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, 1, offset.bottom - 1);
      for (let x = offset.left - 1; x <= newCanvas.width - offset.right; x++) {
        newContext.putImageData(imageData, x, newCanvas.height - offset.bottom);
      }
    }

    // scale middle left
    rootX = 1; rootY = offset.top;
    if (offset.left - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, offset.left - 1, 1);
      for (let y = offset.top - 1; y <= newCanvas.height - offset.top; y++) {
        newContext.putImageData(imageData, 0, y);
      }
    }

    // scale middle right
    rootX = canvas.width - offset.right; rootY = offset.top;
    if (offset.right - 1 > 0) {
      imageData = context.getImageData(rootX, rootY, offset.right - 1, 1);
      for (let y = offset.top - 1; y <= newCanvas.height - offset.top; y++) {
        newContext.putImageData(imageData, newCanvas.width - offset.right, y);
      }
    }

    // scale center
    rootX = offset.left; rootY = offset.top;
    imageData = context.getImageData(rootX, rootY, 1, 1);
    for (let y = offset.top - 1; y <= newCanvas.height - offset.bottom; y++) {
      newContext.putImageData(imageData, offset.left - 1, y);
    }
    let centerHeight = newCanvas.height - offset.bottom - offset.top;
    if (centerHeight > 0) {
      imageData = newContext.getImageData(offset.left - 1, offset.top - 1, 1, newCanvas.height - offset.bottom - offset.top);
      for (let x = offset.left; x <= newCanvas.width - offset.right; x++) {
        newContext.putImageData(imageData, x, offset.top - 1);
      }
    }
  }

  _getOffset(srcImg) {
    return new Promise((resolve, reject) => {
      let offset = { top: 0, right: 0, bottom: 0, left: 0 }
      let canvas = new Canvas('canvas');
      let context = canvas.getContext('2d');
      let image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        // Get top offset
        for (let y = 0; y < canvas.height; y++) {
          let p = context.getImageData(0, y, 1, 1).data;
          if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.top++;
          else break;
        }
        // Get bottom offset
        for (let y = canvas.height - 1; y >= 0; y--) {
          let p = context.getImageData(0, y, 1, 1).data;
          if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.bottom++;
          else break;
        }
        // Get left offset
        for (let x = 0; x < canvas.width; x++) {
          let p = context.getImageData(x, 0, 1, 1).data;
          if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.left++;
          else break;
        }
        // Get right offset
        for (let x = canvas.width - 1; x >= 0; x--) {
          let p = context.getImageData(x, 0, 1, 1).data;
          if (this._isTransparent([p[0], p[1], p[2], p[3]])) offset.right++;
          else break;
        }
        resolve(offset);
      };
      image.onerror = error => reject(error);
      image.src = srcImg;
    });
  }
}

export default NinePatch;
