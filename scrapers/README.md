# Brussels Signal Web Scrapers

This folder contains web scrapers for the Brussels Signal website (https://brusselssignal.eu).

## Scrapers

### 1. comment-scraper.js
Scrapes all articles from the Comment category.
- **Target URL**: `https://brusselssignal.eu/category/comment/`
- **Pages**: 1-93 (complete)
- **Articles scraped**: 1,106
- **Output**: `output/comment-articles.json`

**Data extracted**:
- URL, category name, author, article date
- Header title, article image, image caption
- Full article text, tags

**Usage**:
```bash
node scrapers/comment-scraper.js
```

### 2. video-scraper.js
Scrapes all articles from the Video category.
- **Target URL**: `https://brusselssignal.eu/category/video/`
- **Pages**: 1-14 (complete)
- **Articles scraped**: 163
- **Output**: `output/video-articles.json`

**Data extracted**:
- URL, category name, header date, header title
- Video URL (YouTube embeds), video thumbnail image
- Article text, tags, author

**Usage**:
```bash
node scrapers/video-scraper.js
```

### 3. news-scraper.js
Scrapes articles from the News category.
- **Target URL**: `https://brusselssignal.eu/category/news/`
- **Pages**: 1-10 (complete)
- **Articles scraped**: 120
- **Output**: `output/news-articles.json`

**Data extracted**:
- URL, category name, article date, header title
- Article image, image caption, author
- Full article text, tags

**Usage**:
```bash
node scrapers/news-scraper.js
```

## Output Files

All scraped data is saved in JSON format in the `output/` folder:
- `comment-articles.json` (8.1 MB, 1,106 articles)
- `video-articles.json` (205 KB, 163 articles)
- `news-articles.json` (550 KB, 120 articles)

## Integration with Application

The scraped JSON files are automatically loaded and transformed by the application:

1. **dataTransformers.ts** - Converts scraped JSON format to NewsItem/VideoItem interfaces
2. **dataLoader.ts** - Imports JSON files and creates categorized data exports
3. **data.ts** - Re-exports data from dataLoader for use throughout the app

### Data Mapping:
- `news-articles.json` → FEATURED_ARTICLE, MOST_READ, POLITICS, ECONOMY, SOCIETY, PHOTO_STORIES
- `comment-articles.json` → COMMENTARY (all marked as premium content)
- `video-articles.json` → WATCH_VIDEOS, INTERFERENCE_PODCASTS, HORIZON_PODCASTS, HAMMER_TIME_PODCASTS

## Features

- Respectful scraping with delays between requests (1-1.5 seconds)
- HTML entity decoding
- Comprehensive error handling
- Progress tracking and statistics
- Multiple fallback strategies for extracting content
