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

// Helper to create a smart summary that ends at a complete word or sentence
function createSmartSummary(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text;

  const excerpt = text.substring(0, maxLength);
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastSpace = excerpt.lastIndexOf(' ');

  // If we find a period in the last 50 chars, use it
  if (lastPeriod > maxLength - 50) {
    return excerpt.substring(0, lastPeriod + 1);
  }
  // Otherwise trim to last complete word
  if (lastSpace > 0) {
    return excerpt.substring(0, lastSpace) + '...';
  }
  return excerpt + '...';
}

// Helper to add conceptual tags based on content analysis
function enrichTags(
  title: string,
  content: string,
  existingTags: string[],
  category?: string
): string[] {
  const enrichedTags = [...existingTags];
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  const combinedText = `${titleLower} ${contentLower}`;

  // Add tags without duplicates
  const addTag = (tag: string) => {
    if (!enrichedTags.includes(tag)) {
      enrichedTags.push(tag);
    }
  };

  // POLITICS category conceptual tags
  if (category === 'Politics' || combinedText.includes('politic')) {
    if (combinedText.includes('eu parliament') || combinedText.includes('european parliament') ||
        combinedText.includes('mep') || combinedText.includes('brussels bubble')) {
      addTag('EU Bubble');
    }
    if (combinedText.includes('election') || combinedText.includes('vote') || combinedText.includes('ballot')) {
      addTag('Elections');
    }
    if (combinedText.includes('diplomacy') || combinedText.includes('diplomat') || combinedText.includes('foreign policy')) {
      addTag('Diplomacy');
    }
    if (combinedText.includes('commission') || combinedText.includes('ursula von der leyen')) {
      addTag('European Commission');
    }
    if (combinedText.includes('legislation') || combinedText.includes('law') || combinedText.includes('regulation')) {
      addTag('Legislation');
    }
    if (combinedText.includes('corrupt') || combinedText.includes('scandal') || combinedText.includes('bribe')) {
      addTag('Corruption');
    }
    if (combinedText.includes('ukraine') || combinedText.includes('kyiv') || combinedText.includes('zelenskyy') || combinedText.includes('zelensky')) {
      addTag('Ukraine');
    }
    if (combinedText.includes('digital services act') || combinedText.includes('dsa') || combinedText.includes('online content')) {
      addTag('DSA');
    }
  }

  // ECONOMY category conceptual tags
  if (category === 'Economy' || combinedText.includes('econom')) {
    if (combinedText.includes('trade') || combinedText.includes('export') || combinedText.includes('import')) {
      addTag('Trade');
    }
    if (combinedText.includes('business') || combinedText.includes('company') || combinedText.includes('corporate')) {
      addTag('Business');
    }
    if (combinedText.includes('market') || combinedText.includes('stock') || combinedText.includes('investor')) {
      addTag('Markets');
    }
    if (combinedText.includes('energy') || combinedText.includes('oil') || combinedText.includes('gas') || combinedText.includes('renewable')) {
      addTag('Energy');
    }
    if (combinedText.includes('budget') || combinedText.includes('spending') || combinedText.includes('fiscal')) {
      addTag('EU Budget');
    }
    if (combinedText.includes('inflation') || combinedText.includes('price') || combinedText.includes('cost of living')) {
      addTag('Inflation');
    }
    if (combinedText.includes('tariff') || combinedText.includes('customs') || combinedText.includes('import duties') || combinedText.includes('trade barriers')) {
      addTag('Tariffs');
    }
  }

  // SOCIETY category conceptual tags
  if (category === 'Society' || combinedText.includes('society') || combinedText.includes('social')) {
    if (combinedText.includes('free speech') || combinedText.includes('freedom of expression') ||
        combinedText.includes('censorship') || combinedText.includes('freedom of speech')) {
      addTag('Free Speech');
    }
    if (combinedText.includes('culture') || combinedText.includes('cultural') || combinedText.includes('art')) {
      addTag('Culture');
    }
    if (combinedText.includes('education') || combinedText.includes('school') || combinedText.includes('university')) {
      addTag('Education');
    }
    if (combinedText.includes('health') || combinedText.includes('medical') || combinedText.includes('hospital')) {
      addTag('Health');
    }
    if (combinedText.includes('environment') || combinedText.includes('climate') || combinedText.includes('green')) {
      addTag('Environment');
    }
    if (combinedText.includes('migration') || combinedText.includes('immigrant') || combinedText.includes('refugee')) {
      addTag('Migration');
    }
    if (combinedText.includes('human rights') || combinedText.includes('civil rights')) {
      addTag('Human Rights');
    }
  }

  // WORLD category conceptual tags
  if (category === 'World') {
    if (combinedText.includes('war') || combinedText.includes('conflict') || combinedText.includes('military')) {
      addTag('War');
    }
    if (combinedText.includes('ukraine') || combinedText.includes('kyiv') || combinedText.includes('zelenskyy')) {
      addTag('Ukraine');
    }
    if (combinedText.includes('russia') || combinedText.includes('moscow') || combinedText.includes('putin')) {
      addTag('Russia');
    }
    if (combinedText.includes('china') || combinedText.includes('beijing') || combinedText.includes('chinese')) {
      addTag('China');
    }
    if (combinedText.includes('united states') || combinedText.includes(' us ') || combinedText.includes('america') || combinedText.includes('washington')) {
      addTag('US');
    }
    if (combinedText.includes('nato') || combinedText.includes('alliance')) {
      addTag('NATO');
    }
    if (combinedText.includes('sanction')) {
      addTag('Sanctions');
    }
    if (combinedText.includes('middle east') || combinedText.includes('israel') || combinedText.includes('iran')) {
      addTag('Middle East');
    }
  }

  // COMMENTARY category conceptual tags
  if (category === 'Commentary') {
    addTag('Columns'); // All commentary articles are columns
    if (combinedText.includes('opinion') || combinedText.includes('view')) {
      addTag('Opinion');
    }
    if (combinedText.includes('analysis') || combinedText.includes('perspective')) {
      addTag('Analysis');
    }
  }

  return enrichedTags;
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
    summary: createSmartSummary(article.articleText, 200),
    url: article.url,
    fullContent: article.articleText,
    tags: article.tags,
    premium: false
  };
}

