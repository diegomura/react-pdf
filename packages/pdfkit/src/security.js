/*
   PDFSecurity - represents PDF security settings
   By Yang Liu <hi@zesik.com>
 */

import { concatBytes } from '@noble/hashes/utils';
import { md5Hash } from './crypto/md5';
import sha256Hash from './crypto/sha256';
import { aesCbcEncrypt, aesEcbEncrypt } from './crypto/aes';
import rc4 from './crypto/rc4';
import randomBytes from './crypto/random';
import saslprep from './saslprep/index';

class PDFSecurity {
  static generateFileID(info = {}) {
    let infoStr = `${info.CreationDate.getTime()}\n`;

    for (let key in info) {
      // eslint-disable-next-line no-prototype-builtins
      if (!info.hasOwnProperty(key)) {
        continue;
      }
      infoStr += `${key}: ${info[key].valueOf()}\n`;
    }

    return Buffer.from(md5Hash(infoStr));
  }

  static generateRandomWordArray(bytes) {
    return randomBytes(bytes);
  }

  static create(document, options = {}) {
    if (!options.ownerPassword && !options.userPassword) {
      return null;
    }
    return new PDFSecurity(document, options);
  }

  constructor(document, options = {}) {
    if (!options.ownerPassword && !options.userPassword) {
      throw new Error('None of owner password and user password is defined.');
    }

    this.document = document;
    this._setupEncryption(options);
  }

  _setupEncryption(options) {
    switch (options.pdfVersion) {
      case '1.4':
      case '1.5':
        this.version = 2;
        break;
      case '1.6':
      case '1.7':
        this.version = 4;
        break;
      case '1.7ext3':
        this.version = 5;
        break;
      default:
        this.version = 1;
        break;
    }

    const encDict = {
      Filter: 'Standard',
    };

    switch (this.version) {
      case 1:
      case 2:
      case 4:
        this._setupEncryptionV1V2V4(this.version, encDict, options);
        break;
      case 5:
        this._setupEncryptionV5(encDict, options);
        break;
    }

    this.dictionary = this.document.ref(encDict);
  }

  _setupEncryptionV1V2V4(v, encDict, options) {
    let r, permissions;
    switch (v) {
      case 1:
        r = 2;
        this.keyBits = 40;
        permissions = getPermissionsR2(options.permissions);
        break;
      case 2:
        r = 3;
        this.keyBits = 128;
        permissions = getPermissionsR3(options.permissions);
        break;
      case 4:
        r = 4;
        this.keyBits = 128;
        permissions = getPermissionsR3(options.permissions);
        break;
    }

    const paddedUserPassword = processPasswordR2R3R4(options.userPassword);
    const paddedOwnerPassword = options.ownerPassword
      ? processPasswordR2R3R4(options.ownerPassword)
      : paddedUserPassword;

    const ownerPasswordEntry = getOwnerPasswordR2R3R4(
      r,
      this.keyBits,
      paddedUserPassword,
      paddedOwnerPassword,
    );
    this.encryptionKey = getEncryptionKeyR2R3R4(
      r,
      this.keyBits,
      this.document._id,
      paddedUserPassword,
      ownerPasswordEntry,
      permissions,
    );
    let userPasswordEntry;
    if (r === 2) {
      userPasswordEntry = getUserPasswordR2(this.encryptionKey);
    } else {
      userPasswordEntry = getUserPasswordR3R4(
        this.document._id,
        this.encryptionKey,
      );
    }

    encDict.V = v;
    if (v >= 2) {
      encDict.Length = this.keyBits;
    }
    if (v === 4) {
      encDict.CF = {
        StdCF: {
          AuthEvent: 'DocOpen',
          CFM: 'AESV2',
          Length: this.keyBits / 8,
        },
      };
      encDict.StmF = 'StdCF';
      encDict.StrF = 'StdCF';
    }
    encDict.R = r;
    encDict.O = Buffer.from(ownerPasswordEntry);
    encDict.U = Buffer.from(userPasswordEntry);
    encDict.P = permissions;
  }

