import isEqual from 'deep-equal';
import r from 'restructure';
import CFFOperand from './CFFOperand';
import { PropertyDescriptor } from 'restructure/src/utils';

export default class CFFDict {
  constructor(ops = []) {
    this.ops = ops;
    this.fields = {};
    for (let field of ops) {
      let key = Array.isArray(field[0]) ? field[0][0] << 8 | field[0][1] : field[0];
      this.fields[key] = field;
    }
  }

  decodeOperands(type, stream, ret, operands) {
    if (Array.isArray(type)) {
      return operands.map((op, i) => this.decodeOperands(type[i], stream, ret, [op]));
    } else if (type.decode != null) {
      return type.decode(stream, ret, operands);
    } else {
      switch (type) {
        case 'number':
        case 'offset':
        case 'sid':
          return operands[0];
        case 'boolean':
          return !!operands[0];
        default:
          return operands;
      }
    }
  }

  encodeOperands(type, stream, ctx, operands) {
    if (Array.isArray(type)) {
      return operands.map((op, i) => this.encodeOperands(type[i], stream, ctx, op)[0]);
    } else if (type.encode != null) {
      return type.encode(stream, operands, ctx);
    } else if (typeof operands === 'number') {
      return [operands];
    } else if (typeof operands === 'boolean') {
      return [+operands];
    } else if (Array.isArray(operands)) {
      return operands;
    } else {
      return [operands];
    }
  }

  decode(stream, parent) {
    let end = stream.pos + parent.length;
    let ret = {};
    let operands = [];

    // define hidden properties
    Object.defineProperties(ret, {
      parent:         { value: parent },
      _startOffset:   { value: stream.pos }
    });

    // fill in defaults
    for (let key in this.fields) {
      let field = this.fields[key];
      ret[field[1]] = field[3];
    }

    while (stream.pos < end) {
      let b = stream.readUInt8();
      if (b < 28) {
        if (b === 12) {
          b = (b << 8) | stream.readUInt8();
        }

        let field = this.fields[b];
        if (!field) {
          throw new Error(`Unknown operator ${b}`);
        }

        let val = this.decodeOperands(field[2], stream, ret, operands);
        if (val != null) {
          if (val instanceof PropertyDescriptor) {
            Object.defineProperty(ret, field[1], val);
          } else {
            ret[field[1]] = val;
          }
        }

        operands = [];
      } else {
        operands.push(CFFOperand.decode(stream, b));
      }
    }

    return ret;
  }

  size(dict, parent, includePointers = true) {
    let ctx = {
      parent,
      val: dict,
      pointerSize: 0,
      startOffset: parent.startOffset || 0
    };

    let len = 0;

    for (let k in this.fields) {
      let field = this.fields[k];
      let val = dict[field[1]];
      if (val == null || isEqual(val, field[3])) {
        continue;
      }

      let operands = this.encodeOperands(field[2], null, ctx, val);
      for (let op of operands) {
        len += CFFOperand.size(op);
      }

      let key = Array.isArray(field[0]) ? field[0] : [field[0]];
      len += key.length;
    }

    if (includePointers) {
      len += ctx.pointerSize;
    }

    return len;
  }

  encode(stream, dict, parent) {
    let ctx = {
      pointers: [],
      startOffset: stream.pos,
      parent,
      val: dict,
      pointerSize: 0
    };

    ctx.pointerOffset = stream.pos + this.size(dict, ctx, false);

    for (let field of this.ops) {
      let val = dict[field[1]];
      if (val == null || isEqual(val, field[3])) {
        continue;
      }

      let operands = this.encodeOperands(field[2], stream, ctx, val);
      for (let op of operands) {
        CFFOperand.encode(stream, op);
      }

      let key = Array.isArray(field[0]) ? field[0] : [field[0]];
      for (let op of key) {
        stream.writeUInt8(op);
      }
    }

    let i = 0;
    while (i < ctx.pointers.length) {
      let ptr = ctx.pointers[i++];
      ptr.type.encode(stream, ptr.val, ptr.parent);
    }

    return;
  }
}
