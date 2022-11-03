/* eslint-disable no-prototype-builtins */

/*
   PDFSecurity - represents PDF security settings
   By Yang Liu <hi@zesik.com>
 */

import MD5 from 'md5';

class PDFSecurity {
  static generateFileID(info = {}) {
    let infoStr = `${info.CreationDate.getTime()}\n`;

    for (let key in info) {
      if (!info.hasOwnProperty(key)) continue;
      infoStr += `${key}: ${info[key].valueOf()}\n`;
    }

    return Buffer.from(MD5(infoStr));
  }
}

export default PDFSecurity;