  _setupEncryptionV5(encDict, options) {
    this.keyBits = 256;
    const permissions = getPermissionsR3(options.permissions);

    const processedUserPassword = processPasswordR5(options.userPassword);
    const processedOwnerPassword = options.ownerPassword
      ? processPasswordR5(options.ownerPassword)
      : processedUserPassword;

    this.encryptionKey = getEncryptionKeyR5(
      PDFSecurity.generateRandomWordArray,
    );
    const userPasswordEntry = getUserPasswordR5(
      processedUserPassword,
      PDFSecurity.generateRandomWordArray,
    );
    const userKeySalt = userPasswordEntry.slice(40, 48);
    const userEncryptionKeyEntry = getUserEncryptionKeyR5(
      processedUserPassword,
      userKeySalt,
      this.encryptionKey,
    );
    const ownerPasswordEntry = getOwnerPasswordR5(
      processedOwnerPassword,
      userPasswordEntry,
      PDFSecurity.generateRandomWordArray,
    );
    const ownerKeySalt = ownerPasswordEntry.slice(40, 48);
    const ownerEncryptionKeyEntry = getOwnerEncryptionKeyR5(
      processedOwnerPassword,
      ownerKeySalt,
      userPasswordEntry,
      this.encryptionKey,
    );
    const permsEntry = getEncryptedPermissionsR5(
      permissions,
      this.encryptionKey,
      PDFSecurity.generateRandomWordArray,
    );

    encDict.V = 5;
    encDict.Length = this.keyBits;
    encDict.CF = {
      StdCF: {
        AuthEvent: 'DocOpen',
        CFM: 'AESV3',
        Length: this.keyBits / 8,
      },
    };
    encDict.StmF = 'StdCF';
    encDict.StrF = 'StdCF';
    encDict.R = 5;
    encDict.O = Buffer.from(ownerPasswordEntry);
    encDict.OE = Buffer.from(ownerEncryptionKeyEntry);
    encDict.U = Buffer.from(userPasswordEntry);
    encDict.UE = Buffer.from(userEncryptionKeyEntry);
    encDict.P = permissions;
    encDict.Perms = Buffer.from(permsEntry);
  }

  getEncryptFn(obj, gen) {
    let digest;
    if (this.version < 5) {
      // Create 5-byte object/generation number suffix
      const suffix = new Uint8Array([
        obj & 0xff,
        (obj >> 8) & 0xff,
        (obj >> 16) & 0xff,
        gen & 0xff,
        (gen >> 8) & 0xff,
      ]);
      digest = concatBytes(this.encryptionKey, suffix);
    }

    if (this.version === 1 || this.version === 2) {
      let key = md5Hash(digest);
      const keyLen = Math.min(16, this.keyBits / 8 + 5);
      key = key.slice(0, keyLen);
      return (buffer) => Buffer.from(rc4(new Uint8Array(buffer), key));
    }

    let key;
    if (this.version === 4) {
      // Append "sAlT" marker for AES
      const saltMarker = new Uint8Array([0x73, 0x41, 0x6c, 0x54]);
      key = md5Hash(concatBytes(digest, saltMarker));
    } else {
      key = this.encryptionKey;
    }

    const iv = PDFSecurity.generateRandomWordArray(16);

    return (buffer) => {
      const encrypted = aesCbcEncrypt(new Uint8Array(buffer), key, iv, true);
      return Buffer.from(concatBytes(iv, encrypted));
    };
  }

  end() {
    this.dictionary.end();
  }
}

function getPermissionsR2(permissionObject = {}) {
  let permissions = 0xffffffc0 >> 0;
  if (permissionObject.printing) {
    permissions |= 0b000000000100;
  }
  if (permissionObject.modifying) {
    permissions |= 0b000000001000;
  }
  if (permissionObject.copying) {
    permissions |= 0b000000010000;
  }
  if (permissionObject.annotating) {
    permissions |= 0b000000100000;
  }
  return permissions;
}

function getPermissionsR3(permissionObject = {}) {
  let permissions = 0xfffff0c0 >> 0;
  if (permissionObject.printing === 'lowResolution') {
    permissions |= 0b000000000100;
  }
  if (permissionObject.printing === 'highResolution') {
    permissions |= 0b100000000100;
  }
  if (permissionObject.modifying) {
    permissions |= 0b000000001000;
  }
  if (permissionObject.copying) {
    permissions |= 0b000000010000;
  }
  if (permissionObject.annotating) {
    permissions |= 0b000000100000;
  }
  if (permissionObject.fillingForms) {
    permissions |= 0b000100000000;
  }
  if (permissionObject.contentAccessibility) {
    permissions |= 0b001000000000;
  }
  if (permissionObject.documentAssembly) {
    permissions |= 0b010000000000;
  }
  return permissions;
}

function getUserPasswordR2(encryptionKey) {
  return rc4(processPasswordR2R3R4(), encryptionKey);
}

function getUserPasswordR3R4(documentId, encryptionKey) {
  const key = encryptionKey.slice();
  let cipher = md5Hash(
    concatBytes(processPasswordR2R3R4(), new Uint8Array(documentId)),
  );
  for (let i = 0; i < 20; i++) {
    const xorKey = new Uint8Array(key.length);
    for (let j = 0; j < key.length; j++) {
      xorKey[j] = encryptionKey[j] ^ i;
    }
    cipher = rc4(cipher, xorKey);
  }
  // Pad to 32 bytes
  const result = new Uint8Array(32);
  result.set(cipher);
  return result;
}

