import { NewsItem, VideoItem } from './types.ts';

// Scraped JSON interfaces
interface ScrapedNewsArticle {
  url: string;
  articleImage: string;
  imageCaption?: string;
  categoryName: string;
  articleDate: string;
  headerTitle: string;
  author?: string;
  articleText: string;
  tags: string[];
}

interface ScrapedCommentArticle {
  url: string;
  categoryName: string;
  author: string;
  articleDate: string;
  headerTitle: string;
  articleImage: string;
  imageCaption?: string;
  articleText: string;
  tags: string[];
}

interface ScrapedVideoArticle {
  url: string;
  categoryName: string;
  headerDate: string;
  headerTitle: string;
  videoUrl: string;
  videoImage: string;
  articleText: string;
  tags: string[];
  author?: string;
}

// Helper to generate unique ID from URL
function generateIdFromUrl(url: string, prefix: string = ''): string {
  const match = url.match(/\/([^\/]+)\/?$/);
  const slug = match ? match[1] : '';
  const hash = slug.split('-').slice(0, 3).join('-');
  return prefix ? `${prefix}-${hash}` : hash;
}

// Helper to normalize date format
function normalizeDate(date: string): string {
  // Convert formats like "3 January 2026" or "30 December 2025" to "3 Jan 2026"
  const monthMap: Record<string, string> = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
  };

  const parts = date.split(' ');
  if (parts.length === 3 && monthMap[parts[1]]) {
    return `${parts[0]} ${monthMap[parts[1]]} ${parts[2]}`;
  }
  return date;
}

// Transform news article to NewsItem
export function transformNewsArticle(article: ScrapedNewsArticle, index: number): NewsItem {
  return {
    id: generateIdFromUrl(article.url, `news-${index}`),
    title: article.headerTitle,
    category: article.categoryName,
    date: normalizeDate(article.articleDate),
    imageUrl: article.articleImage,
    author: article.author || 'Brussels Signal',
    summary: article.articleText.substring(0, 200) + '...',
    url: article.url,
    fullContent: article.articleText,
    tags: article.tags,
    premium: false
  };
}

// Transform comment article to NewsItem (Commentary)
export function transformCommentArticle(article: ScrapedCommentArticle, index: number): NewsItem {
  return {
    id: generateIdFromUrl(article.url, `comment-${index}`),
    title: article.headerTitle,
    category: 'Commentary',
    date: normalizeDate(article.articleDate),
    imageUrl: article.articleImage,
    author: article.author || 'Brussels Signal',
    summary: article.articleText.substring(0, 200) + '...',
    url: article.url,
    fullContent: article.articleText,
    tags: article.tags,
    premium: true // Commentary is premium content
  };
}

// Transform video article to VideoItem
export function transformVideoArticle(article: ScrapedVideoArticle, index: number): VideoItem {
  // Check if this is a podcast based on articleText content
  let podcastSeries: 'Interference' | 'Horizon Podcast' | 'Hammer Time' | undefined;

  const textLower = article.articleText.toLowerCase();
  const titleLower = article.headerTitle.toLowerCase();

  // Check articleText first (most reliable), then fallback to title
  if (textLower.includes('interference') || titleLower.includes('interference')) {
    podcastSeries = 'Interference';
  } else if (textLower.includes('horizon podcast') || titleLower.includes('horizon')) {
    podcastSeries = 'Horizon Podcast';
  } else if (textLower.includes('hammer time') || titleLower.includes('hammer time')) {
    podcastSeries = 'Hammer Time';
  }

  return {
    id: generateIdFromUrl(article.url, `video-${index}`),
    title: article.headerTitle,
    category: 'Video',
    date: normalizeDate(article.headerDate),
    imageUrl: article.videoImage,
    author: article.author || 'Video',
    summary: article.articleText.substring(0, 200) + '...',
    url: article.url,
    fullContent: article.articleText,
    tags: article.tags,
    premium: false,
    podcastSeries,
    duration: undefined // Duration not available in scraped data
  };
}

// Filter and categorize news articles
export function categorizeNewsArticles(articles: NewsItem[]): {
  politics: NewsItem[];
  economy: NewsItem[];
  society: NewsItem[];
  photoStories: NewsItem[];
  general: NewsItem[];
} {
  const politics: NewsItem[] = [];
  const economy: NewsItem[] = [];
  const society: NewsItem[] = [];
  const photoStories: NewsItem[] = [];
  const general: NewsItem[] = [];

  articles.forEach(article => {
    const titleLower = article.title.toLowerCase();
    const contentLower = article.fullContent?.toLowerCase() || '';
    const tagsLower = article.tags?.map(t => t.toLowerCase()).join(' ') || '';

    // Check for photo stories
    if (titleLower.includes('photo') || titleLower.includes('pictures') || titleLower.includes('images')) {
      photoStories.push({ ...article, category: 'Photo Stories' });
    }
    // Check for politics keywords
    else if (
      titleLower.includes('politic') || titleLower.includes('government') ||
      titleLower.includes('parliament') || titleLower.includes('election') ||
      titleLower.includes('minister') || titleLower.includes('president') ||
      tagsLower.includes('politic')
    ) {
      politics.push({ ...article, category: 'Politics' });
    }
    // Check for economy keywords
    else if (
      titleLower.includes('econom') || titleLower.includes('trade') ||
      titleLower.includes('market') || titleLower.includes('business') ||
      titleLower.includes('financial') || titleLower.includes('bank') ||
      titleLower.includes('€') || titleLower.includes('billion') ||
      tagsLower.includes('econom')
    ) {
      economy.push({ ...article, category: 'Economy' });
    }
    // Check for society keywords
    else if (
      titleLower.includes('social') || titleLower.includes('society') ||
      titleLower.includes('culture') || titleLower.includes('education') ||
      titleLower.includes('health') || titleLower.includes('migration') ||
      titleLower.includes('protest') || tagsLower.includes('society')
    ) {
      society.push({ ...article, category: 'Society' });
    }
    // Default to general
    else {
      general.push({ ...article, category: 'News' });
    }
  });

  return { politics, economy, society, photoStories, general };
}
