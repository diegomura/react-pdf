import resolveImage from '@react-pdf/image';

import { SafeNode } from '../types';

/**
 * Parse the URL from a backgroundImage style value.
 * Supports both plain URLs and CSS url() syntax.
 *
 * @param value - backgroundImage style value
 * @returns URL string or null
 */
const parseBackgroundImageUrl = (value: string): string | null => {
  if (!value) return null;

  const urlMatch = /^url\((['"]?)(.+?)\1\)$/.exec(value.trim());

  if (urlMatch) return urlMatch[2];

  return value;
};

/**
 * Fetches background image and resolves it into the node style.
 * After resolution, `node.style.backgroundImage` will hold the Image object.
 *
 * @param node - Node with backgroundImage style
 */
const fetchBackgroundImage = async (node: SafeNode) => {
  const style = node.style;
  const url = parseBackgroundImageUrl(style?.backgroundImage);

  if (!url) return;

  try {
    const image = await resolveImage({ uri: url }, { cache: true });
    if (!image) return;

    image.key = image.key || url;
    style.backgroundImage = image;
  } catch (e: any) {
    console.warn(`Failed to fetch background image: ${e.message}`);
  }
};

export default fetchBackgroundImage;