function getOwnerPasswordR2R3R4(
  r,
  keyBits,
  paddedUserPassword,
  paddedOwnerPassword,
) {
  let digest = paddedOwnerPassword;
  let round = r >= 3 ? 51 : 1;
  for (let i = 0; i < round; i++) {
    digest = md5Hash(digest);
  }

  const keyLen = keyBits / 8;
  let key = digest.slice(0, keyLen);
  let cipher = paddedUserPassword;
  round = r >= 3 ? 20 : 1;
  for (let i = 0; i < round; i++) {
    const xorKey = new Uint8Array(keyLen);
    for (let j = 0; j < keyLen; j++) {
      xorKey[j] = key[j] ^ i;
    }
    cipher = rc4(cipher, xorKey);
  }
  return cipher;
}

function getEncryptionKeyR2R3R4(
  r,
  keyBits,
  documentId,
  paddedUserPassword,
  ownerPasswordEntry,
  permissions,
) {
  // Build input: password + owner entry + permissions (LSB first) + document ID
  const permBytes = new Uint8Array([
    permissions & 0xff,
    (permissions >> 8) & 0xff,
    (permissions >> 16) & 0xff,
    (permissions >> 24) & 0xff,
  ]);
  let key = concatBytes(
    paddedUserPassword,
    ownerPasswordEntry,
    permBytes,
    new Uint8Array(documentId),
  );
  const round = r >= 3 ? 51 : 1;
  const keyLen = keyBits / 8;
  for (let i = 0; i < round; i++) {
    key = md5Hash(key);
    key = key.slice(0, keyLen);
  }
  return key;
}

function getUserPasswordR5(processedUserPassword, generateRandomWordArray) {
  const validationSalt = generateRandomWordArray(8);
  const keySalt = generateRandomWordArray(8);
  const hash = sha256Hash(concatBytes(processedUserPassword, validationSalt));
  return concatBytes(hash, validationSalt, keySalt);
}

function getUserEncryptionKeyR5(
  processedUserPassword,
  userKeySalt,
  encryptionKey,
) {
  const key = sha256Hash(concatBytes(processedUserPassword, userKeySalt));
  const iv = new Uint8Array(16); // Zero IV
  return aesCbcEncrypt(encryptionKey, key, iv, false);
}

function getOwnerPasswordR5(
  processedOwnerPassword,
  userPasswordEntry,
  generateRandomWordArray,
) {
  const validationSalt = generateRandomWordArray(8);
  const keySalt = generateRandomWordArray(8);
  const hash = sha256Hash(
    concatBytes(processedOwnerPassword, validationSalt, userPasswordEntry),
  );
  return concatBytes(hash, validationSalt, keySalt);
}

function getOwnerEncryptionKeyR5(
  processedOwnerPassword,
  ownerKeySalt,
  userPasswordEntry,
  encryptionKey,
) {
  const key = sha256Hash(
    concatBytes(processedOwnerPassword, ownerKeySalt, userPasswordEntry),
  );
  const iv = new Uint8Array(16); // Zero IV
  return aesCbcEncrypt(encryptionKey, key, iv, false);
}

function getEncryptionKeyR5(generateRandomWordArray) {
  return generateRandomWordArray(32);
}

function getEncryptedPermissionsR5(
  permissions,
  encryptionKey,
  generateRandomWordArray,
) {
  // Build 16-byte block: permissions (4 bytes LSB) + 0xFFFFFFFF (4 bytes) + "adbT" (4 bytes) + random (4 bytes)
  const data = new Uint8Array(16);
  // Permissions (LSB first)
  data[0] = permissions & 0xff;
  data[1] = (permissions >> 8) & 0xff;
  data[2] = (permissions >> 16) & 0xff;
  data[3] = (permissions >> 24) & 0xff;
  // 0xFFFFFFFF
  data[4] = 0xff;
  data[5] = 0xff;
  data[6] = 0xff;
  data[7] = 0xff;
  // "adbT" = 0x54616462 (but stored as individual bytes)
  data[8] = 0x54; // 'T'
  data[9] = 0x61; // 'a'
  data[10] = 0x64; // 'd'
  data[11] = 0x62; // 'b'
  // Random 4 bytes
  const randomPart = generateRandomWordArray(4);
  data.set(randomPart, 12);

  return aesEcbEncrypt(data, encryptionKey);
}

function processPasswordR2R3R4(password = '') {
  const out = new Uint8Array(32);
  const length = password.length;
  let index = 0;
  while (index < length && index < 32) {
    const code = password.charCodeAt(index);
    if (code > 0xff) {
      throw new Error('Password contains one or more invalid characters.');
    }
    out[index] = code;
    index++;
  }
  while (index < 32) {
    out[index] = PASSWORD_PADDING[index - length];
    index++;
  }
  return out;
}

function processPasswordR5(password = '') {
  password = unescape(encodeURIComponent(saslprep(password)));
  const length = Math.min(127, password.length);
  const out = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    out[i] = password.charCodeAt(i);
  }

  return out;
}

const PASSWORD_PADDING = [
  0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41, 0x64, 0x00, 0x4e, 0x56, 0xff,
  0xfa, 0x01, 0x08, 0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80, 0x2f, 0x0c,
  0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a,
];

export default PDFSecurity;
