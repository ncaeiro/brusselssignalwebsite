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

// Video content - all video articles with smart ID assignment
// Assign vm1-vm6 to podcasts (for menu), vf1-vf5 to regular videos (for feed)
export const WATCH_VIDEOS: VideoItem[] = (() => {
  const allPodcasts = [...INTERFERENCE_PODCASTS, ...HORIZON_PODCASTS, ...HAMMER_TIME_PODCASTS];
  const regularVideos = videoArticles.filter(v => !v.podcastSeries);

  // Assign vm1-vm6 to first 6 podcasts
  const podcastsWithMenuIds = allPodcasts.slice(0, 6).map((podcast, index) => ({
    ...podcast,
    id: `vm${index + 1}`
  }));

  // Assign vf1-vf5 to first 5 regular videos
  const videosWithFeedIds = regularVideos.slice(0, 5).map((video, index) => ({
    ...video,
    id: `vf${index + 1}`
  }));

  // Combine: menu podcasts, feed videos, remaining podcasts, remaining videos
  return [
    ...podcastsWithMenuIds,
    ...videosWithFeedIds,
    ...allPodcasts.slice(6),
    ...regularVideos.slice(5)
  ];
})();

// All articles combined for search/navigation
export const ALL_ARTICLES: NewsItem[] = [
  ...newsArticles,
  ...commentArticles,
  ...videoArticles
];
