import { latestPages } from '@/lib/llm-text';

// ponytail: naive term frequency over ~50 pages. The Orama index behind
// /api/search is the upgrade path once this stops finding the right page.
const occurrences = (haystack: string, term: string) =>
  haystack.split(term).length - 1;

export function searchDocs(query: string, limit = 5) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(Boolean);
  if (terms.length === 0) return [];

  return latestPages()
    .map((page) => {
      const title = page.data.title.toLowerCase();
      const body = page.data.structuredData.contents
        .map((entry) => entry.content)
        .join(' ')
        .toLowerCase();

      const score = terms.reduce(
        (total, term) =>
          total + occurrences(body, term) + 10 * occurrences(title, term),
        0,
      );

      return { url: page.url, title: page.data.title, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ url, title }) => ({ url, title }));
}