// Transform comment article to NewsItem (Commentary)
export function transformCommentArticle(article: ScrapedCommentArticle, index: number): NewsItem {
  const enrichedTags = enrichTags(article.headerTitle, article.articleText, article.tags, 'Commentary');

  return {
    id: generateIdFromUrl(article.url, `comment-${index}`),
    title: article.headerTitle,
    category: 'Commentary',
    date: normalizeDate(article.articleDate),
    imageUrl: article.articleImage,
    author: article.author || 'Brussels Signal',
    summary: createSmartSummary(article.articleText, 200),
    url: article.url,
    fullContent: article.articleText,
    tags: enrichedTags,
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
    summary: createSmartSummary(article.articleText, 200),
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
  world: NewsItem[];
  photoStories: NewsItem[];
  general: NewsItem[];
} {
  const politics: NewsItem[] = [];
  const economy: NewsItem[] = [];
  const society: NewsItem[] = [];
  const world: NewsItem[] = [];
  const photoStories: NewsItem[] = [];
  const general: NewsItem[] = [];

  articles.forEach(article => {
    const titleLower = article.title.toLowerCase();
    const contentLower = article.fullContent?.toLowerCase() || '';
    const tagsLower = article.tags?.map(t => t.toLowerCase()).join(' ') || '';

    // Check for photo stories
    if (titleLower.includes('photo') || titleLower.includes('pictures') || titleLower.includes('images')) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'Photo Stories');
      photoStories.push({ ...article, category: 'Photo Stories', tags: enrichedTags });
    }
    // Check for SOCIETY keywords FIRST (higher priority for social/cultural topics)
    else if (
      titleLower.includes('riot') || titleLower.includes('church') ||
      titleLower.includes('celebrate') || titleLower.includes('fire') ||
      titleLower.includes('festival') || titleLower.includes('religious') ||
      titleLower.includes('sharia') || titleLower.includes('islamic') ||
      titleLower.includes('tv channel') || titleLower.includes('media') ||
      titleLower.includes('postal service') || titleLower.includes('letter') ||
      titleLower.includes('migrant background') || titleLower.includes('urban violence') ||
      tagsLower.includes('amsterdam') || tagsLower.includes('security') ||
      (titleLower.includes('migration') && !titleLower.includes('policy'))
    ) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'Society');
      society.push({ ...article, category: 'Society', tags: enrichedTags });
    }
    // Check for politics keywords (EU/European politics)
    // This includes EU-related Ukraine coverage (EU-Ukraine relations, sanctions, etc.)
    else if (
      titleLower.includes('politic') || titleLower.includes('government') ||
      titleLower.includes('parliament') || titleLower.includes('election') ||
      titleLower.includes('minister') || titleLower.includes('president') ||
      titleLower.includes('commission') || titleLower.includes('eu ') ||
      contentLower.includes('european union') || contentLower.includes('eu sanctions') ||
      contentLower.includes('eu leaders') || contentLower.includes('brussels') ||
      tagsLower.includes('politic')
    ) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'Politics');
      politics.push({ ...article, category: 'Politics', tags: enrichedTags });
    }
    // Check for WORLD keywords - international news, war, global affairs
    // Only categorize as World if NOT already caught by Politics (EU-related content)
    else if (
      titleLower.includes('war') || titleLower.includes('ukraine') ||
      titleLower.includes('russia') || titleLower.includes('china') ||
      titleLower.includes('united states') || titleLower.includes(' us ') ||
      titleLower.includes('nato') || titleLower.includes('international') ||
      titleLower.includes('global') || titleLower.includes('middle east') ||
      titleLower.includes('conflict') || titleLower.includes('sanctions') ||
      tagsLower.includes('international') || tagsLower.includes('world') ||
      tagsLower.includes('global') || tagsLower.includes('war') ||
      tagsLower.includes('china') || tagsLower.includes('us') ||
      tagsLower.includes('russia') || tagsLower.includes('ukraine')
    ) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'World');
      world.push({ ...article, category: 'World', tags: enrichedTags });
    }
    // Check for economy keywords
    else if (
      titleLower.includes('econom') || titleLower.includes('trade') ||
      titleLower.includes('market') || titleLower.includes('business') ||
      titleLower.includes('financial') || titleLower.includes('bank') ||
      titleLower.includes('€') || titleLower.includes('billion') ||
      tagsLower.includes('econom')
    ) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'Economy');
      economy.push({ ...article, category: 'Economy', tags: enrichedTags });
    }
    // Additional society keywords (catch remaining society articles not caught earlier)
    else if (
      titleLower.includes('social') || titleLower.includes('society') ||
      titleLower.includes('culture') || titleLower.includes('education') ||
      titleLower.includes('health') || titleLower.includes('protest') ||
      titleLower.includes('community') || titleLower.includes('civil') ||
      tagsLower.includes('society') ||
      contentLower.includes('fireworks') || contentLower.includes('celebration')
    ) {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'Society');
      society.push({ ...article, category: 'Society', tags: enrichedTags });
    }
    // Default to general
    else {
      const enrichedTags = enrichTags(article.title, article.fullContent || '', article.tags || [], 'News');
      general.push({ ...article, category: 'News', tags: enrichedTags });
    }
  });

  return { politics, economy, society, world, photoStories, general };
}
