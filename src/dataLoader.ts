import { NewsItem, VideoItem } from './types.ts';
import {
  transformNewsArticle,
  transformCommentArticle,
  transformVideoArticle,
  categorizeNewsArticles
} from './dataTransformers.ts';

// Import the scraped JSON files
import newsArticlesRaw from '../scrapers/output/news-articles.json';
import commentArticlesRaw from '../scrapers/output/comment-articles.json';
import videoArticlesRaw from '../scrapers/output/video-articles.json';

// Transform all scraped data
const newsArticles = newsArticlesRaw.map((article, index) => transformNewsArticle(article, index));
const commentArticles = commentArticlesRaw.map((article, index) => transformCommentArticle(article, index));
const videoArticles = videoArticlesRaw.map((article, index) => transformVideoArticle(article, index));

// Categorize news articles
const categorized = categorizeNewsArticles(newsArticles);

// Export data for the application

// Featured article - first news article
export const FEATURED_ARTICLE: NewsItem = newsArticles[0] || {
  id: 'featured-1',
  title: 'No articles available',
  date: '',
  imageUrl: '',
  category: 'News'
};

// Most read - next 4 news articles
export const MOST_READ: NewsItem[] = newsArticles.slice(1, 5);

// Commentary articles - all comment articles
export const COMMENTARY: NewsItem[] = commentArticles;

// Categorized news articles
export const POLITICS: NewsItem[] = categorized.politics;
export const ECONOMY: NewsItem[] = categorized.economy;
export const SOCIETY: NewsItem[] = categorized.society;
export const WORLD: NewsItem[] = categorized.world;
export const PHOTO_STORIES: NewsItem[] = categorized.photoStories;

// Podcast collections - filtered from video articles
export const INTERFERENCE_PODCASTS: NewsItem[] = videoArticles.filter(
  video => video.podcastSeries === 'Interference'
);

export const HORIZON_PODCASTS: NewsItem[] = videoArticles.filter(
  video => video.podcastSeries === 'Horizon Podcast'
);

export const HAMMER_TIME_PODCASTS: NewsItem[] = videoArticles.filter(
  video => video.podcastSeries === 'Hammer Time'
);

// Video content - ONLY regular videos (no podcasts)
export const WATCH_VIDEOS: VideoItem[] = videoArticles.filter(v => !v.podcastSeries);

// All articles combined for search/navigation
export const ALL_ARTICLES: NewsItem[] = [
  ...newsArticles,
  ...commentArticles,
  ...videoArticles
];
