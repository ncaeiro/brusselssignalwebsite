// Utility function to create URL-friendly slugs from article titles
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Utility function to create URL-friendly slugs from author names
export const createAuthorSlug = (authorName: string): string => {
  return authorName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Function to find article by slug
export const findArticleBySlug = (slug: string, allArticles: any[]): any | null => {
  return allArticles.find(article => createSlug(article.title) === slug) || null;
};

// Author photo mapping - maps author names to their photo filenames
const AUTHOR_PHOTOS: Record<string, string> = {
  'carl deconinck': 'Carl Deconinck.jpg',
  'chris gattringer': 'Chris Gattringer.png',
  'chris nelson': 'Chris Nelson.jpeg',
  'claire lemaire': 'Claire Lemaire.jpeg',
  'kevin myers': 'Kevin Myers.jpeg',
  'luca steinmann': 'Luca Steinmann.jpg',
  'rafael pinto borges': 'Rafael Pinto Borges.jpeg',
  'krzysztof mularczyk': 'krzysztof mularczyk.jpeg'
};

// Function to get author photo URL
export const getAuthorPhoto = (authorName: string): string | null => {
  const normalizedName = authorName.toLowerCase();
  const photoFilename = AUTHOR_PHOTOS[normalizedName];

  if (photoFilename) {
    return `${import.meta.env.BASE_URL}images/authors/${photoFilename}`;
  }

  return null;
};
