class WebPImage {
  label: string;
  width: number;
  height: number;
  image: any;
  obj: any;

  constructor(image: any, label: string) {
    this.label = label;
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.obj = null;
  }

  embed(document: any) {
    if (this.obj) return;

    const { width, height } = this;
    const pixelCount = width * height;
    const pixels = this.image.data;

    const rgbData = new Uint8Array(pixelCount * 3);
    const alphaData = new Uint8Array(pixelCount);

    let hasAlpha = false;
    let rgbIdx = 0;
    let alphaIdx = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      rgbData[rgbIdx++] = pixels[i];
      rgbData[rgbIdx++] = pixels[i + 1];
      rgbData[rgbIdx++] = pixels[i + 2];
      const a = pixels[i + 3];
      alphaData[alphaIdx++] = a;
      if (a < 255) hasAlpha = true;
    }

    let sMask: any = null;
    if (hasAlpha) {
      sMask = document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        Height: height,
        Width: width,
        BitsPerComponent: 8,
        ColorSpace: 'DeviceGray',
        Decode: [0, 1],
      });
      sMask.end(alphaData);
    }

    const imageDict: any = {
      Type: 'XObject',
      Subtype: 'Image',
      BitsPerComponent: 8,
      Width: width,
      Height: height,
      ColorSpace: 'DeviceRGB',
    };

    if (sMask) {
      imageDict.SMask = sMask;
    }

    this.obj = document.ref(imageDict);
    this.obj.end(rgbData);
  }
}

export default WebPImage;
