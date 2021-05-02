// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const Signature = new r.Struct({
  format: r.uint32,
  length: r.uint32,
  offset: r.uint32
});

const SignatureBlock = new r.Struct({
  reserved:       new r.Reserved(r.uint16, 2),
  cbSignature:    r.uint32,  // Length (in bytes) of the PKCS#7 packet in pbSignature
  signature:      new r.Buffer('cbSignature')
});

export default new r.Struct({
  ulVersion:       r.uint32,  // Version number of the DSIG table (0x00000001)
  usNumSigs:       r.uint16,  // Number of signatures in the table
  usFlag:          r.uint16,  // Permission flags
  signatures:      new r.Array(Signature, 'usNumSigs'),
  signatureBlocks: new r.Array(SignatureBlock, 'usNumSigs')
});
