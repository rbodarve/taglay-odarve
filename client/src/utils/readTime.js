// Estimate reading time (in minutes) for an article's content.
// Accepts an array of paragraphs (or a single string) and returns at least 2.
export const getReadTime = (content) => {
  const parts = Array.isArray(content) ? content : content ? [content] : [];
  const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 70));
};
