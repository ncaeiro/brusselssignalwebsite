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

// Author email mapping - maps author names to their email addresses
const AUTHOR_EMAILS: Record<string, string> = {
  'carl deconinck': 'carl.deconinck@brusselssignal.eu',
  'chris gattringer': 'chris.gattringer@brusselssignal.eu',
  'chris nelson': 'chris.nelson@brusselssignal.eu',
  'claire lemaire': 'claire.lemaire@brusselssignal.eu',
  'kevin myers': 'kevin.myers@brusselssignal.eu',
  'luca steinmann': 'luca.steinmann@brusselssignal.eu',
  'rafael pinto borges': 'rafael.borges@brusselssignal.eu',
  'krzysztof mularczyk': 'krzysztof.mularczyk@brusselssignal.eu'
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

// Function to get author email address
export const getAuthorEmail = (authorName: string): string | null => {
  const normalizedName = authorName.toLowerCase();
  return AUTHOR_EMAILS[normalizedName] || null;
};

// Function to calculate reading time in minutes
// Average reading speed: 225 words per minute
export const calculateReadingTime = (text: string): number => {
  if (!text) return 1;

  // Count words (split by whitespace and filter out empty strings)
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate minutes (round up to at least 1 minute)
  const minutes = Math.ceil(wordCount / 225);

  return Math.max(1, minutes);
};
