/* eslint-disable no-prototype-builtins */

/*
   PDFSecurity - represents PDF security settings
   By Yang Liu <hi@zesik.com>
 */

// This file is ran directly with Node - needs to have .js extension
// eslint-disable-next-line import/extensions
import MD5 from 'crypto-js/md5.js';

const wordArrayToBuffer = wordArray => {
  const byteArray = [];

  for (let i = 0; i < wordArray.sigBytes; i++) {
    byteArray.push(
      (wordArray.words[Math.floor(i / 4)] >> (8 * (3 - (i % 4)))) & 0xff
    );
  }

  return Buffer.from(byteArray);
};

class PDFSecurity {
  static generateFileID(info = {}) {
    let infoStr = `${info.CreationDate.getTime()}\n`;

    for (let key in info) {
      if (!info.hasOwnProperty(key)) continue;
      infoStr += `${key}: ${info[key].valueOf()}\n`;
    }

    return wordArrayToBuffer(MD5(infoStr));
  }
}

export default PDFSecurity;
