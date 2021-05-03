const FLOAT_EOF = 0xf;
const FLOAT_LOOKUP = [
  '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '.', 'E', 'E-', null, '-'
];

const FLOAT_ENCODE_LOOKUP = {
  '.': 10,
  'E': 11,
  'E-': 12,
  '-': 14
};

export default class CFFOperand {
  static decode(stream, value) {
    if (32 <= value && value <= 246) {
      return value - 139;
    }

    if (247 <= value && value <= 250) {
      return (value - 247) * 256 + stream.readUInt8() + 108;
    }

    if (251 <= value && value <= 254) {
      return -(value - 251) * 256 - stream.readUInt8() - 108;
    }

    if (value === 28) {
      return stream.readInt16BE();
    }

    if (value === 29) {
      return stream.readInt32BE();
    }

    if (value === 30) {
      let str = '';
      while (true) {
        let b = stream.readUInt8();

        let n1 = b >> 4;
        if (n1 === FLOAT_EOF) { break; }
        str += FLOAT_LOOKUP[n1];

        let n2 = b & 15;
        if (n2 === FLOAT_EOF) { break; }
        str += FLOAT_LOOKUP[n2];
      }

      return parseFloat(str);
    }

    return null;
  }

  static size(value) {
    // if the value needs to be forced to the largest size (32 bit)
    // e.g. for unknown pointers, set to 32768
    if (value.forceLarge) {
      value = 32768;
    }

    if ((value | 0) !== value) { // floating point
      let str = '' + value;
      return 1 + Math.ceil((str.length + 1) / 2);

    } else if (-107 <= value && value <= 107) {
      return 1;

    } else if (108 <= value && value <= 1131 || -1131 <= value && value <= -108) {
      return 2;

    } else if (-32768 <= value && value <= 32767) {
      return 3;

    } else {
      return 5;
    }
  }

  static encode(stream, value) {
    // if the value needs to be forced to the largest size (32 bit)
    // e.g. for unknown pointers, save the old value and set to 32768
    let val = Number(value);

    if (value.forceLarge) {
      stream.writeUInt8(29);
      return stream.writeInt32BE(val);

    } else if ((val | 0) !== val) { // floating point
      stream.writeUInt8(30);

      let str = '' + val;
      for (let i = 0; i < str.length; i += 2) {
        let c1 = str[i];
        let n1 = FLOAT_ENCODE_LOOKUP[c1] || +c1;

        if (i === str.length - 1) {
          var n2 = FLOAT_EOF;
        } else {
          let c2 = str[i + 1];
          var n2 = FLOAT_ENCODE_LOOKUP[c2] || +c2;
        }

        stream.writeUInt8((n1 << 4) | (n2 & 15));
      }

      if (n2 !== FLOAT_EOF) {
        return stream.writeUInt8((FLOAT_EOF << 4));
      }

    } else if (-107 <= val && val <= 107) {
      return stream.writeUInt8(val + 139);

    } else if (108 <= val && val <= 1131) {
      val -= 108;
      stream.writeUInt8((val >> 8) + 247);
      return stream.writeUInt8(val & 0xff);

    } else if (-1131 <= val && val <= -108) {
      val = -val - 108;
      stream.writeUInt8((val >> 8) + 251);
      return stream.writeUInt8(val & 0xff);

    } else if (-32768 <= val && val <= 32767) {
      stream.writeUInt8(28);
      return stream.writeInt16BE(val);

    } else {
      stream.writeUInt8(29);
      return stream.writeInt32BE(val);
    }
  }
}
