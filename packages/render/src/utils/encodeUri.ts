// PDF link URIs must be 7-bit ASCII; viewers ignore links with raw non-ASCII characters
const encodeUri = (uri: string) =>
  uri.replace(/[^\p{ASCII}]+/gu, (chars) => encodeURIComponent(chars));

export default encodeUri;
