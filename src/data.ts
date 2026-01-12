// This file now uses dynamically loaded data from scraped JSON files
// All data is loaded and transformed from:
// - scrapers/output/news-articles.json
// - scrapers/output/comment-articles.json
// - scrapers/output/video-articles.json

export {
  FEATURED_ARTICLE,
  MOST_READ,
  COMMENTARY,
  POLITICS,
  ECONOMY,
  SOCIETY,
  WORLD,
  PHOTO_STORIES,
  WATCH_VIDEOS,
  INTERFERENCE_PODCASTS,
  HORIZON_PODCASTS,
  HAMMER_TIME_PODCASTS,
  ALL_ARTICLES
} from './dataLoader.ts';
