import { Token } from './types';

const XML_ENTITY_MAP: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};

const ENTITY_REGEX = /&(amp|lt|gt|quot|apos);/g;

const ATTR_REGEX = /([a-zA-Z][a-zA-Z0-9_:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

function decodeXmlEntities(str: string): string {
  return str.replace(ENTITY_REGEX, (_, key) => XML_ENTITY_MAP[key]);
}

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  ATTR_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = ATTR_REGEX.exec(attrString)) !== null) {
    attrs[match[1]] = decodeXmlEntities(match[2] ?? match[3]);
  }

  return attrs;
}

function tokenize(xmlString: string): Token[] {
  const str = xmlString.replace(
    /<\?xml[^?]*\?>|<!DOCTYPE[^>]*>|<!--[\s\S]*?-->/gi,
    '',
  );

  const tokens: Token[] = [];
  let pos = 0;

  while (pos < str.length) {
    const nextTag = str.indexOf('<', pos);
    if (nextTag === -1) break;

    // Text content between tags
    if (nextTag > pos) {
      const raw = str.slice(pos, nextTag);
      if (/\S/.test(raw)) {
        tokens.push({ type: 'text', text: decodeXmlEntities(raw) });
      }
    }

    // CDATA section
    if (str.startsWith('<![CDATA[', nextTag)) {
      const cdataEnd = str.indexOf(']]>', nextTag + 9);
      if (cdataEnd === -1) break;
      const text = str.slice(nextTag + 9, cdataEnd);
      if (text) {
        tokens.push({ type: 'text', text });
      }
      pos = cdataEnd + 3;
      continue;
    }

    const tagEnd = str.indexOf('>', nextTag);
    if (tagEnd === -1) break;

    const tagContent = str.slice(nextTag + 1, tagEnd);
    pos = tagEnd + 1;

    // Closing tag
    if (tagContent.startsWith('/')) {
      tokens.push({ type: 'close', tagName: tagContent.slice(1).trim() });
      continue;
    }

    // Opening or self-closing tag
    const isSelfClosing = tagContent.endsWith('/');
    const rawTag = isSelfClosing ? tagContent.slice(0, -1) : tagContent;

    const spaceIndex = rawTag.search(/[\s/]/);
    const tagName =
      spaceIndex === -1 ? rawTag.trim() : rawTag.slice(0, spaceIndex).trim();
    const attrString = spaceIndex === -1 ? '' : rawTag.slice(spaceIndex);

    tokens.push({
      type: isSelfClosing ? 'self-close' : 'open',
      tagName,
      attributes: parseAttributes(attrString),
    });
  }

  return tokens;
}

export default tokenize;
