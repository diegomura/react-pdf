// PDF link URIs must be 7-bit ASCII; viewers ignore links with raw non-ASCII characters
const encodeUri = (uri: string) =>
  uri.replace(/[^\x00-\x7F]+/g, (chars) => encodeURIComponent(chars));

export default encodeUri;
