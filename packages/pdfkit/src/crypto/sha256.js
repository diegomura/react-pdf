import { sha256 } from '@noble/hashes/sha2';

export default function sha256Hash(data) {
  return sha256(data);
}
