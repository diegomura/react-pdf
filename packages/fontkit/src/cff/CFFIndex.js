import r from 'restructure';

export default class CFFIndex {
  constructor(type) {
    this.type = type;
  }

  getCFFVersion(ctx) {
    while (ctx && !ctx.hdrSize) {
      ctx = ctx.parent;
    }

    return ctx ? ctx.version : -1;
  }

  decode(stream, parent) {
    let version = this.getCFFVersion(parent);
    let count = version >= 2
      ? stream.readUInt32BE()
      : stream.readUInt16BE();

    if (count === 0) {
      return [];
    }

    let offSize = stream.readUInt8();
    let offsetType;
    if (offSize === 1) {
      offsetType = r.uint8;
    } else if (offSize === 2) {
      offsetType = r.uint16;
    } else if (offSize === 3) {
      offsetType = r.uint24;
    } else if (offSize === 4) {
      offsetType = r.uint32;
    } else {
      throw new Error(`Bad offset size in CFFIndex: ${offSize} ${stream.pos}`);
    }

    let ret = [];
    let startPos = stream.pos + ((count + 1) * offSize) - 1;

    let start = offsetType.decode(stream);
    for (let i = 0; i < count; i++) {
      let end = offsetType.decode(stream);

      if (this.type != null) {
        let pos = stream.pos;
        stream.pos = startPos + start;

        parent.length = end - start;
        ret.push(this.type.decode(stream, parent));
        stream.pos = pos;
      } else {
        ret.push({
          offset: startPos + start,
          length: end - start
        });
      }

      start = end;
    }

    stream.pos = startPos + start;
    return ret;
  }

  size(arr, parent) {
    let size = 2;
    if (arr.length === 0) {
      return size;
    }

    let type = this.type || new r.Buffer;

    // find maximum offset to detminine offset type
    let offset = 1;
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      offset += type.size(item, parent);
    }

    let offsetType;
    if (offset <= 0xff) {
      offsetType = r.uint8;
    } else if (offset <= 0xffff) {
      offsetType = r.uint16;
    } else if (offset <= 0xffffff) {
      offsetType = r.uint24;
    } else if (offset <= 0xffffffff) {
      offsetType = r.uint32;
    } else {
      throw new Error("Bad offset in CFFIndex");
    }

    size += 1 + offsetType.size() * (arr.length + 1);
    size += offset - 1;

    return size;
  }

  encode(stream, arr, parent) {
    stream.writeUInt16BE(arr.length);
    if (arr.length === 0) {
      return;
    }

    let type = this.type || new r.Buffer;

    // find maximum offset to detminine offset type
    let sizes = [];
    let offset = 1;
    for (let item of arr) {
      let s = type.size(item, parent);
      sizes.push(s);
      offset += s;
    }

    let offsetType;
    if (offset <= 0xff) {
      offsetType = r.uint8;
    } else if (offset <= 0xffff) {
      offsetType = r.uint16;
    } else if (offset <= 0xffffff) {
      offsetType = r.uint24;
    } else if (offset <= 0xffffffff) {
      offsetType = r.uint32;
    } else {
      throw new Error("Bad offset in CFFIndex");
    }

    // write offset size
    stream.writeUInt8(offsetType.size());

    // write elements
    offset = 1;
    offsetType.encode(stream, offset);

    for (let size of sizes) {
      offset += size;
      offsetType.encode(stream, offset);
    }

    for (let item of arr) {
      type.encode(stream, item, parent);
    }

    return;
  }
}
